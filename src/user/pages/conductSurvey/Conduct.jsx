import { useState } from 'react';

const Conduct = ({ survey, submitSurvey, responseList, setResponseList }) => {
  const dimension = survey.Dimension;

  const handleRadioChange = (questionId, optionId, optionWeight) => {
    const updatedResponseList = [...responseList];
    const existingResponseIndex = updatedResponseList.findIndex(
      (response) => response.questionId === questionId
    );

    if (existingResponseIndex !== -1) {
      // If response for the question already exists, update it
      updatedResponseList[existingResponseIndex] = {
        questionId,
        optionId,
        optionWeight
      };
    } else {
      // If response for the question doesn't exist, add it to the list
      updatedResponseList.push({
        questionId,
        optionId,
        optionWeight
      });
    }

    setResponseList(updatedResponseList);
  };

  const questions = survey.Questions.map((question) => {
    const options = question.Options.map((option) => (
      <li key={option.id}>
        <label htmlFor='rightAnswer' className='mr-2'>
          {option.optionPhrase}
        </label>
        <input
          type='radio'
          id={option.id}
          name={question.questionPhrase}
          value={option.weight}
          className='pl-6'
          onChange={() =>
            handleRadioChange(question.id, option.id, option.weight)
          }
        />
      </li>
    ));

    return (
      <li key={question.id} className='flex flex-col gap-2'>
        <p className=' font-medium'>
          {question.questionPhrase} (Marks: {question.questionMarks}){' '}
        </p>
        <ul>{options}</ul>
      </li>
    );
  });

  return (
    <>
      {questions.length > 0 && (
        <form className='my-4 rounded-lg p-8 w-full shadow-xl shadow-slate-200 hover:scale-[1.02] duration-300'>
          <div>
            <p className='bg-yellow-400 px-8 py-4 mb-4 rounded-md'>
              {dimension.dimensionName}
            </p>
            <p>
              {dimension.dimensionImage && (
                <img
                  src={dimension.dimensionImage}
                  alt={dimension.dimensionName}
                  className='w-20 h-20 rounded-full'
                />
              )}
            </p>
            <ul className='mt-4'>{questions}</ul>
          </div>
        </form>
      )}
    </>
  );
};

export default Conduct;
