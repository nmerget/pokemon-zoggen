export type TypingBadgeType = {
  text?: string;
  type?: string;
  small?: boolean;
};

const typings = [
  'unknown',
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'plant',
  'electric',
  'psycho',
  'ice',
  'dragon',
  'dark',
  'fairy',
];

export const getType = (searchTyping?: string): string => {
  const type =
    searchTyping === 'grass'
      ? 'plant'
      : searchTyping === 'psychic'
      ? 'psycho'
      : searchTyping;
  let result = 'unknown';
  // eslint-disable-next-line consistent-return
  typings.forEach((typing: string, index: number) => {
    if (index.toString() === type) {
      result = typing;
    }
    if (typing === type) {
      result = index.toString();
    }
  });
  return result;
};
