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
    ButtonProps,
    ButtonTypeTokens,
    ButtonWidthTypeToken,
    CarousalProps,
    ColorTokens,
    DividerProps,
    DividerSizeTokens,
    FontFamilyTokens,
    FontSizeTokens,
    IconAlignmentTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    ListItemProps,
    PaddingSizeTokens,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackFlexWrap,
    StackJustifyContent,
    StackProps,
    StackType,
    StackWidth,
    TabsProps,
    TypographyBaseProps,
    TypographyProps,
    WIDGET,
  } from "@voltmoney/schema";
import { ACTION, ClientInProgressPayloadType, ClientPendingPayloadType } from "./types";
import { ROUTE } from "../../../routes";
import { clientInProgressRepoData, clientPendingRepoData } from "./repo";  
import { onClickCTA, onManageCTA, onTrackCTA } from "./actions";

export const template:(
  clientPendingRepoData: {
    name: string,
    stepsCompleted: number|string,
    applicationId: string,
  }[], 
  clientInProgressRepoData: {
    name: string, 
    utilizedAmount: number|string,
    fullAmount: number|string,
    applicationId: string
  }[],
) => Promise<TemplateSchema> = async (clientPendingRepoData, clientInProgressRepoData) => {

  const pendingBuildDS = (index, name, stepsCompleted, applicationId) => {
    return {
      [`listItem${index}`]: <StackProps> {
        type: StackType.column,
        width: StackWidth.FULL,
        widgetItems: [
          { id: `clientListTop${index}`, type: WIDGET.STACK },
          { id: `clientSpace0${index}`, type: WIDGET.SPACE},
          { id: `clientListBottomText${index}`, type: WIDGET.TEXT },
          { id: `dividerStack${index}`, type:WIDGET.STACK},
        ]
      },
      [`clientSpace0${index}`]: <SpaceProps> {
        size: SizeTypeTokens.SM,
      },
      [`dividerStack${index}`]: <StackProps> {
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: `divider${index}`, type:WIDGET.DIVIDER}
        ]
      },
      [`divider${index}`]: <DividerProps>{
        size: DividerSizeTokens.SM,
        color: ColorTokens.Grey_Milk_1,
        margin: {
          vertical: SizeTypeTokens.XL,
          horizontal: SizeTypeTokens.SM
        }
      },
      [`clientListTop${index}`]: <StackProps> {
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.spaceBetween,
        alignItems: StackAlignItems.center,
        widgetItems: [
          {id: `clientListTopName${index}`, type: WIDGET.TEXT}, 
          {id: `clientListTopTrackButton${index}`, type:WIDGET.BUTTON}
        ]
      },
      [`clientListBottomText${index}`]: <TypographyProps> {
        label: `${stepsCompleted}/7 completed`,
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 18,
        fontSize: FontSizeTokens.XS,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400"
      },
      [`clientListTopName${index}`]: <TypographyProps> {
        label: name,
        color: ColorTokens.Grey_Night,
        lineHeight: 24,
        fontSize: FontSizeTokens.MD,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600"
      },
      [`clientListTopTrackButton${index}`]: <ButtonProps> {
        label: "Track",
        type: ButtonTypeTokens.SmallGhost,
        fontFamily: FontFamilyTokens.Inter,
        width: ButtonWidthTypeToken.CONTENT,
        action: {
          type: ACTION.TRACK,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST,
          payload: <ClientPendingPayloadType> {
            name: name,
            stepsCompleted: stepsCompleted,
            applicationId: applicationId
          }
        },
      },
      [`spaceListItem${index}`]: <SpaceProps>{ size: SizeTypeTokens.LG },
    };
  }

  const inProgressBuildDS = (index, name, utilizedAmount, fullAmount, applicationId) => {
    return {
      [`ipListItem${index}`]: <StackProps> {
        type: StackType.column,
        width: StackWidth.FULL,
        widgetItems: [
          { id: `ipClientListTop${index}`, type: WIDGET.STACK },
          { id: `ipClientSpace0${index}`, type: WIDGET.SPACE},
          { id: `ipClientListBottomText${index}`, type: WIDGET.TEXT },
          { id: `ipDividerStack${index}`, type:WIDGET.STACK},
        ]
      },
      [`ipClientSpace0${index}`]: <SpaceProps> {
        size: SizeTypeTokens.SM,
      },
      [`ipDividerStack${index}`]: <StackProps> {
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: `ipDivider${index}`, type:WIDGET.DIVIDER}
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
      [`ipClientListTop${index}`]: <StackProps> {
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.spaceBetween,
        alignItems: StackAlignItems.center,
        widgetItems: [
          {id: `ipClientListTopName${index}`, type: WIDGET.TEXT}, 
          {id: `ipClientListTopTrackButton${index}`, type:WIDGET.BUTTON}
        ]
      },
      [`ipClientListBottomText${index}`]: <TypographyProps> {
        label: `Utilized Rs. ${utilizedAmount}/Rs. ${fullAmount}`,
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 18,
        fontSize: FontSizeTokens.XS,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400"
      },
      [`ipClientListTopName${index}`]: <TypographyProps> {
        label: name,
        color: ColorTokens.Grey_Night,
        lineHeight: 24,
        fontSize: FontSizeTokens.MD,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600"
      },
      [`ipClientListTopTrackButton${index}`]: <ButtonProps> {
        label: "Manage",
        type: ButtonTypeTokens.SmallGhost,
        fontFamily: FontFamilyTokens.Inter,
        width: ButtonWidthTypeToken.CONTENT,
        action: {
          type: ACTION.TRACK,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST,
          payload: <ClientInProgressPayloadType> {
            name: name,
            utilizedAmount: utilizedAmount,
            fullAmount: fullAmount,
            applicationId: applicationId
          }
        },
      },
      [`ipSpaceListItem${index}`]: <SpaceProps>{ size: SizeTypeTokens.LG },
    };
  }

  let inProgress_ds = {};
  clientInProgressRepoData.map((client, index) => {
    inProgress_ds = {
      ...inProgress_ds,
      ...inProgressBuildDS(index, client.name, client.utilizedAmount, client.fullAmount, client.applicationId),
    };
  });
  
  
  let pending_ds = {};
  clientPendingRepoData.map((client, index) => {
    pending_ds = {
      ...pending_ds,
      ...pendingBuildDS(index, client.name, client.stepsCompleted, client.applicationId),
    };
  });
  
  const pendingBuildUI = () => {
    const clArr = []; 
    if(clientPendingRepoData.length > 0) {
      clientPendingRepoData.map((client, index) => {
        clArr.push(
          { id: `listItem${index}`, type: WIDGET.STACK },
        )
      })
    } else {
      clArr.push(
        { id: `noDataPendingStack`, type: WIDGET.STACK },
      )
    }
    return clArr;
  }

  const inProgressBuildUI = () => {
    const clArr = []; 
    clientPendingRepoData.map((client, index) => {
      clArr.push(
        { id: `ipListItem${index}`, type: WIDGET.STACK },
      )
    })
    return clArr;
  }

  return {
    layout: <Layout>{
      id: ROUTE.DISTRIBUTOR_CLIENT_LIST,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "tab", type: WIDGET.TABS },
        { id: "space1", type: WIDGET.SPACE },
        { id: "space1", type: WIDGET.SPACE },
        { id: "space2", type: WIDGET.SPACE },
        { id: "button", type: WIDGET.BUTTON, position: (clientPendingRepoData.length>0)?POSITION.ABSOLUTE_BOTTOM:"" },
      ],
    },
    datastore: <Datastore>{
      tab: <TabsProps> {
        active: 0,
        options: [
          {
            label: "Pending",
            disabled: false
          },
          {
            label: "In progress",
            disabled: false
          }
        ],
        widgetItems: [
          { id:"PendingStack", type: WIDGET.STACK },
          { id:"InProgressStack", type: WIDGET.STACK }
        ]
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.XL },
      InProgressStack: <StackProps> {
        type: StackType.column,
        width: StackWidth.CONTENT,
        widgetItems: [
          { id: 'topInProgressSpace', type: WIDGET.SPACE},
          ...inProgressBuildUI(),
        ]
      },
      PendingStack: <StackProps> {
        type: StackType.column,
        width: StackWidth.CONTENT,
        widgetItems: [
          { id: 'topPendingSpace', type: WIDGET.SPACE},
          ...pendingBuildUI(),
        ]
      },
      topInProgressSpace: <SpaceProps> {
        size: SizeTypeTokens.Size30
      },
      noDataPendingStack: <StackProps> {
        type: StackType.column,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "noClientIcon", type: WIDGET.ICON },
          { id: "noClientSpace0", type: WIDGET.SPACE },
          { id: "noClientTitle", type: WIDGET.TEXT },
          { id: "noClientSpace1", type: WIDGET.SPACE },
          { id: "noClientSubtitle1", type: WIDGET.TEXT },
          { id: "noClientSubtitle2", type: WIDGET.TEXT },
        ]
      },
      noClientSpace0: <SpaceProps> {
        size: SizeTypeTokens.XL
      },
      noClientSpace1: <SpaceProps> {
        size: SizeTypeTokens.MD
      },
      noClientIcon: <IconProps> {
        name: IconTokens.Page,
        size: IconSizeTokens.XXXXXXXXL,
      },
      noClientTitle: <TypographyProps> {
        label: "No clients added",
        color: ColorTokens.Grey_Night,
        lineHeight: 28,
        fontSize: FontSizeTokens.XL,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "600"
      },
      noClientSubtitle1: <TypographyProps> {
        label: "Clients will reflect as soon as you start",
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 24,
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400"
      },
      noClientSubtitle2: <TypographyProps> {
        label: "creating the loan application.",
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 24,
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400"
      },
      topPendingSpace: <SpaceProps> {
        size: SizeTypeTokens.Size30
      },
      ...pending_ds,
      ...inProgress_ds,
      space2: <SpaceProps>{ size: SizeTypeTokens.XXL },
      button: <ButtonProps>{
        fontFamily: FontFamilyTokens.Poppins,
        label: "Create new application",
        type: ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.CTA,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST
        },
      },
    },
  }
   
  };
  

export const DistributorClientListMF: PageType<any> = {
    onLoad: async ({}) => {
      const templateX = await template(clientPendingRepoData, clientInProgressRepoData);
      return Promise.resolve(templateX);
    },
    actions: {
      [ACTION.TRACK]: onTrackCTA,
      [ACTION.MANAGE]: onManageCTA,
      [ACTION.CTA]: onClickCTA,
    },
};