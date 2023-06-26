import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import BottomNavbar from "../../components/BottomNavbar";
import Layout from "../../components/Layout";

const Setting = () => {
  const navigate: any = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();
  const [language, setLanguage] = useState("en");
  const [dotPosition, setDotPosition] = useState("left");

  const welcomeMessage = cookie?.username;

  const handleLogout = () => {
    removeCookie("username");
    removeCookie("token");
    navigate("/");
  };

  const handleLanguageToggle = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "id" : "en"));
    setDotPosition((prevPosition) =>
      prevPosition === "left" ? "right" : "left"
    );
  };

  return (
    <Layout>
      <div className="flex justify-center py-8">
        <div className="max-w-3xl w-full">
          <div className="bg-white rounded-lg p-6">
            <div className="grid grid-cols-1 gap-3">
              <h3 className="text-lg font-bold flex my-10 text-blue-900">
                Hi, {welcomeMessage}!
              </h3>{" "}
              <h3 className="text-lg font-bold">Language</h3>
              <div>
                <label
                  htmlFor="toggle"
                  className="flex items-center cursor-pointer justify-between"
                >
                  <span className="mr-2">
                    {language === "en" ? "English" : "Indonesia"}
                  </span>
                  <div className="relative">
                    <input
                      id="toggle"
                      type="checkbox"
                      className="hidden"
                      checked={language === "id"}
                      onChange={handleLanguageToggle}
                    />
                    <div
                      className={`block bg-blue-700 w-14 h-8 rounded-full transition-transform transform`}
                    ></div>
                    <div
                      className={`dot absolute top-1 bg-white w-6 h-6 rounded-full transition ${
                        dotPosition === "left" ? "left-1" : "right-1"
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
              <hr className="my-2" />
              <h3 className="text-lg font-bold">About</h3>
              <hr className="my-2" />
              <button
                className="bg-transparent text-lg text-left text-red-500 hover:border hover:border-transparent focus:outline-none font-bold pl-0"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <BottomNavbar />
    </Layout>
  );
};

export default Setting;
