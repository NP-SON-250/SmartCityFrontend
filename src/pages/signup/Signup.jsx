import React from 'react';
import '../signup/signup.css';
import signupImage from '../../assets/signup.jpg';
import { WiDirectionRight } from 'react-icons/wi';
import Banner from '../../components/banner/Banner';

function Signup() {
  return (
    <>
      <Banner title='Create account' />
      <div className='section__padding'>
        <div className='container-signup'>
          <div className='signup-image'>
            <img src={signupImage} alt='image' className='signup-image' />
          </div>

          <div className='signup-form'>
            <form action='#' className='signup-form-og'>
              <h1>Register</h1>

              <div className='firstname'>
                <label>Firstname</label>
                <input
                  type='text'
                  placeholder='Name'
                  className='input-signup'
                />
              </div>

              <div className='lastname'>
                <label>Lastname</label>
                <input
                  type='text'
                  placeholder='Name'
                  className='input-signup'
                />
              </div>

              <div className='email'>
                <label>Email</label>
                <input
                  type='text'
                  placeholder='Email'
                  className='input-signup'
                />
              </div>

              <div className='password'>
                <label>Password</label>
                <input
                  type='password'
                  placeholder='password'
                  className='input-signup'
                />
              </div>

              <div className='repeat-password'>
                <label>Repeat-Password</label>
                <input
                  type='password'
                  placeholder='repeat password'
                  className='input-signup'
                />
              </div>

              <input
                type='checkbox'
                name='ss'
                id='1'
                className='input-checkbox'
              />
              <h5 className='terms-of-users'>
                i aggree to the <span>Terms of users</span>
              </h5>

              <div className='button-div'>
                <button className='signup-button'>REGISTER</button>

                <h2 className='login'>
                  LOGIN <WiDirectionRight className='allow-icon' />
                </h2>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
