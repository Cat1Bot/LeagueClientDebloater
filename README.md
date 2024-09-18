# LeagueClientDebloater
All in one JS plugin to remove bloat and junk from your League Client.

#Features:
* Removes most popups, nags, and notifications including but not limited to: remedy notifactions, report feedback, honor history, chat restriction, tooltips, "I understand" behavior warnings, and much more.
* Removes junk from settings tab (tos, prviacy notice, code of contuct, etc.)
* Removes clash tab, Missions, and Eternals. See #FAQ for instructions if you want to re-enable them.
* Removes redunant APIs used by the client.
* Makes client load 2 times faster (fixes home hubs taking longer to load issue).
* Removes missions button and disables functionality - no more annoying "click" sound while in game.
* Disables telemtry and tracking endpoints to improve privacy and preformance.
* Forces settings like low spec mode to speed up your client by disabling aminations.
* Force-disables crash reporting.
* Removes LOR button.
* (Risky) Optionally disable Vanguard errors. See #FAQ
  
#How to install:
1) Make sure you have Pengu Loader installed: https://github.com/PenguLoader/PenguLoader
2) Open Pengu loader and click on the plugins tab, then click "Open folder"
3) Paste LCUdebloatterUltimate in your plugins folder 
4) Restart client or open devtools (F12/Crtl+Shift+I) to initialize plugin.

#FAQ
Q. How do I disable Vanguard errors?
A. Open the file and uncomment line 8. WARNING: Do this at your own risk and see this https://www.reddit.com/r/riotgames/comments/1f1z3ca/comment/lk3bqxd/ 
Q. I actually use Clash and/or Missions, how do I re-enable them?
A. For Clash delete or comment out lines 9 and 10. For Missions do the same this time to lines 11 and 12.
Q. How do I see my Eternals again?
A. If you like the 8 people that actually care about Eternals, delete/comment out line 13.
Q. Why cant I set the client to auto-close during game?
A. Having the client set to never close actually speeds it up since it doesnt have to reload resources after game. If enough people don't like this, ill remove enforcement of this setting.
Q. Why does it say some of these settings are enforced by your administrator?
A. This plugin automatically enables/disables certain settings to optimize client preformance such as disabling animations. Messing with these settings defeats the whole purpose of optimzing the client so thats why they are locked.
