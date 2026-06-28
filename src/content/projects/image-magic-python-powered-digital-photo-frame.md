---
title: "Image Magic: Python Powered Digital Photo Frame On Raspberry Pi"
date: 2017-02-18
tags: ["code", "python", "programming", "raspberry-pi", "photo-slideshow", "digital-photo-frame"]
status: complete
summary: "I was looking for a quick way to scan every photo on my media server, and display them one at a time in a photo slideshow. I wanted a python program to\u2026"
legacyUrl: "/image-magic-python-powered-digital-photo-frame/"
---
I was looking for a quick way to scan every photo on my media server, and display them one at a time in a photo slideshow. I wanted a python program to power my digital photo frame using a raspberry pi.

My hardware setup is a file share that is mapped from a Raspberry Pi. The software piece is a simple python script running from my CGI-Bin. The code is pasted below. It is a quick hack that I plan to optimize later, but I hope it helps you if you are in need of a solution.


```
#! /usr/bin/python
print "Content-type: text/html\n\n";
#DOCTYPE keeps inducing an error violating the CSS so it is commented out for now
#print("""<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
#       "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">""")

import time
import os
from random import randint

photo_list = [] #List of all photo paths traversed by OS.WALK
display_list = [] #List of photos to be displayed (Currently only using one photo at a time)

for root, dirs, files in os.walk("/mnt/storage/Pictures/Universal_Trip_2017/"): #Traverse from the listed root directory
        for file in files:
                if file.endswith(".png") or file.endswith(".jpeg") or file.endswith(".jpg") or file.endswith(".JPG"): #The file types to add to the photo_list
#                       print(os.path.join(root, file)) #Debug for path checking
                        photo_list.append(os.path.join(root, file)) #Add the current path+photo to display_list
count = 0
while count < 1:
        random_pic = randint(0,len(photo_list)-1)
        display_list.append(photo_list[random_pic])
        count = count + 1

#HTML code ot generate the webpage (Edit as needed)
print("<html>")
print("<head>")
print("<title>Xile Image Magic</title>")
print('<link rel="stylesheet" type="text/css" href="../im_style.css" />')
print('<meta http-equiv="refresh" content="5" />')
print("</head>")
print("<body>")

#Print all images added to the display_list
for photo_path in display_list:
#       print(photo_path[21:])  #Debug
        print("<div class=\"main\">")
        print("<img src=\"" + "/image_magic/" + photo_path[21:] + "\" alt=\"\" />")
        print("</div>")

#Optional Statement for printing the path of the current displayed photo
print("<h5>" + display_list[0] + "</h5>")



print("</body>")
print("</html>")
```


<div></div>
<div>I created some CSS to make the displayed page a little easier on the eyes.</div>
<div></div>


```
body
{
background-color: #123552;
}img
{
margin: 2px;
border: 1px solid #ccc;
border-radius: 8px;
display: block;
margin: auto;
margin-bottom: 2px;
height: 85%;
width: auto;
}div.main img
{
margin: 2px;
border: 1px solid #ccc;
border-radius: 8px;
display: block;
margin: auto;
margin-bottom: 2px;
height: 85%;
width: auto;
}h5, h6
{
display: block;
margin: auto;
border: 1px solid #ccc;
text-align: center;
background-color: #496C89;
color: white;
width:50%;
}
```


<div></div>
<div></div>
<div>Also, because I am using a NAS, I had to edit my Apache Server to allow me to use an alias to access the server. The snippet from my Apache2 conf is pasted below.</div>
<div></div>


```
Edit: /etc/apache2/sites-available/000-default.conf

Alias /image_magic/ /your/mount/point/
<Directory "/mnt/storage/Pictures/">
Options Indexes FollowSymLinks MultiViews
AllowOverride All
#Order allow,deny
#Allow from all
Require all granted
</Directory>
```


<div> I hope you find this helpful in your attempt to make your own live photo display.</div>
<div></div>
&nbsp;
