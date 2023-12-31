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
  CtaCardProps,
  DividerProps,
  DividerSizeTokens,
  FontFamilyTokens,
  FontSizeTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  TabsProps,
  TabTypeTokens,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ACTION, ClientInProgressPayloadType, ClientPendingPayloadType, dataTypeClient } from "./types";
import { ROUTE } from "../../../routes";
import { appendData, appendDatas, onClickCTA, onTrackCTA } from "./actions";
import SharedPropsService from "../../../SharedPropsService";
import { partnerApi } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";

export const template: (
  clientPendingRepoData: any,
  clientInProgressRepoData: any,
  clientEarningData: any
) => Promise<TemplateSchema> = async (clientPendingRepoData, clientInProgressRepoData, clientEarningData) => {

  const pendingBuildDS = (index, name, totalSteps, completedStatus, applicationId, applicationData, stepperData) => {
    return {
      [`listSpace${index}`]: <SpaceProps>{
        size: SizeTypeTokens.MD,
      },


      [`listItem${index}`]: <StackProps>{
        type: StackType.column,
        width: StackWidth.FULL,
        widgetItems: [
          { id: `clientListTop${index}`, type: WIDGET.STACK },
          { id: `clientSpace0${index}`, type: WIDGET.SPACE },
          { id: `clientListBottom${index}`, type: WIDGET.STACK },
          { id: `listItemDivider${index}`, type: WIDGET.DIVIDER }
        ]
      },
      [`listItemDivider${index}`]: <DividerProps>{
        size: DividerSizeTokens.SM,
        margin: {
          vertical: SizeTypeTokens.MD,
          horizontal: SizeTypeTokens.NONE,
        },
        color: ColorTokens.Grey_Milk_1,
      },
      [`clientListTop${index}`]: <StackProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.spaceBetween,
        alignItems: StackAlignItems.center,
        widgetItems: [

          { id: `clientListTopStack${index}`, type: WIDGET.STACK },
          { id: `clientListTopTrackButton${index}`, type: WIDGET.BUTTON }
        ]
      },

      [`clientListTopStack${index}`]: <StackProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.flexStart,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: `clientListTopName${index}`, type: WIDGET.TEXT },
        ]
      },
      [`clientListTopSpaces${index}`]: <SpaceProps>{
        size: SizeTypeTokens.XL,
      },
      [`clientListTopName${index}`]: <TypographyProps>{
        label: name,
        color: ColorTokens.Grey_Night,
        lineHeight: 24,
        fontSize: FontSizeTokens.MD,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600"
      },
      [`clientListTopTrackButton${index}`]: <ButtonProps>{
        label: "Track",
        type: ButtonTypeTokens.MediumGhost,
        fontFamily: FontFamilyTokens.Inter,
        width: ButtonWidthTypeToken.CONTENT,
        action: {
          type: ACTION.TRACK_PENDING,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST,
          payload: <ClientPendingPayloadType>{
            name: name,
            steps: stepperData,
            applicationId: applicationId,
            data: applicationData,
            completedSteps: completedStatus,
            totalSteps: totalSteps
          }
        },
      },
      [`clientSpace0${index}`]: <SpaceProps>{
        size: SizeTypeTokens.SM,
      },

      [`clientListBottom${index}`]: <StackProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.flexStart,
        alignItems: StackAlignItems.flexStart,
        widgetItems: [
          { id: `clientListBottomText${index}`, type: WIDGET.TEXT },
        ]
      },
      [`clientListBottomSpace${index}`]: <SpaceProps>{
        size: SizeTypeTokens.XL,
      },
      [`clientListBottomText${index}`]: <TypographyProps>{
        label: `${completedStatus}/${totalSteps} completed`,
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 18,
        fontSize: FontSizeTokens.XS,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400"
      },

      [`spaceListItem${index}`]: <SpaceProps>{ size: SizeTypeTokens.LG },
    };
  }

  const inProgressBuildDS = (index, name, principalOutStandingAmount, fullAmount, applicationId) => {
    return {
      [`ipListItem${index}`]: <StackProps>{
        type: StackType.column,
        width: StackWidth.FULL,
        widgetItems: [
          { id: `ipClientListTop${index}`, type: WIDGET.STACK },
          { id: `ipClientSpace0${index}`, type: WIDGET.SPACE },
          { id: `ipClientListBottom${index}`, type: WIDGET.STACK },
          { id: `ipDividerStack${index}`, type: WIDGET.STACK },
        ]
      },
      [`ipClientSpace0${index}`]: <SpaceProps>{
        size: SizeTypeTokens.SM,
      },
      [`ipDividerStack${index}`]: <StackProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: `ipDivider${index}`, type: WIDGET.DIVIDER }
        ]
      },
      [`ipDivider${index}`]: <DividerProps>{
        size: DividerSizeTokens.SM,
        color: ColorTokens.Grey_Milk_1,
        margin: {
          vertical: SizeTypeTokens.XL,
          horizontal: SizeTypeTokens.SM
        }
      },
      [`ipClientListTop${index}`]: <StackProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.flexStart,
        alignItems: StackAlignItems.flexStart,
        widgetItems: [
          { id: `ipClientListTopName${index}`, type: WIDGET.TEXT },
        ]
      },
      [`ipClientListTopSpace${index}`]: <SpaceProps>{ size: SizeTypeTokens.XL },
      [`ipClientListBottomText${index}`]: <TypographyProps>{
        label: `Utilized Rs. ${principalOutStandingAmount}/Rs. ${fullAmount}`,
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 18,
        fontSize: FontSizeTokens.XS,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400"
      },
      [`ipClientListTopName${index}`]: <TypographyProps>{
        label: name,
        color: ColorTokens.Grey_Night,
        lineHeight: 24,
        fontSize: FontSizeTokens.MD,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600"
      },
      [`ipClientListTopTrackButton${index}`]: <ButtonProps>{
        label: "Manage",
        type: ButtonTypeTokens.SmallGhost,
        fontFamily: FontFamilyTokens.Inter,
        width: ButtonWidthTypeToken.CONTENT,
        action: {
          type: ACTION.TRACK,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST,
          payload: <ClientInProgressPayloadType>{
            // name: name,
            // principalOutStandingAmount: principalOutStandingAmount,
            // fullAmount: fullAmount,
            // applicationId: applicationId
          }
        },
      },
      [`ipClientListBottom${index}`]: <StackProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.flexStart,
        alignItems: StackAlignItems.flexStart,
        widgetItems: [
          { id: `ipClientListBottomText${index}`, type: WIDGET.TEXT },
        ]
      },
      [`ipClientListBottomSpace${index}`]: <SpaceProps>{ size: SizeTypeTokens.XL },
      [`ipSpaceListItem${index}`]: <SpaceProps>{ size: SizeTypeTokens.LG },
    };
  }

  let inProgress_ds = {};

  clientInProgressRepoData.forEach((client, index) => {
    inProgress_ds = {
      ...inProgress_ds,
      ...inProgressBuildDS(index, client.borrowerAccountProfile.name, client.credit.principalOutStandingAmount, client.credit.approvedCreditAmount, client.creditApplication.applicationId),
    };
  });


  let pending_ds = {};
  clientPendingRepoData.forEach((client, index) => {
    let completedStatus = 0;
    let totalSteps = 0;
    totalSteps = Object.keys(client.partnerViewStepperMap).length;
    Object.keys(client.partnerViewStepperMap).map(key => {
      const value = client.partnerViewStepperMap[key]
      if (value.status === "COMPLETED") {
        completedStatus = completedStatus + 1;
      }
    })

    pending_ds = {
      ...pending_ds,
      ...pendingBuildDS(index, client.borrowerAccountProfile.name, totalSteps, completedStatus, client.creditApplication.applicationId, client.creditApplication, client.partnerViewStepperMap),
    };
  });

  const pendingBuildUI = () => {
    const clArr = [];
    if (clientPendingRepoData.length > 0) {
      clientPendingRepoData.forEach((client, index) => {
        clArr.push(
          { id: `listSpace${index}`, type: WIDGET.SPACE },
          { id: `listItem${index}`, type: WIDGET.STACK },
        )
      })
    }
    else {
      clArr.push(
        { id: `noDataPendingStack`, type: WIDGET.STACK, position: POSITION.ABSOLUTE_CENTER },
      )
    }
    return clArr;
  }

  const inProgressBuildUI = () => {
    const clArr1 = [];
    if (clientInProgressRepoData.length > 0) {
      clientInProgressRepoData.forEach((client, index) => {
        clArr1.push(
          { id: `ipListItem${index}`, type: WIDGET.STACK }
        )
      })
    } else {
      clArr1.push(
        { id: `noDataEarningStackInProgress`, type: WIDGET.STACK, position: POSITION.ABSOLUTE_CENTER },
      )
    }
    return clArr1;
  }


  return {
    layout: <Layout>{
      id: ROUTE.DISTRIBUTOR_CLIENT_LIST,
      type: LAYOUTS.LIST,
      widgets: [
        {
          id: "header2", type: WIDGET.CARD, position: POSITION.ABSOLUTE_TOP,
        },
        // (clientPendingRepoData.length > 0) ? { id: "continuePendingButton", type: WIDGET.BUTTON, position: POSITION.ABSOLUTE_BOTTOM } : {},
        (clientPendingRepoData.length > 0) ? { id: "continuePendingButtonCTA", type: WIDGET.CTACARD,position: POSITION.STICKY_BOTTOM,
        padding: {
          left: 0,
          right: 0,
          horizontal: 0,
        }} : {},
      ],
    },
    datastore: <Datastore>{

      header2: <CardProps>{
        padding: {
          horizontal: SizeTypeTokens.NONE,
        },
        bgColor: ColorTokens.White,
        body: {
          widgetItems: [
            { id: 'head', type: WIDGET.STACK },
            { id: 'headerSpace', type: WIDGET.SPACE },
            { id: 'tabb', type: WIDGET.TABS, position: POSITION.ABSOLUTE_CENTER }
          ],
        },
      },

      head: <StackProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.flexStart,
        alignItems: StackAlignItems.flexStart,
        widgetItems: [
          { id: 'headingSpaceItem', type: WIDGET.SPACE },
          // { id: 'headItem', type: WIDGET.TEXT },
        ]
      },
      headingSpaceItem: <SpaceProps>{
        size: SizeTypeTokens.XL
      },
      headItem: <TypographyProps>{
        label: "Volt App",
        color: ColorTokens.Grey_Night,
        lineHeight: 24,
        fontSize: FontSizeTokens.MD,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "700"
      },
      tabStack: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.flexStart,
        widgetItems: [
          { id: 'tabbSpace1', type: WIDGET.SPACE },
          { id: 'tabb', type: WIDGET.TABS },
          { id: 'tabbSpace2', type: WIDGET.SPACE },
        ]
      },
      tabbSpace1: <SpaceProps>{
        size: SizeTypeTokens.XL
      },
      headerSpace: <SpaceProps>{
        size: SizeTypeTokens.LG
      },
      tabb: <TabsProps & WidgetProps>{
        action: {
          type: ACTION.ON_CHANGE,
          payload: <dataTypeClient>{
            value: null,
            PendingData: clientPendingRepoData,
            InProgressData: clientInProgressRepoData,
            widgetID: "tabb",
          },
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST
        },
        active: 0,
        type: TabTypeTokens.DEFAULT,
        options: [
          {
            label: "My clients",
            disabled: false
          },
          {
            label: "My earnings",
            disabled: false
          }
        ],
        widgetItems: [
          ...(`${clientPendingRepoData}` ?
            [{
              id: "tab", type: WIDGET.TABS,
            }]
            :
            [
              {
                id: `noDataPendingStackHeader`, type: WIDGET.STACK, padding: {
                  left: 30, right: 30
                }
              },
            ]),
          { id: `noDataEarningStackHeader`, type: WIDGET.STACK, position: POSITION.ABSOLUTE_CENTER }
        ]
      },
      tabbSpace2: <SpaceProps>{
        size: SizeTypeTokens.XL
      },
      contentSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
      divider: <DividerProps>{
        size: DividerSizeTokens.SM,
        margin: {
          vertical: SizeTypeTokens.SM,
          horizontal: SizeTypeTokens.SM,
        },
      },

      space0: <SpaceProps>{ size: SizeTypeTokens.LG },
      tab: <TabsProps & WidgetProps>{
        action: {
          type: ACTION.ON_CHANGES,
          payload: <dataTypeClient>{
            value: null,
            PendingData: clientPendingRepoData,
            InProgressData: clientInProgressRepoData,
            widgetID: "tabb",
          },
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST
        },
        active: 0,
        type: TabTypeTokens.BORDER,
        options: [
          {
            label: "Pending",
            disabled: false
          },
          {
            label: "In Progress",
            disabled: false
          }
        ],
        widgetItems: [
          { id: "PendingStack", type: WIDGET.STACK },
          { id: "InProgressStack", type: WIDGET.STACK }
        ]
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.XL },
      InProgressStack: <StackProps>{
        type: StackType.column,
        width: StackWidth.CONTENT,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          ...inProgressBuildUI(),
        ]
      },

      PendingStack: <StackProps>{
        type: StackType.column,
        width: StackWidth.CONTENT,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          ...pendingBuildUI(),
        ]
      },
      topInProgressSpace: <SpaceProps>{
        size: SizeTypeTokens.Size30
      },
      noDataPendingStackHeader: <StackProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        widgetItems: [
          { id: `noDataPendingStackSpace`, type: WIDGET.SPACE, position: POSITION.ABSOLUTE_CENTER },
          { id: `noDataPendingStacks`, type: WIDGET.STACK, position: POSITION.ABSOLUTE_CENTER },

        ]
      },
      noDataPendingStack: <StackProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          // { id: `noDataPendingStackSpace`, type: WIDGET.SPACE,position:POSITION.ABSOLUTE_CENTER},
          { id: `noDataPendingStacks`, type: WIDGET.STACK, position: POSITION.ABSOLUTE_CENTER },

        ]
      },
      noDataPendingStackSpace: <SpaceProps>{
        size: SizeTypeTokens.Size32
      },
      noDataPendingStacks: <StackProps>{
        type: StackType.column,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [

          { id: "noClientSpaces", type: WIDGET.SPACE },
          { id: "noClientSpaces1", type: WIDGET.SPACE },
          { id: "noClientIcon", type: WIDGET.ICON, position: POSITION.ABSOLUTE_CENTER },
          { id: "noClientSpace0", type: WIDGET.SPACE },
          { id: "noClientTitle", type: WIDGET.TEXT },
          { id: "noClientSpace1", type: WIDGET.SPACE },
          { id: "noClientSubtitle1", type: WIDGET.TEXT },
          { id: "noClientSubtitle2", type: WIDGET.TEXT },
          { id: "buttonSpace", type: WIDGET.SPACE },
          { id: "button", type: WIDGET.BUTTON },
        ]
      },
      noClientSpaces: <SpaceProps>{
        size: SizeTypeTokens.XXXXXXL
      },
      noClientSpaces1: <SpaceProps>{
        size: SizeTypeTokens.XXXXXXL
      },
      noClientSpace0: <SpaceProps>{
        size: SizeTypeTokens.XL
      },
      noClientSpace1: <SpaceProps>{
        size: SizeTypeTokens.MD
      },
      noClientIcon: <IconProps>{
        name: IconTokens.List,
        size: IconSizeTokens.XXXXXXXXL,
      },
      noClientTitle: <TypographyProps>{
        label: "No clients added",
        color: ColorTokens.Grey_Night,
        lineHeight: 28,
        fontSize: FontSizeTokens.XL,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "600"
      },
      noClientSubtitle1: <TypographyProps>{
        label: "Clients will reflect as soon as you start",
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 24,
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400"
      },
      noClientSubtitle2: <TypographyProps>{
        label: "creating the loan application.",
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 24,
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400"
      },
      noDataEarningStackHeader: <StackProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: `noDataEarningStackSpace`, type: WIDGET.SPACE, position: POSITION.ABSOLUTE_CENTER },
          { id: `noDataEarningStack1Header`, type: WIDGET.STACK, position: POSITION.ABSOLUTE_CENTER },

        ]
      },
      noDataEarningStackInProgress: <StackProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          //{ id: `noDataEarningStackSpace`, type: WIDGET.SPACE, position: POSITION.ABSOLUTE_CENTER },
          { id: `noDataEarningInProgress`, type: WIDGET.STACK, position: POSITION.ABSOLUTE_CENTER },

        ]
      },
      noDataEarningStack: <StackProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          //{ id: `noDataEarningStackSpace`, type: WIDGET.SPACE, position: POSITION.ABSOLUTE_CENTER },
          { id: `noDataEarningStack1`, type: WIDGET.STACK, position: POSITION.ABSOLUTE_CENTER },

        ]
      },
      noDataEarningStackSpace: <SpaceProps>{
        size: SizeTypeTokens.Size32
      },
      noDataEarningStack1Header: <StackProps>{
        type: StackType.column,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [

          { id: "noEarningSpaces", type: WIDGET.SPACE },
          { id: "noEarningSpaces1", type: WIDGET.SPACE },
          { id: "noEarningIcon", type: WIDGET.ICON, position: POSITION.ABSOLUTE_CENTER },
          { id: "noEarningSpace0", type: WIDGET.SPACE },
          { id: "noEarningTitle", type: WIDGET.TEXT },
          { id: "noEarningSpace1", type: WIDGET.SPACE },
          { id: "noEarningSubtitle1", type: WIDGET.TEXT },
          { id: "noEarningSubtitle2", type: WIDGET.TEXT },
          { id: "buttonSpace", type: WIDGET.SPACE },
          { id: "button", type: WIDGET.BUTTON },
        ]
      },
      noDataEarningInProgress: <StackProps>{
        type: StackType.column,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "noEarningSpaces", type: WIDGET.SPACE },
          { id: "noEarningSpaces1", type: WIDGET.SPACE },
          { id: "noEarningSpaces2", type: WIDGET.SPACE },
          { id: "noEarningIcon", type: WIDGET.ICON, position: POSITION.ABSOLUTE_CENTER },
          { id: "noEarningSpace0", type: WIDGET.SPACE },
          { id: "noEarningTitle", type: WIDGET.TEXT },
          { id: "noEarningSpace1", type: WIDGET.SPACE },
          { id: "noEarningSubtitleStack1", type: WIDGET.TEXT },
          { id: "noEarningSubtitleStack2", type: WIDGET.TEXT },
          { id: "buttonSpace", type: WIDGET.SPACE },
        ]
      },
      noEarningSubtitleStack1: <TypographyProps>{
        label: "Earning will reflect as soon as your clients",
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 24,
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400"
      },
      noEarningSubtitleStack2: <TypographyProps>{
        label: "completes the loan application.",
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 24,
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400"
      },
      noDataEarningStack1: <StackProps>{
        type: StackType.column,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "noEarningSpaces", type: WIDGET.SPACE },
          { id: "noEarningSpaces1", type: WIDGET.SPACE },
          { id: "noEarningSpaces2", type: WIDGET.SPACE },
          { id: "noEarningIcon", type: WIDGET.ICON, position: POSITION.ABSOLUTE_CENTER },
          { id: "noEarningSpace0", type: WIDGET.SPACE },
          { id: "noEarningTitle", type: WIDGET.TEXT },
          { id: "noEarningSpace1", type: WIDGET.SPACE },
          { id: "noEarningSubtitle1", type: WIDGET.TEXT },
          { id: "noEarningSubtitle2", type: WIDGET.TEXT },
          { id: "buttonSpace", type: WIDGET.SPACE },
          { id: "button", type: WIDGET.BUTTON },
        ]
      },
      noEarningSpaces: <SpaceProps>{
        size: SizeTypeTokens.XXXXXXL
      },
      noEarningSpaces1: <SpaceProps>{
        size: SizeTypeTokens.XXXXXXL
      },
      noEarningSpaces2: <SpaceProps>{
        size: SizeTypeTokens.XXXL
      },
      noEarningSpace0: <SpaceProps>{
        size: SizeTypeTokens.XL
      },
      noEarningSpace1: <SpaceProps>{
        size: SizeTypeTokens.MD
      },
      noEarningIcon: <IconProps>{
        name: IconTokens.SvgChart,
        size: IconSizeTokens.XXXXXXXXL,
      },
      noEarningTitle: <TypographyProps>{
        label: "No earnings",
        color: ColorTokens.Grey_Night,
        lineHeight: 28,
        fontSize: FontSizeTokens.XL,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "600"
      },
      noEarningSubtitle1: <TypographyProps>{
        label: "Earning will reflect as soon as you start",
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 24,
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400"
      },
      noEarningSubtitle2: <TypographyProps>{
        label: "creating the loan application.",
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 24,
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400"
      },
      topPendingSpace: <SpaceProps>{
        size: SizeTypeTokens.Size30
      },
      ...pending_ds,
      ...inProgress_ds,
      space2: <SpaceProps>{ size: SizeTypeTokens.XXL },
      buttonSpace: <SpaceProps>{
        size: SizeTypeTokens.Size32
      },
      buttonn: <ButtonProps>{
        fontFamily: FontFamilyTokens.Poppins,
        label: "Create new application",
        type: ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.CTA,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST,
          widgetId: "buttonn"
        },
      },
      button: <ButtonProps>{
        fontFamily: FontFamilyTokens.Poppins,
        label: "Create new application",
        type: ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.CTA,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST,
          widgetId: "button"
        },
      },
      continuePendingButton: <ButtonProps>{
        fontFamily: FontFamilyTokens.Poppins,
        label: "Create new application",
        type: ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.CTA,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST,
          widgetId: "continuePendingButton"
        },
      },
      continueInProgressButton: <ButtonProps>{
        fontFamily: FontFamilyTokens.Poppins,
        label: "Create new application",
        type: ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.CTA,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST,
          widgetId: "continueInProgressButton"
        },
      },
      continuePendingButtonCTA: <CtaCardProps>{
        label: '',
        info: '',
        actionLabel: 'Create new application',
        action: {
          type: ACTION.CTA,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST,
          widgetId: "continuePendingButtonCTA"
        },
      }
    },
  }

};


