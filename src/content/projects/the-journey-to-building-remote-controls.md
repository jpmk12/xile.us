---
title: "The Journey to Building Remote Controls"
date: 2013-07-14
category: robotics
series: wireless-robot
featured: false
tags: ["journey", "robotics", "arduino", "remote-control", "xbee"]
status: complete
summary: "I recently finished a project that involves an Arduino powered remote control. I learned a lot of things along the way about setup and programming that I\u2026"
cover: "/legacy-uploads/2013/07/Remote-4.jpg"
legacyUrl: "/the-journey-to-building-remote-controls/"
downloads:
  - { label: "Remote Control — Arduino sketch backup", file: "/legacy-uploads/2013/07/Remote-Control-Backup.txt" }
---
<span style="line-height: 1.714285714; font-size: 1rem;">I recently finished a project that involves an Arduino powered remote control. I learned a lot of things along the way about setup and programming that I wanted to share to help others avoid pitfalls.</span>

<a href="/legacy-uploads/2013/07/Remote-4.jpg"><img loading="lazy" decoding="async" class="alignnone size-medium wp-image-15" alt="Xbee Remote 2" src="/legacy-uploads/2013/07/Remote-4-300x225.jpg" width="300" height="225" /></a>
<h1><span style="text-decoration: underline;">Hardware Issues</span></h1>
The Adafruit Xbee breakout board supports directly transmitting analog inputs to a second Xbee receiver. This is great for simple projects, but I was looking for very strict control over the Remote and the Robot. I also had a dream of later using the stick to control an actuator mounted to the robot using the same stick that controls the movement of the robot. This would certainly require a micro-controller on both ends (Or so I thought).

As I look back, I probably didn't even need an Arduino to handle the Remote Control portion as I could have just handled all the interpolation on the robot side. One unforeseen benefit is that I now have a remote that can be used for virtually any remote project I come up with in the future since all the interpolation has already been programmed.
<h1><span style="text-decoration: underline;">Software Issues</span></h1>
The library for handling Xbee transmission is fairly easy to use, but I had some issues on the receiver side. I had two major hangups. The first was being able to read the entire string being passed to the receiver.

It took some time to realize that the string was being transmitted character by character. I initially tried the code below but it did not properly read in the entire string.

<address><code>Receiver Code: </code></address><address>void loop()
{
if (mySerial.available())
{
Serial.println((String)mySerial.read());
}
}</address>I then tried the code below which was able to read the string, but I could not properly parse the whole string.

<address><code>
Receiver Code:
void loop()
{
if (mySerial.available())
{
Serial.write(mySerial.read());
}
}
</code></address>Finally, I came to this version of code. It waits for something in the buffer and then reconstructs the string in a loop one character at a time.

<address>while(mySerial.available())</address><address>{
character = mySerial.read();
content.concat(character);
}
<span style="line-height: 1.714285714; font-size: 1rem;">if (content != "")</span></address><address><span style="line-height: 1.714285714; font-size: 1rem;"> {</span>
content.trim();
Serial.print(content);
}</address>My last major problem was an issue in the way I was originally transmitting control instructions. I was just waiting for input and then transmitting the input over and over which caused a buffer overload on the receiving side. My code would send the Forward command over and over resulting in the backing up of the receiving buffer. When I then transmitted a stop command, it would often get lost in the flood off control commands.

I remedied this situation by transmitting the control instruction only once and setting a "last sent" flag to check if the command was the same or not. This stopped the flood and only transmitted an instruction via Xbee when it was different that before. This technique can be viewed in the completed code for the<a href="/projects/arduino-powered-remote-control-robot/"> Arduino Powered Remote Control Robot project.</a>
<h1>Summary</h1>
Every project should come with a healthy bit of learning along the way. I learned much more about the hardware and how much of a difference a slight change in code implementation can make to address limitations in the hardware.

Another major learning point of this project was the importance of version control along the way for the purposes of learning. I have always been a back-up advocate, but the evolution of the code is always extremely important. It shows you where you were and where you have come too. Sometimes, it is nothing but a testament to how far you have come, but sometimes it is a road map to help others learn.

Cheers,

<span style="line-height: 1.714285714; font-size: 1rem;">Justin</span>

&nbsp;
