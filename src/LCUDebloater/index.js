/**
 * @author Cat Bot
 */

import config from "./config.json";

(function removeDebugInfo() {
	if (config.debug) return

	const suppressConsoleMethods = () => {
		console.info = function () {}
		console.warn = function () {}
		console.error = function () {}
		console.debug = function () {}
		console.log = function () {}
	}
	suppressConsoleMethods()

	window.onerror = function (message, source, lineno, colno, error) {
		return true
	}

	window.onunhandledrejection = function (event) {
		event.preventDefault()
	}
})();

(function blockApis() {
	const originalXHROpen = XMLHttpRequest.prototype.open
	const blockedUrls = [
		"/ClashConfig",
		"/lol-missions",
		"/sfx-notifications",
		"/player-notifications",
		"/Missions",
		"/token-upsell",
		"/menu-item-call-to-action-intro.webm",
		"/global-notifications",
		"/status-notification",
		"/current-lp-change-notification",
		"/Eternals/Enabled",
		"/telemetry",
		"/lol-client-config/v3/client-config/lol.client_settings.paw.enableRPTopUp",
		"/lol.client_settings.vanguard.daysToReshowModal",
		"/lol-pft",
		"/AccountVerification",
		"/lol-challenges/v1/notifications",
		"/lol-lock-and-load",
		"/FlexRestrictionModalEnabled",
		"/lol-remedy",
		"/eos-memorial",
		"/lol-challenges-latest-level-up",
		"/lol-player-behavior/v1/config",
		"/IsSeasonMemorialModalEnabled",
		"/reward-grants",
		"/performance",
		"/code-of-conduct-notification",
		"/credibility-behavior-warnings",
		"/lol-champion-mastery/v1/notifications",
		"/lol-inventory/v1/notifications",
		"/CodeOfConductEnabled",
		"/reporter-feedback",
		"/chat-restriction",
		"/recent-final-split",
		"/lol-player-behavior/v2/reform-card",
		"/lol-player-behavior/v1/reform-card",
		"/deep-links",
		"/lol-shutdown",
		"/lol-player-messaging",
		"/lol-kr-shutdown-law",
		"/vng-publisher-settings",
		"/lol-ranked/v1/notifications",
		"/recognition-history",
		"/eos-notifications",
		"/lol-gameflow/v1/player-kicked-vanguard",
		"/SeasonalTooltipEnabled",
		"/EosNotificationsEnabled",
		"/vignette-notifications",
	]
	const blockedUrlsRegex = new RegExp(blockedUrls.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"))

	XMLHttpRequest.prototype.open = function (method, url) {
		if (blockedUrlsRegex.test(url)) {
			return
		}

		if (
			url === "/lol-settings/v2/config" ||
			url === "/lol-premade-voice/v1/first-experience" ||
			url === "/lol-platform-config/v1/namespaces/LcuChampionSelect/PickOrderSwappingTooltipEnabled" ||
			url === "/lol-platform-config/v1/namespaces/LcuChampionSelect/ChampTradingTooltipEnabled" ||
			url === "/lol-settings/v1/account/lol-parties" ||
			url === "/lol-lobby/v1/autofill-displayed" ||
			url === "/lol-perks/v1/show-auto-modified-pages-notification" ||
			url === "/lol-platform-config/v1/namespaces/LeagueConfig/RankedReferenceModalEnabled" ||
			url === "/lol-lobby-team-builder/champ-select/v1/has-auto-assigned-smite" ||
			url === "/lol-platform-config/v1/namespaces/LeagueConfig" ||
			url === "/lol-client-config/v3/client-config/lol.client_settings.sentry_config"
		) {
			const originalSend = this.send
			this.send = function (body) {
				let originalOnReadyStateChange = this.onreadystatechange
				this.onreadystatechange = function (ev) {
					if (this.readyState === 4) {
						let content

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
								localizedLicensesURL: "",
							})
						} else if (url === "/lol-lobby/v1/autofill-displayed") {
							content = JSON.stringify(true)
						} else if (
							url ===
								"/lol-platform-config/v1/namespaces/LcuChampionSelect/PickOrderSwappingTooltipEnabled" ||
							url === "/lol-platform-config/v1/namespaces/LcuChampionSelect/ChampTradingTooltipEnabled" ||
							url == "/lol-perks/v1/show-auto-modified-pages-notification" ||
							url === "/lol-platform-config/v1/namespaces/LeagueConfig/RankedReferenceModalEnabled" ||
							url === "/lol-lobby-team-builder/champ-select/v1/has-auto-assigned-smite"
						) {
							content = JSON.stringify(false)
						} else if (url === "/lol-settings/v1/account/lol-parties") {
							content = JSON.stringify({
								data: {
									hasSeenOpenPartyFirstExperience: true,
									hasSeenOpenPartyTooltip: true,
								},
								schemaVersion: 3,
							})
						} else if (url === "/lol-premade-voice/v1/first-experience") {
							content = JSON.stringify({
								showFirstExperienceInGame: false,
								showFirstExperienceInLCU: false,
							})
						} else if (url === "/lol-platform-config/v1/namespaces/LeagueConfig") {
							content = JSON.stringify({
								showFirstExperienceInGame: false,
								showFirstExperienceInLCU: false,
							})
						} else if (url === "/lol-client-config/v3/client-config/lol.client_settings.sentry_config") {
							content = JSON.stringify({
								dsn: "",
								isEnabled: false,
								sampleRate: 0,
							})
						}

						Object.defineProperty(this, "responseText", {
							value: content,
						})
						Object.defineProperty(this, "response", {
							value: content,
						})

						if (originalOnReadyStateChange) {
							return originalOnReadyStateChange.apply(this, arguments)
						}
					} else if (originalOnReadyStateChange) {
						return originalOnReadyStateChange.apply(this, arguments)
					}
				}
				originalSend.apply(this, arguments)
			}
		}
		return originalXHROpen.apply(this, arguments)
	}

	const originalFetch = window.fetch
	const fetchBlockedUrls = ["/tracing", "/memory", "/performance", "/telemetry", "/LoggingStart"]
	const fetchBlockedUrlsRegex = new RegExp(
		fetchBlockedUrls.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")
	)

	window.fetch = function (input, init) {
		const url = typeof input === "string" ? input : input.url
		if (fetchBlockedUrlsRegex.test(url)) {
			return Promise.reject()
		}
		return originalFetch(input, init)
	}

	function hideElement() {
		const elementsToHide = document.querySelectorAll(
			'[name="lol-third-party-license"], .lol-settings-reset-button, [class="navigation-cta-wrapper navigation-pip-cta"], [class="navigation-cta-wrapper navigation-glow-cta"], [class="call-to-action-pip ember-view"]'
		)
		elementsToHide.forEach((element) => {
			element.style.display = "none"
		})
	}

	function greyout() {
		const elements = document.querySelectorAll(
			'.lol-settings-general-row, [for="disableEsportsNotifications"], [for="disableCollectionsNotifications"]'
		)
		elements.forEach((element) => {
			element.style.opacity = "0.65"
			element.style.pointerEvents = "none"
		})
	}

	document.addEventListener("DOMContentLoaded", () => {
		const body = document.body

		if (body) {
			const hideObserver = new MutationObserver(hideElement)
			hideObserver.observe(body, {
				childList: true,
				subtree: true,
			})
			hideElement()

			const greyoutObserver = new MutationObserver(greyout)
			greyoutObserver.observe(body, {
				childList: true,
				subtree: true,
			})
			greyout()
		} else {
			console.error("Document body is not available.")
		}
	})
})();

