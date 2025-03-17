import React, { useState } from 'react';  // Added useState import
import { AiTwotoneDelete } from "react-icons/ai";

function App() {
  const [question, setQuestion] = useState('');  // Initialize state for the question

  const askQuestion = () => {
    console.log(question);  // This will log the question input when the button is clicked
  };

  return (
    <div className='grid grid-cols-5 text-center h-screen'>
      <div className='col-span-1 bg-zinc-800'>
        <h1 className='text-white text-2xl font-bold pt-5 flex justify-center items-center'>
          Recent Searches <AiTwotoneDelete />
        </h1>
      </div>
      <div className='col-span-4 pt-[750px] bg-zinc-700 flex flex-col'>
        <div className="container h-110"> {/* You can remove this if you don't need content */}</div>

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
