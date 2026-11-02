# Security policy

## Report privately

Do not open a public issue for a vulnerability or include live credentials in examples. Use [GitHub's private vulnerability reporting form](https://github.com/chengchuu/skills/security/advisories/new). If that form is unavailable, contact the maintainer through the repository owner's GitHub profile and ask for a private reporting channel without disclosing sensitive details publicly.

Report concerns involving:

- leaked secrets, tokens, credentials, or private data;
- scripts that execute unsafe or unexpected commands;
- malicious or prompt-injection instructions;
- path traversal or writes outside an intended skill directory;
- destructive Git or filesystem behavior;
- dependency, artifact, or other supply-chain compromise.

Include the affected skill or file, revision, impact, reproduction steps, and a suggested mitigation when available. Replace real secrets and private paths with inert placeholders. Security fixes should minimize exposure and preserve validation coverage.
