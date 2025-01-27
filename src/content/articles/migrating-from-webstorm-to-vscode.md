---
title: Migrating From WebStorm to VS Code
description: Join my journey as I switch from WebStorm to VS Code! Discover the
  reasons behind the switch, how I overcame challenges, and embraced VS Code's
  lightness and extensibility.
pubDate: 2023-07-24T12:30:00.000Z
slug: migrating-from-webstorm-to-vscode
author: vaibhav-sharma
cover: src/assets/media/juanjo-jaramillo-vscode-webstorm.jpg
tags:
  - development
  - typescript
  - react js
---
As we all know, all the cool devs have to have a few things - No Social Life, VS Code and crippling coffee addiction. I figured the only thing left for me to become a cool dev like rest of you guys, was to use VS Code. But let's take a step back and talk about why I hadn't jumped on the VS Code train...yet!

## Why I use WebStorm(and other JetBrains IDEs)

Back in my uni days, as a fresh-faced coder diving into Android development, I was stuck with Eclipse - and let's just say it was a total mess. But then, like a shining beacon, Android Studio came along and saved the day. That was my first taste of JetBrains IDEs, and man, was I hooked! As I ventured into Python, PyCharm became my go-to. The best part? My college email ID got me free access to all their products - score! So when it was time to tackle React, I naturally landed on WebStorm, and it's been my ride-or-die ever since.

## What I like about WebStorm(and other JetBrains IDEs)

Let me tell you, the code completion, auto import, and code refactoring in WebStorm are straight-up unmatched! The auto-format feature (`⌘ + ⌥ + L`) and the import optimization (`^ + ⌥ + O`) are gifts from the coding gods! Every time I fired up the IDE, it showered me with useful tips and best practices, making me a better coder by the day. Learning new stuff, whether it's React or TypeScript, felt like a breeze. And Git? Oh boy, WebStorm made it feel like child's play. No wonder I never looked at other editors like `Atom` or `VS Code` when they launched - if it ain't broke, don't fix it, right?

## Why I Decided to Give VS Code a Shot

Recently my M2 MacBook Air's screen started to show horizontal lines(seems like they haven't fixed the display hinge issues plaguing the MacBooks since 2016), fortunately, it was fixed under warranty, but unfortunately, it meant that I had no (properly working) machine for a week, so I had to borrow my brother's gaming laptop to work. And since I didn't want to install too much gunk on my brother's laptop I decided to keep things light and installed just the basics - Docker, Node JS, and VS Code. Surprisingly, even with resource-intensive projects like Docker and  Next JS, VS Code's memory usage was significantly lower than WebStorm's. This, combined with the allure of trying something new, sparked my interest in making the switch. Armed with the Gryffindor spirit, I embarked on the journey of learning VS Code, integrating Tailwind CSS, and transitioning my Gatsby code to TypeScript, embracing challenges head-on.

## The Roadblocks I Faced

The first big problem was of course keybindings, which was expected as I had been using WebStorm for almost a decade, and the unreliable code completion, lack of advanced refactoring, auto-formatting, and snippets were also huge hurdles. And let's not forget Git support - decent, but not as smooth as WebStorm's. But the biggest problem was debugging with `launch.json`. Let me explain, WebStorm has a way of detecting `npm` scripts, chaining them, choice of using `yarn` or `npm`. Whereas the auto-configuration of VS Code was severely lacking, and I really didn’t wanna learn what seemed like a substantial set of commands to write `launch.json`. What’s worse is that when I generate `launch.json` the comments say to learn about the command with `IntelliCode` but the problem with `IntelliCode` is that it doesn’t always trigger for some reason.

## How I Tackled the Challenges

TL;DR: Extensions, lots of extensions... 

![guns-lots-of-guns](https://media.giphy.com/media/ZUVPTMpehuqkH8HH2h/giphy.gif "Guns, Lots of Guns")


The first big hurdle, keybindings, was easy to overcome, there’s an extension for it, IntelliJ IDEA Keybindings. Actually, most hurdles were easy to overcome using extensions, almost every problem I could think of had an extension that solved it(mostly) -`IntelliCode`, `Auto Rename Tags`, `JS Codeformer, ES7+ React/Redux/React-Native snippets` etc Adding the keybindings along with `ESLint`, `Prettier`, made auto format accessible. And Git Lens enhanced the Git support and made it relatively powerful.

### Debugging with `launch.json`

Okay, I won't lie - no magical auto-configuration here. But the community had my back! Shoutout to fellow devs who shared their launch.json setups for Vite, Next JS, and Gatsby. With a little tweaking, I was back on track.

#### Next JS

`launch.json`

```json
{
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

```json
{
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

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Develop",
            "type": "node",
            "request": "launch",
            "runtimeExecutable": "yarn",
            "runtimeArgs": [
                "run",
                "dev"
            ],
            "cwd": "${workspaceFolder}",
            "console": "integratedTerminal",
            "sourceMaps": true,
            "outFiles": [
                "${workspaceFolder}/dist/**/*.js"
            ],
            "smartStep": true,
            "skipFiles": [
                "${workspaceFolder}/node_modules/**/*.js",
                "<node_internals>/**/*.js"
            ]
        },
        {
            "name": "Build",
            "type": "node",
            "request": "launch",
            "runtimeExecutable": "node",
            "runtimeArgs": [
                "${workspaceFolder}/node_modules/vite/bin/vite.js",
                "build",
                "--mode",
                "development"
            ],
            "cwd": "${workspaceFolder}",
            "console": "integratedTerminal",
            "sourceMaps": true,
            "outFiles": [
                "${workspaceFolder}/dist/**/*.js"
            ],
            "smartStep": true,
            "skipFiles": [
                "${workspaceFolder}/node_modules/**/*.js",
                "<node_internals>/**/*.js"
            ]
        }
    ]
}
```

## Final Verdict

### Was it worth it?

The transition to VS Code has been rewarding. I appreciate its lightness and extensibility, and though I occasionally miss WebStorm's features out of habit, I don't find myself lacking. As for neural networks and ML projects, I'm yet to explore VS Code's capabilities fully and see if it can replace my beloved PyCharm.

### Will I stay

Indeed, I plan to stick with VS Code. While JetBrains Fleet was an option, the free, battle-tested, and well-supported VS Code was a more natural fit for my needs. Although `launch.json` remains a concern, the overall experience has been positive, making the switch well worth it.
