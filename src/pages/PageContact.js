import React from 'react';
import emailjs from 'emailjs-com';

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
          this.setState({ message: result.text });
        },
        (error) => {
          this.setState({ message: error.text });
        }
      );
    event.target.reset();
  };

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.sendEmail}>
            <div>
              <div>
                <input type="text" placeholder="Name" name="name" />
              </div>
              <div>
                <input type="email" placeholder="Email Address" name="email" />
              </div>
              <div>
                <input type="text" placeholder="Subject" name="subject" />
              </div>
              <div>
                <textarea
                  id=""
                  cols="30"
                  rows="8"
                  placeholder="Your message"
                  name="message"
                ></textarea>
              </div>
              <div>
                <input type="submit" value="Send Message"></input>
              </div>
              <div>{this.state.message}</div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PageContact;
