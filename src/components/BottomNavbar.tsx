const BottomNavbar = () => {
  const handleLinkClick = (link: string) => {
    const store = localStorage.setItem("link", link);
    return store;
  };
  const link = localStorage.getItem("link");

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-blue-900 rounded-lg shadow-md mx-96 my-10">
      <ul className="flex justify-around py-4 px-8">
        <li>
          <a
            href="/stt"
            className={`font-bold ${
              link === "/stt" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => handleLinkClick("/stt")}
          >
            Speech To Text
          </a>
        </li>
        <li>
          <a
            href="/tts"
            className={`font-bold ${
              link === "/tts" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => handleLinkClick("/tts")}
          >
            Text To Speech
          </a>
        </li>
        <li>
          <a
            href="/setting"
            className={`font-bold ${
              link === "/setting"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => handleLinkClick("/setting")}
          >
            Setting
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNavbar;
