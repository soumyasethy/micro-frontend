import { ActionFunction } from '@voltmoney/types'
import { ROUTE } from '../../routes'

export const RedirectAction: ActionFunction<any> = async (
    action,
    _datastore,
    { navigate, asyncStorage },
): Promise<any> => {
    window.addEventListener('message', async function (event) {
        if (event.data.hasOwnProperty('jwt')) {
            await asyncStorage.set('access_token', event.data.jwt)
            await navigate(ROUTE.SPLASH_SCREEN, action.payload)
        }
    })
}
