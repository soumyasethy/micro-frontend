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
  AspectRatioToken,
  BorderRadiusTokens,
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  ImageProps,
  ImageSizeTokens,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  ListItemDataProps,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, AmountPayload, ModifyAmountPayload } from "./types";
import { EditAmountAction, ModifyAmountAction, goBack } from "./actions";
import { StepResponseObject } from "../unlock_limit/types";
import { getActualLimit, getTotalLimit } from "../portfolio/actions";
import { roundDownToNearestHundred } from "../../../configs/utils";

export const template: (
  index: number,
  stepResponseObject: StepResponseObject,
  selectedMap: { [keys in number]: boolean },
  portfolioSearchKeyword?: string
) => TemplateSchema = (
  index,
  stepResponseObject,
  selectedMap,
  portfolioSearchKeyword
) => {
  return {
    layout: <Layout>{
      id: ROUTE.MODIFY_PLEDGED_AMOUNT,
      type: LAYOUTS.MODAL,
      widgets: [
        {
          id: "headerStack",
          type: WIDGET.STACK,
        },
        { id: "titleSpace", type: WIDGET.SPACE },
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "subTitleSpace", type: WIDGET.SPACE },
        { id: "input", type: WIDGET.INPUT },
        { id: "inputSpace", type: WIDGET.SPACE },
        { id: "continue", type: WIDGET.BUTTON },
      ],
    },
    datastore: <Datastore>{
      headerStack: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.flexEnd,
        widgetItems: [
          // { id: "imageItem", type: WIDGET.IMAGE },
          { id: "trailIcon", type: WIDGET.ICON },
        ],
      },
      // imageItem: <ImageProps>{
      //   uri: stepResponseObject.availableCAS[index].schemeName,
      //   size: ImageSizeTokens.XS,
      //   aspectRatio: AspectRatioToken.A1_1,
      //   borderRadius: BorderRadiusTokens.BR1,
      //   padding: SizeTypeTokens.SM,
      // },
      trailIcon: <IconProps & WidgetProps>{
        name: IconTokens.Cancel,
        size: IconSizeTokens.XXXXL,
        color: ColorTokens.Grey_Night,
        action: {
          type: ACTION.GO_BACK,
          routeId: ROUTE.MODIFY_PLEDGED_AMOUNT,
        },
      },
      titleSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
      subTitle: <TypographyProps>{
        label: stepResponseObject.availableCAS[index].schemeName,
        fontSize: FontSizeTokens.LG,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
      },
      subTitleSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      input: <TextInputProps & WidgetProps>{
        type: InputTypeToken.DEFAULT,
        state: InputStateToken.DEFAULT,
        placeholder: "",
        title: "Enter amount",
        limit: getActualLimit(
          [stepResponseObject.availableCAS[index]],
          stepResponseObject.isinNAVMap,
          stepResponseObject.isinLTVMap
        ),
        limitLabel:
          "out of ₹ " +
          `${roundDownToNearestHundred(
            getActualLimit(
              [stepResponseObject.availableCAS[index]],
              stepResponseObject.isinNAVMap,
              stepResponseObject.isinLTVMap
            )
          )}`.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ","),
        caption: { success: "", error: "" },
        keyboardType: KeyboardTypeToken.numberPad,
        action: {
          type: ACTION.EDIT_AMOUNT,
          payload: <AmountPayload>{ value: "" },
          routeId: ROUTE.MODIFY_PLEDGED_AMOUNT,
        },
      },
      inputSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      continue: <ButtonProps & WidgetProps>{
        label: "Update amount",
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        type: ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.MODIFY_PLEDGED_AMOUNT,
          payload: <ModifyAmountPayload>{
            index,
            stepResponseObject,
            selectedMap,
            portfolioSearchKeyword,
          },
          routeId: ROUTE.MODIFY_PLEDGED_AMOUNT,
        },
      },
    },
  };
};

export const modifyPledgeMF: PageType<any> = {
  onLoad: async (
    {},
    { index, stepResponseObject, selectedMap, portfolioSearchKeyword }
  ) => {
    return Promise.resolve(
      template(index, stepResponseObject, selectedMap, portfolioSearchKeyword)
    );
  },
  actions: {
    [ACTION.MODIFY_PLEDGED_AMOUNT]: ModifyAmountAction,
    [ACTION.EDIT_AMOUNT]: EditAmountAction,
    [ACTION.GO_BACK]: goBack,
  },
  clearPrevious: true,
};
