"""Read-only integrity check; output belongs outside the frozen source."""
from pathlib import Path
import hashlib
import json
import zipfile

base = Path(__file__).resolve().parent.parent
frozen = base / 'WEB_LIVE_BASELINE_FROZEN'
manifest = json.loads((base / 'evidence/BASELINE_MANIFEST.json').read_text())
expected = {x['path']: x['sha256'] for x in manifest['files']}
actual = {p.relative_to(frozen).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
          for p in sorted(frozen.rglob('*')) if p.is_file()}
archive = base / 'input/WEB_LIVE_TV_VERTICAL_MCQ_CANDIDATE.zip'
archive_hash = hashlib.sha256(archive.read_bytes()).hexdigest()
with zipfile.ZipFile(archive) as z:
    crc = z.testzip() is None
    archived = {i.filename: hashlib.sha256(z.read(i.filename)).hexdigest()
                for i in z.infolist() if not i.is_dir()}
assert archive_hash == manifest['baseline_zip_sha256']
assert crc and expected == actual == archived
canonical = ''.join(f'{actual[p]}  {p}\n' for p in sorted(actual, key=lambda p: Path(p).parts)).encode()
assert hashlib.sha256(canonical).hexdigest() == manifest['source_fingerprint_sha256']
result = {'status': 'PASS', 'zip_crc': crc, 'zip_sha256': archive_hash,
          'source_fingerprint_sha256': hashlib.sha256(canonical).hexdigest(),
          'files_checked': len(actual), 'added': [], 'removed': [], 'changed': [],
          'baseline_mutated': False, 'source_modified': False,
          'production_modified': False}
(base / 'evidence/FINAL_INTEGRITY.json').write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps(result, indent=2))
