import React from 'react';

const Plesiosaur = props => {
  return (
    <img
      style={{ 'borderRadius': '10%' }}
      alt="Logo"
      src="/static/plesiosaur.svg"
      width="25px"
      // height="10px"
      {...props}
    />
  );
};

export default Plesiosaur;
