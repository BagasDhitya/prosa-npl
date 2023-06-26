import React from "react";

const Landing: React.FC = () => {
  return (
    <div className="grid grid-cols-2 h-full">
      <div className="bg-blue-900 h-screen flex items-center">
        <h1 className="text-white text-4xl px-10 mx-auto">
          Welcome to <span className="font-bold">Prosa React</span>
        </h1>
      </div>
      <div className="bg-white">
        <div className="container mx-auto py-16 px-4">
          <img
            src="https://img.freepik.com/free-vector/brain-with-digital-circuit-programmer-with-laptop-machine-learning-artificial-intelligence-digital-brain-artificial-thinking-process-concept-vector-isolated-illustration_335657-2246.jpg"
            height={500}
            width={500}
            alt="Illustration"
          />
          <p className="text-blue-900 text-lg text-justify mb-8 my-10 mx-10">
            Analyze and understand human language with our advanced Natural
            Language Processing (NLP) application.
          </p>
          <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 mx-10 rounded">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
