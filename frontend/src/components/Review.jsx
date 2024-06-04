import { FaStar, FaUserCircle } from 'react-icons/fa';
import dayjs from 'dayjs';

const Review = ({ review }) => {
  return (
    <div className='shadow-lg rounded-2xl overflow-hidden'>
      <div className='py-3 px-4 bg-white bg-opacity-40'>
        <div className='flex flex-wrap items-center justify-start'>
          <div className='mr-3 sm:mr-6 shadow-lg rounded-full bg-white '>
            <FaUserCircle size={30} color='navy' className='sm:hidden' />
            <FaUserCircle size={60} color='navy' className='hidden sm:block' />
          </div>
          <h4 className='text-lg sm:w-auto sm:text-xl font-heading font-medium'>
            {review.author.name}
          </h4>
          <div className='w-px h-8 mx-3 sm:mx-8 bg-transparent bg-gray-200'></div>
          <span className='text-lg  sm:text-xl mr-4 font-heading font-medium'>
            {review.rating}.0
          </span>
          <div className='inline-flex'>
            {[...Array(5)].map((_, index) => {
              return (
                <FaStar
                  key={index}
                  color={index < review.rating ? '#ffc107' : '#e4e5e9'}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className='px-4 overflow-hidden md:px-16 pt-3 pb-5 sm:pt-8 sm:pb-12 bg-white'>
        <div className='flex flex-wrap'>
          <div className='w-full md:w-2/3 mb-6 md:mb-0'>
            <p className=' max-w-2xl leading-loose'>{review.body}</p>
          </div>
          <div className='w-full md:w-1/3 md:text-right'>
            <p className=' text-sm text-gray-400'>
              Reviewed {dayjs(review.createdAt).format('MMMM D, YYYY')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Review;
