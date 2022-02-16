import React from "react";
import Balance from "./features/Jobcoin/Balance";
import Send from "./features/Jobcoin/Send";
import Chart from "./features/Jobcoin/Chart";
import { app } from "./App.module.css";
import Login from "./features/Login";
import Header from "./components/Header";

export default function App() {
  const { pathname } = window.location;
  const address = pathname.split("/")[1];

  return (
    <div className={app}>
      {pathname === "/" ? (
        <Login />
      ) : (
        <>
          <Header address={address} />
          <main>
            <aside>
              <Send fromAddress={address} />
              <Balance address={address} />
            </aside>
            <Chart address={address} />
          </main>
        </>
      )}
    </div>
  );
}
