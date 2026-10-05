/* Teacher-only contract guide; TV loads only the shared rendering helpers. */
class PedagogyTeacher{
 el(id){return document.getElementById(id)}
 text(id,value){this.el(id).textContent=livePedagogyText(value)||'—'}
 render(s){
  const enabled=livePedagogyEnabled(lesson),close=livePedagogyIsClose(lesson,s);
  this.el('pedagogySection').hidden=!enabled&&!s.teacherProbe&&!s.expectedResponse&&!s.commonError&&!s.notes;
  this.text('pedagogyGuidanceText',typeof s.pedagogyGuidance==='object'?s.pedagogyGuidance?.instruction||s.pedagogyGuidance?.guidance||s.pedagogyGuidance?.notes: s.pedagogyGuidance);
  this.el('hintBtn').textContent=enabled?'💡 GỢI Ý 1':'💡 GỢI Ý';
  this.el('hint2Btn').hidden=!enabled||!livePedagogyGuidance(s,'hintLevel2');
  this.el('hint2Btn').disabled=!hintLevel;
  this.el('hint2Btn').classList.toggle('active',hintLevel===2);
  this.el('hideHintsBtn').hidden=!enabled;
  this.el('closeKnowledgeBtn').hidden=!close;
  this.el('closeKnowledgeBtn').textContent=knowledgeCloseVisible?'ẨN CHỐT KIẾN THỨC':'CHỐT KIẾN THỨC';
  this.el('previewKnowledgeWait').hidden=!close||knowledgeCloseVisible;
  
  const stage=livePedagogyStage(lesson,s),core=livePedagogyCore(s);
  const policy=lesson.pedagogyPolicy||{},marks=[];
  if(policy.critical_task_ids?.includes(s.id))marks.push('Điểm khó');
  if(policy.quick_check_task_ids?.includes(s.id))marks.push('Kiểm tra hiểu');
  this.el('pedagogyMeta').textContent=[stage,core,Number.isFinite(s.timeBudgetMin)?s.timeBudgetMin+' phút':'',...marks].filter(Boolean).join(' · ');
  this.el('pedagogyFlow').textContent=Object.entries(lesson.pedagogyFlow||{}).map(([k,id])=>k+(id===s.id?' ◀':'')+' ('+id+')').join(' → ');
  this.el('pedagogyPolicy').textContent=[policy.max_passive_min!=null?'Giới hạn nghe/đọc: '+policy.max_passive_min+' phút':'',policy.time_reserve_min!=null?'Dự phòng: '+policy.time_reserve_min+' phút':'',core==='CORE'?'CORE: không tự bỏ.':core?'Phần '+core+': GV quyết định.':''].filter(Boolean).join(' · ');
  this.text('teacherProbe',livePedagogyGuidance(s,'teacherProbe'));
  this.text('expectedResponse',livePedagogyGuidance(s,'expectedResponse'));
  this.text('commonError',livePedagogyGuidance(s,'commonError'));
  this.el('resourceGuide').hidden=!s.resourceRequired&&!s.resourceLocation&&!s.resourceFocus;
  this.text('resourceLocation',s.resourceLocation);
  this.text('resourceFocus',s.resourceFocus);
  this.el('offlineGuide').hidden=!s.onlineDependency&&!s.offlineFallback&&!s.offlineWarning;
  this.el('onlineStatus').textContent=s.onlineDependency?'Nhiệm vụ cần Internet.':'Nhiệm vụ không yêu cầu Internet theo metadata.';
  this.text('offlineFallback',s.offlineFallback);
  this.text('offlineWarning',s.offlineWarning);
  const ref=s.sgkTrace?.sourceRef||s.teachingTrace?.priorSgk||s.teachingTrace?.targetSourceRef;
  this.el('pedagogyTrace').textContent=ref?[ref.path,ref.book_page!=null?'SGK trang '+ref.book_page:'',ref.anchor].filter(Boolean).join(' · '):'Màn điều phối; xem ghi chú GV.';
  this.el('knowledgePreview').hidden=!close;
  this.text('knowledgeText',close?s.content:'');
 }
}
function setPedagogyHintLevel(level){
 if(!lesson||!livePedagogyEnabled(lesson))return;
 const s=lesson.screens[i];
 if(level===2&&(!hintLevel||!livePedagogyGuidance(s,'hintLevel2')))return;
 hintLevel=[1,2].includes(level)?level:0;showHint=hintLevel>0;render();sync();
}
function toggleKnowledgeClose(){if(!lesson||!livePedagogyIsClose(lesson,lesson.screens[i]))return;knowledgeCloseVisible=!knowledgeCloseVisible;render();sync()}
pedagogyController=new PedagogyTeacher();
/* Restore only an accepted RC3 lesson/source at its saved index. A task opens
 * with all disclosures hidden again. Do not resume apps or pending tools. */
async function restorePedagogySession(){
 if(lesson)return;
 await WebLiveSubjectStorage.ready;if(lesson)return;
 const saved=readState();if(!saved?.lessonId||!Number.isInteger(saved.index))return;
 let x;try{x=await WebLiveSubjectStorage.readLesson(saved.lessonId);}catch(_){return;}if(lesson)return;
 if(!x||!valid(x)||x.id!==saved.lessonId||(x._runtimeSourceKey||'')!==(saved.lessonSourceKey||'')||saved.index<0||saved.index>=x.screens.length)return;
 start(x,{index:saved.index,clock:saved.classroom?.clock});
}
restorePedagogySession();
