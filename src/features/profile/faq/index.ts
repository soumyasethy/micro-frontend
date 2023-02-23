import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
} from "@voltmoney/types";
import {
  AccordionProps,
  CardProps,
  ColorTokens,
  HeaderProps,
  HeaderTypeTokens,
  IconAlignmentTokens,
  IconSizeTokens,
  IconTokens,
  SizeTypeTokens,
  SpaceProps,
  StackProps,
  StackWidth,
  TagTypeTokens,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import { contact, faqDetails, goBack } from "./actions";

export const template: () => TemplateSchema = () => {
  return {
    layout: <Layout>{
      id: ROUTE.FAQ,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "space0", type: WIDGET.SPACE },
        { id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
        // { id: "topSpace", type: WIDGET.SPACE },
        {
          id: "detailScreen",
          type: WIDGET.STACK,
          padding: {
            left: 0,
            right: 0,
          },
        },
      ],
    },
    datastore: <Datastore>{
      header: <HeaderProps>{
        title: "FAQs",
        isBackButton: true,
        type: HeaderTypeTokens.HEADERCTA,
        leftCta: "Contact Us",
        leftProps: {
          bgColor: ColorTokens.Primary_05,
          label: "Contact Us",
          type: TagTypeTokens.SECONDARY,
          labelColor: ColorTokens.Primary_100,
          icon: {
            name: IconTokens.Support,
            size: IconSizeTokens.MD,
            align: IconAlignmentTokens.left,
            color: ColorTokens.Primary_100,
          },
        },
        action: {
          type: ACTION.BACK_BUTTON,
          payload: <{}>{
            value: "",
            widgetId: "continue",
            isResend: false,
          },
          routeId: ROUTE.FAQ,
        },
        leftAction: {
          type: ACTION.CONTACT,
          payload: <{}>{
            value: "",
            widgetId: "continue",
            isResend: false,
          },
          routeId: ROUTE.FAQ,
        },
      },
      topSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
      space0: <SpaceProps>{ size: SizeTypeTokens.SM },
      detailScreen: <StackProps>{
        width: StackWidth.FULL,
        widgetItems: [
          {
            id: "Card1",
            type: WIDGET.CARD,
            padding: {
              left: 0,
              right: 0,
              top: 0,
            },
          },
        ],
      },
      Card1: <CardProps>{
        width: "100%",
        bgColor: ColorTokens.White,
        body: {
          widgetItems: [
            { id: "startDetails", type: WIDGET.ACCORDION },
            { id: "startDetails1", type: WIDGET.ACCORDION },
            { id: "startDetails2", type: WIDGET.ACCORDION },
            { id: "startDetails3", type: WIDGET.ACCORDION },
            { id: "startDetails4", type: WIDGET.ACCORDION },
            { id: "startDetails5", type: WIDGET.ACCORDION },
            { id: "startDetails6", type: WIDGET.ACCORDION },
            { id: "startDetails7", type: WIDGET.ACCORDION },
            { id: "startDetails8", type: WIDGET.ACCORDION },
            { id: "startDetails9", type: WIDGET.ACCORDION },
            { id: "startDetails10", type: WIDGET.ACCORDION },
            { id: "startDetails11", type: WIDGET.ACCORDION },
            { id: "startDetails12", type: WIDGET.ACCORDION },
          ],
        },
      },
      startDetails: <AccordionProps>{
        title: "What is loan against Mutual Funds?",
        description:
          "Loan Against Mutual Funds (LAMF) allows you to borrow cash against your mutual fund investments as collateral. You can use us to lien mark your mutual funds digitally to avail an instant limit without losing the ownership of your mutual funds and all the associated benefits with it. 'Funds will be made available in the form of an overdraft facility. You can utilize the required amount and repay anytime without any prepayment charges. Interest is charged only on the utilized amount and for the duration the funds are utilized. 'You can select from a list of 4500+ approved mutual funds from different asset management companies (AMCs) in India. You can lien mark mutual funds registered with both CAMS & KFintech (earlier known as KARVY), Registrars & Transfer Agents (RTAs). We recommend digital LAMF to meet any of your financial requirements like travel, gadget purchase, balance transfer for your high interest loans, medical emergency.",
        icon: IconTokens.DownArrow,
        onPress: Function,
      },
      startDetails1: <AccordionProps>{
        title: "What are the conditions to get a loan from us?",
        description:
          "- You should be between 18 and 65 years of age. \n- Your entire mutual fund portfolio should not be less than ₹50,000. \n- You should hold Mutual Funds approved with CAMS & Kfintech (RTAs). Debt & ELSS funds (units held > 3 years) are also eligible. \n- Joint mutual fund holders are not eligible for loan.\n- You should be an Indian resident.\n- There is no minimum credit score and income requirement.",
        icon: IconTokens.DownArrow,
        onPress: Function,
      },
      startDetails2: <AccordionProps>{
        title: "How much money can I borrow as a loan?",
        description:
          "You can choose to set up any line amount ranging from Rs. 25,000 to Rs. 1 crore. Yes! You read it right, you can create line up to 1 crore digitally in 5 minutes.",
        icon: IconTokens.DownArrow,
        onPress: Function,
      },
      startDetails3: <AccordionProps>{
        title: "Can I choose any date for my monthly loan repayment?",
        description:
          "Yes, you can choose to repay when you want. The credit line facility offers 100% flexibility for principal repayment. Only the interest needs to be repaid after month ends.",
        icon: IconTokens.DownArrow,
        onPress: Function,
      },
      startDetails4: <AccordionProps>{
        title: "Do I have to pay interest on the complete line amount?",
        description:
          "No, you do not have to pay interest on the complete line amount. Completely flexible for the customer and interest is only to be paid on the amount used. Interest is calculated daily based on the loan outstanding you have day end. Some scenarios to explain:\n\n- If loan amount at day end is zero, there will be no interest charged for that day. \n- If amount is withdrawn, used and repaid in 10 days, you’ll be only charged interest for 10 days.",
        icon: IconTokens.DownArrow,
        onPress: Function,
      },
      startDetails5: <AccordionProps>{
        title: "What are the documents required?",
        description:
          "The whole process if 100% digital, hence you don’t need any document in physical form. For quick processing, please keep below handy:\n\n- PAN card number\n- Email ID associated with CAMS and KARVY\n- Bank accounts details for account verification and receiving money\n- Debit card or net banking details for mandate set up",
        icon: IconTokens.DownArrow,
        onPress: Function,
      },
      startDetails6: <AccordionProps>{
        title: "What is lien marking/pledging of Mutual Funds?",
        description:
          "When you take a loan against your mutual fund units, we lien mark/pledge your mutual fund units in the name of the lender, so that it cannot be redeemed/sell until you pay back the loan. The lien marking process is done 100% digitally and in real-time.",
        icon: IconTokens.DownArrow,
        onPress: Function,
      },
      startDetails7: <AccordionProps>{
        title: "How to update your mobile number or email address in your CAS?",
        description:
          "You can change your email/mobile number though MFCentral. Steps to change email/mobile number:\n\n- Sign up at MFCentral.\n- Put a service request.\n- MFCentral will update the email/mobile number on your behalf within 1-2 days.",
        icon: IconTokens.DownArrow,
        onPress: Function,
      },
      startDetails8: <AccordionProps>{
        title: "Which mutual fund schemes are eligible to take loans?",
        description:
          "More than 4500+ mutual funds from different asset management companies (AMCs) in India are eligible to take loans with us. Not eligible - Tax Saving Fund units with date of purchase less than 3 years, i.e., not matured.",
        icon: IconTokens.DownArrow,
        onPress: Function,
      },
      startDetails9: <AccordionProps>{
        title: "How do I check my limit with us?",
        description:
          "We just need your PAN, mobile number and MF registered email ID to check your limit. This is done just after signing up in the journey so you know during the journey what you are getting.",
        icon: IconTokens.DownArrow,
        onPress: Function,
      },
      startDetails10: <AccordionProps>{
        title: "Do I need to upload CAS to get my limit?",
        description: "No. This is done automatically while checking the limit.",
        icon: IconTokens.DownArrow,
        onPress: Function,
      },
      startDetail11: <AccordionProps>{
        title: "Can I lien mark any mutual fund units of my choice?",
        description:
          "Completely flexible in choosing which mutual funds units you want to lien mark for setting up the limit. You can change the schemes and units and have your own allocation for lien marking.",
        icon: IconTokens.DownArrow,
        onPress: Function,
      },
      startDetails12: <AccordionProps>{
        title: "When will my funds be unlienmarked?",
        description:
          "This can be done any time upon customer request conditional on current loan amount pending against your mutual fund units. Depending on your current loan amount/utilisation, you can remove lien from some mutual fund units or all mutual funds units you’ve pledged.",
        icon: IconTokens.DownArrow,
        onPress: Function,
      },
    },
  };
};

export const faqMF: PageType<any> = {
  onLoad: async () => {
    return Promise.resolve(template());
  },

  actions: {
    [ACTION.FAQ]: faqDetails,
    [ACTION.CONTACT]: contact,
    [ACTION.BACK_BUTTON]: goBack,
  },
  bgColor: "#FFFFFF",
};
