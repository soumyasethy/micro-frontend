export enum ACTION {
    ON_SEARCH_AC="ON_SEARCH_AC",
    ON_SORT_AC="ON_SORT_AC",
    ON_LOAD = "ON_LOAD",
    CHANGE_TAB = "CHANGE_TAB"
}

export type SearchInputActionPayload = {
    value: string,
    widgetId: string
};

export type SortActionPayload = {
    value: string
}