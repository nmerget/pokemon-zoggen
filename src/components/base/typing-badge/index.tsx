import { getType, TypingBadgeType } from './data';
import './index.css';
import TYPINGS from '../../../data/typings';

function TypingBadge({ type, text, small }: TypingBadgeType) {
  const typeColor = getType(type);
  const typeString =
    TYPINGS.find((t) => t.type_id === type)?.name || -'unknown';

  return (
    <div
      className={`rounded-full border border-neutral-900 p-0.5 bg-opacity-70
    bg-${typeColor}`}
    >
      <div
        className={`flex rounded-full py-0.5 px-0.5 min-w-[40px] bg-${typeColor}`}
      >
        <div
          className={`typing-badge text-shadow text-gray-50 mx-auto ${
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
