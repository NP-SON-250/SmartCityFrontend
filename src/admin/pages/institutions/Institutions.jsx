import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Radio,
  Space,
  Tag,
  Popconfirm,
} from "antd";
import { RiEditBoxLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { Provinces, Districts } from "rwanda";
import { MdDelete } from "react-icons/md";
import { MdBrowserUpdated } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const data = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }
const success = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

// ================== delete user =====================
const apiKey = localStorage.getItem("token");

import "../institutions/institutions.css";

function Institutions() {
  const [componentSize, setComponentSize] = useState("default");
  const [institution, setInstitution] = useState([]);
  const [error, setError] = useState(null);
  const [institutionName, setInstitutionName] = useState("");
  const [institutionLocation, setInstitutionLocation] = useState("");
  const [singleInstitution, setSingleInstitution] = useState([]);
  const institutionNameEdit = singleInstitution.name;
  const institutionLocationEdit = singleInstitution.location;
  const institutionTypeEdit = singleInstitution.type;
  const [value, setValueEdit] = useState(1);
  useEffect(() => {
    fetchData();
    // fetchUserData();
  }, []); // Empty dependency array to run only once on component mount
  // console.log("singleInstitution id is: ", singleInstitution.id);

  // console.log(institutionName);

  console.log("institution: ", institution);

  const institutionUrl =
    "https://smart-city-api-tpxn.onrender.com/SmartCity/API/Institutions/read";

  const fetchData = async () => {
    // setIsLoading(true);
    try {
      const response = await fetch(institutionUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include your authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Could not fetch the resources, check the endpoints");
      }

      const responseData = await response.json();
      setInstitution(responseData.data);
      // setIspending(false);
      // setIsLoading(false);
      setError(null);
    } catch (err) {
      // setIspending(false);
      setError(err.message);
    }
  };
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/Institutions/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response); // Log the response for debugging

      // Check if the response status indicates success
      if (response.status === 200) {
        success("Institution deleted successfully!");
        fetchData(); // Try to execute fetchData() here
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  // console.log(Provinces());
  // console.log(Districts());
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const renderDistrictOptions = (province) => {
    const districts = Districts(province);
    return districts.map((district) => (
      <Select.Option key={district} value={district}>
        {district}
      </Select.Option>
    ));
  };
  const onChange = (value) => {
    // console.log(`selected ${value}`);
    // setInstitutionLocation(value);
    console.log(`selected ${value}`);
    setSingleInstitution({ ...singleInstitution, location: value });
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const districts = Districts();
  const transformedDistricts = districts.map((district) => ({
    value: district,
    label: district,
  }));

  // console.log(transformedDistricts);
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onChangeRadio = (e) => {
    // setValueEdit(e.target.value);
    setSingleInstitution({ ...singleInstitution, type: e.target.value });
    console.log("radio checked", e.target.value);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Location",
      dataIndex: "Location",
      key: "Location",
      responsive: ["md", "lg", "xl"], // Show on medium, large, and extra-large devices
      hidden: true, // Hide on mobile devices
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
      responsive: ["md", "lg", "xl"], // Show on medium, large, and extra-large devices
      // responsive: ["xs"],
      hidden: true, // Hide on mobile devices
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
    },
  ];
  const fetchSingleData = async (id) => {
    try {
      const response = await fetch(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/Institutions/read/${id}`,
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
      setSingleInstitution(responseData.data);
      // setIspending(false);
      setError(null);
    } catch (err) {
      // setIspending(false);
      setError(err.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append your form fields to the FormData object
    formData.append("name", institutionName);
    formData.append("location", institutionLocation);

    // setIspending(true);

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
        "https://smart-city-api-tpxn.onrender.com/SmartCity/API/Institutions/add",
        {
          method: "POST",
          headers: headers,
          body: formData, // Use FormData to send the data
        }
      )
        .then((response) => {
          if (response.ok) {
            setInstitutionName("");
            setInstitutionLocation("");
            toast.success("Dimension added");
            fetchData();
            setOpen(false);
            return response.json();
          } else {
            // Handle error
            // setIspending(false);
            toast.error("can't add dimension");
            console.error("Request failed with status:", response.status);
            // toast.error("Request failed with status:", response.status);
            // You can also handle specific error codes here
          }
        })
        .catch((error) => {
          // Handle fetch errors
          // setIspending(false);
          toast.error("Fetch error:", error);
        });
    } else {
      console.error("Token not found in localStorage. Please log in.");
      // toast.error("Token not found in localStorage. Please log in.");
    }
  };
  const handleSubmitEdit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append your form fields to the FormData object
    formData.append("name", institutionNameEdit);
    formData.append("location", institutionLocationEdit);
    formData.append("type", institutionTypeEdit);
    // setIspending(true);

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
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/Institutions/update/${singleInstitution.id}`,
        {
          method: "PUT",
          headers: headers,
          body: formData, // Use FormData to send the data
        }
      )
        .then((response) => {
          if (response.ok) {
            // Clear form values after successful submission
            setOpenEdit(false);
            // setIspending(false);
            toast.success("Institution Updated");
            fetchData();
            setInstitutionName("");
            institutionNameEdit("");
            setInstitutionLocation("");
            return response.json();
          } else {
            // Handle error
            // setIspending(false);
            toast.error("dimension can't be updated");
            console.error("Request failed with status:", response.status);
            // toast.error("Request failed with status:", response.status);
            // You can also handle specific error codes here
          }
        })
        .catch((error) => {
          // Handle fetch errors
          // setIspending(false);
          console.log("Fetch error:", error);
          // toast.error("Fetch error:", error);
        });
    } else {
      console.error("Token not found in localStorage. Please log in.");
      // toast.error("Token not found in localStorage. Please log in.");
    }
  };
  return (
    <div className="institutions__container">
      <div className="institution__content">
        <div className="institution__header">
          <h2>Institution Table</h2>
          <div className="input__and__addnew">
            <div className="search__institution">
              <CiSearch className="search__institution__icon" />
              <input type="text" />
            </div>
            <div className="addnew__institution" onClick={() => setOpen(true)}>
              Add New
            </div>
          </div>
        </div>
        <div
          style={{
            marginBottom: 16,
          }}
        >
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <span
            style={{
              marginLeft: 8,
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <Table
          className="inst_table"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={institution.map((item) => {
            return {
              key: item.id,
              name: item.name,
              Location: item.location,
              type: item.type,
              action: (
                <Space>
                  <div
                    onClick={(e) => {
                      // getSingleUser(item.id);
                      setOpenEdit(true);
                      fetchSingleData(item.id);
                      console.log(item.id);
                    }}
                  >
                    <RiEditBoxLine size={24} className="edit-buttom" />
                  </div>
                  <Popconfirm
                    title="Delet User"
                    description="Are you sure to delete this User?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={(e) => handleDelete(item.id)}
                  >
                    <MdDelete size={24} className="delete-buttom" />
                  </Popconfirm>
                </Space>
              ),
            };
          })}
        />
        {/* <Table
          className="inst_table"
          columns={columns.filter((column) => !column.hidden)}
          dataSource={data}
        /> */}
      </div>
      <Modal
        title="Adding Institution"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={630}
      >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{
            maxWidth: 600,
          }}
          className="form__model"
          // onSubmit={handleSubmit}
        >
          <Input
            placeholder="Institution Name"
            onChange={(e) => setInstitutionName(e.target.value)}
          />
          <Select
            virtual={false}
            showSearch
            placeholder="Select or search for location"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={transformedDistricts}
          />

          {/* <Radio.Group onChange={onChangeRadio} value={value}>
            <Radio value={1}>Public</Radio>
            <Radio value={2}>Private</Radio>
          </Radio.Group> */}
          <Button type="submit" onClick={handleSubmit}>
            Add new
          </Button>
        </Form>
      </Modal>
      <Modal
        title="Editing institutions"
        centered
        open={openEdit}
        onOk={() => setOpenEdit(false)}
        onCancel={() => setOpenEdit(false)}
      >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{
            maxWidth: 600,
          }}
          className="form__model"
          // onSubmit={handleSubmitEdit}
        >
          <Input
            value={singleInstitution.name}
            placeholder="Enter institution name"
            // onChange={(e) => setInstitutionName(e.target.value)}
            onChange={(e) =>
              setSingleInstitution({
                ...singleInstitution,
                name: e.target.value,
              })
            }
          />

          {/* <Select placeholder="Institution Location">
            {Provinces().map((province) => (
              <Select.OptGroup key={province} label={province}>
                {renderDistrictOptions(province)}
              </Select.OptGroup>
            ))}
          </Select> */}
          <Select
            virtual={false}
            showSearch
            value={singleInstitution.location}
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={transformedDistricts}
          />
          <Radio.Group onChange={onChangeRadio} value={singleInstitution.type}>
            <Radio value={"public"}>Public</Radio>
            <Radio value={"private"}>Private</Radio>
          </Radio.Group>
          <Button type="submit" onClick={handleSubmitEdit}>
            Edit
          </Button>
        </Form>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Institutions;
