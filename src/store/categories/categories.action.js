import {createAction} from "../../utils/reducer/reducer.utils";
import {CATEGORIES_ACTION_TYPES} from "./categories.types";
import {getCategoriesAndDocuments} from "../../utils/firebase.utils";

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
export const fetchCategoriesSuccess = (categories) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);
export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
    try {
        dispatch(fetchCategoriesStart());

        const categories = await getCategoriesAndDocuments();

        dispatch(fetchCategoriesSuccess(categories));
    }
    catch(error) {
        dispatch(fetchCategoriesFailed(error));
    }
}
