import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

interface ToggleProps {
  values: string[];
  selected: string;
  toggleChanged: (value: string) => void;
}

const Toggle: React.FC<ToggleProps> = ({
  values,
  selected,
  toggleChanged,
}) => {
  return (
    <div className="text-center">
      <ButtonGroup aria-label="">
        {values.map((value: string) => {
          const isSelected = value === selected;
          return (
            <Button
              key={value}
              variant={isSelected ? 'primary' : 'outline-primary'}
              value={value}
              onClick={(e) => {
                e.preventDefault();
                toggleChanged(value);
              }}
            >
              {value}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
};

export default Toggle;
