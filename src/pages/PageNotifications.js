/** @jsx jsx */

import React from 'react';
import { jsx } from 'theme-ui';
import { withRouter } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Loading from 'components/Loading';

const NotifSx = {
  display: 'flex',

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
  },

  '.notif-title-box': {
    border: '1px solid black',
    padding: '9px',
    width: '140px',
    backgroundColor: 'orange',
    fontSize: '20px',
  },

  '.notif-link': {
    textDecoration: 'none',
  },

  '.box-viewed': {
    width: '100%',
    padding: '5px',
    border: '1px solid black',
    backgroundColor: 'lightGrey',
    color: '#3E3C3C',
    '&:hover': {
      border: '2px solid orange',
    },
  },

  '.box-unviewed': {
    width: '100%',
    padding: '5px',
    border: '1px solid black',
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
      border: '2px solid orange',
    },
  },
};

class PageNotifications extends React.Component {
  viewed = (notifId) => {
    const updates = {};
    updates[`/notifications/${this.props.uid}/${notifId}/viewed`] = true;
    this.props.firebase.update("/", updates);
  };

  componentDidUpdate(prevProps) {
    if (this.props.notifications) {
      //if(prevProps.notifications && Object.keys(prevProps.notifications).length != Object.keys(this.props.notifications).length){
      const updates = {};
      updates[`/hasNotifs/${this.props.uid}`] = false;
      this.props.firebase.update("/", updates);
    }
  }

  render() {
    if (!isLoaded(this.props.notifications)) {
      return <Loading />;
    }

    const notifications =
      this.props.notifications &&
      Object.keys(this.props.notifications)
        .slice(0)
        .reverse()
        .map((notifId) => {
          const notification = this.props.notifications[notifId];
          if (notification && notification.type === "tpUpvote") {
            return (
              <div key={notifId}>
                <Link
                  className="notif-link"
                  to={`/tp/${notification.questId}/${notification.tpId}`}
                  onClick={() => this.viewed(notifId)}
                >
                  <div className={notification.viewed ? "box-viewed" : "box-unviewed"}>
                    @{notification.username} upvoted your TP to Question
                    #{notification.questId}
                  </div>
                </Link>
              </div>
            );
          }
          if (notification && notification.type === "tpFeedbackUpvote") {
            return (
              <div key={notifId}>
                <Link
                  className="notif-link"
                  to={`/tp/${notification.questId}/${notification.tpId}#${notification.feedbackId}`}
                  onClick={() => this.viewed(notifId)}
                >
                  <div className={notification.viewed ? 'box-viewed' : 'box-unviewed'}>
                    @{notification.username} upvoted your feedback to
                    @{notification.author}'s TP to Question #{notification.questId}
                  </div>
                </Link>
              </div>
            );
          }
          if (notification && notification.type === "tpFeedback") {
            return (
              <div key={notifId}>
                <Link
                  className="notif-link"
                  to={`/tp/${notification.questId}/${notification.tpId}#${notification.feedbackId}`}
                  onClick={() => this.viewed(notifId)}
                >
                  <div className={notification.viewed ? "box-viewed" : "box-unviewed"}>
                    @{notification.username} gave feedback to your TP to Question
                    #{notification.questId}
                  </div>
                </Link>
              </div>
            );
          }
          return null;
        });
    return (
      <div sx={NotifSx}>
        <div className="page-container">
          <div className="notif-title-box">Notifications</div>
          {notifications}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { notifications:  state.firebase.data.notifications };
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
