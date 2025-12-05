# Installing Project Diablo 2 on Omarchy

If you're an Omarchy user itching to dive into **Project Diablo 2 (PD2)**—the fan-favorite mod for *Diablo II: Lord of Destruction*—but Lutris keeps throwing exit code errors (like I experienced), there's a reliable workaround using Steam's Proton compatibility layer. This method adds the Windows installers as non-Steam games, runs them through Proton, and gets everything set up seamlessly.

**Credit:** This guide is adapted from a detailed comment by Reddit user **andi242** in r/ProjectDiablo2.

## Prerequisites
- A legitimate *Diablo II* and *Diablo II: Lord of Destruction* CD key from Blizzard (check yours at [Battle.net account](https://account.battle.net/games#classic-game-accounts)). Pirated keys lead to bans in PD2.
- Steam. (I think it comes pre-installed in Omarchy. I might have uninstalled it. I don't remember.)
- Proton 9.x enabled (Proton 10 may cause mouse capture issues).

**Download these files to your `~/Downloads` folder:**
1. **Diablo II Downloader:** [Downloader_Diablo2_enUS.exe](https://us.battle.net/download/getLegacy?os=win&locale=enUS&product=d2dv)
2. **LoD Downloader:** [Downloader_Diablo2_Lord_of_Destruction_enUS.exe](https://us.battle.net/download/getLegacy?os=win&locale=enUS&product=d2xdv)
3. **Project Diablo 2 Installer:** [ProjectD2Installer.exe](https://www.projectdiablo2.com/download)

## Step-by-Step Installation

### 1. Install Diablo II Base Game
1. Open Steam and click **Add a Game** (bottom-left) > **Add a Non-Steam Game**.
2. Browse to `~/Downloads/Downloader_Diablo2_enUS.exe` and add it.
3. Right-click the new entry in your library > **Properties**:
   - Under **Compatibility**, check **Force the use of a specific Steam Play compatibility tool** and select **Proton 9.0** (or latest 9.x).
4. Close Properties and click **Play**.
5. The downloader launches—select a temp folder (e.g., `~/Diablo2_Downloaders`) for files. It will download ~2GB and auto-launch the installer.
6. Enter your D2 CD key when prompted. Let it install (default path is fine), then close the launcher.

### 2. Install Lord of Destruction Expansion
7. Right-click the Steam entry > **Properties** > **Shortcut** tab: Change **Target** to `~/Downloads/Downloader_Diablo2_Lord_of_Destruction_enUS.exe`.
8. Click **Play**—repeat the download/install process (temp folder same as before).
9. Enter your LoD CD key. Install complete? Close the launcher.

### 3. Install Project Diablo 2
10. Update **Target** to `~/Downloads/ProjectD2Installer.exe`.
11. Click **Play** to run the installer.
12. **Runtime Error:** You'll see a missing runtime prompt (e.g., `windowsdesktop-runtime-6.0.36-win-x86.exe`). Click **Yes** to download it from Microsoft, then exit the PD2 installer.

13. Update **Target** to the downloaded runtime exe (in `~/Downloads`).
14. Click **Play** to install the runtime. Finish and close.

### 4. Launch PD2
15. Open a terminal in `~` and run:
   ```
   find . -name 'PD2Launcher.exe' 2>/dev/null
   ```
   Note the full path (e.g., `/home/youruser/.local/share/Steam/steamapps/compatdata/.../pfx/drive_c/Program Files (x86)/Diablo II/ProjectD2/PD2Launcher.exe`).

16. In Steam Properties > **Shortcut**:
    - **Target:** `"FULL_PATH_TO_PD2Launcher.exe"` (quotes handle spaces).
    - **Launch Options:** `PROTON_USE_WINED3D=1 %command%`

17. **Optional:** Properties > **Installed Files** > **Browse** for cover art (search "Project Diablo 2" for fan art).
18. Click **Play**! Tweak launcher settings, log in/create account, and ladder up.

## Troubleshooting
- **Installation hangs or Wayland issues:** Add `PROTON_ENABLE_WAYLAND=1 %command%` to Launch Options.
- **Mouse capture weirdness:** Stick to Proton 9.x.
- Full PD2 Wiki FAQ: [wiki.projectdiablo2.com/wiki/Support_FAQ](https://wiki.projectdiablo2.com/wiki/Support_FAQ).

This setup integrates PD2 into Steam for easy launching and updates. Enjoy slaying demons on Omarchy!

*Originally posted for my future self and fellow Omarchy users.*
