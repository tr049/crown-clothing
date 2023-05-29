import {Fragment} from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import {useSelector} from "react-redux";
import {selectCategories, selectCategoryIsLoading} from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategories);
    const isCategoryLoading = useSelector(selectCategoryIsLoading);

    return (
        <Fragment>
            {
                isCategoryLoading ? (
                        <Spinner />
                    ): (
                    Object.keys(categoriesMap).map((category) => {
                        const products = categoriesMap[category];
                        return <CategoryPreview key={category} title={category} products={products} />
                    })
                )
            }
        </Fragment>
    );
}

export default CategoriesPreview;
