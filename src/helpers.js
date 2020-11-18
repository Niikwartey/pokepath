export const matchLoc = (loc1, loc2) => {
  return (loc1 && loc2) && (loc1.x === loc2.x) && (loc1.y === loc2.y);
}

export const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}