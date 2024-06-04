import { useState, useEffect } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaCircle,
  FaRegCircle,
} from 'react-icons/fa';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousSlide = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  if (images)
    return (
      <div className='h-[300px] sm:h-[400px] w-full m-auto relative group'>
        <div
          style={{
            backgroundImage: `url(${images[currentIndex].sliderImage})`,
          }}
          className='w-full h-full rounded-2xl bg-center bg-cover duration-1000'
        ></div>
        {/* Left Arrow */}
        <div
          className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'
          onClick={previousSlide}
        >
          <FaChevronLeft size={20} />
        </div>
        {/* Right Arrow */}
        <div
          className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'
          onClick={nextSlide}
        >
          <FaChevronRight size={20} />
        </div>
        <div className='flex top-4 justify-center py-2'>
          {images.map((image, index) =>
            index === currentIndex ? (
              <div
                key={index}
                className='px-2 cursor-pointer'
                onClick={() => setCurrentIndex(index)}
              >
                <FaRegCircle size={8} />
              </div>
            ) : (
              <div
                key={index}
                className='px-2 cursor-pointer'
                onClick={() => setCurrentIndex(index)}
              >
                <FaCircle size={8} />
              </div>
            )
          )}
        </div>
      </div>
    );
};
export default ImageSlider;