(function AdminWarn() {
	function initializeObserver() {
		const observer = new MutationObserver(function (mutationsList, observer) {
			const firstGeneralRow = document.querySelector(".lol-settings-general-row, .lol-settings-notifications-row")

			if (firstGeneralRow && !document.querySelector(".admin-warning-box")) {
				var adminBox = document.createElement("div")
				adminBox.classList.add("admin-warning-box")
				adminBox.style.backgroundColor = "#1e2328"
				adminBox.style.color = "#f0e6d2"
				adminBox.style.padding = "6px"
				adminBox.style.marginBottom = "10px"
				adminBox.style.borderRadius = "0"
				adminBox.style.borderLeft = "3.5px solid #c89b3c"
				adminBox.style.fontWeight = "bold"
				adminBox.style.fontSize = "14px"
				adminBox.style.fontFamily = "LoL Display, Arial"
				adminBox.textContent = "Some of these settings are enforced by League Client Debloater"

				firstGeneralRow.parentNode.insertBefore(adminBox, firstGeneralRow)
			}
		})

		if (document.body) {
			observer.observe(document.body, { childList: true, subtree: true })
		} else {
			console.error("Document body is not available for MutationObserver.")
		}
	}

	document.addEventListener("DOMContentLoaded", initializeObserver)
})();

