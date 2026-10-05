// Read the central directory to support ordinary ZIPs and ZIPs with data descriptors.
async function unzipFile(file){
 const b=file instanceof Uint8Array?file:new Uint8Array(await file.arrayBuffer()),v=new DataView(b.buffer,b.byteOffset,b.byteLength),out=Object.create(null);
 const u16=p=>v.getUint16(p,true),u32=p=>v.getUint32(p,true);
 let end=-1;for(let p=b.length-22;p>=Math.max(0,b.length-65557);p--)if(u32(p)===0x06054b50){end=p;break}
 if(end<0)throw Error('Tệp không phải ZIP hợp lệ');
 let count=u16(end+10),p=u32(end+16),total=0;
 if(count===65535||p===0xffffffff)throw Error('ZIP64 chưa được hỗ trợ');
 for(let n=0;n<count;n++){
  if(p+46>b.length||u32(p)!==0x02014b50)throw Error('Thư mục ZIP bị lỗi');
  let flags=u16(p+8),method=u16(p+10),compressed=u32(p+20),size=u32(p+24),nl=u16(p+28),extra=u16(p+30),comment=u16(p+32),local=u32(p+42);
  let name=new TextDecoder('utf-8').decode(b.slice(p+46,p+46+nl));p+=46+nl+extra+comment;
  if(name.endsWith('/'))continue;
  if(name.startsWith('/')||name.includes('\\')||name.split('/').includes('..')||Object.hasOwn(out,name))throw Error('Đường dẫn ZIP không hợp lệ: '+name);
  if(flags&1)throw Error('ZIP có mật khẩu: '+name);
  if(size>30*1024*1024||(total+=size)>70*1024*1024)throw Error('Gói ZIP quá lớn');
  if(local+30>b.length||u32(local)!==0x04034b50)throw Error('Mục ZIP bị lỗi: '+name);
  let start=local+30+u16(local+26)+u16(local+28);
  if(start+compressed>b.length)throw Error('Dữ liệu ZIP bị thiếu: '+name);
  let raw=b.slice(start,start+compressed),data;
  if(method===0)data=raw;
  else if(method===8){if(typeof DecompressionStream==='undefined')throw Error('Trình duyệt không hỗ trợ giải nén ZIP');
   data=new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer())}
  else throw Error('Kiểu nén ZIP không hỗ trợ: '+name);
  if(data.length!==size)throw Error('Kích thước ZIP không khớp: '+name);
  if(zipCRC32(data)!==u32(p-46-nl-extra-comment+16))throw Error('CRC ZIP không khớp: '+name);
  out[name]=data;
 }
 return out;
}
function txt(u){return new TextDecoder('utf-8',{fatal:true}).decode(u)}
function getLibrary(){return globalThis.WebLiveSubjectStorage?.listLessons()||[]}
function getLesson(id){return globalThis.WebLiveSubjectStorage?.peekLesson(id)||null}
function fingerprint(bytes){
 let h=0xcbf29ce484222325n;for(const b of bytes)h=BigInt.asUintN(64,(h^BigInt(b))*0x100000001b3n);
 return h.toString(16).padStart(16,'0');
}
function assetPath(value){return typeof value==='string'?value:(value&&typeof value==='object'?(value.path||value.src||value.image||''):'')}
async function saveLesson(x,sourceKey){if(!globalThis.WebLiveSubjectStorage)throw Error('Không thể mở bộ nhớ bài học.');await WebLiveSubjectStorage.ready;return WebLiveSubjectStorage.saveLesson(x,sourceKey)}
async function deleteLesson(id){if(!globalThis.WebLiveSubjectStorage)throw Error('Không thể mở bộ nhớ bài học.');await WebLiveSubjectStorage.ready;return WebLiveSubjectStorage.deleteLesson(id)}
function validateLesson(x){if(!x||!Array.isArray(x.screens)||!x.screens.length)throw Error('lesson.json thiếu screens[] hoặc không có màn hình');return x}
async function prepareLessonZip(file){
 const bytes=new Uint8Array(await file.arrayBuffer()),sourceKey='zip:'+fingerprint(bytes);
 let z=await unzipFile(bytes),keys=Object.keys(z).filter(k=>k==='lesson.json'||k.endsWith('/lesson.json'));
 if(keys.length!==1)throw Error(keys.length?'ZIP có nhiều lesson.json':'Gói LIVE thiếu lesson.json');
 let lk=keys[0],x;try{x=validateLesson(JSON.parse(txt(z[lk])))}catch(e){throw Error('lesson.json không hợp lệ: '+e.message)}
 let base=lk.slice(0,-'lesson.json'.length),missing=[];
 if(z[base+'manifest.json'])try{JSON.parse(txt(z[base+'manifest.json']))}catch(e){throw Error('manifest.json không hợp lệ: '+e.message)}
 for(let s of x.screens)for(const [field,dataField] of [['image','imageData'],['geometryImage','geometryImageData'],['analysisImage','analysisImageData'],['analysisDiagram','analysisDiagramData']]){
  const source=assetPath(s[field]);
  if(!source||s[dataField]||source.startsWith('data:image/')||s[field]?.imageData||s[field]?.data)continue;
  let path=source.replace(/^\.\//,'');
  if(path.startsWith('/')||path.split('/').includes('..')){missing.push(source);continue}
  let key=z[base+path]?base+path:path,bytes=z[key];
  if(!bytes){missing.push(source);continue}
  let ext=key.split('.').pop().toLowerCase(),mime=({svg:'image/svg+xml',jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png'})[ext];
  if(!mime){missing.push(source+' (định dạng không hỗ trợ)');continue}
  let bin='';for(let j=0;j<bytes.length;j+=8192)bin+=String.fromCharCode(...bytes.slice(j,j+8192));
  s[dataField]=`data:${mime};base64,${btoa(bin)}`;
 }
 if(missing.length)throw Error('Thiếu/không đọc được ảnh: '+[...new Set(missing)].join(', '));
 return {lesson:x,sourceKey,files:z,base};
}

// Keep the existing import API for internal/backward-compatible callers.
async function importZip(file){const prepared=await prepareLessonZip(file);await saveLesson(prepared.lesson,prepared.sourceKey);return prepared.lesson;}

function zipCRC32(bytes){let crc=0xffffffff;for(const byte of bytes){crc^=byte;for(let bit=0;bit<8;bit++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return (crc^0xffffffff)>>>0;}
