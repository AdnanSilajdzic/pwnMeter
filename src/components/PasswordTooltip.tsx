import { useEffect } from "react";
import getPasswordMessage from "../helpers/getPasswordMessage";

type propsTypes = {
  messages?: string[];
  close: Function;
};

const PasswordTooltip = (props: propsTypes) => {
  const handleClickOutside = (event: MouseEvent) => {
    const tooltip = document.getElementById("tooltip");
    if (tooltip && !tooltip.contains(event.target as Node)) {
      props.close();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="pwn-tooltip" id="tooltip">
      {/* suggestions for weak passwords */}
      {props.messages?.length ? (
        <ul className="text-xs list-disc list-inside gap-2 flex flex-col">
          {props.messages?.map((suggestion: string, index: number) => {
            return (
              <li key={index} hidden={!getPasswordMessage(suggestion)}>
                {getPasswordMessage(suggestion)}
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default PasswordTooltip;