export const DistributorClientListMF: PageType<any> = {
  onLoad: async ({ network }, { }) => {
    const body = {};
    const partnerApplicatiionId = await SharedPropsService.getApplicationId();
    const userContextResponse = await network.post(partnerApi.userContext, body, {
      headers: await getAppHeader(),
    });

    const partnerAccountId = userContextResponse.data.linkedPartnerAccounts[0].accountId;
    const pendingData = [];
    const inProgressData = [];
    const response = await network.get(
      `${partnerApi.clientList}${partnerAccountId}/customers/all`,
      {
        headers: await getAppHeader(),
      }
    );

    response.data.customerMetadataList.forEach((data, index) => {
      const status = data.creditApplication.applicationState;
      if (status === "IN_PROGRESS") {
        pendingData.push(data);
      } else {
        inProgressData.push(data);
      }
    });
    const clientPendingRepoData = pendingData;
    const clientInProgressRepoData = inProgressData;
    const clientEarningData = [];
    const user = await SharedPropsService.getUser();
    const templateX = await template(clientPendingRepoData, clientInProgressRepoData, clientEarningData);
    return Promise.resolve(templateX);
  },
  actions: {
    [ACTION.TRACK]: onTrackCTA,
    [ACTION.TRACK_PENDING]: onTrackCTA,
    [ACTION.CTA]: onClickCTA,
    [ACTION.ON_CHANGE]: appendData,
    [ACTION.ON_CHANGES]: appendDatas
  },
  clearPrevious: true
};