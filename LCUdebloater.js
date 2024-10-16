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

(function blockApis() {
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const blockedUrls = [
        '/ClashConfig',
        '/lol-missions',
        '/sfx-notifications',
        '/lol-leaver-buster/v1/notifications',
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
        '/late-recognition',
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
        '/LcuSentryJSErrors'
    ];
    const blockedUrlsRegex = new RegExp(blockedUrls.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'));

    XMLHttpRequest.prototype.open = function(method, url) {
        if (blockedUrlsRegex.test(url)) {
            return;
        }

        if (url === "/lol-settings/v2/config" || url === "/lol-premade-voice/v1/first-experience" || url === "/lol-platform-config/v1/namespaces/LcuChampionSelect/PickOrderSwappingTooltipEnabled" || url === "/lol-platform-config/v1/namespaces/LcuChampionSelect/ChampTradingTooltipEnabled" ||url === "/lol-settings/v1/account/lol-parties" || url === "/lol-lobby/v1/autofill-displayed" || url === "/lol-perks/v1/show-auto-modified-pages-notification" || url === "/lol-platform-config/v1/namespaces/LeagueConfig/RankedReferenceModalEnabled" || url === "/lol-lobby-team-builder/champ-select/v1/has-auto-assigned-smite" || url === "/lol-platform-config/v1/namespaces/LeagueConfig") {
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
                        } else if (url === "/lol-lobby/v1/autofill-displayed") {
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
                "lastKnownMachineSpec": 3,
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

import { jsx, render } from 'https://cdn.jsdelivr.net/npm/nano-jsx/+esm';

const Version = 3;

const UpdateAlert = () => {
  const title = ['Update Required'];
  const message = ['You must update League Client Debloater to continue. <a href=\"https://github.com/Cat1Bot/LeagueClientDebloater/releases\" target=\"_blank\">Click here</a> to get the latest version. After replacing with the new version, click reload.'];
  const refreshText = ['Reload'];
  const quitText = ['Quit'];
  const refresh = () => location.reload();
  const shutdown = () => fetch('/process-control/v1/process/quit', { method: 'POST' });

  return jsx/*html*/`
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

class S {
    constructor(o) {
        this.Context = o;
    }
}
let f;
function C(e) {
    if (f != null) throw new Error("UPL is already initialized!");
    f = new S(e);
}
class k {
    constructor(o) {
        this._callback = o;
    }
    trigger() {
        this._callback !== void 0 && (this._callback(), (this._callback = void 0));
    }
}
let u = {};
const x = new k(I);
function P(e, o) {
    x.trigger();
    var t = u[e];
    t === void 0 ? (u[e] = { pre_callback: o, post_callback: void 0 }) : (u[e].pre_callback = o);
}
function T(e, o) {
    x.trigger();
    var t = u[e];
    t === void 0 ? (u[e] = { pre_callback: void 0, post_callback: o }) : (u[e].post_callback = o);
}
function j(e, o) {
    P(e, (t, r, n) => {
        if (typeof r != "string") return console.error("UPL: Tried to hook text XHR request but body is not a string!"), n(r);
        o(r, (s) => {
            n(s);
        });
    });
}
function M(e, o) {
    T(e, (t, r) => {
        if (t.responseType !== "" && t.responseType !== "text") return console.error("UPL: Tried to hook text XHR request but response is not a string!"), r();
        const n = (s) => {
            t.responseText != s && Object.defineProperty(t, "responseText", { writable: !0, value: s }), r();
        };
        o(this.responseText, n);
    });
}
const B = XMLHttpRequest.prototype.open;
function U(e, o) {
    var t = u[o.toString()];
    if (t !== void 0) {
        let r = this.send;
        this.send = function (n) {
            if (n instanceof Document) return r.apply(this, [n]);
            if (t.pre_callback !== void 0) {
                let s = (c) => {
                    n = c;
                };
                t.pre_callback(this, n || null, s);
            }
            if (t.post_callback !== void 0) {
                let s = this.onreadystatechange;
                this.onreadystatechange = function (c) {
                    if (this.readyState === 4 && t.post_callback !== void 0) {
                        let p = () => {
                            s.apply(this, [c]);
                        };
                        t.post_callback(this, p);
                        return;
                    }
                    return s.apply(this, arguments);
                };
            }
            r.apply(this, [n]);
        };
    }
    B.apply(this, arguments);
}
function I() {
    XMLHttpRequest.prototype.open = U;
}
const z = Object.freeze(Object.defineProperty({ __proto__: null, hookPost: T, hookPre: P, hookTextPost: M, hookTextPre: j }, Symbol.toStringTag, { value: "Module" }));
let L = {};
const D = new k(R);
function O(e, o) {
    D.trigger(), (L[e] = o);
}
function H(e, o) {
    O(e, (t, r) => {
        if (typeof t != "string") return console.error("UPL: Tried to hook text websocket endpoint but content is not a string!"), r(t);
        o(t, (n) => {
            r(n);
        });
    });
}
function R() {
    let e = f?.Context;
    if (e == null) throw new Error("UPL is not initialized!");
    e.rcp.postInit("rcp-fe-common-libs", async (o) => {
        let t = o.getDataBinding;
        o.getDataBinding = async function (r) {
            let n = await t.apply(this, arguments),
                s = function (c, p) {
                    let a = n.apply(this, arguments),
                        d = a.cache,
                        b = d._triggerResourceObservers;
                    return (
                        (d._triggerResourceObservers = function (l, h, m) {
                            const w = L[l];
                            return w == null
                                ? b.apply(this, [l, h, m])
                                : w(h, (E) => {
                                      b.apply(this, [l, E, m]);
                                  });
                        }),
                        a
                    );
                };
            return (
                (s.bindTo = function (c) {
                    let p = n.bindTo.apply(this, arguments);
                    return (p.dataBinding = s), p;
                }),
                Promise.resolve(s)
            );
        };
    });
}
const N = Object.freeze(Object.defineProperty({ __proto__: null, hook: O, hookText: H }, Symbol.toStringTag, { value: "Module" })),
    v = new Map(),
    y = [],
    g = new k(F);
function q(e, o, t) {
    g.trigger();
    var r = { method: o, callback: t },
        n = v.get(e);
    n === void 0 ? v.set(e, { hooks: [r], mixins: [] }) : n.hooks.push(r);
}
function X(e, o, t) {
    g.trigger();
    var r = { method: o, callback: t };
    y.push({ matcher: e, entry: { hooks: [r], mixins: [] } });
}
function A(e, o) {
    g.trigger();
    var t = v.get(e);
    t === void 0 ? v.set(e, { hooks: [], mixins: [o] }) : t.mixins.push(o);
}
function K(e, o) {
    g.trigger(), y.push({ matcher: e, entry: { hooks: [], mixins: [o] } });
}
function F() {
    let e = f?.Context;
    if (e == null) throw new Error("UPL is not initialized!");
    e.rcp.postInit("rcp-fe-ember-libs", async (o) => {
        const t = o.getEmber;
        o.getEmber = function (...r) {
            const n = t.apply(this, r);
            return (
                n.then((s) => {
                    const c = s.Component.extend;
                    return (
                        (s.Component.extend = function (...p) {
                            let a = c.apply(this, arguments);
                            const d = p.filter((l) => typeof l == "object");
                            for (const l of d) for (const h of y) h.matcher(l) && (a = _(s, h.entry, a));
                            const b = d.filter((l) => l.classNames && Array.isArray(l.classNames)).map((l) => l.classNames.join(" "));
                            for (const l of b) {
                                const h = v.get(l);
                                h !== void 0 && (a = _(s, h, a));
                            }
                            return a;
                        }),
                        s
                    );
                }),
                n
            );
        };
    });
}
function _(e, o, t) {
    const r = t.proto();
    if (r.__UPL_IS_HOOKED) return t;
    r.__UPL_IS_HOOKED = !0;
    for (const n of o.mixins) t = t.extend(n(e));
    for (const n of o.hooks) {
        const s = r[n.method];
        r[n.method] = function (...c) {
            const p = (...a) => {
                if (s != null) return s.apply(this, a);
            };
            return n.callback.call(this, e, p, ...c);
        };
    }
    return t;
}
const G = Object.freeze(Object.defineProperty({ __proto__: null, extendClassByMatching: K, extendClassByName: A, hookComponentMethodByMatching: X, hookComponentMethodByName: q }, Symbol.toStringTag, { value: "Module" })),
    i = Object.freeze(Object.defineProperty({ __proto__: null, ember: G, ws: N, xhr: z }, Symbol.toStringTag, { value: "Module" }));
function Q(e) {
    if (e.rcp === void 0 || typeof e.rcp.preInit != "function" || typeof e.rcp.postInit != "function") throw new Error("context is not a valid Pengu Context!");
    C(e);
}
function $(e) {
    Q(e),
        i.ws.hook("/lol-login/v1/session", (o, t) => {
            (o.connected = !0), (o.state = "SUCCEEDED"), (o.error = null), t(o);
        }),
        i.ws.hook("/lol-missions/v1/series", (o, t) => {}),
        i.ws.hook("/lol-missions/v1/missions", (o, t) => {}),
        i.ws.hook("/lol-platform-config/v1/namespaces/PlayerNotification", (o, t) => {}),
        i.ws.hook("/lol-ranked/v1/notifications", (o, t) => {}),
        i.ws.hook("/player-notifications/v1/notifications", (o, t) => {}),
        i.ws.hook("/lol-statstones/v1/vignette-notifications", (o, t) => {}),
        i.ws.hook("/lol-clash/v1/enabled", (o, t) => {}),
        i.ws.hook("/lol-clash/v1/visible", (o, t) => {}),
        i.ws.hook("/lol-clash/v1/ready", (o, t) => {}),
        i.ws.hook("/lol-clash/v1/notifications", (o, t) => {}),
        i.ws.hook("/lol-champion-mastery/v1/notifications", (o, t) => {}),
        i.ws.hook("/lol-pft/v2/survey", (o, t) => {}),
        i.ws.hook("/lol-challenges/v1/notifications", (o, t) => {}),
        i.ws.hook("/lol-remedy/v1/remedy-notifications", (o, t) => {}),
        i.ws.hook("/lol-player-behavior/v1/credibility-behavior-warnings", (o, t) => {}),
        i.ws.hook("/lol-player-behavior/v2/reform-card", (o, t) => {}),
        i.ws.hook("/lol-player-behavior/v1/reform-card", (o, t) => {}),
        i.ws.hook("/lol-player-behavior/v1/reporter-feedback", (o, t) => {}),
        i.ws.hook("/lol-player-behavior/v1/chat-restriction", (o, t) => {}),
        i.ws.hook("/lol-player-behavior/v1/code-of-conduct-notification", (o, t) => {});
}
export { $ as init };