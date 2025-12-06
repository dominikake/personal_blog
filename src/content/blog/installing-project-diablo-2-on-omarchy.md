---
title: Installing Project Diablo 2 on Omarchy
date: "2025-12-05"
excerpt: >-
  The struggle was real - multiple failed attempts to install Project Diablo 2
  on Omarchy, but Lutr...
---

# Installing Project Diablo 2 on Omarchy

The struggle was real! I spent what felt like forever trying to install **Project Diablo 2 (PD2)** on my Omarchy system. Multiple failed attempts, weird errors, and lots of frustration later, I finally got it working using Lutris.

Here's the crazy part: Arch Linux and Omarchy aren't even officially supported, and my laptop is basically a potato (a MacBook Air 2017). But Lutris just worked.

## My Installation Nightmare

Let me save you the headache I went through:

1. **First attempt**: Steam/Proton method. Multiple failures, weird errors, lots of frustration.
2. **Second attempt**: Some random YouTube tutorial. Didn't work either.
3. **Final attempt**: Followed the official PD2 FAQ's Lutris guide. **Success!**
4. **X attempts**: I kept uninstalling and and reinstalling.

I should have just kept trying with Lutris from the start instead of wasting time with other solutions.

## What Finally Worked: Lutris

Based on the official [Project Diablo 2 Support FAQ](https://wiki.projectdiablo2.com/wiki/Support_FAQ).

### Prerequisites
- Legitimate *Diablo II* and *LoD* CD keys from [Battle.net](https://account.battle.net/games#classic-game-accounts)
- Lutris installed (`sudo pacman -S lutris` on Arch)
- Download the installers to `~/Downloads`:
  - [Diablo II Downloader](https://us.battle.net/download/getLegacy?os=win&locale=enUS&product=d2dv)
  - [LoD Downloader](https://us.battle.net/download/getLegacy?os=win&locale=enUS&product=d2xdv)  
  - [PD2 Installer](https://www.projectdiablo2.com/download)

### The Installation That Finally Worked

1. Go to the [Project Diablo 2 Lutris page](https://lutris.net/games/project-diablo-2/)
2. Click **Install** for the Wine Battle.net US version
3. Select where you want the wine prefix created
4. Follow the prompts - it downloads and installs everything automatically
5. Enter your CD keys when prompted
6. Let it install .NET 6 and other dependencies
7. Launch and enjoy!

## Victory at Last

After all that frustration, I'm finally ready to slay some demons. The game runs surprisingly well (ignore the fan noise) on my modest hardware, and Lutris makes launching painless.

If you're struggling with PD2 installation on Omarchy or Arch Linux, trust me: keep trying with Lutris. It might just work when you least expect it to.

Time to ladder up!

*For my fellow Omarchy users who refuse to give up on gaming.*