---
templateKey: article-page
title: Migrating From WebStorm to VS Code
slug: migrating-from-webstorm-to-vscode
author: Vaibhav Sharma
authorLink: https://twitter.com/waybove
date: 2023-07-16T17:53:35.626Z
cover: /img/artem-sapegin-webstorm-vscode.jpg
metaTitle: Migrating from WebStorm to VS Code
metaDescription: A guide to my journey of migrating from WebStorm to VS Code, so
  that I can be one of the cool kids too.
tags:
  - lifestyle
  - typescript
  - developer
  - react js
---
As we all know, all the cool devs have to have a few things - No Social Life, VS Code and a crippling coffee addiction. I figured, the only thing left for me to become a cool dev myself was to use VS Code. But let's take a step back and talk about why I hadn't jumped on the VS Code train...yet!

## Why I use WebStorm(and other JetBrains IDEs)

Back in my uni days, as a fresh-faced coder diving into Android development, I was stuck with Eclipse - and let's just say it was a total mess. But then, like a shining beacon, Android Studio came along and saved the day. That was my first taste of JetBrains IDEs, and man, was I hooked! As I ventured into Python, PyCharm became my go-to. The best part? My college email ID got me free access to all their products - score! So when it was time to tackle React, I naturally landed on WebStorm, and it's been my ride-or-die ever since.

## What I like about WebStorm(and other JetBrains IDEs)

Let me tell you, the code completion, auto import, and code refactoring in WebStorm straight up unmatched! The auto format feature (`⌘ + ⌥ + L`) and the import optimization (`^ + ⌥ + O`) are gifts from the coding gods! Every time I fired up the IDE, it showered me with useful tips and best practices, making me a better coder by the day. Learning new stuff, whether it's React or TypeScript, felt like a breeze. And Git? Oh boy, WebStorm made it feel like child's play. No wonder I never looked at other editors like Atom or VS Code when they launched - if it ain't broke, don't fix it, right?

## \## Why I Decided to Give VS Code a Shot

