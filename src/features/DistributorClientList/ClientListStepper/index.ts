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
import { Dimensions } from "react-native";
import _ from "lodash";
import {
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  CardProps,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  IconAlignmentTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  ShadowTypeTokens,
  SizeTypeTokens,
  SpaceOrientation,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  StepperProps,
  StepperTypeTokens,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ACTION } from "./types";
import { ROUTE } from "../../../routes";
import { goBackAction, onClickCTA, onManageCTA, onShare, onTrackCTA, resumeSteps } from "./actions";
import { StepperPayload } from "../ClientList/types";
import { getScreenType } from "../../../configs/platfom-utils";

export const template: (
  screenType: any,
  applicationId: string,
  name: string,
  data: any,
  totalSteps: string,
  completedSteps: string,
  editableData: any
) => Promise<TemplateSchema> = async (screenType,applicationId, name, data, totalSteps, completedSteps, editableData) => {

  return {
    layout: <Layout>{
      id: ROUTE.DISTRIBUTOR_CLIENT_LIST_STEPPER,
      type: LAYOUTS.LIST,
      widgets: [
        {
          id: "header2", type: WIDGET.CARD, position: POSITION.ABSOLUTE_TOP
        },
        { id: "topSpace0", type: WIDGET.SPACE },
        { id: "stepper", type: WIDGET.STEPPER },
        { id: "continue", type: WIDGET.BUTTON, position: POSITION.ABSOLUTE_BOTTOM }
      ],
    },
    datastore: <Datastore>{
      header2: <CardProps>{
        padding: {
          horizontal: SizeTypeTokens.NONE,
          vertical: SizeTypeTokens.NONE,
        },
        bgColor: ColorTokens.White,
        shadow: ShadowTypeTokens.E1,
        body: {
          widgetItems: [
            { id: 'headerSpace', type: WIDGET.SPACE },
            { id: 'head1', type: WIDGET.STACK }
          ],
        },
      },
      headerSpace: <SpaceProps>{
        size: SizeTypeTokens.LG,
        isHeight:true
      },
      head1: <StackProps>{
        type: StackType.column,
        width: StackWidth.FULL,
        widgetItems: [
          { id: 'head', type: WIDGET.STACK },
          { id: 'midSpace', type: WIDGET.SPACE },
          { id: 'bottom', type: WIDGET.STACK },
          { id: 'bottomSpace', type: WIDGET.SPACE },
        ]
      },
      head: <StackProps>{
        type: StackType.row,
        width: StackWidth.CONTENT,
        justifyContent: StackJustifyContent.spaceBetween,
        widgetItems: [
          { id: 'icon', type: WIDGET.STACK },
          screenType === "extra_small"  ? { id: 'share', type: WIDGET.STACK } :
          { id: 'ShareIconItem', type: WIDGET.BUTTON }
          ,
        ]
      },
      icon: <StackProps>{
        type: StackType.row,
        width: StackWidth.CONTENT,
        widgetItems: [
          { id: "IconSpace", type: WIDGET.SPACE },
          { id: "IconItem", type: WIDGET.BUTTON },
          { id: "title", type: WIDGET.TEXT },
        ]
      },
      IconSpace: <SpaceProps>{
        size: SizeTypeTokens.XL,
        isHeight:false,
        orientation: SpaceOrientation.HORIZONTAL
      },
      IconItem: <ButtonProps & WidgetProps>{
        label: "",
        labelColor: ColorTokens.Grey_Night,
        type: ButtonTypeTokens.SmallGhost,
        icon: <IconProps>{
          name: IconTokens.ChevronLeft,
          size: IconSizeTokens.LG,
          color: ColorTokens.Grey_Night
        },
        width: ButtonWidthTypeToken.CONTENT,
        action: {
          type: ACTION.GO_BACKAction,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST_STEPPER,
          payload: {},
        },
      },
      title: <TypographyProps>{
        label: `${name}`,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.MD,
        fontWeight: "700",
        lineHeight: 24,
      },
      share: <StackProps>{
        type: StackType.row,
        width: StackWidth.CONTENT,
        action: {
          type: ACTION.SHARE,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST_STEPPER,
          payload: {},
        },
        justifyContent: StackJustifyContent.flexStart,
        alignItems: StackAlignItems.flexStart,
        widgetItems: [
          { id: "shareSpace1", type: WIDGET.SPACE },
            { id: "ShareIconItem1", type: WIDGET.BUTTON },
          // { id: "shareSpace1", type: WIDGET.SPACE },
          // { id: "shareIcon", type: WIDGET.ICON },
          // { id: "shareSpace", type: WIDGET.SPACE },
          // { id: "shareTitle", type: WIDGET.TEXT },

          // { id: "ShareSpace", type: WIDGET.SPACE },
        ]
      },
      shareIcon: <IconProps>{
        name: IconTokens.Share,
        size: IconSizeTokens.LG,
        color: ColorTokens.Primary_100
      },
      ShareSpace: <SpaceProps>{
        size: SizeTypeTokens.XXXL,
        orientation: "horizontal"
      },
      shareTitle: <TypographyProps>{
        label: `Share link`,
        color: ColorTokens.Primary_100,
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.SM,
        fontWeight: "500",
        lineHeight: 24,
      },
      ShareIconItem: <ButtonProps & WidgetProps>{
        label: "Copy link",
        type: ButtonTypeTokens.MediumGhost,
        width: ButtonWidthTypeToken.CONTENT,
        icon: <IconProps>{
          name: IconTokens.Share,
          size: IconSizeTokens.LG,
          color: ColorTokens.Primary_100
        },
        action: {
          type: ACTION.SHARE,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST_STEPPER,
          payload: {},
        },
      },
      shareSpace1: <SpaceProps>{
        size: SizeTypeTokens.XXXXXXL,
        isHeight:false
        //orientation: SpaceOrientation.HORIZONTAL
      },
      ShareIconItem1: <ButtonProps & WidgetProps>{
        label: "Share link",
        type: ButtonTypeTokens.SmallGhost,
        width: ButtonWidthTypeToken.CONTENT,
        icon: <IconProps>{
          name: IconTokens.Share,
          size: IconSizeTokens.LG,
          color: ColorTokens.Primary_100
        },
        action: {
          type: ACTION.SHARE,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST_STEPPER,
          payload: {},
        },
      },
      
     
      midSpace: <SpaceProps>{
        size: SizeTypeTokens.SM,
        isHeight:true,
        orientation: SpaceOrientation.VERTICAL
      },
      bottom: <StackProps>{
        type: StackType.row,
        width: StackWidth.CONTENT,
        widgetItems: [
          { id: "headSpaces", type: WIDGET.SPACE },
          { id: "subtitle", type: WIDGET.TEXT },
        ]
      },
      headSpaces: <SpaceProps>{
        size: SizeTypeTokens.XXXXL,
        isHeight:false,
        orientation: SpaceOrientation.HORIZONTAL
      },
      subtitle: <TypographyProps>{
        label: `${completedSteps}/${totalSteps} Completed`,
        color: ColorTokens.Grey_Charcoal,
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.XS,
        fontWeight: "400",
        lineHeight: 18,
      },
      bottomSpace: <SpaceProps>{
        size: SizeTypeTokens.SM,
        orientation: SpaceOrientation.VERTICAL
      },
      topSpace0: <SpaceProps>{
        size: SizeTypeTokens.MD
      },

      Icon: <IconProps>{
        name: IconTokens.Share,
        size: IconSizeTokens.MD,
        color: ColorTokens.Primary_100,
        align: IconAlignmentTokens.center
      },
      IconText: <TypographyProps>{
        label: "Share",
        color: ColorTokens.Primary_100,
        lineHeight: 24,
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
      },
      stepper: <StepperProps>{
        type: StepperTypeTokens.DISTRIBUTOR,
        data: data
      },
      continue: <ButtonProps & WidgetProps>{
        label: "Resume",
        type: `${editableData}` ? ButtonTypeTokens.LargeFilled : ButtonTypeTokens.LargeOutline,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.RESUME,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST_STEPPER,
          payload: <StepperPayload>{
            value: editableData
          },
        },
      },
    }
  }
}


