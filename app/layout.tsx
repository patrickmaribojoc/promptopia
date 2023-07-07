import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { useSession } from "next-auth/react";
export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};
export default layout;
