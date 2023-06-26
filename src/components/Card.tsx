import { FC } from "react";

import { CardProps } from "../utils/component";

const Card: FC<CardProps> = ({
  id,
  title,
  status,
  description,
  isLoading,
  onPlay,
  onStop,
}) => {
  return (
    <div id={id} className="bg-white text-blue-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <h2 className="text-md font-medium text-blue-700 mb-2">
        Status : {status}
      </h2>
      <p className="mb-4">{description?.split("T")[0]}</p>
      {isLoading ? (
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg cursor-not-allowed">
          Processing...
        </button>
      ) : (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
            onClick={onPlay}
          >
            Play
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            onClick={onStop}
          >
            Stop
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
