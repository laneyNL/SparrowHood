import React from 'react';
import { Link } from 'react-router-dom';
import splashBanner from '../../app/assets/images/splash-phone.png';
import splashBalloon from '../../app/assets/images/splash-balloon.svg';
import splashVideo from '../../app/assets/videos/splash-video.mp4';

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
  }
  
  dropdown() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('fa-bars');
    menu.classList.toggle('fa-times');
    const dropdown = document.querySelector('.dropdown');
    dropdown.style.display = (dropdown.style.display === 'flex') ? 'none' : 'flex';
  }

  render() {

    return (
      <div className='splash'>
        <nav>
          <Link to='/' className='nav-home'>Robinhood</Link>
          <div className='hide-nav'><a href="https://github.com/laneyNL">GitHub</a></div>
          <div className='hide-nav'><a href="https://www.linkedin.com/in/laneyluong/">LinkedIn</a></div>
          <div className='hide-nav'>Support</div>
          <div className='hide-nav'>Who we are</div>
          <div className='nav-links bold hide-nav'>
            <Link to='/login' className='nav-login-link'>Log In</Link>
            <Link to='/signup' className='nav-signup-link'>Sign Up</Link>
          </div>
          <div className='show' onClick={this.dropdown}><i className="fas fa-bars" id='menu'></i></div>
          <ul className='dropdown'> 
            <li className=''><a href="https://github.com/laneyNL">GitHub</a></li>
            <li className=''><a href="https://www.linkedin.com/in/laneyluong/">LinkedIn</a></li>
            <li className=''>Support</li>
            <li className=''>Who we are</li>
            {/* <li className='nav-links bold hide-nav'> */}
              <li><Link to='/login' className='nav-login-link'>Log In</Link></li>
            <li><Link to='/signup' className='nav-login-link'>Sign Up</Link></li>
            {/* </li> */}
          </ul>
        </nav>
        <div className='banner'>
          <div className='left-banner'>
            <h1>Investing for Everyone</h1><br />
            <p className='banner-info'>Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations and fees apply</p><br />
            <Link to='/signup' className='signup-button'>Sign Up</Link><br />
            <p className='bold'><i className="fas fa-info-circle"></i> Commissions & Free Stock Disclosures</p>
          </div>
          <div className='right-banner'>
            <img src={splashBanner} alt="phone and credit card" id='splashPhone'/>
            <div className='video'>
              <video src={splashVideo} autoPlay loop muted preload='auto' id='splashVideo'></video></div>
          </div>
        </div>
        <div>See our fee schedule to learn more about cost.</div>
        <div className='balloon'>
          <div><img src={splashBalloon} alt="hot air balloon" />
          </div>
          <div></div>
        </div>
      </div>
    )
  }
}