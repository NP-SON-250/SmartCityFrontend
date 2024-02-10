import React, { PureComponent, useState, useEffect } from "react";
import "./dashboard.css";
import { Select } from "antd";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
import CountUp from "react-countup";
import { LikeOutlined } from "@ant-design/icons";
import { Col, Row, Statistic } from "antd";
import { Bars, InfinitySpin } from "react-loader-spinner";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUniversity } from "react-icons/fa";
import { ImFilesEmpty } from "react-icons/im";
import { MdOutlineCreateNewFolder } from "react-icons/md";


const formatter = (value) => <CountUp end={value} separator="," />;
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend as LineLegend, // Renamed to avoid naming conflict
  ResponsiveContainer as LineResponsiveContainer, // Renamed to avoid naming conflict
} from "recharts";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend as RadarLegend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer as RadarResponsiveContainer, // Renamed to avoid naming conflict
} from "recharts";
function Dashboard() {
  const apiKey = localStorage.getItem("token");
  // ============ get Surveys in Select input ===============
  const [surveys, setSurveys] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [singleSurvey, setSingleSurvey] = useState([]);
  console.log("new single survey data is: ", singleSurvey);
  // console.log("selected option is: ", selectedOption);
  // console.log(surveys);

  const getSurveys = async () => {
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
    // console.log(data);
    setSurveys(data);
    // Set the selected option to the ID of the first survey
    if (data.length > 0) {
      setSelectedOption(data[0].id);
    }
  };
  // Define initial state with zero data
  const initialData = [
    { dimensionName: "Dimension 1", dimensionRate: 0 },
    { dimensionName: "Dimension 2", dimensionRate: 0 },
    { dimensionName: "Dimension 3", dimensionRate: 0 },
    // Add more zero data entries as needed
  ];

  // State to hold the chart data
  const [chartData, setChartData] = useState(initialData);
  console.log("chartData is here: ", chartData);
  useEffect(() => {
    getSurveys();
    handleFetchSurveys();
    if (singleSurvey.SurveyDimensions) {
      const dimensionInfoArray = singleSurvey.SurveyDimensions.map(
        (surveyDimension) => ({
          dimensionName: surveyDimension.Dimension.dimensionName,
          dimensionRate: surveyDimension.dimensionRate,
        })
      );

      console.log("the dimension name and rate is: ", dimensionInfoArray);
      setChartData(dimensionInfoArray);
    } else {
      console.error("SurveyDimensions is undefined in singleSurvey object.");
    }
    // if (
    //   singleSurvey.SurveyDimensions &&
    //   singleSurvey.SurveyDimensions.Questions
    // ) {
    //   const questionsInfoArray = singleSurvey.SurveyDimensions.Questions.map(
    //     (surveyQuestion) => ({
    //       id: surveyQuestion.id,
    //     })
    //   );

    //   console.log("the questions are: ", questionsInfoArray);
    // } else {
    //   console.error("Questions is undefined in singleSurvey object.");
    // }
  }, [singleSurvey.SurveyDimensions]);
  const handleFetchSurveys = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `https://smart-city-api-tpxn.onrender.com/SmartCity/API/surveys/readsingle/manager/${selectedOption}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = response.data.data;
    setSingleSurvey(data);
    // setChartData(data.SurveyDimensions.dimensionName);
  };
  const onSearch = (value) => {
    // console.log("search:", value);
  };
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const options = surveys.map((survey, index) => {
    return {
      key: index,
      value: survey.id,
      label: survey.title,
    };
  });
  const onChange = (date, dateString) => {
    // console.log(date, dateString);
  };
  const data1 = [
    {
      subject: "Infrastructure",
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: "education",
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "Governance",
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "Environment",
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: "Quality of Life",
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: "Mobility",
      A: 65,
      B: 85,
      fullMark: 150,
    },
    {
      subject: "Smart Economy",
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];
  console.log("here is the key: ", singleSurvey.SurveyDimensions);

  return (
    <div className="dashboard__container">
      <div className="header__dashboard">
        <form onSubmit={handleFetchSurveys}>
          <div className="select__survey">
            <span>Select survey:</span>
            <Select
              virtual={false}
              showSearch
              style={{
                width: 200,
              }}
              onSearch={onSearch}
              // filterOption={filterOption}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              value={selectedOption}
              onChange={(value) => setSelectedOption(value)}
            >
              {options.map((option) => (
                <Select.Option key={option.key} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
            {/* <span>Select range:</span> */}
            {/* <Space direction="vertical" size={12}>
            <RangePicker />
          </Space> */}
          </div>
          <button type="submit" className="gocharts">
            Go now
          </button>
        </form>
      </div>
      <div className="cards__dashboard">
        <div className="cards__dashboard__content">
          <div className="iconthing">
            <Statistic
              title="Institution"
              value={
                singleSurvey && singleSurvey.Institutions
                  ? singleSurvey.Institutions.length
                  : 0
              }
              formatter={formatter}
              prefix={
                <FaUniversity className="sidebar__icon formatter__icon" />
              }
            />
          </div>
          <div className="iconthing">
            <Statistic
              title="Dimensions"
              value={
                singleSurvey && singleSurvey.SurveyDimensions
                  ? singleSurvey.SurveyDimensions.length
                  : 0
              }
              precision={2}
              prefix={
                <ImFilesEmpty className="sidebar__icon formatter__icon" />
              }
              formatter={formatter}
              />
          </div>
          <div className="iconthing">
            <Statistic
              title="Feedback"
              value={
                singleSurvey && singleSurvey.SurveyDimensions
                  ? singleSurvey.SurveyDimensions.length
                  : 0
              }
              formatter={formatter}
              prefix={<LikeOutlined />}
              />
          </div>
          <div className="iconthing">
            <Statistic
              title="Total surveys"
              value={
                singleSurvey && singleSurvey.SurveyDimensions
                ? singleSurvey.SurveyDimensions.length
                : 0
              }
              // suffix="/ 100"
              formatter={formatter}
              prefix={
                <MdOutlineCreateNewFolder className="sidebar__icon formatter__icon" />
              }
            />
          </div>
        </div>
      </div>
      <div className="firstanalytics__dashboard">
        <div className="chart1">
          <LineResponsiveContainer>
            <LineChart
              className="linechart"
              width={1300}
              height={300}
              data={chartData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dimensionName" />
              <YAxis />
              <Tooltip />
              <LineLegend />
              <Line type="monotone" dataKey="dimensionRate" stroke="#343242" />
            </LineChart>
          </LineResponsiveContainer>
        </div>
        <div className="chart2">
          <RadarResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="dimensionName" />
              <PolarRadiusAxis angle={30} domain={[0, 150]} />

              <Radar
                name="dimensionRate"
                dataKey="dimensionRate"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
              />
              <RadarLegend />
            </RadarChart>
          </RadarResponsiveContainer>
        </div>
      </div>
      <div className="secondanalytics__dashboard"></div>
      <div className="secondanalytics__dashboard"></div>
      <div className="spinner">
        {/* {isLoading && (
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
        )} */}
      </div>
    </div>
  );
}

export default Dashboard;
