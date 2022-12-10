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
    CarousalProps,
    ColorTokens,
    DividerProps,
    DividerSizeTokens,
    FontFamilyTokens,
    FontSizeTokens,
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
    TabsProps,
    TypographyBaseProps,
    TypographyProps,
    WIDGET,
  } from "@voltmoney/schema";
import { ACTION } from "./actions";
import { ROUTE } from "../../../routes";
import { clientRepoData } from "./repo";  

export const template:(
  clientRepoData: {
    name: string,
    stepsCompleted: number | string
  }[]
) => Promise<TemplateSchema> = async (clientRepoData) => {

  const buildDS = (index, name, stepsCompleted) => {
    return {
      [`listItem${index}`]: <StackProps> {
        type: StackType.column,
        width: StackWidth.FULL,
        widgetItems: [
          { id: `clientListTop${index}`, type: WIDGET.STACK },
          { id: `clientSpace0${index}`, type: WIDGET.SPACE},
          { id: `clientListBottomText${index}`, type: WIDGET.TEXT },
          { id: `dividerStack${index}`, type:WIDGET.STACK},
          
        ]
      },
      [`clientSpace0${index}`]: <SpaceProps> {
        size: SizeTypeTokens.SM,
      },
      [`dividerStack${index}`]: <StackProps> {
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: `divider${index}`, type:WIDGET.DIVIDER}
        ]
      },
      [`divider${index}`]: <DividerProps>{
        size: DividerSizeTokens.SM,
        color: ColorTokens.Grey_Milk_1,
        margin: {
          vertical: SizeTypeTokens.XL,
          horizontal: SizeTypeTokens.SM
        }
      },
      [`clientListTop${index}`]: <StackProps> {
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.spaceBetween,
        alignItems: StackAlignItems.center,
        widgetItems: [
          {id: `clientListTopName${index}`, type: WIDGET.TEXT}, 
          {id: `clientListTopTrackButton${index}`, type:WIDGET.BUTTON}
        ]
      },
      [`clientListBottomText${index}`]: <TypographyProps> {
        label: `${stepsCompleted}/7 completed`,
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 18,
        fontSize: FontSizeTokens.XS,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400"
      },
      [`clientListTopName${index}`]: <TypographyProps> {
        label: name,
        color: ColorTokens.Grey_Night,
        lineHeight: 24,
        fontSize: FontSizeTokens.MD,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600"
      },
      [`clientListTopTrackButton${index}`]: <ButtonProps> {
        label: "Track",
        type: ButtonTypeTokens.SmallGhost,
        fontFamily: FontFamilyTokens.Inter,
        width: ButtonWidthTypeToken.CONTENT
      },
      [`spaceListItem${index}`]: <SpaceProps>{ size: SizeTypeTokens.LG },
    };
  }
  
  let ds = {};
  clientRepoData.map((client, index) => {
    ds = {
      ...ds,
      ...buildDS(index, client.name, client.stepsCompleted),
    };
  });
  
  const buildUI = () => {
    const clArr = [];
    clientRepoData.map((client, index) => {
      clArr.push(
        { id: `listItem${index}`, type: WIDGET.STACK },
      )
    })
    return clArr;
  }

  return {
    layout: <Layout>{
      id: ROUTE.CAROUSAL_PAGE,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "tab", type: WIDGET.TABS },
        { id: "space1", type: WIDGET.SPACE },
        
        { id: "space1", type: WIDGET.SPACE },
        { id: "space2", type: WIDGET.SPACE },
        { id: "button", type: WIDGET.BUTTON, position: POSITION.ABSOLUTE_BOTTOM },
      ],
    },
    datastore: <Datastore>{
      tab: <TabsProps> {
        active: 0,
        options: [
          {
            label: "Pending",
            disabled: false
          },
          {
            label: "In progress",
            disabled: false
          }
        ],
        widgetItems: [
          { id:"PendingStack", type: WIDGET.STACK },
          { id:"text2", type: WIDGET.TEXT }
        ]
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.XL },
      PendingStack: <StackProps> {
        type: StackType.column,
        width: StackWidth.CONTENT,
        widgetItems: [
          { id: 'topPendingSpace', type: WIDGET.SPACE},
          ...buildUI(),
        ]
      },
      topPendingSpace: <SpaceProps> {
        size: SizeTypeTokens.Size30
      },
      text2: <TypographyBaseProps> {
        label: "in progress tab"
      },
      ...ds,
      space2: <SpaceProps>{ size: SizeTypeTokens.XXL },
      button: <ButtonProps>{
        fontFamily: FontFamilyTokens.Poppins,
        label: "Create new application",
        type: ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.GOTO_PHONE,
          routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST
        },
      },
    },
  }
   
  };
  

export const DistributorClientListMF: PageType<any> = {
    onLoad: async ({}) => {
      const templateX = await template(clientRepoData);
      return Promise.resolve(templateX);
    },
    actions: {
      //[ACTION.GOTO_PHONE]: GoToNumber,
    },
};