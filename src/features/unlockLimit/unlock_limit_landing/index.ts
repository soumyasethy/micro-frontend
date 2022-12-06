import {
    Datastore,
    Layout,
    LAYOUTS,
    PageType,
    POSITION,
    TemplateSchema,
    WidgetProps,
} from "@voltmoney/types";
import {
    AmountCardProps,
    ButtonProps,
    ButtonTypeTokens,
    ButtonWidthTypeToken,
    CardProps,
    ColorTokens,
    FontFamilyTokens,
    FontSizeTokens,
    ImageProps,
    ResizeModeToken,
    ShadowTypeTokens,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
    ACTION,
    LimitPayload,
} from "./types";
import { continueLimit, modifyLimit } from "./actions";
import { fetchPledgeLimitRepo } from "./repo";
import { roundDownToNearestHundred } from "../../../configs/utils";


export const template: (
    availableCreditAmount: number
) => TemplateSchema = (
    availableCreditAmount
) => ({
    layout: <Layout>{
        id: ROUTE.UNLOCK_LIMIT_LANDING,
        type: LAYOUTS.LIST,
        widgets: [
            { id: "space0", type: WIDGET.SPACE },
            { id: "space1", type: WIDGET.SPACE },
            { id: "welcomeStack", type: WIDGET.STACK },
            { id: "space2", type: WIDGET.SPACE },
            { id: "amount", type: WIDGET.AMOUNTCARD },
            {
                id: "cardItem",
                type: WIDGET.CARD,
                position: POSITION.ABSOLUTE_BOTTOM
            }
        ],
    },
    datastore: <Datastore>{

        space0: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
        space1: <SpaceProps>{ size: SizeTypeTokens.XXXXXL },
        welcomeStack: <StackProps>{
            type: StackType.column,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.center,
            widgetItems: [
                { id: "greetingText", type: WIDGET.TEXT },
                { id: "infoText", type: WIDGET.TEXT },
            ]
        },
        greetingText: <TypographyProps>{
            label: "Congratulations!",
            fontSize: FontSizeTokens.SM,
            lineHeight: 24,
            color: ColorTokens.Grey_Night,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "600",
        },
        infoText: <TypographyProps>{
            label: "We have evaluated your portfolio",
            fontSize: FontSizeTokens.SM,
            lineHeight: 24,
            color: ColorTokens.Grey_Night,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "600",
        },
        space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        amount: <AmountCardProps>{
            title: "Approved cash limit",
            shadow: ShadowTypeTokens.E5,
            subTitle: `${roundDownToNearestHundred(availableCreditAmount)}`.replace(
                /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
                ","
            ),
            chipText: "How?",
            type: "default",
        },
        cardItem: <CardProps>{
            bgColor: ColorTokens.White,
            padding: {
            },
            body: {
                widgetItems: [
                    { id: "unlockItem", type: WIDGET.BUTTON },
                    { id: "space3", type: WIDGET.SPACE },
                    { id: "portfolioItem", type: WIDGET.BUTTON },
                    { id: "space4", type: WIDGET.SPACE },
                    { id: "imageStack", type: WIDGET.STACK },
                ],
            },
        },
        unlockItem: <ButtonProps & WidgetProps>{
            label: "Unlock limit now",
            fontFamily: FontFamilyTokens.Inter,
            fontSize: SizeTypeTokens.LG,
            type: ButtonTypeTokens.LargeFilled,

            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.UNLOCK_LIMIT,
                payload: <LimitPayload>{
                    value: {},
                    widgetId: "continue",
                    isResend: false,
                },
                routeId: ROUTE.UNLOCK_LIMIT_LANDING,
            },
        },
        space3: <SpaceProps>{ size: SizeTypeTokens.XL },
        portfolioItem: <ButtonProps & WidgetProps>{
            label: "Add more portfolio",
            fontFamily: FontFamilyTokens.Inter,
            type: ButtonTypeTokens.LargeOutline,
            width: ButtonWidthTypeToken.FULL,
            labelColor: ColorTokens.Primary_100,
            action: {
                type: ACTION.MODIFY_LIMIT,
                payload: <{}>{
                    value: {},
                    widgetId: "continue",
                    isResend: false,
                },
                routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
            },
        },
        space4: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        imageStack: <StackProps>{
            type: StackType.row,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.center,
            widgetItems: [
                { id: "image1", type: WIDGET.IMAGE },
                { id: "space5", type: WIDGET.SPACE },
                { id: "image2", type: WIDGET.IMAGE },
                { id: "space6", type: WIDGET.SPACE },
                { id: "image3", type: WIDGET.IMAGE },
                { id: "space7", type: WIDGET.SPACE },
                { id: "image4", type: WIDGET.IMAGE },
            ],
        },
        image1: <ImageProps>{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAALCAYAAAAqaE4dAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMFSURBVHgB5VVLbtswEB1Klrvoor5BdYPqBnFP4OQEUYD8gC7CoKuiDeIgny6t7oImRewT2D2B7RPEuYF6A3XZSCL7nj6NYdhAgm6CdgCaNDEzfDPvkVIC29anbakskzzuR91YnoGFutvC1FrEs6PPg6vo4+wxOZx9/dl3xLlxRNocTfHGu/p0XZ6BNcQNmuKGi/tKZCiPtAZ/rNj4Kjrqco3ujFA31yP+39Zn2hHbupe8z06SbSVOwg6GaE5TsuBrdDRitz3x1rHf57ohjZDxmWQjxrHrVgwYUYESNWE89kIlxrfijGpG5mOJaxXwEPmaYtYRG/NM5mcuYilxlzidxcAUm0j9ius9fX6jxPpGZAJmhw9SNiF/X4g5RjN6XLviUgFrLNqT5pDgUEjCuEpqAOD0uP9S0nhXXyDOBMyNont1bvjflmfYGRg8kJXM2DZjcUYHuXSKnHbOH3iOXUmTgkE4+ZBltwLfsaK+EJRBcWD2bdWRQ1eczV+SHoKpoiiDOHRt+u792essV51czMCDzCGhiSc5GMnBgrdGqZXn2MG3qsPoeNuVfIPrXJwBc+MM+MvddfQpqnyQX/xlBUIZVFQCnDM2BetoT18UzGXSiA2yXkE5FYM2IdUcjqQbpBxF4G6q+KFjDLI+k2I/YSJIFzFqkuayAWDBdXQ0oUwoQyNuyAFZ/lCFKig5U8y89wDeqn0YAzamVYP/nGnn1guWEAcXnHF2UjYqP+E74olpA8OAe06ZSHin+hyX1YtVUi7tSl4IZpC9q9bf8TD1MszwAyNqE4BnJauUjU1wF7ocOfaZax7dZfSh+I97HdHnXhp9FpMVrLtvaj+yuqLAVi1pXgkSVLKaz0BSh3hKXFWBy6zqzAlf1fIuqg4kFZWJsj6mAB2b0I93rWaALBoxP3f0xZgDbB/U3Z43+GzxrjI3Hotho/w8IVc+hTRvGQt1tJZhwz6UVty9IWNdybZqzMg8pbKWnbnS9nXXlyeaBvO6Yv+puf8mlg2b/67/U0ZGd/TZWP4n+w3FgaeRoKJkaAAAAABJRU5ErkJggg==',
            height: 16,
            width: 56,
            resizeMode: ResizeModeToken.CONTAIN,
            padding: SizeTypeTokens.NONE,
        },
        space5: <SpaceProps>{ size: SizeTypeTokens.LG },
        image2: <ImageProps>{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAXCAYAAABAtbxOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAcISURBVHgB3VdrbBTXFf7unYcXZ4MX1zEKhgZo0hLATzmItoQamR8pUqtGTZU2DdgLJEUbPyGJ1EqVVlWjNk0Cbmwt1KXBNnZVpZVatf+iNN2WyiEPAeuAAxiMgeBA4oTFa6+9OzP35szMYmN2nTjK5g+ftLN3zpz7nce9c+4Z4BYFyyjtHpgPjFdD8vsh5CJSY1DYAJLiNWwtfW1aUTJ0vbM7I4fEy6gpeR2dx14A4zxdQYzR5SgGS/+JIDMd0YGjS6EojRn5Euy30C2VuJ5MGfgNtpR+gDkH1tm3EVzsJ5/vmmXGISSszdhecR6SAjvYJzLqSbkNNWUvUWBJyouGWSFPI6Gsx2PFV9D51how/Y3MamYpoJN9EXEFWjG2rDw+G6s6466rr5YYDtgLQRmPgsl2CHGCsqiTo9Wk8TA9ux+6EsafTn6bgnwfB8QGZ67CX6brHWT5V7Cs/2BCicx0DJ20+oddq7QDJMpJuJ30vw5d/IGkP4BQT9NK2nw+4vu7O5Fvh2WeRezKKeQt+QbmiOnAek4thzX5kjMW8l8wlMecLE5jP22Vn0Plb1CQS6FO/pqc2go/wm5SUnFw1o8t5eF0U/JV+Mu6Z4i6Iv103UMJ+i4OnPPAvyxK92H09N8Fy3B1GHsb/nKXvPMdzBXTe99K/NKmoUwOQTF/dlNQLvzlQzAZrRouk+o69BxagDlDSRcx/mZqpCPnIy+yCHfF7Gyx0Y3ksB3qM9hc+f6sM/zFYbreiWxAik3ugA3ikcoRZBFuYHpsFSwsdsZC9uHLABe76B3edoPkaxTZEvqPUoAPIctwAzOFYld0V8KzmrkpSJTB2RJpGKVdsgZ26c8i3HdMyKt2fU6Ni/Dl4BnaFd+c+gnrOxTn8yT/KlXafVSYqpBFpKqi7yLktfNUOpZSeX+ABIc+dZZzLBAs6x9UUKKYCyQ/Se/n4Zuk/yOulfRwE1XTHwKpCpsFuCvmXzZJ1784Y8Z3oqdv+awzuvqanbMOcje0hMAXx1nXLstHFjFd7rXJFmK3q6EHlvw3dQwb0rS7Ik0U0HPuDevGo2tHMWdY6aKDx+8mvs3ujTyFLGJmS9V5rJwkr5C4ICX5P/0GKZucKtd9JL9+8r+KBH8UeR6BibEnUlRPkV4uzf+b061I1ovaslduaKlsrvemLTMPvdZVsLsMu4BYohSqlgdhPOjIGL/eM+4j21egsb9S06BMtVQM1LOy9MSa8afhXzuQ3iv++QSVfqONHKtCeh5iZOSPuDb8CzRsSqD7yEoI5QQywS4MNaVPfXavSMEy/jA2F/eiM1JDDndk5pM/pkP+3elecRZI61uoqXhdTXvwyCrb0Q3ojiyGoH6OSXIe42RwAEasF9vWxaZ0DTZMZfTBjAYYfQ04hthDtILp3T2TAlI9B3/JdJ8kxH/pmpkPxmH7fZn9eQo5YgC3Mpyt+PjjuwpU1aik4Sgld3jfvpahTMqBQMAbCoXGZiNraNhZLaUxFIvFLnm9vrV05ufTl82FtrY9b+NzIBBovjsU2nOmtrbWk5u7YLE9vv6sru7pRWMFuR93BIOTn8bhbEVdBxULPtnW1tJbX9/Y0NTU1GVZfJlpTgwxxnI0TZPj40Jjql4dCDRFQqGWY/a82mDQk/tBdEUs9tHA7QQpZcX4uHy3o6PDNhoOBBoe0HV+prGxcaEQ6lcUxRpOJuU9/f2Ro8tXry40R2XitttE3t69ewd37NhRqGm5Ra2tu49KLlfT/DM+n89jmnL11q11ca+X5xuGcUlVk/GO4O8myUefzRUK/f6tQFPTvTKRSBiGmty/v9UpUDP2flVVlSrAnO+Fy5cvntA0z3oKbL5lsVWJRM5VLq1LhYW+k9f1vdHoBtOMn54/f8FPc3JyrgkhLw8OHp/xVdvS0hIVQvl+IgFHbgdVUlL2k1wolXl5/B5V9SzZ0dxcxPm8sgluDVPi7r05+7letZmSdoGpOdWmibJgMKhbFjZS4s/V1TX+iJuSeLxs3jxlRV1d3aIZgdG3ZVlJScUaDqtHCFG+cGHRffSv02olqYYOHzz4/LhUYAZv2ALMgq+9vT1ORfjCuE7rrjAjHA6bNzumKGKgvf2FEdM0K4qLKyql5AvsUm1Z1pCiyAiX8g7GkkNUOheqKl+kcdxuz0syVsC5mIRgZ1tbW0e5hNPHjoyMFCiK5wjZHqHEX7W5WlufO0vBjghVLZwKTIiJqLQQfvHF3b02Aa1QXNOYQZNU8nqMAnTaJi7E4BONu9bbK+vOY3319TvXSqmI9mefvUYH+/kbAyKnhhwHk3DmE59BXJQP8aFlSbsZGIvH40lyPcq5fqcqeB4l8QLZP1Lf/OT3pGkW5efn07kqT7r2QKvP3mtraxs2jPiKQGDXOs7lxRQXkoo+YnPhVsYnz7v+mHc4nHoAAAAASUVORK5CYII=',
            height: 23,
            width: 54,
            resizeMode: ResizeModeToken.CONTAIN,
            padding: SizeTypeTokens.NONE,
        },
        space6: <SpaceProps>{ size: SizeTypeTokens.LG },
        image3: <ImageProps>{
            uri: 'data:image/png;base64,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',
            height: 21,
            width: 21,
            resizeMode: ResizeModeToken.CONTAIN,
            padding: SizeTypeTokens.NONE,
        },
        space7: <SpaceProps>{ size: SizeTypeTokens.LG },
        image4: <ImageProps>{
            uri: 'data:image/png;base64,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',
            height: 23,
            width: 48,
            resizeMode: ResizeModeToken.CONTAIN,
            padding: SizeTypeTokens.NONE,
        },

    },
});

export const unlockLimitLandingMF: PageType<any> = {
    onLoad: async ({ }, { response }) => {
        const responseX = response ? response.data : await fetchPledgeLimitRepo();
        const availableCreditAmount: number =
            responseX.stepResponseObject.availableCreditAmount || 0;
        return Promise.resolve(
            template(availableCreditAmount)
        );
    },

    actions: {
        [ACTION.UNLOCK_LIMIT]: continueLimit,
        // [ACTION.MODIFY_LIMIT]: modifyLimit,
    },
};
