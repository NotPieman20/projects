Assuming Discord is setup with a server created and channel made, Node.js and npm installed.

-Sign in to discord in the web browser.
-Navigate to https://discordapp.com/developers/applications/
-Create a bot (names whatever you like), navigate to "bot" in sidebar. You should see the message
"a wild bot has appeared" and there will also be a token (like api key).
-Reveal the token and copy it.

-in command prompt, create a directory for the discord bot (mkdir discordBot) and change into that directory (cd discordBot).
-open your text editor and create a file index.js
-create a const variable called token and set it to the token that you copied. Use envoirment variable to hide token
-used .env file and include it in the gitignore file when you upload.

-in cmd, use npm init -y to initialise and create the package.json
-next, install discord.js (npm install discord.js).
-import with a const variable (const Discord = require('discord.js');

-back to discordapp.com, navigate to "General information" and copy the CLIENT ID
- use https://discordapp.com/oauth2/authorize?&client_id=CLIENT_ID_HERE&scope=bot&permissions=8
- insert the client id above where its is written.
-choose your server in the pop up window and click authorize
-program your bot!
