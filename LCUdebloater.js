/**
 * @author Cat Bot
 */

(function() {
    const suppressConsoleMethods = () => {
        console.info = function() {};
        console.warn = function() {};
        console.error = function() {};
        console.debug = function() {};
        console.log = function() {};
    };

    suppressConsoleMethods();

    window.onerror = function(message, source, lineno, colno, error) {
        return true;
    };

    window.onunhandledrejection = function(event) {
        event.preventDefault();
    };
})();

(function() {
    const originalXHROpen = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        const blockedUrls = [
            '/lol-login/v1/session',
            '/lol-league-session/v1/league-session-token'
        ];

        if (method === 'DELETE' && blockedUrls.some(blockedUrl => url.includes(blockedUrl))) {
            return;
        }

        return originalXHROpen.apply(this, arguments);
    };
})();

(function blockApis() {
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const blockedUrls = [
        '/ClashConfig',
        '/lol-missions',
        '/sfx-notifications',
        '/player-notifications',
        '/Missions',
        '/token-upsell',
        '/menu-item-call-to-action-intro.webm',
        '/global-notifications',
        '/status-notification',
        '/current-lp-change-notification',
        '/Eternals/Enabled',
        '/telemetry',
        '/lol-client-config/v3/client-config/lol.client_settings.paw.enableRPTopUp',
        '/lol.client_settings.vanguard.daysToReshowModal',
        '/lol-pft',
        '/AccountVerification',
        '/lol-challenges/v1/notifications',
        '/lol-lock-and-load',
        '/FlexRestrictionModalEnabled',
        '/lol-remedy',
        '/eos-memorial',
        '/lol-challenges-latest-level-up',
        '/lol-player-behavior/v1/config',
        '/IsSeasonMemorialModalEnabled',
        '/reward-grants',
        '/performance',
        '/code-of-conduct-notification',
        '/credibility-behavior-warnings',
        '/lol-champion-mastery/v1/notifications',
        '/lol-inventory/v1/notifications',
        '/CodeOfConductEnabled',
        '/reporter-feedback',
        '/chat-restriction',
        '/recent-final-split',
        '/lol-player-behavior/v2/reform-card',
        '/lol-player-behavior/v1/reform-card',
        '/deep-links',
        '/lol-shutdown',
        '/lol-player-messaging',
        '/lol-kr-shutdown-law',
        '/vng-publisher-settings',
        '/lol-ranked/v1/notifications',
        '/recognition-history',
        '/eos-notifications',
        '/lol-gameflow/v1/player-kicked-vanguard',
        '/SeasonalTooltipEnabled',
        '/EosNotificationsEnabled',
        '/vignette-notifications',
    ];
    const blockedUrlsRegex = new RegExp(blockedUrls.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'));

    XMLHttpRequest.prototype.open = function(method, url) {
        if (blockedUrlsRegex.test(url)) {
            return;
        }

        if (url === "/lol-settings/v2/config" || url === "/lol-premade-voice/v1/first-experience" || url === "/lol-platform-config/v1/namespaces/LcuChampionSelect/PickOrderSwappingTooltipEnabled" || url === "/lol-platform-config/v1/namespaces/LcuChampionSelect/ChampTradingTooltipEnabled" || url === "/lol-settings/v1/account/lol-parties" || url === "/lol-lobby/v1/autofill-displayed" || url === "/lol-perks/v1/show-auto-modified-pages-notification" || url === "/lol-platform-config/v1/namespaces/LeagueConfig/RankedReferenceModalEnabled" || url === "/lol-lobby-team-builder/champ-select/v1/has-auto-assigned-smite" || url === "/lol-platform-config/v1/namespaces/LeagueConfig" || url === "/lol-client-config/v3/client-config/lol.client_settings.sentry_config" || url === "/lol-client-config/v3/client-config/lol.client_settings.datadog_rum_config" || url === "/lol-client-config/v3/client-config/lol.client_settings.client_navigability.info_hub_disabled") {
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
                        } else if (url === "/lol-lobby/v1/autofill-displayed" || url === "/lol-client-config/v3/client-config/lol.client_settings.client_navigability.info_hub_disabled") {
                            content = JSON.stringify(true);
                        } else if (url === "/lol-platform-config/v1/namespaces/LcuChampionSelect/PickOrderSwappingTooltipEnabled" || url === "/lol-platform-config/v1/namespaces/LcuChampionSelect/ChampTradingTooltipEnabled" || url === "/lol-perks/v1/show-auto-modified-pages-notification" || url === "/lol-platform-config/v1/namespaces/LeagueConfig/RankedReferenceModalEnabled" || url === "/lol-lobby-team-builder/champ-select/v1/has-auto-assigned-smite") {
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
                        } else if (url === "/lol-platform-config/v1/namespaces/LeagueConfig") {
                            content = JSON.stringify({
                                showFirstExperienceInGame: false,
                                showFirstExperienceInLCU: false
                            });
                        } else if (url === "/lol-client-config/v3/client-config/lol.client_settings.sentry_config") {
                            content = JSON.stringify({
                                dsn: "",
                                isEnabled: false,
                                sampleRate: 0
                            });
                        } else if (url === "/lol-client-config/v3/client-config/lol.client_settings.datadog_rum_config") {
                            content = JSON.stringify({
                                applicationID: "",
                                clientToken: "",
                                isEnabled: false,
                                service: "",
                                sessionReplaySampleRate: 0,
                                sessionSampleRate: 0,
                                site: "",
                                telemetrySampleRate: 0,
                                traceSampleRate: 0,
                                trackLongTasks: false,
                                trackResources: false,
                                trackUserInteractions: false
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
    const fetchBlockedUrls = ['/tracing', '/memory', '/performance', '/telemetry', '/LoggingStart'];
    const fetchBlockedUrlsRegex = new RegExp(fetchBlockedUrls.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'));

    window.fetch = function(input, init) {
        const url = typeof input === 'string' ? input : input.url;
        if (fetchBlockedUrlsRegex.test(url)) {
            return Promise.reject();
        }
        return originalFetch(input, init);
    };

    function hideElement() {
        const elementsToHide = document.querySelectorAll('[name="lol-third-party-license"], .lol-settings-reset-button, [class="navigation-cta-wrapper navigation-pip-cta"], [class="navigation-cta-wrapper navigation-glow-cta"], [class="call-to-action-pip ember-view"]');
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
                adminBox.style.backgroundColor = '#1e2328';
                adminBox.style.color = '#f0e6d2';
                adminBox.style.padding = '6px';
                adminBox.style.marginBottom = '10px';
                adminBox.style.borderRadius = '0';
                adminBox.style.borderLeft = '3.5px solid #c89b3c';
                adminBox.style.fontWeight = 'bold';
                adminBox.style.fontSize = '14px';
                adminBox.style.fontFamily = 'LoL Display, Arial';
                adminBox.textContent = "Some of these settings are enforced by League Client Debloater";

                firstGeneralRow.parentNode.insertBefore(adminBox, firstGeneralRow);
            }
        });

        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
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
                "lastKnownMachineSpec": 3,
                "motionEffectsDisabled": true,
                "potatoModeEnabled": true,
                "closeLeagueClientDuringGame": false,
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
                "championTradeToggleTooltipSeen": true,
                "positionSwapToggleTooltipSeen": true,
                "reportAndMutingTooltipShown": true,
                "runeRecommenderTutorialTipSeen": true
            },
            "schemaVersion": 0
        };

        fetch('/lol-settings/v2/account/LCUPreferences/lol-champ-select', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(partiesPayload)
        });

    }, false);
})();

