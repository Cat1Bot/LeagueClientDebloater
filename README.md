# LeagueClientDebloater
All in one JS plugin to remove bloat and junk from your League Client.

# Features
* Removes most popups, nags, glows, and notifications including but not limited to: remedy notifactions, report feedback, honor history, chat restriction, tooltips, "I understand" behavior warnings, and much more.
* Removes junk from settings tab (tos, prviacy notice, code of conduct, etc.)
* Removes Clash tab and Eternals.
* Removes redunant APIs used by the client.
* Disables notifications.
* Makes client load 2 times faster (fixes home hubs taking longer to load issue).
* Removes missions button and disables functionality - no more annoying "click" sound while in game.
* Disables telemtry and tracking endpoints to improve privacy and preformance.
* Disables animations to speed up your client and give a cleaner feel.
* Force-disables crash reporting.
* Removes LOR button.
  
# How to install
1) Make sure you have Pengu Loader installed: https://github.com/PenguLoader/PenguLoader
2) Open Pengu loader and click on the plugins tab, then click "Open folder"
3) Drag and drop/paste **LCUdebloater.js** in your plugins folder. When a new version is released, repeat this step.
4) Restart client or open devtools (F12/Crtl+Shift+I) to initialize plugin.
5) Open the hosts file located in **C:\Windows\System32\drivers\etc** and add the following(press enter after each domain so its on its own line): `0.0.0.0 data.riotgames.com` `0.0.0.0 telemetry.sgp.pvp.net` `0.0.0.0 ekg.riotgames.com` `0.0.0.0 metric-api.newrelic.com` `0.0.0.0 metric-api.newrelic.com`

# FAQ

Q.) Why do I have to use the host file to block the tracking domains you mentioned? Why cant the plugin just do it.

A.) The requests to tracking domains are made by embedded content within the client - any request made by embedded content is unhookable and ublockable due to cross-origin policy.

Q.) Why cant I set the client to auto-close during game?

A.) Having the client set to never close actually speeds it up since it doesnt have to reload resources after game. If enough people don't like this, ill remove enforcement of this setting.

Q.) Why does it say some of these settings are enforced by your administrator?

A.) This plugin automatically enables/disables certain settings to optimize client preformance such as disabling animations. Messing with these settings defeats the whole purpose of optimzing the client so thats why they are locked.

Q.) Why do I still see some popups/notifcations?

A.) The plugin is not perfect, Riot may add in new endpoints at any time. If you see anything you would like removed, please open a issue and I will remove it in the next update.
