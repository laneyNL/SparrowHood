import React from 'react';
import { Link } from 'react-router-dom';
import splashBanner from '../../app/assets/images/splash-phone.png';
import splashBalloon from '../../app/assets/images/splash-balloon.svg';
import splashVideo from '../../app/assets/videos/splash-video.mp4';

export default class Splash extends React.Component {
  

  render() {

    return (
      <div>
        <nav>
          <div>Robinhood</div>
          <div>Products</div>
          <div>Learn</div>
          <div>Support</div>
          <div>Who we are</div>
          <Link to='/login'>Log In</Link>
          <Link to='/signup'>Sign Up</Link>
        </nav>
        <div className='banner'>
          <div className='left-banner'>
            <h1>Investing for Everyone</h1>
            <p>Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations and fees apply</p>
            <Link to='/signup'>Sign Up</Link>
            <p><i class="fas fa-info-circle"></i> Commissions & Free Stock Disclosures</p>
          </div>
          <div className='right-banner'>

          </div>
        </div>
      </div>
    )
  }
}