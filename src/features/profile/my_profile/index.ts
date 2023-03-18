import {
  Action,
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
} from '@voltmoney/types'
import {
  ActiveStateTokens,
  AvatarSizeTokens,
  AvatarTypeTokens,
  BorderRadiusTokens,
  ColorTokens,
  DividerProps,
  DividerSizeTokens,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  TypographyProps,
  WIDGET,
} from '@voltmoney/schema'
import { ROUTE } from '../../../routes'
import { ACTION, MenuList, ProfileDetails, ProfilePayload } from './types'
import {
  aboutDetails,
  accountDetails,
  contactDetails,
  faqDetails,
  goBack,
  logout,
} from './actions'
import { fetchUserProfileRepo } from './repo'
import SharedPropsService from '../../../SharedPropsService'
import { ConfigTokens } from '../../../configs/config'
import { shouldShowVoltContactUs } from '../../../configs/uri-config-utils'

const buildListItem = (
  titleLabel: string,
  titleColor: ColorTokens,
  titleFontWeight: string,
  iconName: IconTokens,
  iconColor: ColorTokens,
  hasRightArrow: boolean,
  hasDivider: boolean,
  action: Action<any>,
): Datastore => {
  const uniqueId = `${titleLabel}`
  const datastore = {
    [`${uniqueId}`]: <StackProps>{
      width: StackWidth.MATCH_PARENT,
      bgColor: ColorTokens.White,
      widgetItems: [
        { id: `spaceTop-${uniqueId}`, type: WIDGET.SPACE },
        { id: `leftStack-${uniqueId}`, type: WIDGET.STACK },
        { id: `spaceMiddle-${uniqueId}`, type: WIDGET.SPACE },
        { id: `divider-${uniqueId}`, type: WIDGET.DIVIDER },
      ],
    },
    [`leftStack-${uniqueId}`]: <StackProps>{
      type: StackType.row,
      width: StackWidth.FULL,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.spaceBetween,
      widgetItems: [
        { id: `leftLeftStack-${uniqueId}`, type: WIDGET.STACK },
        { id: `rightArrow-${uniqueId}`, type: WIDGET.ICON },
      ],
      action,
    },
    [`spaceMiddle-${uniqueId}`]: <SpaceProps>{
      size: SizeTypeTokens.XL,
    },
    [`divider-${uniqueId}`]: <DividerProps>{
      size: DividerSizeTokens.SM,
      color: ColorTokens.Grey_Chalk,
      margin: {
        vertical: SizeTypeTokens.SM,
        horizontal: SizeTypeTokens.SM,
      },
    },
    [`rightArrow-${uniqueId}`]: <IconProps>{
      name: IconTokens.ChervonDownRight,
      size: IconSizeTokens.XXL,
      color: ColorTokens.Grey_Charcoal,
    },
    [`leftLeftStack-${uniqueId}`]: <StackProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.flexStart,
      widgetItems: [
        { id: `iconName-${uniqueId}`, type: WIDGET.ICON },
        { id: `horizontalSpace-${uniqueId}`, type: WIDGET.SPACE },
        { id: `title-${uniqueId}`, type: WIDGET.TEXT },
      ],
    },
    [`iconName-${uniqueId}`]: <IconProps>{
      name: iconName,
      color: iconColor,
      size: IconSizeTokens.LG,
    },
    [`horizontalSpace-${uniqueId}`]: <SpaceProps>{
      size: SizeTypeTokens.LG,
    },
    [`title-${uniqueId}`]: <TypographyProps>{
      label: titleLabel,
      color: titleColor,
      numberOfLines: 1,
      fontSize: FontSizeTokens.SM,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: titleFontWeight,
      lineHeight: 24,
    },
    [`spaceTop-${uniqueId}`]: <SpaceProps>{ size: SizeTypeTokens.XL },
  }
  if (!hasRightArrow) {
    delete datastore[`rightArrow-${uniqueId}`]
  }
  if (!hasDivider) {
    delete datastore[`divider-${uniqueId}`]
  }
  return datastore
}

