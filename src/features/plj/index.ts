import {
    Datastore,
    Layout,
    LAYOUTS,
    PageType,
    POSITION,
    TemplateSchema,
} from '@voltmoney/types'
import {
    LottieProps,
    LottieSizeTokens,
    LottieTokens,
    WIDGET,
} from '@voltmoney/schema'
import { ROUTE } from '../../routes'
import { ACTION } from './types'
import { RedirectAction } from './actions'
export const template: TemplateSchema = {
    layout: <Layout>{
        id: ROUTE.PARTNER_LED_JOURNEY,
        type: LAYOUTS.LIST,
        widgets: [
            {
                id: 'lottie',
                type: WIDGET.LOTTIE,
                position: POSITION.ABSOLUTE_CENTER,
            },
        ],
    },
    datastore: <Datastore>{
        lottie: <LottieProps>{
            uri: LottieTokens.LoadingSplash,
            size: LottieSizeTokens.XXXL,
            autoplay: true,
        },
    },
}

let copyExtraProps = {}
export const partnerLedJourney: PageType<any> = {
    onLoad: async (_, extraProps) => {
        copyExtraProps = extraProps
        return Promise.resolve(template)
    },
    actions: { [ACTION.REDIRECT_ACTION]: RedirectAction },
    action: {
        routeId: ROUTE.PARTNER_LED_JOURNEY,
        type: ACTION.REDIRECT_ACTION,
        payload: { ...copyExtraProps },
    },
    actionDelay: 0,
}
