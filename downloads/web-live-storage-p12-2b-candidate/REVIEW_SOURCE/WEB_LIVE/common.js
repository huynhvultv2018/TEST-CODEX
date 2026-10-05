const CH='web-live-v04',STATE_KEY='webLiveStateV042';
let bc=null;try{bc=new BroadcastChannel(CH)}catch(_){}
function send(x){try{bc?.postMessage(x)}catch(_){}}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function readState(){const saved=globalThis.WebLiveSubjectStorage?.readSession();if(saved)return saved;try{return JSON.parse(localStorage.getItem(STATE_KEY)||'null')}catch(_){return null}}
function storeState(x){try{localStorage.setItem(STATE_KEY,JSON.stringify(x))}catch(_){}globalThis.WebLiveSubjectStorage?.saveSession(x);}

// A scene keeps the most recent figure; lesson.json remains unchanged.
function legacySceneKey(s){
 const exercise=String(s?.title||'').normalize('NFC').trim().match(/^bài\s*(\d+(?:\.\d+)*[a-z]?)(?=\b|\s|[.:–—-])/iu);
 if(exercise)return 'legacy:bài:'+exercise[1].toLowerCase();
 const type=String(s?.type||'').normalize('NFC').trim().toLocaleLowerCase('vi');
 const exerciseType=type.match(/^bài\s*(\d+(?:\.\d+)*[a-z]?)(?=\b|\s|[.:–—-])/iu);
 if(exerciseType)return 'legacy:bài:'+exerciseType[1].toLowerCase();
 const numbered=type.match(/^(ví dụ|luyện tập|thực hành)\s*(\d+)/u);
 if(numbered)return 'legacy:'+numbered[1]+':'+numbered[2];
 if(type==='vận dụng')return 'legacy:vận dụng';
 return null;
}
function isAnalysisScreen(s){
 if(!s)return false;
 if(s.analysisDiagram||s.analysisDiagramData||s.analysisImage||s.analysisImageData||String(s.visualRole||'').toLowerCase()==='analysis')return true;
 if(Array.isArray(s.analysisSteps)&&s.analysisSteps.length)return true;
 const type=String(s.type||'').toLocaleLowerCase('vi').replace(/[\s_-]/g,'');
 const title=String(s.title||'').toLocaleLowerCase('vi');
 return ['analysis','analysisdiagram','proofanalysis'].includes(type)||/(sơ đồ phân tích|phân tích|hướng chứng minh|tìm hướng giải|chuỗi suy luận|sơ đồ chứng minh)/u.test(title);
}
function sceneKeyForScreen(s,previous,ended,index=0,lesson=null){
 if(s.sceneId!=null&&String(s.sceneId).trim()!=='')return 'scene:'+String(s.sceneId);
 const named=legacySceneKey(s);if(named)return named;
 if(!ended&&!s.sceneStart&&s.imageMode!=='none'&&previous&&
   (isAnalysisScreen(s)||s.imageMode==='inherit'||/(chứng minh|suy luận|kết luận|chọn dấu hiệu)/iu.test(String(s.type||'')+' '+String(s.title||''))))return previous;
 const path=String(typeof s.image==='string'?s.image:(s.image?.path||s.image?.src||''));
 const opening=!!s.geometryImage||String(s.visualRole||s.image?.visualRole||'').toLowerCase()==='geometry'
  ||/(?:^|[_-])(?:h\d+|hinh)(?:[_.-]|$)/iu.test(path.split('/').pop())
  ||/hình học/iu.test(String(lesson?.subject||''))
  ||/(hình bình hành|tam giác|tứ giác|quan sát hình)/iu.test(String(s.title||''));
 if(!previous&&!isAnalysisScreen(s)&&(s.image||s.geometryImage)&&opening)return 'implicit:'+index;
 return null;
}
function visualSource(s,field,dataField){
 const value=s?.[field],data=s?.[dataField]||(value&&typeof value==='object'&&(value.imageData||value.data));
 const imageData=data||(typeof value==='string'&&value.startsWith('data:image/')?value:null);
 if(!imageData)return null;
 const image=typeof value==='string'?value:(value?.path||value?.src||value?.image||'');
 return{imageData,image};
}
function visualRole(s,lesson,sceneKey,hasGeometry){
 const declared=String(s?.visualRole||s?.image?.visualRole||'').toLowerCase();
 if(['geometry','analysis','illustration','other'].includes(declared))return declared;
 // Analysis screens with an untyped image must never replace the figure.
 if(isAnalysisScreen(s))return 'analysis';
 const name=String(typeof s?.image==='string'?s.image:(s?.image?.path||s?.image?.src||'')).split('/').pop().toLowerCase();
 // Legacy LIVE V0.3 lesson packages use *_S, *_S1, *_SA... for proof diagrams.
 if(/(?:^|[_-])s(?:\d+|[a-z])?(?:\.[^.]+)$/iu.test(name))return 'analysis';
 if(/(?:^|[_-])(?:song_song|bang_nhau|so_do|phan_tich|duong_cheo|ket_luan|dung|can)(?:[_.-]|$)/u.test(name))return 'analysis';
 if(/(?:^|[_-])(?:h\d+|hinh)(?:[_.-]|$)/u.test(name))return 'geometry';
 if(!s.image&&s.imageData)return 'geometry';
 // A legacy image can open a geometry scene; an ambiguous later image cannot overwrite it.
 if(hasGeometry)return 'other';
 return sceneKey||/hình học/iu.test(String(lesson?.subject||''))?'geometry':'other';
}
const visualIndexes=new WeakMap();
function rebuildSceneIndex(lesson){
 if(!Array.isArray(lesson?.screens))return null;
 const id=String(lesson.id||lesson.packageId||''),screens=[],sceneImages=new Map();
 let geometry=null,key=null,ended=false;
 for(let n=0;n<lesson.screens.length;n++){
  const s=lesson.screens[n],next=sceneKeyForScreen(s,key,ended,n,lesson);
  if(n===0||ended||next!==key||s.sceneStart===true)geometry=null;
  key=next;ended=false;
  const explicitGeometry=visualSource(s,'geometryImage','geometryImageData');
  const image=visualSource(s,'image','imageData');
  const role=image?visualRole(s,lesson,key,!!geometry):null;
  if(s.imageMode==='none')geometry=null;
  else if(explicitGeometry||role==='geometry')geometry={...(explicitGeometry||image),sourceIndex:n};
  else if(!key)geometry=null;
  // Analysis belongs to this screen only; it is never stored as a scene figure.
  const analysisSource=visualSource(s,'analysisDiagram','analysisDiagramData')
   ||visualSource(s,'analysisImage','analysisImageData')
   ||(role==='analysis'?image:null);
  const analysis=analysisSource?{...analysisSource,sourceIndex:n}:null;
  const cacheKey=id+'::'+(key||'screen:'+n);
  if(geometry&&key)sceneImages.set(cacheKey,geometry);
  screens.push({geometry,analysis,sceneId:key,cacheKey});
  ended=s.sceneEnd===true;
 }
 const index={lessonId:id,screens,sceneImages};visualIndexes.set(lesson,index);return index;
}
function resetSceneIndex(lesson){if(lesson)visualIndexes.delete(lesson)}
function resolveScreenVisuals(lesson,index){
 if(!Array.isArray(lesson?.screens)||index<0||index>=lesson.screens.length)return null;
 const cache=visualIndexes.get(lesson);
 const fallback=(cache&&cache.lessonId===String(lesson.id||lesson.packageId||'')?cache:rebuildSceneIndex(lesson)).screens[index];
 return globalThis.WebLiveProfiles?.adaptVisuals(lesson,index,fallback)??fallback;
}
function resolveScreenImage(lesson,index){return resolveScreenVisuals(lesson,index)?.geometry||null}
function resolveAnalysisDiagram(lesson,index){return resolveScreenVisuals(lesson,index)?.analysis||null}

