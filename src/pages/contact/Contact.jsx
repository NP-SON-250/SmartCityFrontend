import React from 'react';
import '../contact/contact.css';
import { FaLocationDot } from 'react-icons/fa6';
import { FaPhone } from 'react-icons/fa6';
import { FaEnvelope } from 'react-icons/fa6';
import Banner from '../../components/banner/Banner';

function Contact() {
  return (
    <>
      <Banner title='Contact Us ' />
      <div className='section__padding contact_container'>
        <div className='contact_content'>
          <div className='contact_heading'>
            <h2>Get In Touch Using Contact Form?</h2>
            <div className='line'></div>
          </div>
          <div className='contact_desc'>
            <p>
              I'm thrilled that you want to connect! Whether you have a burning
              question, want to collaborate, or just fancy a chat, feel free to
              reach out. I'm always open to new opportunities and conversations.
              Can't wait to hear from you!
            </p>
          </div>
        </div>
        <div className='contactForm_container'>
          <div className='contactForm_right'>
            <div className='groupeInput_row1'>
              <div>
                <input type='text' placeholder='Name' />
              </div>
              <div>
                <input type='email' placeholder='Email' />
              </div>
            </div>
            <div>
              <input type='text' placeholder='Subject' />
            </div>
            <div>
              <textarea
                name=''
                id=''
                cols='30'
                rows='10'
                placeholder='Message...'
              ></textarea>
            </div>
            <div>
              <button className='btn'>Send Message</button>
            </div>
          </div>
          <div className='contactForm_left'>
            <div className='contact_info'>
              <div className='contact_info__heading'>
                <h4>Contact Info</h4>
                <div className='line'></div>
              </div>
              <div className='contact_address'>
                <div className='contact_address__item'>
                  <div className='contact_location__icon'>
                    <FaLocationDot color='#edc121' size={18} />
                  </div>
                  <div className='contact_location__content'>
                    <div>
                      <p style={{ fontWeight: '600' }}>Address</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: '#7c7c7c' }} s>
                        34 Street Kacyiru , Kigali, Rwanda
                      </p>
                    </div>
                  </div>
                </div>
                <div className='contact_address__item'>
                  <div className='contact_location__icon'>
                    <FaPhone color='#edc121' size={18} />
                  </div>
                  <div className='contact_location__content'>
                    <div>
                      <p style={{ fontWeight: '600' }}>Phone</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: '#7c7c7c' }}>
                        +250 345 722 562
                      </p>
                    </div>
                  </div>
                </div>
                <div className='contact_address__item'>
                  <div className='contact_location__icon'>
                    <FaEnvelope color='#edc121' size={18} />
                  </div>
                  <div className='contact_location__content'>
                    <div>
                      <p style={{ fontWeight: '600' }}>Email</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: '#7c7c7c' }} s>
                        info@gmaildomain.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
