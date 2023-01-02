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
      ColorTokens,
      FontFamilyTokens,
      FontSizeTokens,
    HeaderProps,
    HeaderTypeTokens,
    InputStateToken,
    InputTypeToken,
    KeyboardTypeToken,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    StepperItem,
    StepperProps,
    StepperTypeTokens,
    TextInputProps,
    TypographyProps,
    WIDGET,
  } from "@voltmoney/schema";
  import { ROUTE } from "../../../routes";
  import { ACTION, OtpPayload, SearchPortfolioPayload } from "./types";
  import {
    TriggerCTA,
    goBack,
    ToggleSelectAction,
    EditItem,
    SearchPortfolio,
    ClearSearchPortfolio,
  } from "./actions";
  import { StepResponseObject } from "../../unlockLimit/unlock_limit/types";
  import SharedPropsService from "../../../SharedPropsService";
  import { portfolioListDatastoreBuilder } from "./utils";
import { horizontalDistributorStepperRepo } from "../../../configs/utils";
import { partnerApi } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
  
  export const template: (
    stepResponseObject: StepResponseObject,
    stepper: StepperItem[]
  ) => Promise<TemplateSchema> = async (
    stepResponseObject,
    stepper
    ) => {
    return {
      layout: <Layout>{
        id: ROUTE.SELECT_DISTRIBUTOR_PORTFOLIO,
        type: LAYOUTS.LIST,
        widgets: [
          { id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
          { id: "spaceHeader", type: WIDGET.SPACE },
          { id: "spaceHeader1", type: WIDGET.SPACE },
          // 
          {id:"heading",type:WIDGET.STACK},
          { id: "inputSpace", type: WIDGET.SPACE },
          { id: "inputItem", type: WIDGET.INPUT },
          { id: "listItem", type: WIDGET.LIST },
          { id: "listSpace", type: WIDGET.SPACE },
          {
            id: "totalItem",
            type: WIDGET.CTACARD,
            position: POSITION.STICKY_BOTTOM,
            padding: {
              left: 0,
              right: 0,
              horizontal: 0,
            },
          },
        ],
      },
      datastore: <Datastore>{
        header: <HeaderProps & WidgetProps>{
            isBackButton: true,
            type: HeaderTypeTokens.verification,
            leftCta: "Share",
            trailIcon: "Share",
            stepperProps: <StepperProps>{
                data: stepper,
                type: StepperTypeTokens.HORIZONTAL,
            },
            title: "Create new application",
            action: {
                type: ACTION.BACK_BUTTON,
                routeId: ROUTE.SELECT_DISTRIBUTOR_PORTFOLIO,
                payload: {},
            },
            // leftAction: {
            //     type: ACTION.SHARE,
            //     routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
            //     payload: {},
            // },
        },
        spaceHeader: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        spaceHeader1: <SpaceProps>{ size: SizeTypeTokens.SM },
        heading:<StackProps>{
            type:StackType.row,
            alignItems:StackAlignItems.center,
            justifyContent:StackJustifyContent.center,
            widgetItems: [
                { id: "headItems", type: WIDGET.TEXT },
                { id: "trailItems", type: WIDGET.STACK },
            ],
        },
        headItems:<TypographyProps>{
            label: "Select portfolio",
            fontSize: FontSizeTokens.MD,
            fontWeight: '700',
            color: ColorTokens.Grey_Night,
            lineHeight: 24,
            fontFamily: FontFamilyTokens.Inter
        },
        trailItems:<StackProps>{
            type:StackType.row,
            alignItems:StackAlignItems.flexEnd,
            justifyContent:StackJustifyContent.flexEnd,
            widgetItems: [
                { id: "btnItems", type: WIDGET.BUTTON }
            ],
        },
        btnItems:<ButtonProps & WidgetProps>{
            label: "Filter",
            type: ButtonTypeTokens.SmallGhost,
            labelColor: ColorTokens.Primary_100,
            width: ButtonWidthTypeToken.CONTENT,
            action: {
                type: ACTION.BACK_BUTTON,
                routeId: ROUTE.SELECT_DISTRIBUTOR_PORTFOLIO,
                payload: <{}>{},
            },
        },
     
        inputSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
        inputItem: <TextInputProps & WidgetProps>{
          type: InputTypeToken.SEARCH,
          state: InputStateToken.DEFAULT,
          placeholder: "Search Portfolio",
          title: "",
          caption: { success: "", error: "" },
          keyboardType: KeyboardTypeToken.default,
          action: {
            type: ACTION.SEARCH_PORTFOLIO,
            payload: <SearchPortfolioPayload>{
              value: "",
              widgetId: "listItem",
              stepResponseObject,
            },
            routeId: ROUTE.SELECT_DISTRIBUTOR_PORTFOLIO,
          },
          clearAction: {
            type: ACTION.CLEAR_SEARCH_PORTFOLIO,
            routeId: ROUTE.SELECT_DISTRIBUTOR_PORTFOLIO,
            payload: {},
          },
        },
        listSpace: <SpaceProps>{ size: SizeTypeTokens.XS },
        ...(await portfolioListDatastoreBuilder(stepResponseObject)),
      },
    };
  };
  
  export const selectDistributorPortfolioMF: PageType<any> = {
    onLoad: async ({network}, { 
      stepResponseObject
      , updateAvailableCASMap
     }) => {
      const applicationId = await SharedPropsService.getApplicationId();
      // const response = await network.get(
      //   `${partnerApi.pledgeLimit}${applicationId}`,
      //   {
      //     headers: await getAppHeader(),
      //   }
      // );
      await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
    // const stepResponseObject = response.data.stepResponseObject;
      const stepper: StepperItem[] = await horizontalDistributorStepperRepo();
      return Promise.resolve(await template(
        stepResponseObject,
        stepper
        ));
    },
    actions: {
      [ACTION.PORTFOLIO]: TriggerCTA,
      [ACTION.SEARCH_PORTFOLIO]: SearchPortfolio,
      [ACTION.CLEAR_SEARCH_PORTFOLIO]: ClearSearchPortfolio,
      [ACTION.BACK_BUTTON]: goBack,
      [ACTION.TOGGLE_ITEM]: ToggleSelectAction,
      [ACTION.EDIT_ITEM]: EditItem,
    },
    clearPrevious: true,
  };
  