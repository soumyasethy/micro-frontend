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
  ColorTokens,
  GridImageItemProps,
  GridItemTypeTokens,
  HeaderProps,
  HeaderTypeTokens,
  InputTypeToken,
  KeyboardTypeToken,
  SizeTypeTokens,
  SpaceProps,
  TextInputProps,
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
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";

export const template: (BanksRepo: {
  ALLBANKS: { [key in string]: string };
  POPULAR: { [key in string]: string };
}) => Promise<TemplateSchema> = async (BanksRepo) => {
  console.warn("****** Bank Repo template ******", BanksRepo);
  return {
    layout: <Layout>{
      id: ROUTE.DIST_BANK_SELECT,
      type: LAYOUTS.LIST,
      widgets: [
        {
          id: "header",
          type: WIDGET.HEADER,
          position: POSITION.ABSOLUTE_TOP,
        },
        { id: "searchInput", type: WIDGET.INPUT },
        //{ id: "gridItem1", type: WIDGET.GRIDITEM },
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
          routeId: ROUTE.DIST_BANK_SELECT,
          payload: {},
        },
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      searchInput: <TextInputProps & WidgetProps>{
        title: "",
        placeholder: "Search by bank name",
        type: InputTypeToken.DEFAULT,
        caption: { default: "", success: "", error: "" },
        keyboardType: KeyboardTypeToken.default,
        action: {
          type: ACTION.SEARCH_BANK,
          routeId: ROUTE.DIST_BANK_SELECT,
          payload: <SearchActionPayload>{
            bankRepo: BanksRepo,
            value: "",
            targetWidgetId: "gridItem",
          },
        },
      },
      searchInputSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      gridItem1: <GridImageItemProps>{
        type: GridItemTypeTokens.HORIZONTAl,
        title: 'Popular Banks',
        placeholder: 'Search By Bank Name',
        other: 'All Other Banks',
        data: [
          {
            label: 'SBI Bank',
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEURZt3///8AW9vO2/YAXtwAWdsAYdwAXNsAV9sAYtwKZN37/f/r8fzU4Pelve8AXNzg6fqbtu2/0PNnk+bH1vVFf+JrluZzm+fm7fu2yvKNrOuUseyxxvFKguLo7/vz9/0ocN9WieSCpeo6eeEebN4xdOBhj+WqwfCFp+p3nuijuu4AUtpzw9NsAAAKp0lEQVR4nOWd25rirBKGIQIhRG33u9Zx07Z293//97eIcRMjJCShiMn6TuZ55mDMOxRVUBQFwo4Uht3FoNfrdDq93mDRDUNXP4ygf2DRWX/ON9+IUE4p9SLJPzkl6HszX50nC+gPACTsTobjb849nzAhkEDPkn8jGPE9zr/Hw8k/uM8AIuwNT4h6JEhzqSQC4lF0GvZgPgWAsDfcU0oCA7akAkLpBoLSMmE4mgtKTEZOOZqEBvORZR9kkzBcnjyPlaS7iXn0tLQJaY9wMqZ+UdNUK/DpeGLtuywRdleIVh29pBhFK0v+1QrhZM+JRbxYhO+tDKQFwvOR2rHOtAJ6PNdPGA6ZX9Z15ksQ8lnV61QjDFekdGgwZlxVY6xE+OkD88WMH581EZ4DQPt8ZgwqzMfShJOd5wQvlrcr7VdLEnb33M343ST4vuuScAgUH7IU0HLTsQxhb+c754tEdmW2HiUIfxwb6EOC/zgg7B3tL9DMRY6Fh7Eo4WdtAxhL8KKzsRjhduoyRKjlTbdwhJPCuQkIBaRQbCxC+MnrhruqkKUWINzXb6E3eXsAwu7O5h6+qtjOeIVjStj7qNeHpiV807BhSLh8lyn4EF/aJPx7P0CJOLRH+POOgBLRaA1nQvhL62bRiP7aIZy9T5RIy5vZIBzXs1Uykz+uTjh7Z0CJmDuKeYTz9zXRWN68GuHhXZ3MQ/RQhXD4/oASMTsuZhKu3zMOpsXXZQk7zQCUiJ1yhAv6XottvQTNqFnRE4bHpgBKxKP+9EZPuHmn/WCe2KY44c97R/q0fO0qXEc4aoqXuYmPihF2veZMwljC0+Q1NITfTQOUiN9FCA/NmoSxfPXyTUnYmFD/LHXgVxGG75DZLiOmiooqwlmTImFSTLVZVBBOmmmjkbjiRENB2Dw3+pAwITzUeQJaVeTVn74Q9ppro5H4IJfwq8lGKs30K49w3YS8RZZoesOfIgybGigeCrIJV012M7HIKotw23QbjUS3GYS/zTdSubL51RP+a3akuIn/0xI2dkH6rOflaZJw0Y4hTA1iknDejiGUgzhXE27bMoRyELdKwp/mx8KbkjHxQRg6qLt3JUFCBeG5PUMoB/GsIGzQMUW+xPGVsNOGBdtDtPNCOG5qgk2tYJwmbMWaO6n7+vtG2G9iljtLfj9F2MCDimzdjzGuhIP2rGduuuWkroSfbQqGscjnE+GubUb6MFPUViO9m2lMOGyfkUozHSYIv9oV7mMFXw/CbtvCfaw46F8I120L97H85Z2wJRmotOJkxoWwfaHiqhthK2NFpEu8iAjP7ZyGciKer4QtnYbX1DBqW/4iqUsuA7U2GkaKIqIknLz7hYPy8iYXwlYuSmNFS1PkMgclBGOERR34HCnKRyFne8OAcLaZr1ar+YZxR5fCxS4iDJ3Ee8an/UdB/aI/5U5CFA8l4cCBKxV8lq7kGcxcdGegA0k4gl/ReNOXSqWI0UGDBn8kCcFdqdBe2B2CDyP5k4Tg9Rcf+js7nQ/g32a/knAP7NY8lYXeLRXYUIO9JAQOFjS7M0AP1s+Jb0kIG3+zb85h6BuAAmEUgtoJy7+JPAb1A16IupD/h8LP75azBa0f4F0EGvCJSWMH0HBFB6gDaKXJkgi9QItAvA6aAC5pWM4166sOgDPRn6AloI3kRIqbICMGWSLIfHe6IFkno8bm5eSvEWChUJAfKmIB7sHJGfXhCI08aSRAb0r66A/uX/cN+xzhJdxMIX+QhDSrEUBSgBELmNC0HRegM/2/IAT0NJ6plQLmpKWnAYwWJG/ndNMa8BvOkBE/fT9HqxXcsk1GfMBUm9A3q3jWBnBNMwLdW/hm/eIhN+FybwG57PV1vSqeBRjwpT8H3QEHeyNCyGwfXSDQeyTc5L0q0MtIfItCyByCQSIK4xPgEAoSInyE+/dzelTFgm3CccQItmovce9BJ9A6iWAqCWFrTXLtFDZdymaSEPhyM81e2Kxgs/pyWYXAK6Iym29Dtwj315IQclFzUUanWPDutnJ7gzBoWv8i8qUOi4sv8DoX3o1qMeDfwxFc8aJRuII/yBf+pdoEcGV/FyGr5zOa7Yo4KFSKdjcINqn++K3/nmN/5z8XVTzRsQIC3WEnlEppgPu3i6IsgyR0UVBTEyEdxPWlTq4410EoCI4JXbiaegg3V0InF9fqILxcX4sInZTQ1kEYFdBeCJ1UJ9ZByMMrIZ46qPasgVBM8Y3QxUSsgTC+RXohBC69uqgGwvhkKL5/CHiQfpN7QsHwg9BB7x33hNc+PDHhCP733BN6owRhCP+ak3NCcT01ud5Wh814RXJOeOv4dSWEN1PnhFcjvffFAN9fuCa87CuShOD17K4J770Fb4TgrWddE/JeihD89pNjwkcP+jshYF3NRY4JSf+FEHoL5ZiQhy+E0Cs3t4SJHqYPQuBb+W4JE02vE30TYRNSTgmTlTwJwgnoLtEpIZ0oCWEDhkvCp+dKkoRLyEF0SUiXGkLQQXRIGN1v1hBCDqJDwqchTPXzBhxEd4SpR4OeCQHdqTtC+vxQSaqv/hRsEJ0RxnlgLSHcJsoZIU/Vz6fftwCrkHJF+PJeUJpwC/WsoyNCQdO3Vl9eYRkClUg5IvRf7lq9vhUEFDHcED4Hew0hkLNxQ5h2M0pC/AuSz3BCSBQldKp31xCEnbogFEoaxd+B1CW7IFTWXCvfP4R4mMwBoeJJMh0hRO01PKHCj+oJAbJS8ISvT65lEOK+9U0GOCHtq1F07wGfbE9FaEJ20pBo33Q+Wq6xASYMtBc7tIS2X1aHJcx4XV3/8rjld6thCbVvVmcR4k+r3gaUkGbc6cggxDOb3gaSkKheyTUhxBuLG35AQjbVfH8+Id7Zc6hwhIF6LWNGuEXWEMEIA5TdbSubEHeZrZgBRShYNxshhxAvbBXaABEKktW00IQQDyxdi4IhFH4eYD4hHtgZRRDC/BE0IZSINtwNBKEJoAkh7trwqACEAv3TfHFRQrw9Vg/99gnZMb8poykhDqeVF3DWCcnUrK+IGaHcEVf9ItuEnm7HW5YQrypupiwTctPuPuaEeFnt2q5VQsFNW8EVIcQDVMXf2CRkyCBKlCDE4b7CZ1kk9DZmPqY4YdQCobSlWiMUmU0aqhLiXmlLtUXIkGmfu3KEOByX9Kl2CAUfF7HQMoTSp7JSw2iFkBFzH1qeEG9PZYbRBiE/Ga3TKhNiPELFF3HVCYkwa45mgxCHB150u1GVUPBD0RlYhVCG/03BwFGNUHDlIyCQhBhPjoUqbyoR+sdSBlqREOMzK8BYnlD47Kz5AmhCjIfmjGUJBWGmLaXVqkaIQ8loNh/LEUZ85RzMXRUJpc5Ho5PGMoSCHqvYZ6zqhDI8Tnl+arwwoWB8Wt6/PGSDUMaOA8kz1oKEwie/ZePDs+wQygm53GQ/plaEUBA+XVacfnfZIpTqDr8yII0JA8K/hyaJUENZJJRaDKfUV89JI0LBCP0amrR1NZddQqnuesaoYijzCQNC2Xidc1ZWXNYJIw36JxSNpTAkFIL5XJz+Cu7ezQRCGGmx/NkQ7hHJKbSEQgSMePxj87O0a5oJgRFe1J2cD/sd49QjLz33iEc52+0P/YlFt6IQLGGscDvoLPvPg7ToLzuDra2IkKX/AdYHiihcm7QhAAAAAElFTkSuQmCC',
          },
          {
            label: 'HDFC Bank',
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAAulBMVEX////tHSQAS40fYZv0ycn24eFgj7iApcbwsLHpj5DzsLH4qq2gvNVQg7HgS03oYWTjUlVNVn5CWYY9THgxTH3vOD/DPE3P3eqvx9sQVpT2jpH1f4MwbaLw9Pj81NZAeKpwmr/6xsjE1eXi6/KQsc00cKQoZ5/83+BRhLH96uoTWJXo7/Vai7V9o8WLrcvkZ2iCgp58co778vJscpNnYYPlc3TKUF/zY2jxTlPKoa/MtcOfu9T0dXnyWl/3QfWIAAADjElEQVR4nO2a6XabMBBGVUihiaHpjtWAcQBjJ2Cn+5b2/V+rIwkQYIJx6no557s/kARCcxkkwCdhDAAAAAAAAAAAAAAAAAA4CZ4M4HnR93JI56eQhjSkIQ1pSEMa0pA+Num7Z11Mir7zzqNXh5Y+f8QIF5AeBKQh3QOkId0DpCHdA6SPQfrDy24+HrP0K6Ob15CGNKQhfZrSLxpcP0J60hzi0x6k+xgmfWRAel9Ael9AepfcXdY5axwbJj1vjHC5j+f0Sb4RIQ1pSEN699Kf33Tz5ZilhwHpYUAa0j1AGtI9QBrSPUD6MNJfz7ooPW46j54fWrqbI/9vMUhDGtKQhjSkIQ1pSK/R+bW51adpiz04AwAAANvyVjNnF7rxzTwgm6Rr3wQTNtKNdw/8WXMvQPqYpL+/l9ywiar8OAXpUWvf1alLm5ZlhVS6VHIjtATuTB7yrQJx3AhXjmPPdGCr6MqLdk6t2/KIOCOl0jS4aonCqs7+V2mX2g6VHpWm4RQ9giXtssv+Y7q2qKjyduDAks1U1KeixkUtNYwpFa5hqvHHVHi320oHniIYJM1Y0pDmXu0C2oF90VyJmldJR03phLZx5TxYugzmbZQeO55SEdKRQ0xlNZ5OMypCHTi2rKjMb8yKBCtpZtWl5enm9nO6Tzqi+RZX0mQlErOSpureS6VUdV7pwJTYUJqpkjrZlXRgaums5bxRekTMW9IT2vezJl1SSc/kCTLTSZLkMrK89b7vmzpw4IyzYuR70ZXUKmk21tKsFn+QdEldmpUOD0mLSFE1px3Db0etB07E2qSlsgzVybzIbdSQlvdjqPQ1cdOSntO+X3XpIAga0jrTSlpdhMp0qgNnSSLMaMIsqJjxQK5fIT12StNKOuPDpbdfiKG82TQ9hXTiuq4vExlwdTFOY06L2e6pJ1qSUH6DQvo2q0nHqWjd/09pZyWfyX59IYqVGbkL0SnXgWPXXUp3ruO5SlrmXj/ycsb0c2e4dDZWDH1O3xt1aTMr93vrgVeGxeQUC6SukpbJ1y8XkYd47cW0SbrOAGmam3Vpw48LZ3MtML0khRJXcyXghbQZ1KVTdXU7kk5t2xYL26KSGy5t7eV0IV9eIdX96pbmThQ5edU0bMnUSlVdvmEWVEk5bfLi9NTgxfi5GHhX0gdhiPTvkeSGzVXlzylIn+QvF0hDGgAAAAAAAAAAAAAAAAA4HH8Bzb5wgjlhX+sAAAAASUVORK5CYII=',
          },
          {
            label: 'ICICI Bank',
            image: 'data:image/png;base64,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',
          },
          {
            label: 'KOTAK Bank',
            image: 'data:image/png;base64,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',
          },
          {
            label: 'AXIS Bank',
            image: 'data:image/png;base64,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',
          },
          {
            label: 'PNB Bank',
            image: 'data:image/jpeg;base64,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',
          },
        ],
      },
      gridItem: <GridImageItemProps & WidgetProps>{
        type: GridItemTypeTokens.HORIZONTAl_VERITICAL,
        data: [
          ...Object.keys(BanksRepo.POPULAR).map((key) => ({
            label: BanksRepo.POPULAR[key],
            image: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/${key}.svg`,
            defaultUri: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/default.svg`,
          })),
        ],
        otherItem: [
          ...Object.keys(BanksRepo.ALLBANKS).map((key) => ({
            label: BanksRepo.ALLBANKS[key],
            image: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/${key}.svg`,
            defaultUri: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/default.svg`,
          })),
        ],
        title: "Popular banks",
        other: "All other banks",
        bgColor: ColorTokens.Grey_Milk,
        borderColor: ColorTokens.Grey_Milk_1,
        action: {
          type: ACTION.NAV_IFSC_SEARCH_BRANCH_INFO,
          routeId: ROUTE.DIST_BANK_SELECT,
          payload: <NavSearchIfscBranchInfoActionPayload>{
            value: "",
            bankRepo: BanksRepo,
          },
        },
      },
    },
  };
};

export const distBankSelectMF: PageType<any> = {
  onLoad: async ({ network }) => {
    /*** Reset Bank Account Number on bank list re-load ***/
    await SharedPropsService.setAccountNumber("");

    const response = await network.get(api.banks, {
      headers: await getAppHeader(),
    });
    const BanksRepo = response.data;
    const templateX = await template(BanksRepo);
    return Promise.resolve(templateX);
  },
  actions: {
    [ACTION.GO_BACK]: GoBackAction,
    [ACTION.SEARCH_BANK]: SearchAction,
    [ACTION.NAV_IFSC_SEARCH_BRANCH_INFO]: NavSearchIfscBranchInfoAction,
  },
 // clearPrevious: false,
};