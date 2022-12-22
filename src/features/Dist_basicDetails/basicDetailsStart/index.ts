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
import { distributorStepperRepo, stepperRepo } from "../../../configs/utils";

export const template: (data: StepperItem[]) => TemplateSchema = (data) => ({
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
            icon:<IconProps>{
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
            uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUgAAAC+CAYAAABXqJaDAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALsSURBVHgB7dcxcRthFEbRfyU12wmCIcRMQiWIAiEOAzNwIBiCuh1H8iraIpmJ7YvA51TvI3Bn3jRulmW52+8P369jfLnN4wD4rK7jYV0v3+Z5fp62OO72h6chjAB/ndbXy/30cj7/uBXz6wDgn2mMx+nl9/k6AHjrtBsAfOQokABBIAGCQAIEgQQIAgkQBBIgCCRAEEiAIJAAQSABgkACBIEECAIJEAQSIAgkQBBIgCCQAEEgAYJAAgSBBAgCCRAEEiAIJEAQSIAgkABBIAGCQAIEgQQIAgkQBBIgCCRAEEiAIJAAQSABgkACBIEECAIJEAQSIAgkQBBIgCCQAEEgAYJAAgSBBAgCCRAEEiAIJEAQSIAgkABBIAGCQAIEgQQIAgkQBBIgCCRAEEiAIJAAQSABgkACBIEECAIJEAQSIAgkQBBIgCCQAEEgAYJAAgSBBAgCCRAEEiAIJEAQSIAgkABBIAGCQAIEgQQIAgkQBBIgCCRAEEiAIJAAQSABgkACBIEECAIJEAQSIAgkQBBIgCCQAEEgAYJAAgSBBAgCCRAEEiAIJEAQSIAgkABBIAGCQAIEgQQIAgkQBBIgCCRAEEiAIJAAQSABgkACBIEECAIJEAQSIAgkQBBIgCCQAEEgAYJAAgSBBAgCCRAEEiAIJEAQSIAgkABBIAGCQAIEgQQIAgkQBBIgCCRAEEiAIJAAQSABgkACBIEECAIJEAQSIAgkQBBIgCCQAEEgAYJAAgSBBAgCCRAEEiAIJEAQSIAgkABBIAGCQAIEgQQIAgkQBBIgCCRAEEiAIJAAQSABgkACBIEECAIJEAQSIAgkQBBIgCCQAEEgAYJAAgSBBAgCCRAEEiAIJEAQSIAgkABBIAGCQAIEgQQIAgkQBBIgCCRAEEiAIJAAQSABgkACBIEECAIJELZAngYA7+ymMX4NAP5zXdef07Isd7v94em2jwOAzWl9vdzv5nl+3o5xHQ8D4HM73b7qx62JWxv/AKTiODAjKLkxAAAAAElFTkSuQmCC",
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
});

export const basicDetailsStartMF: PageType<any> = {
    onLoad: async () => {
        return Promise.resolve(template(await distributorStepperRepo()));
    },
    actions: {
        [ACTION.GO_TO_BASIC_DETAILS]: Go_Next_Action,
        [ACTION.BACK]: goBack,
    },
    clearPrevious: true,
};
