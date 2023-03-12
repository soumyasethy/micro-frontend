import { QUERY_PARAMS } from './constants'
import SharedPropsService from '../SharedPropsService'
import { User } from '../features/login/otp_verify/types'

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

    let queryString = new URLSearchParams(paramString)
    for (let pair of queryString.entries()) {
        params[pair[0].includes('/') ? pair[0].split('/')[1] : pair[0]] =
            pair[1].includes('/') ? pair[1].split('/')[0] : pair[1]
    }
    console.log('Query =>', params, queryString)
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
    const params = getParameters(url)
    if (params[QUERY_PARAMS.PLATFORM].includes(AppPlatform.SDK_INVESTWELL)) {
        return false
    } else {
        return true
    }
}

export const areWhatsappUpdatesAllowed = (url: string) => {
    const params = getParameters(url)
    if (params[QUERY_PARAMS.PLATFORM].includes(AppPlatform.SDK_INVESTWELL)) {
        return false
    } else {
        return true
    }
}

export const shouldShowVoltContactUs = (url: string) => {
    const params = getParameters(url)
    if (params[QUERY_PARAMS.PLATFORM].includes(AppPlatform.SDK_INVESTWELL)) {
        return false
    } else {
        return true
    }
}
