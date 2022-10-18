import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
} from "@voltmoney/types";
import {
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  SizeTypeTokens,
  SpaceProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION } from "./types";
import { fetchMyPortfolio } from "./actions";

export const template: (applicationId: string) => TemplateSchema = (
  applicationId
) => {
  return {
    layout: <Layout>{
      id: ROUTE.MF_PLEDGING,
      type: LAYOUTS.LIST,
      widgets: [
        {
          id: "continue",
          type: WIDGET.BUTTON,
          position: POSITION.FIXED_BOTTOM,
        },
        { id: "space0", type: WIDGET.SPACE },
        { id: "title", type: WIDGET.TEXT },
        { id: "space1", type: WIDGET.SPACE },
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "space2", type: WIDGET.SPACE },
        { id: "fetchCTA", type: WIDGET.BUTTON, position: POSITION.FAB },
      ],
    },
    datastore: <Datastore>{
      space0: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
      title: <TypographyProps>{
        label: "Check available cash limit",
        fontSize: FontSizeTokens.XL,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
      },
      subTitle: <TypographyProps>{
        label: "PAN is used to check your approved limit",
        color: ColorTokens.Grey_Charcoal,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
      },

      space1: <SpaceProps>{ size: SizeTypeTokens.SM },
      space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    },
  };
};

export const checkLimitMF: PageType<any> = {
  onLoad: async (_, { applicationId }) => {
    return Promise.resolve(template(applicationId));
  },
  actions: {
    [ACTION.FETCH_MY_PORTFOLIO]: fetchMyPortfolio,
  },
};
