import {
    BankData,
    User,
    PartnerUser,
    BasicData,
} from './features/login/otp_verify/types'

import { __isMock__, AssetRepositoryType, ConfigTokens } from './configs/config'
import { MockUser } from './mock/MockUser'
import { MockToken } from './mock/MockToken'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StoreKey } from './configs/api'
import { AvailableCASItem } from './features/mfPledge/unlock_limit/types'
import { AuthCASModel } from './types/AuthCASModel'

import _ from 'lodash'

export enum USERTYPE {
    BORROWER = 'BORROWER',
    PARTNER = 'PARTNER',
}

export type AssetRepositoryConfigItemType = {
    isFetched?: boolean
    isPledgedRequired?: boolean
    isPledged?: boolean
    priority?: number
}
export enum BUILD_TYPE {
    BORROWER_PRODUCTION = 'BORROWER_PRODUCTION',
    BORROWER_STAGING = 'BORROWER_STAGING',
    PARTNER_PRODUCTION = 'PARTNER_PRODUCTION',
    PARTNER_STAGING = 'PARTNER_STAGING',
}

export interface PartnerLeadsType {
    assetDetails:           AssetDetails;
    borrowerAccountProfile: BorrowerAccountProfile;
    credit:                 Credit;
    creditApplication:      CreditApplication;
    partnerViewStepperMap:  PartnerViewStepperMap;
    currentStepName: string;
}

export interface AssetDetails {
    applicationId:               string;
    approvedCreditAmount:        number;
    availableCAS:                AvailableCA[];
    availableCreditAmount:       number;
    casFetchDates:               CasFetchDates;
    interestRate:                number;
    isinLTVMap:                  IsinLtvMap;
    isinNAVMap:                  IsinLtvMap;
    loanTenureInMonths:          number;
    maxLoanAmount:               number;
    nonEligiblePortfolioAmounts: IsinLtvMap;
    pledgedPortfolio:            AvailableCA[];
    processingFees:              number;
    processingFeesBreakUp:       IsinLtvMap;
    repositoryAssetMetadataMap:  RepositoryAssetMetadataMap;
    requestedCreditAmount:       number;
    tobePledgedPortfolio:        AvailableCA[];
    totalPortfolioAmount:        number;
}

export interface AvailableCA {
    amcCode:              string;
    amcName:              string;
    assetRepository:      string;
    fetchedOn:            Date;
    folioNo:              string;
    is_pledged:           boolean;
    is_pledged_confirmed: boolean;
    isinNo:               string;
    modeOfHolding:        string;
    pledgeReferenceNo:    string;
    pledgedOn:            Date;
    pledgedUnits:         number;
    schemeCode:           string;
    schemeName:           string;
    schemeType:           string;
    totalAvailableUnits:  number;
}

export interface CasFetchDates {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
}

export interface IsinLtvMap {
    additionalProp1: number;
    additionalProp2: number;
    additionalProp3: number;
}

export interface RepositoryAssetMetadataMap {
    additionalProp1: RepositoryAssetMetadataMapAdditionalProp1;
    additionalProp2: RepositoryAssetMetadataMapAdditionalProp1;
    additionalProp3: RepositoryAssetMetadataMapAdditionalProp1;
}

export interface RepositoryAssetMetadataMapAdditionalProp1 {
    approvedCreditAmount:     number;
    approvedPortfolioAmount:  number;
    availableCreditAmount:    number;
    availablePortfolioAmount: number;
    casFetchDate:             Date;
}

export interface BorrowerAccountProfile {
    bankDetails: BankDetails;
    dob:         string;
    emailId:     string;
    name:        string;
    panNumber:   string;
    phoneNumber: string;
    userId: string;
}

export interface BankDetails {
    accountNumber: string;
    bankCode:      string;
    bankName:      string;
    branchAddress: string;
    branchName:    string;
    city:          string;
    ifscCode:      string;
    micrCode:      string;
}

