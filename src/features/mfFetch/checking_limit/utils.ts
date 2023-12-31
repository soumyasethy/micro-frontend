import {
  FontFamilyTokens,
  FontSizeTokens,
  LottieProps,
  LottieSizeTokens,
  LottieTokens,
  PaddingProps, PaddingSizeTokens,
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
import {POSITION} from "@voltmoney/types";

export const listItems = [
  {
    id: "titleSpace1",
    type: WIDGET.SPACE,
  },
  {
    id: "listItemStack1",
    type: WIDGET.STACK,
  },
  {
    id: "titleSpace2",
    type: WIDGET.SPACE,
  },
  {
    id: "listItemStack2",
    type: WIDGET.STACK,
  },
  {
    id: "titleSpace3",
    type: WIDGET.SPACE,
  },
  {
    id: "listItemStack3",
    type: WIDGET.STACK,
  },
];
export const buildDataStore = () => {
  let datastoreMap = {};
  const titleMap = {
    1: "Setting up a secure connection",
    2: "Getting your portfolio details",
    3: "Calculating your credit limit",
  };
  /*** Need to add 3 list item stacks in the datastore */
  [1, 2, 3].forEach((i) => {
    const item = {
      [`titleSpace${i}`]: <SpaceProps>{ size: SizeTypeTokens.Size32 },
      [`listItemStack${i}`]: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.stretch,
        justifyContent: StackJustifyContent.spaceBetween,
        width: StackWidth.FULL,
        widgetItems: [
          { id: `itemLabel${i}`, type: WIDGET.TEXT },
          { id: `itemIconSpace${i}`, type: WIDGET.SPACE },
          { id: `itemIcon${i}`, type: WIDGET.LOTTIE },
        ],
      },
      [`itemLabel${i}`]: <TypographyProps>{
        label: `${titleMap[i]}`,
        fontFamily: FontFamilyTokens.Inter,
        lineHeight: 24,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
      },
      [`itemIconSpace${i}`]: <SpaceProps>{ size: SizeTypeTokens.XL },
      [`itemIcon${i}`]: <LottieProps>{
        uri: LottieTokens.Loading,
        size: LottieSizeTokens.Size28,
        loop: false,
        autoplay: true,
      },
    };
    datastoreMap = { ...datastoreMap, ...item };
  });

  return datastoreMap;
};
