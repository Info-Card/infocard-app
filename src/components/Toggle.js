import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const Toggle = ({ isPersonal, toggleChanged }) => {
  return (
    <div className="text-center">
      <ButtonGroup aria-label="">
        <Button
          variant={isPersonal ? 'dark' : 'outline-secondary'}
          value={true}
          onClick={toggleChanged}
        >
          Personal
        </Button>
        <Button
          variant={isPersonal ? 'outline-secondary' : 'dark'}
          value={false}
          onClick={toggleChanged}
        >
          Business
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Toggle;
