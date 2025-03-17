import React from 'react';
import { AiTwotoneDelete } from "react-icons/ai";

function App() {
  return (
    <div className='grid grid-cols-5 text-center h-screen'>
      <div className='col-span-1 bg-zinc-800'>
        <h1 className='text-white text-2xl font-bold pt-5 flex justify-center items-center'>
          Recent Searches <AiTwotoneDelete />
        </h1>
      </div>
      <div className='col-span-4 pt-[700px] bg-zinc-700 flex flex-col'>
        <div className="container h-110"> {/* You can remove this if you don't need content */}</div>

        {/* Input box aligned at the bottom */}
        <div className='bg-zinc-800 w-1/2 text-white m-auto rounded-3xl border border-zinc-400 flex mt-auto'>
          <input
            type="text"
            className='w-full h-full p-3 outline-none bg-transparent text-white placeholder:text-gray-400' // Make bg transparent
            placeholder='Ask Me Anything'
          />
          <button className='p-5 text-xl font-semibold'>Ask</button>
        </div>
      </div>
    </div>
  );
}

export default App;
