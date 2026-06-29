---
title: "Python Cheat Sheet - Working With Lists"
date: 2017-01-19
category: code
featured: false
tags: ["code", "coding", "programming", "python"]
status: complete
summary: "Working with Lists: A quick description of different operations that can be performed on a python list #Declare a list with 2 initial values computers =\u2026"
legacyUrl: "/python-cheat-sheet-working-lists/"
---
Working with Lists: A quick description of different operations that can be performed on a python list
<pre>#Declare a list with 2 initial values
computers = ["ibm", "apple"]

#2 Different ways to add items to my existing list
computers.append ("dell")
computers.insert(0, "gateway")

print("\nA complete list of computers I have worked on")
print(computers)

#Sorted prints the list without changing it, sort modifys the list
print("\nA sorted list of computers I have worked on")
print(sorted(computers))
computers.sort()

print(computers)
print("")

#A loop to print each item in title case
 for computer in computers:
      print(computer.title())

computers.pop()
computers.remove("gateway")
print(computers)

#Slicing
print(computers[0:1])

#Print Last
print(computers[-1])</pre>
&nbsp;
