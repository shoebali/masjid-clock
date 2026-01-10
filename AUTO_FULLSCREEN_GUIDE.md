# 📺 Auto-Fullscreen & Kiosk Mode Guide

You requested that the app should **automatically go full screen** without clicking.
Web Browsers (Chrome, Edge, Safari, Firefox) **block** this by default to prevent spam websites from taking over your computer.

However, for a generic "Masjid Clock" setup, you can bypass this security in 3 ways:

---

## ✅ Method 1: Chrome/Edge "Kiosk Mode" (Windows)
This is the standard way to run digital signage on Windows. It forces the browser to open in Fullscreen immediately.

1.  **Create a Shortcut**
    *   Right-click on your Desktop -> New -> Shortcut.
    *   Paste the following location (Replace URL with your Vercel/Local URL):
    
    **For Chrome:**
    ```text
    "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --incognito "https://your-masjid-clock.vercel.app"
    ```
    
    **For Edge:**
    ```text
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --kiosk --edge-kiosk-type=fullscreen "https://your-masjid-clock.vercel.app"
    ```

2.  **Usage**
    *   Double-click this shortcut.
    *   The browser will open instantly in Full Screen (No address bar, no buttons).
    *   **To Exit:** Press `Alt + F4`.

---

## 🤖 Method 2: Android TV (Fully Kiosk Browser)
If you are using an Android TV or FireStick:

1.  Open the **Fully Kiosk Browser** app.
2.  Go to **Settings > Kiosk Mode**.
3.  Enable **"Kiosk Mode"**.
4.  The app will now essentially *be* the TV's operating system and will always be full screen.

---

## 💻 Method 3: Browser Settings (Firefox)
Firefox allows you to enable auto-fullscreen in its internal settings (unlike Chrome).

1.  Open Firefox and type `about:config` in the address bar.
2.  Search for `full-screen-api.allow-trusted-requests-only`.
3.  Set it to **false**.
4.  Now, the code I added (`requestFullscreen()`) will work automatically without a click!

---

## 🔊 Important Note on Audio (Adhan)
Even if you force Fullscreen, **Audio** might still be blocked until the first click.
*   **Fully Kiosk Browser** has a "Play Audio" setting to bypass this.
*   **Chrome Kiosk Mode (`--kiosk`)** usually allows audio autoplay automatically since it knows it is in Kiosk mode.
*   If not, add `--autoplay-policy=no-user-gesture-required` to the shortcut in Method 1.
