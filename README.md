# Agentic AI for Healthcare Workshop

This is a static workshop website for teaching students how to build healthcare-focused AI agents.

Files:

- `index.html`
- `codex.html`
- `styles.css`
- `auth.js`
- `app.js`

## Run locally

```bash
cd /Users/jgao/Agents/AgenticAIHealthcare
python3 -m http.server 8010
```

Then open:

```text
http://127.0.0.1:8010
```

## Notes

- This site now includes a lightweight browser-side password gate. The current password is `HealthcareSummer2026`.
- To change the password, replace the SHA-256 hash in `auth.js` with a hash of your new password.
- Because this is a static site, this is only light access control for students, not strong server-side security.
- The referenced source site was password-protected, so this version mirrors the workshop format at a high level rather than reproducing hidden content directly.
- Prompt examples were rewritten for healthcare teaching use, including triage, documentation, monitoring, medication reconciliation, coding support, and sleep/apnea monitoring.
