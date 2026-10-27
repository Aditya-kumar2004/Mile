// =============================================================================
// MILE ACCOUNT PORTAL - FRONTEND LOGIC
// =============================================================================

const SUPABASE_BASE_URL = "https://xkzpcfvmskzdvecdgvcr.supabase.co/functions/v1";

// Switch between Register and Status tabs
function switchTab(tab) {
  const regBtn = document.getElementById("tab-register");
  const chkBtn = document.getElementById("tab-check");
  const regPane = document.getElementById("pane-register");
  const chkPane = document.getElementById("pane-check");

  hideToast();

  if (tab === "register") {
    regBtn.classList.add("active");
    regBtn.setAttribute("aria-selected", "true");
    chkBtn.classList.remove("active");
    chkBtn.setAttribute("aria-selected", "false");
    regPane.classList.add("active");
    chkPane.classList.remove("active");
  } else {
    chkBtn.classList.add("active");
    chkBtn.setAttribute("aria-selected", "true");
    regBtn.classList.remove("active");
    regBtn.setAttribute("aria-selected", "false");
    chkPane.classList.add("active");
    regPane.classList.remove("active");
  }
}

// Select Tier Cards
function selectTier(card, tier) {
  document.querySelectorAll(".tier-card").forEach((c) => c.classList.remove("selected"));
  card.classList.add("selected");
  const radio = card.querySelector('input[type="radio"]');
  if (radio) radio.checked = true;
}

// Password Visibility Toggle
function togglePass(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === "password") {
    input.type = "text";
    btn.textContent = "🙈";
  } else {
    input.type = "password";
    btn.textContent = "👁";
  }
}

// Toast Alert Helper
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-message");
  const iconEl = document.getElementById("toast-icon");

  toast.className = `toast ${type}`;
  msgEl.innerHTML = message;
  iconEl.innerHTML = type === "success" ? "✓" : "⚠";
  toast.style.display = "flex";
}

function hideToast() {
  const toast = document.getElementById("toast");
  if (toast) toast.style.display = "none";
}

// Handle Account Registration
async function handleRegister(e) {
  e.preventDefault();
  hideToast();

  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirm = document.getElementById("reg-confirm").value;
  const tierRadio = document.querySelector('input[name="tier"]:checked');
  const tier = tierRadio ? tierRadio.value : "ultra";

  // Client Validations
  if (username.length < 3) {
    showToast("Username must be at least 3 characters.", "error");
    return;
  }
  if (password.length < 4) {
    showToast("Password must be at least 4 characters.", "error");
    return;
  }
  if (password !== confirm) {
    showToast("Passwords do not match. Please verify.", "error");
    return;
  }

  const btn = document.getElementById("btn-submit-reg");
  const btnText = btn.querySelector(".btn-text");
  const btnSpinner = btn.querySelector(".btn-spinner");

  // Set Loading
  btn.disabled = true;
  btnText.textContent = "Creating Account...";
  btnSpinner.style.display = "inline-block";

  try {
    const res = await fetch(`${SUPABASE_BASE_URL}/create-account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, tier }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      showToast(
        `<strong>Account Created!</strong> User <code>${data.username}</code> is now active with <code>${data.tier.toUpperCase()}</code> tier. You can now log into the Mile desktop app!`,
        "success"
      );
      document.getElementById("register-form").reset();
      // Reselect default tier
      const defaultTier = document.querySelector('.tier-card input[value="ultra"]');
      if (defaultTier) selectTier(defaultTier.closest(".tier-card"), "ultra");
    } else {
      showToast(data.message || "Failed to create account. Please try again.", "error");
    }
  } catch (err) {
    showToast(`Network error: ${err.message}. Please check your connection.`, "error");
  } finally {
    btn.disabled = false;
    btnText.textContent = "Create Account";
    btnSpinner.style.display = "none";
  }
}

// Handle Checking Existing Account Status & Tier
async function handleCheckTier(e) {
  e.preventDefault();
  hideToast();

  const username = document.getElementById("chk-username").value.trim();
  const password = document.getElementById("chk-password").value;
  const resultBox = document.getElementById("tier-result-box");
  resultBox.style.display = "none";

  const btn = document.getElementById("btn-submit-chk");
  const btnText = btn.querySelector(".btn-text");
  const btnSpinner = btn.querySelector(".btn-spinner");

  btn.disabled = true;
  btnText.textContent = "Verifying...";
  btnSpinner.style.display = "inline-block";

  try {
    const res = await fetch(`${SUPABASE_BASE_URL}/get-user-tier`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      showToast(`User <strong>${username}</strong> verified successfully!`, "success");
      resultBox.innerHTML = `
        <div class="result-row">
          <span class="result-label">Username:</span>
          <span class="result-val">${username}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Assigned Tier:</span>
          <span class="result-val">${(data.tier || "ultra").toUpperCase()}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Ultra Access:</span>
          <span class="result-val">${data.ultra_tier ? "ACTIVE" : "INACTIVE"}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Pro Access:</span>
          <span class="result-val">${data.pro_tier ? "ACTIVE" : "INACTIVE"}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Desktop Status:</span>
          <span class="result-val">READY TO LAUNCH</span>
        </div>
      `;
      resultBox.style.display = "block";
    } else {
      showToast(data.message || "Invalid username or password.", "error");
    }
  } catch (err) {
    showToast(`Verification failed: ${err.message}`, "error");
  } finally {
    btn.disabled = false;
    btnText.textContent = "Verify Credentials & Tier";
    btnSpinner.style.display = "none";
  }
}
