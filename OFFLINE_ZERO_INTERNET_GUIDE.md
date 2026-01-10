# 🚫 Offline Deployment Guide (Zero Internet)

This entire application is designed to be **100% Offline Capable**. It does not fetch anything from the cloud.
However, to run it on a TV without internet, you need a device to "serve" the files.

**⚠️ CRITICAL REQUIREMENT: DEVICE TIME**
Since there is no internet to sync the time automatically:
*   You MUST ensure the **Date & Time** on your TV/Box/Laptop is set correctly.
*   If the power cuts, some cheap Android boxes reset their time to 1970.
*   **Recommendation:** Use a device with a "CMOS Battery" (like a Laptop, Mini PC, or high-quality Android Box) so it remembers the time even when unplugged.

---

## ✅ Option 1: Android TV / FireStick (Recommended)
You cannot just copy files to a USB and open them like a movie. You need a tiny "Web Server" app on the Android box.

1.  **Prepare the Files**
    *   On your computer, run: `npm run build`
    *   This creates an `out` folder.
    *   Rename the `out` folder to `masjid-clock`.
    *   Copy this folder to a **USB Drive**.

2.  **Setup the Android Box**
    *   Plug the USB drive into the Android Box.
    *   Install an app called **"Simple HTTP Server"** (or any static web server app) from the App Store/Play Store.
    *   Open the app, select the `masjid-clock` folder from your USB drive as the "Root Directory".
    *   Start the server. It will give you a URL like: `http://127.0.0.1:8080`.

3.  **Display**
    *   Open the Web Browser on the TV (Chrome/Firefox/Kiosk Browser).
    *   Go to `http://127.0.0.1:8080`.
    *   The App will load beautifully 100% offline.

---

## 💻 Option 2: Old Laptop / Mini PC (Direct HDMI)
This is the most reliable method for Masjids.

1.  **Prepare the Laptop**
    *   Copy the project code to the laptop.
    *   Install **Node.js** (v18+) on the laptop once (you can download the installer offline on a USB).
    *   Open the project folder terminal and run: `npm run build`.
    *   Then run: `npx serve@latest out` 
    *   (Or basically running `npm run start` if you built it as a standard app, but `serve` is lighter).

2.  **Automate Startup (Windows)**
    *   Create a shortcut to Chrome.
    *   Right-click -> Properties -> Target.
    *   Add: ` --kiosk --incognito "http://localhost:3000"`
    *   Place this in the "Startup" folder so it launches automatically when the laptop turns on.

---

## ❓ Why can't I just double-click `index.html`?
Modern web apps use "Modules" and "CORS" security policies that block browsers from loading complex logic strictly from a file path (`file://C:/...`).
While it *might* open, features like Audio and Navigation often break.
**Running a local web server (Option 1 or 2) is the standard, reliable way.**
