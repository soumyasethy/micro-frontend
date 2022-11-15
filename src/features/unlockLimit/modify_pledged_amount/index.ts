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
import { EditAmountAction, ModifyAmountAction } from "./actions";
import { StepResponseObject } from "../unlock_limit/types";
import { getTotalLimit } from "../portfolio/actions";

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
        justifyContent: StackJustifyContent.spaceBetween,
        widgetItems: [
          { id: "imageItem", type: WIDGET.IMAGE },
          { id: "trailIcon", type: WIDGET.ICON },
        ],
      },

      imageItem: <ImageProps>{
        uri: "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
        size: ImageSizeTokens.XS,
        aspectRatio: AspectRatioToken.A1_1,
        borderRadius: BorderRadiusTokens.BR1,
        padding: SizeTypeTokens.SM,
      },
      trailIcon: <IconProps>{
        name: IconTokens.Cancel,
        size: IconSizeTokens.MD,
        color: ColorTokens.Grey_Night,
      },
      titleSpace: <SpaceProps>{ size: SizeTypeTokens.SM },
      subTitle: <TypographyProps>{
        label: stepResponseObject.availableCAS[index].schemeName,
        fontSize: FontSizeTokens.LG,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
      },
      subTitleSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
      input: <TextInputProps & WidgetProps>{
        type: InputTypeToken.DEFAULT,
        state: InputStateToken.DEFAULT,
        placeholder: "",
        title: "Enter amount",
        limit: getTotalLimit(
          [stepResponseObject.availableCAS[index]],
          stepResponseObject.isinNAVMap,
          stepResponseObject.isinLTVMap
        ),
        caption: { success: "", error: "" },
        keyboardType: KeyboardTypeToken.decimalPad,
        action: {
          type: ACTION.EDIT_AMOUNT,
          payload: <AmountPayload>{ value: "" },
          routeId: ROUTE.MODIFY_PLEDGED_AMOUNT,
        },
      },
      inputSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      continue: <ButtonProps & WidgetProps>{
        label: "Update amount",
        type: ButtonTypeTokens.MediumFilled,
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
  },
  clearPrevious: true,
};
