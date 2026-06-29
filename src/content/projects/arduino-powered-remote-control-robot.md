---
title: "Arduino Powered Remote Control Robot"
date: 2013-07-09
category: robotics
series: wireless-robot
featured: false
tags: ["robotics", "portfolio", "arduino", "wireless-robot"]
status: complete
summary: "I have been working on a Arduino Powered Robot that could be remote controlled. (I will continue to update this with more detail). The video below shows the\u2026"
cover: "/legacy-uploads/2013/07/Remote-4.jpg"
legacyUrl: "/arduino-powered-remote-control-robot/"
downloads:
  - { label: "Remote Robot — Arduino sketch", file: "/legacy-uploads/2013/07/Remote-Robot.txt" }
---
I have been working on a Arduino Powered Robot that could be remote controlled. (I will continue to update this with more detail). The video below shows the prototype robot working via the remote control. This article will describe how I built the Robot, the materials used, and the program that controls it.

<iframe src="https://www.youtube.com/embed/lSXZGM0ZQ9g" height="315" width="560" allowfullscreen="" frameborder="0"></iframe>
<h1>Materials List</h1>
This project was completed with materials ordered entirely from <a title="Adafruit.com" href="http://www.adafruit.com" target="_blank">Adafruit.com</a>. If your not familiar with them, check out their excellent tutorials and supplies for makers.
<ul>
	<li><a href="http://www.adafruit.com/products/1114" target="_blank"><span style="line-height: 14px;">Open Beam Kit and 4 Servo Mounts</span></a></li>
	<li><a href="http://www.adafruit.com/products/68" target="_blank">Arduino with breadboard and plastic mounting plate</a></li>
	<li><a href="http://www.adafruit.com/products/72" target="_blank">BoArduino with breadboard and FTDI Cable</a></li>
	<li><a href="http://www.adafruit.com/products/964" target="_blank">2 Xbee Radios</a> with <a href="http://www.adafruit.com/products/126" target="_blank">Development board</a></li>
	<li><a href="http://www.adafruit.com/products/154" target="_blank">4 Continuous Motion Servos</a></li>
	<li><a href="http://www.adafruit.com/products/167" target="_blank">4 Servo Wheels</a></li>
	<li><a href="http://www.adafruit.com/products/512" target="_blank">Joystick with BreakOut Board</a></li>
	<li>Servo Extension Cables and Breadboard Wires</li>
	<li><a href="http://www.adafruit.com/products/67">1 9 Volt Battery Pack</a> and <a href="http://www.adafruit.com/products/248">1 Double A Battery Pack</a></li>
</ul>
&nbsp;
<h1>The Remote Control</h1>
The remote is a BoArduino <span style="line-height: 1.714285714; font-size: 1rem;">from Adafruit attached to a clear breadboard with an Analog Control Knob and a Xbee Series 1 transmitter. The wiring is pretty Simple for the remote. The control knob is wired to the analog pins on the BoArduino along with a +5V and a Ground wire. The Xbee is wired from the RX and TX pins to the Digital 3 and Digital 2 pins respectively along with a +5 and a ground wire. Some of the extra black wires in the picture hold my breadboard wires in place so they don't pull loose and are not needed.</span>

<a style="font-size: 1rem; color: #0f3647;" href="/legacy-uploads/2013/07/Remote-4.jpg"><img class="alignnone size-medium wp-image-15" alt="Xbee Remote 2" src="/legacy-uploads/2013/07/Remote-4-300x225.jpg" width="300" height="225" /></a>    <img class="alignnone size-medium wp-image-14" style="font-size: 1rem; line-height: 1;" alt="Xbee Remote" src="/legacy-uploads/2013/07/Remote-3-300x225.jpg" width="300" height="225" />

The Sketch below is the code for the remote. Feel free to download and modify it. Suggestions for improvement are also welcome.

<a href="/legacy-uploads/2013/07/Remote-Control-Backup.txt">Remote Control Sketch</a>

&nbsp;
<h1><span style="text-decoration: underline;">The Wireless Robot</span></h1>
The robot is Arduino powered and Xbee controlled. A program waits for Xbee transmitted commands and then determines which of four continuous motion servos to actuate. The frame is composed of components from an Open Beam kit. The nice thing about Open Beam is that the plastic Arduino mounting plate slides into the sides of each beam. This creates a secure and easy electronics mount. Just place a beam of the appropriate length on each side and secure in place with the Open Beam corner brackets.

<a href="/legacy-uploads/2013/07/Robot_Front.jpg"><img class="alignnone size-medium wp-image-17" alt="Robot_Front" src="/legacy-uploads/2013/07/Robot_Front-300x225.jpg" width="300" height="225" /></a> <a href="/legacy-uploads/2013/07/Robot_Rear.jpg"><img class="alignnone size-medium wp-image-16" alt="Robot_Rear" src="/legacy-uploads/2013/07/Robot_Rear-300x225.jpg" width="300" height="225" /></a>

The picture below shows how everything is connected. The program expects the left side servos to be connected to Pin 4 and the right side servos to be connected to Pin 8. In the picture below, you can see that both servos on the left share the same +5v, ground, and control wire as do the servos of the right. Digital Pins 2 and 3 are connected to the Xbee pins to the TX and RX pins respectively.

<a href="/legacy-uploads/2013/07/Robot_Top.jpg"><img class="alignnone size-medium wp-image-18" alt="Robot_Top" src="/legacy-uploads/2013/07/Robot_Top-300x225.jpg" width="300" height="225" /></a>

The sketch below contains the program to control the robot via wireless commands received from the remote.

<a href="/legacy-uploads/2013/07/Remote-Robot.txt">Remote Robot Sketch</a>

This is a work in progress. It was a fun little project and it is quite rewarding to create a remote controlled robot. I plan to add a remote control arm for simple tasks. What would you add to the robot? Thanks for reading. Good Luck building!

- Justin
