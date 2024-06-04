import spinner from '../assets/spinner.gif';

const Spinner = () => {
  return (
    <div>
      <img src={spinner} width={200} alt='Loading...' className='mx-auto' />
    </div>
  );
};
export default Spinner;
