import React, { useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { CiSearch } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import { Bars, InfinitySpin } from "react-loader-spinner";
// import toast from "react-hot-toast";

import { Modal, Popconfirm } from "antd";

const { Meta } = Card;
import "../dimessions/dimessions.css";
import { useState } from "react";
function Dimessions() {
  const [open, setOpen] = useState(false);
  const [openEdit, setEditOpen] = useState(false);
  const [dimension, setDimension] = useState([]);
  const [singleDimension, setSingleDimension] = useState([]);
  const [isPending, setIspending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // form states
  const [dimensionImage, setDimensionImage] = useState(null);
  const [dimensionName, setDimensionName] = useState("");
  const [dimensionRate, setDimensionRate] = useState("");

  const dimensionUrl =
    "https://smart-city-api-tpxn.onrender.com/SmartCity/API/dimensions/read";

  useEffect(() => {
    fetchData();
    // fetchUserData();
  }, []); // Empty dependency array to run only once on component mount
  // Define fetchData function outside of useEffect
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(dimensionUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include your authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Could not fetch the resources, check the endpoints");
      }

      const responseData = await response.json();
      setDimension(responseData.data);
      setIspending(false);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIspending(false);
      setError(err.message);
    }
  };
  const fetchSingleData = async (id) => {
    try {
      const response = await fetch(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/dimensions/readSingle/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include your authorization header
          },
        }
      );

      if (!response.ok) {
        throw new Error("Could not fetch the resources, check the endpoints");
      }

      const responseData = await response.json();
      setSingleDimension(responseData.data);
      setIspending(false);
      setError(null);
    } catch (err) {
      setIspending(false);
      setError(err.message);
    }
  };
  const handleSubmitEdit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append your form fields to the FormData object
    formData.append("dimensionImage", dimensionImage); // Append the image
    formData.append("dimensionName", dimensionName);
    formData.append("dimensionRate", dimensionRate);
    setIspending(true);

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    console.log("token", token);

    // Check if the token is available
    if (token) {
      // No need to set Content-Type explicitly; FormData sets it automatically
      // Create headers with the token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Make the fetch request with the headers and FormData
      fetch(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/dimensions/update/${singleDimension.id}`,
        {
          method: "PUT",
          headers: headers,
          body: formData, // Use FormData to send the data
        }
      )
        .then((response) => {
          if (response.ok) {
            // Clear form values after successful submission
            setEditOpen(false);
            setIspending(false);
            toast.success("Dimension Updated");
            fetchData();
            setDimensionImage(null);
            setDimensionName("");
            setDimensionRate("");
            return response.json();
          } else {
            // Handle error
            setIspending(false);
            toast.error("dimension can't be updated");
            console.error("Request failed with status:", response.status);
            // toast.error("Request failed with status:", response.status);
            // You can also handle specific error codes here
          }
        })
        .catch((error) => {
          // Handle fetch errors
          setIspending(false);
          // toast.error("Fetch error:", error);
        });
    } else {
      console.error("Token not found in localStorage. Please log in.");
      // toast.error("Token not found in localStorage. Please log in.");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append your form fields to the FormData object
    formData.append("dimensionImage", dimensionImage); // Append the image
    formData.append("dimensionName", dimensionName);
    formData.append("dimensionRate", dimensionRate);

    setIspending(true);

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    console.log("token", token);

    // Check if the token is available
    if (token) {
      // No need to set Content-Type explicitly; FormData sets it automatically
      // Create headers with the token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Make the fetch request with the headers and FormData
      fetch(
        "https://smart-city-api-tpxn.onrender.com/SmartCity/API/dimensions/add",
        {
          method: "POST",
          headers: headers,
          body: formData, // Use FormData to send the data
        }
      )
        .then((response) => {
          if (response.ok) {
            setDimensionRate("");
            setDimensionName("");
            setDimensionImage(null);
            setIspending(false);
            toast.success("Dimension added");
            fetchData();
            setOpen(false);
            return response.json();
          } else {
            // Handle error
            setIspending(false);
            toast.error("can't add dimension");
            console.error("Request failed with status:", response.status);
            // toast.error("Request failed with status:", response.status);
            // You can also handle specific error codes here
          }
        })
        .catch((error) => {
          // Handle fetch errors
          setIspending(false);
          // toast.error("Fetch error:", error);
        });
    } else {
      console.error("Token not found in localStorage. Please log in.");
      // toast.error("Token not found in localStorage. Please log in.");
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/dimensions/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include your authorization header
          },
        }
      );

      if (response.ok) {
        // Handle a successful deletion
        toast.success("Dimension deleted successfully");
        fetchData();
      } else {
        // Handle the case where the deletion request was not successful
        toast.error("Failed to delete the dimension");
      }
    } catch (error) {
      // Handle any fetch errors
      console.error("Fetch error:", error);
      toast.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <div className="dimensions__container">
        <div className="dimensions__content">
          <div className="add__search">
            <div className="addnew" onClick={() => setOpen(true)}>
              Add new
            </div>
            <div className="search__institution">
              <CiSearch className="search__institution__icon" />
              <input type="text" required />
            </div>
          </div>
          <div className="dimensions__cards">
            {isLoading && (
              <InfinitySpin
                visible={true}
                width="200"
                color="#ffcd06"
                ariaLabel="infinity-spin-loading"
              />
            )}
            {!isLoading && (
              <>
                {dimension.map((data) => (
                  <ReusableCard
                    key={data.id}
                    width={300}
                    coverImage={data.dimensionImage}
                    avatarImage={data.avatarImage}
                    title={data.dimensionName}
                    // rate={data.dimensionRate}
                    onClickDelete={() => {
                      handleDelete(data.id);
                    }}
                    onClick={() => {
                      setEditOpen(true);
                      fetchSingleData(data.id);
                    }}
                  />
                ))}
              </>
            )}
          </div>
          <Modal
            title="Adding the dimension"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            // width={1000}
          >
            <div className="add__dimension">
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Add Dimension Image</label>
                  <input
                    required
                    type="file"
                    id="image"
                    name="image"
                    onChange={(e) => setDimensionImage(e.target.files[0])}
                  />
                </div>
                <div>
                  <label>Add Dimension Name</label>
                  <input
                    required
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    onChange={(e) => setDimensionName(e.target.value)}
                  />
                </div>
                {/* <div>
                  <label>Add Dimension Rate</label>
                  <input
                    required
                    type="text"
                    id="rate"
                    name="rate"
                    placeholder="Enter rate"
                    onChange={(e) => setDimensionRate(e.target.value)}
                  />
                </div> */}
                <div>
                  {!isPending && (
                    <button className="addnew" type="submit">
                      Submit
                    </button>
                  )}
                  {isPending && (
                    <button className="addnew">
                      Submit
                      <Bars
                        height="20"
                        width="30"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </Modal>
          <Modal
            title="Editing the dimension"
            centered
            open={openEdit}
            onOk={() => setEditOpen(false)}
            onCancel={() => setEditOpen(false)}
            // width={1000}
          >
            <div className="add__dimension">
              <form onSubmit={handleSubmitEdit}>
                <div>
                  <label>Add Dimension Image</label>
                  <input
                    required
                    type="file"
                    id="image"
                    name="image"
                    placeholder={singleDimension.dimensionImage}
                    onChange={(e) => setDimensionImage(e.target.files[0])}
                  />
                </div>
                <div>
                  <label>Add Dimension Name</label>
                  <input
                    required
                    type="text"
                    id="title"
                    name="title"
                    // placeholder="Enter title"
                    placeholder={singleDimension.dimensionName}
                    onChange={(e) => setDimensionName(e.target.value)}
                  />
                </div>
                {/* <div>
                  <label>Add Dimension Rate</label>
                  <input
                    required
                    type="text"
                    id="rate"
                    name="rate"
                    // placeholder="Enter rate"
                    placeholder={singleDimension.dimensionRate}
                    onChange={(e) => setDimensionRate(e.target.value)}
                  />
                </div> */}
                <div>
                  {!isPending && (
                    <button className="addnew" type="submit">
                      Submit
                    </button>
                  )}
                  {isPending && (
                    <button className="addnew">
                      Submit
                      <Bars
                        height="20"
                        width="30"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
const ReusableCard = ({
  width,
  coverImage,
  avatarImage,
  title,
  // description,
  onClick,
  onClickDelete,
  // rate,
}) => (
  <Card
    style={{
      width: width || 300,
    }}
    cover={
      <img
        alt="example"
        src={
          coverImage || "https://pbs.twimg.com/media/EQb5cfQWAAEqXpL.jpg:large"
        }
      />
    }
    actions={[
      <Popconfirm
        title="Deleting institution"
        description="Are you sure to delete this Institution?"
        okText="Yes"
        cancelText="No"
        onConfirm={onClickDelete} // This will call onClickDelete if the user clicks "Yes"
      >
        <DeleteOutlined key="delete" />
      </Popconfirm>,
      <EditOutlined key="edit" onClick={onClick} />,
    ]}
  >
    <Meta
      avatar={
        <Avatar
          src={
            avatarImage ||
            "https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
          }
        />
      }
      title={title || "Card title"}
      // description={description || "This is the description"}
    />
    {/* {rate || "60%"} */}
  </Card>
);

export default Dimessions;
