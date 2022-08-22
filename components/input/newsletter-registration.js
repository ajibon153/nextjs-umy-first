import React from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailInputRef = React.useRef();

  function registrationHandler(e) {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    fetch(`/api/newsletter`, {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application.json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler} method='POST'>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
