import {Action, ActionWithPayLoad, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {CATEGORIES_ACTION_TYPES, Category} from "./categories.types";
import {getCategoriesAndDocuments} from "../../utils/firebase.utils";


export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayLoad<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

export type FetchCategoriesFailed = ActionWithPayLoad<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>


// Creating Union of types
export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed;

export const fetchCategoriesStart = withMatcher(() => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));
export const fetchCategoriesSuccess = withMatcher((categories: Category[]) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories));
export const fetchCategoriesFailed = withMatcher((error: Error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));

// This code is for redux thunk
// export const fetchCategoriesAsync = () => async (dispatch) => {
//     try {
//         dispatch(fetchCategoriesStart());
//
//         const categories = await getCategoriesAndDocuments();
//
//         dispatch(fetchCategoriesSuccess(categories));
//     }
//     catch(error) {
//         dispatch(fetchCategoriesFailed(error));
//     }
// }
