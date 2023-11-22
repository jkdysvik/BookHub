import { useEffect, useState } from "react";
import Modal from "react-modal";
import { NewReviewFormProps, NewReviewProps } from "../types";
import "./NewReviewForm.scss";

const NewReviewForm: React.FC<NewReviewFormProps> = ({ onSubmit, toggleNewReview, updateFormState }) => {
    const [formState, setFormState] = useState<NewReviewProps>({
        bookID: '',
        username: '',
        rating: 0,
        review: '',
    });

    useEffect(() => {
        updateFormState(formState);
    }, [formState, updateFormState]);

    const closeModal = () => {
        // Add any additional logic you need when closing the modal
        setFormState({
            bookID: '',
            username: '',
            rating: 0,
            review: '',
        });
    };

    return (
        <Modal
            isOpen={toggleNewReview}
            onRequestClose={closeModal}
            contentLabel="New Review Form"
        >
            <div className="newreviewform-container">
                <h2>New review</h2>
                <form onSubmit={onSubmit}>
                    {/* Form content remains the same */}
                    {/* ... */}
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
        </Modal>
    );
};

export default NewReviewForm;
