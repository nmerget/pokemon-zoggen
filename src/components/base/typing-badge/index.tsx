import { getType, TypingBadgeType } from "./data";
import "./index.css";

const TypingBadge = ({ type, text, small }: TypingBadgeType) => {
  const typeString = getType(type);

  return (
    <div
      className={`rounded-full border border-neutral-900 p-0.5 bg-opacity-70
    bg-${typeString}`}
    >
      <div className={`rounded-full py-0.5 px-2 bg-${typeString}`}>
        <div className={`text-shadow text-gray-50 ${small ? "text-xs" : ""}`}>
          {text ? text : type != "-1" ? typeString : "---"}
        </div>
      </div>
    </div>
  );
};

export default TypingBadge;
