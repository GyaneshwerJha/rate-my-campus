import { useAutoAnimate } from '@formkit/auto-animate/react';
import Review from './Review';

const ReviewList = ({ reviews }) => {
  const [list] = useAutoAnimate();

  return (
    <div className='flex flex-col gap-8'>
      <h2 className='text-2xl font-semibold underline'>
        {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
      </h2>
      <div className='flex flex-col gap-8' ref={list}>
        {reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};
export default ReviewList;
