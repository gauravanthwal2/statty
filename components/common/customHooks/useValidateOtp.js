import { useState } from "react";
import { OptErrorText } from "../../../utils/constants/loginPageConstants";

const OTP = 1234;

const useValidateOtp = () => {
  const [enteredOtp, setEnteredOtp] = useState(""); 

  const handleChange = ({target: {value}})=>{
    setEnteredOtp(value);
  }
  
  const resetOtpField = ()=>{
    setEnteredOtp("");
  }
  const validateOtp = (enteredOpt) => {
    if (Number(enteredOpt) === OTP) {
      return [true, null];
    } else {
      return [false, OptErrorText];
    }
  };

  return [enteredOtp, handleChange, validateOtp,resetOtpField];
};

export default useValidateOtp;