export interface Credit {
    accountId:                     string;
    actualLoanAmount:              number;
    applicationId:                 string;
    approvedCreditAmount:          number;
    availableCreditAmount:         number;
    chargesDue:                    number;
    createdOn:                     CreatedOn;
    creditId:                      string;
    creditStatus:                  string;
    creditType:                    string;
    currentApplicableInterestRate: number;
    currentTermStartDate:          CreatedOn;
    disbursalRequestAllowed:       boolean;
    lastUpdatedOn:                 CreatedOn;
    lenderCreditId:                string;
    lendingPartnerId:              string;
    marginCallStatus:              string;
    originalStartDate:             CreatedOn;
    outstandingInterestDue:        number;
    partnerAccountId:              string;
    penalInterestDue:              number;
    platformAccountId:             string;
    principalOutStandingAmount:    number;
    processingChargeDetails:       string;
    processingCharges:             number;
    renewalDate:                   CreatedOn;
    tenureInDays:                  number;
    totalValueOfAssetsPledged:     number;
}

export interface CreatedOn {
    date:           number;
    day:            number;
    hours:          number;
    minutes:        number;
    month:          number;
    nanos:          number;
    seconds:        number;
    time:           number;
    timezoneOffset: number;
    year:           number;
}

export interface CreditApplication {
    accountId:                 string;
    applicationApprovalStatus: string;
    applicationId:             string;
    applicationState:          string;
    applicationType:           string;
    completedOn:               Date;
    createdOn:                 Date | number;
    creditAmount:              number;
    currentStepId:             string;
    lastUpdatedOn:             Date;
    lenderAccountId:           string;
    partnerAccountId:          string;
    platformAccountId:         string;
    stepStatusMap:             CasFetchDates;
}

export interface PartnerViewStepperMap {
    additionalProp1: PartnerViewStepperMapAdditionalProp1;
    additionalProp2: PartnerViewStepperMapAdditionalProp1;
    additionalProp3: PartnerViewStepperMapAdditionalProp1;
}

export interface PartnerViewStepperMapAdditionalProp1 {
    horizontalDisplayName: string;
    isEditable:            boolean;
    message:               string;
    order:                 number;
    status:                string;
    verticalDescription:   string;
    verticalDisplayName:   string;
}

export type PartnerLeadsListType = {
    customerMetadataList: PartnerLeadsType[]
    nextToken: string
}

export type PartnerActiveCustomerListType = {
    customerMetadataList: PartnerLeadsType[]
    nextToken: string
}
export type ReferredPartnerDataType = {
    accountHolderEmail: string;
    accountHolderPhoneNumber: string;
    accountId: string;
    accountState: string;
    accountTier: string;
    addedOnTimeStamp: Date;
    address: string;
    isInternal: boolean;
    lastUpdatedTimeStamp: Date;
    partnerAccountType: string;
    partnerCode: string;
    partnerLogoImgSrc: string;
    partnerName: string;
    partnerShipCommenceDate: Date;
    partnerShipEndDate: Date;
    partnershipAgreementIdUri: string;
}

type GlobalProps = {
    buildType: BUILD_TYPE
    user: User
    partnerUser: PartnerUser
    access_token: string
    availableAuthCasMap: { [key in string]: AvailableCASItem }
    accountNumber: string

    authCAS?: AuthCASModel
    ref?: string
    url?: string
    initialAssetRepositoryType?: AssetRepositoryType

    config?: {
        [ConfigTokens.IS_PAN_EDIT_ALLOWED]?: boolean
        [ConfigTokens.IS_MF_FETCH_AUTO_TRIGGER_OTP]?: boolean
        [ConfigTokens.IS_KYC_PHOTO_VERIFICATION]?: boolean
        [ConfigTokens.IS_MF_FETCH_BACK_ALLOWED]?: boolean
        [ConfigTokens.MIN_AMOUNT_ALLOWED]?: number
        [ConfigTokens.MAX_AMOUNT_ALLOWED]?: number
        [ConfigTokens.IS_FIRST_JOURNEY]?: boolean
        [ConfigTokens.IS_RTA_SWITCH_ENABLED]: boolean
    }
    userDob?: string
    creditLimit: number
    listItemDataCAS: any
    desiredPortfolio?: any
    userType: USERTYPE
    partnerRefCode?: string
    applicationId?: string
    bankCode?: string
    bankName?: string
    accountId?: string
    pbankAccNo?: string
    pconfirmAccNo?: string
    pbankIfsc?: string
    bankData: BankData

    basicData: BasicData
    assetRepositoryType?: AssetRepositoryType

    stepperData?: any
    basicData_pan: string
    basicData_phone: string
    basicData_email: string
    basicData_dob: string
    casListOriginal?: AvailableCASItem[]
    toBePledgedAssets: AvailableCASItem[]
    appPlatform?: string
    investorName?: string
    assetRepositoryConfig?: {
        [key in AssetRepositoryType]: AssetRepositoryConfigItemType
    }
    creditStatus?: string
    partnerLeadsList?: PartnerLeadsListType
    PartnerActiveCustomerList?: PartnerLeadsListType,
    PartnerSideBarActiveId?: string,
    ReferredPartnerData?: ReferredPartnerDataType[],
    PartnerCacheExpireTime?: PartnerCacheType,
}

