import { Link } from 'react-router-dom';

const CampusCard = ({ campus }) => {
  const averageRating = () => {
    if (campus.reviews.length === 0) {
      return 0;
    }
    const sum = campus.reviews.reduce((total, next) => total + next.rating, 0);
    const average = sum / campus.reviews.length;
    // Round the average to one decimal place
    return Math.round(average * 10) / 10;
  };

  const background = () => {
    if (averageRating() === 0) {
      return 'bg-gray-200';
    } else if (averageRating() < 2) {
      return 'bg-red-300';
    } else if (averageRating() < 4) {
      return 'bg-yellow-200';
    } else {
      return 'bg-green-200';
    }
  };

  return (
    <Link to={`/campuses/${campus._id}`}>
      <div className='h-full max-w-md p-6 flex justify-between gap-3 bg-white rounded-lg shadow'>
        <div>
          <h5 className='mb-2 text-xl font-semibold tracking-tight text-gray-900'>
            {campus.name}
          </h5>
          <p className='text-gray-700 text-base mb-4'>{campus.location}</p>
        </div>
        <div
          className={`flex items-center justify-center rounded h-16 w-16 p-6 ${background()}`}
        >
          <p className='text-3xl font-semibold w-100 h-100'>
            {averageRating()}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default CampusCard;
