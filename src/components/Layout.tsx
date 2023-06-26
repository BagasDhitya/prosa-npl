import { FC } from "react";

import { LayoutProps } from "../utils/component";

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <main className="flex-grow py-8 px-6 my-14">{children}</main>
    </div>
  );
};

export default Layout;
