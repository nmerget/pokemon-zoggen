import { getType, TypingBadgeType } from './data';
import './index.css';

function TypingBadge({ type, text, small }: TypingBadgeType) {
  const typeString = getType(type);

  return (
    <div
      className={`rounded-full border border-neutral-900 p-0.5 bg-opacity-70
    bg-${typeString}`}
    >
      <div
        className={`flex rounded-full py-0.5 px-0.5 min-w-[40px] bg-${typeString}`}
      >
        <div
          className={`text-shadow text-gray-50 mx-auto ${
            small ? 'text-xs' : ''
          }`}
        >
          {text || (type !== '-1' ? typeString : '---')}
        </div>
      </div>
    </div>
  );
}

export default TypingBadge;
