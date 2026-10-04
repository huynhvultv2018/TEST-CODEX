"""Package reports/evidence plus the original ZIP; never write frozen source."""
from pathlib import Path
import hashlib
import json
import re
import zipfile

base = Path(__file__).resolve().parent.parent
out = Path('/workspace/output/web-live-multi-subject-phase1')
out.mkdir(parents=True, exist_ok=True)
required = [
    'WEB_LIVE_BASELINE_FREEZE_REPORT.md', 'WEB_LIVE_ARCHITECTURE_AUDIT.md',
    'WEB_LIVE_COMPONENT_CLASSIFICATION.md', 'WEB_LIVE_MULTI_SUBJECT_DESIGN.md',
    'WEB_LIVE_BACKWARD_COMPATIBILITY_PLAN.md', 'WEB_LIVE_REGRESSION_PLAN.md',
    'WEB_LIVE_PHASE2_IMPLEMENTATION_PLAN.md',
]
for name in required:
    p = base / name
    assert p.is_file() and p.stat().st_size > 1000
for p in base.glob('*.md'):
    for target in re.findall(r'\]\(([^)]+)\)', p.read_text()):
        if not target.startswith(('http:', 'https:', '#')):
            assert (p.parent / target).exists(), (p.name, target)
integrity = json.loads((base / 'evidence/FINAL_INTEGRITY.json').read_text())
assert integrity['status'] == 'PASS' and integrity['files_checked'] == 770
files = sorted((p for p in base.rglob('*') if p.is_file()
                and 'WEB_LIVE_BASELINE_FROZEN' not in p.relative_to(base).parts
                and p.name != 'CHECKSUMS_PHASE1_SHA256.txt'),
               key=lambda p: p.relative_to(base).as_posix())
digest = lambda data: hashlib.sha256(data).hexdigest()
manifest = ''.join(f'{digest(p.read_bytes())}  {p.relative_to(base).as_posix()}\n' for p in files)
(base / 'CHECKSUMS_PHASE1_SHA256.txt').write_text(manifest)
files.append(base / 'CHECKSUMS_PHASE1_SHA256.txt')
archive = out / 'WEB_LIVE_MULTI_SUBJECT_PHASE1_AUDIT_DESIGN.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for p in files:
        name = base.name + '/' + p.relative_to(base).as_posix()
        compression = zipfile.ZIP_STORED if p.suffix == '.zip' else zipfile.ZIP_DEFLATED
        z.write(p, name, compress_type=compression)
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    assert len(z.namelist()) == len(files)
    for p in files:
        assert z.read(base.name + '/' + p.relative_to(base).as_posix()) == p.read_bytes()
    original = z.read(base.name + '/input/WEB_LIVE_TV_VERTICAL_MCQ_CANDIDATE.zip')
    assert digest(original) == integrity['zip_sha256']
result = {'artifact': archive.name, 'bytes': archive.stat().st_size,
          'sha256': digest(archive.read_bytes()), 'zip_crc_pass': True,
          'entries': len(files), 'required_reports': required,
          'original_baseline_zip_sha256': digest(original),
          'source_fingerprint_sha256': integrity['source_fingerprint_sha256'],
          'baseline_mutated': False, 'source_modified': False,
          'production_modified': False, 'phase2_implemented': False}
(out / 'PACKAGE_VERIFICATION.json').write_text(json.dumps(result, indent=2) + '\n')
(out / (archive.name + '.sha256')).write_text(result['sha256'] + '  ' + archive.name + '\n')
print(json.dumps(result, indent=2))
