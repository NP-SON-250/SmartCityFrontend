import React, { useState, useRef, useEffect } from "react";
import "../survey/survey.css";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import { SearchOutlined } from "@ant-design/icons";
import { RiEditBoxLine } from "react-icons/ri";
import Highlighter from "react-highlight-words";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  Button,
  Modal,
  Form,
  Divider,
  Space,
  Input,
  Popconfirm,
  DatePicker,
} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
const { TextArea } = Input;
const { RangePicker } = DatePicker;
// ================validating form function =================
const SubmitButton = ({ form }) => {
  const [submittable, setSubmittable] = React.useState(false);
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values]);
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Save
    </Button>
  );
};

function Survey() {
  //============= open Add new survey Modal ==============
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // ============== form destucturing =============

  const [form] = Form.useForm();

  // =========== customise table filter ===========
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
  const columns = [
    {
      title: "Survey Title",
      dataIndex: "name",
      key: "name",

      ...getColumnSearchProps("name"),
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "created at",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "End date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  // =============== success notification  ==============
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
  // =============== Adding new survey =============
  const [survey, setSurvey] = useState({
    surveyImage: "",
    title: "",
    description: "",
    endDate: "",
  });

  const apiKey = localStorage.getItem("token");

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("surveyImage", survey.surveyImage);
    formData.append("title", survey.title);
    formData.append("description", survey.description);
    formData.append("endDate", survey.endDate);

    axios
      .post(
        "https://smart-city-api-tpxn.onrender.com/SmartCity/API/surveys/create",
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
        success("Survey created successfully");
        setTimeout(() => {
          setIsModalOpen(false);
          getSurveyPending();
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // ============= Fetching all pending surveys ====================
  const [surveypending, setSurveyPending] = useState([]);

  const getSurveyPending = async () => {
    const response = await axios.get(
      "https://smart-city-api-tpxn.onrender.com/SmartCity/API/surveys/readSurvey/manager",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = response.data.data;
    setSurveyPending(data);
  };
  useEffect(() => {
    getSurveyPending();
  }, []);
  // ================== Delete survey =====================
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/questions/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      success("Survey deleted successfully!");
      getSurveyPending();
    } catch (err) {
      console.error(err);
    }
  }
  // ==================== Edit survey ===============
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [surveyEdit, setSurveyEdit] = useState([]);

  const showModalEdit = () => {
    setIsModalOpenEdit(true);
  };
  const handleOkEdit = () => {
    setIsModalOpenEdit(false);
  };
  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

  return (
    <div className="survey-container">
      <div className="suvery-banner">
        <div>
          <p>Ready to get started , Click 'New Survey' to begin</p>
        </div>
        <div>
          <button className="btn" onClick={showModal}>
            New Survey
          </button>
        </div>
      </div>
      {/* ====== Add new survey Modal ===== */}
      <Modal
        style={{
          top: 20,
        }}
        title="Add New Survey"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="surveyImage"
            label="Feature Image"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <input
              type="file"
              id="surveyImage"
              name="surveyImage"
              accept="image/*"
              onChange={(event) => {
                setSurvey({
                  ...survey,
                  surveyImage: event.target.files[0],
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="title"
            label="Survey Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              name="title"
              placeholder="Survey Title"
              autoSize={{
                minRows: 1,
                maxRows: 4,
              }}
              onChange={(event) => {
                setSurvey({
                  ...survey,
                  [event.target.name]: event.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              placeholder="decription..."
              name="description"
              rows={2}
              onChange={(event) => {
                setSurvey({
                  ...survey,
                  [event.target.name]: event.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <input
              style={{
                padding: "5px",
                width: "200px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              type="date"
              name="endDate"
              onChange={(event) => {
                setSurvey({
                  ...survey,
                  [event.target.name]: event.target.value,
                });
              }}
            />
          </Form.Item>

          <Divider />
          <Form.Item>
            <Space>
              <SubmitButton form={form} />
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      {/* ====== Edit survey Modal ===== */}
      <Modal
        style={{
          top: 20,
        }}
        title="Edit Survey"
        open={isModalOpenEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
      >
        <Form
          form={form}
          // onFinish={handleSubmit}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="surveyImage"
            label="Feature Image"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <input
              type="file"
              id="surveyImage"
              name="surveyImage"
              accept="image/*"
              onChange={(event) => {
                setSurvey({
                  ...survey,
                  surveyImage: event.target.files[0],
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="title"
            label="Survey Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              name="title"
              placeholder="Survey Title"
              autoSize={{
                minRows: 1,
                maxRows: 4,
              }}
              onChange={(event) => {
                setSurvey({
                  ...survey,
                  [event.target.name]: event.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              placeholder="decription..."
              name="description"
              rows={2}
              onChange={(event) => {
                setSurvey({
                  ...survey,
                  [event.target.name]: event.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <input
              style={{
                padding: "5px",
                width: "200px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              type="date"
              name="endDate"
              onChange={(event) => {
                setSurvey({
                  ...survey,
                  [event.target.name]: event.target.value,
                });
              }}
            />
          </Form.Item>

          <Divider />
          <Form.Item>
            <Space>
              <SubmitButton form={form} />
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      <div className="survey-result-container">
        <div className="pending_survey-container">
          <div className="container-header">
            <div>
              <h3>Pending Survey</h3>
            </div>
            <div>
              {" "}
              <MdOutlinePendingActions
                size={24}
                style={{
                  color: "orange",
                  marginTop: "8px",
                }}
              />
            </div>
          </div>
          <Table
            size="small"
            columns={columns}
            dataSource={surveypending.map((item, index) => {
              return {
                key: item.id,
                name: item.title,
                createdAt: item.createdAt,
                endDate: item.endDate,
                status: item.status,
                action: (
                  <Space>
                    <div
                      onClick={(e) => {
                        getSingleSurvey(item.id);
                        showModalEdit();
                      }}
                    >
                      <RiEditBoxLine size={24} className="edit-buttom" />
                    </div>
                    <Popconfirm
                      title="Delete Survey"
                      description="Are you sure to delete this Survey ?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={(e) => handleDelete(item.id)}
                    >
                      <MdDelete size={24} className="delete-buttom" />
                    </Popconfirm>
                    
                    <Link to={"/surveydimension/" + item.id}>
                      <MdLibraryAdd
                        size={20}
                        style={{
                          color: "green",
                          cursor: "pointer",
                        }}
                      />
                    </Link>
                  </Space>
                ),
              };
            })}
          />
        </div>
        <div className="pending_survey-container">
          <div className="container-header">
            <div>
              <h3>Live Survey</h3>
            </div>
            <div>
              {" "}
              <HiOutlineStatusOnline
                size={24}
                style={{
                  color: "green",
                  marginTop: "8px",
                }}
              />
            </div>
          </div>

          <Table size="small" columns={columns} dataSource={data} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Survey;

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];
