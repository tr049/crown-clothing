import { createSelector } from "reselect";
import {CategoryState} from "./categories.reducer";
import {Category, CategoryMap} from "./categories.types";
import {RootState} from "../store";

const selectCategoryReducer = (state: RootState): CategoryState => state.categories;

export const selectCategoriesMap = createSelector(
    [selectCategoryReducer],
    (categoriesSlice: CategoryState) => categoriesSlice.categories
)

export const selectCategories = createSelector(
    [selectCategoriesMap],
    (categories: Category[]): CategoryMap =>  categories.reduce(
        (acc, { title, items }) => {
            acc[title.toLowerCase()] = items;
            return acc;
        }, {} as CategoryMap)
)

export const selectCategoryIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)
