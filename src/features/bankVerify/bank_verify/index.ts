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
  BorderRadiusTokens,
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  IconAlignmentTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  ImageProps,
  ImageSizeTokens,
  SelectiveListItemProps,
  SelectiveListItemStateTokens,
  SelectiveListItemTypeTokens,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  StepperItem,
  StepperProps,
  StepperStateToken,
  StepperTypeTokens,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, BAVVerifyActionPayload, ToggleActionPayload } from "./types";
import {
  AddAccountNavAction,
  BavVerifyAction,
  GoBackAction,
  GoNext,
  ToggleSelectAction,
} from "./actions";
import { fetchBankRepo } from "./repo";
import {horizontalStepperRepo, stepperRepo} from "../../../configs/utils";

export const template: (
  banks: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    stepper: StepperItem[];
  }[],
  stepper: StepperItem[]
) => Promise<TemplateSchema> = async (banks, stepper) => {
  const buildDS = (
    index: number,
    name: string,
    accountNo: string,
    ifscCode: string
  ) => {
    return {
      [`listItem${index}`]: <SelectiveListItemProps & WidgetProps>{
        type: SelectiveListItemTypeTokens.list,
        state: SelectiveListItemStateTokens.NOT_SELECTED,
        subTitle: accountNo,
        title: name,
        imageUrl: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/${ifscCode.substring(
          0,
          4
        )}.svg`,
        action: {
          type: ACTION.TOGGLE_SELECT,
          routeId: ROUTE.BANK_ACCOUNT_VERIFICATION,
          payload: <ToggleActionPayload>{
            value: SelectiveListItemStateTokens.SELECTED,
            targetWidgetId: `listItem${index}`,
            bankIfscCode: ifscCode,
            bankAccountNumber: accountNo,
          },
        },
      },
      [`spaceListItem${index}`]: <SpaceProps>{ size: SizeTypeTokens.LG },
    };
  };
  let ds = {};
  banks.map((bank, index) => {
    ds = {
      ...ds,
      ...buildDS(index, bank.bankName, bank.accountNumber, bank.ifscCode),
    };
  });
  const buildUI = () => {
    const UIArr = [];
    banks.map((bank, index) => {
      UIArr.push(
        { id: `listItem${index}`, type: WIDGET.SELECTIVE_LIST_ITEM },
        { id: `spaceListItem${index}`, type: WIDGET.SPACE }
      );
    });
    return UIArr;
  };
  return {
    layout: <Layout>{
      id: ROUTE.BANK_ACCOUNT_VERIFICATION,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
        { id: "space1", type: WIDGET.SPACE },
        { id: "titleStack", type: WIDGET.STACK },
        { id: "titleSpace", type: WIDGET.SPACE },
        ...buildUI(),
        { id: "spaceContinue", type: WIDGET.SPACE },
        { id: "continue", type: WIDGET.BUTTON },
        { id: "spaceImage", type: WIDGET.SPACE },
        {id:"commonStack",type: WIDGET.STACK, position: POSITION.ABSOLUTE_BOTTOM},
        
        
      ],
    },
    datastore: <Datastore>{
      header: <HeaderProps & WidgetProps>{
        isBackButton: true,
        leadIcon: "https://reactnative.dev/img/tiny_logo.png",
        subTitle:
          "Volt Protects your financial information with Bank Grade Security",
        title: "Bank Verification",
        type: HeaderTypeTokens.verification,
        stepperProps: <StepperProps>{
          type: StepperTypeTokens.HORIZONTAL,
          data: stepper,
        },
        action: {
          type: ACTION.GO_BACK,
          routeId: ROUTE.BANK_ACCOUNT_VERIFICATION,
          payload: {},
        },
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      titleStack: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.spaceBetween,
        widgetItems: [
          { id: "bank_select", type: WIDGET.TEXT },
          { id: "addAccountStack", type: WIDGET.STACK },
        ],
      },
      addAccountStack: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.flexStart,
        widgetItems: [
          { id: "icon", type: WIDGET.ICON },
          { id: "iconSpace", type: WIDGET.SPACE },
          { id: "addUser", type: WIDGET.TEXT },
        ],
        action: {
          type: ACTION.GO_ADD_ACCOUNT,
          routeId: ROUTE.BANK_ACCOUNT_VERIFICATION,
          payload: {},
        },
      },
      titleSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
      bank_select: <TypographyProps>{
        label: "Select a bank account",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Night,
        fontWeight: "600",
      },
      icon: <IconProps>{
        name: IconTokens.Add,
        size: IconSizeTokens.XL,
      },
      iconSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
      addUser: <TypographyProps>{
        label: "Add account",
        color: ColorTokens.Primary_100,
        fontSize: FontSizeTokens.SM,
        fontWeight: "600",
      },
      add_account: <ButtonProps & WidgetProps>{
        label: "Add account",
        type: ButtonTypeTokens.LargeGhost,
        width: ButtonWidthTypeToken.CONTENT,
        icon: {
          name: IconTokens.Add,
          size: IconSizeTokens.XL,
          align: IconAlignmentTokens.left,
        },
        action: {
          type: ACTION.GO_ADD_ACCOUNT,
          routeId: ROUTE.BANK_ACCOUNT_VERIFICATION,
          payload: {},
        },
      },
      ...ds,
      spaceContinue: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
      continue: <ButtonProps & WidgetProps>{
        label: "Continue",
        type: ButtonTypeTokens.LargeOutline,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.TRIGGER_CTA,
          routeId: ROUTE.BANK_ACCOUNT_VERIFICATION,
          payload: <BAVVerifyActionPayload>{
            applicationId: "",
          },
        },
      },
      spaceImage: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      commonStack: <StackProps & WidgetProps>{
        type: StackType.column,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "imageStack", type: WIDGET.STACK },
          { id: "spaceCertificate", type: WIDGET.SPACE },
          { id: "certifiedStack", type: WIDGET.STACK },
          
        ]
      },
      
      imageStack: <StackProps & WidgetProps>{
        type: StackType.row,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "image1", type: WIDGET.IMAGE },
          {id:"spaceImg", type: WIDGET.SPACE},
          { id: "image2", type: WIDGET.IMAGE },
        ]
      },
      image1: <ImageProps>{
        uri: 'data:image/png;base64,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',
        size: ImageSizeTokens.SM,
        aspectRatio: AspectRatioToken.A1_1,
        borderRadius: BorderRadiusTokens.BR0,
        padding: SizeTypeTokens.SM,
      },
      spaceImg: <SpaceProps>{ size: SizeTypeTokens.MD },
      image2: <ImageProps>{
        uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAAdCAYAAAD7En+mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAoZSURBVHgBtVgJcBbVHf+9zea++HKQmARyYDlKMJyiIAhMte1IiwWUS6GtQ6fYMkyV1tpK6VhiodLq0FOwVsUpMlAFcfCiVAVaucJpuAJJyAFBcifk+PJ92/97u2/37X7fF5jO9CX77e7/vfe/r7csGDQM0GAwh2E9G9a7F36zZyj7I8FxExo3o30rNELgQZLUnDGnDJLbegRXAVPgsJapcHWPgCM8rkg0boX2rdDojzYnoTOaDtKjjdLaFDIsVYWdgwM3aJ0mcai4GCLSuBltIwwNFoF2JFw6N6fQCP11dveh4moHTBgzBVOVoHJsSBYUZ7P2RIKPLhggMag/9jrb7RRzm5b1wt0WYwouCfei122NEHD3sXrMf+EA/h8jIykW116Z7YFKhTgcmUw7cPnuhkuhlRCwhoTbFCyX1qWQzCbmDWdEYM773t8ehSjzwswUoTH3GglnFm9OLEovsajaOA04ssArPcUoM5GA2ZEQRiDnOTs1HjNGZiEtKQZ9wSD6AkFcbuzC3tMN9O7FwcIK69BnbiadGceCVvi44Y4iJDVNJiEVl+0sBhfUXOguMl4GGYoGJuHB8TlIitVRkJmI1q4+fF7bipF5qfjWnYNQnJeC5s5evP5pNQI2026BGQuH2/KmMM4QCW7ick84hnbvkYJrwiVcq90Jgt/HURJZfv/tyPbF49IXnThc2YQN758TVj1W2Yxntp5EASliRG4KnvrmCFN7Up2Gl1OnTFkqVq6bwUPnhGv3s4dZd02NhXDaG56TgnFFaXhtfzVqGjsxJCsJXynOxuRhmRhGc2mUZJ6e9WWcrmnBtdYebN5fhZUzhyMqgnPYpYDuQYu2EQ4u5/qBy4u3AkHVlY3Qu25qXU3wQKyuISZKs5+3HLiMzJRY/P69CxhClmslF+2l+Dx2qQkV1zqw40itiFNfog5fQgw+OnUVCTFRaO/xh0jKXc4fCOBqc7fwiMS4aPT2BSjWHQ+ST4kUJt3+IBpaupCeHIuk+GiBj69oIR7auvzIS0uARlplhilHZ28foiizxUbrTsqlS9c0ZknumPxJssiaBSUuHgd/fwf+tuwuPDqtEHzPhfp2cecKGLBkG4oHp+IVmh9/e7pYf72tB+vfOYPnd521MyX/ff9YHZb++RDqifmE2CiUzi9BxZU2/PGDCkUdZggde/5rmPncx6hr6UY00Vr1UDFWzR2F9TvP4OdbTpDCDORnJODDZ2ZgyG3JeHzjYWzaU4EpIzLx8bP3gWnMpq25zGwFwvn6Vpy63Gy6CV3b/1ONJVMLsXh6IY5ebMTSvxzEyeomFGUnQidt5vji8O5Pp5GQadRwtGPnwRpkkAJ+vagEj5FiVP73nGhAXIyOJx4YQV4ThSdeKyPL9BEeDRu+Ox5zKLERhxTziVjw4r9JyB4snFQgEtzqrafw6t6LeOqN48hIjsO8Sfmovt6Fub/dh8W0duM/L1JKcGLQ5N/0VCtGDaco0cP2Q3XY/EklNEsjD1MTEaWbkV1S4MOiewrwr9PX8PTm4yj9x2nMnTgYg0izvLosfPEAHqL1x6uaxH5uBcdtgXWPjsahtfejdGEJUhOiRd+1btEYdG+Zhx9+fSjqmrvE2vsoD5ytb0N+egI2r7gbi0nRfO2KV8vEfeHkArz0vQnkkozyQxvm35OPX1q0mOWdao3VmCsbM9uF+a/s9/nYsPscyi42ISZaw7TigfjD0gkoJYt19wYxujBNrAmQ2usp9ng9raeY5QkijxiNiXIocA/gbj111YdkjRv4Dlk8izyCr/joxBUcrGhEbhrV6juyBT9F2UkirvPS48V+Hpd8FOenIpliNocqAecyIyUOA+mCIqodloaos8ws3FDjNDT9jshNxRtk5R9sOoy3D9WisqFdBP1aslCAmgaOQ6P8JYVKoETCsfKk4ad5ycCp6haMXvkejl9uwfpHxuDlZRNtGuveLhfUl0wtQK7PFOwShQIXpIFcmPMWxcwkWUVJkLPJ8fPhS9JttmXJFPVTM+uPzq3m1CjTv78xJgeL7y002ynKZtt+NAX1TTew/IFhqPqiA3/afR5b91Vh68opiI4Cdh2txfwp+UK4PatnCGGmFWcJxtZsPw1ZqTu6/Zizfh/6iINn5xaTu8cjYdFW4XL3Ure1t/yasMpPHhxJ1tKRR8JWk2es/vtJ7CQanKEV5N6/230Wr39SBX9fEG2EsyAjkTJ+nOCRD5556xpvIIcyMqTAnBmnBpm/oyiDjsr3maITj3PuHiSsxVf5/QGsWzIWbz45RVhq9Zsn8U7ZFcz+zaeoud6JQio/s+7MI5xBrNl2Ci+Qy8vR2RNAbVO3KCU/o8QyjxJIDzFL//gVKYRTeGx6EZITdEG3lDI/bz7W7CgXNfqRyflY/+2xWEBJqJIal+d2nEEcafqvj0/EB8frseatckHnaGULlr98xLawCE/5hYGbe9tnNeL0kkK+n5qgmy5BCaP5hl/0tL3EUSBoHuHSEmNEDFdSnA2gtS20hsNySYv8vbyuDY0dflvIDKqZVzbNFglGHZyX9JQYNHX0imTGY85HeEy1k8tSzJ+/0o6s1DgMo87LsIr+CerIOnsD1LQki/hsbO/B1dZuO+jiqY4XUuaWeUd3u61pUR7wMugzk+IweegAXOVFm7qgO6gdLKJe92RNK6YOp3pV3oCHKf3/giw0YYiP6uEFzBr3Jew/1wjvoGqCkYNShKK4ktSjLXdZ9egl6x9PVLdRcjKsrMIsE5UU+iDzCZ9LT44RTYV6uuE/3LN4xtWN/j4n0CirbkZacjRmjs2lgI/Gu0fq0NDUhbfozl2wqdOPZRsPYc5dg8QW3uuu3XUG4bDaNdvuw5yzmXqKkc0/kwFleI948mMBs+fN5BOEc8IxZZCnGj3cGREeNvdQzawl4XgxnzQ0U5SYH1Mnwt1l4pA0fHVUFtWyVrSS+76056JINmGHcrZ0HY4ty5gnD8PppAy3YMITlIyqoDXvjLn2qI2DzrycwHuCMZ95bJXu+JwESxctVleP2c2cp/btBtXS7Z9dFtbtbzCFadPlTOacb0yhClKNEDS851JvKTRc1jQsU3OYLtvc0Fj1HmfM54PUNPDrfxkSq/SiUHdV3Blm0jNU77LWub9jGQpuJ+S8w24Y1E1hz2uu+UjwSPPKSptZZbW0qKczk1FoObXzkQzuo53DhaMcxfbmPRh0UkQ9xWEZpW3ZKNibXegsOLO3KVAXSIEzaiY0TBdNhDuxSPe1vxNJfMyZg5KUvB+/1MSpCifLkJ3JxQfskGFOWhXAJqwGt7qUqacF2JndFlLi0phbGWqQuIRXYLbQ1kRo4mQhxnD2OUpwCeoNbWexRziLALNdzgjZExluuLKnxOXKkjBChFfXqe4Pj3c4CnbLo4WmaTUJMftM6oU7whseOOsXblj7XGlOqY9q7QsdzidNftOYqmwHhR2/hpQB+C82ZTdYzsSaewAAAABJRU5ErkJggg==',
        size: ImageSizeTokens.SM,
        aspectRatio: AspectRatioToken.A1_1,
        borderRadius: BorderRadiusTokens.BR0,
        padding: SizeTypeTokens.SM,
      },
      spaceCertificate: <SpaceProps>{ size: SizeTypeTokens.XL },
      certifiedStack: <StackProps & WidgetProps>{
        type: StackType.row,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "certText", type: WIDGET.TEXT },
        ]
      },
      certText:<TypographyProps>{
        label: "We are PCI-DSS  v3.2.1 and ISO/IEC 27001-2013 certified",
        color: ColorTokens.Grey_Charcoal,
        fontSize: FontSizeTokens.XXS,
        fontWeight: "400",
        fontFamily: FontFamilyTokens.Inter
      }
    },
  };
};

export const bankVerifyMF: PageType<any> = {
  onLoad: async () => {
    const response = await fetchBankRepo();
    const banks = response.stepResponseObject;
    const stepper: StepperItem[] = await horizontalStepperRepo();
    const templateX = await template(banks, stepper);

    return Promise.resolve(templateX);
  },
  actions: {
    [ACTION.TOGGLE_SELECT]: ToggleSelectAction,
    [ACTION.TRIGGER_CTA]: BavVerifyAction,
    [ACTION.GO_ADD_ACCOUNT]: AddAccountNavAction,
    [ACTION.GO_BACK]: GoBackAction,
    [ACTION.GO_NEXT]: GoNext,
  },
};
