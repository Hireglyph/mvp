import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';

class PageConfirmEmail extends React.Component {
  constructor(props) {
    super(props);
    const { email } = props;

    this.state = {
      loading: false,
      resent: false,
      error:
        `A verification email has been sent to your email address, ${email}. If you don't see it, check your spam folder.`,
    }
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
    const { isConfirmationLink, loading, resent, verified } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (resent) {
      return <div>Email sent!</div>
    }

    // if we haven't resent a confirmation email, we don't show the button anymore
    if (!isConfirmationLink && !resent) {
      return (
        <button onClick={this.resendConfirmationEmail}>
          Resend verification email
        </button>
      );
    }
  };

  render() {
    return (
      <div>
        <h1>Confirm Your Email</h1>
        <br />
        <div>{this.state.error}</div>
        <br />
        <br />
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
