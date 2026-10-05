const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('assert/strict'),crypto=require('crypto');
const root='/workspace/p12-2b-storage/working/WEB_LIVE_STORAGE_P12_2B_WORKING_COPY',out='/workspace/p12-2b-storage/EVIDENCE/REGRESSION/GEOMETRY_RUNTIME';
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']}),c=await browser.newContext({viewport:{width:1366,height:768}}),errors=[],checks=[],visual=[];
 c.on('page',p=>p.on('pageerror',e=>errors.push(e.message)));
 const t=await c.newPage();await t.goto('http://127.0.0.1:8791/WEB_LIVE/teacher.html');
 await t.locator('#lessonSubject').selectOption('geometry');await t.locator('#zipfile').setInputFiles('/workspace/g4-f01-fixture-revalidation/HINH8_VD2_GEOMETRY_PROFILE_TEST_G4F01_PATCHED.zip');await t.waitForFunction(()=>!document.getElementById('subjectLoadBtn').disabled);await t.locator('#subjectLoadBtn').click();await t.waitForFunction(()=>lesson?.screens?.length===35&&lesson.subject_engine==='geometry');
 const pop=t.waitForEvent('popup');await t.getByRole('button',{name:'📺 MỞ TV',exact:true}).click();const tv=await pop;await tv.waitForLoadState();
 const preview=()=>t.frames().find(f=>f.url().includes('preview=1'));
 const settle=async()=>{await tv.waitForTimeout(180);await tv.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));};
 const check=name=>{checks.push({name,result:'PASS'});console.log(name);};
 const digest=x=>crypto.createHash('sha256').update(x||'').digest('hex');
 const snap=()=>({index:lastState.index,figure:screenEl.dataset.geometryFigure,src:pic.getAttribute('src'),stage:screenEl.dataset.pedagogyStage,
  ids:[...document.querySelectorAll('#geometryObjectHighlight [data-geometry-object-id]')].map(e=>e.dataset.geometryObjectId).sort(),
  answer:document.getElementById('answer').innerText,analysis:document.getElementById('analysis').innerText,geometry:WebLiveGeometry.getState(),
  overlayScope:lastState.board.overlayScope,geometryClass:screenEl.classList.contains('geometryProfile')});
 async function snapshot(){const s=await tv.evaluate(snap);s.imageSha256=digest(s.src);delete s.src;return s;}
 async function go(index){await t.evaluate(index=>go(index),index);await settle();}
 async function ids(expected){assert.deepEqual((await tv.evaluate(snap)).ids,expected.slice().sort());}
 async function parity(){const a=await tv.evaluate(snap),b=await preview().evaluate(snap);assert.deepEqual(a,b);const teacher=await t.evaluate(()=>WebLiveGeometry.getState());assert.deepEqual(teacher,a.geometry);}
 async function capture(name){await settle();const data=await snapshot(),metrics=await tv.evaluate(()=>{const p=document.querySelector('.textPane'),f=document.getElementById('figurePane');return{overflow:p.scrollHeight>p.clientHeight+2,horizontal:p.scrollWidth>p.clientWidth+2,figureWidth:f.getBoundingClientRect().width,panelWidth:p.getBoundingClientRect().width,contentFont:parseFloat(getComputedStyle(document.getElementById('content')).fontSize),answerFont:parseFloat(getComputedStyle(document.getElementById('answer')).fontSize)}});assert(!metrics.overflow&&!metrics.horizontal,name+' overflow');await tv.screenshot({path:out+'/'+name+'.png'});visual.push({name,...data,...metrics});}
 const before=await t.evaluate(()=>JSON.stringify(lesson));
 await go(5);await ids([]);assert.equal(await tv.locator('.geometryStatementLabel').count(),2);assert((await tv.locator('.geometryStatementText').allTextContents()).join(' ').includes('AH, CK ⟂ BD'));await parity();const contrast=await tv.locator('.geometryStatementText').first().evaluate(n=>{const rgb=s=>s.match(/\d+/g).slice(0,3).map(Number),lum=values=>values.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0),fg=lum(rgb(getComputedStyle(n).color)),bg=lum(rgb(getComputedStyle(n.parentElement).backgroundColor));return(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05);});assert(contrast>=4.5);await capture('GEOMETRY_GT_KL');check('Real package load: base figure + authored GT/KL, no automatic answer/object highlight');
 const first=await snapshot(),images=[],scopes=[];
 for(const index of [5,6,7,8,9,10]){await go(index);const s=await snapshot();images.push(s.imageSha256);scopes.push(s.overlayScope);assert.equal(s.figure,'VD2');}
 assert.equal(new Set(images).size,1);assert.equal(new Set(scopes).size,1);check('Persistent base figure and annotation scope across GT/KL → analysis → proof → conclusion');
 await go(7);assert(!await tv.locator('#analysis').isVisible());await t.evaluate(()=>revealAnalysis());await settle();await ids(['AH','CK']);assert(!((await tv.locator('#analysis').textContent()).includes('∆AHD')));await parity();await capture('GEOMETRY_ANALYSIS_1');
 await t.evaluate(()=>revealAnalysis());await settle();await ids(['AH','CK','BD']);await capture('GEOMETRY_ANALYSIS_2');check('Authored analysis diagram progressive disclosure and analysis-object links');
 await go(9);await ids([]);assert(!await tv.locator('#answer').isVisible());await t.evaluate(()=>revealStep());await settle();await ids(['AD','CB','angle_ADH','angle_CBK']);assert(!((await tv.locator('#answer').textContent()).includes('∆AHD')));await parity();await capture('GEOMETRY_PROOF_1');
 await t.evaluate(()=>revealStep());await settle();await ids(['triangle_AHD','triangle_CKB','AH','CK']);await capture('GEOMETRY_PROOF_2');check('Proof step 1 → step 2 changes segment/angle → triangle highlights; future proof absent before reveal');
 // Focus uses the existing annotation editor and its original click binding.
 await t.evaluate(()=>{classroomController.toggleFocus();cockpit.refresh()});await t.locator('#previewAnswer .focusBlock').first().click();await settle();await ids(['AD','CB','angle_ADH','angle_CBK']);assert.equal(await tv.locator('#answer .isFocused').count(),1);await parity();check('Existing Focus click selects a disclosed earlier proof step and its authored objects');
 await t.evaluate(()=>classroomController.clearFocus());await settle();await ids(['triangle_AHD','triangle_CKB','AH','CK']);
 const zoomBefore=await snapshot();await t.evaluate(()=>zoomBy(.4));await settle();assert.equal(await tv.evaluate(()=>lastState.zoom),1.4);assert.deepEqual((await snapshot()).ids,zoomBefore.ids);assert.equal(await tv.evaluate(()=>lastState.answerStep),2);
 await t.evaluate(()=>classroomController.setLayout('70'));await settle();let ratio=await tv.evaluate(()=>document.getElementById('figurePane').getBoundingClientRect().width/document.querySelector('.textPane').getBoundingClientRect().width);assert(ratio>2);
 await t.evaluate(()=>classroomController.setLayout('60'));await settle();ratio=await tv.evaluate(()=>document.getElementById('figurePane').getBoundingClientRect().width/document.querySelector('.textPane').getBoundingClientRect().width);assert(ratio>1.35&&ratio<1.7);
 await t.evaluate(()=>{if(classroomController.focusMode)classroomController.toggleFocus()});await tv.locator('#figurePane').dblclick();await settle();assert(!await tv.locator('.textPane').isVisible());assert.deepEqual((await snapshot()).ids,zoomBefore.ids);assert.equal(await tv.evaluate(()=>lastState.answerStep),2);await tv.locator('#figurePane').dblclick();await settle();assert(await tv.locator('.textPane').isVisible());await parity();check('Reused zoom, 70/30, 60/40, figure fullscreen and return preserve proof/highlight state');
 await t.evaluate(()=>{boardController.model(boardController.overlayKey()).add({type:'point',x:.25,y:.4});render();sync()});await settle();assert(await tv.locator('#drawOverlay [data-object-id]').count()>0);
 await t.evaluate(()=>{boardController.model(boardController.overlayKey()).undo();render();sync()});await settle();assert.equal(await tv.locator('#drawOverlay [data-object-id]').count(),0);
 await t.evaluate(()=>{boardController.model(boardController.overlayKey()).redo();render();sync()});await settle();assert(await tv.locator('#drawOverlay [data-object-id]').count()>0);
 await go(8);assert(await tv.locator('#drawOverlay [data-object-id]').count()>0);assert.equal((await snapshot()).imageSha256,first.imageSha256);
 t.once('dialog',d=>d.accept());await t.locator('#geometryTeacherControls button').filter({hasText:'XÓA CHÚ THÍCH'}).click();await settle();assert.equal(await tv.locator('#drawOverlay [data-object-id]').count(),0);assert.equal((await snapshot()).imageSha256,first.imageSha256);check('Annotation persists on same figure; undo/redo/clear touch teacher strokes only');
 await go(9);await t.evaluate(()=>{revealStep();zoomBy(.6);classroomController.focus={region:'answer',index:0};render();sync()});await settle();await t.locator('#geometryTeacherControls button').filter({hasText:'VỀ HÌNH GỐC'}).click();await settle();assert.equal(await tv.evaluate(()=>lastState.zoom),1);assert.equal(await tv.evaluate(()=>lastState.answerStep),1);await ids(['AD','CB','angle_ADH','angle_CBK']);check('Teacher reset reuses native zoom/focus reset and preserves base figure/current proof');
 await go(10);await t.evaluate(()=>revealStep());await settle();await ids(['AH','CK','HC','AK']);assert((await tv.locator('#answer').innerText()).includes('AHCK là hình bình hành'));await capture('GEOMETRY_CONCLUSION');
 await go(11);const nextFigure=await snapshot();assert.equal(nextFigure.figure,'LT2');assert.notEqual(nextFigure.imageSha256,first.imageSha256);assert.notEqual(nextFigure.overlayScope,first.overlayScope);await ids([]);assert.equal(await tv.locator('#drawOverlay [data-object-id]').count(),0);check('Conclusion retains base figure; explicit new-figure/reset separates scene and annotations');
 const realStates=[];
 for(let index=0;index<35;index++)for(const full of [false,true]){
  await go(index);if(full){await t.evaluate(()=>{toggleAnswer();for(let n=0;n<liveAnalysisSteps(lesson.screens[i]).length;n++)revealAnalysis()});await settle();}
  const record=await tv.evaluate(()=>{const p=document.querySelector('.textPane');return{index:lastState.index,answerMode:lastState.answerMode,figureId:screenEl.dataset.geometryFigure,overflow:p.scrollHeight>p.clientHeight+2,horizontal:p.scrollWidth>p.clientWidth+2}});
  assert(!record.overflow&&!record.horizontal,'real Geometry screen '+index+' '+(full?'full':'question'));realStates.push(record);
 }
 assert.equal(await t.evaluate(()=>JSON.stringify(lesson)),before);check('All 35 enriched real Geometry screens × 2 states fit; imported lesson remains byte-equivalent in memory');
 // Coordinate/model rendering fixtures do not add theorem facts or change the package.
 await go(5);await t.evaluate(async()=>{const test=JSON.parse(JSON.stringify(lesson));test.id='geometry-model-fixture';test.screens[5].geometry.highlights=['A','AH','angle_ADH','triangle_AHD','circle_H','line_BD','ray_AH','label_H','mark_K'];await saveLesson(test);start(test);go(5)});await settle();await ids(['A','AH','angle_ADH','triangle_AHD','circle_H','line_BD','ray_AH','label_H','mark_K']);await capture('GEOMETRY_OBJECT_MODEL');check('Point/segment/angle/triangle/circle plus line/ray/label/mark render authored coordinates only');
 for(const [width,height] of [[1920,1080],[1600,900],[1366,768],[1280,720]]){
  await tv.setViewportSize({width,height});
  await t.evaluate(()=>classroomController.setLayout('70'));await go(5);await capture('GT_KL_'+width+'x'+height);
  await go(7);await t.evaluate(()=>{revealAnalysis();revealAnalysis()});await settle();await capture('ANALYSIS_'+width+'x'+height);
  await go(9);await t.evaluate(()=>{revealStep();revealStep()});await settle();await capture('PROOF_'+width+'x'+height);
 }
 const mcqSource=await t.evaluate(()=>JSON.parse(JSON.stringify(lesson)));
 await t.evaluate(async l=>{l.id='geometry-vertical-mcq';l.screens[5].type='QUICK_CHECK';l.screens[5].content='Chọn hệ số.';l.screens[5].options=['−6','6','5'];l.screens[5].instruction='Chọn một.';await saveLesson(l);start(l);go(5)},mcqSource);
 for(const [width,height] of [[1920,1080],[1600,900],[1366,768],[1280,720]]){
  await tv.setViewportSize({width,height});await settle();assert.equal(await tv.locator('.tvOptionCard').count(),3);
  await tv.evaluate(()=>document.fonts.ready);const {rows,grid}=await tv.evaluate(()=>({rows:[...document.querySelectorAll('.tvOptionCard')].map(n=>{const r=n.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}}),grid:{width:document.querySelector('.tvOptionGrid').getBoundingClientRect().width}}));
  rows.forEach((r,i)=>{assert(Math.abs(r.w-grid.width)<1);if(i)assert(r.y>=rows[i-1].y+rows[i-1].h)});assert(!(await tv.locator('.tvOptionGrid').textContent()).includes('Chọn một.'));assert.equal(await tv.locator('.tvInstruction').textContent(),'Chọn một.');await capture('GEOMETRY_MCQ_'+width+'x'+height);
 }
 check('Explicit Geometry profile keeps vertical full-width MCQ with separate instructions at four TV sizes');
 await t.evaluate(async l=>{await saveLesson(l);start(l);go(9);revealStep();revealStep()},mcqSource);await settle();
 await tv.reload();await tv.waitForFunction(()=>lastState?.index===9);await settle();await ids(['triangle_AHD','triangle_CKB','AH','CK']);check('TV refresh restores persistent figure, current proof and related object highlights from existing state');
 assert.equal(errors.length,0);assert.equal(await tv.locator('button:not(.tvFull)').count(),0);check('Zero browser runtime errors; no Geometry teacher controls on TV');
 fs.writeFileSync(out+'/geometry-runtime.json',JSON.stringify({browser:browser.version(),checks,visual,errors,realPackageScreens:35,realStates,persistentImageHashes:images,persistentScopes:scopes,sourceUnchanged:true,nativeWindowsAudio:'UNRUN'},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