const menuList = (
  profileData: ProfileDetails,
  shouldShowContactUs: boolean,
) => {
  const list: MenuList[] = [
    {
      iconName: IconTokens.Person,
      titleLabel: 'Account details',
      titleFontWeight: '500',
      titleColor: ColorTokens.Grey_Night,
      position: POSITION.BODY,
      hasRightArrow: true,
      hasDivider: true,
      iconColor: ColorTokens.Grey_Night,
      action: {
        type: ACTION.PROFILE,
        payload: <ProfilePayload>{
          value: profileData,
        },
        routeId: ROUTE.MY_PROFILE,
      },
    },
    {
      iconName: IconTokens.Question,
      titleLabel: 'FAQ’s',
      titleFontWeight: '500',
      titleColor: ColorTokens.Grey_Night,
      position: POSITION.BODY,
      hasRightArrow: true,
      hasDivider: true,
      iconColor: ColorTokens.Grey_Night,
      action: {
        type: ACTION.FAQ,
        payload: {},
        routeId: ROUTE.MY_PROFILE,
      },
    },
    {
      iconName: IconTokens.HeadPhone,
      titleLabel: 'Contact Us',
      titleFontWeight: '500',
      titleColor: ColorTokens.Grey_Night,
      position: POSITION.BODY,
      hasRightArrow: true,
      hasDivider: true,
      iconColor: ColorTokens.Grey_Night,
      action: {
        type: ACTION.CONTACT_US,
        payload: {},
        routeId: ROUTE.MY_PROFILE,
      },
    },
    {
      iconName: IconTokens.Volt,
      titleLabel: 'About Us',
      titleFontWeight: '500',
      titleColor: ColorTokens.Grey_Night,
      position: POSITION.ABSOLUTE_BOTTOM,
      hasRightArrow: false,
      hasDivider: true,
      iconColor: ColorTokens.Primary_100,
      action: {
        type: ACTION.ABOUT,
        payload: {},
        routeId: ROUTE.MY_PROFILE,
      },
    },
    {
      iconName: IconTokens.Logout,
      titleLabel: 'Logout',
      titleFontWeight: '600',
      titleColor: ColorTokens.Primary_100,
      position: POSITION.ABSOLUTE_BOTTOM,
      hasRightArrow: false,
      hasDivider: false,
      iconColor: ColorTokens.Primary_100,
      action: {
        type: ACTION.LOGOUT,
        payload: {},
        routeId: ROUTE.MY_PROFILE,
      },
    },
  ]
  if (!shouldShowContactUs) {
    list.splice(2, 1)
  }
  return list
}
export const template: (
  userName: string,
  initialUserLetter: string,
  profileData: ProfileDetails,
  showContactUs: boolean,
) => TemplateSchema = (
  userName,
  initialUserLetter,
  profileData,
  showContactUs,
) => {
  const layoutList = menuList(profileData, showContactUs).map(
    (item, index) => ({
      id: `${item.titleLabel}`,
      type: WIDGET.STACK,
      position: item.position,
    }),
  )
  const datastore = menuList(profileData, showContactUs).reduce(
    (acc, item) => {
      return {
        ...acc,
        ...buildListItem(
          item.titleLabel,
          item.titleColor,
          item.titleFontWeight,
          item.iconName,
          item.iconColor,
          item.hasRightArrow,
          item.hasDivider,
          item.action,
        ),
      }
    },
    {},
  )
  return {
    layout: <Layout>{
      id: ROUTE.MY_PROFILE,
      type: LAYOUTS.LIST,
      widgets: [
        {
          id: 'header',
          type: WIDGET.HEADER,
          position: POSITION.ABSOLUTE_TOP,
        },
        ...layoutList,
      ],
    },
    datastore: <Datastore>{
      header: <HeaderProps>{
        title: `${userName}`,
        rightItem: {
          uri: 'https://reactnative.dev/img/tiny_logo.png',
          initialLetter: `${initialUserLetter}`,
          type: AvatarTypeTokens.SINGLE,
          size: AvatarSizeTokens.LG,
          borderWidth: 1,
          borderColor: ColorTokens.Primary_100,
          borderRadius: BorderRadiusTokens.BR5,
          active: ActiveStateTokens.INACTIVE,
        },
        isBackButton: false,
        leftIcon: {
          name: IconTokens.Cross,
          size: IconSizeTokens.XL,
          color: ColorTokens.Grey_Charcoal,
        },
        type: HeaderTypeTokens.HEADERCTA,
        action: {
          type: ACTION.BACK_BUTTON,
          payload: {},
          routeId: ROUTE.MY_PROFILE,
        },
      },
      ...datastore,
    },
  }
}

export const myProfileMF: PageType<any> = {
  onLoad: async ({}, { response }) => {
    const responseX = response ? response : await fetchUserProfileRepo()
    const userName: string = responseX.name
    const initialUserLetter: string = userName.charAt(0)
    const showContactUs = shouldShowVoltContactUs(
      await SharedPropsService.getURL(),
    )
    const profileData = responseX
    return Promise.resolve(
      template(userName, initialUserLetter, profileData, showContactUs),
    )
  },
  actions: {
    [ACTION.PROFILE]: accountDetails,
    [ACTION.CONTACT_US]: contactDetails,
    [ACTION.FAQ]: faqDetails,
    [ACTION.BACK_BUTTON]: goBack,
    [ACTION.LOGOUT]: logout,
    [ACTION.ABOUT]: aboutDetails,
  },
  bgColor: '#FFFFFF',
}