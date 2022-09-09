import React, { useState } from "react";
import Head from "next/head";
import OtpForm from "../components/login/OtpForm";
import styles from "../styles/Login.module.css";
import PrimaryButton from "../components/common/buttons/primaryButton/PrimaryButton";
import {
  EmailErrorText,
  SendOptText,
  EmailExampleText,
  EmailLableText,
} from "../utils/constants/loginPageConstants";
import useValidateEmail from "../components/common/customHooks/useValidateEmail";

const Login = () => {
  const [otpform, showOtp] = useState(false);
  const [emailError, setEmailError] = useState("");
  // Custom Hooks
  const [email, handleChange, validateEmail] = useValidateEmail();

  const sentOtp = (e) => {
    e.preventDefault();

    const error = validateEmail(email);

    if (!error) {
      showOtp(true);
    } else {
      setEmailError(error);
    }
  };

  return (
    <div className={styles.backGrnd}>
      <div className={styles.login}>
        <Head>
          <title>STATTY | Login</title>
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className={styles.loginForm}>
          <div className={styles.formLable}>
            {!otpform ? (
              <form>
                <div className="row">
                  <label className={styles.rowChng} htmlFor="email">
                    {EmailLableText} <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    id="email"
                    name="email"
                    required={true}
                    className="form-control"
                    style={{
                      border: `${emailError ? "1px solid #c30d1b" : ""}`,
                    }}
                    // onChange={(e) => setEmail(e.target.value)}
                    onChange={(e) => handleChange(e)}
                  />

                  <p className={styles.example}>{EmailExampleText}</p>
                  {emailError && <p className={styles.error}>{emailError}</p>}
                </div>
                <div className="row justify-content-center">
                  <PrimaryButton
                    data-testid="loginEmail"
                    text={SendOptText}
                    type="submit"
                    onClick={sentOtp}
                  />
                </div>
              </form>
            ) : (
              <OtpForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
