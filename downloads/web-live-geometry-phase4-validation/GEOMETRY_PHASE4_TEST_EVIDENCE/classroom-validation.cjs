const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('assert/strict');
const source='/workspace/TEST-CODEX/WEB_LIVE_GEOMETRY_PHASE3_CANDIDATE',out=__dirname;
const captures=path.join(out,'CAPTURES');fs.mkdirSync(captures,{recursive:true});
const imageHash=s=>s&&s.startsWith('data:')?crypto.createHash('sha256').update(Buffer.from(s.split(',')[1]||'','base64')).digest('hex'):null;
const result={browser:null,platform:'Linux',source,errors:[],checks:[],continuousFlow:[],actions:[],stateTests:[],readability:[],nativeWindows:'UNRUN',physicalTV:'UNRUN',backOfClassroom:'UNRUN',audibleTTS:'UNRUN'};
const save=()=>fs.writeFileSync(path.join(out,'CLASSROOM_VALIDATION.json'),JSON.stringify(result,null,2)+'\n');
let ownedBrowser;
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']}),c=await browser.newContext({viewport:{width:1366,height:768}});
 ownedBrowser=browser;
 result.browser=browser.version();c.on('page',p=>p.on('pageerror',e=>result.errors.push({page:p.url(),message:e.message})));
 const t=await c.newPage();await t.goto('http://127.0.0.1:8773/WEB_LIVE/teacher.html');
 const original=source+'/WEB_LIVE/HINH_HOC_8_T04_T07_DUAL_VISUAL_TEST.zip',profile=source+'/GEOMETRY_PHASE3_TEST_PACKAGES/HINH8_VD2_GEOMETRY_PROFILE_TEST.zip';
 await t.locator('#zipfile').setInputFiles(original);await t.waitForFunction(()=>lesson?.screens?.length===35);
 result.originalImport=await t.evaluate(()=>({profile:WebLiveProfiles.resolve(lesson).profileId,geometryState:WebLiveGeometry.getState(),title:lesson.title,subject:lesson.subject,subject_engine:lesson.subject_engine||null}));
 await t.locator('#zipfile').setInputFiles(profile);await t.waitForFunction(()=>lesson?.subject_engine==='geometry');
 const originalMemory=await t.evaluate(()=>JSON.stringify(lesson));
 const pop=t.waitForEvent('popup');await t.getByRole('button',{name:'📺 MỞ TV',exact:true}).click();const tv=await pop;await tv.waitForLoadState();await tv.setViewportSize({width:1920,height:1080});
 async function settle(){const version=await t.evaluate(()=>stateVersion);await tv.waitForFunction(v=>lastState?.stateVersion>=v,version);await tv.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await tv.waitForTimeout(70);}
 async function snap(){await settle();const s=await tv.evaluate(()=>{
  const box=n=>{if(!n||!n.getClientRects().length)return null;const r=n.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}};
  const p=document.querySelector('.textPane'),sc=resolveScreen(lastState);
  return{index:lastState.index,title:sc.title,type:sc.type,figureId:WebLiveGeometry.getState()?.figureId,image:pic.getAttribute('src'),ownImage:sc.imageData||sc.geometryImageData||null,ownImagePath:sc.image||null,scope:lastState.board.overlayScope,zoom:lastState.zoom,pan:lastState.pan,answerMode:lastState.answerMode,answerStep:lastState.answerStep,analysisStep:lastState.analysisStep,layout:lastState.classroom.layout,focus:lastState.classroom.focus,ids:[...document.querySelectorAll('#geometryObjectHighlight [data-geometry-object-id]')].map(n=>n.dataset.geometryObjectId).sort(),annotationIds:[...document.querySelectorAll('#drawOverlay [data-object-id]')].map(n=>n.dataset.objectId).filter((v,i,a)=>a.indexOf(v)===i).sort(),content:document.getElementById('content').innerText,answer:document.getElementById('answer').innerText,analysis:document.getElementById('analysis').innerText,answerVisible:!!box(document.getElementById('answer')),textPane:box(p),figurePane:box(document.getElementById('figurePane')),picture:box(pic),overflow:p.scrollHeight>p.clientHeight+2,horizontalOverflow:p.scrollWidth>p.clientWidth+2,studentControlCount:document.querySelectorAll('#geometryTeacherControls,button:not(.tvFull)').length,geometry:WebLiveGeometry.getState()};
 });s.imageSha256=imageHash(s.image);s.ownImageSha256=imageHash(s.ownImage);delete s.image;delete s.ownImage;return s;}
 async function capture(name){const s=await snap();await tv.screenshot({path:path.join(captures,name+'.png')});return s;}
 async function go(n){await t.locator('#jump').selectOption(String(n));await settle();}
 async function click(selector,description,category='diagnostic'){const start=Date.now();await t.locator(selector).click();await settle();result.actions.push({category,kind:'click',selector,description,elapsedMs:Date.now()-start});}
 async function key(k,description,category='continuous'){await t.keyboard.press(k);await settle();result.actions.push({category,kind:'keypress',key:k,description});}
 const verify=(name,condition,evidence)=>{result.checks.push({name,result:condition?'PASS':'FAIL',evidence});console.log((condition?'PASS ':'FAIL ')+name);};
 await t.locator('#lessonTitle').click();result.actions.push({category:'continuous',kind:'click',description:'Focus Teacher page for existing keyboard commands'});
 for(let index=0;index<35;index++){
  if(index)await key('ArrowRight','Màn tiếp theo');
  const hidden=await snap(),definition=await t.evaluate(()=>({proofCount:liveSteps(lesson.screens[i]).length,analysisCount:liveAnalysisSteps(lesson.screens[i]).length,links:lesson.screens[i].geometry?.proofLinks||[],analysisLinks:lesson.screens[i].geometry?.analysisLinks||[]}));
  assert.equal(hidden.index,index);
  const revealed=[];
  for(let j=0;j<definition.analysisCount;j++){await click('#analysisBtn','Reveal analysis step','continuous');revealed.push({kind:'analysis',ordinal:j+1,...await snap()});}
  // Clicks on analysis leave focus on a button; ordinary keyboard teaching remains available.
  for(let j=0;j<definition.proofCount;j++){await key('s','Reveal proof step');revealed.push({kind:'proof',ordinal:j+1,...await snap()});}
  result.continuousFlow.push({index,definition,hidden,revealed});
  if([5,7,9,11,20,23,26,29,34].includes(index))await capture('WHOLE_LESSON_'+String(index+1).padStart(2,'0'));
  save();
 }
 verify('All 35 real-content screens walked with native UI/keyboard',result.continuousFlow.length===35,{screens:35});
 const crossings=[20,23,26,29].map(index=>result.continuousFlow[index].hidden);
 verify('New exercises show their supplied figure instead of LT2',crossings.every(s=>s.imageSha256===s.ownImageSha256),crossings);
 const vd2=result.continuousFlow.slice(5,11).map(r=>r.hidden);
 verify('VD2 base figure and annotation scope persist across six stages',new Set(vd2.map(r=>r.imageSha256)).size===1&&new Set(vd2.map(r=>r.scope)).size===1,vd2.map(({index,figureId,imageSha256,scope})=>({index,figureId,imageSha256,scope})));
 const proof=result.continuousFlow[9].revealed.filter(r=>r.kind==='proof');
 verify('VD2 proof 1/2 linked objects change correctly',JSON.stringify(proof[0].ids)===JSON.stringify(['AD','CB','angle_ADH','angle_CBK'].sort())&&JSON.stringify(proof[1].ids)===JSON.stringify(['triangle_AHD','triangle_CKB','AH','CK'].sort()),proof.map(({ordinal,ids,answer})=>({ordinal,ids,answer})));
 result.proofCoverage=result.continuousFlow.flatMap(r=>r.revealed.filter(s=>s.kind==='proof').map(s=>({index:r.index,title:s.title,step:s.ordinal,figureId:s.figureId,ids:s.ids,hasAuthoredLink:!!r.definition.links[s.ordinal-1]?.length})));
 // UI mode/Focus/zoom test on the real two-step proof, without changing lesson data.
 await go(9);await click('button[onclick="revealStep()"]','Proof 1');await click('button[onclick="revealStep()"]','Proof 2');
 await t.locator('#classroomGroup > summary').click();
 await t.locator('#displayToolsGroup > summary').click();
 const beforeModes=await snap();
 for(const id of ['layout70','layout60','layoutFull','layoutFull']){
  await click('#'+id,'Presentation '+id,'mode');const after=await snap();result.stateTests.push({test:id,before:beforeModes,after,preserved:after.imageSha256===beforeModes.imageSha256&&after.answerStep===beforeModes.answerStep&&JSON.stringify(after.ids)===JSON.stringify(beforeModes.ids)});
 }
 await click('#focusMode','Enable Focus','mode');await click('#previewAnswer .focusBlock:first-child','Focus earlier disclosed step','mode');
 const focused=await capture('FOCUS_PROOF_1');
 result.focus={snapshot:focused,blocks:await tv.locator('#answer .focusBlock').evaluateAll(ns=>ns.map(n=>({text:n.innerText,display:getComputedStyle(n).display,opacity:getComputedStyle(n).opacity,focused:n.classList.contains('isFocused')})))};
 verify('Focus selects earlier proof and matching objects',focused.ids.includes('AD')&&!focused.ids.includes('triangle_AHD')&&focused.answerStep===2,result.focus);
 await click('button[onclick="classroomController.clearFocus()"]','Clear Focus');await click('#focusMode','Disable Focus','mode');
 const zoomBefore=await snap();await click('button[onclick="zoomBy(.15)"]','Zoom figure','mode');const zoomed=await capture('ZOOM_PROOF');
 await click('button[onclick="resetZoom()"]','Return normal figure','mode');const zoomReturn=await snap();
 result.stateTests.push({test:'zoom-return',before:zoomBefore,zoomed,after:zoomReturn,preserved:zoomReturn.answerStep===zoomBefore.answerStep&&JSON.stringify(zoomReturn.ids)===JSON.stringify(zoomBefore.ids)&&zoomReturn.imageSha256===zoomBefore.imageSha256});
 // Native drawing workflow. User-entered annotation is not lesson content.
 await click('#drawOpenBtn','Open drawing controls','annotation');await click('[data-board-tool="point"]','Point tool','annotation');
 async function location(x,y){await t.locator('#drawOverlay').scrollIntoViewIfNeeded();const r=await t.locator('#drawOverlay').boundingBox();return{x:r.x+r.width*x,y:r.y+r.height*y};}
 const p=await location(.35,.35);await t.mouse.click(p.x,p.y);await settle();result.actions.push({category:'annotation',kind:'click',description:'Place teacher point'});
 const pointId=await t.evaluate(()=>boardController.model(boardController.overlayKey()).objects.find(o=>o.type==='point')?.id);assert(pointId);
 async function clickPoint(){const n=t.locator('#drawOverlay [data-object-id="'+pointId+'"]').first();await n.scrollIntoViewIfNeeded();const r=await n.boundingBox();await t.mouse.click(r.x+r.width/2,r.y+r.height/2);await settle();}
 await click('[data-board-tool="label"]','Label tool','annotation');t.once('dialog',d=>d.accept('P'));await clickPoint();
 result.actions.push({category:'annotation',kind:'click',description:'Choose point and enter annotation label P'});
 await click('[data-board-tool="segment"]','Segment tool','annotation');let a=await location(.45,.6),b=await location(.65,.6);await t.mouse.click(a.x,a.y);await t.mouse.click(b.x,b.y);await settle();
 result.actions.push({category:'annotation',kind:'click',count:2,description:'Draw segment on figure'});
 await click('[data-board-tool="marker"]','Marker tool','annotation');a=await location(.45,.45);b=await location(.55,.5);await t.mouse.move(a.x,a.y);await t.mouse.down();await t.mouse.move(b.x,b.y,{steps:8});await t.mouse.up();await settle();
 result.actions.push({category:'annotation',kind:'drag',description:'Mark figure'});
 const annotated=await capture('ANNOTATION_MARK_DRAW_LABEL');result.annotationTypes=await t.evaluate(()=>boardController.model(boardController.overlayKey()).objects.map(o=>o.type));
 await click('[data-board-tool="eraser"]','Eraser tool','annotation');await clickPoint();const erased=await snap();
 await click('#drawUndo','Undo erase','annotation');const undo=await snap();await click('#drawRedo','Redo erase','annotation');const redo=await snap();
 verify('MARK/DRAW/LABEL/ERASE/UNDO/REDO work on native annotation',result.annotationTypes.includes('marker')&&result.annotationTypes.includes('segment')&&result.annotationTypes.includes('label')&&!erased.annotationIds.includes(pointId)&&undo.annotationIds.includes(pointId)&&!redo.annotationIds.includes(pointId),{types:result.annotationTypes,annotated,erased,undo,redo});
 // Draw one fresh point, then examine real navigation and state leakage.
 await click('[data-board-tool="point"]','Add persistence marker','annotation');a=await location(.3,.3);await t.mouse.click(a.x,a.y);await settle();
 await click('button[onclick="zoomBy(.15)"]','Zoom before same-figure navigation','mode');const beforeNavigation=await snap();await go(10);const afterNavigation=await snap();
 result.stateTests.push({test:'same-figure-navigation',before:beforeNavigation,after:afterNavigation,figurePreserved:beforeNavigation.imageSha256===afterNavigation.imageSha256,annotationPreserved:JSON.stringify(beforeNavigation.annotationIds)===JSON.stringify(afterNavigation.annotationIds),zoomPreserved:beforeNavigation.zoom===afterNavigation.zoom});
 await go(11);const cleanLT2=await snap();verify('VD2 → LT2 reset separates annotation',cleanLT2.annotationIds.length===0&&cleanLT2.scope!==beforeNavigation.scope,{before:beforeNavigation,after:cleanLT2});
 await click('[data-board-tool="point"]','Point on LT2 for leakage test','annotation');a=await location(.3,.3);await t.mouse.click(a.x,a.y);await settle();const lt2Annotated=await snap();await go(20);const tt2=await capture('ANNOTATION_LEAK_LT2_TO_TT2');
 verify('LT2 annotations do not leak into new TT2 exercise',lt2Annotated.scope!==tt2.scope&&tt2.annotationIds.length===0,{lt2:lt2Annotated,tt2});
 await go(9);t.once('dialog',d=>d.accept());await click('#geometryTeacherControls button:last-child','Clear annotation','annotation');const cleared=await snap();
 verify('CLEAR ANNOTATION keeps base image',cleared.annotationIds.length===0&&cleared.imageSha256===annotated.imageSha256,{annotated,cleared});
 // Readability over TV-equivalent viewports and 70/30 + 60/40; no browser zoom.
 await click('#drawOpenBtn','Close drawing controls','annotation');
 for(const size of [[1920,1080],[1366,768],[1280,720],[3840,2160]]){
  await tv.setViewportSize({width:size[0],height:size[1]});
  for(const index of [5,7,9])for(const layout of ['70','60']){
   await go(index);await click('#layout'+layout,'Readability layout '+layout,'readability');
   if(index===7)for(let n=0;n<4;n++)await click('#analysisBtn','Reveal real analysis','readability');
   if(index===9)for(let n=0;n<2;n++)await click('button[onclick="revealStep()"]','Reveal real proof','readability');
   const snapshot=await capture('TV_'+size.join('x')+'_S'+(index+1)+'_'+layout);
   const metrics=await tv.evaluate(()=>{
    const rows=[...document.querySelectorAll('.geometryStatementText,#analysis .focusBlock,#answer .focusBlock')].filter(n=>n.getClientRects().length&&getComputedStyle(n).display!=='none').map(n=>{const s=getComputedStyle(n),r=n.getBoundingClientRect();return{text:n.innerText,fontPx:parseFloat(s.fontSize),lineHeight:s.lineHeight,color:s.color,opacity:s.opacity,width:r.width,height:r.height,overflow:n.scrollWidth>n.clientWidth+2}});
    const svg=document.getElementById('geometryObjectHighlight'),pic=document.getElementById('pic'),r=pic.getBoundingClientRect(),s=svg?.getBoundingClientRect();
    return{rows,devicePixelRatio,viewport:{width:innerWidth,height:innerHeight},imageNatural:{width:pic.naturalWidth,height:pic.naturalHeight},highlightAlignment:s?{dx:Math.abs(r.x-s.x),dy:Math.abs(r.y-s.y),dw:Math.abs(r.width-s.width),dh:Math.abs(r.height-s.height)}:null,statementCount:document.querySelectorAll('.geometryStatementLabel').length};
   });result.readability.push({size,layout,index,...metrics,snapshot});
  }
 }
 verify('TV equivalent viewports: no text-pane overflow or teacher controls',result.readability.every(r=>!r.snapshot.overflow&&!r.snapshot.horizontalOverflow&&r.snapshot.studentControlCount===0),{cases:result.readability.length});
 const allAlignment=result.readability.filter(r=>r.highlightAlignment).every(r=>Object.values(r.highlightAlignment).every(v=>v<2));verify('Highlight layer stays aligned with base image',allAlignment,result.readability.map(({size,layout,index,highlightAlignment})=>({size,layout,index,highlightAlignment})));
 result.sourceLessonUnchanged=originalMemory===await t.evaluate(()=>JSON.stringify(lesson));
 result.continuousCounts={screens:35,clickCount:result.actions.filter(a=>a.category==='continuous'&&a.kind==='click').reduce((n,a)=>n+(a.count||1),0),keypressCount:result.actions.filter(a=>a.category==='continuous'&&a.kind==='keypress').length,modeChangeCount:0,unnecessaryActionCount:0,notes:'Measured baseline path uses existing ArrowRight/S plus four analysis-button clicks; does not include OS file chooser/open TV or diagnostic actions. Problems on wrong figures require stopping instead of silent workaround.'};
 result.setup={manualDataEditsDuringImport:0,originalPackageSelectsLegacy:true,geometryExportProducerPresent:false,notes:'Zero edits applies only to already-authored Phase 3 package. Original existing source does not activate Geometry. Authoring overhead recorded separately in PACKAGE_PROVENANCE.json.'};
 verify('Lesson memory unchanged during validation',result.sourceLessonUnchanged,{});verify('Zero runtime exceptions',result.errors.length===0,result.errors);
 save();await browser.close();
 console.log(JSON.stringify({completed:true,checks:result.checks.map(x=>({name:x.name,result:x.result})),continuousCounts:result.continuousCounts,captures:fs.readdirSync(captures).length,readabilityCases:result.readability.length}));
})().catch(async e=>{result.harnessError={message:e.message,stack:e.stack};save();console.error(e);await ownedBrowser?.close();process.exitCode=1});
