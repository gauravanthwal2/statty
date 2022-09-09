import React, { useEffect, useState } from "react";
import PrimaryButton from "../common/buttons/primaryButton/PrimaryButton";
import styles from "../../styles/Login.module.css";
import { useRouter } from "next/router";
import {
  OptErrorText,
  OtpLableText,
  LoginButtonText,
} from "../../utils/constants/loginPageConstants";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/login/loginSlice";
import useValidateOtp from "../common/customHooks/useValidateOtp";


const OtpForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [otpError, setOtpError] = useState("");

  const  [enteredOtp, handleChange, validateOtp, resetOtpField] = useValidateOtp();

  const loggedIn = (e) => {
    e.preventDefault();
    const [isCorrectOtp, error] = validateOtp(enteredOtp);

    if (isCorrectOtp) {
      router.push("/");
      if (typeof window !== "undefined") {
        dispatch(loginUser());
      }
    } else {
      setOtpError(error);
      resetOtpField();
    }
  };

  return (
    <div>
      <div>
        <div>
          <form>
            <div className="row">
              <label className={styles.rowChng} htmlFor="enterOtp">
                {OtpLableText}
                <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={enteredOtp}
                id="enterOtp"
                name="enterOtp"
                className="form-control mb-2"
                placeholder=""
                onChange={(e) =>handleChange(e)}
                style={{
                  border: `${otpError ? "1px solid #c30d1b" : ""}`,
                }}
              />
              {otpError && <p className={styles.error}>{otpError}</p>}
            </div>
            <div className="row justify-content-center  mt-3">
              <PrimaryButton
                data-testid="submit"
                text={LoginButtonText}
                type="submit"
                onClick={loggedIn}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default OtpForm;
