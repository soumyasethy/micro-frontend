import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import _ from "lodash";
import {
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  CardProps,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  IconAlignmentTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  ShadowTypeTokens,
  SizeTypeTokens,
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
import { ACTION} from "./types";
import { ROUTE } from "../../../routes";
import { goBackAction, onClickCTA, onManageCTA, onShare, onTrackCTA, resumeSteps } from "./actions";
import { StepperPayload } from "../ClientList/types";

export const template: (
  applicationId: string,
  name: string,
  data: any,
  totalSteps: string,
  completedSteps: string,
  editableData: any
) => Promise<TemplateSchema> = async (applicationId, name, data, totalSteps, completedSteps, editableData) => {

  return {
    layout: <Layout>{
      id: ROUTE.DISTRIBUTOR_CLIENT_LIST_STEPPER,
      type: LAYOUTS.LIST,
      widgets: [
        {
          id: "header2", type: WIDGET.CARD, position: POSITION.ABSOLUTE_TOP,
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
            { id: 'head1', type: WIDGET.STACK }
          ],
        },
      },
      head1: <StackProps>{
        type: StackType.column,
        width: StackWidth.CONTENT,
        widgetItems: [
          { id: 'head', type: WIDGET.STACK },
          { id: 'midSpace', type: WIDGET.SPACE },
          { id: 'bottom', type: WIDGET.STACK },
        ]
      },
      head: <StackProps>{
        type: StackType.row,
        width: StackWidth.CONTENT,
        justifyContent: StackJustifyContent.spaceBetween,
        widgetItems: [
          { id: 'icon', type: WIDGET.STACK },
          { id: 'share', type: WIDGET.STACK },
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
        size: SizeTypeTokens.XL
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
        justifyContent: StackJustifyContent.flexEnd,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "ShareIconItem", type: WIDGET.BUTTON },
          // { id: "ShareIconItem", type: WIDGET.ICON },
           { id: "ShareSpace", type: WIDGET.SPACE },
          // { id: "shareTitle", type: WIDGET.TEXT },
          // { id: "ShareSpace1", type: WIDGET.SPACE },
        ]
      },
      ShareIconItem:<ButtonProps & WidgetProps>{
        label: "Copy",
        type: ButtonTypeTokens.SmallGhost,
        width: ButtonWidthTypeToken.CONTENT,
        icon:<IconProps>{
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
      // shareTitle: <TypographyProps>{
      //   label: "Share",
      //   fontFamily: FontFamilyTokens.Inter,
      //   fontSize: FontSizeTokens.SM,
      //   color: ColorTokens.Primary_100,
      //   lineHeight: 24,
      // },
      ShareSpace: <SpaceProps>{
        size: SizeTypeTokens.XL,
        isHeaght: false
      },
      // ShareSpace1: <SpaceProps>{
      //   size: SizeTypeTokens.MD,
      //   isHeaght: true
      // },
      // ShareIconItem: <IconProps>{
      //   name: IconTokens.Share,
      //   size: IconSizeTokens.LG,
      //   color: ColorTokens.Primary_100
      // },

      midSpace: <SpaceProps>{
        size: SizeTypeTokens.SM,
        isHeaght: true
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
        isHeaght: false
      },
      subtitle: <TypographyProps>{
        label: `${completedSteps}/${totalSteps} Completed`,
        color: ColorTokens.Grey_Charcoal,
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.XS,
        fontWeight: "400",
        lineHeight: 18,
      },
      topSpace0: <SpaceProps>{
        size: SizeTypeTokens.XXXL
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

    const templateX = await template(applicationId, name, seperated_data, totalSteps, completedSteps, editableData);
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