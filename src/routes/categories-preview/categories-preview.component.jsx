import {Fragment} from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import {useSelector} from "react-redux";
import {selectCategories} from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategories);

    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map((category) => {
                    const products = categoriesMap[category];
                    return <CategoryPreview key={category} title={category} products={products} />
                })
            }
        </Fragment>
    );
}

export default CategoriesPreview;
