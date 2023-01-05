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
  data: any
) => Promise<TemplateSchema> = async (applicationId, name, data) => {

  return {
    layout: <Layout>{
      id: ROUTE.DISTRIBUTOR_CLIENT_LIST_STEPPER,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
        { id: "topSpace0", type: WIDGET.SPACE },
        { id: "stepper", type: WIDGET.STEPPER }
      ],
    },
    datastore: <Datastore>{
      header: <HeaderProps>{
        action: {
          type: ACTION.GO_BACKAction,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST_STEPPER,
          payload: <{}>{},
      },
        title: `${name}`,
        isBackButton: true,
        type: HeaderTypeTokens.DEFAULT,
       // subTitle: `${stepperData}`,
        // widgetItem: { id: "subtitle", type: WIDGET.TEXT },
        // rightWidgetItem: {
        //   id: "rightHeaderStack", type: WIDGET.STACK
        // }
      },
      // subtitle: <TypographyProps> {
      //   label: "Subtitle",
      //   color: ColorTokens.Grey_Charcoal,
      //   fontFamily: FontFamilyTokens.Inter,
      //   fontSize: FontSizeTokens.XS,
      //   fontWeight: "400",
      //   lineHeight: 18,
      // },
      topSpace0: <SpaceProps>{
        size: SizeTypeTokens.XXXL
      },
      // rightHeaderStack: <StackProps> {
      //   type: StackType.row,
      //   width: StackWidth.CONTENT,
      //   justifyContent: StackJustifyContent.center,
      //   alignItems: StackAlignItems.center,
      //   widgetItems: [
      //     { id: "Icon", type: WIDGET.ICON },
      //     { id: "IconSpace", type: WIDGET.SPACE },
      //     { id: "IconText", type: WIDGET.TEXT }
      //   ]
      // },
      IconSpace: <SpaceProps>{ size: SizeTypeTokens.XS },
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
      }
    }
  }
}


export const DistributorClientListStepperMF: PageType<any> = {
  onLoad: async ({network},{applicationId,name,stepperData}) => {
  
    const steps = "2/7 Completed";
    let data1 = [];
    let data = []; 
    Object.keys(stepperData).map(key=> {
      const value = stepperData[key] 
      const stepData:any = new Object();
      stepData.title = value.verticalDisplayName;
      stepData.subTitle = value.verticalDescription;
      stepData.id =value.order;
      stepData.status = value.status;
      stepData.statusText = value.isEditable;
      data1.push(stepData);
      })

     // let sorted = Object.entries(stepperData);
       data = data1.sort(function (a, b) {
        return a.id - b.id;
      });
     
   
  //  Object.keys(stepperData).map(key=> {
  //    const value = stepperData[key];
  //     var map = new Map();

  //     map.set('title', value.verticalDisplayName);
  //     map.set('subTitle', value.verticalDescription);
  //     map.set('status', value.status);
  //     console.log("map",map);
  //     data.push([...map])
  //    })

    
    // const response = await network.post(
    //   partnerApi.stepperData,
    //   {
    //     applicationId:applicationId
    //   },
    //   { headers: await getAppHeader() }
    // );
    const templateX = await template(applicationId, name, data);
    return Promise.resolve(templateX);
  },
  actions: {
    [ACTION.TRACK]: onTrackCTA,
    [ACTION.MANAGE]: onManageCTA,
    [ACTION.CTA]: onClickCTA,
    [ACTION.GO_BACKAction]: goBackAction,
  },
};