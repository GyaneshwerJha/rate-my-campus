import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { toast } from 'react-hot-toast';

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleClick = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
    toast.success('You have been logged out');
  };

  return (
    <nav className='bg-white'>
      <div className='container flex items-center justify-between flex-wrap h-20'>
        <div className='font-semibold text-lg'>
          <Link to='/' className='flex items-center gap-1'>
            Rate My Campus
          </Link>
        </div>
        <div>
          {user ? (
            <button
              onClick={handleClick}
              className='flex items-center gap-1 font-semibold'
            >
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <div className='flex items-center gap-5'>
              <Link
                to='/login'
                className='flex items-center gap-1 font-semibold'
              >
                <FaSignInAlt /> Login
              </Link>
              <Link
                to='/register'
                className='flex items-center gap-1 font-semibold'
              >
                <FaUser /> Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Nav;
