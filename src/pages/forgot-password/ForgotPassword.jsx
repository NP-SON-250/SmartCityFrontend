import React from 'react';
import '../../pages/forgot-password/forgotpassword.css';
import Banner from '../../components/banner/Banner';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
function ForgotPassword() {
  return (
    <>
      <Banner title='Reset password' />
      <div className='login_container section__padding'>
        <div class='login-wrap'>
          <div class='icon'>
            <RiLockPasswordLine />
          </div>
          <h3>Forgot Password ?</h3>
          <p>We will send reset instructions to your email</p>
          <form action='#' class='login-form'>
            <div class='form-group'>
              <input
                type='email'
                class='form-control rounded-left'
                placeholder='Your Email'
                required=''
              />
            </div>

            <div class='form-group'>
              <button type='submit' class='btn submit'>
                Reset Password
              </button>
            </div>
          </form>
        </div>
        <div
          style={{
            marginTop: '24px',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          <Link to='/signin'>
            <p>Back to login ?</p>
          </Link>
        </div>
      </div>
      ;
    </>
  );
}

export default ForgotPassword;
