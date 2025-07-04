import * as upl from 'pengu-upl';

export function init(context: any) {
    upl.init(context);

    const booleanResponses: Record<string, string[]> = {
        true: [
            '/lol-client-config/v3/client-config/lol.client_settings.display_legacy_patch_numbers',
            '/lol-client-config/v3/client-config/lol.client_settings.client_navigability.info_hub_disabled',
            '/lol-lobby/v1/autofill-displayed',
        ],
        false: [
            '/lol-clash/v1/visible',
            '/lol-client-config/v3/client-config/lol.client_settings.paw.enableRPTopUp',
            '/lol-client-config/v3/client-config/lol.client_settings.loot.enable_mythic_shoppefront',
            '/client-config/v2/config/lol.client_settings.loot.enable_mythic_shoppefront',
            '/lol-platform-config/v1/namespaces/LcuChampionSelect/PickOrderSwappingTooltipEnabled',
            '/lol-platform-config/v1/namespaces/LcuChampionSelect/ChampTradingTooltipEnabled',
            '/lol-perks/v1/show-auto-modified-pages-notification',
            '/lol-platform-config/v1/namespaces/LeagueConfig/RankedReferenceModalEnabled',
            '/lol-lobby-team-builder/champ-select/v1/has-auto-assigned-smite',
            '/lol-client-config/v3/client-config/lol.client_settings.champ_select.enable_ability_previews',
            '/lol-lock-and-load/v1/should-wait-for-home-hubs',
            '/lol-lock-and-load/v1/should-show-progress-bar-text',
        ]
    };

    for (const [key, endpoints] of Object.entries(booleanResponses)) {
        const value = key === 'true';
        for (const endpoint of endpoints) {
            upl.hooks.xhr.hookPost(endpoint, (xhr, original) => {
                Object.defineProperty(xhr, 'responseText', { writable: true, value });
                original();
            });
        }
    }

    const stringOverrides: Record<string, string[]> = {
        Disabled: [
            '/lol-platform-config/v1/namespaces/Challenges/ClientState',
            '/lol-challenges/v1/client-state'
        ]
    };

    for (const [value, endpoints] of Object.entries(stringOverrides)) {
        for (const endpoint of endpoints) {
            upl.hooks.xhr.hookPost(endpoint, (xhr, original) => {
                Object.defineProperty(xhr, 'responseText', { writable: true, value });
                original();
            });
        }
    }

    const jsonOverrides: Record<string, object> = {
        '/deep-links/v1/settings': {
            externalClientScheme: 'riotclient',
            isSchemeReady: true,
            launchLorEnabled: false,
            launchLorUrl: '/product/launch/v1/bacon'
        },
        '/lol-premade-voice/v1/availability': {
            connectedToVoiceServer: false,
            disabledAfterLogin: false,
            enabled: false,
            showDisconnectedState: false,
            showUI: false,
            voiceChannelAvailable: false
        },
        '/lol-platform-config/v1/namespaces/Missions': {
            EligibilityInventoryTypes: [],
            MissionsEnabled: false,
            disabledAfterLogin: false,
            MissionsFrontEndEnabled: false,
            MissionsPollingTime: 3600,
            MissionsTabTrackerEnabled: false,
            MissionsUseV4Api: false,
            SendSimpleInventoryTokens: false
        },
        '/lol-settings/v2/config': {
            isGameplayEnabled: true,
            isHotkeysEnabled: true,
            isInterfaceEnabled: true,
            isLegalStatementsEnabled: false,
            isPrivacyNoticeEnabled: false,
            isReplaysEnabled: true,
            isSoundEnabled: true,
            isTermsEnabled: false,
            localizedLicensesURL: ""
        },
        '/lol-client-config/v3/client-config/lol.client_settings.nacho.active_banners': {
            bannerList: [{}],
            enabled: false
        },
        '/lol-client-config/v3/client-config/lol.client_settings.sentry_config': {
            dsn: "",
            isEnabled: false,
            sampleRate: 0
        },
        '/lol-client-config/v3/client-config/lol.client_settings.errormonitor': {
            isEnabled: false,
            isEnabledFoundation: false,
            isEnabledUX: false,
            pollRateMs: 1000
        },
        '/lol-client-config/v3/client-config/lol.client_settings.datadog_rum_config': {
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
        }
    };

    for (const [endpoint, obj] of Object.entries(jsonOverrides)) {
        const jsonStr = JSON.stringify(obj);
        upl.hooks.xhr.hookPost(endpoint, (xhr, original) => {
            Object.defineProperty(xhr, 'responseText', { writable: true, value: jsonStr });
            original();
        });
    }
}
