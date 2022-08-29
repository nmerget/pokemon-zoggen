import { MoveMethodTagType } from './data';

const tempMoveMethods = [
  { method: '1', name: 'LVL' },
  { method: '2', name: 'EGG' },
  { method: '3', name: 'TUT' },
  { method: '4', name: 'T/VM' },
];

const MoveMethodTag = ({ possibleMove }: MoveMethodTagType) => {
  const foundMove = tempMoveMethods.find(
    (tmp) => tmp.method === possibleMove.pokemon_move_method_id,
  );
  return (
    <span
      className={`rounded-full text-xs my-auto px-3 py-1.5 ${
        foundMove?.method === '1'
          ? 'bg-green-100 text-green-600'
          : 'bg-yellow-100 text-yellow-600'
      }`}
    >
      {foundMove?.method === '1' ? possibleMove.level : foundMove?.name}
    </span>
  );
};

export default MoveMethodTag;
