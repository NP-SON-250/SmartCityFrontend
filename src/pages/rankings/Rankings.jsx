import React from 'react';
import '../rankings/rankings.css';
import Banner from '../../components/banner/Banner';
import SingleCity from '../../components/singleCity/SingleCity';

function Rankings() {
  return (
    <>
      <Banner title='Overall Rankings' />
      <div className='rankings_container section__padding'>
        <div className='rankings_title'>
          <h1>Best Cities Rankings</h1>
          <div className='line'></div>
        </div>
        <div className='rankings_content'>
          <p>
            Some states shine in Infrastructure. Some soar in education. Some
            excel in both – or in much more. The Best Cities rankings by Smart
            City Development Maturity Assessment Matrix on thousands of data
            points to measure how well cities are performing for their citizens.
          </p>
          <hr />
          <p>15 Cities</p>
        </div>
        <div className='overall_container'>
          <div className='left-side'>
            <SingleCity Name='Kicukiro' position='1' />
            <SingleCity Name='Gasabo' position='2' />
            <SingleCity Name='Huye' position='3' />
            <SingleCity Name='Musanze' position='4' />
            <SingleCity Name='Rwamagana' position='5' />
          </div>
          <div className='right-side'>Right</div>
        </div>
      </div>
    </>
  );
}

export default Rankings;
