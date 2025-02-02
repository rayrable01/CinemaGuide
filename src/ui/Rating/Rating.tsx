import { FC } from "react"
import './Rating.css'

interface RatingProps {
    rating: number,
    classN: string,
    imageURL: string,
}

export const Rating:FC<RatingProps> = ({rating, classN, imageURL}) => {

    let backgroundColor;

    if (rating < 5) {
        backgroundColor = "#c82020";
    } else if (rating >= 5 && rating < 7) {
        backgroundColor = "#777";
    } else if (rating >= 7 && rating < 8) {
        backgroundColor = "#308e21";
    } else {
        backgroundColor = '#a59400';
    }

    return (
        <span className={classN} style={{backgroundColor: backgroundColor}}>
            <img src={imageURL} alt="star" />
                {rating.toFixed(1)}
        </span>
    )
}