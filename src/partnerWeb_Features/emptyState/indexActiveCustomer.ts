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

export const ActiveCustomerEmptyStatePageBuilder = () => {
    const DS: Datastore = {
        emptyStateStack_ActiveCustomer: <StackProps>{
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
                    id: 'noDataIcon_ActiveCustomerEmpty',
                    type: WIDGET.ICON,
                },
                {
                    id: 'noDataText1_ActiveCustomerEmpty',
                    type: WIDGET.TEXT,
                },
                {
                    id: 'noDataText2_ActiveCustomerEmpty',
                    type: WIDGET.TEXT,
                },
                {
                    id: 'noDataText3_ActiveCustomerEmpty',
                    type: WIDGET.TEXT,
                },
            ],
        },
        noDataIcon_ActiveCustomerEmpty: <IconProps>{
            name: IconTokens.List,
            size: IconSizeTokens.XXXXXXXXL,
        },
        noDataText1_ActiveCustomerEmpty: <TypographyProps>{
            label: `No customers added`,
            fontFamily: FontFamilyTokens.Poppins,
            fontSize: FontSizeTokens.XXL,
            fontWeight: '600',
            lineHeight: 32,
            color: ColorTokens.Grey_Night,
        },
        noDataText2_ActiveCustomerEmpty: <TypographyProps>{
            label: `Customers will reflect as soon as they`,
            fontFamily: FontFamilyTokens.Inter,
            fontSize: FontSizeTokens.SM,
            fontWeight: '400',
            lineHeight: 20,
            color: ColorTokens.Grey_Charcoal,
        },
        noDataText3_ActiveCustomerEmpty: <TypographyProps>{
            label: `complete the loan application.`,
            fontFamily: FontFamilyTokens.Inter,
            fontSize: FontSizeTokens.SM,
            fontWeight: '400',
            lineHeight: 20,
            color: ColorTokens.Grey_Charcoal,
        },
    }
    return DS
}
