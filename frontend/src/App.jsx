import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';
import Nav from './components/Nav';
import Explore from './pages/Explore';
import Register from './pages/Register';
import Login from './pages/Login';
import NewCampus from './pages/NewCampus';
import Campus from './pages/Campus';

const App = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <Toaster />
      <Router>
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/campuses/:campusId' element={<Campus />} />
          <Route path='/campuses/new' element={<NewCampus />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
