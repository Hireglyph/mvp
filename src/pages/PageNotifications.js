/** @jsx jsx */

import React from 'react';
import { jsx } from 'theme-ui';
import { withRouter } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ReactTitle } from 'react-meta-tags';
import Moment from 'react-moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faComments } from '@fortawesome/free-solid-svg-icons';

import Loading from 'components/Loading';

const NotifSx = {
  '.page-container': {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
    marginBottom: '50px',
    width: '700px',
    height: 'auto',
    fontFamily: 'Open-Sans',
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
    padding: '25px',
  },

  '.notif-title-box': {
    paddingBottom: '10px',
    fontSize: '25px',
  },

  '.box': {
    display: 'flex',
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '10px',
    alignItems: 'center',
  },

  '.box-viewed': {
    color: 'placeholderGray',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'lightPurpleGray',
    },
  },

  '.box-unviewed': {
    color: 'black',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'lightPurpleGray',
    },
  },

  '.time-text': {
    fontSize: '10px',
    color: 'placeholderGray',
  },

  '.icon-container': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '15px',
    marginRight: '15px',
    height: '40px',
    width: '40px',
    backgroundColor: 'lightPurpleGray',
    borderRadius: '50%',
    textAlign: 'center',
  },

  '.caret-icon': {
    fontSize: '40px',
    color: 'easyGreen',
  },

  '.comments-icon': {
    fontSize: '22px',
    color: 'blue',
    verticalAlign: 'middle',
  },

  '.semi-bold': {
    fontWeight: 600,
  },

  '.italic': {
    fontFamily: 'Open-Sans-Italic',
  },

  '.purple-dot': {
    marginLeft: 'auto',
    marginRight: '10px',
    width: '10px',
    height: '10px',
    backgroundColor: 'purple',
    borderRadius: '50%',
  }
};

class PageNotifications extends React.Component {
  // if notification clicked on, set its "viewed" child object to true
  viewed = (notifId) => {
    const updates = {};
    updates[`/notifications/${this.props.uid}/${notifId}/viewed`] = true;
    this.props.firebase.update("/", updates);
  };

  componentDidUpdate(prevProps) {
    if (this.props.notifications) {
      const updates = {};
      updates[`/hasNotifs/${this.props.uid}`] = false;
      this.props.firebase.update("/", updates);
    }
  }

