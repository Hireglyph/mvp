export const tpDelete = ({ firebase, questId, tpId, uid }) => {
  const updates = {};
  // make initial/approach/solution and username '[deleted]'
  updates[`/tps/${questId}/${tpId}/initial`] = '[deleted]';
  updates[`/tps/${questId}/${tpId}/approach`] = '[deleted]';
  updates[`/tps/${questId}/${tpId}/solution`] = '[deleted]';
  updates[`/tps/${questId}/${tpId}/username`] = '[deleted]';
  // make creator (aka uid of the TP) null
  updates[`/tps/${questId}/${tpId}/creator`] = null;
  
  // clear the user's tpHistory of the TP completely
  updates[`tpHistory/${uid}/${tpId}`] = null;

  firebase.update('/', updates);
};

export const feedbackDelete = ({ firebase, tpId, feedbackId, uid }) => {
  const updates = {};

  // make feedback and username '[deleted]'
  updates[`/feedbacks/${tpId}/${feedbackId}/feedback`] = '[deleted]';
  updates[`/feedbacks/${tpId}/${feedbackId}/username`] = '[deleted]';
  // make creator (aka uid of the feedback) null
  updates[`/feedbacks/${tpId}/${feedbackId}/creator`] = null;

  // clear the user's feedbackHistory of the feedback completely
  updates[`feedbackHistory/${uid}/${feedbackId}`] = null;

  firebase.update('/', updates);
};

export const replyDelete = ({
  firebase,
  tpId,
  replyFeedbackID,
  replyId,
  uid,
}) => {
  const updates = {};

  // make reply and username '[deleted]'
  updates[`/replies/${tpId}/${replyFeedbackID}/${replyId}/reply`] = '[deleted]';
  updates[`/replies/${tpId}/${replyFeedbackID}/${replyId}/username`] =
    '[deleted]';
  // make creator (aka uid of the reply) null
  updates[`/replies/${tpId}/${replyFeedbackID}/${replyId}/creator`] = null;

  // clear the user's replyHistory of the reply completely
  updates[`replyHistory/${uid}/${replyId}`] = null;

  firebase.update('/', updates);
};
