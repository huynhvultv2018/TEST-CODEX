from pathlib import Path
import re,json,hashlib
p=Path(__file__).parent;root=Path(json.loads((p/'SOURCE_IDENTITY.json').read_text())['root'])/'WEB_LIVE';calls=[];refs=[];files=[]
pattern=re.compile(r'(?P<receiver>localStorage|(?:this\.)?storage)\s*(?:\?\.)?\.?\s*(?P<method>getItem|setItem|removeItem|clear)\s*\(')
for f in sorted(root.rglob('*')):
 if not f.is_file() or f.suffix not in ['.js','.html']:continue
 s=f.read_text(errors='replace');relative=str(f.relative_to(root));files.append({'file':relative,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()})
 for m in pattern.finditer(s):
  receiver=m.group('receiver')
  if receiver!='localStorage' and f.name!='tts-controller.js':continue
  calls.append({'file':relative,'line':s.count('\n',0,m.start())+1,'column':m.start()-(s.rfind('\n',0,m.start())+1)+1,'receiver':receiver,'operation':m.group('method'),'snippet':s[m.start():m.start()+240].split('\n')[0],'vendor':'vendor' in f.parts})
 for m in re.finditer('localStorage|sessionStorage|indexedDB',s):refs.append({'file':relative,'line':s.count('\n',0,m.start())+1,'token':m.group(0),'offset':m.start(),'snippet':s[max(0,m.start()-50):m.end()+110].split('\n')[0]})
result={'mode':'READ_ONLY_LEXICAL_CALL_SCAN_AND_MANUAL_SOURCE_TRACE','filesScanned':len(files),'calls':calls,'counts':{m:sum(c['operation']==m for c in calls) for m in ['getItem','setItem','removeItem','clear']},'storageReferences':refs,'files':files,'clearFound':any(c['operation']=='clear' for c in calls),'indexedDBFound':any(r['token']=='indexedDB' for r in refs),'aliasNote':'TTSController this.storage defaults to globalThis.localStorage; other storage variable in Loader is transaction Map, not an alias. Vendor MathJax calls included. Domain Model.clear is not localStorage.clear.'}
(p/'SOURCE_STORAGE_CALLS.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'files':result['filesScanned'],'calls':result['counts'],'clearFound':result['clearFound'],'indexedDBFound':result['indexedDBFound']},indent=2))