(function forceSettings() {
	if (!config.forceSettings.enabled) return

	const BASE_HEADER = {
		"Content-Type": "application/json",
	}

	const patch = ({ endpoint, data, schemaVersion, headers = null } = {}) => {
		const body = JSON.stringify({
			data: data,
			schemaVersion: schemaVersion,
		})

		const request = {
			method: "PATCH",
			headers: headers ?? BASE_HEADER,
			body: body,
		}

		fetch(endpoint, request)
	}

	window.addEventListener(
		"load",
		function () {
			const settings = config.forceSettings.settings

			if (settings.lcuPreferences) {
				const lcuPreferencesPayload = {
					"top-nav-updates-eat-seen": true,
					uploadCrashReports: false,
				}
				patch({
					endpoint: "/lol-settings/v2/account/LCUPreferences/lol-general",
					data: lcuPreferencesPayload,
					schemaVersion: 1,
				})
			}

			if (settings.userExperience) {
				const userExperiencePayload = {
					hasBeenPromptedForPotatoMode: true,
					lastKnownMachineSpec: 3,
					motionEffectsDisabled: true,
					potatoModeEnabled: true,
					closeLeagueClientDuringGame: true,
					unloadLeagueClientUx: "always",
				}
				patch({
					endpoint: "/lol-settings/v2/local/lol-user-experience",
					data: userExperiencePayload,
					schemaVersion: 3,
				})
			}

			if (settings.notifications) {
				const notificationsPayload = {
					disableCollectionsNotifications: true,
					disableEsportsNotifications: true,
				}
				patch({
					endpoint: "/lol-settings/v2/account/LCUPreferences/lol-notifications",
					data: notificationsPayload,
					schemaVersion: 1,
				})
			}

			if (settings.notifications) {
				const partiesPayload = {
					championTradeToggleTooltipSeen: true,
					positionSwapToggleTooltipSeen: true,
					reportAndMutingTooltipShown: true,
					runeRecommenderTutorialTipSeen: true,
				}
				patch({
					endpoint: "/lol-settings/v2/account/LCUPreferences/lol-champ-select",
					data: partiesPayload,
					schemaVersion: 0,
				})
			}
		},
		false
	)
})()

import { jsx, render } from "https://cdn.jsdelivr.net/npm/nano-jsx/+esm"

const Version = 6

const UpdateAlert = () => {
	const title = ["Update Required"]
	const message = [
		'You must update League Client Debloater to continue. <a href="https://github.com/Cat1Bot/LeagueClientDebloater/releases" target="_blank">Click here</a> to get the latest version. After replacing with the new version, click reload.',
	]
	const refreshText = ["Reload"]
	const quitText = ["Quit"]
	const refresh = () => location.reload()
	const shutdown = () => fetch("/process-control/v1/process/quit", { method: "POST" })

	return jsx/*html*/ `
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
  `
};

