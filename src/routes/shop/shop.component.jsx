import {Routes, Route} from 'react-router-dom';

import './shop.styles.scss';
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import {useEffect} from "react";
import {getCategoriesAndDocuments} from "../../utils/firebase.utils";
import {useDispatch} from "react-redux";
import {setCategories} from "../../store/categories/categories.action";

const Shop = () => {

    const dispatch = useDispatch();

    useEffect( () => {
        const getCategoriesMap = async () => {
            const categories = await getCategoriesAndDocuments();

            dispatch(setCategories(categories));
        }

        getCategoriesMap();
    }, []);

    return (
       <Routes>
           <Route index element={<CategoriesPreview />} />
           <Route path=":category" element={<Category />} />
       </Routes>
    );
}

export default Shop;
