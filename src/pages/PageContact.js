/** @jsx jsx */

import { jsx } from 'theme-ui';
import React from 'react';
import emailjs from 'emailjs-com';
import TextareaAutosize from 'react-textarea-autosize';
import { ReactTitle } from 'react-meta-tags';

import { FormSx } from 'theme/FormStyle';

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
      <div sx={FormSx}>
        <ReactTitle title="Contact Us | Hireglyph"/>
        <div className="page-container">
          <div className="form-title">Contact Us</div>
          <div className="form-small-text">
            Fill out this form or email us at admin@hireglyph.com
            directly to reach us!
          </div>
          <form onSubmit={this.sendEmail}>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email Address"
              required
            />
            <input
              type="text"
              name="subject"
              className="form-input"
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
              className="form-btn"
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
