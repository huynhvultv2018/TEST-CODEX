
const embeddedPreview=new URLSearchParams(location.search).get('preview')==='1'&&window.parent!==window;
if(embeddedPreview)document.documentElement.classList.add('embeddedPreview');
function full(){if(!document.fullscreenElement)document.documentElement.requestFullscreen?.();else document.exitFullscreen?.()}
const $=id=>document.getElementById(id);
const wait=$('wait'),screenEl=$('screen'),meta=$('meta'),title=$('title'),content=$('content'),analysis=$('analysis'),analysisFigure=$('analysisFigure'),analysisPic=$('analysisPic'),hint=$('hint'),answer=$('answer'),figurePane=$('figurePane'),figureInner=$('figureInner'),pic=$('pic'),pointer=$('pointer'),progress=$('progress'),bar=$('bar');
let cachedLesson=null,cachedActivation='',lastState=null,boardViewer=null,coverViewer=null,smartViewer=null;
const pendingLessonReads=new Set();
// Storage-only fallback notice, outside the cognitive panel; no layout/renderer change.
const storageNotice=document.createElement('div');storageNotice.id='tvStorageWarning';storageNotice.setAttribute('role','status');storageNotice.hidden=true;
storageNotice.style.cssText='position:fixed;bottom:8px;left:16px;z-index:30;font-size:16px;background:#172033;color:#fff;padding:4px 8px;max-width:80vw';document.body.append(storageNotice);
function storageReadNotice(id){const h=WebLiveSubjectStorage.getStorageHealth();storageNotice.hidden=h.lessonId!==id||!h.message.includes('Đang dùng bản bài cũ');storageNotice.textContent=storageNotice.hidden?'':'⚠ Đang dùng bản bài cũ đã kiểm tra.';}

