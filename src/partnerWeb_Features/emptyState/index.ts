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

export const EmptyStatePageBuilder = () => {
    const DS: Datastore = {
        emptyStateStack: <StackProps>{
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
                    id: 'noDataIcon',
                    type: WIDGET.ICON,
                },
                {
                    id: 'noDataText1',
                    type: WIDGET.TEXT,
                },
                {
                    id: 'noDataText2',
                    type: WIDGET.TEXT,
                },
                {
                    id: 'noDataText3',
                    type: WIDGET.TEXT,
                },
            ],
        },
        noDataIcon: <IconProps>{
            name: IconTokens.List,
            size: IconSizeTokens.XXXXXXXXL,
        },
        noDataText1: <TypographyProps>{
            label: `No clients added`,
            fontFamily: FontFamilyTokens.Poppins,
            fontSize: FontSizeTokens.XXL,
            fontWeight: '600',
            lineHeight: 32,
            color: ColorTokens.Grey_Night,
        },
        noDataText2: <TypographyProps>{
            label: `Clients will reflect as soon as you start`,
            fontFamily: FontFamilyTokens.Inter,
            fontSize: FontSizeTokens.SM,
            fontWeight: '400',
            lineHeight: 20,
            color: ColorTokens.Grey_Charcoal,
        },
        noDataText3: <TypographyProps>{
            label: `creating the loan application.`,
            fontFamily: FontFamilyTokens.Inter,
            fontSize: FontSizeTokens.SM,
            fontWeight: '400',
            lineHeight: 20,
            color: ColorTokens.Grey_Charcoal,
        },
    }
    return DS
}
