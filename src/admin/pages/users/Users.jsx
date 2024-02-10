import "../users/users.css";
import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, message } from "antd";
import { MdDelete } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import { Modal, Popconfirm, Select } from "antd";
import avatar from "../../../assets/avatar.png";
import { FaEye } from "react-icons/fa6";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Item from "antd/es/list/Item";
import Institutions from "../institutions/Institutions";

const Users = () => {
  const [open, setOpen] = useState(false);

  // ============ Seletcting Institutions ===============
  const onChange = (value) => {
    setUser({ ...user, institutionId: value });
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  
  // =============== fertching Institutions ============
  const [institutions, setInstitutions] = useState([]);
  
  const getInstitution = async () => {
    const response = await axios.get(
      "https://smart-city-api-tpxn.onrender.com/SmartCity/API/Institutions/read"
      );
      const data = response.data.data;
      setInstitutions(data);
    };
    useEffect(() => {
      getInstitution();
    }, []);
    
    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    
    // ============== searchText ============
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  // ===================== end ===============
  const columns = [
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
    },
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",

      width: "30%",
      ...getColumnSearchProps("firstName"),
    },

    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
      width: "30%",
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "20%",
      ...getColumnSearchProps("role"),
    },
    {
      title: "Institution",
      dataIndex: "institution",
      key: "institution",
      width: "20%",
      ...getColumnSearchProps("institution"),
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "20%",
    },
  ];

  // =================== adding new user ================
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

  const [user, setUser] = useState({
    profile: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    institutionId: "",
  });
  const apiKey = localStorage.getItem("token");

  const handleInput = (event) => {
    if (event.target.name === "profile") {
      setUser({ ...user, profile: event.target.files[0] });
    } else {
      setUser({ ...user, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profile", user.profile);
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("institutionId", user.institutionId);

    axios
      .post(
        "https://smart-city-api-tpxn.onrender.com/SmartCity/API/users/signUp",
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
        success("User created successfully");
        setTimeout(() => {
          setOpen(false);
          getData();
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // ============= fetching users =================
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get(
      "https://smart-city-api-tpxn.onrender.com/SmartCity/API/users/get/users"
    );
    const data = response.data.data;
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  // ================== delete user =====================
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/users/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Deleted");
      success("User deleted successfully!");
      getData();
    } catch (err) {
      console.error(err);
    }
  }
  // ============ Edit Modal =========
  const [dataEdit, setDataEdit] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getSingleUser(id) {
    axios
      .get(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/users/get/single/${id}`
      )
      .then((res) => setDataEdit(res.data.data))
      .catch((err) => console.log(err));
  }

  function handleUpdate(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profile", dataEdit.profile);
    formData.append("firstName", dataEdit.firstName);
    formData.append("lastName", dataEdit.lastName);
    formData.append("email", dataEdit.email);
    formData.append("role", dataEdit.role);
    // formData.append("password", dataEdit.password);
    formData.append("institutionId", dataEdit.institutionId);
    const apiKey = localStorage.getItem("token");
    axios
      .put(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/users/update/${dataEdit.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        success("User updated successfully");
        setTimeout(() => {
          setIsModalOpen(false);
          getData();
        }, 3000);
      });
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="users-container" style={{ padding: "0 20px" }}>
      <div className="find-more">
        <div>
          <h3>Manage Users</h3>
        </div>
        <div>
          <Button className="find-more" onClick={() => setOpen(true)}>
            Add New
          </Button>
        </div>
      </div>

      <Modal
        title="Add New User"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        // width={1000}
      >
        <div className="add__dimension">
          <form action="#" onSubmit={handleSubmit}>
            <div>
              <input
                type="file"
                id="image"
                name="profile"
                accept="image/*"
                onChange={handleInput}
              />
            </div>
            <div className="add__dimension-row">
              <div>
                <input
                  type="text"
                  id="title"
                  name="firstName"
                  placeholder="FirstName"
                  onChange={handleInput}
                />
              </div>

              <div>
                <input
                  type="text"
                  id="lastname"
                  name="lastName"
                  placeholder="LastName"
                  onChange={handleInput}
                />
              </div>
            </div>

            <div>
              <label>Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your Email"
                onChange={handleInput}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Enter your Password"
                onChange={handleInput}
              />
            </div>
            {/* <div>
              <label>Role</label>
              <select name="institution">
                <option value="Surveyor">Surveyor</option>
                <option value="manager">Admin</option>
              </select>
            </div> */}
            <div>
              <label>Choose Institution</label>
              {/* <select name="institutionId" onChange={handleInput}>
                <option value={null}></option>
                {institutions.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select> */}
              <Select
                allowClear
                style={{
                  width: "100%",
                }}
                showSearch
                name="institutionId"
                virtual={false}
                placeholder="Select a Institution"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={institutions.map((item, index) => {
                  return {
                    key: index,
                    value: item.id,
                    label: item.name,
                  };
                })}
              />
            </div>

            <button className="addnew" name="submit">
              Submit
            </button>
          </form>
        </div>
      </Modal>
      <Table
        columns={columns}
        size="small"
        dataSource={data.map((item, index) => {
          return {
            key: item.id,
            profile: (
              <div className="img-container">
                <img src={!item.profile ? avatar : item.profile} alt="" />
              </div>
            ),
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            role: item.role,
            institution: !item.Institution ? null : item.Institution.name,
            action: (
              <Space>
                <div
                  onClick={(e) => {
                    getSingleUser(item.id);
                    showModal();
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

                <FaEye
                  size={20}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </Space>
            ),
          };
        })}
      />
      {/* ================= Edit Modal ================== */}
      <Modal
        title="Edit User"
        style={{
          top: 40,
        }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="add__dimension">
          <form action="#" onSubmit={handleUpdate}>
            <div>
              <input
                type="file"
                id="image"
                name="profile"
                accept="image/*"
                onChange={(e) => {
                  setDataEdit({ ...dataEdit, profile: e.target.files[0] });
                }}
              />
            </div>
            <div className="add__dimension-row">
              <div>
                <input
                  type="text"
                  id="title"
                  value={dataEdit.firstName}
                  name="firstName"
                  placeholder="FirstName"
                  onChange={(e) => {
                    setDataEdit({ ...dataEdit, firstName: e.target.value });
                  }}
                />
              </div>

              <div>
                <input
                  type="text"
                  id="lastname"
                  value={dataEdit.lastName}
                  name="lastName"
                  placeholder="LastName"
                  onChange={(e) => {
                    setDataEdit({ ...dataEdit, lastName: e.target.value });
                  }}
                />
              </div>
            </div>

            <div>
              <label>Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={dataEdit.email}
                placeholder="Enter your Email"
                onChange={(e) => {
                  setDataEdit({ ...dataEdit, email: e.target.value });
                }}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="text"
                id="password"
                name="password"
                disabled="true"
                value={dataEdit.password}
                placeholder="Enter your Password"
              />
            </div>
            <div>
              <label>Role</label>
              <select
                name="role"
                value={dataEdit.role}
                onChange={(e) => {
                  setDataEdit({ ...dataEdit, role: e.target.value });
                }}
              >
                <option value="Surveyor">Surveyor</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <div>
              <label>Choose Institution</label>
              <select
                value={
                  dataEdit.institutionId === "null"
                    ? null
                    : dataEdit.institutionId
                }
                name="institutionId"
                onChange={(e) => {
                  setDataEdit({ ...dataEdit, institutionId: e.target.value });
                }}
              >
                {institutions.map((inst, index) => {
                  return (
                    <option key={index} value={inst.id}>
                      {inst.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <button className="addnew" name="submit">
              Submit
            </button>
          </form>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Users;
