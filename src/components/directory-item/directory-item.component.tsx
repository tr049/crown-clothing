import './directory-item.styles';
import {BackgroundImage, Body, DirectoryItemContainer} from "./directory-item.styles";
import {useNavigate} from "react-router-dom";
import {FC} from "react";
import {CategoryModel} from "../directory/directory.component";

export type DirectoryItemProps = {
    category: CategoryModel;
}

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
    const { imageUrl, title, route } = category;

    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;
