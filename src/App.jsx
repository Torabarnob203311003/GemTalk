import React, { useState, useEffect } from 'react';
import { AiTwotoneDelete } from "react-icons/ai";
import { URL } from './Data/constants';

function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(undefined);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [questionResults, setQuestionResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredQuestionIndex, setHoveredQuestionIndex] = useState(null);
  const [showIntro, setShowIntro] = useState(true); // For showing the intro message

  const payload = {
    "contents": [{
      "parts": [{ "text": question }]
    }]
  };

  const askQuestion = async (questionToAsk) => {
    if (questionToAsk.trim() === '') return;

    setIsLoading(true);
    setQuestion(questionToAsk);
    setAskedQuestions((prevQuestions) => [...prevQuestions, questionToAsk]);

    try {
      let response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      response = await response.json();

      if (response.candidates && response.candidates[0] && response.candidates[0].content) {
        let dataString = response.candidates[0].content.parts[0].text;
        dataString = dataString.split("*");
        dataString = dataString.map((item) => item.trim()).filter((item) => item !== "");

        if (dataString.length > 0) {
          setResult(dataString);
          setQuestionResults((prevResults) => [...prevResults, dataString]);
        } else {
          setResult(["No valid response found."]);
          setQuestionResults((prevResults) => [...prevResults, ["No valid response found."]]);
        }
      } else {
        setResult(["Unexpected response format. Please try again."]);
        setQuestionResults((prevResults) => [...prevResults, ["Unexpected response format. Please try again."]]);
      }
    } catch (error) {
      console.error("Error fetching the response:", error);
      setResult(["Something went wrong. Please try again."]);
      setQuestionResults((prevResults) => [...prevResults, ["Something went wrong. Please try again."]]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteQuestion = (index) => {
    setAskedQuestions((prevQuestions) => prevQuestions.filter((_, idx) => idx !== index));
    setQuestionResults((prevResults) => prevResults.filter((_, idx) => idx !== index));
  };

  // Hide the intro after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5000); // 5 seconds duration
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="grid grid-cols-5 text-center h-screen">
      {showIntro && (
        <div className="absolute top-0 left-0 right-5 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-l from-purple-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text text-4xl text-center font-bold animate-fadeIn">
            <p>Hi, I am GEM TALK an AI chat assistant in development mode.</p>
            <p>My creator is Abu Torab Arnob.</p>
          </div>
        </div>
      )}

      <div className="col-span-1 overflow-auto scroll-smooth no-scrollbar bg-gradient-to-r from-[#0f172a] to-[#334155]">
        <h1 className="text-white text-3xl font-bold pt-5 flex justify-center items-center">
          Recent Searches <AiTwotoneDelete />
        </h1>
        <div className="text-white">
          {askedQuestions.map((question, index) => (
            <div
              key={index}
              className="text-left px-10 py-3 text-xl font-semibold text-gray-300 relative bg-gray-500 bg-opacity-50 rounded-md mb-2"
              onClick={() => askQuestion(question)}
              onMouseEnter={() => setHoveredQuestionIndex(index)}
              onMouseLeave={() => setHoveredQuestionIndex(null)}
            >
              <strong className="text-white"> Question:</strong> {question}
              {hoveredQuestionIndex === index && (
                <AiTwotoneDelete
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteQuestion(index);
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1] flex flex-col">
        <div className="container h-full overflow-auto scroll-smooth no-scrollbar flex flex-col justify-start pt-5">
          <div className="bg-gradient-to-bl from-slate-950 via-cyan-700 to-black bg-clip-text text-transparent">
            {isLoading ? (
              <div className="text-left px-10 py-3 text-xl font-semibold text-gray-300">
                Loading...
              </div>
            ) : (
              result && (
                <div className="text-left px-10 py-3 mr-auto answer-container">
                  <div className="answer-item">
                    <p className="font-semibold text-white text-4xl">{question}</p>
                    <strong className="text-white text-2xl">Response:</strong>
                    <div className="mt-4">
                      {result.map((item, index) => (
                        <div key={index} className="mb-2">
                          <p className="font-semibold text-gray-300 text-2xl">
                            {item.split(":")[0]}: <span className="text-gray-200">{item.split(":")[1]}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="bg-zinc-800 w-1/2 mb-5 text-white m-auto rounded-3xl border border-zinc-400 flex mt-auto">
          <input
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                askQuestion(question);
                setQuestion('');
              }
            }}
            type="text"
            value={question}
            className="w-full h-full p-5 outline-none bg-transparent text-white placeholder:text-gray-400 text-2xl"
            placeholder="Ask Me Anything"
          />
          <button
            onClick={() => {
              askQuestion(question);
              setQuestion('');
            }}
            className="p-5 text-2xl font-semibold"
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
