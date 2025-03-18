import React, { useState } from 'react';
import { AiTwotoneDelete } from "react-icons/ai";
import Ans from './Components/Ans';
import { URL } from './Data/constants';

function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(undefined);

  const payload = {
    "contents": [{
      "parts": [{ "text": question }]
    }]
  };

  const askQuestion = async () => {
    try {
      let response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      response = await response.json();
      let dataString = response.candidates[0].content.parts[0].text;
      dataString = dataString.split("*");
      dataString = dataString.map((item) => item.trim());
      setResult(dataString);

      console.log(dataString); // Optional: log to check the result
    } catch (error) {
      console.error("Error fetching the response:", error);
      setResult(["Something went wrong. Please try again."]);
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
            <ul>
              {
                result && result.map((item, index) => (
                  <li className='text-left px-10 py-1' key={index}>
                    <Ans ans={item} />
                  </li>
                ))
              }
            </ul>
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
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