export type PartnerCacheType = {
    ReferredPartnerCacheExpireTime: number;
    ActiveCustomerCacheExpireTime: number;
    LeadsCacheExpireTime: number;
}

let _globalProps: GlobalProps = {
    buildType: BUILD_TYPE.BORROWER_STAGING,
    user: {},
    partnerUser: {
        name: '',
        panNumber: '',
        phoneNumber: '',
        emailId: '',
    },
    access_token: '',
    availableAuthCasMap: {},
    accountNumber: '',
    userType: USERTYPE.BORROWER,
    applicationId: '',
    bankCode: '',
    bankName: '',
    accountId: '',
    pbankAccNo: '',
    pconfirmAccNo: '',
    pbankIfsc: '',
    url: '',
    bankData: {
        bankName: '',
        bankCode: '',
        accountNumber: '',
        confirmAccountNumber: '',
        bankIfsc: '',
    },
    basicData: {
        panNumber: '',
        mobileNumber: '',
        email: '',
        dob: '',
    },
    basicData_pan: '',
    basicData_dob: '',
    basicData_email: '',
    basicData_phone: '',
    authCAS: null,
    ref: '',
    /*** Default asset repository */
    initialAssetRepositoryType: AssetRepositoryType.CAMS,
    assetRepositoryConfig: {
        /*** Sequence of fetching asset repository ***/
        [AssetRepositoryType.KARVY]: {
            isFetched: false,
            isPledgedRequired: false,
            isPledged: false,
            priority: 1,
        },
        [AssetRepositoryType.CAMS]: {
            isFetched: false,
            isPledgedRequired: false,
            isPledged: false,
            priority: 2,
        },
    },
    casListOriginal: [],
    toBePledgedAssets: [],
    appPlatform: 'VOLT_MOBILE_APP',
    config: {
        [ConfigTokens.IS_PAN_EDIT_ALLOWED]: true,
        [ConfigTokens.IS_MF_FETCH_AUTO_TRIGGER_OTP]: false,
        [ConfigTokens.IS_KYC_PHOTO_VERIFICATION]: false,
        [ConfigTokens.IS_MF_FETCH_BACK_ALLOWED]: false,
        [ConfigTokens.MIN_AMOUNT_ALLOWED]: 25000,
        [ConfigTokens.MAX_AMOUNT_ALLOWED]: 10000000,
        [ConfigTokens.IS_RTA_SWITCH_ENABLED]: true,
        [ConfigTokens.IS_FIRST_JOURNEY]: false,
    },
    userDob: '',
    creditLimit: 25000,
    listItemDataCAS: [],
    desiredPortfolio: {},
    stepperData: {},
    investorName: '',
    creditStatus: '',
    partnerLeadsList: {customerMetadataList: [], nextToken: null},
    PartnerActiveCustomerList: {customerMetadataList: [], nextToken: null},
    PartnerSideBarActiveId: '',
    ReferredPartnerData: [],
    PartnerCacheExpireTime: {
        ActiveCustomerCacheExpireTime: null,
        LeadsCacheExpireTime: null,
        ReferredPartnerCacheExpireTime: null,
    }
}

