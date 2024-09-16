# Legends - Character Sheet App

A responsive web app to act as a character sheet for the Legends TTRPG.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Screenshots](#screenshots)
- [License](#license)

## Installation

To get started with this project, follow these steps:

You'll need a local server running, or to put the code on a remote server.

For remote saving you will have to add your own firebase configs to `./src/config/firebase.js`  and rebuild the app.

## Local Server

**If you aren't doing development**, an easy way to get a server running is via `http-server`. Assuming you have npm installed you can: `npm i -g http-server`. Then from the repository of this app you can run `http-server ./dist/ -a localhost` and you should then be able to see/run the app at `http://localhost:8080` in your browser.

**If you are doing development**, then you you can `npm install` in the repo and `npm run start` to start the esbuild dev server/build. By default that will run the app at `http://localhost:8080`

### Server

* Point your server at the repo so it opens `./dist/index.html`. That's about it...

If you want to take advantage of the offline mode, it's a little more complicated:
* you'll need to use a HTTPS connection (Let's Encrypt is fairly easy to set-up to get a free SSL cert)
* You'll want to set the main server directory to the `dist` directory of the code, that way the server won't serve any of the other files.
* Make sure files are set to not cache (the service worker will handle that). In nginx I added the following to my server block:
```
    index   index.html;
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;

    location / {
        expires -1;
    }
```

## Usage

Once the development server is running, you can view the app on your iOS or Android device using the Expo Go app. Simply scan the QR code provided in the Expo CLI or web interface.

## Features

- Display the character sheet
- Allow users to create a character
- Dice rolling with multiple options available
- Responsive design that works on both iOS and Android devices

## Screenshots

<!-- ![Home Screen](path/to/screenshot1.png) -->
<!-- Soon... -->

## License

This project is licensed under the Proprietary License. By accessing or using this software, you agree to the following terms and conditions:

1. License Grant

The author grants you a non-exclusive, non-transferable, revocable license to use the software solely for personal evaluation purposes. This license does not permit personal or professional use beyond evaluation, distribution, modification, or reverse engineering of the software.

2. Restrictions

You may not:

    Use the software for any personal, commercial, or professional purpose.
    Distribute, sublicense, lease, rent, or otherwise transfer the software or any portion thereof.
    Modify, adapt, translate, or create derivative works based on the software.
    Decompile, disassemble, reverse engineer, or attempt to derive the source code of the software.

3. Termination

This license is effective until terminated. Your rights under this license will terminate automatically without notice if you fail to comply with any term(s) of this license. Upon termination, you shall cease all use of the software and destroy all copies, full or partial, of the software.

4. Ownership

All rights, title, and interest in and to the software, including but not limited to any images, photographs, animations, video, audio, music, text, and "applets" incorporated into the software, are owned by the author or its suppliers.

5. Disclaimer of Warranties

The software is provided "as is" without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the author be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

6. Limitation of Liability

In no event shall the author be liable for any special, incidental, indirect, or consequential damages whatsoever (including, without limitation, damages for loss of business profits, business interruption, loss of business information, or any other pecuniary loss) arising out of the use of or inability to use the software, even if the author has been advised of the possibility of such damages.

7. Governing Law

This license shall be governed by and construed in accordance with the laws of the jurisdiction in which the author resides, without regard to its conflict of laws rules.