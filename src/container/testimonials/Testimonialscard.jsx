import React from 'react'
import './Testimonials.css';
import ProfileImage from '../testimonials/profile.jpeg'

const Testimonialscard = () => {
  return (
    <div className='card-holder'>
      <div className='text-container'>
        <p>"LandVault has been a game-changer for our community. With their platform, we've been able to securely manage our land records, resolve disputes, and unlock economic opportunities. It's more than just technology; it's empowerment."</p>
      </div>
      <div className='profile-container'>
        <div>
            <img src={ProfileImage} alt="image" className='profile-image'/>
        </div>

        <div className='profile-details'>
            <h1 className='profile-name'>Sostene</h1>
            <h2 className='profile-career'> SoftwareDeveloper</h2>
        </div>
      </div>
    </div>
  )
}

export default Testimonialscard