export const DistributorClientListStepperMF: PageType<any> = {
  onLoad: async ({ network }, { applicationId, name, stepperData, totalSteps, completedSteps }) => {
    const screenType = getScreenType(Dimensions.get("window").width);
    console.log("screen",screenType);
    let data1 = [];
    let data = [];
    Object.keys(stepperData).map(key => {
      const value = stepperData[key]
      const stepData: any = new Object();
      stepData.title = value.verticalDisplayName;
      stepData.subTitle = value.status;
      stepData.id = value.order;
      stepData.status = value.status;
      stepData.isEditable = value.isEditable;
      stepData.horizontalTitle = value.horizontalDisplayName;
      stepData.message = "Steps pending on investor";
      //stepData.statusText = value.isEditable;
      data1.push(stepData);
    })

    // let sorted = Object.entries(stepperData);
    data = data1.sort(function (a, b) {
      return a.id - b.id;
    });

    let seperated_data = [];
    data.forEach((item) => {
      if (item.id === 3) {
        const stepData: any = new Object();
        stepData.title = item.title;
        stepData.subTitle = (item.subTitle.charAt(0).toUpperCase() + item.subTitle.slice(1).toLowerCase()).replace("_", " ");
        stepData.id = item.id;
        stepData.status = item.status;
        stepData.isEditable = item.isEditable;
        stepData.horizontalTitle = item.horizontalTitle;
        stepData.message = "Steps pending on investor";
        seperated_data.push(stepData);
      } else {
        const stepData: any = new Object();
        stepData.title = item.title;
        stepData.subTitle = (item.subTitle.charAt(0).toUpperCase() + item.subTitle.slice(1).toLowerCase()).replace("_", " ");
        stepData.id = item.id;
        stepData.status = item.status;
        stepData.isEditable = item.isEditable;
        stepData.horizontalTitle = item.horizontalTitle;
        seperated_data.push(stepData);
      }
    })

    const editableData = data.filter((value) => value.isEditable === true && (value.status === "IN_PROGRESS" || value.status === "NOT_STARTED"));

    const templateX = await template(screenType,applicationId, name, seperated_data, totalSteps, completedSteps, editableData);
    return Promise.resolve(templateX);
  },
  actions: {
    [ACTION.TRACK]: onTrackCTA,
    [ACTION.MANAGE]: onManageCTA,
    [ACTION.CTA]: onClickCTA,
    [ACTION.GO_BACKAction]: goBackAction,
    [ACTION.RESUME]: resumeSteps,
    [ACTION.SHARE]: onShare,
  },
  clearPrevious: true,
};