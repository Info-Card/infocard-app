import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';

const Toggle = ({ isPersonal, toggleChanged, strings }) => {
  return (
    <div className="text-center">
      <ButtonGroup aria-label="">
        <Button
          variant={isPersonal ? 'dark' : 'outline-secondary'}
          value={true}
          onClick={toggleChanged}
        >
          {strings['Personal']}
        </Button>
        <Button
          variant={isPersonal ? 'outline-secondary' : 'dark'}
          value={false}
          onClick={toggleChanged}
        >
          {strings['Business']}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default multilanguage(Toggle);