Recently my M2 MacBook Air's screen started to show horizontal lines(seems like they haven't fixed the display hinge issues plaguing the MacBooks since 2016), fortunately it was fixed under warranty, but unfortunately it meant that I had no (properly working) machine for a week, so I had to borrow my brother's gaming laptop to work. And since I didn't want to install too much gunk on my brother's laptop I decided to keep things light and installed just the basics - Docker, Node JS, and VS Code. The project I was working on was built with Next JS App Router, which is currently notoriously plagued by memory leak issues, but surprisingly, VS Code handled it like a champ. It didn't hog my RAM like WebStorm did on my MacBook! That, along with the cool factor 😝 made me consider *trying* to switch to VS Code for good. So when I got my laptop back I thought that I had long pushed cleaning up my blog's Gatsby code might as well start with it. And not just that, me being the "Gryffindor" I am, decided I'd taken on a lot of challenges at once, with this project - learning VS Code, Tailwind CSS and trying to switch my Gatsby code to TypeScript(while being fully aware, that a lot of the plugins I use, aren't typesafe). *Spoiler Alert: It was tough, but it all worked out.*

## The Roadblocks I Faced

The first big problem was of course keybindings, which was expected as I had been using WebStorm for a decade, and the unreliable code completion, lack of advance refactoring, auto formatting, snippets were also huge hurdles. And the Git while usable was definitely not as intuitive as that of WebStorm. But the biggest problem was debugging with `launch.json`. Let me explain, WebStorm has a way of detecting npm scripts, chaining them, choice of using yarn or npm. Whereas the auto configuration of VS Code was severely lacking, and I really didn’t wanna learn what seemed like a substantial set of commands to write `launch.json`. What’s worse is that when I generate `launch.json` it says learn about the command with IntelliCode but the problem with IntelliCode is that it doesn’t always trigger for some reason.

## How I Tackled the Challenges

TL;DR: Extensions, lots of extensions...
The first big hurdle, keybindings, was easy to over come, there’s an extension for it, IntelliJ IDEA Keybindings. Actually most hurdles were easy to overcome using extensions, almost every problem I could think of had an extension that solved it(mostly) -IntelliCode, Auto Rename Tags, JS Codeformer, ES7+ React/Redux/React-Native snippets etc Adding the keybindings along with ESLint, Prettier, made auto format accessible. And Git Lens enhanced the Git support and made it relatively powerful.

### Debugging with `launch.json`

This was still a problem, with no automatic solution that I could find apart using google to find launch.json written by other people. Basically the frameworks I use in WebStorm the most are Vite, Next JS and Gatsby. Here are the launch.json and (tasks.json) files that I found and modified to make it work for me.

#### Next JS

`launch.json`

```jsonc
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Dev",
            "type": "node",
            "request": "launch",
            "runtimeExecutable": "yarn",
            "runtimeArgs": [
                "run",
                "dev"
            ],
            "cwd": "${workspaceFolder}",
            "serverReadyAction": {
                "pattern": "🚀 started server on .+, url: (https?://.+)",
                "uriFormat": "%s",
                "action": "debugWithChrome"
            },
            "preLaunchTask": "devTasks"
        },
        {
            "name": "Build",
            "type": "node",
            "request": "launch",
            "runtimeExecutable": "yarn",
            "runtimeArgs": [
                "run",
                "build"
            ],
            "cwd": "${workspaceFolder}",
            "preLaunchTask": "devTasks"
        },
        {
            "name": "Start",
            "type": "node",
            "request": "launch",
            "runtimeExecutable": "yarn",
            "runtimeArgs": [
                "run",
                "start"
            ],
            "cwd": "${workspaceFolder}",
            "serverReadyAction": {
                "pattern": "🚀 started server on .+, url: (https?://.+)",
                "uriFormat": "%s",
                "action": "debugWithChrome"
            },
            "preLaunchTask": "startTasks"
        },
    ],
}
```

`tasks.json`

```json
{
	"version": "2.0.0",
	"tasks": [
		{
			"label": "clean",
			"type": "shell",
			"command": "yarn run clean",
			"group": {
				"kind": "build",
				"isDefault": true
			}
		},
		{
			"label": "lint",
			"type": "shell",
			"command": "yarn run lint",
			"group": {
				"kind": "build",
				"isDefault": true
			}
		},
		{
			"label": "build",
			"type": "shell",
			"command": "yarn run build",
			"group": {
				"kind": "build",
				"isDefault": true
			}
		},
		{
			"label": "devTasks",
			"dependsOrder": "sequence",
			"dependsOn": [
				"clean",
				"lint"
			],
			"group": {
				"kind": "build",
				"isDefault": true
			}
		},
		{
			"label": "startTasks",
			"dependsOrder": "sequence",
			"dependsOn": [
				"clean",
				"lint",
				"build"
			],
			"group": {
				"kind": "build",
				"isDefault": true
			}
		},
	]
}
```

#### Gatsby JS

`launch.json`

```jsonc
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Gatsby Develop",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/node_modules/.bin/gatsby",
            "args": [
                "develop"
            ],
            "env": {
                "PARCEL_WORKERS": "0",
                "GATSBY_CPU_COUNT": "1",
            },
            "runtimeArgs": [
                "--nolazy"
            ],
            "console": "integratedTerminal"
        },
        {
            "name": "Gatsby Build",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/node_modules/.bin/gatsby",
            "args": [
                "build"
            ],
            "env": {
                "PARCEL_WORKERS": "0",
                "GATSBY_CPU_COUNT": "1",
            },
            "runtimeArgs": [
                "--nolazy"
            ],
            "console": "integratedTerminal",
        },
        {
            "name": "Gatsby Serve",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/node_modules/.bin/gatsby",
            "args": [
                "build"
            ],
            "env": {
                "PARCEL_WORKERS": "0",
                "GATSBY_CPU_COUNT": "1",
            },
            "runtimeArgs": [
                "--nolazy"
            ],
            "console": "integratedTerminal",
            "preLaunchTask": "clean",
            "postDebugTask": "serve"
        },
    ]
}
```

`tasks.json`

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "clean",
            "type": "shell",
            "command": "yarn run clean",
            "group": {
                "kind": "build",
                "isDefault": true
            }
        },
        {
            "label": "lint",
            "type": "shell",
            "command": "yarn run lint",
            "group": {
                "kind": "build",
                "isDefault": true
            }
        },
        {
            "label": "serve",
            "type": "shell",
            "command": "yarn run serve",
            "group": {
                "kind": "build",
                "isDefault": true
            }
        },
    ]
}
```

#### Vite

`launch.json`

```

```

`tasks.json`

```

```

## Final Verdict

### Was it worth it?

I mean yeah, I do like the lightness and extensibility of VS Code, there are something’s that I still miss, but that’s mostly because of habit rather than lack of features.  Though I have yet to find out how versatile it is, because I’m yet to do a Neural Network/ML project with this, I wonder if it’ll replace my PyCharm.

### Will I stay

Looks like it, I mean the only other option was to use JetBrains Fleet, but if I had to use a light, extensible code editor, it didn’t seem right that I’d abandon a free, battle tested code editor over a new paid candidate that did the similar things but didn’t have as much community support. Though launch.json still bothers me.

## Bonus: More Extensions that I Use