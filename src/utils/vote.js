export const getVoteValues = (isSameVoted, isOppositeVoted) => {
  let diff = -1,
    vote = 0;
  if (!isSameVoted) {
    vote = 1;
    diff = isOppositeVoted ? 2 : 1;
  }
  return { diff, vote };
};
