# 🚀 How to Build APK Without Android Studio (Using Tool)

Since you don't have Android Studio or Java installed, we will use the **Website 2 APK Builder** tool again.
I have already fixed the "missing CSS" problem for you by running a script.

### Step 1: Open Your "Website 2 APK Builder"
Open the software you downloaded earlier.

### Step 2: Select the "out" Folder
1.  **Directory:** Select `d:\ai\clock-masjid\app\out`
    *   *Note: Inside this folder, you will now see an `assets` folder instead of `_next`. This is what fixes the design!*
2.  **App Title:** Masjid Clock
3.  **Package Name:** com.masjid.clock
4.  **Orientation:** Landscape

### Step 3: IMPORTANT SETTINGS
Make sure these are correct for the design to load:
*   [x] **Local HTML Website**
*   [x] **Main File:** `index.html` (It should auto-detect this).

### Step 4: Click "GENERATE APK"
That's it!

Because I ran the `fix-apk-paths.js` script, the APK will now correctly find the CSS files in the `assets` folder instead of looking for the blocked `_next` folder.
