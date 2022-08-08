export type TypingBadgeType = {
  text?: string;
  type: string;
};

export const getType = (type: string): string => {
  if (type === "1") {
    return "normal";
  }
  if (type === "2") {
    return "fighting";
  }
  if (type === "3") {
    return "flying";
  }
  if (type === "4") {
    return "poison";
  }
  if (type === "5") {
    return "ground";
  }
  if (type === "6") {
    return "rock";
  }
  if (type === "7") {
    return "bug";
  }
  if (type === "8") {
    return "ghost";
  }
  if (type === "9") {
    return "steel";
  }
  if (type === "10") {
    return "fire";
  }
  if (type === "11") {
    return "water";
  }
  if (type === "12") {
    return "plant";
  }
  if (type === "13") {
    return "electric";
  }
  if (type === "14") {
    return "psycho";
  }
  if (type === "15") {
    return "ice";
  }
  if (type === "16") {
    return "dragon";
  }
  if (type === "17") {
    return "dark";
  }
  if (type === "18") {
    return "fairy";
  }
  return "unknown";
};
