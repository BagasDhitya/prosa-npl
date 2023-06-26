import { FC } from "react";

import { SidebarProps } from "../utils/component";

const Sidebar: FC<SidebarProps> = ({ children }) => {
  return (
    <div className="bg-white text-blue-800 shadow-lg w-80 h-full absolute right-0 top-0">
      <div className="flex items-center justify-center h-16 bg-blue-900">
        <p className="font-bold text-white">List Recording</p>
      </div>
      <div className="m-10">{children}</div>
    </div>
  );
};

export default Sidebar;
