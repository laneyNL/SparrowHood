import React from 'react';

const LoadingSpinner = (props) => {
  let errors;
  if (props.errors && props.errors.length) {
    errors = <div>
      {props.errors[0]}
    </div>;
    setTimeout(() => {
      props.clearErrors()
      props.history.push('/');
    }, 1500)
  }
  return (
    <div id='spinner-div'>
      <div id='spinner'></div>
      <br />
      <div className='loading-error'>{errors}</div>
    </div>
  )
}

export default LoadingSpinner;