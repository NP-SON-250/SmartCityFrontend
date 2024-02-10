// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css"; // Import general Swiper styles
import "swiper/css/navigation"; // Import navigation styles
import "swiper/css/pagination"; // Import pagination styles
import "swiper/css/scrollbar"; // Import scrollbar styles if needed
import Testimonialscard from "./Testimonialscard";
import ProfileImage6 from "../testimonials/profile6.jpg";
import ProfileImage2 from "../testimonials/profile2.jpg";
import ProfileImage3 from "../testimonials/profile3.jpg";
import ProfileImage4 from "../testimonials/profile4.jpg";
import ProfileImage5 from "../testimonials/profile5.jpg";

function Testimonials() {
  return (
    <div className="section__margin">
      <Swiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
        }}
      >
        <SwiperSlide>
          <Testimonialscard />.
        </SwiperSlide>

        <SwiperSlide>
          <div className="card-holder">
            <div className="text-container">
              <p>
                "LandVault has been a game-changer for our community. With their
                platform, we've been able to securely manage our land records,
                resolve disputes, and unlock economic opportunities. It's more
                than just technology; it's empowerment."
              </p>
            </div>
            <div className="profile-container">
              <div>
                <img
                  src={ProfileImage6}
                  alt="image"
                  className="profile-image"
                />
              </div>

              <div className="profile-details">
                <h1 className="profile-name">Aliane</h1>
                <h2 className="profile-career"> SoftwareDeveloper</h2>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="card-holder">
            <div className="text-container">
              <p>
                "LandVault has been a game-changer for our community. With their
                platform, we've been able to securely manage our land records,
                resolve disputes, and unlock economic opportunities. It's more
                than just technology; it's empowerment."
              </p>
            </div>
            <div className="profile-container">
              <div>
                <img
                  src={ProfileImage5}
                  alt="image"
                  className="profile-image"
                />
              </div>

              <div className="profile-details">
                <h1 className="profile-name">Omar</h1>
                <h2 className="profile-career"> SoftwareDeveloper</h2>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="card-holder">
            <div className="text-container">
              <p>
                "LandVault has been a game-changer for our community. With their
                platform, we've been able to securely manage our land records,
                resolve disputes, and unlock economic opportunities. It's more
                than just technology; it's empowerment."
              </p>
            </div>
            <div className="profile-container">
              <div>
                <img
                  src={ProfileImage4}
                  alt="image"
                  className="profile-image"
                />
              </div>

              <div className="profile-details">
                <h1 className="profile-name">Leon</h1>
                <h2 className="profile-career"> SoftwareDeveloper</h2>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="card-holder">
            <div className="text-container">
              <p>
                "LandVault has been a game-changer for our community. With their
                platform, we've been able to securely manage our land records,
                resolve disputes, and unlock economic opportunities. It's more
                than just technology; it's empowerment."
              </p>
            </div>
            <div className="profile-container">
              <div>
                <img
                  src={ProfileImage3}
                  alt="image"
                  className="profile-image"
                />
              </div>

              <div className="profile-details">
                <h1 className="profile-name">Bertin</h1>
                <h2 className="profile-career"> SoftwareDeveloper</h2>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="card-holder">
            <div className="text-container">
              <p>
                "LandVault has been a game-changer for our community. With their
                platform, we've been able to securely manage our land records,
                resolve disputes, and unlock economic opportunities. It's more
                than just technology; it's empowerment."
              </p>
            </div>
            <div className="profile-container">
              <div>
                <img
                  src={ProfileImage2}
                  alt="image"
                  className="profile-image"
                />
              </div>

              <div className="profile-details">
                <h1 className="profile-name">Alex</h1>
                <h2 className="profile-career"> SoftwareDeveloper</h2>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
    </div>
  );
}

export default Testimonials;
