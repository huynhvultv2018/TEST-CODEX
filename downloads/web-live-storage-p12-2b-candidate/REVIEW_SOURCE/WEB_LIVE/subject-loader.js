// Teacher-only loader. Native Core start/reset/sync and profile engines stay unchanged.
(()=>{
 'use strict';
 const subjects=Object.freeze([
  Object.freeze({id:'geometry',label:'HÌNH HỌC',name:'Hình học'}),
  Object.freeze({id:'algebra',label:'ĐẠI SỐ',name:'Đại số'}),
  Object.freeze({id:'informatics',label:'TIN HỌC',name:'Tin học'}),
  Object.freeze({id:'legacy',label:'BÀI CŨ / LEGACY',name:'Legacy'})
 ]);
 const select=$('lessonSubject'),button=$('subjectLoadBtn'),preview=$('subjectPreview'),error=$('error');
 let pending=null,revision=0,busy=false;
 for(const subject of subjects){const option=document.createElement('option');option.value=subject.id;option.textContent=subject.label;select.append(option);}
 const indicator=document.createElement('span');indicator.id='subjectIndicator';indicator.setAttribute('role','status');indicator.hidden=true;
 $('lessonTitle').after(indicator);
 // Optional, bounded references only. This namespace never owns lesson storage.
 const quickKey='webLiveSubjectLoaderQuickAccessPhase11',recentLimit=5,quickSizeLimit=8192;
 let quick={version:1,lastSubject:null,recent:[]};
 const remembered=document.createElement('span');remembered.id='rememberedSubject';remembered.hidden=true;
 select.closest('label').append(remembered);
 const storageWarning=document.createElement('p');storageWarning.id='subjectStorageWarning';storageWarning.setAttribute('role','status');storageWarning.hidden=true;document.body.append(storageWarning);
 const recentPanel=document.createElement('section');recentPanel.id='recentLessons';
 const recentHeading=document.createElement('h2');recentHeading.className='subjectStep';recentHeading.textContent='BÀI GẦN ĐÂY';
 const recentList=document.createElement('div');recentList.className='quickRecentList';recentPanel.append(recentHeading,recentList);$('library').parentElement.before(recentPanel);
 function warnStorage(message){storageWarning.textContent=message;storageWarning.hidden=!message;}
 const validSubject=id=>subjects.some(s=>s.id===id);
 const scalar=(value,max)=>typeof value==='number'&&Number.isFinite(value)?value:typeof value==='string'&&!/^data:/iu.test(value)?value.slice(0,max):undefined;
 function recentEntry(x,id,lastOpened){
  if(typeof id!=='string'||!id||id.length>512||/^data:/iu.test(id))throw Error('Không thể ghi nhận mã bài vào truy cập nhanh.');
  const entry={id,subjectEngine:engine(x),lastOpened};
  for(const [key,max] of [['title',160],['subject',80],['grade',32],['class',32],['week',32],['period',32]]){
   const value=scalar(x[key],max);if(value!==undefined)entry[key]=value;
  }
  return entry;
 }
 function renderRemembered(){remembered.hidden=!quick.lastSubject;remembered.textContent=quick.lastSubject?'MÔN ĐÃ NHỚ: '+subjects.find(s=>s.id===quick.lastSubject).label:'';}
 function readQuick(){
  try{
   const raw=localStorage.getItem(quickKey);if(raw===null)return;
   if(raw.length>quickSizeLimit)throw Error('Dữ liệu quá lớn');
   const value=JSON.parse(raw);
   if(!value||value.version!==1||!Array.isArray(value.recent)||value.recent.length>recentLimit)throw Error('Dữ liệu không hợp lệ');
   if(value.lastSubject!==null&&!validSubject(value.lastSubject))throw Error('Môn không hợp lệ');
   const entries=[],seen=new Set();
   for(const item of value.recent){
    if(!item||!validSubject(item.subjectEngine)||typeof item.lastOpened!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(item.lastOpened)||!Number.isFinite(Date.parse(item.lastOpened)))throw Error('Bài gần đây không hợp lệ');
    const entry=recentEntry({...item,subject_engine:item.subjectEngine},item.id,item.lastOpened);
    if(!seen.has(entry.id)){seen.add(entry.id);entries.push(entry);}
   }
   quick={version:1,lastSubject:value.lastSubject,recent:entries.sort((a,b)=>b.lastOpened.localeCompare(a.lastOpened))};
   if(quick.lastSubject)select.value=quick.lastSubject;
  }catch(_){warnStorage('Không đọc được thông tin môn đã nhớ/bài gần đây. Bạn vẫn có thể chọn môn và nạp bài như bình thường.');}
 }
 function renderRecent(){
  recentList.replaceChildren();
  if(!quick.recent.length){const empty=document.createElement('p');empty.className='muted';empty.textContent='Chưa có bài đã nạp thành công.';recentList.append(empty);return;}
  for(const entry of quick.recent){
   const cached=WebLiveSubjectStorage.getMetadata(entry.id),metadata=cached||entry,row=document.createElement('div');row.className='quickRecentItem';
   const text=document.createElement('div'),title=document.createElement('b');title.textContent=String(metadata.title||entry.title||'Bài đã lưu');text.append(title);
   const context=document.createElement('div');context.className='small';
   const fields=[metadata.subject,metadata.grade??metadata.class,metadata.week,metadata.period];
   const labels=['','Lớp ','Tuần ','Tiết '];
   let mode;try{mode=label(engine(cached||{subject_engine:entry.subjectEngine}));}catch(_){mode='chưa hợp lệ';}
   context.textContent=[...fields.map((v,n)=>v==null||v===''?'':labels[n]+String(v)).filter(Boolean),'Chế độ chạy: '+mode].join(' · ');text.append(context);
   const opened=document.createElement('div');opened.className='small';opened.textContent='Mở gần nhất: '+new Date(entry.lastOpened).toLocaleString('vi-VN');text.append(opened);
   const choose=document.createElement('button');choose.type='button';choose.textContent=cached?'CHỌN BÀI':'Bài không còn trong thư viện';choose.disabled=!cached;
   choose.addEventListener('click',()=>openSaved(entry.id));row.append(text,choose);recentList.append(row);
  }
 }
 function rememberSuccess(x){
  try{
   const entry=recentEntry(x,x.id,new Date().toISOString());
   const next={version:1,lastSubject:subjectIdentity(x).id,recent:[entry,...quick.recent.filter(item=>item.id!==entry.id)].slice(0,recentLimit)};
   const raw=JSON.stringify(next);if(raw.length>quickSizeLimit)throw Error('Dữ liệu quá lớn');
   localStorage.setItem(quickKey,raw);quick=next;warnStorage('');renderRemembered();renderRecent();
  }catch(_){warnStorage('Bài đã nạp thành công, nhưng không lưu được môn đã nhớ/bài gần đây. Lần mở sau có thể không có cập nhật này.');}
 }
 const label=id=>subjects.find(s=>s.id===id)?.name||id;
 // Saved-library discovery only: three in-memory values, no storage/cache writes.
 const filterState={grade:'',week:'',period:''},filterControls={};
 const filterNames={grade:'LỚP',week:'TUẦN',period:'TIẾT'},missingValue='missing';
 const collator=new Intl.Collator('vi',{numeric:true,sensitivity:'base'});
 const filterPanel=document.createElement('div');filterPanel.id='libraryFilters';
 for(const key of Object.keys(filterState)){
  const field=document.createElement('label');field.textContent=filterNames[key];
  const control=document.createElement('select');control.id='lesson'+key[0].toUpperCase()+key.slice(1);control.setAttribute('aria-label','Lọc '+filterNames[key].toLowerCase());
  field.append(control);filterPanel.append(field);filterControls[key]=control;
  control.addEventListener('change',()=>{
   filterState[key]=control.value;
   if(key==='grade'){filterState.week='';filterState.period='';}else if(key==='week')filterState.period='';
   // A changed discovery scope invalidates any staged choice, not the current lesson.
   clear();renderLibrary();
  });
 }
 select.closest('label').after(filterPanel);
 const filterHelp=document.createElement('p');filterHelp.className='small';filterHelp.textContent='Lọc bài đã lưu (không bắt buộc). Bài thiếu thông tin có nhóm riêng.';filterPanel.after(filterHelp);
 // Keep the existing single dialog; put discovery and confirmation in view.
 const libraryBlock=$('library').parentElement,dialogHeading=select.closest('.importbox').querySelector('h1');
 filterHelp.after(preview,button,error,libraryBlock);
 libraryBlock.querySelector('h2').textContent='2. DANH SÁCH BÀI ĐÃ LƯU';
 const packageHeading=[...select.closest('.importbox').querySelectorAll('.subjectStep')].find(node=>node.textContent.includes('2. CHỌN FILE'));
 if(packageHeading)packageHeading.textContent='HOẶC NHẬP FILE / ZIP BÀI HỌC';
 if(dialogHeading){const dialogHeader=document.createElement('div');dialogHeader.className='libraryDialogHeader';dialogHeading.before(dialogHeader);dialogHeader.append(dialogHeading,$('closeBtn'));}
 const filterStatus=document.createElement('p');filterStatus.id='libraryFilterStatus';filterStatus.className='small';filterStatus.setAttribute('aria-live','polite');$('library').before(filterStatus);
 function resetFilters(){for(const key of Object.keys(filterState))filterState[key]='';}
 function libraryValue(raw){
  if(typeof raw!=='number'&&typeof raw!=='string')return null;
  const text=String(raw).trim();if(!text||text.length>128||/^data:/iu.test(text))return null;
  const numeric=typeof raw==='number'||/^[+-]?\d+(?:\.\d+)?$/u.test(text)?Number(text):null;
  if(numeric!==null&&!Number.isFinite(numeric))return null;
  return {key:numeric!==null?'n:'+String(numeric):'s:'+JSON.stringify(text),text:numeric!==null?String(numeric):text,numeric};
 }
 function compareValues(a,b){
  if(!a||!b)return a?-1:b?1:0;
  if(a.numeric!==null&&b.numeric!==null)return a.numeric-b.numeric;
  if(a.numeric!==null||b.numeric!==null)return a.numeric!==null?-1:1;
  return collator.compare(a.text,b.text)||a.key.localeCompare(b.key);
 }
 function descriptor(entry,x){
  const available=!!x&&typeof x==='object'&&!Array.isArray(x);
  let profile=null,subjectId=null,subjectKnown=false,invalid=!available;
  if(available)try{const resolved=subjectIdentity(x);profile=resolved.engine;subjectId=resolved.id;subjectKnown=resolved.known;}catch(_){invalid=true;}
  const metadata=available?x:{};
  const title=scalar(metadata.title,512),catalogTitle=scalar(entry.title,512);
  return {id:entry.id,available,invalid,profile,subjectId,subjectKnown,title:title!==undefined&&title!==''?String(title)+(typeof metadata.title==='string'&&metadata.title.length>512?'…':''):catalogTitle??'Bài chưa có tên',subject:scalar(metadata.subject,160),className:scalar(metadata.class,32),
   values:Object.fromEntries(Object.keys(filterState).map(key=>[key,libraryValue(metadata[key])]))};
 }
 function matchField(row,key,strict=false){
  const selected=filterState[key],value=row.values[key];
  if(!selected)return true;
  if(selected===missingValue)return value===null;
  return value?value.key===selected:!strict;
 }
 function matches(row,keys=Object.keys(filterState),strict=false){return keys.every(key=>matchField(row,key,strict));}
 function populateFilter(key,rows){
  const control=filterControls[key],values=new Map();let hasMissing=false;
  for(const row of rows){const value=row.values[key];if(value)values.set(value.key,value);else hasMissing=true;}
  const choices=[...values.values()].sort(compareValues),selected=filterState[key];
  control.replaceChildren();const all=document.createElement('option');all.value='';all.textContent='Tất cả';control.append(all);
  for(const value of choices){const option=document.createElement('option');option.value=value.key;option.textContent=filterNames[key]+' '+value.text;control.append(option);}
  if(hasMissing){const unknown=document.createElement('option');unknown.value=missingValue;unknown.textContent='CHƯA ĐỦ THÔNG TIN';control.append(unknown);}
  filterState[key]=selected&&(values.has(selected)||selected===missingValue&&hasMissing)?selected:'';control.value=filterState[key];
  control.disabled=!select.value||!rows.length;
 }
 function compareLessons(a,b){
  for(const key of Object.keys(filterState)){const order=compareValues(a.values[key],b.values[key]);if(order)return order;}
  return collator.compare(String(a.title),String(b.title))||(String(a.id)<String(b.id)?-1:String(a.id)>String(b.id)?1:0);
 }
 function appendLibraryRow(parent,entry){
  const row=document.createElement('div');row.className='item libraryLesson';row.dataset.lessonId=String(entry.id);
  const text=document.createElement('div'),title=document.createElement('b');title.textContent=String(entry.title);text.append(title);
  const context=document.createElement('div');context.className='small';
  const parts=[entry.subject!==undefined&&entry.subject!==''?entry.subject:entry.subjectKnown?label(entry.subjectId):'Môn chưa xác định'];
  if(!entry.subjectKnown&&entry.subject!==undefined)parts.push('Môn chưa xác định');
  parts.push('Chế độ chạy: '+(entry.profile?label(entry.profile):'chưa hợp lệ'));
  for(const key of Object.keys(filterState))if(entry.values[key])parts.push(filterNames[key]+' '+entry.values[key].text);
  if(!entry.values.grade&&entry.className!==undefined)parts.push('Nhóm lớp '+entry.className);
  context.textContent=parts.join(' · ');text.append(context);
  if(entry.distinguish){const reference=document.createElement('div');reference.className='small libraryReference';reference.textContent='Mã bài: '+String(entry.id);text.append(reference);}
  const missing=Object.keys(filterState).filter(key=>!entry.values[key]);
  if(missing.length||!entry.subjectKnown||entry.invalid){const note=document.createElement('div');note.className='libraryMissingNote';note.textContent=entry.invalid?'Dữ liệu bài chưa hợp lệ; cần kiểm tra trước khi nạp.':'Chưa đủ thông tin: '+[...(!entry.subjectKnown?['MÔN']:[]),...missing.map(key=>filterNames[key])].join(', ');text.append(note);}
  const actions=document.createElement('div'),open=document.createElement('button');open.type='button';open.textContent=entry.available?'CHỌN BÀI':'Không đọc được bài';open.disabled=!entry.available;open.addEventListener('click',()=>openSaved(entry.id));
  const remove=document.createElement('button');remove.type='button';remove.textContent='XÓA';remove.addEventListener('click',()=>removeSaved(entry.id));actions.append(open,remove);row.append(text,actions);parent.append(row);
 }
 function indicate(){const id=WebLiveProfiles.resolve(lesson).profileId;let resolved;try{resolved=subjectIdentity(lesson);}catch(_){}indicator.textContent=(resolved?.known?label(resolved.id).toLocaleUpperCase('vi'):'MÔN CHƯA XÁC ĐỊNH')+' · CHẾ ĐỘ CHẠY: '+label(id).toLocaleUpperCase('vi');indicator.hidden=false;}
 function engine(x){
  if(!Object.hasOwn(x,'subject_engine'))return 'legacy';
  if(typeof x.subject_engine!=='string'||!x.subject_engine.trim())throw Error('subject_engine không hợp lệ.');
  const id=x.subject_engine.trim().toLowerCase();
  if(id==='legacy'||id==='default')return 'legacy';
  if(!subjects.some(s=>s.id===id))throw Error('Profile không được hỗ trợ: '+x.subject_engine);
  return id;
 }
 // Loader-only identity. Existing packages use the top-level subject field;
 // do not invent nested keys or infer from titles, filenames or lesson content.
 function mappedSubject(value){
  if(typeof value!=='string'||value.length>160)return null;
  const text=value.normalize('NFKC').trim().toLocaleLowerCase('vi').replace(/\s+/gu,' ');
  if(['geometry','algebra','informatics'].includes(text))return text;
  const match=/^(hình học|đại số|tin học)(?: (?:lớp )?[6-9])?$/u.exec(text);
  return match?({'hình học':'geometry','đại số':'algebra','tin học':'informatics'})[match[1]]:null;
 }
 function subjectIdentity(x){
  const runtimeEngine=engine(x),explicit=mappedSubject(x.subject);
  if(explicit&&runtimeEngine!=='legacy'&&explicit!==runtimeEngine)
   throw Error('Metadata môn mâu thuẫn.\nMôn của bài: '+label(explicit)+'\nChế độ chạy: '+label(runtimeEngine)+'\n\nKhông tự sửa môn hoặc engine; bài hiện tại được giữ nguyên.');
  return {id:explicit||runtimeEngine,engine:runtimeEngine,known:!!explicit||runtimeEngine!=='legacy',source:explicit?'EXPLICIT_SUBJECT_METADATA':runtimeEngine==='legacy'?'UNKNOWN_LEGACY_BUCKET':'EXPLICIT_ENGINE_COMPATIBILITY'};
 }
 function validate(x){
  validateLesson(x);
  if(x.screens.some(s=>!s||typeof s!=='object'||Array.isArray(s)))throw Error('Màn hình trong screens[] không hợp lệ.');
  for(const key of ['id','packageId','subject','title','grade','class','week','period'])
   if(Object.hasOwn(x,key)&&x[key]!=null&&!['string','number'].includes(typeof x[key]))throw Error('Metadata '+key+' không hợp lệ.');
  const id=engine(x);
  if(WebLiveProfiles.resolve(x).profileId!==id)throw Error('Profile của bài không khớp bộ định tuyến.');
  subjectIdentity(x);
  return id;
 }
 function showMetadata(x){
  preview.replaceChildren();preview.hidden=false;
  const heading=document.createElement('h2');heading.className='subjectStep';heading.textContent='3. THÔNG TIN BÀI';preview.append(heading);
  const dl=document.createElement('dl');
  for(const [title,keys] of [['Môn',['subject']],['Lớp',['grade','class']],['Tuần',['week']],['Tiết',['period']],['Tên bài',['title']]]){
   const key=keys.find(k=>Object.hasOwn(x,k)&&x[k]!=null&&['string','number'].includes(typeof x[k]));
   if(!key)continue;const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=title;dd.textContent=String(x[key]);dl.append(dt,dd);
  }
  const modeTitle=document.createElement('dt'),modeValue=document.createElement('dd');modeTitle.textContent='Chế độ chạy';
  try{modeValue.textContent=label(engine(x))+(Object.hasOwn(x,'subject_engine')?'':' (subject_engine không có)');}catch(_){modeValue.textContent='Không hợp lệ';}
  dl.append(modeTitle,modeValue);
  preview.append(dl);
 }
 function refresh(){
  error.dataset.valid='false';
  button.disabled=true;
  if(!pending)return;
  try{
   validate(pending.lesson);const resolved=subjectIdentity(pending.lesson);
   if(!select.value)throw Error('Hãy chọn môn trước khi nạp bài.');
   if(select.value!==resolved.id)throw Error('Môn đã chọn: '+(select.value==='legacy'?'Nhóm tương thích Legacy':label(select.value))+'\nMôn của bài: '+(resolved.known?label(resolved.id):'Chưa đủ thông tin')+'\nChế độ chạy: '+label(resolved.engine)+'\n\nGói bài không khớp môn đã chọn.');
   error.textContent='Thông tin hợp lệ. Bấm NẠP BÀI để mở bài.';error.dataset.valid='true';button.disabled=busy;
  }catch(e){error.textContent=e.message;}
 }
 function clear(){revision++;pending=null;busy=false;button.disabled=true;preview.hidden=true;preview.replaceChildren();error.textContent='';}
 const imagePairs=[['image','imageData'],['geometryImage','geometryImageData'],['analysisImage','analysisImageData'],['analysisDiagram','analysisDiagramData']];
 async function assets(prepared){
  const x=prepared.lesson;
  const checked=new Set();
  async function image(source){
   if(checked.has(source))return;
   if(typeof source!=='string'||!source.startsWith('data:image/'))throw Error('Ảnh nhúng không hợp lệ.');
   const probe=new Image();probe.src=source;
   try{await probe.decode();if(!probe.naturalWidth)throw Error('Ảnh trống');}catch(_){throw Error('Không đọc được asset ảnh nhúng.');}
   checked.add(source);
  }
  for(const screen of x.screens){
   for(const [field,dataField] of imagePairs){
    const source=assetPath(screen[field]);
    if(source&&!screen[dataField]&&!screen[field]?.imageData&&!screen[field]?.data&&!source.startsWith('data:image/'))throw Error('Ảnh cần nhập bằng LIVE.zip: '+source);
    const embedded=screen[dataField]||screen[field]?.imageData||screen[field]?.data||(source.startsWith('data:image/')?source:null);
    if(embedded)await image(embedded);
   }
   // Informatics media uses the frozen profile's local/data-image contract.
   for(const item of Array.isArray(screen.informatics?.blocks)?screen.informatics.blocks:[]){
    if(item?.kind!=='MEDIA'||!item.src)continue;
    if(typeof item.src!=='string')throw Error('Đường dẫn media không hợp lệ.');
    if(/^data:image\/(?:png|jpeg|gif|webp|svg\+xml);/iu.test(item.src)){await image(item.src);continue;}
    const url=new URL(item.src,location.href),isVideo=String(item.type).toUpperCase()==='VIDEO';
    const supported=isVideo?/\.(?:webm|mp4)$/iu.test(url.pathname):/\.(?:png|jpe?g|gif|svg|webp)$/iu.test(url.pathname);
    if(url.origin!==location.origin||url.username||url.password||!supported)throw Error('Media không được hỗ trợ: '+item.src);
    let bytes;
    if(prepared.files){
     const path=item.src.replace(/^\.\//,'');bytes=prepared.files[prepared.base+path]||prepared.files[path];
     if(bytes&&!isVideo){
      const ext=path.split('.').pop().toLowerCase(),mime=({svg:'image/svg+xml',jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',gif:'image/gif',webp:'image/webp'})[ext];
      let binary='';for(let n=0;n<bytes.length;n+=8192)binary+=String.fromCharCode(...bytes.slice(n,n+8192));item.src='data:'+mime+';base64,'+btoa(binary);await image(item.src);continue;
     }
    }
    const response=await fetch(url,{method:'GET',cache:'no-store'});
    if(!response.ok)throw Error('Asset không tồn tại: '+item.src);
    if(bytes&&isVideo){const served=new Uint8Array(await response.arrayBuffer());if(served.length!==bytes.length||served.some((byte,n)=>byte!==bytes[n]))throw Error('Video trong ZIP không khớp asset được phục vụ: '+item.src);}
   }
  }
 }
 async function stage(read){
  const ticket=++revision;pending=null;busy=true;button.disabled=true;preview.hidden=true;error.dataset.valid='false';error.textContent='Đang kiểm tra gói bài…';
  try{
   if(!select.value)throw Error('Hãy chọn môn trước khi chọn gói bài học.');
   const prepared=await read();
   if(ticket!==revision)return;
   validateLesson(prepared.lesson);showMetadata(prepared.lesson);validate(prepared.lesson);
   await assets(prepared);if(ticket!==revision)return;
   pending=prepared;busy=false;refresh();
  }catch(e){if(ticket!==revision)return;busy=false;error.textContent=e.message;button.disabled=true;}
 }
 function cloneControllers(){return [boardController,coverController,smartController,classroomController].filter(Boolean).map(object=>({object,fields:Object.fromEntries(Object.entries(object).map(([k,v])=>[k,v instanceof Map?new Map(v):Array.isArray(v)?v.slice():v]))}));}
 function runtime(){return {lesson,currentLessonId,lessonActivation,stateVersion,i,showHint,answerMode,answerStep,analysisStep,viewMode,zoom,pointer,pan,drag,hintLevel,knowledgeCloseVisible,controllers:cloneControllers()};}
 function restore(s){
  ({lesson,currentLessonId,lessonActivation,stateVersion,i,showHint,answerMode,answerStep,analysisStep,viewMode,zoom,pointer,pan,drag,hintLevel,knowledgeCloseVisible}=s);
  for(const {object,fields} of s.controllers){for(const key of Object.keys(object))if(!Object.hasOwn(fields,key))delete object[key];Object.assign(object,fields);}
  if(lesson){rebuildSceneIndex(lesson);populateJump();render();sync();indicate();}else indicator.hidden=true;
 }
 async function commit(){
  refresh();if(button.disabled||!pending||busy)return;
  const prepared=pending,ticket=revision;let copy,old=null,saved=false;
  busy=true;button.disabled=true;
  try{
   copy=JSON.parse(JSON.stringify(prepared.lesson));
   await saveLesson(copy,prepared.sourceKey);saved=true;
   if(ticket!==revision){renderLibrary();warnStorage('Bài đã lưu, nhưng lựa chọn đã thay đổi; bài đang dạy được giữ nguyên.');return;}
   renderLibrary();old=runtime();start(copy);clear();rememberSuccess(copy);
  }catch(e){
   if(ticket!==revision&&!old)return;
   let rollbackFailed=false;if(old&&(lesson!==old.lesson||lessonActivation!==old.lessonActivation))try{restore(old);}catch(_){rollbackFailed=true;}
   $('importer').style.display='flex';error.dataset.valid='false';
   pending=null;const message=rollbackFailed?'Chưa khôi phục đầy đủ trạng thái hiển thị; dữ liệu lưu vẫn được giữ nguyên.':saved?'Bài đã lưu nhưng chưa nạp được; bài hiện tại được giữ nguyên.':'Không nạp được bài; bài hiện tại được giữ nguyên.';error.textContent=message+' '+e.message;
   warnStorage(message);
  }finally{if(ticket===revision){busy=false;refresh();}}
 }
 const nativeStart=start;
 start=function(...args){const value=nativeStart(...args);indicate();return value;};
 const nativeHide=hideImporter;
 hideImporter=function(){clear();nativeHide();};
 renderLibrary=function(){
  renderRecent();
  const library=$('library');library.replaceChildren();
  const saved=getLibrary(),entries=[],seen=new Set();
  if(Array.isArray(saved))for(const entry of saved){
   if(!entry||!['string','number'].includes(typeof entry.id)||seen.has(String(entry.id)))continue;
   seen.add(String(entry.id));const row=descriptor(entry,WebLiveSubjectStorage.getMetadata(entry.id));
   if(!select.value||row.invalid||row.subjectId===select.value)entries.push(row);
  }
  populateFilter('grade',select.value?entries:[]);
  const gradeRows=entries.filter(row=>matches(row,['grade']));populateFilter('week',select.value?gradeRows:[]);
  const weekRows=gradeRows.filter(row=>matches(row,['week']));populateFilter('period',select.value?weekRows:[]);
  const selected=weekRows.filter(row=>matches(row,['period'])).sort(compareLessons);
  const identityKey=row=>JSON.stringify([row.subjectId,row.profile,row.title,...Object.values(row.values).map(value=>value?.key??null)]),duplicates=new Map();
  for(const row of selected){const key=identityKey(row);duplicates.set(key,(duplicates.get(key)||0)+1);}
  for(const row of selected)row.distinguish=duplicates.get(identityKey(row))>1;
  const complete=selected.filter(row=>!row.invalid&&Object.values(row.values).every(Boolean)),incomplete=selected.filter(row=>row.invalid||Object.values(row.values).some(value=>!value));
  filterStatus.textContent=complete.length+' bài khớp · '+incomplete.length+' bài chưa đủ thông tin';
  if(!selected.length){const p=document.createElement('p');p.className='muted';p.textContent=entries.length?'Không có bài khớp bộ lọc. Chọn Tất cả để xem lại thư viện.':'Chưa có bài đã lưu cho môn này.';library.append(p);return;}
  for(const row of complete)appendLibraryRow(library,row);
  if(incomplete.length){const group=document.createElement('section');group.id='libraryIncomplete';const heading=document.createElement('h3');heading.textContent='CHƯA ĐỦ THÔNG TIN';group.append(heading);
   const help=document.createElement('p');help.className='small';help.textContent='Thông tin còn thiếu chưa xác nhận được bộ lọc. Kiểm tra preview trước khi nạp.';group.append(help);
   for(const row of incomplete)appendLibraryRow(group,row);library.append(group);
  }
 };
 openSaved=function(id){
  const ticket=revision+1;return stage(async()=>{
   const x=await WebLiveSubjectStorage.readLesson(id);
   if(!x)throw Error('Không tìm thấy bài đã lưu. Bài hiện tại được giữ nguyên.');
   if(ticket===revision&&!matches(descriptor({id},x),Object.keys(filterState),true)){resetFilters();renderLibrary();}
   return {lesson:x,sourceKey:x._runtimeSourceKey};
  });
 };
 removeSaved=async function(id){
  if(!confirm('Xóa bài này khỏi thư viện IndexedDB? Bản localStorage cũ vẫn giữ nguyên.'))return;
  try{await deleteLesson(id);clear();renderLibrary();renderRecent();}catch(e){warnStorage(e.message);}
 };
 loadSample=function(){stage(async()=>({lesson:JSON.parse(JSON.stringify(sample))}));};
 WebLiveSubjectStorage.setValidator(validate);
 WebLiveSubjectStorage.setMigrationValidator(async x=>{validate(x);await assets({lesson:x});});
 const migrateButton=document.createElement('button');migrateButton.type='button';migrateButton.id='migrateLegacyStorage';migrateButton.textContent='CHUYỂN THƯ VIỆN CŨ AN TOÀN';libraryBlock.before(migrateButton);
 migrateButton.addEventListener('click',async()=>{
  if(busy)return;migrateButton.disabled=true;busy=true;button.disabled=true;
  try{await WebLiveSubjectStorage.migrateLegacyStorage();renderLibrary();}catch(e){warnStorage('Chuyển thư viện chưa hoàn tất. Dữ liệu cũ vẫn được giữ nguyên. '+e.message);}
  finally{busy=false;migrateButton.disabled=false;refresh();}
 });
 addEventListener('webLiveStorageHealth',e=>warnStorage(e.detail.message));
 addEventListener('webLiveStorageChanged',()=>renderLibrary());
 WebLiveSubjectStorage.ready.then(()=>{renderLibrary();const h=WebLiveSubjectStorage.getStorageHealth();if(h.message)warnStorage(h.message);});

 select.addEventListener('change',()=>{resetFilters();if(busy)clear();refresh();renderLibrary();});
 button.addEventListener('click',commit);
 for(const [id,type] of [['jsonfile','json'],['zipfile','zip']])$(id).onchange=event=>{const file=event.target.files[0];event.target.value='';if(!file)return;stage(async()=>type==='zip'?prepareLessonZip(file):{lesson:JSON.parse(await file.text())});};
 globalThis.WebLiveSubjectLoader=Object.freeze({subjects,validate,engine,resolveSubject:subjectIdentity,version:1,recentLimit});
 readQuick();renderRemembered();
 renderLibrary();
})();
