import React from 'react';
import './Welcome.css';
const Welcome = () => {
    return (
        <div className='welcomeTitle'>
            <h1>Welcome to SNAlyzer!</h1>
            <br></br>
            <p><a className="welcome" href="/about">Get Started...!</a></p>
        </div>
    );
};

export default Welcome;