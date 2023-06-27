import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import AudioRecorder from "../../components/AudioRecorder";
import Sidebar from "../../components/Sidebar";
import Card from "../../components/Card";
import BottomNavbar from "../../components/BottomNavbar";

const SpeechToText = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [timer, setTimer] = useState(0);

  const validationSchema = Yup.object().shape({
    describe: Yup.string().required(
      "Please enter a description for the recording"
    ),
  });

  const formik = useFormik({
    initialValues: {
      describe: "",
      data: {} as any,
      loading: false,
      modalOpen: false,
      recording: false,
      audioURL: "",
      save: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      handleModalClose();
      await convertToText(values.audioURL, values.describe);
    },
  });

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: any[] = [];

      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        const audioDataURL = await convertToBase64(audioBlob);
        formik.setFieldValue("audioURL", audioDataURL);
      });

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      formik.setFieldValue("recording", true);
      setTimer(0); // Reset the timer when recording starts
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    formik.setFieldValue("recording", false);
    formik.setFieldValue("save", true);
  };

  const handleSave = () => {
    formik.setFieldValue("modalOpen", true);
  };

  const handleModalClose = () => {
    formik.setFieldValue("modalOpen", false);
    formik.setFieldValue("describe", "");
    formik.setFieldValue("save", false);
  };

  const handleModalSave = () => {
    convertToText(formik.values.audioURL, formik.values.describe);
    handleModalClose();
  };

  const convertToText = async (uri: string, describe: string) => {
    try {
      const response = await axios.post(
        "/stt",
        {
          config: {
            engine: "stt-general",
            wait: false,
            include_filler: false,
            include_partial_results: false,
          },
          request: {
            label: describe,
            data: uri,
          },
        },
        {
          headers: {
            "x-api-key": `${import.meta.env.VITE_PROSA_KEY}`,
          },
        }
      );
      formik.setFieldValue("data", response.data);
      const status = response?.data?.status;
      if (status === "queued" || status === "in_progress") {
        formik.setFieldValue("loading", true);
        Swal.fire({
          title: "Sorry",
          icon: "info",
          text: "Your file was processing on queue, please back after 4 hours later",
        });
      } else {
        formik.setFieldValue("loading", false);
      }
    } catch (error) {
      Swal.fire({
        title: "Something went wrong",
        icon: "error",
        text: "Please record again!",
        confirmButtonText: "OK",
      });
    }
  };

  const convertToBase64 = (blob: Blob) => {
    return new Promise<string>((resolve, reject) => {
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
    let interval: NodeJS.Timeout | null = null;
    if (formik.values.recording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [formik.values.recording, formik.values.data.status]);

  const formatTime = (value: number) => {
    const padZero = (num: number) => String(num).padStart(2, "0");
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  };

  console.log("data: ", formik.values.data.status);

  return (
    <Layout>
      <div className="flex justify-center py-8 lg:mx-72">
        <Sidebar>
          <div className="flex items-center justify-center h-full">
            {!formik.values.data.job_id ? (
              <p className="font-bold text-blue-900 text-center">
                You don't have any recorded file
              </p>
            ) : (
              <Card
                id="record"
                title={formik.values.data?.request?.label}
                description={formik.values.data?.created_at}
                status={formik.values.data?.status}
                isLoading={formik.values.loading}
                onPlay={() => console.log("play")}
                onStop={() => console.log("stop")}
              />
            )}
          </div>
        </Sidebar>
        <div className="max-w-3xl w-72 lg:mx-72 lg:my-40">
          <AudioRecorder
            id="audio_recording"
            isRecording={formik.values.recording}
            timer={formatTime(timer)}
            save={formik.values.save}
            onStart={() => handleStartRecording()}
            onStop={() => handleStopRecording()}
            onSave={() => handleSave()}
          />
          {formik.values.modalOpen && (
            <Modal>
              <h2 className="font-bold">Save Recording</h2>
              <p className="my-5">
                Please enter a description for the recording:
              </p>
              <input
                type="text"
                name="describe"
                value={formik.values.describe}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-white border border-gray-300 rounded-md px-2 py-1 mt-2 w-full"
              />
              {formik.touched.describe && formik.errors.describe && (
                <div className="text-red-500 mt-1">
                  {formik.errors.describe}
                </div>
              )}
              <div className="flex justify-end mt-4 gap-x-5">
                <button
                  onClick={handleModalClose}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleModalSave}
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </Modal>
          )}
        </div>
      </div>
      <BottomNavbar />
    </Layout>
  );
};

export default SpeechToText;
