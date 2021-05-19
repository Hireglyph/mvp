export const getVoteValues = (isSameVoted, isOppositeVoted) => {
  /* diff: what TP/feedback total score is added/subtracted by
  vote: the user's personal score for the TP/feedback
  right now diff is either (-1)/2 and vote is either 0/1
  but these values are all negated if user is downvoting */
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

  if (!isUpvoted && uid !== tp.creator) {
    // give the TP creator a notification
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
  // upvote TP
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

  // downvote TP
  const updates = {};
  updates[`/tps/${questId}/${tpId}/total`] = tp.total - diff;
  updates[`/tpHistory/${tp.creator}/${tpId}/total`] = tp.total - diff;
  updates[`/tps/${questId}/${tpId}/users/${uid}`] = -1 * vote;
  firebase.update("/", updates);
};

export const currentVotes = (item, uid) => {
  // gets user's current vote value for a TP/feedback
  const isUpvoted = item && item.users && item.users[uid] === 1;
  const isDownvoted = item && item.users && item.users[uid] === -1;

  return {isUpvoted, isDownvoted};
}



