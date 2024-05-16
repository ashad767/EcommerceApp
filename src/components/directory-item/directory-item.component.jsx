import { useNavigate } from 'react-router-dom';
import './directory-item.styles.scss'

const DirectoryItem = ({ category }) => {
    const { title, imageUrl } = category;
    const nav = useNavigate();

    const redirect = () => {
        nav(`/shop/${title}`);
    }

    return (
        <div className="directory-item-container" onClick={redirect}>
            <div className="background-image" style={{
                backgroundImage: `url(${imageUrl})`
            }}>
            </div>
            <div className="body">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
}

export default DirectoryItem