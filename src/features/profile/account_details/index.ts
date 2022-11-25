import {
    Datastore,
    Layout,
    LAYOUTS,
    PageType,
    POSITION,
    TemplateSchema
} from "@voltmoney/types";
import _ from "lodash";
import {
    AspectRatioToken,
    BorderRadiusTokens,
    ColorTokens,
    DividerProps,
    DividerSizeTokens,
    FontFamilyTokens,
    FontSizeTokens,
    HeaderProps,
    IconTokens,
    ImageProps,
    ImageSizeTokens,
    ListItemProps,
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
import { ACTION, AccountPayload } from "./types";
import { goBack } from "./actions";
import { ProfileDetails } from "../my_profile/types";
import { maskSensitiveDetails } from "../../../configs/utils";
export const template: (
    profileData: ProfileDetails
) => TemplateSchema = (profileData
    ) => {
        return {
            layout: <Layout>{
                id: ROUTE.ACCOUNT_DETAILS,
                type: LAYOUTS.LIST,
                widgets: [
                    { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
                    { id: "list1", type: WIDGET.LIST_ITEM },
                    { id: "list2", type: WIDGET.LIST_ITEM },
                    { id: "list3", type: WIDGET.LIST_ITEM },
                    { id: "list4", type: WIDGET.LIST_ITEM },
                    { id: "space1", type: WIDGET.SPACE },
                    { id: "categoryList", type: WIDGET.TEXT },
                    { id: "space2", type: WIDGET.SPACE },
                    { id: "headStack", type: WIDGET.STACK,padding:{
                        horizontal:10,left:10,right:10,all:10
                    } },
                    { id: "space3", type: WIDGET.SPACE },
                    { id: "divider1", type: WIDGET.DIVIDER },
                    { id: "space4", type: WIDGET.SPACE },
                    { id: "list5", type: WIDGET.LIST_ITEM,padding:{
                        horizontal:4,left:4,right:4
                    }  },
                    { id: "list6", type: WIDGET.LIST_ITEM,padding:{
                        horizontal:4,left:4,right:4
                    }  },

                ],
            },
            datastore: <Datastore>{
                header: <HeaderProps>{
                    title: "Account details",
                    leadIcon: "https://reactnative.dev/img/tiny_logo.png",
                    isBackButton: true,
                    type: "DEFAULT",
                    action: {
                        type: ACTION.BACK_BUTTON,
                        payload: <{}>{
                            value: "",
                            widgetId: "continue",
                            isResend: false
                        },
                        routeId: ROUTE.ACCOUNT_DETAILS,
                    },
                },
                list1: <ListItemProps>{
                    title: 'Name',
                    subTitle: `${profileData.name}`,
                    isDivider:true,
                    leadIconName: IconTokens.User,
                    onPress: () => { },
                },
                list2: <ListItemProps>{
                    title: 'Mobile Number',
                    subTitle: `${profileData.phoneNumber}`,
                    isDivider:true,
                    leadIconName: IconTokens.Phone,
                    onPress: () => { },
                },
                list3: <ListItemProps>{
                    title: 'Email ID',
                    subTitle:  `${profileData.emailId}`,
                    isDivider:true,
                    leadIconName: IconTokens.Email,
                    onPress: () => { },
                },
                list4: <ListItemProps>{
                    title: 'PAN Number',
                    subTitle: maskSensitiveDetails(`${profileData.panNumber}`,0,4),
                   // '*******'+`${profileData.panNumber}`.substring(6),
                    isDivider:false,
                    leadIconName: IconTokens.CreditCard,
                    onPress: () => { },
                },
                space1: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
                categoryList: <TypographyProps>{
                    label: "Bank details",
                    color: ColorTokens.Grey_Charcoal,
                    fontSize: FontSizeTokens.XS,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: "400",
                },
                space2: <SpaceProps>{ size: SizeTypeTokens.LG },
                headStack: <StackProps>{
                    type: StackType.row,
                    justifyContent: StackJustifyContent.flexStart,
                    alignItems: StackAlignItems.center,
                    widgetItems: [
                        { id: "imageItem", type: WIDGET.IMAGE },
                        { id: "space0", type: WIDGET.SPACE },
                        { id: "textItem", type: WIDGET.TEXT }
                    ]
                },
                imageItem: <ImageProps>{
                    uri: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/${profileData.bankDetails.bankCode}.svg`,
                    size: ImageSizeTokens.SM,
                    aspectRatio: AspectRatioToken.A1_1,
                    borderRadius: BorderRadiusTokens.BR5,
                    padding: SizeTypeTokens.SM,
                },
                space0: <SpaceProps>{ size: SizeTypeTokens.MD },
                textItem: <TypographyProps>{
                    label: `${profileData.bankDetails.bankName}`,
                    color: ColorTokens.Grey_Night,
                    fontSize: FontSizeTokens.MD,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: '700',
                },
                space3: <SpaceProps>{ size: SizeTypeTokens.MD },
                divider1: <DividerProps>{
                    size: DividerSizeTokens.SM,
                    color:ColorTokens.Grey_Milk_1,
                    margin: {
                        vertical: SizeTypeTokens.SM,
                        horizontal: SizeTypeTokens.SM,
                    },
                },
                space4: <SpaceProps>{ size: SizeTypeTokens.MD },
                list5: <ListItemProps>{
                    title: 'IFSC',
                    subTitle: `${profileData.bankDetails.ifscCode}`,
                    isDivider:true,
                    onPress: () => { },
                },
                list6: <ListItemProps>{
                    title: 'Account number',
                    subTitle: maskSensitiveDetails(`${profileData.bankDetails.accountNumber}`,0,4),
                   // '*******'+`${profileData.bankDetails.accountNumber}`.substring(8),
                    isDivider:false,
                    onPress: () => { },
                },
            },
        };
    };

export const accountDetailsMF: PageType<any> = {
    onLoad: async ({}, { profileData }) => {
        return Promise.resolve(
            template(profileData as ProfileDetails)
        );
    },

    actions: {
        // [ACTION.ACCOUNT_DETAILS]: accountDetails,
        [ACTION.BACK_BUTTON]: goBack
    },
    bgColor: "#FFFFFF",
};
