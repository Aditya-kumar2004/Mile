# Mile Account Portal Web App

A modern, glassmorphic web portal where users can register their accounts and verify tier status for the **Mile** Desktop Assistant.

---

## What is Inside

- **`index.html`**: Semantic, accessible responsive portal page with Google Fonts (`Outfit`, `Plus Jakarta Sans`, `JetBrains Mono`).
- **`style.css`**: Obsidian glassmorphism design system featuring ambient backdrops, luminous borders, animated tabs, and interactive states.
- **`app.js`**: Connects directly to your live Supabase Edge Function:
  - Account Creation: `https://xkzpcfvmskzdvecdgvcr.supabase.co/functions/v1/create-account`
  - Tier Verification: `https://xkzpcfvmskzdvecdgvcr.supabase.co/functions/v1/get-user-tier`
- **`open_portal.bat`**: Double-click to immediately open the portal in your default web browser.

---

## How to Run & Use

### Option 1: Open Locally
Double-click [`open_portal.bat`](file:///c:/Users/Vaibh_c9bv4on/Music/Playlists/ofradr-main/mile_web/open_portal.bat) or right-click [`index.html`](file:///c:/Users/Vaibh_c9bv4on/Music/Playlists/ofradr-main/mile_web/index.html) and open with your favorite browser (Chrome, Edge, Firefox, Brave).

### Option 2: Deploy Publicly (Free)
Since this is a lightweight static web app:
- **Vercel / Netlify / Cloudflare Pages / GitHub Pages**: Simply upload or drag-and-drop the `mile_web` folder to get a live public website URL (e.g. `https://mile-portal.vercel.app`) that anyone can use to sign up.
