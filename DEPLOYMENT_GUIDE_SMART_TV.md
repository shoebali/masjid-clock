# 📺 Masjid Clock - Smart TV Deployment Guide

This guide describes the best ways to display the Masjid Clock application on a Smart TV.

Since this application is built as a **Static Web App** (`output: 'export'`), it is extremely flexible and can be deployed in multiple ways.

---

## ✅ Method 1: The "Online" Method (Recommended)
**Best for:** TVs with internet access (Samsung Tizen, LG WebOS, Android TV).
**Requirement:** The TV must be connected to Wi-Fi.

1.  **Deploy to Vercel (Free)**
    *   Create a GitHub repository and push this code.
    *   Go to [Vercel.com](https://vercel.com) and sign up.
    *   Click **"Add New Project"** and select your repository.
    *   Vercel will detect Next.js. Just click **Deploy**.
    *   You will get a URL (e.g., `https://my-masjid-clock.vercel.app`).

2.  **Open on TV**
    *   Open the Web Browser app on your Smart TV.
    *   Type in the URL you got from Vercel.
    *   Click anywhere on the screen (using the remote) to enable **Full Screen** and **Sound**.
    *   *Tip: Bookmark the page in the browser.*

---

## 🚀 Method 2: The "Android Box" Method (Professional)
**Best for:** Permanent installations. Prevents the TV from sleeping and auto-starts the app on power loss.
**Requirement:** An Android TV, FireStick, or Mi Box connected to the screen.

1.  **Install "Fully Kiosk Browser"**
    *   Go to the Google Play Store on your TV/Box.
    *   Search for and install **"Fully Kiosk Browser"**.
2.  **Configure Kiosk Mode**
    *   Open the app and set the **Start URL** to your Vercel URL (from Method 1).
    *   In Settings > **Web Auto Reload**, set strict reload if WiFi calls.
    *   In Settings > **Device Management**, enable "Keep Screen On" so the TV doesn't sleep.
    *   Enable **"Launch on Boot"** so the clock starts automatically if power is cut and restored.

---

## 🔌 Method 3: The "Local/Offline" Method (Advanced)
**Best for:** Masjids without reliable Internet.
**Requirement:** A Laptop, Raspberry Pi, or Mini PC connected via HDMI.

1.  **Build the App**
    *   Run `npm run build` on your computer.
    *   This creates an `out` folder with the static website.
2.  **Serve Locally**
    *   You can run a simple local server on the Mini PC.
    *   Or, if using a Raspberry Pi, copy the `out` folder to the Pi and use `serve -s out` or Nginx.
3.  **Connect HDMI**
    *   Connect the device to the TV via HDMI.
    *   Set the PC to open a browser (Chrome/Edge) in Kiosk mode on startup:
        *   **Windows:** Create a shortcut: `chrome.exe --kiosk "file:///path/to/out/index.html"` (Note: Audio might be tricky with local files due to browser security policy).
        *   **Better:** Run a tiny local webserver (`npm install -g serve` -> `serve -s out`) and point Chrome to `http://localhost:3000`.

---

## ⚠️ Important Configuration Settings

### Screen & Sleep Settings
*   Most Smart TVs have an "Eco Mode" or "Auto Sleep". **Turn this OFF** in the TV settings.
*   Set "Screensaver" to **None**.

### Audio (Adhan)
*   **Browsers block auto-audio** by default.
*   You **MUST interact (click)** with the page once after it loads to "unlock" the audio.
*   If using **Fully Kiosk Browser (Method 2)**, there is a setting "Play Audio" that usually bypasses this.

### Resolution
*   The app is responsive. It works on 1080p (Full HD) and 4k screens automatically.
*   If the edges are cut off, check your TV remote for "Aspect Ratio" or "Picture Size" and set it to **"Just Scan"** or **"Fit to Screen"**.
