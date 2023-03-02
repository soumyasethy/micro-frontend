import { Datastore } from '@voltmoney/types'
import {
    ColorTokens,
    FontFamilyTokens,
    FontSizeTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    SizeTypeTokens,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    StackWidth,
    TypographyProps,
    WIDGET,
} from '@voltmoney/schema'

export const ReferredPartnerEmptyStatePageBuilder = () => {
    const DS: Datastore = {
        emptyStateStack_ReferredPartner: <StackProps>{
            type: StackType.column,
            width: StackWidth.MATCH_PARENT,
            justifyContent: StackJustifyContent.center,
            alignItems: StackAlignItems.center,
            padding: {
                top: SizeTypeTokens.XL,
                bottom: SizeTypeTokens.XL,
                horizontal: SizeTypeTokens.XL,
            },
            widgetItems: [
                {
                    id: 'noDataIcon_ReferredPartnerEmpty',
                    type: WIDGET.ICON,
                },
                {
                    id: 'noDataText1_ReferredPartnerEmpty',
                    type: WIDGET.TEXT,
                },
                {
                    id: 'noDataText2_ReferredPartnerEmpty',
                    type: WIDGET.TEXT,
                },
                {
                    id: 'noDataText3_ReferredPartnerEmpty',
                    type: WIDGET.TEXT,
                },
            ],
        },
        noDataIcon_ReferredPartnerEmpty: <IconProps>{
            name: IconTokens.List,
            size: IconSizeTokens.XXXXXXXXL,
        },
        noDataText1_ReferredPartnerEmpty: <TypographyProps>{
            label: `No partners added`,
            fontFamily: FontFamilyTokens.Poppins,
            fontSize: FontSizeTokens.XXL,
            fontWeight: '600',
            lineHeight: 32,
            color: ColorTokens.Grey_Night,
        },
        noDataText2_ReferredPartnerEmpty: <TypographyProps>{
            label: `Partners will reflect as soon as they register.`,
            fontFamily: FontFamilyTokens.Inter,
            fontSize: FontSizeTokens.SM,
            fontWeight: '400',
            lineHeight: 20,
            color: ColorTokens.Grey_Charcoal,
        },
        noDataText3_ReferredPartnerEmpty: <TypographyProps>{
            label: ``,
            fontFamily: FontFamilyTokens.Inter,
            fontSize: FontSizeTokens.SM,
            fontWeight: '400',
            lineHeight: 20,
            color: ColorTokens.Grey_Charcoal,
        },
    }
    return DS
}
