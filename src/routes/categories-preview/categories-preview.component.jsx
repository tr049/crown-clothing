import {CategoriesContext} from "../../contexts/categories.context";
import {Fragment, useContext} from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);

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
