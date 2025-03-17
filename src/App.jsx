import React, { useState } from 'react';  // Added useState import
import { AiTwotoneDelete } from "react-icons/ai";
import { URL } from './Data/constants'; // Ensure you have the correct URL

function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState('');  // Initialize state for the result

  const payload = {
    "contents": [{
      "parts": [{ "text": question || "Explain how AI works" }]  // Use question dynamically
    }]
  };

  const askQuestion = async () => {
    try {
      let response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Make sure to set content type
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();  // Parse the response
      console.log(responseData);  // Log the response to check its structure

      // Check if the response has the expected structure before accessing it
      if (responseData.candidate && responseData.candidate[0] && responseData.candidate[0].content) {
        setResult(responseData.candidate[0].content.parts[0].text || "No answer found");
      } else {
        setResult("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setResult("Something went wrong, please try again later.");
    }
  };

  return (
    <div className='grid grid-cols-5 text-center h-screen'>
      <div className='col-span-1 bg-zinc-800'>
        <h1 className='text-white text-2xl font-bold pt-5 flex justify-center items-center'>
          Recent Searches <AiTwotoneDelete />
        </h1>
      </div>
      <div className='col-span-4 pt-[750px] bg-zinc-700 flex flex-col'>
        <div className="container h-110">
          {/* Displaying the result */}
          <div className='text-white'>
            {result ? result : "No result yet"}
          </div>
        </div>

        {/* Input box aligned at the bottom */}
        <div className='bg-zinc-800 w-1/2 text-white m-auto rounded-3xl border border-zinc-400 flex mt-auto'>
          <input
            onChange={(event) => setQuestion(event.target.value)}  // Fixed event handler
            type="text"
            value={question}
            className='w-full h-full p-3 outline-none bg-transparent text-white placeholder:text-gray-400'
            placeholder='Ask Me Anything'
          />
          <button
            onClick={askQuestion}  // Call the askQuestion function
            className='p-5 text-xl font-semibold'
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