(function checkUpdate() {
	if (!config.checkUpdate) return

	window.addEventListener("load", async () => {
		const delay = (t) => new Promise((r) => setTimeout(r, t))
		const manager = () => document.getElementById("lol-uikit-layer-manager-wrapper")

		try {
			const response = await fetch(
				"https://raw.githubusercontent.com/Cat1Bot/LeagueClientDebloater/refs/heads/main/updatecfg.json"
			)

			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.statusText}`)
			}

			const config = await response.json()

			let updateRequired = Version < config.minversion
			let modifyResponse = Version < config.latestversion

			if (updateRequired) {
				while (!manager()) {
					await delay(1200)
				}

				const root = document.createElement("div")
				render(UpdateAlert, root)
				manager().appendChild(root)
			}

			if (modifyResponse) {
				let _xhrOriginalOpen = XMLHttpRequest.prototype.open

				XMLHttpRequest.prototype.open = function (_, url) {
					if (url === "/lol-service-status/v1/ticker-messages") {
						let originalSend = this.send

						this.send = function (body) {
							let originalOnReadyStateChanged = this.onreadystatechange

							this.onreadystatechange = function (ev) {
								if (this.readyState === 4) {
									let originalContent = JSON.parse(this.responseText)

									const customMessage = {
										createdAt: "",
										heading: "Plugin Update Available",
										message:
											"A newer version of League Client Debloater is available. Click here to get the latest version.",
										severity: "warn",
										updatedAt: "",
									}

									originalContent.push(customMessage)

									const updatedContent = JSON.stringify(originalContent)

									Object.defineProperty(this, "responseText", {
										writable: true,
										value: updatedContent,
									})

									return originalOnReadyStateChanged.apply(this, [ev])
								}

								return originalOnReadyStateChanged.apply(this, arguments)
							}

							originalSend.apply(this, [body])
						}
					}

					_xhrOriginalOpen.apply(this, arguments)
				}
			}
		} catch (error) {
			console.error("Failed to load config:", error)
		}
	})
})();

// !!! BLOCK NOTIFICATIONS CODE !!!
class j {
	constructor(o) {
		this.Context = o
	}
}
let f
function E(e) {
	if (f != null) throw new Error("UPL is already initialized!")
	f = new j(e)
}
class g {
	constructor(o) {
		this._callback = o
	}
	trigger() {
		this._callback !== void 0 && (this._callback(), (this._callback = void 0))
	}
}
let u = {}
const x = new g(B)
function P(e, o) {
	x.trigger()
	var t = u[e]
	t === void 0 ? (u[e] = { pre_callback: o, post_callback: void 0 }) : (u[e].pre_callback = o)
}
function T(e, o) {
	x.trigger()
	var t = u[e]
	t === void 0 ? (u[e] = { pre_callback: void 0, post_callback: o }) : (u[e].post_callback = o)
}
function M(e, o) {
	P(e, (t, n, i) => {
		if (typeof n != "string")
			return console.error("UPL: Tried to hook text XHR request but body is not a string!"), i(n)
		o(n, (r) => {
			i(r)
		})
	})
}
function L(e, o) {
	T(e, (t, n) => {
		if (t.responseType !== "" && t.responseType !== "text")
			return console.error("UPL: Tried to hook text XHR request but response is not a string!"), n()
		const i = (r) => {
			t.responseText != r &&
				Object.defineProperty(t, "responseText", {
					writable: !0,
					value: r,
				}),
				n()
		}
		o(this.responseText, i)
	})
}
const U = XMLHttpRequest.prototype.open
function z(e, o) {
	var t = u[o.toString()]
	if (t !== void 0) {
		let n = this.send
		this.send = function (i) {
			if (i instanceof Document) return n.apply(this, [i])
			if (t.pre_callback !== void 0) {
				let r = (c) => {
					i = c
				}
				t.pre_callback(this, i || null, r)
			}
			if (t.post_callback !== void 0) {
				let r = this.onreadystatechange
				this.onreadystatechange = function (c) {
					if (this.readyState === 4 && t.post_callback !== void 0) {
						let h = () => {
							r.apply(this, [c])
						}
						t.post_callback(this, h)
						return
					}
					return r.apply(this, arguments)
				}
			}
			n.apply(this, [i])
		}
	}
	U.apply(this, arguments)
}
function B() {
	XMLHttpRequest.prototype.open = z
}
const D = Object.freeze(
	Object.defineProperty(
		{
			__proto__: null,
			hookPost: T,
			hookPre: P,
			hookTextPost: L,
			hookTextPre: M,
		},
		Symbol.toStringTag,
		{ value: "Module" }
	)
)
let O = {}
const H = new g(N)
function S(e, o) {
	H.trigger(), (O[e] = o)
}
function I(e, o) {
	S(e, (t, n) => {
		if (typeof t != "string")
			return console.error("UPL: Tried to hook text websocket endpoint but content is not a string!"), n(t)
		o(t, (i) => {
			n(i)
		})
	})
}
function N() {
	let e = f?.Context
	if (e == null) throw new Error("UPL is not initialized!")
	e.rcp.postInit("rcp-fe-common-libs", async (o) => {
		let t = o.getDataBinding
		o.getDataBinding = async function (n) {
			let i = await t.apply(this, arguments),
				r = function (c, h) {
					let a = i.apply(this, arguments),
						d = a.cache,
						y = d._triggerResourceObservers
					return (
						(d._triggerResourceObservers = function (l, p, m) {
							const _ = O[l]
							return _ == null
								? y.apply(this, [l, p, m])
								: _(p, (C) => {
										y.apply(this, [l, C, m])
								  })
						}),
						a
					)
				}
			return (
				(r.bindTo = function (c) {
					let h = i.bindTo.apply(this, arguments)
					return (h.dataBinding = r), h
				}),
				Promise.resolve(r)
			)
		}
	})
}
const R = Object.freeze(
		Object.defineProperty({ __proto__: null, hook: S, hookText: I }, Symbol.toStringTag, { value: "Module" })
	),
	v = new Map(),
	k = [],
	b = new g(J)
function q(e, o, t) {
	b.trigger()
	var n = { method: o, callback: t },
		i = v.get(e)
	i === void 0 ? v.set(e, { hooks: [n], mixins: [] }) : i.hooks.push(n)
}
function X(e, o, t) {
	b.trigger()
	var n = { method: o, callback: t }
	k.push({ matcher: e, entry: { hooks: [n], mixins: [] } })
}
function A(e, o) {
	b.trigger()
	var t = v.get(e)
	t === void 0 ? v.set(e, { hooks: [], mixins: [o] }) : t.mixins.push(o)
}
function K(e, o) {
	b.trigger(), k.push({ matcher: e, entry: { hooks: [], mixins: [o] } })
}
function J() {
	let e = f?.Context
	if (e == null) throw new Error("UPL is not initialized!")
	e.rcp.postInit("rcp-fe-ember-libs", async (o) => {
		const t = o.getEmber
		o.getEmber = function (...n) {
			const i = t.apply(this, n)
			return (
				i.then((r) => {
					const c = r.Component.extend
					return (
						(r.Component.extend = function (...h) {
							let a = c.apply(this, arguments)
							const d = h.filter((l) => typeof l == "object")
							for (const l of d) for (const p of k) p.matcher(l) && (a = w(r, p.entry, a))
							const y = d
								.filter((l) => l.classNames && Array.isArray(l.classNames))
								.map((l) => l.classNames.join(" "))
							for (const l of y) {
								const p = v.get(l)
								p !== void 0 && (a = w(r, p, a))
							}
							return a
						}),
						r
					)
				}),
				i
			)
		}
	})
}
function w(e, o, t) {
	const n = t.proto()
	if (n.__UPL_IS_HOOKED) return t
	n.__UPL_IS_HOOKED = !0
	for (const i of o.mixins) t = t.extend(i(e))
	for (const i of o.hooks) {
		const r = n[i.method]
		n[i.method] = function (...c) {
			const h = (...a) => {
				if (r != null) return r.apply(this, a)
			}
			return i.callback.call(this, e, h, ...c)
		}
	}
	return t
}
const G = Object.freeze(
		Object.defineProperty(
			{
				__proto__: null,
				extendClassByMatching: K,
				extendClassByName: A,
				hookComponentMethodByMatching: X,
				hookComponentMethodByName: q,
			},
			Symbol.toStringTag,
			{ value: "Module" }
		)
	),
	s = Object.freeze(
		Object.defineProperty({ __proto__: null, ember: G, ws: R, xhr: D }, Symbol.toStringTag, { value: "Module" })
	)
function Q(e) {
	if (e.rcp === void 0 || typeof e.rcp.preInit != "function" || typeof e.rcp.postInit != "function")
		throw new Error("context is not a valid Pengu Context!")
	E(e)
}
// ### INIT FUNCTION ###
function $(e) {
	Q(e),
		s.ws.hook("/lol-login/v1/session", (o, t) => {
			;(o.connected = !0), (o.state = "SUCCEEDED"), (o.error = null), t(o)
		}),
		s.xhr.hookPost("/lol-leaver-buster/v1/notifications", (o, t) => {
			const n = JSON.stringify({})
			Object.defineProperty(o, "responseText", {
				writable: !0,
				value: n,
			}),
				t()
		}),
		s.ws.hook("/lol-missions/v1/series", (o, t) => {}),
		s.ws.hook("/lol-missions/v1/missions", (o, t) => {}),
		s.ws.hook("/lol-platform-config/v1/namespaces/PlayerNotification", (o, t) => {}),
		s.ws.hook("/lol-ranked/v1/notifications", (o, t) => {}),
		s.ws.hook("/player-notifications/v1/notifications", (o, t) => {}),
		s.ws.hook("/lol-statstones/v1/vignette-notifications", (o, t) => {}),
		s.ws.hook("/lol-clash/v1/enabled", (o, t) => {}),
		s.ws.hook("/lol-clash/v1/visible", (o, t) => {}),
		s.ws.hook("/lol-clash/v1/ready", (o, t) => {}),
		s.ws.hook("/lol-clash/v1/notifications", (o, t) => {}),
		s.ws.hook("/lol-champion-mastery/v1/notifications", (o, t) => {}),
		s.ws.hook("/lol-pft/v2/survey", (o, t) => {}),
		s.ws.hook("/lol-challenges/v1/notifications", (o, t) => {}),
		s.ws.hook("/lol-remedy/v1/remedy-notifications", (o, t) => {}),
		s.ws.hook("/lol-player-behavior/v1/credibility-behavior-warnings", (o, t) => {}),
		s.ws.hook("/lol-player-behavior/v2/reform-card", (o, t) => {}),
		s.ws.hook("/lol-player-behavior/v1/reform-card", (o, t) => {}),
		s.ws.hook("/lol-player-behavior/v1/reporter-feedback", (o, t) => {}),
		s.ws.hook("/lol-player-behavior/v1/chat-restriction", (o, t) => {}),
		s.ws.hook("/lol-player-behavior/v1/code-of-conduct-notification", (o, t) => {})
}
export { $ as init }
