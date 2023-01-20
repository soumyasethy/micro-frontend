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
    ResizeModeToken,
    SizeTypeTokens,
    SpaceProps,
    StepperItem,
    StepperProps,
    StepperTypeTokens,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import { goBack, Go_Next_Action } from "./action";
import SharedPropsService from "../../../SharedPropsService";

export const template: (
    data: any
  ) => Promise<TemplateSchema> = async (data) => {
    return {
    layout: <Layout>{
        id: ROUTE.BASIC_DETAILS_START,
        type: LAYOUTS.LIST,
        widgets: [
            { id: "space0", type: WIDGET.SPACE },
            { id: "title", type: WIDGET.BUTTON },
            { id: "space1", type: WIDGET.SPACE },
            { id: "image", type: WIDGET.IMAGE },
            { id: "space", type: WIDGET.SPACE },
            { id: "spaceExtra", type: WIDGET.SPACE },
            { id: "stepper", type: WIDGET.STEPPER },
            { id: "space2", type: WIDGET.SPACE },
            {
                id: "continue",
                type: WIDGET.BUTTON,
                position: POSITION.ABSOLUTE_BOTTOM,
            },
        ],
    },
    datastore: <Datastore>{
        space0: <SpaceProps>{
            size: SizeTypeTokens.MD,
        },
        title: <ButtonProps & WidgetProps>{
            label: "",
            type: ButtonTypeTokens.SmallGhost,
            width: ButtonWidthTypeToken.CONTENT,
            fontFamily: FontFamilyTokens.Inter,
            fontSize: FontSizeTokens.MD,
            lineHeight: SizeTypeTokens.XXL,
            icon: <IconProps>{
                name: IconTokens.Cross,
                size: IconSizeTokens.XXXL,
                color: ColorTokens.Grey_Charcoal
            },
            action: {
                type: ACTION.BACK,
                routeId: ROUTE.BASIC_DETAILS_START,
                payload: {},
            },
        },

        space1: <SpaceProps>{
            size: SizeTypeTokens.XXL,
        },
        image: <ImageProps>{
            size: ImageSizeTokens.FULL,
            //  height:190,
            // width:328,
            resizeMode: ResizeModeToken.COVER,
            aspectRatio: AspectRatioToken.A2_1,
            uri: "data:image/png;base64,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",
        },
        space: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        spaceExtra: <SpaceProps>{ size: SizeTypeTokens.XS },
        stepper: <StepperProps & WidgetProps>{
            type: StepperTypeTokens.DISTRIBUTOR,
            data: data,
        },
        continue: <ButtonProps & WidgetProps>{
            label: "Start",
            type: ButtonTypeTokens.LargeFilled,
            width: ButtonWidthTypeToken.FULL,
            fontFamily: FontFamilyTokens.Inter,
            fontSize: FontSizeTokens.MD,
            lineHeight: SizeTypeTokens.XXL,
            action: {
                type: ACTION.GO_TO_BASIC_DETAILS,
                routeId: ROUTE.BASIC_DETAILS_START,
                payload: {},
            },
        },
    },
}
};

export const basicDetailsStartMF: PageType<any> = {
    onLoad: async ({ network }) => {
        const data = await SharedPropsService.getStepperData();
        const templateX = await template( data);
        return Promise.resolve(templateX);
    },
    actions: {
        [ACTION.GO_TO_BASIC_DETAILS]: Go_Next_Action,
        [ACTION.BACK]: goBack,
    },
    clearPrevious: true,
};
