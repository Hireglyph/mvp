import React from 'react';
import emailjs from 'emailjs-com';

export default function PageContact() {
  
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('gmail', 'template_0ifnav8', e.target, 'user_YXaia2bamCLj7NUGhcG27')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
      e.target.reset();
  }

  return(
    <div>
      <div>
        <form onSubmit={sendEmail}>
          <div>
            <div>
              <input type="text" placeholder="Name" name="name"/>
            </div>
            <div>
              <input type="email" placeholder="Email Address" name="email"/>
            </div>
            <div>
              <input type="text" placeholder="Subject" name="subject"/>
            </div>
            <div>
              <textarea id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
            </div>
            <div>
              <input type="submit" value="Send Message"></input>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}