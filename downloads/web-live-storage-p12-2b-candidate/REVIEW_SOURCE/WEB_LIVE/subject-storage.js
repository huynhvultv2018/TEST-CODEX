// Subject Loader storage owner. P12.2B: COPY / VERIFY / COMMIT, NEVER legacy cleanup.
(()=>{
 'use strict';
 const NAME='WEB_LIVE_DB',VERSION=1,MIGRATION_VERSION=1;
 const catalog=new Map(),cache=new Map(),records=new Map(),journals=new Map();
 let db=null,opening=null,validator=null,migrationValidator=null,session=null,legacyCatalogError=null,queue=Promise.resolve();
 let health={status:'AVAILABLE',message:'',legacyCount:0};
 let changes=null;try{changes=new BroadcastChannel('web-live-storage-p12-2b');}catch(_){}
 function changed(){dispatchEvent(new Event('webLiveStorageChanged'));try{changes?.postMessage({type:'changed'});}catch(_){}}
 const clone=x=>JSON.parse(JSON.stringify(x));
 function remember(id,x){cache.delete(id);cache.set(id,x);while(cache.size>3)cache.delete(cache.keys().next().value);}
 const recordHint=r=>({id:r.id,metadata:r.metadata,legacyHash:r.legacyHash,payloadHash:r.payloadHash,savedAt:r.savedAt});
 const failure=(code,message)=>Object.assign(new Error(message),{code});
 function warn(status,message,lessonId=null){health={...health,status,message,lessonId};dispatchEvent(new CustomEvent('webLiveStorageHealth',{detail:{...health}}));}
 function shape(x,id){
  if(!x||typeof x!=='object'||Array.isArray(x)||!Array.isArray(x.screens)||!x.screens.length||x.screens.some(s=>!s||typeof s!=='object'||Array.isArray(s)))throw failure('CORRUPT','Dữ liệu bài học không hợp lệ.');
  if(id!==undefined&&String(x.id??x.packageId??'')!==String(id))throw failure('CORRUPT','Mã bài không khớp dữ liệu lưu.');
  for(const key of ['id','packageId','subject','title','grade','class','week','period'])if(x[key]!=null&&!['string','number'].includes(typeof x[key]))throw failure('CORRUPT','Metadata bài học không hợp lệ: '+key);
  if(validator)validator(x);
  return x;
 }
 const metadata=x=>Object.fromEntries(['id','packageId','subject','subject_engine','title','grade','class','week','period','_runtimeSourceKey'].filter(k=>Object.hasOwn(x,k)).map(k=>[k,x[k]]));
 async function hash(bytes){
  if(!crypto?.subtle)throw failure('HASH_UNAVAILABLE','Cần mở WEB LIVE bằng localhost hoặc HTTPS để xác minh bộ nhớ bài học.');
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),x=>x.toString(16).padStart(2,'0')).join('');
 }
 const textHash=text=>hash(new TextEncoder().encode(text));
 function legacyRaw(id){try{return localStorage.getItem('lesson:'+id);}catch(e){throw failure('LEGACY_READ','Không đọc được bản bài cũ: '+e.message);}}
 function legacy(id){const raw=legacyRaw(id);return raw===null?null:shape(JSON.parse(raw),id);}
 function legacyCatalog(){
  const list=new Map();legacyCatalogError=null;
  try{
   let index;try{index=JSON.parse(localStorage.getItem('webLiveLibrary')||'[]');if(!Array.isArray(index))throw Error('Index thư viện cũ không hợp lệ.');}catch(e){legacyCatalogError=e;warn('WARNING','Index thư viện cũ chưa hợp lệ; dữ liệu gốc vẫn được giữ nguyên.');}
   if(Array.isArray(index))for(const entry of index)if(entry&&['string','number'].includes(typeof entry.id))list.set(String(entry.id),{...metadata(entry),id:String(entry.id),savedAt:entry.savedAt||'',_storageUnavailable:true});
   for(const key of Object.keys(localStorage)){
    if(!key.startsWith('lesson:'))continue;
    const id=key.slice(7);try{const x=legacy(id);if(x)list.set(id,{...metadata(x),id,savedAt:list.get(id)?.savedAt||''});}catch(_){
     if(!list.has(id))list.set(id,{id,title:'Bài cũ cần kiểm tra',_storageUnavailable:true});
     warn('WARNING','Có bài cũ chưa hợp lệ; dữ liệu gốc vẫn được giữ nguyên.');
    }
   }
  }catch(e){legacyCatalogError=e;warn('WARNING','Không đọc được thư viện cũ. Bài đang dạy được giữ nguyên.');}
  return list;
 }
 function open(){
  if(db)return Promise.resolve(db);
  if(opening)return opening;
  opening=new Promise((resolve,reject)=>{
   let settled=false,request,timer;
   const fail=e=>{if(settled)return;settled=true;clearTimeout(timer);reject(e);};
   try{request=indexedDB.open(NAME,VERSION);}catch(e){fail(e);return;}
   timer=setTimeout(()=>fail(failure('DB_BLOCKED','Không thể mở bộ nhớ bài học. Đóng tab WEB LIVE khác rồi thử lại.')),5000);
   request.onupgradeneeded=()=>{
    if(settled){request.transaction.abort();return;}
    const d=request.result;
    for(const [name,keyPath] of [['lessons','id'],['assets','hash'],['pending','jobId'],['journal','id'],['control','key']])if(!d.objectStoreNames.contains(name))d.createObjectStore(name,{keyPath});
   };
   request.onerror=()=>fail(request.error||failure('DB_OPEN','Không thể mở bộ nhớ bài học.'));
   request.onblocked=()=>warn('DB_UNAVAILABLE','Bộ nhớ bài học đang bị tab khác giữ. Dữ liệu cũ vẫn được giữ nguyên.');
   request.onsuccess=()=>{
    if(settled){request.result.close();return;}
    if(['lessons','assets','pending','journal','control'].some(n=>!request.result.objectStoreNames.contains(n))){request.result.close();fail(failure('DB_SCHEMA','Phiên bản bộ nhớ chưa được hỗ trợ; dữ liệu cũ được giữ nguyên.'));return;}
    settled=true;clearTimeout(timer);db=request.result;
    db.onversionchange=()=>{db.close();db=null;warn('DB_UNAVAILABLE','Bộ nhớ thay đổi phiên bản; mở lại WEB LIVE.');};
    db.onclose=()=>{db=null;};resolve(db);
   };
  }).finally(()=>{opening=null;});
  return opening;
 }
 // Schedule all requests synchronously. Success means transaction COMPLETE, not request success.
 async function transaction(stores,mode,schedule){
  const d=await open();return new Promise((resolve,reject)=>{
   let tx,result,error;
   try{tx=d.transaction(stores,mode);schedule(tx,value=>{result=value;},e=>{error=e;tx.abort();});}catch(e){if(tx)try{tx.abort();}catch(_){}reject(e);return;}
   tx.oncomplete=()=>resolve(result);
   tx.onabort=()=>reject(error||tx.error||failure('TX_ABORT','Không lưu được bài học; giao dịch bị hủy.'));
   tx.onerror=()=>{};
  });
 }
 function get(store,key){return transaction([store],'readonly',(tx,done)=>{const r=tx.objectStore(store).get(key);r.onsuccess=()=>done(r.result||null);});}
 function all(store){return transaction([store],'readonly',(tx,done)=>{const r=tx.objectStore(store).getAll();r.onsuccess=()=>done(r.result);});}
 async function refresh(){
  const old=legacyCatalog();
  try{
   const [saved,log,currentSession]=await Promise.all([all('lessons'),all('journal'),get('control','session')]);
   session=currentSession;
   records.clear();journals.clear();catalog.clear();for(const [id,m] of old)catalog.set(id,m);
   for(const j of log){journals.set(j.id,j);if(j.deleted)catalog.delete(j.id);}
   for(const r of saved){records.set(r.id,recordHint(r));catalog.set(r.id,{...r.metadata,id:r.id,savedAt:r.savedAt});}
   health.legacyCount=[...old.keys()].filter(id=>!journals.get(id)?.deleted).length;
   if(health.legacyCount&&health.status==='AVAILABLE')warn('MIGRATION_REQUIRED','Dữ liệu cũ vẫn được giữ nguyên. Có thể chuyển thư viện an toàn.');
  }catch(e){
   catalog.clear();for(const [id,m] of old)if(!journals.get(id)?.deleted)catalog.set(id,m);
   warn('DB_UNAVAILABLE','Không thể mở bộ nhớ bài học. Dữ liệu cũ vẫn được giữ nguyên.');throw e;
  }
 }
 async function pack(x){
  const raw=JSON.stringify(x),body=clone(x),bindings=[],assets=new Map();
  async function walk(value,path,parent,key){
   if(typeof value==='string'){
    const match=/^(data:image\/[a-z0-9.+-]+(?:;[^,]*)?;base64,)([A-Za-z0-9+/]*={0,2})$/iu.exec(value);
    if(!match)return;
    let binary;try{binary=atob(match[2]);}catch(_){throw failure('ASSET_DECODE','Không giải mã được ảnh bài học.');}
    // Noncanonical encoding remains losslessly in IDB body; never rewrite authored bytes.
    if(btoa(binary)!==match[2])return;
    const bytes=Uint8Array.from(binary,c=>c.charCodeAt(0)),digest=await hash(bytes);
    if(!assets.has(digest))assets.set(digest,{hash:digest,bytes:bytes.buffer,byteLength:bytes.length});
    bindings.push({path,hash:digest,prefix:match[1],byteLength:bytes.length});parent[key]=null;
   }else if(value&&typeof value==='object')for(const k of Object.keys(value))await walk(value[k],path.concat(k),value,k);
  }
  await walk(body,[],null,null);
  return {body,bindings,assets:[...assets.values()],payloadHash:await textHash(raw),payloadUTF8Bytes:new TextEncoder().encode(raw).length,metadata:metadata(x),assetCount:bindings.length,uniqueAssetCount:assets.size};
 }
 async function hydrate(record){
  if(!record||record.schemaVersion!==VERSION)throw failure('CORRUPT','Phiên bản dữ liệu bài học không hợp lệ.');
  const assetMap=await transaction(['assets'],'readonly',(tx,done)=>{
   const map=new Map();done(map);for(const id of new Set(record.bindings.map(b=>b.hash))){const r=tx.objectStore('assets').get(id);r.onsuccess=()=>map.set(id,r.result);}
  });
  if(record.assetCount!==record.bindings.length||record.uniqueAssetCount!==assetMap.size)throw failure('CORRUPT','Số ảnh của bài học không khớp.');
  const encoded=new Map();
  for(const [id,a] of assetMap){
   if(!a||!(a.bytes instanceof ArrayBuffer)||a.bytes.byteLength!==a.byteLength||await hash(a.bytes)!==id)throw failure('CORRUPT','Ảnh lưu bị thiếu hoặc sai checksum.');
   const bytes=new Uint8Array(a.bytes);let binary='';for(let n=0;n<bytes.length;n+=8192)binary+=String.fromCharCode(...bytes.subarray(n,n+8192));encoded.set(id,btoa(binary));
  }
  const x=clone(record.body);
  for(const b of record.bindings){
   if(!Array.isArray(b.path)||!b.path.length||assetMap.get(b.hash)?.byteLength!==b.byteLength)throw failure('CORRUPT','Tham chiếu ảnh không hợp lệ.');
   let parent=x;for(const k of b.path.slice(0,-1)){if(!parent||!Object.hasOwn(parent,k))throw failure('CORRUPT','Đường dẫn ảnh không hợp lệ.');parent=parent[k];}
   const key=b.path.at(-1);if(!parent||!Object.hasOwn(parent,key)||parent[key]!==null)throw failure('CORRUPT','Vị trí ảnh không hợp lệ.');parent[key]=b.prefix+encoded.get(b.hash);
  }
  shape(x,record.id);const raw=JSON.stringify(x);
  if(await textHash(raw)!==record.payloadHash||new TextEncoder().encode(raw).length!==record.payloadUTF8Bytes||JSON.stringify(metadata(x))!==JSON.stringify(record.metadata))throw failure('CORRUPT','Nội dung bài học không khớp bản đã xác minh.');
  return x;
 }
 async function verifiedLegacy(id,record){
  const raw=legacyRaw(id);if(raw===null)return null;
  if(record&&!record.legacyHash)throw failure('FALLBACK_STALE','Bản cũ không khớp phiên bản bài hiện tại.');
  if(record&&await textHash(raw)!==record.legacyHash)throw failure('FALLBACK_CORRUPT','Checksum bản bài cũ không khớp.');
  const x=shape(JSON.parse(raw),id),p=await pack(x);
  if(record&&p.payloadHash!==record.payloadHash)throw failure('FALLBACK_STALE','Bản cũ khác nội dung đã commit.');
  if(legacyRaw(id)!==raw)throw failure('LEGACY_CHANGED','Bản bài cũ đã thay đổi trong lúc đọc.');
  return x;
 }
 async function readLesson(id){
  id=String(id);let r=records.get(id);
  try{
   const j=await get('journal',id);if(j?.deleted){journals.set(id,j);cache.delete(id);return null;}
   r=await get('lessons',id);if(r){records.set(id,recordHint(r));const x=await hydrate(r);remember(id,x);return clone(x);}
   const x=await verifiedLegacy(id,null);if(x)remember(id,x);return x;
  }catch(e){
   if(journals.get(id)?.deleted)throw e;
   try{
    const x=await verifiedLegacy(id,r);if(!x)throw e;
    remember(id,x);warn('WARNING','Không đọc được bản IndexedDB. Đang dùng bản bài cũ đã kiểm tra; dữ liệu cũ vẫn được giữ nguyên.',id);return x;
   }catch(f){warn('FAILED','Không đọc được bài học an toàn. Bài đang dạy được giữ nguyên.');throw f;}
  }
 }
 function serialized(action){
  const run=()=>navigator.locks?navigator.locks.request(NAME+'_WRITER',action):action();
  const next=queue.then(run,run);queue=next.catch(()=>{});return next;
 }
 async function store(x,sourceKey,legacyInfo=null){
  shape(x);const original=String(x.id||x.packageId||`${x.subject||'BAI'}_${x.week||0}_${x.period||0}`);
  let id=original,prior=await get('lessons',id),priorX=prior?await hydrate(prior):legacy(id);
  const key=sourceKey||'json:'+fingerprint(new TextEncoder().encode(JSON.stringify(x)));
  if(!legacyInfo&&priorX&&priorX._runtimeSourceKey!==key){const same=JSON.stringify(priorX.screens)===JSON.stringify(x.screens)&&priorX.title===x.title&&priorX.subject===x.subject;if(!same)id=original+'~'+key.replace(/[^a-zA-Z0-9]/g,'').slice(-16);}
  if(!legacyInfo){x.id=id;x._runtimeSourceKey=key;}if(id!==original)prior=await get('lessons',id);
  const expected=prior?.payloadHash||null,p=await pack(x),legacyHash=legacyInfo?await textHash(legacyInfo.raw):null;
  if(legacyInfo&&prior?.legacyHash===legacyHash){await hydrate(prior);return {id,alreadyCommitted:true};}
  const record={id,schemaVersion:VERSION,...p,savedAt:new Date().toISOString(),legacyHash};delete record.assets;
  const jobId=JSON.stringify([id,p.payloadHash]),journal={id,MIGRATION_VERSION,LESSON_ID:id,SOURCE_PRESENT:!!legacyInfo,TARGET_WRITTEN:true,TARGET_VERIFIED:false,COMMITTED:false,CLEANUP_PENDING:!!legacyInfo,sourceHash:legacyHash,payloadHash:p.payloadHash,sourceCount:1,targetCount:1,verifyResult:'PENDING',deleted:false};
  await transaction(['pending','assets','journal'],'readwrite',(tx,done)=>{tx.objectStore('pending').put({...record,jobId});for(const a of p.assets)tx.objectStore('assets').put(a);tx.objectStore('journal').put(journal);done(true);});
  // Independent transaction read-back, all bytes/bindings/metadata verified before visibility.
  const back=await get('pending',jobId);await hydrate(back);
  if(legacyInfo&&legacyRaw(legacyInfo.id)!==legacyInfo.raw)throw failure('LEGACY_CHANGED','Dữ liệu cũ đã thay đổi; chưa commit chuyển bài.');
  await transaction(['lessons','pending','journal'],'readwrite',(tx,done,abort)=>{
   const r=tx.objectStore('lessons').get(id);r.onsuccess=()=>{try{
    if((r.result?.payloadHash||null)!==expected){abort(failure('WRITE_CONFLICT','Bài đã thay đổi ở tab khác. Hãy thử lại.'));return;}
    tx.objectStore('lessons').put(record);tx.objectStore('pending').delete(jobId);
    tx.objectStore('journal').put({...journal,TARGET_VERIFIED:true,COMMITTED:true,verifyResult:'PASS'});done(true);
   }catch(e){abort(e);}};
  });
  records.set(id,recordHint(record));journals.set(id,{...journal,TARGET_VERIFIED:true,COMMITTED:true,verifyResult:'PASS'});catalog.set(id,{...record.metadata,id,savedAt:record.savedAt});remember(id,clone(x));
  // Metadata only; never write full lesson/base64 or overwrite/delete old lesson keys.
  changed();return {id,alreadyCommitted:false};
 }
 function saveLesson(x,sourceKey){return serialized(async()=>{try{return (await store(x,sourceKey)).id;}catch(e){warn('FAILED','Không lưu được bài học. Bài đang dạy và dữ liệu cũ được giữ nguyên.');throw e;}});}
 function migrateLegacyLesson(id){return serialized(async()=>{
  id=String(id);const log=await get('journal',id);if(log?.deleted||journals.get(id)?.deleted)throw failure('DELETED','Bài đã được xóa khỏi thư viện IndexedDB.');
  const raw=legacyRaw(id);if(raw===null)throw failure('NOT_FOUND','Không tìm thấy bản bài cũ.');
  const x=shape(JSON.parse(raw),id);if(migrationValidator)await migrationValidator(x);return store(x,x._runtimeSourceKey||'legacy:'+await textHash(raw),{id,raw});
 });}
 async function migrateLegacyStorage(){
  warn('MIGRATION_REQUIRED','Đang chuyển thư viện… Dữ liệu cũ vẫn được giữ nguyên.');
  const ids=[...legacyCatalog().keys()].filter(id=>!journals.get(id)?.deleted),results=[];
  try{if(legacyCatalogError)throw failure('LEGACY_INDEX','Index thư viện cũ cần kiểm tra; chưa chuyển thư viện.');for(const id of ids)results.push(await migrateLegacyLesson(id));await refresh();warn('WARNING','Đã chuyển thư viện an toàn. Dữ liệu cũ vẫn được giữ nguyên; chưa cleanup.');return results;}
  catch(e){warn('FAILED','Chuyển thư viện chưa hoàn tất. Dữ liệu cũ vẫn được giữ nguyên.');throw e;}
 }
 function deleteLesson(id){return serialized(async()=>{
  id=String(id);
  await transaction(['lessons','assets','pending','journal'],'readwrite',(tx,done,abort)=>{
   const lessons=tx.objectStore('lessons'),assets=tx.objectStore('assets');lessons.delete(id);
   tx.objectStore('journal').put({id,MIGRATION_VERSION,LESSON_ID:id,deleted:true,COMMITTED:true,CLEANUP_PENDING:legacyRaw(id)!==null});
   const a=lessons.getAll(),b=tx.objectStore('pending').getAll();let saved,staged;
   const collect=()=>{if(!saved||!staged)return;try{if([...saved,...staged].some(r=>!Array.isArray(r.bindings)))throw failure('CORRUPT','Không xóa được bài do tham chiếu ảnh chưa hợp lệ.');const used=new Set([...saved,...staged].flatMap(r=>r.bindings.map(x=>x.hash))),c=assets.openCursor();c.onsuccess=()=>{const cur=c.result;if(!cur)return;if(!used.has(cur.key))cur.delete();cur.continue();};}catch(e){abort(e);}};
   a.onsuccess=()=>{saved=a.result;collect();};b.onsuccess=()=>{for(const r of b.result)if(r.id===id)tx.objectStore('pending').delete(r.jobId);staged=b.result.filter(r=>r.id!==id);collect();};done(true);
  });
  cache.delete(id);records.delete(id);catalog.delete(id);journals.set(id,{deleted:true});changed();return true;
 });}
 // Resume by re-copying an uncommitted source; verified commits are idempotent. Staged writes
 // stay invisible. Source bytes are never removed, including on close/abort/quota failure.
 async function initialize(){try{await refresh();return true;}catch(_){return false;}}
 function readSession(){try{return session&&localStorage.getItem('webLiveStateV042')===session.legacyRaw?clone(session.value):null;}catch(_){return session?clone(session.value):null;}}
 async function saveSession(value){
  let legacyRaw=null;try{legacyRaw=localStorage.getItem('webLiveStateV042');}catch(_){}
  const next={key:'session',value:clone(value),legacyRaw};session=next;
  try{await transaction(['control'],'readwrite',(tx,done)=>{tx.objectStore('control').put(next);done(true);});}catch(e){warn('WARNING','Không lưu được trạng thái phiên. Bài đang dạy vẫn được giữ nguyên; hãy mở lại bài từ thư viện nếu cần.');}
 }

 const api={databaseName:NAME,databaseVersion:VERSION,ready:null,initialize,refresh,readLesson,saveLesson,deleteLesson,migrateLegacyLesson,migrateLegacyStorage,
  readSession,saveSession,listLessons:()=>[...catalog.values()].map(clone),getMetadata:id=>catalog.has(String(id))&&!catalog.get(String(id))._storageUnavailable?clone(catalog.get(String(id))):null,
  peekLesson:id=>cache.get(String(id))||null,setValidator:fn=>{validator=fn;},setMigrationValidator:fn=>{migrationValidator=fn;},getStorageHealth:()=>({...health}),
  readJournal:id=>get('journal',String(id)),saveMetadata:(key,value)=>{if(!['webLiveSubjectLoaderQuickAccessPhase11'].includes(key))throw Error('Metadata key không được phép.');const raw=JSON.stringify(value);if(raw.length>8192)throw Error('Metadata quá lớn');localStorage.setItem(key,raw);},
  getMetadataPreference:key=>JSON.parse(localStorage.getItem(key)||'null')};
 api.ready=initialize();globalThis.WebLiveSubjectStorage=Object.freeze(api);
 if(changes)changes.onmessage=()=>refresh().then(()=>dispatchEvent(new Event('webLiveStorageChanged'))).catch(()=>{});
 addEventListener('storage',e=>{if(e.key==='webLiveLibrary'||e.key?.startsWith('lesson:'))refresh().then(()=>dispatchEvent(new Event('webLiveStorageChanged'))).catch(()=>{});});
})();
