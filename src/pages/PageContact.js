/** @jsx jsx */

import { jsx } from 'theme-ui';
import React from 'react';
import emailjs from 'emailjs-com';
import TextareaAutosize from 'react-textarea-autosize';

const ContactSx = {
  position: 'relative',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '50px',
  marginBottom: '50px',
  width: '500px',
  height: 'auto',
  fontFamily: 'Open-Sans',
  backgroundColor: 'lightGrey',
  border: '2px solid black',

  '.contact-title': {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '25px',
  },

  '.contact-label': {
    marginTop: '10px',
    marginLeft: '60px',
  },

  '.contact-input': {
    marginRight: '60px',
    marginLeft: '60px',
    paddingLeft: '10px',
    fontFamily: 'Open-Sans',
    width: 'calc(100% - 120px)',
    height: '35px',
    lineHeight: '35px',
    border: '1px solid #000000',
  },

  '.contact-textarea': {
    width: 'calc(100% - 120px)',
    marginLeft: '60px',
    paddingRight: '10px',
    paddingLeft: '10px',
    resize: 'vertical',
    lineHeight: '25px',
    fontFamily: 'Open-Sans',
    border: '1px solid #000000',
  },

  '.contact-submit': {
    marginTop: '10px',
    marginBottom: '20px',
    fontFamily: 'Open-Sans',
    width: '150px',
    marginRight: 'calc(50% - 75px)',
    marginLeft: 'calc(50% - 75px)',
    height: '35px',
    border: '1px solid #000000',
    backgroundColor: 'orange',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'darkOrange',
    },
  },
};

class PageContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  sendEmail = (event) => {
    event.preventDefault();
    emailjs
      .sendForm(
        'gmail',
        'template_0ifnav8',
        event.target,
        'user_YXaia2bamCLj7NUGhcG27'
      )
      .then(
        (result) => {
          this.setState({ message: "Message sent!" });
        },
        (error) => {
          this.setState({ message: error.text });
        }
      );
    event.target.reset();
  };

  render() {
    return (
      <div sx={ContactSx}>
        <div className="contact-title">Contact Us</div>
        <form onSubmit={this.sendEmail}>
          <div className="contact-label">Name</div>
          <input
            type="text" 
            name="name" 
            className="contact-input"
          />
          <div className="contact-label">Email Address</div>
          <input
            type="email"
            name="email"
            className="contact-input"
          />
          <div className="contact-label">Subject</div>
          <input
            type="text" 
            name="subject"
            className="contact-input"
          />
          <div className="contact-label">Message</div>
          <TextareaAutosize
            minRows={4}
            name="message"
            className="contact-textarea"
          />
          <input
            className="contact-submit"
            type="submit" 
            value="Send Message" 
          />
        </form>
        <div>{this.state.message}</div>
      </div>
    );
  }
}

export default PageContact;
