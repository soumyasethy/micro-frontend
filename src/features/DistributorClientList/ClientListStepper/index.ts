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
  CarousalProps,
  ColorTokens,
  DividerProps,
  DividerSizeTokens,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  IconAlignmentTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  ListItemProps,
  PaddingSizeTokens,
  ShadowTypeTokens,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackFlexWrap,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  StepperItem,
  StepperProps,
  StepperStateToken,
  StepperTypeTokens,
  TabsProps,
  TypographyBaseProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ACTION, ClientInProgressPayloadType, ClientPendingPayloadType } from "./types";
import { ROUTE } from "../../../routes";
import { clientInProgressRepoData, clientPendingRepoData } from "./repo";
import { goBackAction, onClickCTA, onManageCTA, onTrackCTA } from "./actions";
import { partnerApi } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";

export const template: (
  applicationId: string,
  name: string,
  data: any,
  totalSteps:string,
  completedSteps:string
) => Promise<TemplateSchema> = async (applicationId, name, data,totalSteps,completedSteps) => {

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
        {id:"continue",type:WIDGET.BUTTON, position:POSITION.ABSOLUTE_BOTTOM}
      ],
    },
    datastore: <Datastore>{
      header2:<CardProps>{
        padding: {
          horizontal: SizeTypeTokens.NONE,
         vertical: SizeTypeTokens.NONE,
        },
        bgColor: ColorTokens.White,
        shadow:ShadowTypeTokens.E1,
        body: {
          widgetItems: [
            { id: 'head1', type: WIDGET.STACK },
           // { id: 'bottom', type: WIDGET.STACK },
         
          ],
        },
      },
      head1: <StackProps> {
        type: StackType.column,
        width: StackWidth.CONTENT,
       
       // alignItems: StackAlignItems.flexStart,
        widgetItems: [
          { id: 'head', type: WIDGET.STACK },
          { id: 'midSpace', type: WIDGET.SPACE },
           { id: 'bottom', type: WIDGET.STACK },
          
        ]
      },
      head: <StackProps> {
        type: StackType.row,
        width: StackWidth.CONTENT,
      //  justifyContent: StackJustifyContent.flexStart,
       // alignItems: StackAlignItems.flexStart,
        widgetItems: [
         
          { id: "IconSpace", type: WIDGET.SPACE },
          { id: "IconItem", type: WIDGET.BUTTON },
          { id: "title", type: WIDGET.TEXT },
        ]
      },
      IconSpace:<SpaceProps>{
        size:SizeTypeTokens.XL
      },
      IconItem: <ButtonProps & WidgetProps>{
        label: "",
        labelColor:ColorTokens.Grey_Night,
        type: ButtonTypeTokens.SmallGhost,
        icon:<IconProps>{
          name:IconTokens.ChevronLeft,
          size:IconSizeTokens.XL,
          color:ColorTokens.Grey_Night
        },
        width: ButtonWidthTypeToken.CONTENT,
        action: {
          type: ACTION.GO_BACKAction,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST_STEPPER,
          payload: {},
        },
      },
      title: <TypographyProps> {
        label: `${name}`,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.MD,
        fontWeight: "700",
        lineHeight: 24,
      },
      midSpace:<SpaceProps>{
        size:SizeTypeTokens.SM,
        isHeaght:true
      },
      bottom: <StackProps> {
        type: StackType.row,
        width: StackWidth.CONTENT,
        widgetItems: [
          { id: "headSpaces", type: WIDGET.SPACE },
          { id: "subtitle", type: WIDGET.TEXT },
        ]
      },
      headSpaces: <SpaceProps>{
        size: SizeTypeTokens.XXXXL,
        isHeaght:false
      },
      header: <HeaderProps>{
        action: {
          type: ACTION.GO_BACKAction,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST_STEPPER,
          payload: <{}>{},
      },
        title: `${name}`,
        isBackButton: true,
        type: HeaderTypeTokens.DEFAULT,
       //subTitle: `${stepperData}`,
        widgetItem: { id: "subtitleStack", type: WIDGET.STACK },
        // rightWidgetItem: {
        //   id: "rightHeaderStack", type: WIDGET.STACK
        // }
      },
      subtitleStack: <StackProps> {
          type: StackType.row,
          width: StackWidth.CONTENT,
          justifyContent: StackJustifyContent.flexStart,
          alignItems: StackAlignItems.flexStart,
          widgetItems: [
            { id: "IconSpace", type: WIDGET.SPACE },
            { id: "subtitle", type: WIDGET.TEXT },
          ]
        },
      subtitle: <TypographyProps> {
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
        data:data
      },
      continue: <ButtonProps & WidgetProps>{
        label: "Resume",
        type: ButtonTypeTokens.LargeOutline,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.CTA,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST_STEPPER,
          payload: {},
        },
      },
    }
  }
}


export const DistributorClientListStepperMF: PageType<any> = {
  onLoad: async ({network},{applicationId,name,stepperData,totalSteps,completedSteps}) => {
    let data1 = [];
    let data = []; 
    Object.keys(stepperData).map(key=> {
      const value = stepperData[key] 
      const stepData:any = new Object();
      stepData.title = value.verticalDisplayName;
      stepData.subTitle = value.verticalDescription;
      stepData.id =value.order;
      stepData.status = value.status;
      //stepData.statusText = value.isEditable;
      data1.push(stepData);
      })

     // let sorted = Object.entries(stepperData);
       data = data1.sort(function (a, b) {
        return a.id - b.id;
      });
    
    const templateX = await template(applicationId, name, data,totalSteps,completedSteps);
    return Promise.resolve(templateX);
  },
  actions: {
    [ACTION.TRACK]: onTrackCTA,
    [ACTION.MANAGE]: onManageCTA,
    [ACTION.CTA]: onClickCTA,
    [ACTION.GO_BACKAction]: goBackAction,
  },
  clearPrevious: true,
};