export function setStepperData(StepperData) {
    _globalProps.stepperData = StepperData
}
export function getStepperData(): any {
    return _globalProps.stepperData
}

export function setURL(url: string) {
    _globalProps.url = url
}
export function getURL(): any {
    return _globalProps.url
}

export function setInvestorName(investorName: string) {
    _globalProps.investorName = investorName
}
export function getInvestorName() {
    return _globalProps.investorName
}

export function setBuildType(buildType) {
    _globalProps.buildType = buildType
}
export function getBuildType(): BUILD_TYPE {
    return _globalProps.buildType
}
export function setConfig(configId: ConfigTokens, configValue: any) {
    // @ts-ignore
    _globalProps.config[configId] = configValue
}
export function getConfig(configId?: ConfigTokens): any {
    return configId ? _globalProps.config[configId] : _globalProps.config
}
/*** Asset repository ***/
async function setAssetRepositoryType(
    assetRepositoryType: AssetRepositoryType,
) {
    _globalProps.initialAssetRepositoryType = assetRepositoryType
}
async function getAssetRepositoryType() {
    return _globalProps.initialAssetRepositoryType
}
async function getAssetRepositoryFetchMap() {
    return _globalProps.assetRepositoryConfig
}
async function setAssetRepositoryFetchMap(
    value: AssetRepositoryConfigItemType,
    type?: AssetRepositoryType,
) {
    if (type) {
        _globalProps.assetRepositoryConfig[type] = value
    } else {
        _globalProps.assetRepositoryConfig[
            _globalProps.initialAssetRepositoryType
        ] = value
    }
}
/*** End Asset repository ***/

async function setBasicData(props: BasicData) {
    _globalProps.basicData = await props
}

async function getBasicData() {
    return _globalProps.basicData
}

async function setBasicDataPan(basicData_pan: string) {
    _globalProps.basicData_pan = basicData_pan
}

async function getBasicDataPan() {
    return _globalProps.basicData_pan
}

async function setBasicDataEmail(basicData_email: string) {
    _globalProps.basicData_email = basicData_email
}

async function getBasicDataEmail() {
    return _globalProps.basicData_email
}
async function setBasicDataDob(basicData_dob: string) {
    _globalProps.basicData_dob = basicData_dob
}

async function getBasicDataDob() {
    return _globalProps.basicData_dob
}
async function setBasicDataPhone(basicData_phone: string) {
    _globalProps.basicData_phone = basicData_phone
}

async function getBasicDataPhone() {
    return _globalProps.basicData_phone
}

async function setBankData(props: BankData) {
    _globalProps.bankData = await props
}

async function getBankData() {
    return _globalProps.bankData
}

async function setPartnerUser(props: PartnerUser) {
    _globalProps.partnerUser = await props
}

async function getPartnerUser() {
    return _globalProps.partnerUser
}

async function setAccountId(accountId: string) {
    _globalProps.accountId = accountId
}

async function getAccountId() {
    return _globalProps.accountId
}

async function setBankCode(bankCode: string) {
    _globalProps.bankCode = bankCode
}

async function getBankCode() {
    return _globalProps.bankCode
}

async function setBankName(bankName: string) {
    _globalProps.bankName = bankName
}

async function getBankName() {
    return _globalProps.bankName
}

async function setUserType(userType: USERTYPE) {
    _globalProps.userType = userType
}

async function getUserType() {
    return _globalProps.userType
}

async function setApplicationId(applicationId: string) {
    _globalProps.applicationId = applicationId
}
async function getApplicationId() {
    return _globalProps.applicationId
}

