import React, { FormEvent } from "react";
import { login } from "./Login.module.css";
import { useInput } from "../../utils/useInput";

function Login() {
  const { value, bind, reset } = useInput("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    window.location.href = `/${value}`;
    reset();
  };

  return (
    <div className={login}>
      <form onSubmit={handleSubmit}>
        <h1>Welcome! ⛓</h1>
        <h3>Sign in with your Jobcoin Address</h3>
        <label htmlFor="address">Jobcoin Address</label>
        <input type="text" id="address" name="address" {...bind} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
