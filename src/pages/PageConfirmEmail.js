/** @jsx jsx */

import { jsx } from 'theme-ui';
import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Loading from 'components/Loading';
import { FormSx } from 'theme/FormStyle';

class PageConfirmEmail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      resent: false,
      error: 'A verification email has been sent to the address you registered with. Please check your inbox and follow the instructions to verify your email address.',
      error2: 'If you have not received the verification email, please check your "Spam" and "Promotions" folder. You can also click the resend button below to have another email sent to you.',
    };
  }

  resendConfirmationEmail = async () => {
    const { auth } = this.props;
    this.setState({ loading: true });
    
    try {
      await auth().currentUser.sendEmailVerification();
      this.setState({
        error: 'Verification email resent. Please check your inbox and spam folder and follow the instructions to verify your email address.',
        error2: '',
        loading: false,
        resent: true,
      });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  renderButton = () => {
    const { resent } = this.state;

    // display message if email resent
    if (resent) {
      return <div className="confirm-email-resent">Email sent!</div>;
    }

    // display button to resend confirmation email, IF not already resent
    if (!resent) {
      return (
        <button
          className="confirm-email-btn"
          onClick={this.resendConfirmationEmail}
        >
          Resend verification email
        </button>
      );
    }
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div sx={FormSx}>
        <div className="page-container" id="confirm-email-container">
          <div className="confirm-email-title">An email has been sent!</div>
          <div className="notif-text" id="confirm-text">{this.state.error}<br/><br/>{this.state.error2}</div>
          <br/>
          {this.renderButton()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    auth: props.firebase.auth,
    email: state.firebase.auth.email,
  };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(PageConfirmEmail);
