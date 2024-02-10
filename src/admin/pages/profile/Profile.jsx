import React, { useEffect, useState } from "react";
import "../profile/profile.css";
import { AppContext } from "../../../context/AppProvider";

function Profile() {
  const { loggedUser } = React.useContext(AppContext);
  console.log(loggedUser);
  const [edit, setEdit] = useState(false);

  const ProfileId = localStorage.getItem("id");

  const [getprofile, setGetProfile] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/users/get/single/${ProfileId}`
      );

      const data = await response.json();
      console.log("user profile", data);
      setGetProfile(data.data);
      setFormData({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        email: data.data.email,
      });
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email } = formData;
    const id = getprofile.id;

    try {
      const response = await fetch(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/users/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, email }),
        }
      );

      if (response.ok) {
        console.log("Profile updated successfully");
        alert("Profile updated successfully");
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <section className="profile-section">
      {!edit && (
        <div className="user-info">
          <div className="image-holder">
            <img
              src={loggedUser?.profile}
              alt="user-profile"
              className="profile-user-image"
            />
            <h3>{loggedUser?.firstName + " " + loggedUser?.lastName}</h3>
            <p>{loggedUser?.role}</p>
          </div>

          {Object.keys(getprofile).length > 0 && (
            <div className="names">
              <div>
                <label>First Name</label>
                <br />
                <p>{getprofile.firstName}</p>
              </div>
              <div>
                <label>Last Name</label>
                <br />
                <p>{getprofile.lastName}</p>
              </div>
              <div>
                <label>Email</label>
                <br />
                <p>{getprofile.email}</p>
              </div>

              <br />

              <button
                className="addnew"
                type="submit"
                onClick={() => setEdit(!edit)}
              >
                Edit profile
              </button>
            </div>
          )}
        </div>
      )}

      <div className="wrapper-center">
        <div className={`${!edit ? "wrapper-content12" : "wrapper-content"}`}>
          <div className="wrapper">
            <h1> Edit User Profile </h1>
            <div className="contact-image">
              <img
                src={loggedUser?.profile}
                alt="user-profile"
                className="profile-user-image"
              />
            </div>
            <form action="#" onSubmit={handleFormSubmit}>
              <div className="named">
                <div className="field">
                  <label htmlFor="">FirstName</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your Firstname"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="field">
                  <label htmlFor="">LastName</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your Lastname"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field field2">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="button-area">
                <button
                  className="addnew"
                  type="reset"
                  onClick={() => setEdit(!edit)}
                >
                  Cancel
                </button>
                <button type="submit" onClick={() => setEdit(!edit)}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
