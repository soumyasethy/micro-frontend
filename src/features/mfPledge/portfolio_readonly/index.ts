import {Datastore, Layout, LAYOUTS, PageType, TemplateSchema,} from "@voltmoney/types";
import {
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import {ROUTE} from "../../../routes";
import {ACTION} from "./types";
import {goBack,} from "./actions";
import {StepResponseObject} from "../unlock_limit/types";
import SharedPropsService from "../../../SharedPropsService";
import {portfolioListDatastoreBuilder} from "./utils";

export const template: (
  stepResponseObject: StepResponseObject
) => Promise<TemplateSchema> = async (stepResponseObject) => {
  return {
    layout: <Layout>{
      id: ROUTE.PORTFOLIO,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "title", type: WIDGET.TEXT },
        { id: "space0", type: WIDGET.SPACE},
        { id: "subtitleStack", type: WIDGET.STACK},
        { id: "listItem", type: WIDGET.LIST },
      ],
    },
    datastore: <Datastore>{
      subtitleStack: <StackProps> {
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.spaceBetween,
        padding: {
          right: SizeTypeTokens.XL
        },
        widgetItems: [
          { id: "columntitle1", type: WIDGET.TEXT },
          { id: "columntitle2", type: WIDGET.TEXT },
        ]
      },
      title: <TypographyProps> {
        label: "Credit limit on basis of these assets",
        fontSize: FontSizeTokens.MD,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
        lineHeight: 24
      },
      columntitle1: <TypographyProps> {
        label: "Asset details",
        color: ColorTokens.Grey_Charcoal,
        fontSize: FontSizeTokens.XS,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "500",
        lineHeight: 18
      },
      columntitle2: <TypographyProps> {
        label: "Credit limit",
        color: ColorTokens.Grey_Charcoal,
        fontSize: FontSizeTokens.XS,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "500",
        lineHeight: 18
      },
      ...(await portfolioListDatastoreBuilder(stepResponseObject)),
      space0: <SpaceProps> {
        size: SizeTypeTokens.XL
      }
    },
  };
};

export const portfolioReadOnlyMF: PageType<any> = {
  onLoad: async ({}, { stepResponseObject, updateAvailableCASMap }) => {
    await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
    return Promise.resolve(await template(stepResponseObject));
  },
  actions: {
    [ACTION.BACK_BUTTON]: goBack,
  },
  clearPrevious: true,
};
