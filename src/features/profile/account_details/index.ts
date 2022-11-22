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
                    { id: "headStack", type: WIDGET.STACK },
                    { id: "space3", type: WIDGET.SPACE },
                    { id: "devider1", type: WIDGET.DIVIDER },
                    { id: "space4", type: WIDGET.SPACE },
                    { id: "list5", type: WIDGET.LIST_ITEM },
                    { id: "list6", type: WIDGET.LIST_ITEM },

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
                    subTitle: 'Lalit Bihani',
                    leadIconName: IconTokens.User,
                    onPress: () => { },
                },
                list2: <ListItemProps>{
                    title: 'Mobile Number',
                    subTitle: '9820167854',
                    leadIconName: IconTokens.Phone,
                    onPress: () => { },
                },
                list3: <ListItemProps>{
                    title: 'Email ID',
                    subTitle: 'lalit@voltmoney.in',
                    leadIconName: IconTokens.Email,
                    onPress: () => { },
                },
                list4: <ListItemProps>{
                    title: 'PAN Number',
                    subTitle: 'BFTPB2772K',
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
                    uri: 'https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50',
                    size: ImageSizeTokens.SM,
                    aspectRatio: AspectRatioToken.A1_1,
                    borderRadius: BorderRadiusTokens.BR5,
                    padding: SizeTypeTokens.SM,
                },
                space0: <SpaceProps>{ size: SizeTypeTokens.XL },
                textItem: <TypographyProps>{
                    label: "HDFC Bank",
                    color: ColorTokens.Grey_Night,
                    fontSize: FontSizeTokens.MD,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: "700",
                },
                space3: <SpaceProps>{ size: SizeTypeTokens.LG },
                divider1: <DividerProps>{
                    size: DividerSizeTokens.SM,
                    margin: {
                        vertical: SizeTypeTokens.SM,
                        horizontal: SizeTypeTokens.SM,
                    },
                },
                space4: <SpaceProps>{ size: SizeTypeTokens.LG },
                list5: <ListItemProps>{
                    title: 'IFSC',
                    subTitle: 'HDFC0000675',
                    onPress: () => { },
                },
                list6: <ListItemProps>{
                    title: 'Account number',
                    subTitle: '05001 42345 38421',
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
