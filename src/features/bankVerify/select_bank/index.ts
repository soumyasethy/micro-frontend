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
  ColorTokens,
  GridImageItemProps,
  GridItemTypeTokens,
  HeaderProps,
  HeaderTypeTokens,
  InputTypeToken,
  KeyboardTypeToken,
  SizeTypeTokens,
  SpaceProps,
  TextInputProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
  ACTION,
  NavSearchIfscBranchInfoActionPayload,
  SearchActionPayload,
} from "./types";
import {
  SearchAction,
  NavSearchIfscBranchInfoAction,
  GoBackAction,
} from "./actions";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";

export const template: (BanksRepo: {
  ALLBANKS: { [key in string]: string };
  POPULAR: { [key in string]: string };
}) => Promise<TemplateSchema> = async (BanksRepo) => {
  console.warn("****** Bank Repo template ******", BanksRepo);
  return {
    layout: <Layout>{
      id: ROUTE.BANK_SELECT,
      type: LAYOUTS.LIST,
      widgets: [
        {
          id: "header",
          type: WIDGET.HEADER,
          position: POSITION.FIXED_TOP,
        },
        { id: "searchInput", type: WIDGET.INPUT },
        { id: "gridItem", type: WIDGET.GRIDITEM },
      ],
    },
    datastore: <Datastore>{
      header: <HeaderProps & WidgetProps>{
        isBackButton: true,
        type: HeaderTypeTokens.DEFAULT,
        title: "Select your bank",
        action: {
          type: ACTION.GO_BACK,
          routeId: ROUTE.BANK_SELECT,
          payload: {},
        },
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      searchInput: <TextInputProps & WidgetProps>{
        title: "",
        placeholder: "Search by bank name",
        type: InputTypeToken.DEFAULT,
        caption: { default: "", success: "", error: "" },
        keyboardType: KeyboardTypeToken.default,
        action: {
          type: ACTION.SEARCH_BANK,
          routeId: ROUTE.BANK_SELECT,
          payload: <SearchActionPayload>{
            bankRepo: BanksRepo,
            value: "",
            targetWidgetId: "gridItem",
          },
        },
      },
      searchInputSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      gridItem: <GridImageItemProps & WidgetProps>{
        type: GridItemTypeTokens.HORIZONTAl_VERITICAL,
        data: [
          ...Object.keys(BanksRepo.POPULAR).map((key) => ({
            label: BanksRepo.POPULAR[key],
            image: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/${key}.svg`,
            defaultUri: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/default.svg`,
          })),
        ],
        otherItem: [
          ...Object.keys(BanksRepo.ALLBANKS).map((key) => ({
            label: BanksRepo.ALLBANKS[key],
            image: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/${key}.svg`,
            defaultUri: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/default.svg`,
          })),
        ],
        title: "Popular banks",
        other: "All other banks",
        bgColor: ColorTokens.Grey_Milk,
        borderColor: ColorTokens.Grey_Milk_1,
        action: {
          type: ACTION.NAV_IFSC_SEARCH_BRANCH_INFO,
          routeId: ROUTE.BANK_SELECT,
          payload: <NavSearchIfscBranchInfoActionPayload>{
            value: "",
            bankRepo: BanksRepo,
          },
        },
      },
    },
  };
};

export const bankSelectMF: PageType<any> = {
  onLoad: async ({ network }) => {
    /*** Reset Bank Account Number on bank list re-load ***/
    await SharedPropsService.setAccountNumber("");

    const response = await network.get(api.banks, {
      headers: await getAppHeader(),
    });
    const BanksRepo = response.data;
    const templateX = await template(BanksRepo);
    return Promise.resolve(templateX);
  },
  actions: {
    [ACTION.GO_BACK]: GoBackAction,
    [ACTION.SEARCH_BANK]: SearchAction,
    [ACTION.NAV_IFSC_SEARCH_BRANCH_INFO]: NavSearchIfscBranchInfoAction,
  },
  clearPrevious: true,
};
