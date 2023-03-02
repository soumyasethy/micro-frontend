export enum ACTION {
    CHANGE_TAB="CHANGE_TAB",
    ON_LOAD = 'ON_LOAD',
    ON_SEARCH_RP = 'ON_SEARCH_RP',
    ON_SORT_RP = 'ON_SORT_RP',
}

export type SortActionPayload = {
    value: string
}

export type SearchInputActionPayload = {
    value: string,
    widgetId: string
};
