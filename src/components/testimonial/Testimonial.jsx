import React from 'react';
import '../testimonial/testimonial.css';
import Aboutimage from '../../pages/about/aboutimage.png';
function Testimonial() {
  return (
    <>
      <div className='whole-card'>
        <div className='Testimonial-card'>
          <p>
            Breathtaking skyline, vibrant culture, and friendly locals this city
            is a masterpiece painted with the colors of life. Each corner tells
            a story, and every street feels like a journey. It's not just a
            beautiful city; it's a symphony of sights that leaves you in awe at
            every turn.
          </p>
        </div>
        <div className='Testimonial-image'>
          <div className='only-image'>
            <img src={Aboutimage} alt='image' />
          </div>
          <div className='names'>
            <h2>Roger Scoot</h2>
            <h3>Marketing Manager</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Testimonial;
