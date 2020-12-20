import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import '../styles/PageNotifications.css';
import PageOnboard from './PageOnboard';

class PageNotifications extends React.Component {
    constructor(props){
        super(props);
    };

    viewed = notifId => {
        const updates = {};
        updates[`/notifications/${this.props.uid}/${notifId}/viewed`] = true;
        this.props.firebase.update('/', updates);
    }

    componentDidUpdate(prevProps){
        if(this.props.notifications){
        //if(prevProps.notifications && Object.keys(prevProps.notifications).length != Object.keys(this.props.notifications).length){
            const updates = {};
            updates[`/hasNotifs/${this.props.uid}`] = false;
            this.props.firebase.update('/', updates);
        }
    }

    render(){
        if (!isLoaded(this.props.notifications)) {
            return (<div>Loading...</div>);
        }

        if (!this.props.uid) {
            return <Redirect to="/register" />;
        }

        if (this.props.uid && !this.props.onboarded) {
          return <PageOnboard />
        }

        const notifications = this.props.notifications &&
        Object.keys(this.props.notifications).slice(0).reverse().map(notifId => {
            const notification = this.props.notifications[notifId];
            if(notification && notification.type === "saUpvote"){
                return (
                    <div>
                        <Link className={notification.viewed ? 'light-link' : 'dark-link'}
                        to={`/sa/${notification.questId}/${notification.saId}`}
                        onClick={() => this.viewed(notifId)}>
                            Your SA to Question #{notification.questId} was upvoted by @{notification.username}
                        </Link>
                        <br />
                    </div>
                );
            }
            if(notification && notification.type === "tpUpvote"){
                return (
                    <div>
                        <Link className={notification.viewed ? 'light-link' : 'dark-link'}
                         to={`/tp/${notification.questId}/${notification.tpId}`}
                         onClick={() => this.viewed(notifId)}>
                            Your TP to Question #{notification.questId} was upvoted by @{notification.username}
                        </Link>
                        <br />
                    </div>
                );
            }
            if(notification && notification.type === "saFeedbackUpvote"){
                return (
                    <div>
                        <Link className={notification.viewed ? 'light-link' : 'dark-link'}
                         to={`/sa/${notification.questId}/${notification.saId}#${notification.feedbackId}`}
                         onClick={() => this.viewed(notifId)}>
                            Your feedback to @{notification.author}'s SA to Question #{notification.questId} was upvoted by @{notification.username}
                        </Link>
                        <br />
                    </div>
                );
            }
            if(notification && notification.type === "tpFeedbackUpvote"){
                return (
                    <div>
                        <Link className={notification.viewed ? 'light-link' : 'dark-link'}
                         to={`/tp/${notification.questId}/${notification.tpId}#${notification.feedbackId}`}
                         onClick={() => this.viewed(notifId)}>
                            Your feedback to @{notification.author}'s TP to Question #{notification.questId} was upvoted by @{notification.username}
                        </Link>
                        <br />
                    </div>
                );
            }
            if(notification && notification.type === "saFeedback"){
                return (
                    <div>
                        <Link className={notification.viewed ? 'light-link' : 'dark-link'}
                         to={`/sa/${notification.questId}/${notification.saId}#${notification.feedbackId}`}
                         onClick={() => this.viewed(notifId)}>
                            @{notification.username} gave feedback to your SA to Question #{notification.questId}
                        </Link>
                        <br />
                    </div>
                );
            }
            if(notification && notification.type === "tpFeedback"){
                return (
                    <div>
                        <Link className={notification.viewed ? 'light-link' : 'dark-link'}
                         to={`/tp/${notification.questId}/${notification.tpId}#${notification.feedbackId}`}
                         onClick={() => this.viewed(notifId)}>
                            @{notification.username} gave feedback to your TP to Question #{notification.questId}
                        </Link>
                        <br />
                    </div>
                );
            }
            return;

        });
        return(
            <p>{notifications}</p>
        );
    }
}

const mapStateToProps = (state, _props) => {
    const notifications = state.firebase.data.notifications;
    return { notifications };
};

export default compose(
    withRouter,
    firebaseConnect(props => [
      {
        path: '/notifications/' + props.uid,
        storeAs: 'notifications'
      },
    ]),
    connect(mapStateToProps)
)(PageNotifications);
