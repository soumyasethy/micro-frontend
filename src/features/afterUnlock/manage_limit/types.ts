import { CreditApplicationType } from '../../../configs/config'

export enum ACTION {
    TRANSACTION = 'TRANSACTION',
    NAVIGATION = 'NAVIGATION',
    EMAIL = 'EMAIL',
    ENHANCE_LIMIT = 'ENHANCE_LIMIT',
    MARGIN_CALL = 'MARGIN_CALL',

    MENU = 'MENU',
}

export type EnhanceLimitPayload = {
    borrowerAccountId: string
    applicationType: CreditApplicationType
}

export type manageLimitPayload = {
    value: string
    widgetId: string
    isResend?: boolean
}

export type NavPayload = {
    value: number
}
