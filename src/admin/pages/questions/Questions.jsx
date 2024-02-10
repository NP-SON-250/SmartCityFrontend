import React, { useEffect, useState } from "react";
import "../questions/questions.css";
import {
  Table,
  Button,
  Modal,
  Form,
  Divider,
  Space,
  Input,
  Select,
  Popconfirm,
} from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import { CgOptions } from "react-icons/cg";
const { TextArea } = Input;

// =========================== submit ===============
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

// ================== end ===========================

function Questions() {
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

  // ===========================
  const onChange = (value) => {
    setQuestion({ ...question, id: value });

    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // ============================
  const [form] = Form.useForm();

  //====================  getting dimssions =================
  const [dimessions, setDimessions] = useState([]);
  const getDimessions = async () => {
    const response = await axios.get(
      "https://smart-city-api-tpxn.onrender.com/SmartCity/API/dimensions/read"
    );
    const data = response.data.data;
    setDimessions(data);
  };

  useEffect(() => {
    getDimessions();
  }, []);

  //=============== adding question =================
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
  const [question, setQuestion] = useState({
    id: "",
    questionPhrase: "",
  });

  const apiKey = localStorage.getItem("token");

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("id", question.id);
    formData.append("questionPhrase", question.questionPhrase);

    axios
      .post(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/questions/add/${question.id}`,
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
        success("Question created successfully");
        setTimeout(() => {
          setIsModalOpen(false);
          fetchQuestion();
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // =============== fetching questions ==============
  const [getQuestions, setGetQuestions] = useState([]);

  const fetchQuestion = async () => {
    const response = await axios.get(
      "https://smart-city-api-tpxn.onrender.com/SmartCity/API/questions/read"
    );
    const data = response.data.data;
    setGetQuestions(data);
    // console.log(data);
  };

  useEffect(() => {
    fetchQuestion();
  }, []);
  // ================== delete question =====================
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
      success("Question deleted successfully!");
      fetchQuestion();
    } catch (err) {
      console.error(err);
    }
  }
  // ==================== Edit Question ===============
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [questionEdit, setQuestionEdit] = useState([]);

  const showModalEdit = () => {
    setIsModalOpenEdit(true);
  };
  const handleOkEdit = () => {
    setIsModalOpenEdit(false);
  };
  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

  function getSingleQuestions(id) {
    axios
      .get(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/questions/readSingle/${id}`
      )
      .then((res) => setQuestionEdit(res.data.data))
      .catch((err) => console.log(err));
  }

  function handleUpdate(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("questionPhrase", questionEdit.questionPhrase);
    const apiKey = localStorage.getItem("token");
    axios
      .put(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/users/update/${questionEdit.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        success("Question updated successfully");
        setTimeout(() => {
          setIsModalOpenEdit(false);
          fetchQuestion();
        }, 3000);
      });
  }
  return (
    <div className="quetions-container">
      <Button type="primary" onClick={showModal} className="addNew-btn">
        Add New
      </Button>

      <Modal
        className="quetions-modal"
        title="Add New Question"
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
            name="Question-Text"
            label="Question Text"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              name="questionPhrase"
              rows={3}
              onChange={(event) => {
                setQuestion({
                  ...question,
                  [event.target.name]: event.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="Dimession"
            label="Choose Dimession"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              name="id"
              virtual={false}
              placeholder="Select a Dimession"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={dimessions.map((dimession, index) => {
                return {
                  key: index,
                  value: dimession.id,
                  label: dimession.dimensionName,
                };
              })}
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
      {/* ================= Questions Table ================= */}
      <div>
        <Divider>Questions table</Divider>
        <Table
          columns={columns}
          dataSource={getQuestions.map((item, index) => {
            return {
              key: index,
              No: `Q. ${index + 1}`,
              Question_Text: item.questionPhrase,
              // Dimession: item.dimension.dimensionName,
              Action: (
                <Space size="middle">
                  <div
                    onClick={(e) => {
                      getSingleQuestions(item.id);
                      showModalEdit();
                    }}
                  >
                    <RiEditBoxLine className="inst_icon inst_update" />
                  </div>
                  <Popconfirm
                    title="Deleting Question"
                    description="Are you sure to delete this Question"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={(e) => handleDelete(item.id)}
                  >
                    <MdDelete className="inst_icon inst_delete" />
                  </Popconfirm>
                  <CgOptions className="inst_icon inst_update" />
                </Space>
              ),
            };
          })}
        />
        {/* Edit Form */}
        <Modal
          className="quetions-modal"
          title="Edit Question"
          open={isModalOpenEdit}
          onOk={handleOkEdit}
          onCancel={handleCancelEdit}
        >
          <form onSubmit={handleUpdate} layout="vertical" autoComplete="off">
            <textarea
              // allowClear
              name="questionPhrase"
              value={questionEdit.questionPhrase}
              rows={3}
              onChange={(event) => {
                setQuestionEdit({
                  ...questionEdit,
                  [event.target.name]: event.target.value,
                });
                console.log(event.target.value);
              }}
            />

            <Divider />

            <Space>
              <button className="btn" name="submit">
                Save
              </button>
            </Space>
          </form>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
}

// =============== Table Data ================
const columns = [
  {
    title: "No",
    dataIndex: "No",
  },
  {
    title: "Question Text",
    dataIndex: "Question_Text",
  },
  {
    title: "Dimession",
    dataIndex: "Dimession",
  },
  // {
  //   title: "Response",
  //   dataIndex: "response",
  // },
  {
    title: "Action",
    dataIndex: "Action",
  },
];

export default Questions;