import {
    jsx,
    render
} from 'https://cdn.jsdelivr.net/npm/nano-jsx/+esm';

const Version = 9;

const UpdateAlert = () => {
    const title = ['Update Required'];
    const message = ['You must update League Client Debloater to continue. <a href=\"https://github.com/Cat1Bot/LeagueClientDebloater/releases\" target=\"_blank\">Click here</a> to get the latest version. After replacing with the new version, click reload.'];
    const refreshText = ['Reload'];
    const quitText = ['Quit'];
    const refresh = () => location.reload();
    const shutdown = () => fetch('/process-control/v1/process/quit', {
        method: 'POST'
    });

    return jsx`
    <div class="modal" style="position: absolute; inset: 0px; z-index: 850;">
      <lol-uikit-full-page-backdrop class="backdrop" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;" />
      <div class="dialog-alert" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;">
        <lol-uikit-dialog-frame class="dialog-frame" style="z-index: 0;">
          <div class="dialog-content">
            <lol-uikit-content-block class="player-behavior-ban-notification" type="dialog-small">
              <h4>${title}</h4>
              <hr class="heading-spacer" />
              <p dangerouslySetInnerHTML=${{ __html: message }}></p>
            </lol-uikit-content-block>
          </div>
          <lol-uikit-flat-button-group type="dialog-frame">
            <lol-uikit-flat-button class="button-reload" tabindex="1" primary="true" onClick=${refresh}>${refreshText}</lol-uikit-flat-button>
            <lol-uikit-flat-button class="button-quit" tabindex="2" primary="true" onClick=${shutdown}>${quitText}</lol-uikit-flat-button>
          </lol-uikit-flat-button-group>
        </lol-uikit-dialog-frame>
      </div>
    </div>
  `;
};

window.addEventListener('load', async () => {
    const delay = (t) => new Promise(r => setTimeout(r, t));
    const manager = () => document.getElementById('lol-uikit-layer-manager-wrapper');

    try {
        const response = await fetch('https://raw.githubusercontent.com/Cat1Bot/LeagueClientDebloater/refs/heads/main/updatecfg.json');

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const config = await response.json();

        let updateRequired = false;
        let modifyResponse = false;

        if (Version < config.minversion) {
            updateRequired = true;
        }

        if (Version < config.latestversion) {
            modifyResponse = true;
        }

        if (updateRequired) {
            while (!manager()) {
                await delay(1200);
            }

            const root = document.createElement('div');
            render(UpdateAlert, root);
            manager().appendChild(root);
        }

        if (modifyResponse) {
            let _xhrOriginalOpen = XMLHttpRequest.prototype.open;

            XMLHttpRequest.prototype.open = function(_, url) {
                if (url === "/lol-service-status/v1/ticker-messages") {
                    let originalSend = this.send;

                    this.send = function(body) {
                        let originalOnReadyStateChanged = this.onreadystatechange;

                        this.onreadystatechange = function(ev) {
                            if (this.readyState === 4) {
                                let originalContent = JSON.parse(this.responseText);

                                const customMessage = {
                                    createdAt: "",
                                    heading: "Plugin Update Available",
                                    message: "A newer version of League Client Debloater is available. Click here to get the latest version.",
                                    severity: "warn",
                                    updatedAt: ""
                                };

                                originalContent.push(customMessage);

                                const updatedContent = JSON.stringify(originalContent);

                                Object.defineProperty(this, 'responseText', {
                                    writable: true,
                                    value: updatedContent
                                });

                                return originalOnReadyStateChanged.apply(this, [ev]);
                            }

                            return originalOnReadyStateChanged.apply(this, arguments);
                        };

                        originalSend.apply(this, [body]);
                    };
                }

                _xhrOriginalOpen.apply(this, arguments);
            };
        }
    } catch (error) {
        console.error('Failed to load config:', error);
    }
});