// diff: what TP/feedback total score is added/subtracted by, either -1, 1, or 2
// vote: the user's personal score for the TP/feedbac, either 0/1
// these values must allbe negated if user is downvoting
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

  // give the TP creator a notification
  if (!isUpvoted && uid !== tp.creator) {
    const notificationId = firebase.push(`/notifications/${tp.creator}`).key;
    updates[`/notifications/${tp.creator}/${notificationId}`] = {
      questId,
      tpId,
      username,
      viewed: false,
      type: 'tpUpvote',
      date: Date(),
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

// gets user's current vote value for a TP/feedback
export const currentVotes = (item, uid) => {
  const isUpvoted = item && item.users && item.users[uid] === 1;
  const isDownvoted = item && item.users && item.users[uid] === -1;

  return {isUpvoted, isDownvoted};
}



