# Reproduction log

## Python environment (first run)

```bash
python -m venv evidence/development/r1-08-independent-oracle-v1/environment/.venv
evidence/development/r1-08-independent-oracle-v1/environment/.venv/Scripts/python.exe -m pip install -r evidence/development/r1-08-independent-oracle-v1/environment/requirements.txt
```

On Unix, use `bin/python` instead of `Scripts/python.exe`.

## Evidence generation

- Command: `pnpm oracle:r1-08` (or `npx tsx tooling/r1-08-oracle/src/run.ts`)
- Base commit: 9c19636c6f42d9b8b98b88964f321d1a9118dfd4
