import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ color }: any) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          color: color,
        }}
      />
    </div>
  );
};

export default Loader;
