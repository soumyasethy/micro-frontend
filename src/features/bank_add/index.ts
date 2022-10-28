import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
  WidgetItem,
  WidgetProps,
} from "@voltmoney/types";
import {
  ColorTokens,
  FontSizeTokens,
  gridImageItemProps,
  gridItemTypeTokens,
  ImageProps,
  InputTypeToken,
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
import { ROUTE } from "../../routes";
import { ACTION } from "./types";
import { TestAction } from "./actions";
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
      id: ROUTE.BANK_ACCOUNT_ADD,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "space1", type: WIDGET.SPACE },
        { id: "searchInput", type: WIDGET.INPUT },
        { id: "searchInputSpace", type: WIDGET.SPACE },
        { id: "gridItem", type: WIDGET.GRIDITEM },
      ],
    },
    datastore: <Datastore>{
      space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      searchInput: <TextInputProps & WidgetProps>{
        placeholder: "Search by bank name",
        type: InputTypeToken.DEFAULT,
        caption: { success: "", error: "" },
      },
      searchInputSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      gridItem: <gridImageItemProps>{
        type: gridItemTypeTokens.horizontal,
        data: [
          {
            label: "HDFC",
            image:
              "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
          },
        ],
        otherItem: [
          {
            label: "HDFC",
            image:
              "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
          },
        ],
        title: "Popular banks",
        other: "All other banks",
        bgColor: ColorTokens.Grey_Milk,
        borderColor: ColorTokens.Grey_Milk_1,

      },
      title1: <TypographyProps>{
        label: "Popular banks",
        color: ColorTokens.Grey_Night,
        fontSize: FontSizeTokens.SM,
        fontWeight: "600",
      },
      spaceTitle: <SpaceProps>{ size: SizeTypeTokens.XL },
      stack1: <StackProps>{
        type: StackType.row,
        justifyContent: StackJustifyContent.spaceBetween,
        alignItems: StackAlignItems.flexStart,
        widgetItems: [
          ...popularBanks
            .slice(0, popularBanks.length / 2)
            .map((item) => item.widgetItem),
        ],
      },
      stackSpace1: <SpaceProps>{ size: SizeTypeTokens.XXL },
      stack2: <StackProps>{
        type: StackType.row,
        justifyContent: StackJustifyContent.spaceBetween,
        alignItems: StackAlignItems.flexStart,
        widgetItems: [
          ...popularBanks
            .slice(popularBanks.length / 2, popularBanks.length - 1)
            .map((item) => item.widgetItem),
        ],
      },
      stackSpace2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      title2: <TypographyProps>{
        label: "All other banks",
        color: ColorTokens.Grey_Night,
        fontSize: FontSizeTokens.SM,
        fontWeight: "600",
      },
      titleSpace2: <SpaceProps>{ size: SizeTypeTokens.XL },
      stack3: <StackProps>{
        type: StackType.column,
        justifyContent: StackJustifyContent.spaceBetween,
        alignItems: StackAlignItems.flexStart,
        widgetItems: [...allOtherBanks.map((item) => item.widgetItem)],
      },
      ...populatDS,
    },
  };
};

export const bankAddMF: PageType<any> = {
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
    // console.info("template-----> ", JSON.stringify(templateX));
    return Promise.resolve(templateX);
  },
  actions: {
    [ACTION.TEST_ACTION]: TestAction,
  },
};
