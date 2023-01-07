import {
    Datastore,
    Layout,
    LAYOUTS,
    PageType,
    POSITION,
    SCREEN_SIZE,
    TemplateSchema,
    WidgetProps,
} from "@voltmoney/types";
import { Linking, Dimensions } from "react-native";
import {
    ButtonProps,
    ButtonTypeTokens,
    ButtonWidthTypeToken,
    ColorTokens,
    DividerProps,
    DividerSizeTokens,
    FontFamilyTokens,
    FontSizeTokens,
    HeaderProps,
    HeaderTypeTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    ListItemProps,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    StepperItem,
    StepperProps,
    StepperTypeTokens,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import {
    ACTION, LinkPayload,
} from "./types";
import { horizontalDistributorStepperRepo } from "../../configs/utils";
import {  copyToClipboard, onClient, onSave, onShare, onSkip } from "./actions";
import { getScreenType } from "../../configs/platfom-utils";
import { DeepLinks, getAppHeader } from "../../configs/config";
import { partnerApi } from "../../configs/api";
import SharedPropsService from "../../SharedPropsService";
let screenType = getScreenType(Dimensions.get("window").width);

export const template: (
    link:string,
    name:string
) => TemplateSchema = (link,name) => ({
    layout: <Layout>{
        id: ROUTE.INVESTOR,
        type: LAYOUTS.LIST,
        widgets: [
            {id:"midStack",type:WIDGET.STACK,position:POSITION.ABSOLUTE_CENTER},
          
        ],
    },
    datastore: <Datastore>{
       
        space0: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
        space1: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
        midStack: <StackProps>{
            type: StackType.column,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.center,
            widgetItems: [
                { id: "iconStack", type: WIDGET.STACK },
                { id: "iconSpace", type: WIDGET.SPACE },
                { id: "headStack", type: WIDGET.STACK},
                { id: "headSpace", type: WIDGET.SPACE },
                { id: "infoStack", type: WIDGET.STACK },
                { id: "infoSpace", type: WIDGET.SPACE },
                { id: "instructionStack", type: WIDGET.STACK },
                { id: "insSpace", type: WIDGET.SPACE },
                {
                    id: "share",
                    type: WIDGET.BUTTON,
                  //  position: POSITION.ABSOLUTE_BOTTOM,
                },
                { id: "btnSpace", type: WIDGET.SPACE },
                {
                    id: "copy",
                    type: WIDGET.BUTTON,
                   // position: POSITION.ABSOLUTE_BOTTOM,
                },
                { id: "copySpace", type: WIDGET.SPACE },
                {
                    id: "continue",
                    type: WIDGET.BUTTON
                },
            ],
        },
        iconStack: <StackProps>{
            type: StackType.row,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.center,
            widgetItems: [
                { id: "iconItems", type: WIDGET.ICON }
            ],
        },
        iconItems:<IconProps>{
            name:IconTokens.Success,
            size:IconSizeTokens.XXXXXXL,
            //color:ColorTokens.YE
        },
        iconSpace:<SpaceProps>{
            size:SizeTypeTokens.XL
        },
        
        headStack: <StackProps>{
            type: StackType.column,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.center,
            widgetItems: [
                { id: "headItems1", type: WIDGET.TEXT },
                { id: "headItems2", type: WIDGET.TEXT }
            ],
        },
        headItems1:<TypographyProps>{
            label: "Loan application",
            fontSize: FontSizeTokens.XL,
            fontWeight: '600',
            color: ColorTokens.Grey_Night,
            lineHeight: 28,
            fontFamily: FontFamilyTokens.Poppins
        },
        headItems2:<TypographyProps>{
            label: "created successfully",
            fontSize: FontSizeTokens.XL,
            fontWeight: '600',
            color: ColorTokens.Grey_Night,
            lineHeight: 28,
            fontFamily: FontFamilyTokens.Poppins
        },
        headSpace:<SpaceProps>{
            size:SizeTypeTokens.MD
        },
        infoStack: <StackProps>{
            type: StackType.column,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.center,
            widgetItems: [
                { id: "infoItems1", type: WIDGET.TEXT },
                { id: "infoItems2", type: WIDGET.TEXT },
               
            ],
        },
        infoItems1:<TypographyProps>{
            label: "We have already sent an email and text",
            fontSize: FontSizeTokens.LG,
            fontWeight: '500',
            color: ColorTokens.Grey_Charcoal,
            lineHeight: 24,
            fontFamily: FontFamilyTokens.Inter
        },
        infoItems2:<TypographyProps>{
            label: `message to ${name}`,
            fontSize: FontSizeTokens.LG,
            fontWeight: '500',
            color: ColorTokens.Grey_Charcoal,
            lineHeight: 24,
            fontFamily: FontFamilyTokens.Inter
        },
       
        infoSpace:<SpaceProps>{
            size:SizeTypeTokens.Size32
        },
        instructionStack: <StackProps>{
            type: StackType.column,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.center,
            widgetItems: [
                { id: "insItems", type: WIDGET.TEXT },
               
            ],
        },
        insItems:<TypographyProps>{
            label: "Share link with investor",
            fontSize: FontSizeTokens.XL,
            fontWeight: '600',
            color: ColorTokens.Grey_Night,
            lineHeight: 24,
            fontFamily: FontFamilyTokens.Inter
        },
        insSpace:<SpaceProps>{
            size:SizeTypeTokens.XL
        },
       
        share: <ButtonProps & WidgetProps>{
            label: "Share via WhatsApp",
            type: ButtonTypeTokens.LargeSoftFilled,
            icon:<IconProps>{
                name:IconTokens.Whatsapp,
                size:IconSizeTokens.XL
            },
            labelColor: ColorTokens.Grey_Night,
            width: ButtonWidthTypeToken.FULL,
            // onPress: () => {
            //     const screenType = getScreenType(Dimensions.get("window").width);
            //     if (
            //       screenType === SCREEN_SIZE.X_SMALL ||
            //       screenType === SCREEN_SIZE.SMALL
            //     ) {
            //       window.open(DeepLinks.MOBILE_WHATSAPP, "_parent"); //Linking.openURL(DeepLinks.MOBILE_WHATSAPP);
            //     } else {
            //       window.open(DeepLinks.WHATSAPP, "_blank"); //Linking.openURL(DeepLinks.WHATSAPP)
            //     }
            //   },
            action: {
               
                type: ACTION.SHARE,
                routeId: ROUTE.INVESTOR,
                payload: <LinkPayload>{
                    value:`${link}`
                },
            },
        },
        btnSpace: <SpaceProps>{
            size: SizeTypeTokens.XL
        },
        copy: <ButtonProps & WidgetProps>{
            label: "Copy invite Link",
            icon:<IconProps>{
                name:IconTokens.Copy,
                size:IconSizeTokens.XL
            },
            type: ButtonTypeTokens.LargeSoftFilled,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.ON_CLIPBOARD,
                routeId: ROUTE.INVESTOR,
                payload: <LinkPayload>{
                    value: `${link}`
                },
            },
        },
        copySpace: <SpaceProps>{
            size: SizeTypeTokens.MD
        },
        continue: <ButtonProps & WidgetProps>{
            label: "Back to client list",
            type: ButtonTypeTokens.LargeGhost,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.ON_CLIENT,
                routeId: ROUTE.INVESTOR,
                payload: <{}>{},
            },
        },
    },
});

export const investorMF: PageType<any> = {
    onLoad: async ({network}) => {
        const applicationId = await SharedPropsService.getApplicationId();
        const Linkresponse = await network.get(
            `${partnerApi.referalLink}${applicationId}`,
            {
              headers: await getAppHeader(),
            }
          );
          const link = Linkresponse.data.link;
          const name = await (await SharedPropsService.getPartnerUser()).name;
        return Promise.resolve(template(link,name));
    },
    actions: {
        [ACTION.ON_SAVE]: onSave,
        [ACTION.ON_SKIP]: onSkip,
        [ACTION.GO_BACK]: onSkip,
        [ACTION.SHARE]: onShare,
        [ACTION.ON_CLIENT]: onClient,
        [ACTION.ON_CLIPBOARD]: copyToClipboard,
    },

    clearPrevious: true,
};
