import { useRef, useState, useEffect } from "react";
import axios from "axios";

import Layout from "../../components/Layout";
import AudioRecorder from "../../components/AudioRecorder";

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

            mediaRecorder.addEventListener("dataavailable", (event) => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", async () => {
                const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
                const audioDataURL = await convertToDataURL(audioBlob);
                setAudioURL(audioDataURL);
            });
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();
            setRecording(true);
            // convertToText(audioURL)
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setRecording(false);
    };

    const convertToText = async (uri: string | null) => {
        await axios.post("/stt", {
            data: {

                "config": {
                    "engine": "stt-general",
                    "wait": false,
                    "include_filler": false,
                    "include_partial_results": false
                },
                "request": {
                    "label": "Meeting Audio 2021-14-06",
                    "data": uri
                }

            },
            headers: {
                "x-api-key": `${import.meta.env.VITE_PROSA_KEY}`
            }
        })
    }

    const convertToDataURL = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    resolve(reader.result);
                } else {
                    reject(new Error("Failed to convert audio to data URL."));
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

    const formatTime = (value: number) => {
        const padZero = (num: number) => String(num).padStart(2, "0");
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);
        const seconds = value % 60;
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    };

    return (
        <Layout>
            <div className="flex justify-center py-8 lg:mx-72">
                <div className="max-w-3xl w-72 lg:mx-72 lg:my-40">
                    <AudioRecorder
                        id="audio_recording"
                        isRecording={recording}
                        timer={formatTime(timer)}
                        onStart={() => handleStartRecording()}
                        onStop={() => handleStopRecording()}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Home;
