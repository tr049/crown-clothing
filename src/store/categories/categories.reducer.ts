import {CATEGORIES_ACTION_TYPES, Category} from "./categories.types";
import {CategoryAction, fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess} from "./categories.action";
import {AnyAction} from "redux";

export type CategoryState = {
    readonly categories: Category[],
    readonly isLoading: boolean,
    readonly error: Error | null
}

export const CATEGORIES_INITIAL_STATE: CategoryState = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} as AnyAction): CategoryState => {

    if (fetchCategoriesStart.match(action)) {
        return {...state, isLoading: true};
    }
    else if (fetchCategoriesSuccess.match(action)) {
        return {...state, isLoading: false, categories: action.payload};
    }
    else if (fetchCategoriesFailed.match(action)) {
        return {...state, isLoading: false, error: action.payload};
    }
    else if (fetchCategoriesStart.match(action)) {
        return {...state, isLoading: true};
    }

    return state;
}
