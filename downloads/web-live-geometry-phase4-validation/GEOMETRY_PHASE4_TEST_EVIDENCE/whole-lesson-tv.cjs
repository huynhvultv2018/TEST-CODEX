const {chromium}=require('playwright'),fs=require('fs'),path=require('path');
const root='/workspace/TEST-CODEX/WEB_LIVE_GEOMETRY_PHASE3_CANDIDATE',out=__dirname;let browser;
(async()=>{
 browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 const c=await browser.newContext({viewport:{width:1366,height:768}}),errors=[],rows=[];c.on('page',p=>p.on('pageerror',e=>errors.push(e.message)));
 const t=await c.newPage();await t.goto('http://127.0.0.1:8773/WEB_LIVE/teacher.html');await t.locator('#zipfile').setInputFiles(root+'/GEOMETRY_PHASE3_TEST_PACKAGES/HINH8_VD2_GEOMETRY_PROFILE_TEST.zip');await t.waitForFunction(()=>lesson?.screens?.length===35);
 const pop=t.waitForEvent('popup');await t.getByRole('button',{name:'📺 MỞ TV',exact:true}).click();const tv=await pop;await tv.waitForLoadState();
 const settle=async()=>{const v=await t.evaluate(()=>stateVersion);await tv.waitForFunction(v=>lastState?.stateVersion>=v,v);await tv.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));};
 for(const size of [[1366,768],[1280,720]]){
  await tv.setViewportSize({width:size[0],height:size[1]});
  for(let index=0;index<35;index++){
   await t.locator('#jump').selectOption(String(index));await settle();
   for(const disclosure of ['hidden','full']){
    if(disclosure==='full'){
     const n=await t.evaluate(()=>liveAnalysisSteps(lesson.screens[i]).length);
     for(let k=0;k<n;k++)await t.locator('#analysisBtn').click();
     await t.locator('#ansBtn').click();await settle();
    }
    const metrics=await tv.evaluate(()=>{
     const p=document.querySelector('.textPane'),s=resolveScreen(lastState);
     const visible=[...document.querySelectorAll('#title,#content,.geometryStatementText,#analysis .focusBlock,#answer .focusBlock')].filter(n=>n.getClientRects().length&&getComputedStyle(n).display!=='none');
     return{index:lastState.index,title:s.title,figureId:WebLiveGeometry.getState().figureId,answerMode:lastState.answerMode,layout:lastState.classroom.layout,overflow:p.scrollHeight>p.clientHeight+2,horizontal:p.scrollWidth>p.clientWidth+2,visibleText:visible.map(n=>({text:n.innerText,fontPx:parseFloat(getComputedStyle(n).fontSize),height:n.getBoundingClientRect().height,width:n.getBoundingClientRect().width,horizontal:n.scrollWidth>n.clientWidth+2})),viewport:{width:innerWidth,height:innerHeight}};
    });rows.push({size,disclosure,...metrics});
    if(disclosure==='full'&&[14,18,29,33].includes(index))await tv.screenshot({path:path.join(out,'CAPTURES','REAL_LONG_'+size.join('x')+'_S'+(index+1)+'.png')});
   }
  }
 }
 const result={browser:browser.version(),platform:'Linux',screens:35,states:rows.length,rows,errors,overflowCases:rows.filter(r=>r.overflow||r.horizontal),nativePhysicalTV:'UNRUN',syntheticContentUsed:false};
 fs.writeFileSync(path.join(out,'WHOLE_LESSON_TV.json'),JSON.stringify(result,null,2)+'\n');await browser.close();
 console.log(JSON.stringify({states:result.states,overflowCases:result.overflowCases.length,errors,realContentOnly:true}));
})().catch(async e=>{fs.writeFileSync(path.join(out,'WHOLE_LESSON_TV_HARNESS_ERROR.json'),JSON.stringify({error:e.message,stack:e.stack},null,2));await browser?.close();process.exitCode=1});
