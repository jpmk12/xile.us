---
title: "Building A Quadcopter"
date: 2013-11-11
category: flying
featured: true
tags: ["flying", "quadcopter", "multirotor", "rc", "arduino", "build-log"]
status: complete
summary: "I have been working on building a custom Quad Copter with parts ordered from Hobby King. Materials List: TURNIGY Plush 25amp Speed Controller (4) D2822/14\u2026"
cover: "/legacy-uploads/2013/11/quad.jpg"
legacyUrl: "/building-a-quadcopter/"
specs:
  - { label: "Frame", value: "Hobbyking X550 Glass Fiber · 550mm" }
  - { label: "Configuration", value: "Quad (X)" }
  - { label: "Motors", value: "4 × D2822/14 1450kv" }
  - { label: "ESCs", value: "4 × Turnigy Plush 25A" }
  - { label: "Flight controller", value: "Hobbyking KK2.0" }
  - { label: "Radio", value: "Turnigy 9X · Mode 2" }
bom:
  - { part: "Hobbyking X550 Glass Fiber Quadcopter Frame 550mm", qty: "1", link: "http://www.hobbyking.com/hobbyking/store/uh_viewItem.asp?idProduct=24151" }
  - { part: "D2822/14 Brushless Outrunner 1450kv", qty: "4", link: "http://www.hobbyking.com/hobbyking/store/uh_viewItem.asp?idProduct=12916" }
  - { part: "TURNIGY Plush 25amp Speed Controller", qty: "4", link: "http://www.hobbyking.com/hobbyking/store/uh_viewItem.asp?idProduct=2163" }
  - { part: "Hobbyking KK2.0 Multi-rotor LCD Flight Control Board", qty: "1", link: "http://www.hobbyking.com/hobbyking/store/uh_viewItem.asp?idProduct=24723" }
  - { part: "Hobby King Quadcopter Power Distribution Board", qty: "1", link: "http://www.hobbyking.com/hobbyking/store/uh_viewItem.asp?idProduct=23140" }
  - { part: "Turnigy 9X 9Ch Transmitter w/ 8ch Receiver (Mode 2, v2)", qty: "1", link: "http://www.hobbyking.com/hobbyking/store/uh_viewItem.asp?idProduct=8992" }
---
I have been working on building a custom Quad Copter with parts ordered from Hobby King.
<h1><a href="/legacy-uploads/2013/11/quad.jpg"><img class="alignnone size-medium wp-image-76" alt="quad" src="/legacy-uploads/2013/11/quad-300x225.jpg" width="300" height="225" /></a> <a href="http://iframewidth=560height=315src=//www.youtube.com/embed/RBycGP0VwaAframeborder=0allowfullscreen/iframe"><iframe src="https://www.youtube.com/embed/RBycGP0VwaA" height="315" width="560" allowfullscreen="" frameborder="0"></iframe></a><a href="http://www.youtube.com/watch?v=RBycGP0VwaA">
</a></h1>
<h1>Materials List:</h1>
<ul>
	<li><a href="http://www.hobbyking.com/hobbyking/store/uh_viewItem.asp?idProduct=2163">TURNIGY Plush 25amp Speed Controller</a> (4)</li>
	<li><a href="http://www.hobbyking.com/hobbyking/store/uh_viewItem.asp?idProduct=12916">D2822/14 Brushless Outrunner 1450kv</a> (4)</li>
	<li><a href="http://www.hobbyking.com/hobbyking/store/uh_viewItem.asp?idProduct=24723">Hobbyking KK2.0 Multi-rotor LCD Flight Control Board</a></li>
	<li><a href="http://www.hobbyking.com/hobbyking/store/uh_viewItem.asp?idProduct=8992">Turnigy 9X 9Ch Transmitter w/ Module &amp; 8ch Receiver (Mode 2) (v2 Firmware)</a></li>
	<li><a href="http://www.hobbyking.com/hobbyking/store/uh_viewItem.asp?idProduct=23140">Hobby King Quadcopter Power Distribution Board</a></li>
	<li><a href="http://www.hobbyking.com/hobbyking/store/uh_viewItem.asp?idProduct=24151">Hobbyking X550 Glass Fiber Quadcopter Frame 550mm</a></li>
</ul>
&nbsp;
<h1>Wiring The Remote</h1>
The list below is the current way I have the remote wired to the flight controller.
<ul>
	<li>AIL - CH1</li>
	<li>ELE - CH2</li>
	<li>THR - CH3</li>
	<li>RUD - CH4</li>
	<li>AUX -  CH6</li>
</ul>
<a href="/legacy-uploads/2013/11/WIRELESS-RECEIVER.jpg"><img class="alignnone size-medium wp-image-78" alt="WIRELESS RECEIVER" src="/legacy-uploads/2013/11/WIRELESS-RECEIVER-300x225.jpg" width="300" height="225" /></a> <a href="/legacy-uploads/2013/11/receiver-wireing.jpg"><img class="alignnone size-medium wp-image-79" alt="receiver wireing" src="/legacy-uploads/2013/11/receiver-wireing-300x225.jpg" width="300" height="225" /></a>

&nbsp;
<h1>Wiring the Quad</h1>
<a href="/legacy-uploads/2013/11/speed-controller.jpg"><img class="alignnone size-medium wp-image-80" alt="speed controller" src="/legacy-uploads/2013/11/speed-controller-300x225.jpg" width="300" height="225" /></a>

&nbsp;
<h1>Remote Configuration</h1>
The picture below is how I have the remote configured.

<a href="/legacy-uploads/2013/11/remote.jpg"><img class="alignnone size-medium wp-image-77" alt="remote" src="/legacy-uploads/2013/11/remote-300x225.jpg" width="300" height="225" /></a> <a href="/legacy-uploads/2013/11/kk2.jpg"><img class="alignnone size-medium wp-image-82" alt="KK2 Trim Setting" src="/legacy-uploads/2013/11/kk2-300x275.jpg" width="300" height="275" /></a>
