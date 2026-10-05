from pathlib import Path
import hashlib,json,difflib,re
p=Path('/workspace/p12-2b-storage');s=json.loads((p/'SOURCE_IDENTITY.json').read_text());original=Path(s['root']);working=Path(s['working']);before=json.loads((p/'SOURCE_MANIFEST_BEFORE.json').read_text());now={str(f.relative_to(original)):hashlib.sha256(f.read_bytes()).hexdigest() for f in original.rglob('*') if f.is_file()};assert before==now
assert hashlib.sha256(Path(s['zip']).read_bytes()).hexdigest()==s['sha256Before']
w={str(f.relative_to(working)):hashlib.sha256(f.read_bytes()).hexdigest() for f in working.rglob('*') if f.is_file()};changed=sorted(k for k in before if w.get(k)!=before[k]);added=sorted(set(w)-set(before));expected=['WEB_LIVE/'+n for n in ['common.js','pedagogy-teacher.js','subject-loader.js','teacher.html','teacher.js','tv.html','tv.js','zip.js']];assert changed==sorted(expected);assert added==['WEB_LIVE/subject-storage.js']
def chunk(root,file,start,end):
 text=(root/'WEB_LIVE'/file).read_text();return text[text.index(start):text.index(end,text.index(start))]
checks=[]
for file,a,b in [('teacher.js','function start(','function populateJump('),('teacher.js','function render(){','function answerTextForState('),('teacher.js','function go(n){','function next(){'),('teacher.js','function state(){','function sync(){'),('common.js','// A scene keeps','\nfunction liveAnswerText('),('tv.js','function applyState(d){','function receive(d){'),('zip.js','async function unzipFile(','function getLibrary('),('zip.js','async function prepareLessonZip(','// Keep the existing import API')]:
 assert chunk(original,file,a,b)==chunk(working,file,a,b),(file,a);checks.append({'file':file,'functionOrBlock':a,'byteExactUnchanged':True})
for name,marker in [('teacher.html','<script src="zip.js"></script>'),('tv.html','<script src="tv.js"></script>')]:
 a=(original/'WEB_LIVE'/name).read_text();b=(working/'WEB_LIVE'/name).read_text();replacement=marker+'<script src="subject-storage.js"></script>' if name=='teacher.html' else '<script src="subject-storage.js"></script>'+marker;assert a.replace(marker,replacement,1)==b
core=[n for n in changed if n!='WEB_LIVE/subject-loader.js'];diff=''
for name in changed:diff+=''.join(difflib.unified_diff((original/name).read_text().splitlines(True),(working/name).read_text().splitlines(True),fromfile='P12.1/'+name,tofile='P12.2B/'+name))
(p/'STORAGE_ONLY_PATCH.diff').write_text(diff)
info={'sourceZipSHA256Before':s['sha256Before'],'sourceZipSHA256After':hashlib.sha256(Path(s['zip']).read_bytes()).hexdigest(),'sourceFrozenFileCount':len(before),'sourceFrozenMutated':False,'changedPayloadFiles':changed,'addedPayloadFiles':added,'coreFilesChanged':core,'profileFilesChanged':[],'cssFilesChanged':[],'profileResolverChanged':False,'launcherChanged':False,'userPackagesChanged':False,'coreOutsideStorageFunctionsChecks':checks,'unmodifiedOriginalPayloadFiles':len(before)-len(changed),'sourceScopeViolation':False,'productionModified':False,'localStorageLegacyCleanup':'NOT_RUN_BY_DESIGN','cleanupApproval':'NOT_GRANTED','P12_2CRequiredBeforeCleanup':True}
(p/'SOURCE_SCOPE.json').write_text(json.dumps(info,indent=2));print(json.dumps(info,indent=2))
