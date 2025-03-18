import React, { useState } from 'react';
import { AiTwotoneDelete } from "react-icons/ai";
import { URL } from './Data/constants';

function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(undefined);
  const [askedQuestion, setAskedQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const payload = {
    "contents": [{
      "parts": [{ "text": question }]
    }]
  };

  const askQuestion = async () => {
    if (question.trim() === '') return; // Don't ask if the input is empty

    setIsLoading(true);
    setAskedQuestion(question);  // Save the asked question
    setQuestion('');  // Clear the input field

    try {
      let response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      response = await response.json();

      // Check if response contains valid data
      if (response.candidates && response.candidates[0] && response.candidates[0].content) {
        let dataString = response.candidates[0].content.parts[0].text;

        // Clean up the response text
        dataString = dataString.split("*");
        dataString = dataString.map((item) => item.trim()).filter((item) => item !== "");

        // Set the result only if there are valid answers
        if (dataString.length > 0) {
          setResult(dataString);
        } else {
          setResult(["No valid response found."]);
        }
      } else {
        setResult(["Unexpected response format. Please try again."]);
      }
    } catch (error) {
      console.error("Error fetching the response:", error);
      setResult(["Something went wrong. Please try again."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='grid grid-cols-5 text-center h-screen'>
      <div className='col-span-1 bg-zinc-800'>
        <h1 className='text-white text-2xl font-bold pt-5 flex justify-center items-center'>
          Recent Searches <AiTwotoneDelete />
        </h1>
      </div>
      <div className='col-span-4 bg-zinc-700 flex flex-col'>
        {/* Answers container with scroll and aligned to top */}
        <div className="container h-full overflow-auto scroll-smooth no-scrollbar flex flex-col justify-start pt-5">
          <div className='text-white'>
            {/* Display question */}
            {askedQuestion && (
              <div className="text-left px-10 py-3 text-xl font-semibold text-gray-300">
                <strong className="text-white">Question:</strong> {askedQuestion}
              </div>
            )}
            {/* Display loading or result */}
            {isLoading ? (
              <div className="text-left px-10 py-3 text-xl font-semibold text-gray-300">
                Loading...
              </div>
            ) : (
              result && (
                <div className="text-left px-10 py-3">
                  {/* Display the answers in the requested format */}
                  <strong className="text-white text-2xl">Answer:</strong>
                  <div className="mt-4">
                    {result.map((item, index) => (
                      <div key={index} className="mb-2">
                        <div className="font-semibold text-gray-300">
                          {/* Display the month and the number of days */}
                          {item.split(":")[0]}: {item.split(":")[1]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Input box aligned at the bottom */}
        <div className='bg-zinc-800 w-1/2 text-white m-auto rounded-3xl border border-zinc-400 flex mt-auto'>
          <input
            onChange={(event) => setQuestion(event.target.value)}
            type="text"
            value={question}
            className='w-full h-full p-3 outline-none bg-transparent text-white placeholder:text-gray-400'
            placeholder='Ask Me Anything'
          />
          <button
            onClick={askQuestion}
            className='p-5 text-xl font-semibold'
            disabled={isLoading}
          >
            {isLoading ? 'Asking...' : 'Ask'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
