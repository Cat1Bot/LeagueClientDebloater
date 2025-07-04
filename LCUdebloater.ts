import * as upl from 'pengu-upl';

export function init(context: any) {
    upl.init(context);
    upl.hooks.xhr.hookPost(`/lol-client-config/v3/client-config/lol.client_settings.display_legacy_patch_numbers`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: true });
        original();
    });
    upl.hooks.xhr.hookPost(`/lol-clash/v1/visible`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: false });
        original();
    });
    upl.hooks.xhr.hookPost(`/lol-client-config/v3/client-config/lol.client_settings.client_navigability.info_hub_disabled`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: true });
        original();
    });
    upl.hooks.xhr.hookPost(`/lol-lobby/v1/autofill-displayed`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: true });
        original();
    });
    upl.hooks.xhr.hookPost(`/lol-client-config/v3/client-config/lol.client_settings.paw.enableRPTopUp`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: false });
        original();
    });
    upl.hooks.xhr.hookPost(`/lol-client-config/v3/client-config/lol.client_settings.loot.enable_mythic_shoppefront`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: false });
        original();
    });
    upl.hooks.xhr.hookPost(`/client-config/v2/config/lol.client_settings.loot.enable_mythic_shoppefront`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: false });
        original();
    });
    upl.hooks.xhr.hookPost(`/lol-platform-config/v1/namespaces/LcuChampionSelect/PickOrderSwappingTooltipEnabled`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: false });
        original();
    });	
    upl.hooks.xhr.hookPost(`/lol-platform-config/v1/namespaces/LcuChampionSelect/ChampTradingTooltipEnabled`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: false });
        original();
    });
    upl.hooks.xhr.hookPost(`/lol-perks/v1/show-auto-modified-pages-notification`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: false });
        original();
    });
    upl.hooks.xhr.hookPost(`/lol-platform-config/v1/namespaces/LeagueConfig/RankedReferenceModalEnabled`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: false });
        original();
    });
    upl.hooks.xhr.hookPost(`/lol-lobby-team-builder/champ-select/v1/has-auto-assigned-smite`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: false });
        original();
    });
    upl.hooks.xhr.hookPost(`/lol-client-config/v3/client-config/lol.client_settings.champ_select.enable_ability_previews`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: false });
        original();
    });
    upl.hooks.xhr.hookPost(`/lol-lock-and-load/v1/should-wait-for-home-hubs`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: false });
        original();
    });
    upl.hooks.xhr.hookPost(`/lol-lock-and-load/v1/should-show-progress-bar-text`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: false });
        original();
    });
    upl.hooks.xhr.hookPost(`/lol-client-config/v3/client-config/lol.client_settings.champ_select.enable_ability_previews`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: false });
        original();
    });
    upl.hooks.xhr.hookPost(`/lol-client-config/v3/client-config/lol.client_settings.champ_select.enable_ability_previews`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: false });
        original();
    });
    upl.hooks.xhr.hookPost(`/lol-platform-config/v1/namespaces/Challenges/ClientState`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: "Disabled" });
        original();
    });
    upl.hooks.xhr.hookPost(`/lol-challenges/v1/client-state`, (xhr, original) => {
        Object.defineProperty(xhr, 'responseText', { writable: true, value: "Disabled" });
        original();
    });
	upl.hooks.xhr.hookPost('/deep-links/v1/settings', (xhr, original) => {
		const modifiedResponse = JSON.stringify({
			externalClientScheme: 'riotclient',
			isSchemeReady: true,
			launchLorEnabled: false,
			launchLorUrl: '/product/launch/v1/bacon'
		});
		Object.defineProperty(xhr, 'responseText', { writable: true, value: modifiedResponse });
		original();
	});
	upl.hooks.xhr.hookPost('/lol-premade-voice/v1/availability', (xhr, original) => {
		const modifiedResponse = JSON.stringify({
			connectedToVoiceServer: false,
			disabledAfterLogin: false,
			enabled: false,
			showDisconnectedState: false,
			showUI: false,
			voiceChannelAvailable: false
		});
		Object.defineProperty(xhr, 'responseText', { writable: true, value: modifiedResponse });
		original();
	});
	upl.hooks.xhr.hookPost('/lol-platform-config/v1/namespaces/Missions', (xhr, original) => {
		const modifiedResponse = JSON.stringify({
			EligibilityInventoryTypes: [],
			MissionsEnabled: false,
			disabledAfterLogin: false,
			MissionsFrontEndEnabled: false,
			MissionsPollingTime: 3600,
			MissionsTabTrackerEnabled: false,
			MissionsUseV4Api: false,
			SendSimpleInventoryTokens: false
		});
		Object.defineProperty(xhr, 'responseText', { writable: true, value: modifiedResponse });
		original();
	});
	upl.hooks.xhr.hookPost('/lol-settings/v2/config', (xhr, original) => {
		const modifiedResponse = JSON.stringify({
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
		Object.defineProperty(xhr, 'responseText', { writable: true, value: modifiedResponse });
		original();
	});
	upl.hooks.xhr.hookPost('/lol-client-config/v3/client-config/lol.client_settings.nacho.active_banners', (xhr, original) => {
		const modifiedResponse = JSON.stringify({
			bannerList: [{}],
			enabled: false
		});
		Object.defineProperty(xhr, 'responseText', { writable: true, value: modifiedResponse });
		original();
	});
	upl.hooks.xhr.hookPost('/lol-client-config/v3/client-config/lol.client_settings.sentry_config', (xhr, original) => {
		const modifiedResponse = JSON.stringify({
			dsn: "",
			isEnabled: false,
			sampleRate: 0
		});
		Object.defineProperty(xhr, 'responseText', { writable: true, value: modifiedResponse });
		original();
	});
	upl.hooks.xhr.hookPost('/lol-client-config/v3/client-config/lol.client_settings.errormonitor', (xhr, original) => {
		const modifiedResponse = JSON.stringify({
			isEnabled: false,
			isEnabledFoundation: false,
			isEnabledUX: false,
			pollRateMs: 1000,
		});
		Object.defineProperty(xhr, 'responseText', { writable: true, value: modifiedResponse });
		original();
	});
	upl.hooks.xhr.hookPost('/lol-client-config/v3/client-config/lol.client_settings.datadog_rum_config', (xhr, original) => {
		const modifiedResponse = JSON.stringify({
			applicationID: "",
			clientToken: "",
			defaultPrivacyLevel: "mask",
			enablePrivacyForActionName: false,
			isEnabled: false,
			service: "",
			sessionReplaySampleRate: 0,
			sessionSampleRate: 0,
			site: "",
			telemetrySampleRate: 0,
			traceSampleRate: 0,
			trackFoundationErrors: false,
			trackLongTasks: false,
			trackResources: false,
			trackUserInteractions: false
		});
		Object.defineProperty(xhr, 'responseText', { writable: true, value: modifiedResponse });
		original();
	});
}