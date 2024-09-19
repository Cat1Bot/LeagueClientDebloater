/**
 * @author Cat Bot
 */

(function blockApis() {
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const blockedUrls = [
        //'/lol-vanguard', // Uncomment this line to disable Vanguard errors. Warning: use at your own risk and see this: https://www.reddit.com/r/riotgames/comments/1f1z3ca/comment/lk3bqxd/
        '/lol-clash', // delete or comment out this line and the one below to re-enable Clash.
        '/ClashConfig', // this line too for clash
        '/lol-missions', // delete or comment out this line and the one below to re-enable Clash.
        '/Missions', // this line too
        '/Eternals/Enabled', // if your like the 8 people that actually gave a crap about Eternals, comment out/delete this line.
        '/telemetry',
        '/lol-client-config/v3/client-config/lol.client_settings.paw.enableRPTopUp',
        '/lol.client_settings.vanguard.daysToReshowModal',
        '/lol-pft',
        '/lol-challenges/v1/notifications',
        '/lol-lock-and-load',
        '/FlexRestrictionModalEnabled',
        '/lol-remedy',
        '/eos-memorial',
        '/lol-challenges-latest-level-up',
        '/lol-player-behavior/v1/config',
        '/IsSeasonMemorialModalEnabled',
        '/RankedReferenceModalEnabled',
        '/reward-grants',
        '/performance',
        '/code-of-conduct-notification',
        '/credibility-behavior-warnings',
        '/late-recognition',
        '/lol-champion-mastery/v1/notifications',
        '/lol-inventory/v1/notifications',
        '/CodeOfConductEnabled',
        '/reporter-feedback',
        '/chat-restriction',
        '/lol-player-behavior/v2/reform-card',
        '/lol-player-behavior/v1/reform-card',
        '/deep-links',
        '/lol-shutdown',
        '/lol-kr-shutdown-law',
        '/vng-publisher-settings',
        '/lol-ranked/v1/notifications',
        '/recognition-history',
        '/eos-notifications',
        '/player-notifications',
        '/lol-gameflow/v1/player-kicked-vanguard',
        '/SeasonalTooltipEnabled',
        '/EosNotificationsEnabled',
        '/PlayerNotification',
        '/vignette-notifications',
        '/lol.client_settings.perks.runeRecommenderEnabled',
        '/LcuSentryJSErrors'
    ];
    const blockedUrlsRegex = new RegExp(blockedUrls.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'));

    XMLHttpRequest.prototype.open = function(method, url) {
        if (blockedUrlsRegex.test(url)) {
            return;
        }

        if (url === "/lol-settings/v2/config" || url === "/lol-premade-voice/v1/first-experience" || url === "/lol-platform-config/v1/namespaces/LcuChampionSelect/PickOrderSwappingTooltipEnabled" || url === "/lol-platform-config/v1/namespaces/LcuChampionSelect/ChampTradingTooltipEnabled" ||url === "/lol-settings/v1/account/lol-parties" || url === "/lol-lobby/v1/autofill-displayed" || url === "/lol-perks/v1/show-auto-modified-pages-notification" || url === "/lol-platform-config/v1/namespaces/LcuHovercard" || url === "/lol-settings/v2/account/LCUPreferences/lol-champ-select") {
            const originalSend = this.send;
            this.send = function(body) {
                let originalOnReadyStateChange = this.onreadystatechange;
                this.onreadystatechange = function(ev) {
                    if (this.readyState === 4) {
                        let content;

                        if (url === "/lol-settings/v2/config") {
                            content = JSON.stringify({
                                isGameplayEnabled: true,
                                isHotkeysEnabled: true,
                                isInterfaceEnabled: true,
                                isLegalStatementsEnabled: false,
                                isPrivacyNoticeEnabled: false,
                                isReplaysEnabled: true,
                                isSoundEnabled: true,
                                isTermsEnabled: false,
                                localizedLicensesURL: ""
                            });
                        } else if (url === "/lol-platform-config/v1/namespaces/LcuHovercard") {
                            content = JSON.stringify({
                                Disabled: true,
                                RoleInfoEnabled: false
                            });
                        } else if (url === "/lol-settings/v2/account/LCUPreferences/lol-champ-select") {
                            content = JSON.stringify({
                                data: {
                                    runeRecommenderTutorialTipSeen: false
                                },
                                schemaVersion: 0
                            });
                        } else if (url === "/lol-lobby/v1/autofill-displayed") {
                            content = JSON.stringify(true);
                        } else if (url === "/lol-platform-config/v1/namespaces/LcuChampionSelect/PickOrderSwappingTooltipEnabled" || url === "/lol-platform-config/v1/namespaces/LcuChampionSelect/ChampTradingTooltipEnabled" || url === "/lol-perks/v1/show-auto-modified-pages-notification") {
                            content = JSON.stringify(false);
                        } else if (url === "/lol-settings/v1/account/lol-parties") {
                            content = JSON.stringify({
                                data: {
                                    hasSeenOpenPartyFirstExperience: true,
                                    hasSeenOpenPartyTooltip: true
                                },
                                schemaVersion: 3
                            });
                        } else if (url === "/lol-premade-voice/v1/first-experience") {
                            content = JSON.stringify({
                                showFirstExperienceInGame: false,
                                showFirstExperienceInLCU: false
                            });
                        }

                        Object.defineProperty(this, 'responseText', {
                            value: content
                        });
                        Object.defineProperty(this, 'response', {
                            value: content
                        });

                        if (originalOnReadyStateChange) {
                            return originalOnReadyStateChange.apply(this, arguments);
                        }
                    } else if (originalOnReadyStateChange) {
                        return originalOnReadyStateChange.apply(this, arguments);
                    }
                };
                originalSend.apply(this, arguments);
            };
        }
        return originalXHROpen.apply(this, arguments);
    };

    const originalFetch = window.fetch;
    const fetchBlockedUrls = ['/tracing', '/memory/v1/snapshot', '/performance', '/telemetry'];
    const fetchBlockedUrlsRegex = new RegExp(fetchBlockedUrls.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'));

    window.fetch = function(input, init) {
        const url = typeof input === 'string' ? input : input.url;
        if (fetchBlockedUrlsRegex.test(url)) {
            return Promise.reject(new Error('Request blocked by LCUdebloater: ' + url));
        }
        return originalFetch(input, init);
    };

    function hideElement() {
        const elementsToHide = document.querySelectorAll('[name="lol-third-party-license"], .lol-settings-account-verification-row.ember-view, .lol-settings-reset-button');
        elementsToHide.forEach(element => {
            element.style.display = 'none';
        });
    }

    function greyout() {
        const elements = document.querySelectorAll('.lol-settings-general-row, [for="disableEsportsNotifications"], [for="disableCollectionsNotifications"]');
        elements.forEach(element => {
            element.style.opacity = '0.65';
            element.style.pointerEvents = 'none';
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const body = document.body;

        if (body) {
            const hideObserver = new MutationObserver(hideElement);
            hideObserver.observe(body, {
                childList: true,
                subtree: true
            });
            hideElement(); 

            const greyoutObserver = new MutationObserver(greyout);
            greyoutObserver.observe(body, {
                childList: true,
                subtree: true
            });
            greyout(); 
        } else {
            console.error('Document body is not available.');
        }
    });
})();

(function AdminWarn() {
    function initializeObserver() {
        const observer = new MutationObserver(function(mutationsList, observer) {
            const firstGeneralRow = document.querySelector('.lol-settings-general-row, .lol-settings-notifications-row');

            if (firstGeneralRow && !document.querySelector('.admin-warning-box')) {
		var adminBox = document.createElement('div');
		adminBox.classList.add('admin-warning-box');
		adminBox.style.backgroundColor = 'rgba(120, 90, 40, 0.3)';  
		adminBox.style.color = '#f0e6d2';
		adminBox.style.padding = '6px';
		adminBox.style.marginBottom = '10px'; 
		adminBox.style.borderRadius = '0';
		adminBox.style.borderLeft = '3.5px solid #c89b3c';
		adminBox.style.fontWeight = '600';
		adminBox.style.fontSize = '14px';
		adminBox.style.fontFamily = '"LoL Display", Arial';
		adminBox.textContent = "Some of these settings are enforced by your administrator";

                firstGeneralRow.parentNode.insertBefore(adminBox, firstGeneralRow);
            }
        });

        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
        } else {
            console.error("Document body is not available for MutationObserver.");
        }
    }

    document.addEventListener('DOMContentLoaded', initializeObserver);
})();

(function forceSettings() {

    window.addEventListener('load', function() {
        
        const lcuPreferencesPayload = {
            "data": {
                "top-nav-updates-eat-seen": true,
                "uploadCrashReports": false
            },
            "schemaVersion": 1
        };

        fetch('/lol-settings/v2/account/LCUPreferences/lol-general', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lcuPreferencesPayload)
        });

        const userExperiencePayload = {
            "data": {
                "hasBeenPromptedForPotatoMode": true,
                "lastKnownMachineSpec": 5,
		"motionEffectsDisabled": true,
                "potatoModeEnabled": true,
                "unloadLeagueClientUx": "never"
            },
            "schemaVersion": 3
        };

        fetch('/lol-settings/v2/local/lol-user-experience', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userExperiencePayload)
        });

        const notificationsPayload = {
            "data": {
                "disableCollectionsNotifications": true,
                "disableEsportsNotifications": true
            },
            "schemaVersion": 1
        };

        fetch('/lol-settings/v2/account/LCUPreferences/lol-notifications', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationsPayload)
        });

        const partiesPayload = {
            "data": {
                "hasSeenOpenPartyFirstExperience": true,
                "hasSeenOpenPartyTooltip": true
            },
            "schemaVersion": 1
        };

        fetch('/lol-settings/v1/account/lol-parties', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(partiesPayload)
        });

    }, false);
})();