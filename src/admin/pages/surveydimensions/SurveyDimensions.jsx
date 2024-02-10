import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../surveydimensions/surveydimensions.css";
import axios from "axios";
import { Button, Select, Input, InputNumber, Collapse, Upload } from "antd";
import { HiOutlinePlus } from "react-icons/hi";
import { CiCircleMinus } from "react-icons/ci";
import { AiTwotoneMinusCircle } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import avatar from "../../../assets/avatar.png";

function SurveyDimensions() {
  const [survey, setSurvey] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const apiKey = localStorage.getItem("token");

  // ================ get Survey by its id ================
  useEffect(() => {
    axios
      .get(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/surveys/readsingle/manager/${id}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        const data = res.data.data;
        setSurvey(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // =========================== allow select component to be searched ================
  const onChange = (value) => {
    setDimensionSurvey({ ...dimensioSurvey, dimensionId: value });
    console.log(`selected ${value}`);
  };
  const onChangeInstitution = (value) => {
    setCreatedInstitution({ ...createInstitution, institutionId: value });
    console.log(`selected createInstitution ${value}`);
  };
  const onChangeNumber = (value) => {
    setDimensionSurvey({ ...dimensioSurvey, dimensionRate: value });
    console.log("changed", value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // ============ get dimensions in Select input ===============
  const [dimessions, setDimessions] = useState([]);

  const getDimessions = async () => {
    const response = await axios.get(
      "https://smart-city-api-tpxn.onrender.com/SmartCity/API/dimensions/read"
    );
    const data = response.data.data;
    // console.log(data);
    setDimessions(data);
  };

  useEffect(() => {
    getDimessions();
  }, []);

  // =================== adding dimension into survey ===================
  const [dimensioSurvey, setDimensionSurvey] = useState({
    dimensionId: "",
    dimensionRate: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("dimensionId", dimensioSurvey.dimensionId);
    formData.append("dimensionRate", dimensioSurvey.dimensionRate);

    axios
      .post(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/surveyDimensions/add/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        getCreatedDimension();
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // ========== fetching dimension already created ========
  const [createdDimension, setCreatedDimension] = useState([]);

  const getCreatedDimension = async () => {
    const response = await axios.get(
      `https://smart-city-api-tpxn.onrender.com/SmartCity/API/surveys/readsingle/manager/${id}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setCreatedDimension(response.data.data.SurveyDimensions);
    console.log(response.data.data.SurveyDimensions);
  };
  useEffect(() => {
    getCreatedDimension();
  }, []);

  // ================== delete created dimension =====================
  async function handleDelete(del) {
    try {
      const response = await axios.delete(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/surveyDimensions/delete/${del}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getCreatedDimension();
    } catch (err) {
      console.error(err);
    }
  }

  // ============ adding questions into creat dimension ==================
  const [question, setQuestion] = useState({
    questionPhrase: "",
  });

  function handleSubmitQuestion(dim, event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("questionPhrase", question.questionPhrase);
    axios
      .post(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/questions/add/${dim}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Question added", response);
        getCreatedDimension();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // =============== delete question ===============
  async function handleDeleteQuestion(delQ) {
    try {
      const response = await axios.delete(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/questions/delete/${delQ}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getCreatedDimension();
      console.log("Question Deleted");
    } catch (err) {
      console.error(err);
    }
  }
  // ============ adding option into created question ==================
  const [option, setOption] = useState({
    optionPhrase: "",
    weight: "",
  });

  function handleSubmitOption(Qid, event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("optionPhrase", option.optionPhrase);
    formData.append("weight", option.weight);
    axios
      .post(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/options/add/${Qid}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Option added", response);
        getCreatedDimension();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // =============== delete option ===============
  async function handleDeleteOption(delp) {
    try {
      const response = await axios.delete(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/options/delete/${delp}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getCreatedDimension();
      console.log("option Deleted");
    } catch (err) {
      console.error(err);
    }
  }

  // ============ get Institution in Select input ===============
  const [institutions, setInstitutions] = useState([]);

  const getInstitutions = async () => {
    const response = await axios.get(
      "https://smart-city-api-tpxn.onrender.com/SmartCity/API/Institutions/read"
    );
    const data = response.data.data;
    console.log("Institutions :", data);
    setInstitutions(data);
  };

  useEffect(() => {
    getInstitutions();
  }, []);
  // =================== adding dimension into survey ===================
  const [createInstitution, setCreateInstitution] = useState({
    institutionId: "",
  });

  const handleSubmitInstitution = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("institutionId", createdInstitution.institutionId);
    axios
      .post(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/surveyInstitutions/add/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        getCreatedInstitution();
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // ========== fetching Institution already created ========
  const [createdInstitution, setCreatedInstitution] = useState([]);

  const getCreatedInstitution = async () => {
    const response = await axios.get(
      `https://smart-city-api-tpxn.onrender.com/SmartCity/API/surveys/readsingle/manager/${id}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setCreatedInstitution(response.data.data.Institutions);
    console.log("Institution :", response.data.data.Institutions);
  };
  useEffect(() => {
    getCreatedInstitution();
  }, []);

  // ================== delete created dimension =====================
  async function handleDeleteInstitution(instId) {
    try {
      const response = await axios.delete(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/Institutions/delete/${instId}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getCreatedInstitution();
    } catch (err) {
      console.error(err);
    }
  }
  // ===================== Upload status ===============
  function handleStatus(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("status", "live");
    axios
      .put(
        `https://smart-city-api-tpxn.onrender.com/SmartCity/API/surveys/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        navigate("/survey");
        console.log("status oky");
      });
  }

  return (
    <div className="surveydimensions-container">
      <div className="surveydimensions-row">
        <div className="surveydimensions-container_left">
          <div className="selected-survey">
            <div className="selected-survey-header">
              <div>
                <h3>{survey.title}</h3>
              </div>
              <div>
                <p>{survey.description}</p>
              </div>
              <div>
                <p>{createdDimension.length} Dimensions</p>
              </div>
              <div></div>
            </div>
            <div className="getsurveydimension">
              {Array.isArray(createdDimension) &&
              createdDimension.length > 0 ? (
                <div className="singlesurveydimension">
                  {createdDimension.map((item, index) => (
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                      }}
                      key={index}
                    >
                      <Collapse
                        size="small"
                        style={{
                          marginBottom: "8px",
                          flexBasis: "95%",
                        }}
                        items={[
                          {
                            key: index,
                            label: item.Dimension.dimensionName,
                            children: (
                              <div className="control-questions">
                                {Array.isArray(item.Questions) &&
                                item.Questions.length > 0 ? (
                                  <div className="getquestions">
                                    {item.Questions.map((itemQ, index) => (
                                      <div
                                        key={index}
                                        className="singleQuestion-container"
                                      >
                                        <div className="singleQuestion-container-header">
                                          <div className="singleQuestion-container-header-questionNumber">
                                            <div className="singleQuestion-container-header-questionNumber-circle">
                                              {index + 1}
                                            </div>
                                          </div>
                                          <div className="singleQuestion-container-header-questionPhrase">
                                            <p>{itemQ.questionPhrase}</p>
                                          </div>
                                        </div>
                                        <div className="singleQuestion-container-body">
                                          <div className="options-container">
                                            {Array.isArray(itemQ.Options) &&
                                            itemQ.Options.length > 0 ? (
                                              <div className="options-result">
                                                {itemQ.Options.map(
                                                  (option, index) => (
                                                    <div
                                                      className="option-item"
                                                      key={index}
                                                    >
                                                      <input
                                                        type="radio"
                                                        name={itemQ.id}
                                                      />
                                                      <p>
                                                        {" "}
                                                        {option.optionPhrase}
                                                      </p>
                                                      <p
                                                        style={{
                                                          color: "green",
                                                        }}
                                                      >
                                                        {"["}
                                                        {option.weight}
                                                        {"]"}
                                                      </p>
                                                      <CiCircleMinus
                                                        onClick={(e) => {
                                                          handleDeleteOption(
                                                            option.id
                                                          );
                                                        }}
                                                        size={18}
                                                        style={{
                                                          color: "gray",
                                                          cursor: "pointer",
                                                        }}
                                                      />
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            ) : (
                                              <p>No Option added yet </p>
                                            )}
                                            <form
                                              onSubmit={(event) => {
                                                handleSubmitOption(
                                                  itemQ.id,
                                                  event
                                                );
                                              }}
                                            >
                                              <div className="options-form">
                                                <div>
                                                  <input
                                                    className="inputfield"
                                                    type="text"
                                                    name="optionPhrase"
                                                    placeholder="Add option"
                                                    onChange={(event) => {
                                                      setOption({
                                                        ...option,
                                                        [event.target.name]:
                                                          event.target.value,
                                                      });
                                                    }}
                                                  />
                                                </div>
                                                <div>
                                                  <input
                                                    type="number"
                                                    className="inputfield"
                                                    placeholder="Weight"
                                                    name="weight"
                                                    min="0"
                                                    onChange={(event) => {
                                                      setOption({
                                                        ...option,
                                                        [event.target.name]:
                                                          event.target.value,
                                                      });
                                                    }}
                                                  />
                                                </div>
                                                <div>
                                                  <Button
                                                    htmlType="submit"
                                                    style={{
                                                      marginLeft: "6px",
                                                      padding: "2px",
                                                    }}
                                                    type="default"
                                                    shape="circle"
                                                    icon={<HiOutlinePlus />}
                                                    size="small"
                                                  />
                                                </div>
                                              </div>
                                            </form>
                                          </div>
                                        </div>
                                        <IoClose
                                          onClick={(e) => {
                                            handleDeleteQuestion(itemQ.id);
                                          }}
                                          size={20}
                                          style={{
                                            color: "crimson",
                                            position: "absolute",
                                            top: "5",
                                            right: "10",
                                            cursor: "pointer",
                                          }}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p>No Question added yet </p>
                                )}
                                <div className="addquestion-form">
                                  <form
                                    onSubmit={(event) => {
                                      handleSubmitQuestion(item.id, event);
                                    }}
                                  >
                                    <textarea
                                      name="questionPhrase"
                                      style={{
                                        width: "90%",
                                      }}
                                      rows="1"
                                      type="text"
                                      placeholder="Add new question..."
                                      onChange={(event) => {
                                        setQuestion({
                                          ...question,
                                          [event.target.name]:
                                            event.target.value,
                                        });
                                      }}
                                    />
                                    <Button
                                      htmlType="submit"
                                      style={{
                                        marginLeft: "6px",
                                        padding: "2px",
                                      }}
                                      type="default"
                                      shape="circle"
                                      icon={<HiOutlinePlus />}
                                      size="small"
                                    />
                                  </form>
                                </div>
                              </div>
                            ),
                          },
                        ]}
                      />
                      <AiTwotoneMinusCircle
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          handleDelete(item.id);
                        }}
                        size={24}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p>No Dimension added yet </p>
              )}

              <form onSubmit={handleSubmit}>
                <div className="addsurveydimension">
                  <div className="addsurveydimension-left">
                    <Select
                      style={{ width: "100%" }}
                      showSearch
                      name="dimensionId"
                      virtual={false}
                      allowClear
                      placeholder="Add Dimession..."
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
                  </div>
                  <div className="addsurveydimension-middle">
                    <InputNumber
                      allowClear
                      name="dimensionRate"
                      style={{
                        width: 100,
                      }}
                      placeholder="Rate"
                      min={1}
                      max={100}
                      onChange={onChangeNumber}
                    />
                  </div>
                  <div className="addsurveydimension-right">
                    <Button
                      htmlType="submit"
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
              </form>
            </div>
          </div>
        </div>
        <div className="surveydimensions-container_right">
          <div className="surveydimensions-assign-container">
            <div className="surveydimensions-assign-form">
              <div className="surveydimensions-assign-form-header">
                <h4>Assign Respondent</h4>
              </div>
              <form onSubmit={handleSubmitInstitution}>
                <div className="surveydimensions-assign-form-body">
                  <div>
                    <Select
                      style={{ width: "100%" }}
                      showSearch
                      name="institutionId"
                      virtual={false}
                      allowClear
                      placeholder="Enter name to find Institution "
                      optionFilterProp="children"
                      onChange={onChangeInstitution}
                      onSearch={onSearch}
                      filterOption={filterOption}
                      options={institutions.map((institution, index) => {
                        return {
                          key: index,
                          value: institution.id,
                          label: institution.name,
                        };
                      })}
                    />
                  </div>
                  <div>
                    <button type="submit" name="submit">
                      Assign
                    </button>
                  </div>
                </div>
              </form>
              {Array.isArray(createdInstitution) &&
              createdInstitution.length > 0 ? (
                <div className="surveydimensions-assign-form-result">
                  {createdInstitution.map((Inst, index) => (
                    <div className="profile-container">
                      <div className="profile-image">
                        <img
                          src={!Inst.profile ? avatar : Inst.profile}
                          alt="image"
                        />
                      </div>
                      <div className="profile-content">
                        <p key={index}>{Inst.name}</p>
                      </div>
                      <div>
                        <IoClose
                          onClick={(e) => {
                            handleDeleteInstitution(Inst.id);
                          }}
                          size={24}
                          style={{
                            color: "gray",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No Institution added yet </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="publish-btn-wrp">
        <button onClick={handleStatus}>Publish</button>
      </div>
    </div>
  );
}

export default SurveyDimensions;
