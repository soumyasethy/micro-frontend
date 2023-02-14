export enum ACTION {
    ENTER_NAME = "ENTER_NAME",
    CONTINUE = "CONTINUE",
    DISABLE_CONTINUE = "DISABLE_CONTINUE",
    ENABLE_CONTINUE = "ENABLE_CONTINUE",
    BACK = "BACK",
    GO_TO_BASIC_DETAILS = "GO_TO_BASIC_DETAILS",
  }
  export type NamePayload = {
    value: string;
    widgetId: string;
  };
  
  export type ContinuePayload = {
    value: string;
    widgetId: string;
    applicationId: string;
  };
  

  export type StepperData = {
      borrowerViewStepperMap: {
        additionalProp1: {
          horizontalDisplayName: string,
          isEditable: boolean,
          message: string,
          order: number,
          status: string,
          verticalDescription: string,
          verticalDisplayName: string
        },
        additionalProp2: {
          horizontalDisplayName: string,
          isEditable: boolean,
          message: string,
          order: number,
          status: string,
          verticalDescription: string,
          verticalDisplayName: string
        },
        additionalProp3: {
          horizontalDisplayName: string,
          isEditable: boolean,
          message: string,
          order: number,
          status: string,
          verticalDescription: string,
          verticalDisplayName: string
        }
      },
      partnerViewStepperMap: {
        additionalProp1: {
          horizontalDisplayName: string,
          isEditable: boolean,
          message: string,
          order: number,
          status: string,
          verticalDescription: string,
          verticalDisplayName: string
        },
        additionalProp2: {
          horizontalDisplayName: string,
          isEditable: boolean,
          message: string,
          order: number,
          status: string,
          verticalDescription: string,
          verticalDisplayName: string
        },
        additionalProp3: {
          horizontalDisplayName: string,
          isEditable: boolean,
          message: string,
          order: number,
          status: string,
          verticalDescription: string,
          verticalDisplayName: string
        }
      }
    
  }