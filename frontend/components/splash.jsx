import React from 'react';
import { Link } from 'react-router-dom';

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

  toggleList(sublist) {
    return () => {
      const list = document.getElementById(sublist);
      list.style.display = (list.style.display === 'block') ? 'none' : 'block';
      const caret = document.getElementById(`${sublist}-caret`);
      caret.classList.toggle('fa-angle-down');
      caret.classList.toggle('fa-angle-up');
    }
  }

  render() {

    return (
      <div className='splash'>
        <nav>
          <Link to='/' className='nav-home'>Sparrowhood <img src={window.greenFeatherImg}alt="feather" id='feather' /></Link>
          <div className='hide-nav'><a href="https://github.com/laneyNL">GitHub <i className="fab fa-github"></i></a></div>
          <div className='hide-nav'><a href="https://www.linkedin.com/in/laneyluong/">LinkedIn <i className="fab fa-linkedin"></i></a></div>
          <div className='hide-nav'>Placeholder</div>
          <div className='hide-nav'>Placeholder</div>
          <div className='nav-links bold hide-nav'>
            <Link to='/login' className='nav-link'>Log In</Link>
            <Link to='/signup' className='nav-signup-link'>Sign Up</Link>
          </div>
          <div className='show' onClick={this.dropdown}><i className="fas fa-bars" id='menu'></i></div>
          <div className='dropdown'>
            <ul > 
              <li className='sublist nav-link' onClick={this.toggleList('info-list')}><div className='flex'><span>Laney's Information</span><span><i className="fas fa-angle-down" id='info-list-caret'></i></span></div></li>
                <ul className='toggle-list' id="info-list">
                <li className='sublist-item'><a href="https://github.com/laneyNL" className='nav-link'>GitHub</a></li>
                <li className='sublist-item'><a href="https://www.linkedin.com/in/laneyluong/" className='nav-link'>LinkedIn</a></li>
                </ul>
              

              <li className='sublist nav-link' onClick={this.toggleList('learn-list')}><div className='flex'><span>Learn</span><span><i className="fas fa-angle-down" id='learn-list-caret'></i></span></div></li>
                <ul className='toggle-list' id="learn-list">
                  <li className='sublist-item'>Support</li>
                  <li className='sublist-item'>Who we are</li>
                </ul>

              <li className='sublist nav-link' onClick={this.toggleList('login-list')}><div className='flex'><span>Sign In to View More Features</span><span><i className="fas fa-angle-down" id='login-list-caret'></i></span></div></li>
                <ul className='toggle-list' id="login-list">
                  <li className='sublist-item'><Link to='/login' className='nav-link'>Log In</Link></li>
                  <li className='sublist-item'><Link to='/signup' className='nav-link'>Sign Up</Link></li>
                </ul>
            </ul>
          </div>
        </nav>
        <div className='banner'>
          <div className='left-banner'>
            <div className='banner-title'>Investing for Everyone</div><br />
            <p className='banner-info'>Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations and fees apply</p><br /><br />
            <Link to='/signup' className='signup-button'>Sign Up</Link><br /><br />
            <p className='bold'><i className="fas fa-info-circle"></i> Commissions & Free Stock Disclosures</p>
          </div>
          <div className='right-banner'>
            <img src={window.splashPhoneImg} alt="phone and credit card" id='splashPhone'/>
            {/* <div className='video'>
              <video src={window.splashVideo} autoPlay loop muted preload='auto' id='splashVideo'></video></div> */}
          </div>
        </div>

        <div className='fee'>See our <span className='underline'>fee schedule</span> to learn more about cost.</div>

        {/* <div className='balloon'>
          <div><img src={splashBalloon} alt="hot air balloon" />
          </div>
          <div></div>
        </div> */}
        <footer>
          <div>
            <ul className='whiteText'>
              <li><Link to='/signup' className='nav-link'>Sign Up</Link></li>
              <li><Link to='/login' className='nav-link'>Login</Link></li>
            </ul>
          </div>
          <div>
            <ul className='whiteText'>
              <li>About Me:</li>
              <li><a href="https://github.com/laneyNL" className='nav-link'>GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/laneyluong/" className='nav-link'>LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Links:</li>
              <li id='icon-links'>
                <a href="https://github.com/laneyNL" className='nav-link whiteText'><i className="fab fa-github"></i></a> 
                <span id='icon-links'>
                  <a href="https://www.linkedin.com/in/laneyluong/" className='nav-link whiteText'><i className="fab fa-linkedin"></i></a>
                </span>
                </li>
            </ul>
          </div>
          
        </footer>
      </div>
    )
  }
}