---
title: "exFat on Devant TV: filesystem FAT32"
date: "2025-11-29"
excerpt: "How easy would it be to just copy a movie to a USB stick and plug it in to the TV."
---

# exFat on Devant TV: filesystem FAT32

The obligatory holiday watch - "Home Alone". The USB stick wasn't showing up at all because it was still formatted as exFAT. I even format the USB 3 times. Maybe it's the filesystem..FAT32 or NTFS..I think. Devant apparently like most TVs only reliably reads FAT32.

Quick terminal fix:

```bash
sudo pacman -Syu dosfstools
sudo wipefs -a /dev/sdc
sudo parted /dev/sdc --script mklabel msdos
sudo parted /dev/sdc --script primary fat32 1MiB 100%
sudo mkfs.vfat -F 32 -n MOVIES /dev/sdc1
```

Plugged it back in, movie appeared instantly!