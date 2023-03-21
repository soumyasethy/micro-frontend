import { QUERY_PARAMS } from './constants'
import { User } from '../features/login/otp_verify/types'
import { Platform } from "react-native";

/**
 * Adding code for partner platform use-cases
 */

export const enum AppPlatform {
    SDK_INVESTWELL = 'SDK_INVESTWELL',
    FREO = 'FREO',
}

export const getParameters: (url: string) => {
    [key in string]: string
} = (url: string) => {
    const params = {}
    let paramString = url.split('?')[1]

    let queryString = (Platform.OS === 'web')? new URLSearchParams(paramString) : new Map();
    for (let pair of queryString.entries()) {
        params[pair[0].includes('/') ? pair[0].split('/')[1] : pair[0]] =
            pair[1].includes('/') ? pair[1].split('/')[0] : pair[1]
    }
    return params
}

export const isGoogleLoginEnabled = (user: User) => {
    if (
        user.linkedPlatformAccounts[0].platformCode ===
        AppPlatform.SDK_INVESTWELL
    ) {
        return false
    } else {
        return true
    }
}

export const shouldShowVoltBrandingSplashScreen = (url: string) => {
    if (url === '') return true;
    const params = getParameters(url)
    if (getPlatformName(params).includes(AppPlatform.SDK_INVESTWELL)) {
        return false
    } else {
        return true
    }
}

export const areWhatsappUpdatesAllowed = (url: string) => {
    if (url === '') return true;
    const params = getParameters(url)
    if (getPlatformName(params).includes(AppPlatform.SDK_INVESTWELL)) {
        return false
    } else {
        return true
    }
}

export const shouldShowVoltContactUs = (url: string) => {
    if (url === '') return true;
    const params = getParameters(url)
    if (getPlatformName(params).includes(AppPlatform.SDK_INVESTWELL)) {
        return false
    } else {
        return true
    }
}

export const getPlatformName = (params: any) => {
    return params[QUERY_PARAMS.PLATFORM] || ''
}

export const getContactNumberForCall = (url: string) => {
    const params = getParameters(url) || {}
    const platformName = getPlatformName(params)

    if (platformName === AppPlatform.FREO) {
        return '+916364465607'
    } else {
        return '+919611749097'
    }
}

export const getContactNumberForWhatsapp = (url: string) => {
    const params = getParameters(url) || {}
    const platformName = getPlatformName(params)

    if (platformName === AppPlatform.FREO) {
        return '916364465607'
    } else {
        return '919611749097'
    }
}
