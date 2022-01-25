import React from 'react';
import { Link } from 'react-router-dom';
import loginImg from '../../../app/assets/images/login-side.jpeg'
export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  componentDidMount() {
    document.title = "Log In | Robinhood"
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state).fail(() => {
      this.setState({ errors: this.props.errors })
    });
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value })
  }

  toggleView() {
    const passwdInput = document.getElementById('password');
    passwdInput.type = (passwdInput.type === 'password') ? 'text' : 'password';
    const eyeIcon = document.querySelector('#eye-icon');
    eyeIcon.classList.toggle('fa-eye');
    eyeIcon.classList.toggle('fa-eye-slash');
  }

  demoLogin() {
    this.props.login({ username: 'demo', password: 'demopassword' })
  }

  render() {

    return (
      <div className='login'>
        <div className='login-img'>
          {/* <img src={loginImg} alt="" className='login-img' /> */}
          <img src={"https://sparrowhood-dev.s3.us-west-1.amazonaws.com/images/login-side.jpeg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMSJIMEYCIQCxXVW1s%2Fj3Q4oGQauwlBdK7yXBrPWrle%2B2DhQQiamR9gIhAKeecWG2IdsQuesgEbFL7mpH%2Fv0y0PWQvDJw23THfiBnKu0CCIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3Nzg1NzY0MTE5Igyph95wD%2FuGNI2ne10qwQJsO%2FIgS0EaXad5lvoDPRtJXZSeitY5wSiMVuMW6gaZgmz4tRl%2FXbEqSI03eZmdbPnuDF9Cj%2FHyC8glk1M23CyDL78fWWI7Q4gCqKz%2FRg103UFrmHNEiF5y%2B9df4atjvgZT7dQkFhi9aKMEKXElzKu%2FxUcZE6K6zNvJfrKnzpJ9hZkxYGy5n1tE7ZSgvCkiJPiJRy9DCyG4t7Hb%2FF3ZJuv4LfusiMH%2BenNxy7g52ax54ZjP7MI7HXc1Uq5jFcx6HSby5lTySj8Puj90Voz7BwDkR%2BWtQzmaFSmJz7TKEtCOrpJHzq7Tlop9RgyTTK%2Fx4Ux4IY9LZ14fUQ5rbsjfv4BVBY5cQcu%2F6TryYIWnsbDoAIOQVJVALin8FbI%2B2IW7sdADWnUrjQhoHuWUaSJaQ%2ByA6w9gpL1yf%2FmR5Dmoz0wzQDEwh%2Be8jwY6sgIaxpu6ZxJqj8aphP%2BpfOTVDHnbUMn5PTtvI1%2FKHe2WUf3HUpnPqS%2BVz%2FPITlOFmqu%2BBV%2BYR8qXKGSp8T1fA7cJe%2BukNX5zRm8U6EoJ6pUvFx6nPcEd%2BUKCdJ7qne9UiS3ABrqxHyhXFf8dpL4%2F%2F1Izgaw9EBcoBNqqhFGHzJnku85XjC70zebMT5%2Bh2NMMSrXADif7KgcHRFFzrx6jgjWNQL9bb5woFp72qa4w9KCNpDb64TesK5i2buD2b7RuYgto8dxyNuvl%2BRDPnmGcVEsWU2RfhXaUKzgIqj5Jn3Y5RalcRWKdVooHidPe5QwU%2F8ItsI4G01Vl15KFkqRe%2F%2BaqII6FVLmD9WJvGuECfrhnqnzcAn4XhTA2dd1qttsttkBjuJmuxf%2BLBS2HSmK3FToo5Mg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220125T005834Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Credential=ASIAZI7X6OEL3A6UFZ6Z%2F20220125%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=4535c4a0a580410b710db9f41834149bcad566120cd9a4d1e5a359d823896f84"} alt="" className='login-img' />
        </div>
        <div className='form'>
          
          <form onSubmit={this.handleSubmit} className='login-form'>
            <p className='login-title'>Log in to Sparrowhood</p>
            <label> Username <br />
              <div className='input-box'>
                <input type="text" value={this.state.username} onChange={this.update('username')} required autoComplete="off" className='login-input'/>
              </div>
            </label> <br />

            <label> Password <br />
              <div className='input-box'>
                <input type="password" value={this.state.password} onChange={this.update('password')} autoComplete="off" required className='login-input' id='password'/>
                <div className='eye' onClick={this.toggleView}><i className="fas fa-eye" id='eye-icon'></i></div>
              </div>
            </label>

            <p className='link forgot' onClick={this.demoLogin}>Login as Demo User</p>

            <p className='errors'>
              {this.state.errors.map((error, i) => <span key={i}><i className="fas fa-exclamation-circle"></i> {error}</span>)}
            </p>

            <button className='login-button'>Log In</button>
            <p className='create-acc'>Not on Robinhood? <Link to='/signup' className='link'>Create an account</Link></p>


          </form>
          
      
        </div>
      </div>
    )
  }
}