async function setAccountNumber(accountNumber: string) {
    _globalProps.accountNumber = accountNumber
}
async function getAccountNumber() {
    return _globalProps.accountNumber
}
async function setGlobalProps(props: GlobalProps) {
    _globalProps = await props
}
async function getPartnerRefCode() {
    return _globalProps.ref
}
async function setPartnerRefCode(ref: string) {
    _globalProps.ref = ref
}
async function getUrlParams() {
    const timestamp = new Date().getTime()
    const urlWithDate = await AsyncStorage.getItem(StoreKey.urlWithDate)
    if (urlWithDate && urlWithDate.includes('&timestamp=')) {
        const dataArray = urlWithDate.split('&timestamp=')
        const time = parseInt(dataArray[1]) || 0
        if (time) {
            const diff = timestamp - time
            if (diff > 2419200000) {
                return null
            } else {
                return dataArray[0]
            }
        } else {
            return null
        }
    } else {
        return null
    }
}
async function setUrlParams(url: string) {
    if (
        url.includes('utm_source=') ||
        url.includes('utm_medium=') ||
        url.includes('utm_campaign=') ||
        url.includes('utm_content=') ||
        url.includes('utm_id=') ||
        url.includes('utm_term=')
    ) {
        const urlWithDate = url + '&timestamp=' + new Date().getTime()
        await AsyncStorage.setItem(StoreKey.urlWithDate, urlWithDate)
    }
}

function getPropsValue(key?: string) {
    if (_globalProps && key) {
        return _globalProps[key]
    }
    return null
}

async function setUser(user: User) {
    _globalProps.user = await user
}

async function getUser() {
    if (__isMock__) {
        return MockUser
    }
    if (Object.values(_globalProps.user).length > 0) {
        return _globalProps.user
    }
    return null
}
async function setToken(access_token: string) {
    _globalProps.access_token = access_token
    await AsyncStorage.setItem(StoreKey.accessToken, access_token)
}

async function getToken() {
    if (__isMock__) {
        return MockToken
    }
    if (_globalProps && _globalProps.access_token != '') {
        return _globalProps.access_token
    }
    const token = await AsyncStorage.getItem(StoreKey.accessToken)
    _globalProps.access_token = token
    if (token) return token

    return null
}

async function setAvailableCASMap(availableAuthCasMap: {
    [key in string]: AvailableCASItem
}) {
    _globalProps.availableAuthCasMap = availableAuthCasMap
}

async function getAvailableCASMap() {
    return _globalProps.availableAuthCasMap
}

async function setToBePledgedAssets(toBePledgedAssets: AvailableCASItem[]) {
    _globalProps.toBePledgedAssets = toBePledgedAssets
}

async function getToBePledgedAssets() {
    return _globalProps.toBePledgedAssets
}

async function setOnboarding(boolean: boolean) {
    // isOnboardingSeen.seen = boolean;
    await AsyncStorage.setItem(
        StoreKey.isLoadedFirstTime,
        JSON.stringify(boolean),
    )
}

async function getOnboarding() {
    return await AsyncStorage.getItem(StoreKey.isLoadedFirstTime)
}
async function setPledgeFirstTime(boolean: boolean) {
    await AsyncStorage.setItem(
        StoreKey.isPledgeFirstTime,
        JSON.stringify(boolean),
    )
}

async function isPledgeFirstTime(): Promise<boolean> {
    const isFirstTime = await AsyncStorage.getItem(StoreKey.isPledgeFirstTime)
    return isFirstTime === null ? true : JSON.parse(isFirstTime)
}

async function setCasListOriginal(casListOriginal: AvailableCASItem[]) {
    _globalProps.casListOriginal = casListOriginal
}
async function getCasListOriginal() {
    return _globalProps.casListOriginal
}
async function setAppPlatform(type: string) {
    _globalProps.appPlatform = type
}
async function getAppPlatform() {
    return _globalProps.appPlatform
}
async function setUserDob(type: string) {
    _globalProps.userDob = type
}
async function getUserDob() {
    return _globalProps.userDob
}

async function setAuthCASResponse(data: AuthCASModel) {
    _globalProps.authCAS = data
}
async function getAuthCASResponse() {
    return _globalProps.authCAS
}
async function setCreditLimit(creditLimit: number) {
    _globalProps.creditLimit = creditLimit
}
async function getCreditLimit() {
    return _globalProps.creditLimit
}
async function setListItemDataCAS(listItemsDataCAS: any) {
    _globalProps.listItemDataCAS = listItemsDataCAS
}
async function getListItemDataCAS() {
    return _globalProps.listItemDataCAS
}

