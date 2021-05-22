/** @jsx jsx */

import { jsx } from 'theme-ui';
import React from 'react';
import emailjs from 'emailjs-com';
import TextareaAutosize from 'react-textarea-autosize';
import { ReactTitle } from 'react-meta-tags';

const ContactSx = {
  display: 'flex',

  '.page-container': {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
    marginBottom: '50px',
    width: '425px',
    maxWidth: '80%',
    height: 'auto',
    fontFamily: 'Open-Sans',
    backgroundColor: 'white',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
  },

  '.contact-title': {
    fontFamily: 'Open-Sans',
    marginRight: '60px',
    marginLeft: '60px',
    marginTop: '30px',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '25px',
  },

  '.intro-message': {
    marginRight: '60px',
    marginLeft: '60px',
    fontFamily: 'Open-Sans',
    fontSize: '12px',
    lineHeight: '16px',
    color: '#464646',
    marginBottom: '10px',
  },

  '.contact-input': {
    marginRight: '60px',
    marginLeft: '60px',
    paddingLeft: '10px',
    fontFamily: 'Open-Sans',
    width: 'calc(100% - 120px)',
    height: '35px',
    lineHeight: '35px',
    fontSize: '16px',
    border: '1px solid #000000',
    boxSizing: 'border-box',
    marginBottom: '10px',
  },

  '.contact-textarea': {
    width: 'calc(100% - 120px)',
    marginLeft: '60px',
    paddingRight: '10px',
    paddingLeft: '10px',
    resize: 'vertical',
    paddingTop: '5px',
    paddingBottom: '5px',
    lineHeight: '20px',
    fontSize: '16px',
    fontFamily: 'Open-Sans',
    border: '1px solid #000000',
    boxSizing: 'border-box',
    marginBottom: '10px',
  },

  '.contact-submit': {
    marginBottom: '10px',
    fontFamily: 'Open-Sans',
    height: '35px',
    backgroundColor: '#5A3FFF',
    width: 'calc(100% - 120px)',
    color: 'white',
    marginLeft: '60px',
    paddingRight: '10px',
    border: '0',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#8D73FF',
    },
  },

  '.contact-message': {
    color: 'red',
    marginLeft: '60px',
    marginRight: '60px',
    textAlign: 'center',
    fontSize: '12px',
    lineHeight: '16px',
    marginBottom: '50px',
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
        <ReactTitle title="Contact Us | Hireglyph"/>
        <div className="page-container">
          <div className="contact-title">Contact Us</div>
          <div className="intro-message">
            Fill out this form or email us at admin@hireglyph.com
            directly to reach us!
          </div>
          <form onSubmit={this.sendEmail}>
            <input
              type="text"
              name="name"
              className="contact-input"
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              className="contact-input"
              placeholder="Email Address"
              required
            />
            <input
              type="text"
              name="subject"
              className="contact-input"
              placeholder="Subject Line"
              required
            />
            <TextareaAutosize
              minRows={4}
              name="message"
              className="contact-textarea"
              placeholder="Message"
              required
            />
            <input
              className="contact-submit"
              type="submit"
              value="Send Message"
            />
          </form>
          <div className="contact-message">{this.state.message}</div>
        </div>
      </div>
    );
  }
}

export default PageContact;
