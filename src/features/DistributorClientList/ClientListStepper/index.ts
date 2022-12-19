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
    HeaderProps,
    HeaderTypeTokens,
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
import { ACTION, ClientInProgressPayloadType, ClientPendingPayloadType } from "./types";
import { ROUTE } from "../../../routes";
import { clientInProgressRepoData, clientPendingRepoData } from "./repo";  
import { onClickCTA, onManageCTA, onTrackCTA } from "./actions";

export const template:(
  clientPendingRepoData: {
    name: string,
    stepsCompleted: number|string,
    applicationId: string,
  }[], 
  clientInProgressRepoData: {
    name: string, 
    utilizedAmount: number|string,
    fullAmount: number|string,
    applicationId: string
  }[],
) => Promise<TemplateSchema> = async (clientPendingRepoData, clientInProgressRepoData) => {

  return {
    layout: <Layout>{
      id: ROUTE.DISTRIBUTOR_CLIENT_LIST_STEPPER,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
        { id: "topSpace0", type:WIDGET.SPACE },
      ],
    },
    datastore: <Datastore>{
      header: <HeaderProps> {
        title: "title",
        isBackButton: true,
        type: HeaderTypeTokens.DEFAULT,
        subTitle: "subtitle",
        widgetItem: { id: "subtitle", type: WIDGET.TEXT },
        rightWidgetItem: {
          id: "rightHeaderStack", type: WIDGET.STACK
        }
      },
      subtitle: <TypographyProps> {
        label: "Subtitle",
        color: ColorTokens.Grey_Charcoal,
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.XS,
        fontWeight: "400",
        lineHeight: 18,
      },
      topSpace0: <SpaceProps> {
        size: SizeTypeTokens.Size30
      },
      rightHeaderStack: <StackProps> {
        type: StackType.row,
        width: StackWidth.CONTENT,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "Icon", type: WIDGET.ICON },
          { id: "IconSpace", type: WIDGET.SPACE },
          { id: "IconText", type: WIDGET.TEXT }
        ]
      },
      IconSpace: <SpaceProps> { size: SizeTypeTokens.XS },
      Icon: <IconProps> {
        name: IconTokens.Share,
        size: IconSizeTokens.MD,
        color: ColorTokens.Primary_100,
        align: IconAlignmentTokens.center
      },
      IconText: <TypographyProps> {
        label: "Share",
        color: ColorTokens.Primary_100,
        lineHeight: 24,
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
      }
    }
  }
}
  

export const DistributorClientListStepperMF: PageType<any> = {
    onLoad: async ({}) => {
      const templateX = await template(clientPendingRepoData, clientInProgressRepoData);
      return Promise.resolve(templateX);
    },
    actions: {
      [ACTION.TRACK]: onTrackCTA,
      [ACTION.MANAGE]: onManageCTA,
      [ACTION.CTA]: onClickCTA,
    },
};