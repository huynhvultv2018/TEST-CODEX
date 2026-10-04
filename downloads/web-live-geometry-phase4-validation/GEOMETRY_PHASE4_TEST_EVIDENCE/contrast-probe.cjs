const {chromium}=require('playwright'),fs=require('fs');let b;
(async()=>{
 b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});const c=await b.newContext({viewport:{width:1920,height:1080}}),t=await c.newPage();
 await t.goto('http://127.0.0.1:8773/WEB_LIVE/teacher.html');await t.locator('#zipfile').setInputFiles('/workspace/TEST-CODEX/WEB_LIVE_GEOMETRY_PHASE3_CANDIDATE/GEOMETRY_PHASE3_TEST_PACKAGES/HINH8_VD2_GEOMETRY_PROFILE_TEST.zip');await t.waitForFunction(()=>lesson?.subject_engine==='geometry');
 const popup=t.waitForEvent('popup');await t.getByRole('button',{name:'📺 MỞ TV',exact:true}).click();const tv=await popup;await tv.waitForLoadState();await t.locator('#jump').selectOption('5');await tv.waitForFunction(()=>lastState?.index===5);await tv.waitForTimeout(200);
 const rows=await tv.locator('.geometryStatementText').evaluateAll(ns=>ns.map(n=>{
  const rgb=s=>s.match(/[\d.]+/g).slice(0,3).map(Number),lum=vs=>vs.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
  const s=getComputedStyle(n),p=getComputedStyle(n.parentElement),fg=lum(rgb(s.color)),bg=lum(rgb(p.backgroundColor));return{text:n.innerText,foreground:s.color,background:p.backgroundColor,contrast:(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05)};
 }));
 const result={browser:b.version(),actualTV:true,rows,gtKlContrastPass:rows.length===2&&rows.every(r=>r.contrast>=4.5)};
 fs.writeFileSync(__dirname+'/GT_KL_CONTRAST.json',JSON.stringify(result,null,2)+'\n');await b.close();console.log(JSON.stringify(result));
})().catch(async e=>{console.error(e);await b?.close();process.exitCode=1});
