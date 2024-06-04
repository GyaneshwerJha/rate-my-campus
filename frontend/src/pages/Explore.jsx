import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import CampusCard from '../components/CampusCard';
import ClusterMap from '../components/ClusterMap';
import { getCampuses, reset } from '../features/campuses/campusesSlice';
import { Link } from 'react-router-dom';

const Explore = () => {
  const dispatch = useDispatch();

  const { campuses, isLoading, isError, message } = useSelector(
    (state) => state.campuses
  );

  useEffect(() => {
    dispatch(getCampuses());

    return () => {
      dispatch(reset());
    };
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[calc(100vh-80px)] pb-20 overflow-auto'>
        <Spinner />
      </div>
    );
  }
  return (
    <div className='flex flex-col gap-8 pb-20'>
      {campuses && <ClusterMap campuses={campuses} />}
      <div className='container'>
        <h1 className='text-4xl font-bold pb-8'>Campus Ratings</h1>
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
          {campuses.map((campus) => (
            <CampusCard campus={campus} key={campus._id} />
          ))}
        </div>
      </div>
      <div className='mx-auto flex flex-col gap-4 items-center'>
        <p className=''>Don't see the campus you're looking for?</p>
        <Link
          to='/campuses/new'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Add it!
        </Link>
      </div>
    </div>
  );
};
export default Explore;
