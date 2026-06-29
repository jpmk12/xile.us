---
title: "Python Image Rotation Correction Script (EXFS Data Editing)"
date: 2017-02-19
category: code
featured: false
tags: ["portfolio", "code", "exfs", "python", "pexif", "pil", "digital-photo-frame", "programming", "image-rotation"]
status: complete
summary: "This script is written in python to perform EXFS corrections of digital photos. This script traverses the specified directory, stores all images, then\u2026"
legacyUrl: "/python-image-rotation-correction-script-exfs-data-editing/"
---
This script is written in python to perform EXFS corrections of digital photos. This script traverses the specified directory, stores all images, then performs the required transform to make the images display correctly.


```
#! /usr/bin/python
import time
import os
from random import randint
import pexif
from PIL import Image, ExifTags

photo_list = [] #List of all photo paths traversed by OS.WALK

for root, dirs, files in os.walk("/yourpath/"):
        for file in files:
                if file.endswith(".png") or file.endswith(".jpeg") or file.endswith(".jpg") $
#                       print(os.path.join(root, file)) #Debug for path checking
                        photo_list.append(os.path.join(root, file)) #Add the current path+ph$

for photo in photo_list:
        #print("Try this: " + photo)
        img = pexif.JpegFile.fromFile(photo)
        #print(photo + "<- Path Orient ->   " + str(img.exif.primary.Orientation[0]))

        try:
                image=Image.open(photo)
                for orientation in ExifTags.TAGS.keys():
                        if ExifTags.TAGS[orientation]=='Orientation':
                                break
                exif=dict(image._getexif().items())

                if exif[orientation] == 3:
                        image=image.rotate(180, expand=True)
                elif exif[orientation] == 6:
                        image=image.rotate(270, expand=True)
                elif exif[orientation] == 8:
                        image=image.rotate(90, expand=True)
                image.save(photo)
                image.close()

        except (AttributeError, KeyError, IndexError):
        # cases: image don't have getexif
                print("broke")
```
