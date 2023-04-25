import { useState } from "react";
import { db } from "../fbconfig"
import { doc, updateDoc } from "firebase/firestore";

const Stars = ({id, starRating}) => {
    const [rating, setRating] = useState(starRating)
    const [hover, setHover] = useState(0)

    const updateStar = async (id, index) => {
        await updateDoc(doc(db, "recipe", id), {stars: index})
    }

    const handleClick = (id, index) => {
        setRating(index);

        updateStar(id, index)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="stars">
            {[1,2,3,4,5].map((star, index) => {
                index += 1;
                return (
                <button
                    type="button"
                    key={index}
                    className={index <= (hover || rating) ? "on" : "off"}
                    onClick={() => handleClick(id, index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                >
                    <span className="star">&#9733;</span>
                </button>
                );
            })}
        </div>
    );
}
 
export default Stars;