import React from 'react';

const Logo = props => {
  return (
    <img
      style={{ 'borderRadius': '10%' }}
      alt="Logo"
      src="/static/logo.svg"
      width="30px"
      // height="10px"
      {...props}
    />
  );
};

export default Logo;
