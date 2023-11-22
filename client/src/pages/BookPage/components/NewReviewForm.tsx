import { useEffect, useState } from "react";
import { NewReviewFormProps, NewReviewProps } from "../types";

const NewReviewForm: React.FC<NewReviewFormProps> = ({ onSubmit, mutation, updateFormState }) => {
    const [formState, setFormState] = useState<NewReviewProps>({
        bookID: '',
        username: '',
        rating: 0,
        review: '',
    });


    useEffect(() => {
        updateFormState(formState);
    }
        , [formState, updateFormState]);

    return (
        <div id="addReview">
            <h2>Add review</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={formState.username}
                    onChange={(e) => setFormState({ ...formState, username: e.target.value })}
                />
                <p></p>
                <label htmlFor="rating">Rating: </label>
                <input
                    type="number"
                    name="rating"
                    id="rating"
                    min="1"
                    max="5"
                    value={formState.rating}
                    onChange={(e) => setFormState({ ...formState, rating: parseInt(e.target.value) })}
                />
                <p></p>
                <label htmlFor="review">Review: </label>
                <textarea
                    name="review"
                    id="review"
                    maxLength="100"
                    cols="30"
                    rows="5"
                    value={formState.review}
                    onChange={(e) => setFormState({ ...formState, review: e.target.value })}
                ></textarea>
                <p></p>
                <button
                    type="submit"
                    disabled={!formState.username.trim() || !formState.review.trim()}
                    style={{
                        backgroundColor: !formState.username.trim() || !formState.review.trim() ? '#ccc' : 'blue',
                        color: 'white',
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default NewReviewForm;