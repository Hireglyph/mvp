export const getVoteValues = (isSameVoted, isOppositeVoted) => {
  let diff = -1,
    vote = 0;
  if (!isSameVoted) {
    vote = 1;
    diff = isOppositeVoted ? 2 : 1;
  }
  return { diff, vote };
};

export const upvoteTp = ({
  firebase,
  isUpvoted,
  isDownvoted,
  questId,
  tp,
  tpId,
  uid,
  username,
}) => {
  const updates = {};
  const { diff, vote } = getVoteValues(isUpvoted, isDownvoted);

  if (!isUpvoted) {
    const notificationId = firebase.push(`/notifications/${tp.creator}`).key;
    updates[`/notifications/${tp.creator}/${notificationId}`] = {
      questId,
      tpId,
      username,
      viewed: false,
      type: 'tpUpvote',
    };
    updates[`/hasNotifs/${tp.creator}`] = true;
  }

  updates[`/tps/${questId}/${tpId}/total`] = tp.total + diff;
  updates[`/tpHistory/${tp.creator}/${tpId}/total`] = tp.total + diff;
  updates[`/tps/${questId}/${tpId}/users/${uid}`] = vote;
  firebase.update('/', updates);
};

export const downvoteTp  = ({
  firebase,
  isUpvoted,
  isDownvoted,
  questId,
  tp,
  tpId,
  uid,
}) => {
  const { diff, vote } = getVoteValues(isDownvoted, isUpvoted);

  const updates = {};
  updates[`/tps/${questId}/${tpId}/total`] = tp.total - diff;
  updates[`/tpHistory/${tp.creator}/${tpId}/total`] = tp.total - diff;
  updates[`/tps/${questId}/${tpId}/users/${uid}`] = -1 * vote;
  firebase.update("/", updates);
};
