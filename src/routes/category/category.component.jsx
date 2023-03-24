import './category.styles.scss';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductCard from "../../components/product-card/product-card.component";
import {useSelector} from "react-redux";
import {selectCategories, selectCategoryIsLoading} from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.component";

const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategories);
    const isLoading = useSelector(selectCategoryIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);


    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {
                isLoading ? (
                    <Spinner />
                ) : (
                    <div className='category-container'>
                        {
                            products && products.map((product) => {
                                return <ProductCard key={product.id} product={product} />
                            })
                        }
                    </div>
                )
            }
        </>
    )
}

export default Category;
