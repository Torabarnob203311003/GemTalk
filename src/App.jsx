import React, { useState } from 'react';
import { AiTwotoneDelete } from "react-icons/ai";
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

    let response = await fetch(URL, {
      method: 'POST',

      body: JSON.stringify(payload),
    });

    response = await response.json();
    setResult(response.candidates[0].content.parts[0].text
    );  // Fixed console log

    // Set the result from the response

  }

  return (
    <div className='grid grid-cols-5 text-center h-screen'>
      <div className='col-span-1 bg-zinc-800'>
        <h1 className='text-white text-2xl font-bold pt-5 flex justify-center items-center'>
          Recent Searches <AiTwotoneDelete />
        </h1>
      </div>
      <div className='col-span-4 pt-[750px] bg-zinc-700 flex flex-col'>
        <div className="container h-110  overflow-auto scroll-smooth no-scrollbar">
          <div className='text-white'> {result}</div>
          <div className='text-white'>
            {result ? result : "What Is Your Query Today ??"}
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
