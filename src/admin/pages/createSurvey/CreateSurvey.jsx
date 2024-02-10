import React, { useState, useEffect } from "react";
import "../createSurvey/createSurvey.css";
import { Collapse, Button, Space, Steps, theme, Divider, Select } from "antd";
import axios from "axios";
import { HiOutlinePlus } from "react-icons/hi";
import { MinusCircleOutlined } from "@ant-design/icons";
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function CreateSurvey() {
  // ===========================
  // const onChange = (value) => {
  //   setQuestion({ ...question, id: value });

  //   console.log(`selected ${value}`);
  // };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // ============================
  const [dimessions, setDimessions] = useState([]);

  const getDimessions = async () => {
    const response = await axios.get(
      "https://smart-city-api-tpxn.onrender.com/SmartCity/API/dimensions/read"
    );
    const data = response.data.data;
    console.log(data);
    setDimessions(data);
  };

  useEffect(() => {
    getDimessions();
  }, []);

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "Survey Info",
      content: (
        <div className="survey-info">
          <div>
            <input type="text" placeholder="Survey Title" />
          </div>
          <div className="survey-info-flex">
            <dvi>
              Start Date:
              <input type="date" />
            </dvi>
            <dvi>
              End Date:
              <input type="date" />
            </dvi>
          </div>
          <div>
            <textarea
              type="text"
              className="textarea"
              placeholder="Description"
            />
          </div>
          <div>
            <input type="file" placeholder="Feature Image" />
          </div>
        </div>
      ),
    },
    {
      title: "Configure Survey",
      content: (
        <div className="survey-setup">
          <div className="survey-setup-dimension">
            <div className="survey-setup-dimension-choose">
              <div>Assign Dimensions:</div>
              <div>
                <Select
                  style={{ width: "80%" }}
                  showSearch
                  name="id"
                  virtual={false}
                  placeholder="Select a Dimession"
                  optionFilterProp="children"
                  // onChange={onChange}
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
                <Button
                  style={{
                    marginLeft: "6px",
                    padding: "5px",
                  }}
                  type="default"
                  shape="circle"
                  icon={<HiOutlinePlus />}
                  size="middle"
                />
              </div>
            </div>
            <div className="survey-setup-dimension-result">
              <Space direction="vertical">
                <Collapse
                  size="small"
                  collapsible="header"
                  defaultActiveKey={["1"]}
                  items={[
                    {
                      key: "1",
                      label: "Smart Economic",
                      children: <p>{text}</p>,
                    },
                  ]}
                />
                <Collapse
                  size="small"
                  collapsible="icon"
                  defaultActiveKey={["1"]}
                  items={[
                    {
                      key: "1",
                      label: "Customer Care",
                      children: <p>{text}</p>,
                    },
                  ]}
                  extra={
                    <MinusCircleOutlined className="dynamic-delete-button" />
                  }
                />
              </Space>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Preview",
      content: "Last-content",
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    color: token.colorTextTertiary,
    marginTop: 16,
  };

  return (
    <div className="createsurvey-container">
      <div className="left">
        <Steps
          style={{
            margin: "24px",
          }}
          direction="vertical"
          current={current}
          items={items}
        />
      </div>
      <div className="right">
        <h4>{steps[current].title}</h4>
        <Divider />

        <div style={contentStyle}>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
          }}
        >
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              //   onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateSurvey;
