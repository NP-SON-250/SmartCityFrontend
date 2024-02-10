import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { message, Steps, theme } from 'antd';
import '../conductSurvey/conductSurvey.css';
import Banner from '../../../components/banner/Banner';
import Conduct from './Conduct';

function ConductPage() {
  const { surveyId } = useParams();
  const [surveyData, setSurveyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseList, setResponseList] = useState([]);

  const token = localStorage.getItem('token');

  // Fetching data from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://smart-city-api-tpxn.onrender.com/SmartCity/API/surveys/read/${surveyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const data = response.data.data;
        setSurveyData(data.SurveyDimensions);
        console.log('surveyData', data.SurveyDimensions);
      } catch (error) {
        setError(
          error.message || 'An error occurred while fetching survey data.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [surveyId, setSurveyData]);

  // Posting data to db
  const submitSurvey = async () => {
    try {
      const submissionResponse = await axios.post(
        // '/submit API',  Api here !!
        {
          surveyId: surveyId,
          responses: responseList
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // Handle the response as needed
      console.log('Survey submitted successfully:', submissionResponse.data);
      message.success('Survey submitted successfully!');
    } catch (error) {
      console.error('Error submitting survey:', error.message);
      message.error('Error submitting survey. Please try again.');
    }
  };

  return (
    <>
      <Banner title='Conduct Survey' />
      <div className='w-full p-12 flex item-center'>
        {surveyData && (
          <ul>
            {surveyData.map((survey) => (
              <Conduct
                key={survey.id}
                survey={survey}
                submitSurvey={submitSurvey}
                responseList={responseList}
                setResponseList={setResponseList}
              />
            ))}
            <div className='flex gap-4'>
              <button className='btn mt-12 px-12 !bg-slate-600' type='reset'>
                Reset
              </button>
              <button
                className='btn mt-12 px-12 !bg-yellow-600'
                submitSurvey={submitSurvey}
              >
                Submit Survey
              </button>
            </div>
          </ul>
        )}
      </div>
    </>
  );
}

export default ConductPage;
