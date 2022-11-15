import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
  WidgetItem,
  WidgetProps,
} from "@voltmoney/types";
import {
  ColorTokens,
  GridImageItemProps,
  GridItemTypeTokens,
  HeaderProps,
  HeaderTypeTokens,
  ImageProps,
  InputTypeToken,
  KeyboardTypeToken,
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
import { BanksRepo } from "./repo";

const popularBankItem = (
  id: string,
  label: string,
  type: "COLUMN" | "ROW"
) => ({
  widgetItem: { id: `popular_bank_item_${id}`, type: WIDGET.STACK },
  datastore: <Datastore>{
    [`popular_bank_item_${id}`]: <StackProps>{
      type: type ? type : StackType.column,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.center,
      widgetItems: [
        { id: `bank_logo_${id}`, type: WIDGET.IMAGE },
        { id: `bank_space_${id}`, type: WIDGET.SPACE },
        { id: `bank_name_${id}`, type: WIDGET.TEXT },
      ],
    },
    [`bank_logo_${id}`]: <ImageProps>{
      uri: "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
    },
    [`bank_space_${id}`]: <SpaceProps>{ size: SizeTypeTokens.MD },
    [`bank_name_${id}`]: <TypographyProps>{ label: label },
  },
});

export const template: (
  popularBanks: {
    widgetItem: WidgetItem;
    datastore: Datastore;
  }[],
  populatDS: Object,
  allOtherBanks: {
    widgetItem: { id: string; type: WIDGET };
    datastore: Datastore;
  }[]
) => Promise<TemplateSchema> = async (
  popularBanks,
  populatDS,
  allOtherBanks
) => {
  return {
    layout: <Layout>{
      id: ROUTE.BANK_VERIFY_MANUALLY,
      type: LAYOUTS.LIST,
      widgets: [
        {
          id: "header",
          type: WIDGET.HEADER,
          position: POSITION.FIXED_TOP,
        },
        // { id: "space1", type: WIDGET.SPACE },
        { id: "searchInput", type: WIDGET.INPUT },
        // { id: "searchInputSpace", type: WIDGET.SPACE },
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
          routeId: ROUTE.BANK_VERIFY_MANUALLY,
          payload: {},
        },
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      searchInput: <TextInputProps & WidgetProps>{
        placeholder: "Search by bank name",
        type: InputTypeToken.DEFAULT,
        caption: { default: "", success: "", error: "" },
        keyboardType: KeyboardTypeToken.default,
        action: {
          type: ACTION.SEARCH_BANK,
          routeId: ROUTE.BANK_VERIFY_MANUALLY,
          payload: <SearchActionPayload>{
            value: "",
            targetWidgetId: "gridItem",
          },
        },
      },
      searchInputSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      gridItem: <GridImageItemProps & WidgetProps>{
        type: GridItemTypeTokens.HORIZONTAl_VERITICAL,
        data: [
          ...Object.values(BanksRepo.POPULAR).map((name) => ({
            label: name,
            image:
              "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
          })),
        ],
        otherItem: [
          ...Object.values(BanksRepo.ALLBANKS).map((name) => ({
            label: name,
            image:
              "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
          })),
        ],
        title: "Popular banks",
        other: "All other banks",
        bgColor: ColorTokens.Grey_Milk,
        borderColor: ColorTokens.Grey_Milk_1,
        action: {
          type: ACTION.NAV_IFSC_SEARCH_BRANCH_INFO,
          routeId: ROUTE.BANK_VERIFY_MANUALLY,
          payload: <NavSearchIfscBranchInfoActionPayload>{ value: "" },
        },
      },
    },
  };
};

export const bankVerifyManuallyMF: PageType<any> = {
  onLoad: async () => {
    let populatDS = {};
    const popularBanks: {
      widgetItem: WidgetItem;
      datastore: Datastore;
    }[] = Object.keys(BanksRepo.POPULAR).map((keys) => {
      return popularBankItem(keys, BanksRepo.POPULAR[keys], "COLUMN");
    });

    popularBanks.map((item) => {
      populatDS = { ...populatDS, ...item.datastore };
    });
    const allOtherBanks: {
      widgetItem: { id: string; type: WIDGET };
      datastore: Datastore;
    }[] = Object.keys(BanksRepo.ALLBANKS).map((keys) =>
      popularBankItem(keys, BanksRepo.ALLBANKS[keys], "ROW")
    );
    allOtherBanks.map((item) => {
      populatDS = { ...populatDS, ...item.datastore };
    });
    const templateX = await template(popularBanks, populatDS, allOtherBanks);
    return Promise.resolve(templateX);
  },
  actions: {
    [ACTION.GO_BACK]: GoBackAction,
    [ACTION.SEARCH_BANK]: SearchAction,
    [ACTION.NAV_IFSC_SEARCH_BRANCH_INFO]: NavSearchIfscBranchInfoAction,
  },
  clearPrevious: true,
};
