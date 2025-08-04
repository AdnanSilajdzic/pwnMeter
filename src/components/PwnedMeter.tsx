import { useState } from "react";
import PasswordTooltip from "./PasswordTooltip";
import informationCircleIcon from "../assets/informationCircle.svg";

import usePwnMeter from "../hooks/usePwnMeter";

type propsTypes = {
  password: string;
  callback?: Function;
  disablePwnd?: boolean;
  debounceTime?: number;
  disableTooltip?: boolean;
  hideWarning?: boolean;
};

const PwnMeter = (props: propsTypes) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { usePasswordStrength } = usePwnMeter({
    callback: props.callback,
    disablePwnd: props.disablePwnd,
    debounceTime: props.debounceTime,
  });

  const result = usePasswordStrength(props.password.trim());

  return (
    <>
      <div
        className={`pwn-meter
        ${result?.score === 0 && "bad-password"}
        ${result?.score === 1 && "weak-password"}
        ${result?.score === 2 && "average-password"}
        ${result?.score === 3 && "good-password"}
        ${result?.score === 4 && "great-password"}
    `}
      >
        {/* 4 bars indicating password strength */}
        <div className={`pwn-bar ${result?.score == 0 || result?.score ? "active" : ""}`}></div>
        <div className={`pwn-bar ${result?.score && result?.score > 1 ? "active" : ""}`}></div>
        <div className={`pwn-bar ${result?.score && result?.score > 2 ? "active" : ""}`}></div>
        <div className={`pwn-bar ${result?.score && result?.score > 3 ? "active" : ""}`}></div>

        {/* tooltip */}
        {!props.disableTooltip && (
          <img
            src={informationCircleIcon}
            className="pwn-information-icon"
            alt="suggestions"
            id="suggestions-icon"
            title="suggestions"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(!showTooltip);
            }}
          />
        )}
        {showTooltip && (
          <PasswordTooltip close={() => setShowTooltip(false)} messages={result?.feedback?.suggestions} />
        )}
      </div>

      {/* warning for critical passwords */}
      <p className="pwn-warning" hidden={props.hideWarning}>
        {result?.feedback?.warning && (
          <>
            {result.feedback.warning.includes("pwned") &&
              "Warning! This password was found in a data breach and is not secure."}
            {result.feedback.warning.includes("similarToCommon") &&
              "Warning! This password is similar to a commonly used cracked password."}
          </>
        )}
      </p>
    </>
  );
};

export default PwnMeter;
