import { useRef, useState, useEffect } from "react";
import axios from "axios";

import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import AudioRecorder from "../../components/AudioRecorder";

const Home = () => {
    const [save, setSave] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [recording, setRecording] = useState<boolean>(false);
    const [describe, setDescribe] = useState<string>("");

    const [timer, setTimer] = useState<number>(0);
    const [audioURL, setAudioURL] = useState<string>("");
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
                const audioDataURL = await convertToBase64(audioBlob);
                setAudioURL(audioDataURL);
            });
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();
            setRecording(true);
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setRecording(false);
        setSave(true)
    };

    const handleSave = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setDescribe("");
        setSave(false);
    };

    const handleModalSave = () => {
        convertToText(audioURL);
        handleModalClose();
    };

    const convertToText = async (uri: string) => {
        console.log(uri)
        console.log(describe)
        await axios.post(
            "/stt",
            {
                "config": {
                    "engine": "stt-general",
                    "wait": false,
                    "include_filler": false,
                    "include_partial_results": false
                },
                "request": {
                    "label": describe,
                    "data": uri
                }
            },
            {
                headers: {
                    "x-api-key": `${import.meta.env.VITE_PROSA_KEY}`,
                },
            }
        )
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    };

    const convertToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    const base64String = reader.result.split(",")[1];
                    resolve(base64String);
                } else {
                    reject(new Error("Failed to convert audio to Base64 string."));
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
                        save={save}
                        onStart={() => handleStartRecording()}
                        onStop={() => handleStopRecording()}
                        onSave={() => handleSave()}
                    />
                    {modalOpen && (
                        <Modal >
                            <h2 className="font-bold">Save Recording</h2>
                            <p className="my-5">Please enter a description for the recording:</p>
                            <input
                                type="text"
                                value={describe}
                                onChange={(e) => setDescribe(e.target.value)}
                                className="border border-gray-300 rounded-md px-2 py-1 mt-2 w-full"
                            />
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={handleModalClose}
                                    className="text-gray-500 hover:text-gray-700 mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleModalSave}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Home;
