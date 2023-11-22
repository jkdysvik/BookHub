import { FC } from 'react';
import { ReviewListProps } from '../types.ts';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import '../BookPage.scss';

const ReviewList: FC<ReviewListProps> = ({ reviews }) => {

    return (
        <div className="bookpage-review-container">
            <h2>Reviews</h2>
            <div id="reviewList">
                {reviews?.bookReviews.map((review) => (
                    <div className="bookpage-review" key={review._id}>
                        <div className="bookpage-review-header">
                            <PersonIcon style={{ fontSize: 'large', marginLeft: '0px', color: '#35633b' }} />
                            {review.username}
                            <p>
                                {Array.from({ length: review.rating }, (_, index) => (
                                    <StarIcon key={index} style={{ fontSize: 'medium', marginLeft: '0px', color: '#35633b' }} />
                                ))}
                                {Array.from({ length: 5 - review.rating }, (_, index) => (
                                    <StarIcon key={index + review.rating} style={{ fontSize: 'medium', marginLeft: '0px', color: '#808080' }} />
                                ))}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>);
};
export default ReviewList;