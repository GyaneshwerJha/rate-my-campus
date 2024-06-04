import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCampus, reset } from '../features/campuses/campusesSlice';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';

const NewCampus = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    images: [],
  });

  const { name, location, description, images } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const { isLoading, isError, campusSubmit, message } = useSelector(
    (state) => state.campuses
  );

  useEffect(() => {
    if (!user) {
      toast.error('Please login to submit a campus');
      navigate('/login');
    }
    if (isError) {
      toast.error(message);
    }
    if (campusSubmit) {
      toast.success(`${name} added!`);
      navigate('/');
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, campusSubmit, message]);

  const handleChange = (e) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: e.target.files,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !location || !description) {
      toast.error('Please enter all fields');
      return;
    }

    const campusData = new FormData();

    // Append body
    campusData.append('name', name);
    campusData.append('location', location);
    campusData.append('description', description);

    // Append files
    for (let i = 0; i < images.length; i++) {
      campusData.append('images', images[i]);
    }

    dispatch(createCampus(campusData));
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[calc(100vh-80px)] pb-20 overflow-auto'>
        <Spinner />
      </div>
    );
  }
  return (
    <div className='container max-w-md flex flex-col pb-20 min-h-[calc(100vh-80px)] justify-center'>
      <div className='flex flex-col gap-8 mt-4'>
        <h1 className='text-3xl font-semibold'>Add Campus</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='name' className='text-gray-700 text-sm font-bold'>
              Campus Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Please enter the campus name'
              value={name}
              onChange={handleChange}
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='location'
              className='text-gray-700 text-sm font-bold'
            >
              Location
            </label>
            <input
              type='text'
              name='location'
              id='location'
              placeholder='Please enter the location'
              value={location}
              onChange={handleChange}
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='description'
              className='text-gray-700 text-sm font-bold'
            >
              Description
            </label>
            <textarea
              name='description'
              id='description'
              placeholder='Please enter a description of the campus'
              rows='4'
              cols='1'
              wrap='hard'
              value={description}
              onChange={handleChange}
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none resize-none'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='images' className='text-gray-700 text-sm font-bold'>
              Upload images
            </label>
            <div className='flex items-center justify-center w-full'>
              <label className='flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white  hover:bg-gray-100 shadow'>
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <svg
                    aria-hidden='true'
                    className='w-10 h-10 mb-3 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                    ></path>
                  </svg>
                  <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                    <span className='font-semibold'>Click to upload</span>
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    Maximum 6 images
                  </p>
                </div>
                <input
                  type='file'
                  id='images'
                  name='images'
                  max='6'
                  accept='image/*'
                  multiple
                  className='hidden'
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className='flex flex-wrap h-full mt-4 '>
              {images &&
                [...images].map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    className='h-[100px] mr-3 mb-3 opacity-80 rounded shadow'
                  />
                ))}
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewCampus;
