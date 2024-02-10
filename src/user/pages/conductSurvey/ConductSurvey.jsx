import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { message, Steps, theme } from 'antd';
import '../conductSurvey/conductSurvey.css';
import Banner from '../../../components/banner/Banner';

function ConductSurvey() {
  const { surveyId } = useParams();
  const [surveyData, setSurveyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://smart-city-api-tpxn.onrender.com/SmartCity/API/surveys/read/${surveyId}`
        );
        const data = response.data;
        setSurveyData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [surveyId]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = surveyData?.map((item) => ({
    key: item.name,
    title: item.name
  }));
  const contentStyle = {
    textAlign: 'left',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${token.colorBorder}`,
    marginTop: 16,
    padding: 24
  };
  return (
    <>
      <Banner title='Conduct Survey' />
      <div className='conduct-container section__padding'>
        <div className='conduct-main'>
          <div className='conduct-steps'>
            <Steps
              type='default'
              current={current}
              items={items}
              direction='vertical'
            />
          </div>
          <div className='conduct-forms'>
            <div className='conduct-forms_title'>
              <h3>
                {surveyData && surveyData[current] && surveyData[current].name}
              </h3>
            </div>
            <div style={contentStyle}>
              {surveyData &&
                surveyData[current] &&
                surveyData[current].questions.map((question, index) => {
                  return (
                    <div className='question' key={question.title}>
                      <div className='question-title'>
                        <p>
                          {index + 1} . {question.title}
                        </p>
                      </div>
                      <div className='question-response'>
                        <ul>
                          {question.response.map((res) => {
                            return (
                              <li key={res.answer}>
                                <input
                                  type='radio'
                                  name={question.title}
                                  value={res.weight}
                                />
                                {res.answer}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div
              className='conduct-forms-buttons'
              style={{
                marginTop: 24
              }}
            >
              {' '}
              <div>
                {current > 0 && (
                  <button
                    style={{
                      backgroundColor: '#fff',
                      color: '#edc121',
                      margin: '0 8px',
                      padding: '0.5rem 1rem',
                      borderRadius: '10px',
                      fontWeight: '500',
                      fontSize: '16px',
                      border: '1px solid #ffcd06'
                    }}
                    onClick={() => prev()}
                  >
                    Previous
                  </button>
                )}
              </div>
              <div>
                {current < (surveyData?.length || 0) - 1 && (
                  <button className='btn' onClick={() => next()}>
                    Next
                  </button>
                )}
                {current === (surveyData?.length || 0) - 1 && (
                  <button
                    className='btn'
                    onClick={() => message.success('Processing complete!')}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConductSurvey;
