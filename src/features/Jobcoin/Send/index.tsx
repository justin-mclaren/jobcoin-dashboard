import React, { useState } from "react";
import { useSendTransactionMutation } from "../jobcoinSlice";
import { send } from "./Send.module.css";
import { useInput } from "../../../utils/useInput";
import { toast } from "react-toastify";

function Send({ fromAddress }: { fromAddress: string }) {
  const { value: toAddress, bind, reset: resetAddress } = useInput("");
  const { value: amount, bind: bindAmount, reset: resetAmount } = useInput("");
  const [sendTransaction, { isLoading }] = useSendTransactionMutation();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (isLoading) return;
    try {
      await sendTransaction({ fromAddress, toAddress, amount }).unwrap();
      toast.success("Transaction Successful");
      resetAmount();
      resetAddress();
    } catch (error) {
      toast.error("Transaction Failed");
    }
  }

  return (
    <div className={send}>
      <form onSubmit={handleSubmit}>
        <h2>Send Jobcoin</h2>
        <label htmlFor="address">Destination Address</label>
        <input type="text" id="address" name="address" {...bind}></input>
        <label htmlFor="lname">Amount to Send</label>
        <input type="text" id="amount" name="amount" {...bindAmount}></input>
        <button type="submit">Send Jobcoins</button>
      </form>
    </div>
  );
}

export default Send;
