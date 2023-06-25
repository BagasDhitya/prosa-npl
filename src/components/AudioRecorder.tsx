import { FC } from 'react';

interface AudioProps {
    id: string;
    timer: string | number;
    save: boolean;
    isRecording: boolean;
    onStart: () => void;
    onStop: () => void;
    onSave: () => void
}

const AudioRecorder: FC<AudioProps> = ({ id, timer, save, isRecording, onStart, onStop, onSave }) => {
    return (
        <div id={id} className="p-4">
            <div className="relative h-14 mb-4 overflow-hidden">
                <div className={`h-full text-blue-500 flex items-center justify-center`}>
                    <span className="text-2xl font-bold">{timer}</span>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                    onClick={onStart}
                    disabled={isRecording}
                >
                    Start Recording
                </button>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                    onClick={onStop}
                    disabled={!isRecording}
                >
                    Stop Recording
                </button>
                {
                    save &&
                    <div className='mt-10'>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                            onClick={onSave}
                        >
                            Save
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default AudioRecorder;