  render() {
    if (!isLoaded(this.props.notifications) || !isLoaded(this.props.questions)) {
      return <Loading />;
    }

    const { questions } = this.props;

    const notifications =
      this.props.notifications ? (
        Object.keys(this.props.notifications)
          .slice(0)
          .reverse()
          .map((notifId) => {
            const notification = this.props.notifications[notifId];
            // user's tp got upvoted notification
            if (notification && notification.type === "tpUpvote") {
              return (
                <Link
                    className="notif-link"
                    to={`/tp/${notification.questId}/${notification.tpId}`}
                    onClick={() => this.viewed(notifId)}
                    key={notifId}
                  >
                  <div
                    className={notification.viewed ? 'box box-viewed' : 'box box-unviewed'}
                  >
                    <div className="icon-container">
                      <FontAwesomeIcon icon={faCaretUp} className="caret-icon"/>
                    </div>
                    <div>
                      <span className="semi-bold">@{notification.username} </span>
                      upvoted your
                      <span className="semi-bold"> TP </span>
                      to
                      <span className="italic"> {questions[notification.questId].title}</span>
                      <div className="time-text">
                        <Moment fromNow>{notification.date}</Moment>
                      </div>
                    </div>
                    {!notification.viewed && <div className="purple-dot"></div>}
                  </div>
                </Link>
              );
            }
            // user's feedback got upvoted notification
            if (notification && notification.type === "tpFeedbackUpvote") {
              return (
                <Link
                    className="notif-link"
                    smooth to={`/tp/${notification.questId}/${notification.tpId}#${notification.feedbackId}`}
                    onClick={() => this.viewed(notifId)}
                    key={notifId}
                  >
                  <div
                    className={notification.viewed ? 'box box-viewed' : 'box box-unviewed'}
                  >
                    <div className="icon-container">
                      <FontAwesomeIcon icon={faCaretUp} className="caret-icon"/>
                    </div>
                    <div>
                      <span className="semi-bold">@{notification.username} </span>
                      upvoted your feedback to
                      <span className="semi-bold"> @{notification.author}</span>
                      's TP to
                      <span className="italic"> {questions[notification.questId].title}</span>
                      <div className="time-text">
                        <Moment fromNow>{notification.date}</Moment>
                      </div>
                    </div>
                    {!notification.viewed && <div className="purple-dot"></div>}
                  </div>
                </Link>
              );
            }
            // user's tp got a feedback notification
            if (notification && notification.type === "tpFeedback") {
              return (
                <Link
                    className="notif-link"
                    smooth to={`/tp/${notification.questId}/${notification.tpId}#${notification.feedbackId}`}
                    onClick={() => this.viewed(notifId)}
                    key={notifId}
                  >
                  <div
                    className={notification.viewed ? 'box box-viewed' : 'box box-unviewed'}
                  >
                    <div className="icon-container">
                      <FontAwesomeIcon icon={faComments} className="comments-icon"/>
                    </div>
                    <div>
                      <span className="semi-bold">@{notification.username} </span>
                      left
                      <span className="semi-bold"> feedback </span>
                      for your TP to
                      <span className="italic"> {questions[notification.questId].title}</span>
                      <div className="time-text">
                        <Moment fromNow>{notification.date}</Moment>
                      </div>
                    </div>
                    {!notification.viewed && <div className="purple-dot"></div>}
                  </div>
                </Link>
              );
            }
            // user's feedback/reply got a reply notification
            if (notification && notification.type === "reply") {
              return (
                <Link
                    className="notif-link"
                    smooth to={`/tp/${notification.questId}/${notification.tpId}#${notification.replyId}`}
                    onClick={() => this.viewed(notifId)}
                    key={notifId}
                  >
                  <div
                    className={notification.viewed ? 'box box-viewed' : 'box box-unviewed'}
                  >
                    <div className="icon-container">
                      <FontAwesomeIcon icon={faComments} className="comments-icon"/>
                    </div>
                    <div>
                      <span className="semi-bold">@{notification.username} </span>
                      replied to you on
                      <span className="semi-bold"> @{notification.author}</span>
                      's TP to
                      <span className="italic"> {questions[notification.questId].title}</span>
                      <div className="time-text">
                        <Moment fromNow>{notification.date}</Moment>
                      </div>
                    </div>
                    {!notification.viewed && <div className="purple-dot"></div>}
                  </div>
                </Link>
              );
            }
            // user's reply was upvoted notification
            if (notification && notification.type === "replyUpvote") {
              return (
                <Link
                    className="notif-link"
                    smooth to={`/tp/${notification.questId}/${notification.tpId}#${notification.replyId}`}
                    onClick={() => this.viewed(notifId)}
                    key={notifId}
                  >
                  <div
                    className={notification.viewed ? 'box box-viewed' : 'box box-unviewed'}
                  >
                    <div className="icon-container">
                      <FontAwesomeIcon icon={faCaretUp} className="caret-icon"/>
                    </div>
                    <div>
                      <span className="semi-bold">@{notification.username} </span>
                      upvoted your
                      <span className="semi-bold"> reply </span>
                      to
                      <span className="semi-bold"> @{notification.author}</span>
                      's TP to
                      <span className="italic"> {questions[notification.questId].title}</span>
                      <div className="time-text">
                        <Moment fromNow>{notification.date}</Moment>
                      </div>
                    </div>
                    {!notification.viewed && <div className="purple-dot"></div>}
                  </div>
                </Link>
              );
            }
            return null;
          })
      ) : (
        // message if user has no notifications
        <div className="message-section">
          You have no notifications. You will receive a notification when one
          of your TPs gets upvoted or receives feedback!
        </div>
      );
    return (
      <div sx={NotifSx}>
        <ReactTitle title="Notifications | Hireglyph"/>
        <div className="page-container">
          <div className="notif-title-box">Notifications</div>
          {notifications}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notifications:  state.firebase.data.notifications
  };
};

export default compose(
  withRouter,
  firebaseConnect((props) => [
    {
      path: '/notifications/' + props.uid,
      storeAs: 'notifications',
    },
  ]),
  connect(mapStateToProps)
)(PageNotifications);
