export const tpDelete  = ({
  firebase,
  questId,
  tpId,
  uid,
  }) => {
  const updates = {};

  updates[`/tps/${questId}/${tpId}/initial`] = "[deleted]";
  updates[`/tps/${questId}/${tpId}/approach`] = "[deleted]";
  updates[`/tps/${questId}/${tpId}/solution`] = "[deleted]";
  updates[`/tps/${questId}/${tpId}/username`] = "[deleted]";
  updates[`/tps/${questId}/${tpId}/creator`] = null;

  updates[`tpHistory/${uid}/${tpId}`] = null;

  firebase.update("/", updates);
};

export const feedbackDelete  = ({
  firebase,
  tpId,
  feedbackId,
  uid,
  }) => {
  const updates = {};

  updates[`/feedbacks/${tpId}/${feedbackId}/feedback`] = "[deleted]";
  updates[`/feedbacks/${tpId}/${feedbackId}/username`] = "[deleted]";
  updates[`/feedbacks/${tpId}/${feedbackId}/creator`] = null;

  updates[`feedbackHistory/${uid}/${feedbackId}`] = null;

  firebase.update("/", updates);
};

export const replyDelete  = ({
  firebase,
  tpId,
  replyFeedbackID,
  replyId,
  uid,
  }) => {
  const updates = {};

  updates[`/replies/${tpId}/${replyFeedbackID}/${replyId}/reply`] = "[deleted]";
  updates[`/replies/${tpId}/${replyFeedbackID}/${replyId}/username`] = "[deleted]";
  updates[`/replies/${tpId}/${replyFeedbackID}/${replyId}/creator`] = null;

  updates[`replyHistory/${uid}/${replyId}`] = null;

  firebase.update("/", updates);
};
