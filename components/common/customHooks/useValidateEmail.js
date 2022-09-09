import { useState } from "react";
import { EmailErrorText } from "../../../utils/constants/loginPageConstants";

const useValidateEmail = () => {
  const [email, setEmail] = useState("");

  const handleChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const validateEmail = (userEmail) => {
    if (!userEmail.includes("@publicissapient.com")) {
      return EmailErrorText;
    }
    return null;
  };

  return [email, handleChange, validateEmail];
};

export default useValidateEmail;
