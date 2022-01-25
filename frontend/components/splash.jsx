import React from 'react';
import { Link } from 'react-router-dom';
import splashBanner from '../../app/assets/images/splash-phone.png';
import splashBalloon from '../../app/assets/images/splash-balloon.svg';
import splashVideo from '../../app/assets/videos/splash-video.mp4';
import feather from '../../app/assets/images/green-feather.png'

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
          {/* <Link to='/' className='nav-home'>Sparrowhood <img src={feather} alt="feather" id='feather' /></Link> */}
          <Link to='/' className='nav-home'>Sparrowhood <img src={"https://sparrowhood-dev.s3.us-west-1.amazonaws.com/images/green-feather.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMSJIMEYCIQCxXVW1s%2Fj3Q4oGQauwlBdK7yXBrPWrle%2B2DhQQiamR9gIhAKeecWG2IdsQuesgEbFL7mpH%2Fv0y0PWQvDJw23THfiBnKu0CCIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3Nzg1NzY0MTE5Igyph95wD%2FuGNI2ne10qwQJsO%2FIgS0EaXad5lvoDPRtJXZSeitY5wSiMVuMW6gaZgmz4tRl%2FXbEqSI03eZmdbPnuDF9Cj%2FHyC8glk1M23CyDL78fWWI7Q4gCqKz%2FRg103UFrmHNEiF5y%2B9df4atjvgZT7dQkFhi9aKMEKXElzKu%2FxUcZE6K6zNvJfrKnzpJ9hZkxYGy5n1tE7ZSgvCkiJPiJRy9DCyG4t7Hb%2FF3ZJuv4LfusiMH%2BenNxy7g52ax54ZjP7MI7HXc1Uq5jFcx6HSby5lTySj8Puj90Voz7BwDkR%2BWtQzmaFSmJz7TKEtCOrpJHzq7Tlop9RgyTTK%2Fx4Ux4IY9LZ14fUQ5rbsjfv4BVBY5cQcu%2F6TryYIWnsbDoAIOQVJVALin8FbI%2B2IW7sdADWnUrjQhoHuWUaSJaQ%2ByA6w9gpL1yf%2FmR5Dmoz0wzQDEwh%2Be8jwY6sgIaxpu6ZxJqj8aphP%2BpfOTVDHnbUMn5PTtvI1%2FKHe2WUf3HUpnPqS%2BVz%2FPITlOFmqu%2BBV%2BYR8qXKGSp8T1fA7cJe%2BukNX5zRm8U6EoJ6pUvFx6nPcEd%2BUKCdJ7qne9UiS3ABrqxHyhXFf8dpL4%2F%2F1Izgaw9EBcoBNqqhFGHzJnku85XjC70zebMT5%2Bh2NMMSrXADif7KgcHRFFzrx6jgjWNQL9bb5woFp72qa4w9KCNpDb64TesK5i2buD2b7RuYgto8dxyNuvl%2BRDPnmGcVEsWU2RfhXaUKzgIqj5Jn3Y5RalcRWKdVooHidPe5QwU%2F8ItsI4G01Vl15KFkqRe%2F%2BaqII6FVLmD9WJvGuECfrhnqnzcAn4XhTA2dd1qttsttkBjuJmuxf%2BLBS2HSmK3FToo5Mg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220125T005810Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Credential=ASIAZI7X6OEL3A6UFZ6Z%2F20220125%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=0a918478d61cd39a328cebc16dc7b4d675626de1f7768d841d82ca736f16abc2" }alt="feather" id='feather' /></Link>
          <div className='hide-nav'><a href="https://github.com/laneyNL">GitHub <i className="fab fa-github"></i></a></div>
          <div className='hide-nav'><a href="https://www.linkedin.com/in/laneyluong/">LinkedIn <i className="fab fa-linkedin"></i></a></div>
          <div className='hide-nav'>Support</div>
          <div className='hide-nav'>Who we are</div>
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
            {/* <img src={splashBanner} alt="phone and credit card" id='splashPhone'/> */}
            <img src="https://sparrowhood-dev.s3.us-west-1.amazonaws.com/images/splash-phone.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMSJIMEYCIQCxXVW1s%2Fj3Q4oGQauwlBdK7yXBrPWrle%2B2DhQQiamR9gIhAKeecWG2IdsQuesgEbFL7mpH%2Fv0y0PWQvDJw23THfiBnKu0CCIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3Nzg1NzY0MTE5Igyph95wD%2FuGNI2ne10qwQJsO%2FIgS0EaXad5lvoDPRtJXZSeitY5wSiMVuMW6gaZgmz4tRl%2FXbEqSI03eZmdbPnuDF9Cj%2FHyC8glk1M23CyDL78fWWI7Q4gCqKz%2FRg103UFrmHNEiF5y%2B9df4atjvgZT7dQkFhi9aKMEKXElzKu%2FxUcZE6K6zNvJfrKnzpJ9hZkxYGy5n1tE7ZSgvCkiJPiJRy9DCyG4t7Hb%2FF3ZJuv4LfusiMH%2BenNxy7g52ax54ZjP7MI7HXc1Uq5jFcx6HSby5lTySj8Puj90Voz7BwDkR%2BWtQzmaFSmJz7TKEtCOrpJHzq7Tlop9RgyTTK%2Fx4Ux4IY9LZ14fUQ5rbsjfv4BVBY5cQcu%2F6TryYIWnsbDoAIOQVJVALin8FbI%2B2IW7sdADWnUrjQhoHuWUaSJaQ%2ByA6w9gpL1yf%2FmR5Dmoz0wzQDEwh%2Be8jwY6sgIaxpu6ZxJqj8aphP%2BpfOTVDHnbUMn5PTtvI1%2FKHe2WUf3HUpnPqS%2BVz%2FPITlOFmqu%2BBV%2BYR8qXKGSp8T1fA7cJe%2BukNX5zRm8U6EoJ6pUvFx6nPcEd%2BUKCdJ7qne9UiS3ABrqxHyhXFf8dpL4%2F%2F1Izgaw9EBcoBNqqhFGHzJnku85XjC70zebMT5%2Bh2NMMSrXADif7KgcHRFFzrx6jgjWNQL9bb5woFp72qa4w9KCNpDb64TesK5i2buD2b7RuYgto8dxyNuvl%2BRDPnmGcVEsWU2RfhXaUKzgIqj5Jn3Y5RalcRWKdVooHidPe5QwU%2F8ItsI4G01Vl15KFkqRe%2F%2BaqII6FVLmD9WJvGuECfrhnqnzcAn4XhTA2dd1qttsttkBjuJmuxf%2BLBS2HSmK3FToo5Mg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220125T005649Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Credential=ASIAZI7X6OEL3A6UFZ6Z%2F20220125%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=58dd34ea4fd292b427ee5ab3e81d3a21af53228491ef98722e44853b589af4c4" alt="phone and credit card" id='splashPhone'/>
            <div className='video'>
              {/* <video src={splashVideo} autoPlay loop muted preload='auto' id='splashVideo'></video></div> */}
              <video src={"https://sparrowhood-dev.s3.us-west-1.amazonaws.com/videos/splash-video.mp4?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMSJIMEYCIQCxXVW1s%2Fj3Q4oGQauwlBdK7yXBrPWrle%2B2DhQQiamR9gIhAKeecWG2IdsQuesgEbFL7mpH%2Fv0y0PWQvDJw23THfiBnKu0CCIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3Nzg1NzY0MTE5Igyph95wD%2FuGNI2ne10qwQJsO%2FIgS0EaXad5lvoDPRtJXZSeitY5wSiMVuMW6gaZgmz4tRl%2FXbEqSI03eZmdbPnuDF9Cj%2FHyC8glk1M23CyDL78fWWI7Q4gCqKz%2FRg103UFrmHNEiF5y%2B9df4atjvgZT7dQkFhi9aKMEKXElzKu%2FxUcZE6K6zNvJfrKnzpJ9hZkxYGy5n1tE7ZSgvCkiJPiJRy9DCyG4t7Hb%2FF3ZJuv4LfusiMH%2BenNxy7g52ax54ZjP7MI7HXc1Uq5jFcx6HSby5lTySj8Puj90Voz7BwDkR%2BWtQzmaFSmJz7TKEtCOrpJHzq7Tlop9RgyTTK%2Fx4Ux4IY9LZ14fUQ5rbsjfv4BVBY5cQcu%2F6TryYIWnsbDoAIOQVJVALin8FbI%2B2IW7sdADWnUrjQhoHuWUaSJaQ%2ByA6w9gpL1yf%2FmR5Dmoz0wzQDEwh%2Be8jwY6sgIaxpu6ZxJqj8aphP%2BpfOTVDHnbUMn5PTtvI1%2FKHe2WUf3HUpnPqS%2BVz%2FPITlOFmqu%2BBV%2BYR8qXKGSp8T1fA7cJe%2BukNX5zRm8U6EoJ6pUvFx6nPcEd%2BUKCdJ7qne9UiS3ABrqxHyhXFf8dpL4%2F%2F1Izgaw9EBcoBNqqhFGHzJnku85XjC70zebMT5%2Bh2NMMSrXADif7KgcHRFFzrx6jgjWNQL9bb5woFp72qa4w9KCNpDb64TesK5i2buD2b7RuYgto8dxyNuvl%2BRDPnmGcVEsWU2RfhXaUKzgIqj5Jn3Y5RalcRWKdVooHidPe5QwU%2F8ItsI4G01Vl15KFkqRe%2F%2BaqII6FVLmD9WJvGuECfrhnqnzcAn4XhTA2dd1qttsttkBjuJmuxf%2BLBS2HSmK3FToo5Mg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220125T005927Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Credential=ASIAZI7X6OEL3A6UFZ6Z%2F20220125%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=7e8c20a69fa40274d5e552777a6a4a7a66872ef38e2b0735507751d51f730c40"} autoPlay loop muted preload='auto' id='splashVideo'></video></div>
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
              <li><Link to='/signup'>Sign Up</Link></li>
              <li><Link to='/login'>Login</Link></li>
            </ul>
          </div>
          <div>
            <ul className='whiteText'>
              <li>About Me</li>
              <li><a href="https://github.com/laneyNL" className='nav-link'>GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/laneyluong/" className='nav-link'>LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Links</li>
              <li><i className="fab fa-github"></i> <span id='icon-links'><i className="fab fa-linkedin"></i></span></li>
            </ul>
          </div>
          
        </footer>
      </div>
    )
  }
}