import React from "react";
import logout from "/logout.svg";
import { header, circle, inner, user } from "./Header.module.css";
import Jdenticon from "react-jdenticon";

function Header({ address }: { address: string }) {
  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <header className={header}>
      <div className={inner}>
        <h1>Jobcoin ⛓ </h1>
        <span>
          <div className={user}>
            <Jdenticon size="40" value={address} />
            <div>{address}</div>
          </div>
          <div className={circle} onClick={handleLogout}>
            <img src={logout} width="30px" alt="logout" />
          </div>
        </span>
      </div>
    </header>
  );
}

export default Header;
