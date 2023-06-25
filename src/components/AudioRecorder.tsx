import { FC } from 'react';

interface AudioProps {
    id: string,
    timer: number,
    isRecording: boolean,
    onStart: () => void,
    onStop: () => void,
}

const AudioRecorder: FC<AudioProps> = ({ id, timer, isRecording, onStart, onStop }) => {

    return (
        <div id={id} className="p-4">
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={onStart}
                disabled={isRecording}
            >
                Start Recording
            </button>
            <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400 ml-4"
                onClick={onStop}
                disabled={!isRecording}
            >
                Stop Recording
            </button>
            {isRecording && (
                <div className="mt-4">
                    Timer: {timer} seconds
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;