function getLesson(id,activation='',sourceKey=''){
 if(cachedLesson?.id===id&&cachedActivation===activation&&(!sourceKey||cachedLesson._runtimeSourceKey===sourceKey))return cachedLesson;
 const token=JSON.stringify([id,activation,sourceKey]);
 if(!pendingLessonReads.has(token)){
  pendingLessonReads.add(token);
  WebLiveSubjectStorage.ready.then(()=>WebLiveSubjectStorage.readLesson(id)).then(found=>{
   if(!found||sourceKey&&found._runtimeSourceKey!==sourceKey)return;
   if(lastState?.lessonId!==id||(lastState.lessonActivation||'')!==activation||(lastState.lessonSourceKey||'')!==sourceKey)return;
   cachedLesson=found;cachedActivation=activation;rebuildSceneIndex(found);storageReadNotice(id);applyState(lastState);
  }).catch(()=>{}).finally(()=>pendingLessonReads.delete(token));
 }
 return null;
}
function resolveScreen(d){let active=getLesson(d.lessonId,d.lessonActivation||'',d.lessonSourceKey||'');return active?.screens?.[d.index]||null}
function answerText(d,s){return liveAnswerText(s,d.answerMode,d.answerStep||0)}
function paintMathNode(node,value){if(typeof renderMathAtomic==='function')renderMathAtomic(node,value);else node.textContent=value}
function fitFigure(){
 if(!lastState||!pic.naturalWidth||!figurePane.clientWidth)return;
 const viewport=figurePane.querySelector?.('.figureViewport');
 const w=viewport?.clientWidth||figurePane.clientWidth-28,h=viewport?.clientHeight||figurePane.clientHeight-28;
 if(w<=0||h<=0)return;
 const k=Math.min(w/pic.naturalWidth,h/pic.naturalHeight),fw=k*pic.naturalWidth,fh=k*pic.naturalHeight,
  z=Math.max(.7,Math.min(2,lastState.zoom||1)),px=lastState.pan?.x||0,py=lastState.pan?.y||0;
 figureInner.style.width=fw+'px';figureInner.style.height=fh+'px';
 figureInner.style.transform=`translate(${px*Math.max(0,(fw*z-w)/2)}px,${py*Math.max(0,(fh*z-h)/2)}px) scale(${z})`;
 boardViewer?.fit();coverViewer?.fit();smartViewer?.fit();Classroom.draw($('classroomHighlight'),screenEl.dataset.contextResource==='true'?[]:lastState?.classroom?.highlights||[]);
}
function fitText(){
 const pane=screenEl.querySelector('.textPane');if(!pane||!pane.clientHeight)return;
 if(['rc4','multi-engine-rc1'].includes(screenEl.dataset.studentUi)||screenEl.dataset.presentation&&screenEl.dataset.presentation!=='legacy'){TVLayout.fit(screenEl,pane);fitFigure();return;}
 pane.classList.remove('tight');pane.dataset.tvOverflow='false';
 screenEl.dataset.tvLayout=screenEl.dataset.tvPreferred||'balanced';
 for(const el of [title,content,analysis,hint,answer])el.style.fontSize='';
 if(typeof getComputedStyle!=='function')return;
 const tooTall=()=>pane.scrollHeight>pane.clientHeight+2;
 if(!tooTall())return;
 pane.classList.add('tight');
 if(tooTall()&&screenEl.className.includes('split')&&!lastState?.classroom?.layoutPinned&&screenEl.dataset.tvPreferred!=='70')screenEl.dataset.tvLayout='proof';
 if(tooTall()){
  const base=[title,content,analysis].map(el=>parseFloat(getComputedStyle(el).fontSize)||32);
  for(let factor=.96;factor>=.84;factor-=.04){
   title.style.fontSize=Math.max(38,base[0]*factor)+'px';
   content.style.fontSize=Math.max(34,base[1]*factor)+'px';
   for(const el of [analysis,hint,answer])el.style.fontSize=Math.max(30,base[2]*factor)+'px';
   if(!tooTall())break;
  }
 }
 /* Last resort for unstructured text: preserve every word instead of clipping or shrinking below the readable floor. */
 if(tooTall())pane.dataset.tvOverflow='true';
 fitFigure();
}
function renderStepCards(node,items,whole,kind,focus=null){
 node.classList.remove('hasSteps');
 if(!items.length||typeof document.createElement!=='function'||typeof document.createTextNode!=='function'||typeof node.replaceChildren!=='function')return;
 const separator=kind==='analysis'?'\n↓\n':'\n';
 if(items.join(separator)!==whole)return;
 const children=[];
 items.forEach((value,index)=>{
  if(index){
   if(kind==='analysis'){
    children.push(document.createTextNode('\n'));
    const arrow=document.createElement('span');arrow.className='analysisArrow';arrow.textContent='↓';children.push(arrow);
    children.push(document.createTextNode('\n'));
   }else children.push(document.createTextNode('\n'));
  }
  const step=document.createElement('div');step.className=(kind==='analysis'?'analysisStep ':'proofStep ')+(index===items.length-1?'current':'previous');paintMathNode(step,value);Classroom.step(step,kind==='analysis'?'analysis':'answer',index,focus);children.push(step);
 });
 node.replaceChildren(...children);node.classList.add('hasSteps');node.classList.toggle('hasFocus',!!focus&&focus.region===(kind==='analysis'?'analysis':'answer'));
}
function applyState(d){
 if(d?.type!=='state')return;
 if(lastState?.lessonActivation===d.lessonActivation&&(d.stateVersion||0)<(lastState.stateVersion||0))return;
 lastState=d;
 let l=d.lesson||{},active=getLesson(d.lessonId,d.lessonActivation||'',d.lessonSourceKey||''),s=active?.screens?.[d.index];
 if(!s){
  let request={type:'needLesson',lessonId:d.lessonId,lessonActivation:d.lessonActivation};send(request);
  try{window.opener?.postMessage(request,'*')}catch(_){};
  wait.hidden=false;screenEl.hidden=true;return;
 }
 globalThis.WebLiveProfiles?.observe(embeddedPreview?'preview':'tv',active,d);
 wait.hidden=true;screenEl.hidden=false;
 let classroom=d.classroom||{},visuals=resolveScreenVisuals(active,d.index),resolved=visuals?.geometry,diagram=visuals?.analysis,img=!!resolved,
  isAnalysis=img&&(isAnalysisScreen(s)||!!diagram),steps=liveAnalysisSteps(s);
 const presentation=TVLayout.plan(active,s,d,visuals);
 if(presentation.resource&&!resolved){resolved=presentation.resource;img=true;}
 const geometry=!!visuals?.geometry;
 meta.textContent=`${l.subject||''} • Tuần ${l.week??'-'} • Tiết ${l.period??'-'} • ${l.title||''}`;
 paintMathNode(title,normalizeLiveText(s.title||d.screenLite?.title||'','title'));
 const closeHidden=livePedagogyIsClose(active,s)&&d.pedagogy?.knowledgeCloseVisible!==true;paintMathNode(content,normalizeLiveText(livePedagogyContent(active,s,d.pedagogy?.knowledgeCloseVisible),'prose'));content.hidden=closeHidden;$('knowledgeWait').hidden=!closeHidden;
 paintMathNode(analysis,liveAnalysisText(s,d.analysisStep||0));
 analysis.hidden=!(d.analysisStep>0&&analysis.textContent);
 if(!analysis.hidden)renderStepCards(analysis,steps.slice(0,d.analysisStep),analysis.textContent,'analysis',classroom.focus);
 analysisFigure.hidden=!diagram||!!steps.length;
 if(diagram&&!steps.length){
  if(analysisPic.src!==diagram.imageData){analysisPic.onload=()=>requestAnimationFrame(()=>{fitText();fitFigure()});analysisPic.src=diagram.imageData}
 }else analysisPic.removeAttribute('src');
 const ht=livePedagogyEnabled(active)?livePedagogyHint(s,d.pedagogy?.hintLevel||0):s.hint||'';paintMathNode(hint,normalizeLiveText(ht,'hint'));hint.hidden=!(d.showHint&&ht);
 let at=answerText(d,s);paintMathNode(answer,at);answer.hidden=!at;
 if(d.answerMode==='steps'&&at){
  let proof=liveSteps(s).slice(0,d.answerStep||0),conclusion=normalizeLiveText(s.conclusion||'','answer');
  if(conclusion&&proof.join('\n')!==at)proof.push(conclusion);
  renderStepCards(answer,proof,at,'proof',classroom.focus);
 }else answer.classList.remove('hasSteps');
 Classroom.focusText(content,content.textContent,'content',classroom.focus);
 if(!analysis.classList.contains('hasSteps'))Classroom.focusText(analysis,analysis.textContent,'analysis',classroom.focus);
 Classroom.focusText(hint,hint.textContent,'hint',classroom.focus);
 if(!answer.classList.contains('hasSteps'))Classroom.focusText(answer,answer.textContent,'answer',classroom.focus);
 let mode=presentation.contextual?'split':img&&classroom.layout==='full'?'figure':isAnalysis?(d.viewMode==='figure'?'figure':'split'):img&&['split','figure','text'].includes(d.viewMode)?d.viewMode:img?'split':'text';
 screenEl.className='screen '+mode+(isAnalysis?' analysis':'');
 TVLayout.apply(screenEl,active,s,d,presentation);
 screenEl.classList.toggle('fontBoost',!!classroom.fontBoost);
 const length=title.textContent.length+content.textContent.length+(hint.hidden?0:hint.textContent.length)+
  (answer.hidden?0:at.length)+(analysis.hidden?0:analysis.textContent.length);
 screenEl.classList.toggle('compact',length>210);
 screenEl.dataset.tvPreferred=img&&['70','60'].includes(classroom.layout)?classroom.layout:isAnalysis||!!diagram?'balanced':length<110?'figure':length>240||d.answerMode==='steps'&&d.answerStep>1?'proof':'balanced';
 screenEl.dataset.tvLayout=screenEl.dataset.tvPreferred;
 screenEl.dataset.conclusion=/(kết luận|conclusion)/iu.test(String(s.type||'')+' '+String(s.title||''))?'true':'false';
 figurePane.style.display=(img&&mode!=='text')?'grid':'none';
 if(img){
  if(pic.src!==resolved.imageData){
   pic.onload=fitFigure;
   pic.onerror=()=>{wait.textContent='Không đọc được ảnh: '+(resolved.image||'ảnh nhúng');wait.hidden=false;screenEl.hidden=true};
   pic.src=resolved.imageData;
  }
  requestAnimationFrame(fitFigure);
 }else pic.removeAttribute('src');
 if(d.pointer&&geometry&&mode!=='text'){
  pointer.style.left=(d.pointer.x*100)+'%';pointer.style.top=(d.pointer.y*100)+'%';pointer.hidden=false;
 }else pointer.hidden=true;
 progress.textContent=`${d.index+1} / ${d.total}`;bar.style.width=`${((d.index+1)/d.total)*100}%`;
 boardViewer?.apply(d,geometry);coverViewer?.apply(d,geometry);smartViewer?.apply(d,geometry);
 Classroom.draw($('classroomHighlight'),geometry?classroom.highlights||[]:[]);updateClassroomClock();
 globalThis.WebLiveProfiles?.present(embeddedPreview?'preview':'tv',active,d,screenEl);
 requestAnimationFrame(()=>{fitText();TTSTVPresentation.refresh(d);globalThis.WebLiveProfiles?.tvRendered(d);});
}
function receive(d){if(d?.type==='state'&&d.lessonId!==cachedLesson?.id)storageNotice.hidden=true;if(d?.type==='smartGeometry'){smartViewer?.refresh(d);return}if(d?.type==='smartSnapshot'){smartViewer?.snapshot(d);return}if(d?.type==='coverLayer'){coverViewer?.refresh(d);return}if(d?.type==='coverSnapshot'){coverViewer?.snapshot(d);return}if(d?.type==='drawBoardPreview'){boardViewer?.transient(d);smartViewer?.fit();return}if(d?.type==='drawBoardPreviewEnd'){boardViewer?.endTransient(d);smartViewer?.fit();return}if(d?.type==='drawBoard'){boardViewer?.refresh(d);smartViewer?.fit();return}if(d?.type==='drawBoardSnapshot'){boardViewer?.snapshot(d);smartViewer?.fit();return}if(d?.type==='lesson'&&d.lesson){if(!lastState||d.lesson.id!==lastState.lessonId||d.lessonActivation!==lastState.lessonActivation||lastState.lessonSourceKey&&d.lesson._runtimeSourceKey!==lastState.lessonSourceKey)return;cachedLesson=d.lesson;cachedActivation=d.lessonActivation||'';rebuildSceneIndex(d.lesson);/* Peer lesson is RAM only; persistent storage belongs to Loader adapter. */applyState(lastState)}else applyState(d)}
function updateClassroomClock(){const el=$('classroomClock'),label=Classroom.clockText(lastState?.classroom?.clock);el.hidden=!label;if(label)el.textContent=label}
let chromeTimeout=0;
function revealChrome(e){if(e.clientY>90&&e.clientY<(window.innerHeight||1080)-85)return;const root=$('tvRoot');root.classList.add('chromeVisible');clearTimeout(chromeTimeout);chromeTimeout=setTimeout(()=>root.classList.remove('chromeVisible'),2500)}
function tvFigureDoubleClick(e){
 if(!lastState||lastState.classroom?.interactionLocked||screenEl.dataset.contextResource==='true'||screenEl.classList.contains('text')||!pic.src)return;
 e.preventDefault();const request={type:'classroomToggleFigure',lessonId:lastState.lessonId,lessonActivation:lastState.lessonActivation};
 try{if(window.opener&&!window.opener.closed){window.opener.postMessage(request,'*');return}}catch(_){}
 send(request);
}
if(bc)bc.onmessage=e=>receive(e.data);window.addEventListener('message',e=>receive(e.data));window.addEventListener('storage',e=>{if(e.key===STATE_KEY)receive(readState());else{boardViewer?.storage(e);coverViewer?.storage(e);smartViewer?.storage(e)}});window.addEventListener('resize',()=>requestAnimationFrame(()=>{fitText();fitFigure()}));document.addEventListener?.('fullscreenchange',()=>requestAnimationFrame(()=>{fitText();fitFigure()}));
figurePane.addEventListener?.('dblclick',tvFigureDoubleClick);$('tvRoot').addEventListener?.('pointermove',revealChrome);
if(typeof setInterval==='function')setInterval(updateClassroomClock,1000);
boardViewer=new DrawBoardTV();coverViewer=typeof CoverLayerTV!=='undefined'?new CoverLayerTV():null;smartViewer=typeof SmartGeometryTV!=='undefined'?new SmartGeometryTV():null;receive(readState());send({type:'ready'});try{window.opener?.postMessage({type:'ready'},'*')}catch(_){}

// Presence is separate from lesson state. A preview never reports a physical TV.
function reportPresence(closed=false){
 const d={type:'tvPresence',closed,preview:embeddedPreview,lessonId:lastState?.lessonId,lessonActivation:lastState?.lessonActivation,index:lastState?.index};
 if(embeddedPreview){try{window.parent.postMessage(d,location.origin==='null'?'*':location.origin)}catch(_){}}
 else {send(d);try{window.opener?.postMessage(d,'*')}catch(_){}}
}
reportPresence();setInterval(()=>reportPresence(),1500);
window.addEventListener('pagehide',()=>reportPresence(true));

// Re-read durable session only after storage bootstrap has completed.
WebLiveSubjectStorage.ready.then(()=>receive(readState()));
