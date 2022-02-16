import React from "react";
import { useGetAddressQuery } from "../jobcoinSlice";
import { balance } from "./Balance.module.css";

function Jobcoin({ address }: { address: string }) {
  const { data = [], error, isLoading } = useGetAddressQuery(address);

  return (
    <div className={balance}>
      <h2>Current Balance</h2>
      {error ? (
        <p>Error Occured</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : data ? (
        <p>{data.balance}</p>
      ) : null}
    </div>
  );
}

export default Jobcoin;
