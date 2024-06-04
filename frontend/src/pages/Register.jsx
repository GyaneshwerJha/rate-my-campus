import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // Redirect when logged in
    if (isSuccess && user) {
      toast.success(`Welcome, ${user.name}!`);
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(formData));
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[calc(100vh-80px)] pb-20 overflow-auto'>
        <Spinner />
      </div>
    );
  }
  return (
    <div className='container max-w-sm flex flex-col pb-20 min-h-[calc(100vh-80px)] justify-center'>
      <div className='bg-white shadow-md rounded-2xl p-8 flex flex-col gap-8'>
        <h1 className='text-3xl font-semibold text-center'>Register</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='name' className='text-gray-700 text-sm font-bold'>
              Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='What should we call you?'
              value={name}
              onChange={handleChange}
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor='email' className='text-gray-700 text-sm font-bold'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Please enter your email'
              value={email}
              onChange={handleChange}
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='password'
              className='text-gray-700 text-sm font-bold'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Please enter your password'
              value={password}
              onChange={handleChange}
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none'
            />
          </div>
          <div className='flex flex-col'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline self-center'
            >
              Register
            </button>
            <p className='self-center mt-3 text-sm text-gray-500'>
              Already a member?{' '}
              <Link
                to='/login'
                className='text-blue-600 font-semibold hover:underline'
              >
                Login now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
