const AUTH_CONFIG = {
  passwordHash: "bba9b5186e3856caf4a383a8e3e08d9a5e30fe0e8899f126afaed2eae5748f3b",
  storageKey: "agentic-ai-healthcare-authenticated",
  title: "Agentic AI for Healthcare",
  message: "Enter the course password to open this workshop site.",
};

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hashBuffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function unlockPage() {
  document.body.classList.remove("auth-pending");
  document.querySelector(".auth-overlay")?.remove();
}

function showGate() {
  const overlay = document.createElement("div");
  overlay.className = "auth-overlay";
  overlay.innerHTML = `
    <section class="auth-card">
      <p class="section-label">Protected Site</p>
      <h1>${AUTH_CONFIG.title}</h1>
      <p>${AUTH_CONFIG.message}</p>
      <label class="auth-label" for="site-password">Password</label>
      <input class="auth-input" id="site-password" type="password" autocomplete="current-password" />
      <div class="button-row">
        <button class="button primary" type="button" id="unlock-site">Open site</button>
      </div>
      <div class="auth-error" id="auth-error" aria-live="polite"></div>
    </section>
  `;
  document.body.appendChild(overlay);

  const input = overlay.querySelector("#site-password");
  const button = overlay.querySelector("#unlock-site");
  const error = overlay.querySelector("#auth-error");

  async function tryUnlock() {
    const password = input.value.trim();
    const hash = await sha256(password);
    if (hash === AUTH_CONFIG.passwordHash) {
      sessionStorage.setItem(AUTH_CONFIG.storageKey, "true");
      unlockPage();
      return;
    }
    error.textContent = "Incorrect password.";
    input.select();
  }

  button.addEventListener("click", tryUnlock);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      tryUnlock();
    }
  });
  input.focus();
}

async function initAuth() {
  if (sessionStorage.getItem(AUTH_CONFIG.storageKey) === "true") {
    unlockPage();
    return;
  }
  showGate();
}

initAuth();
