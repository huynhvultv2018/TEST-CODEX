const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');
const root = path.resolve(__dirname, '../WEB_LIVE_BASELINE_FROZEN/WEB_LIVE_TV_VERTICAL_MCQ_CANDIDATE');
const out = path.resolve(__dirname, '../evidence');
const base = 'http://127.0.0.1:8770/WEB_LIVE/';
(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  const errors = [], assertions = [], requests = [];
  context.on('page', p => p.on('pageerror', e => errors.push(e.message)));
  context.on('request', r => requests.push({ method: r.method(), url: r.url() }));
  const teacher = await context.newPage();
  await teacher.goto(base + 'teacher.html');
  const preview = teacher.frames().find(f => f.url().includes('preview=1'));
  const tv = await context.newPage();
  await tv.goto(base + 'tv.html');
  const check = (label, value) => { assert(value, label); assertions.push(label); };
  const settle = async () => { await tv.waitForTimeout(100); await tv.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))); };
  const sourceHashes = [];
  for (const name of fs.readdirSync(root + '/WEB_LIVE').filter(f => /\.(js|css|html)$/.test(f))) {
    const response = await context.request.get(base + name);
    const data = await response.body();
    const digest = b => crypto.createHash('sha256').update(b).digest('hex');
    assert.equal(response.status(), 200);
    assert.equal(digest(data), digest(fs.readFileSync(root + '/WEB_LIVE/' + name)));
    sourceHashes.push({ path: 'WEB_LIVE/' + name, sha256: digest(data) });
  }
  check('Every served HTML/JS/CSS asset equals frozen source bytes', sourceHashes.length > 30);
  await teacher.locator('#closeBtn').click();
  check('Fresh importer closes without a loaded lesson (R2)', !(await teacher.locator('#importer').isVisible()));
  await teacher.evaluate(() => showImporter());
  check('Importer reopens', await teacher.locator('#importer').isVisible());
  const routing = await tv.evaluate(() => [
    ['new metadata alone', { subject_engine: 'geometry' }, { subject: 'Toán 8' }],
    ['legacy explicit geometry', { subjectMode: 'GEOMETRY' }, { subject: 'Toán 8' }],
    ['legacy explicit generic', { subjectMode: 'GENERIC', geometryImage: 'x' }, { subject: 'Hình học 8' }],
    ['legacy label', {}, { subject: 'Tin học 6' }],
    ['title heuristic', { title: 'Giải phương trình', content: 'x + 1 = 2' }, { subject: 'Toán 8' }],
    ['ambiguous plain math', { content: 'x + 1 = 2' }, { subject: 'Toán 8' }]
  ].map(([caseName, screen, lesson]) => ({ caseName, screen, lesson, result: resolveSubjectLayout(screen, lesson) })));
  check('Current runtime ignores subject_engine (recorded gap)', routing[0].result === 'GENERIC');
  check('Legacy explicit metadata remains authoritative', routing[1].result === 'GEOMETRY' && routing[2].result === 'GENERIC');
  check('Legacy labels and title heuristics are active', routing[3].result === 'COMPUTER_SCIENCE' && routing[4].result === 'ALGEBRA');
  check('Ambiguous math falls back to GENERIC', routing[5].result === 'GENERIC');
  const stageInput = { lesson: { id: 'audit-stage', subject: 'Toán 8', screens: [{ subjectMode: 'GEOMETRY', type: 'QUESTION', content: 'Đề bài hình học' }] }, state: { answerMode: 'steps', answerStep: 1 } };
  const teacherStage = await teacher.evaluate(({ lesson, state }) => liveUIStage(lesson, lesson.screens[0], state), stageInput);
  const tvStage = await tv.evaluate(({ lesson, state }) => liveUIStage(lesson, lesson.screens[0], state), stageInput);
  check('Teacher/TV stage divergence reproduced for explicit Geometry + generic label', teacherStage === 'ANSWER' && tvStage === 'PROOF');
  const modules = await teacher.evaluate(() => ({
    mathJax: typeof MathJax, resolver: typeof resolveSubjectLayout,
    geometryControllers: [typeof boardController, typeof smartController, typeof coverController],
    voices: speechSynthesis.getVoices().length,
    mediaElements: document.querySelectorAll('audio,video').length,
    scripts: [...document.scripts].map(s => s.src.split('/').pop()),
    stateKey: STATE_KEY, channel: CH
  }));
  check('MathJax absent from actual Teacher and TV runtime', modules.mathJax === 'undefined' && await tv.evaluate(() => typeof MathJax === 'undefined'));
  check('Teacher does not load the TV subject resolver', modules.resolver === 'undefined');
  check('Shared channel/key unchanged', modules.channel === 'web-live-v04' && modules.stateKey === 'webLiveStateV042');
  check('Geometry controllers currently initialize for every Teacher session', modules.geometryControllers.every(x => x === 'object'));
  check('TV never loads speech synthesis controller', await tv.evaluate(() => typeof TTSController === 'undefined'));
  const demoRel = 'WEB_LIVE/DEMO_TRUC_TIEP_SAMPLE_LIVE.zip';
  await teacher.locator('#zipfile').setInputFiles(root + '/' + demoRel);
  await teacher.waitForFunction(() => lesson && lesson.screens.length === 4 && document.getElementById('error').textContent === '');
  await settle();
  const demoLesson = await teacher.evaluate(() => JSON.parse(JSON.stringify(lesson)));
  const demoStates = [];
  for (let i = 0; i < demoLesson.screens.length; i++) {
    await teacher.evaluate(i => go(i), i); await settle();
    demoStates.push(await tv.evaluate(() => ({ index: lastState.index, mode: screenEl.dataset.subjectMode, content: content.innerText, stage: screenEl.dataset.pedagogyStage })));
  }
  check('Existing demo package imports and all four screens present', demoStates.length === 4 && demoStates.every((s, i) => s.index === i));
  check('No native launch/present/return caused by navigation', requests.every(r => !/\/(launch|present|return)$/.test(r.url)));
  const demoUnavailable = await teacher.evaluate(() => ({ state: demoController.state, ready: demoController.ready, apps: demoController.apps }));
  await teacher.evaluate(() => go(1)); await settle();
  await tv.screenshot({ path: out + '/DEMO_BASELINE.png' });
  const semanticFixture = { id: 'audit-generic-mcq', subject: 'Chưa khai báo', screens: [{ type: 'QUESTION', title: 'Kiểm thử cấu trúc, không phải bài SGK', content: 'Chọn thao tác.\nA. Mở tệp.\nB. Đóng tệp.\nC. Lưu tệp.\nChọn một đáp án.', instruction: 'Chọn một đáp án.' }] };
  await teacher.evaluate(l => { saveLesson(l); start(l); }, semanticFixture); await settle();
  const choiceLayout = await tv.evaluate(() => {
    const pane = content.getBoundingClientRect();
    return { mode: screenEl.dataset.subjectMode, cards: [...content.querySelectorAll('.tvOptionCard')].map(x => { const r = x.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, text: x.textContent }; }), contentWidth: pane.width, instruction: content.querySelector('.tvInstruction')?.textContent, tts: TTSTVPresentation.blocks };
  });
  check('Legacy/default uses vertical MCQ full width', choiceLayout.mode === 'GENERIC' && choiceLayout.cards.length === 3 && choiceLayout.cards.every((r, i, a) => Math.abs(r.width - choiceLayout.contentWidth) < 2 && (i === 0 || r.y >= a[i - 1].y + a[i - 1].height)));
  check('Instruction remains outside options', choiceLayout.instruction === 'Chọn một đáp án.' && choiceLayout.cards.every(r => !r.text.includes(choiceLayout.instruction)));
  const parity = await preview.evaluate(() => TTSTVPresentation.blocks);
  check('Actual TV and embedded preview use the same MCQ blocks', JSON.stringify(choiceLayout.tts) === JSON.stringify(parity));
  const before = await tv.evaluate(() => JSON.stringify(lastState));
  await teacher.evaluate(() => {
    const old = { ...state(), stateVersion: stateVersion - 10, index: 999 };
    tvWindow?.postMessage(old, '*');
    send(old);
  }); await settle();
  check('Older state version does not replace active presentation', await tv.evaluate(() => JSON.stringify(lastState)) === before);
  check('No page runtime exceptions', errors.length === 0);
  fs.writeFileSync(out + '/ARCHITECTURE_RUNTIME_PROBES.json', JSON.stringify({ browser: browser.version(), assertions, errors, sourceHashes, routing, stageDivergence: { input: stageInput, teacherStage, tvStage }, modules, demoStates, demoUnavailable, requestCounts: requests.reduce((a, r) => { const u = new URL(r.url); a[u.origin] = (a[u.origin] || 0) + 1; return a; }, {}), nativeApplications: 'UNRUN', physicalTV: 'UNRUN', realAudio: modules.voices ? 'UNRUN' : 'UNRUN_NO_VOICES', choiceLayout }, null, 2));
  await browser.close();
  console.log(JSON.stringify({ assertions: assertions.length, errors, teacherStage, tvStage, voices: modules.voices }));
})().catch(e => { console.error(e); process.exit(1); });