// Preserve semantic lines; join line breaks inserted solely for wrapping.
function normalizeLiveText(value,context='prose'){
 if(context==='title')return String(value??'').replace(/\s+/gu,' ').trim();
 const lines=String(value??'').replace(/\r\n?/g,'\n').split('\n'),out=[];
 const list=x=>/^(?:[•▪◦*]\s*|[-–—]\s+|\d+[.)]\s+|Bước\s+\d+\s*[:.)-]?)/iu.test(x);
 const standalone=x=>{
  if(/^[⇒⇔∴∵]/u.test(x))return true;
  if(!/[=∥⊥⟂≅≈≤≥<>∠△∆]/u.test(x))return false;
  return !/(?:^|[\s,;:.])(?:vì|do|nên|suy ra|ta có|hãy|chọn|cần|kết luận|theo|chứng minh|là|của|để|khi|nếu)(?=$|[\s,;:.])/iu.test(x);
 };
 let explicit=false;
 for(const raw of lines){
  let line=raw.trim(),hardMarked=/ {2,}$/.test(raw)||/\\$/.test(raw);
  if(hardMarked&&line.endsWith('\\'))line=line.slice(0,-1).trimEnd();
  if(!line){if(out.length&&out[out.length-1]!=='')out.push('');explicit=false;continue}
  if(!out.length){out.push(line);explicit=hardMarked;continue}
  const prev=out[out.length-1];
  const continuation=/(?:^|[\s,;:.])(?:và|hoặc|nhưng|của|về|để|với|trong)$/iu.test(prev);
  const hard=prev===''||explicit||list(line)||/^[⇒⇔∴∵]/u.test(line)||(!continuation&&(/[.!?;:…]$/u.test(prev)||standalone(prev)||standalone(line)));
  if(hard)out.push(line);else out[out.length-1]=prev+' '+line;
  explicit=hardMarked;
 }
 return out.join('\n').replace(/\n{3,}/g,'\n\n');
}
function liveSteps(s){
 if(Array.isArray(s?.steps)&&s.steps.length)return s.steps.map(x=>normalizeLiveText(x,'proofStep'));
 return normalizeLiveText(s?.answer||'','answer').split(/\n+/).map(x=>x.trim()).filter(Boolean);
}
function liveAnalysisSteps(s){return Array.isArray(s?.analysisSteps)?s.analysisSteps.map(x=>normalizeLiveText(x,'proofStep')).filter(Boolean):[]}
function liveAnalysisText(s,count=0){return liveAnalysisSteps(s).slice(0,count).join('\n↓\n')}
function liveAnswerText(s,mode,count=0){
 if(mode==='hidden')return '';
 const all=liveSteps(s),conclusion=normalizeLiveText(s?.conclusion||'','answer');
 let value=mode==='full'?(s?.answer?normalizeLiveText(s.answer,'answer'):all.join('\n')):all.slice(0,count).join('\n');
 if(conclusion&&(mode==='full'||count>=all.length)&&!value.includes(conclusion))value+=(value?'\n':'')+conclusion;
 return value;
}
