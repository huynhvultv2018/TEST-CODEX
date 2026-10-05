const {chromium}=require('playwright'),fs=require('fs'),assert=require('assert/strict');
const base=process.env.P122B_BASE||'http://127.0.0.1:8791',out=process.env.P122B_OUT||'/workspace/p12-2b-storage/EVIDENCE/SCALE';fs.mkdirSync(out,{recursive:true});
let browser;const result={result:'RUNNING',syntheticOnly:true,windows:'UNRUN',runs:[],errors:[],capacityUnlimited:false};
(async()=>{
 browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});result.browser=browser.version();
 for(const size of [32,96,192])for(const count of [10,50,100,250]){
  const c=await browser.newContext();c.on('page',p=>p.on('pageerror',e=>result.errors.push(e.message)));const t=await c.newPage();await t.goto(base+'/WEB_LIVE/teacher.html');await t.evaluate(()=>WebLiveSubjectStorage.ready);
  const run=await t.evaluate(async({size,count})=>{
   const stats={count,imageSide:size,saveResult:'RUNNING',listResult:'RUNNING',filterResult:'RUNNING',reopenResult:'RUNNING',storageErrorCount:0,rawAssetBytes:0,serializedUTF8Bytes:0,saveMs:0,listMs:0,reopenMs:0},metadata=['Hình học','Đại số','Tin học','Tài liệu khác'];
   for(let n=0;n<count;n++){
    const canvas=document.createElement('canvas');canvas.width=canvas.height=size;const ctx=canvas.getContext('2d'),image=ctx.createImageData(size,size);let seed=n+1;
    for(let k=0;k<image.data.length;k+=4){seed=(Math.imul(seed,1664525)+1013904223)>>>0;image.data[k]=seed&255;image.data[k+1]=(seed>>>8)&255;image.data[k+2]=(seed>>>16)&255;image.data[k+3]=255;}ctx.putImageData(image,0,0);
    const uri=canvas.toDataURL('image/png'),raw=atob(uri.split(',')[1]);stats.rawAssetBytes+=raw.length;
    const x={id:'SCALE_TEST_'+size+'_'+n,subject:metadata[n%4],grade:6+n%4,week:1+Math.floor(n/4)%25,period:1+n%12,title:'TEST ONLY synthetic '+n,screens:[{content:'TEST ONLY visible task '+n,imageData:uri,geometryImageData:uri,steps:['DISCLOSED_1','FUTURE_2']},{content:'TEST ONLY repeated image '+n,imageData:uri}]};
    stats.serializedUTF8Bytes+=new TextEncoder().encode(JSON.stringify(x)).length;
    const start=performance.now();try{await WebLiveSubjectStorage.saveLesson(x);}catch(e){stats.storageErrorCount++;throw e;}stats.saveMs+=performance.now()-start;
   }
   stats.saveResult='PASS';let start=performance.now();const list=WebLiveSubjectStorage.listLessons();stats.listMs=performance.now()-start;if(list.length!==count)throw Error('List count mismatch');stats.listResult='PASS';
   if(Object.keys(localStorage).some(k=>k.startsWith('lesson:')))throw Error('New full payload in localStorage');
   const expected=list.filter(x=>x.subject==='Tin học'&&x.grade===8).map(x=>x.id).sort();showImporter();document.getElementById('lessonSubject').value='informatics';document.getElementById('lessonSubject').dispatchEvent(new Event('change'));
   document.getElementById('lessonGrade').value='n:8';document.getElementById('lessonGrade').dispatchEvent(new Event('change'));const found=[...document.querySelectorAll('#library .libraryLesson')].map(n=>n.dataset.lessonId).sort();
   if(JSON.stringify(found)!==JSON.stringify(expected))throw Error('Subject/grade filter mismatch');
   const week='n:1';document.getElementById('lessonWeek').value=week;document.getElementById('lessonWeek').dispatchEvent(new Event('change'));
   const weekExpected=list.filter(x=>x.subject==='Tin học'&&x.grade===8&&x.week===1).map(x=>x.id).sort(),weekFound=[...document.querySelectorAll('#library .libraryLesson')].map(n=>n.dataset.lessonId).sort();if(JSON.stringify(weekExpected)!==JSON.stringify(weekFound))throw Error('Week filter mismatch');stats.filterResult='PASS';
   try{stats.approxStorageUse=await navigator.storage.estimate();}catch(_){stats.approxStorageUse={usage:null,quota:null};}stats.localStorageKeys=Object.keys(localStorage);return stats;
  },{size,count});
  await t.reload();await t.evaluate(()=>WebLiveSubjectStorage.ready);const reopened=await t.evaluate(async count=>{const start=performance.now(),ids=WebLiveSubjectStorage.listLessons().map(x=>x.id);if(ids.length!==count)throw Error('Reload list count');for(const id of ids){const x=await WebLiveSubjectStorage.readLesson(id);if(x.id!==id||x.screens.length!==2||x.screens[0].imageData!==x.screens[0].geometryImageData||x.screens[0].imageData!==x.screens[1].imageData)throw Error('Hydrate integrity mismatch');}return {count:ids.length,ms:performance.now()-start};},count);
  run.reopenResult='PASS';run.reopenedCount=reopened.count;run.reopenMs=reopened.ms;run.result='PASS';result.runs.push(run);fs.writeFileSync(out+'/SCALE_RESULTS.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({side:size,count,result:'PASS',rawBytes:run.rawAssetBytes,usage:run.approxStorageUse.usage,reopened:run.reopenedCount}));await c.close();
 }
 assert.deepEqual(result.errors,[]);result.result='PASS';fs.writeFileSync(out+'/SCALE_RESULTS.json',JSON.stringify(result,null,2)+'\n');await browser.close();
})().catch(async e=>{result.result='FAIL';result.error={message:e.message,stack:e.stack};fs.writeFileSync(out+'/SCALE_RESULTS.json',JSON.stringify(result,null,2)+'\n');await browser?.close();console.error(e);process.exitCode=1;});