async function setDesiredPortfolio(desiredPortfolio: any) {
    _globalProps.desiredPortfolio = desiredPortfolio
}

async function getDesiredPortfolio() {
    return _globalProps.desiredPortfolio
}

async function setCreditStatus(creditStatus: any) {
    _globalProps.creditStatus = creditStatus
}

async function getCreditStatus() {
    return _globalProps.creditStatus
}

async function setPartnerLeadsList(partnerLeadsList: PartnerLeadsListType) {
    _globalProps.partnerLeadsList = partnerLeadsList
}

async function getPartnerLeadsList() {
    return _globalProps.partnerLeadsList
}

async function setPartnerActiveCustomerList(PartnerActiveCustomerList: PartnerActiveCustomerListType) {
    _globalProps.PartnerActiveCustomerList = PartnerActiveCustomerList
}

async function getPartnerActiveCustomerList() {
    return _globalProps.PartnerActiveCustomerList
}

async function setPartnerSideBarActiveId(activeId: string) {
    _globalProps.PartnerSideBarActiveId = activeId
}

async function getPartnerSideBarActiveId() {
    return _globalProps.PartnerSideBarActiveId
}

async function setReferredPartnerData(referredPartnerData: ReferredPartnerDataType[]) {
    _globalProps.ReferredPartnerData = referredPartnerData
}

async function getReferredPartnerData() {
    return _globalProps.ReferredPartnerData
}

async function setPartnerCacheExpireTime(newPartnerCacheExpireTime: PartnerCacheType) {
    _globalProps.PartnerCacheExpireTime = newPartnerCacheExpireTime
}

async function getPartnerCacheExpireTime() {
    return _globalProps.PartnerCacheExpireTime
}

export default {
    setBuildType,
    getBuildType,
    setGlobalProps,
    getPropsValue,
    setUser,
    getUser,
    setURL,
    getURL,
    setToken,
    getToken,
    setAvailableCASMap,
    getAvailableCASMap,
    setToBePledgedAssets,
    getToBePledgedAssets,
    setOnboarding,
    getOnboarding,
    getAccountNumber,
    setAccountNumber,
    setPledgeFirstTime,
    isPledgeFirstTime,
    setUserType,
    getUserType,
    setPartnerRefCode,
    getPartnerRefCode,
    setApplicationId,
    getApplicationId,
    setBankCode,
    getBankCode,
    setBankName,
    getBankName,
    getAccountId,
    setAccountId,
    setPartnerUser,
    getPartnerUser,
    setBankData,
    getBankData,
    setBasicData,
    getBasicData,
    setAssetRepositoryType,
    getAssetRepositoryType,
    getAssetRepositoryFetchMap,
    setAssetRepositoryFetchMap,
    setCasListOriginal,
    getCasListOriginal,
    setUrlParams,
    getUrlParams,
    setAppPlatform,
    getAppPlatform,
    setConfig,
    getConfig,
    setAuthCASResponse,
    getAuthCASResponse,
    setUserDob,
    getUserDob,
    setCreditLimit,
    getCreditLimit,
    setListItemDataCAS,
    getListItemDataCAS,
    setDesiredPortfolio,
    getDesiredPortfolio,
    setStepperData,
    getStepperData,
    setInvestorName,
    getInvestorName,
    getBasicDataDob,
    setBasicDataDob,
    getBasicDataEmail,
    setBasicDataEmail,
    getBasicDataPan,
    setBasicDataPan,
    getBasicDataPhone,
    setBasicDataPhone,
    setCreditStatus,
    getCreditStatus,
    setPartnerLeadsList,
    getPartnerLeadsList,
    setPartnerActiveCustomerList,
    getPartnerActiveCustomerList,
    setPartnerSideBarActiveId,
    getPartnerSideBarActiveId,
    setReferredPartnerData,
    getReferredPartnerData,
    setPartnerCacheExpireTime,
    getPartnerCacheExpireTime
}
