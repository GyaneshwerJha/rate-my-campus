import { FaStar } from 'react-icons/fa';

export const StarRating = ({ numStars, rating, setRating }) => {
  return (
    <div className='flex gap-1'>
      {[...Array(numStars)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type='radio'
              name='rating'
              value={ratingValue}
              className='hidden'
              onClick={() => setRating(ratingValue)}
            />
            <div>
              <FaStar
                size={40}
                className='cursor-pointer'
                color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
              />
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
