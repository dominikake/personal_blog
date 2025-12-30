---
title: Transferring Photos from iPhone to Omarchy via USB Cable
date: "2025-12-30"
excerpt: Using a USB cable to transfer photos from iPhone to Omarchy system.
---

## Transferring Photos from iPhone to Omarchy via USB Cable

Using a USB cable is reliable and fast.

Install these packages (using your preferred package installer):

- libimobiledevice
- ifuse
- usbmuxd

For easier graphical access in your file manager, also install:

- gvfs-afc

## Steps

- Connect your iPhone to your Omarchy machine with a USB cable.
- Unlock your iPhone and tap "Trust" when it asks if you trust this computer.
- Mount the iPhone:

- Create a folder to mount it:

    `mkdir ~/iPhone`

- Mount the device:

    `ifuse ~/iPhone`

Open the mounted folder. Your photos are usually in: `~/iPhone/DCIM/100APPLE/`

> There may be other folders like 101APPLE, etc.

- Copy the photos using your file manager or the `cp` command.
- When finished, unmount the iPhone:

`fusermount -u ~/iPhone`

This method gives direct access to your camera roll photos and videos.

It works well for Omarchy users who want a simple, no-wireless solution.
