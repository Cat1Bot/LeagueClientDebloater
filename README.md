# LeagueClientDebloater
All-in-one JS plugin to remove bloat and junk from your League Client.

## Features
* Removes most popups, nags, glows, and notifications, including but not limited to: remedy notifications, report feedback, honor history, chat restriction, tooltips, "I understand" behavior warnings, and much more.
* Removes junk from the settings tab (TOS, privacy notice, code of conduct, etc.).
* Removes the Clash tab and Eternals.
* Removes redundant APIs used by the client.
* Disables notifications.
* Disables most logging to free up memory.
* Makes the client load 2 times faster (fixes home hub loading issues).
* Removes the missions button and disables functionality—no more annoying "click" sound while in-game.
* Disables telemetry and tracking endpoints to improve privacy and performance.
* Disables animations to speed up your client and provide a cleaner feel.
* Force-disables crash reporting.
* Removes the LoR button.

## How to install
1. Make sure you have Pengu Loader installed: [Pengu Loader](https://github.com/PenguLoader/PenguLoader).
2. Open Pengu Loader and click on the Plugins tab, then click "Open folder".
3. Drag and drop/paste **LCUdebloater.js** into your plugins folder. When a new version is released, repeat this step.
4. Restart the client or open DevTools (F12/Ctrl+Shift+I) to initialize the plugin.
5. Open the hosts file located in **C:\Windows\System32\drivers\etc** and add the following (press enter after each domain so it's on its own line): `0.0.0.0 data.riotgames.com` `0.0.0.0 telemetry.sgp.pvp.net` `0.0.0.0 ekg.riotgames.com` `0.0.0.0 metric-api.newrelic.com` `0.0.0.0 pft.leagueoflegends.com`

## FAQ

**Q:** Why do I have to use the hosts file to block the tracking domains you mentioned? Why can't the plugin just do it?  
**A:** The requests to tracking domains are made by embedded content within the client—any request made by embedded content is unhookable and unblockable due to cross-origin policy.

**Q:** Why can't I set the client to auto-close during a game?  
**A:** Having the client set to never close actually speeds it up since it doesn't have to reload resources after the game. If enough people don't like this, I'll remove the enforcement of this setting.

**Q:** Why does it say some of these settings are enforced by your administrator?  
**A:** This plugin automatically enables/disables certain settings to optimize client performance, such as disabling animations. Altering these settings defeats the purpose of optimizing the client, which is why they are locked.

**Q:** Why do I still see some popups/notifications?  
**A:** The plugin is not perfect; Riot may add new endpoints at any time. If you see anything you'd like removed, please open an issue, and I will address it in the next update.

## Recommended: League Patch Collection

If you’re looking for a more toned-down approach to debloating, check out my [League Patch Collection](https://github.com/Cat1Bot/league-patch-collection). It works well alongside this plugin and provides essential tweaks to patch out annoying or useless config flags while removing less overall bloat.
