/** @jsx jsx */

import { jsx } from 'theme-ui';
import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Loading from 'components/Loading';

const ConfirmEmailSx = {
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '50px',
  marginBottom: '50px',
  width: '400px',
  height: 'auto',
  background: 'lightGrey',
  fontFamily: 'Open-Sans',
  border: '1px solid #000000',

  '.confirm-email-title': {
    marginTop: '20px',
    marginBottom: '10px',
    textAlign: 'center',
    fontSize: '20px',
  },

  '.confirm-email-text': {
    textAlign: 'center',
    marginBottom: '15px',
    marginRight: '20px',
    marginLeft: '20px',
  },

  '.confirm-email-resent': {
    marginBottom: '20px',
    color: 'red',
    textAlign: 'center',
    fontSize: '12px',
  },

  '.confirm-email-button': {
    lineHeight: '15px',
    marginBottom: '20px',
    width: '250px',
    height: '35px',
    fontFamily: 'Open-Sans',
    fontSize: '15px',
    marginRight: 'calc(50% - 125px)',
    marginLeft: 'calc(50% - 125px)',
    backgroundColor: 'orange',
    cursor: 'pointer',
    border: '1px solid #000000',
    '&:hover': {
      backgroundColor: 'darkOrange',
    },
  },
};

class PageConfirmEmail extends React.Component {
  constructor(props) {
    super(props);
    const { email } = props;

    this.state = {
      loading: false,
      resent: false,
      error: `A verification email has been sent to your email address, ${email}. If you don't see it, check your spam folder.`,
    };
  }

  resendConfirmationEmail = async () => {
    const { auth } = this.props;
    this.setState({ loading: true });

    try {
      await auth().currentUser.sendEmailVerification();
      this.setState({
        error:
          'Verification email resent. Please check your inbox and your spam folder.',
        loading: false,
        resent: true,
      });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  renderButton = () => {
    const { loading, resent } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (resent) {
      return <div className="confirm-email-resent">Email sent!</div>;
    }

    if (!resent) {
      return (
        <button
          className="confirm-email-button"
          onClick={this.resendConfirmationEmail}
        >
          Resend verification email
        </button>
      );
    }
  };

  render() {
    return (
      <div sx={ConfirmEmailSx}>
        <div className="confirm-email-title">Email Verification</div>
        <div className="confirm-email-text">{this.state.error}</div>
        {this.renderButton()}
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
