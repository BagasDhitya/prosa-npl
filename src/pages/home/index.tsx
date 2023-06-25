import { useRef, useState, useEffect } from "react"
import axios from "axios"

import AudioRecorder from "../../components/AudioRecorder"

const Home = () => {

    const [recording, setRecording] = useState(false);
    const [timer, setTimer] = useState(0);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const handleStartRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks: Blob[] = [];

            mediaRecorder.addEventListener('dataavailable', (event) => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener('stop', async () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                const audioDataURL = await convertToDataURL(audioBlob);
                setAudioURL(audioDataURL);
            });

            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();
            setRecording(true);
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setRecording(false);
    };

    const convertToDataURL = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject(new Error('Failed to convert audio to data URL.'));
                }
            };
            reader.readAsDataURL(blob);
        });
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | any = null;

        if (recording) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [recording]);

    return (
        <div className="flex items-center justify-center h-screen">
            <AudioRecorder
                id="audio_recording"
                isRecording={recording}
                timer={timer}
                onStart={() => handleStartRecording()}
                onStop={() => handleStopRecording()}
            />
        </div>
    )
}

export default Home