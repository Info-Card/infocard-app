import React from 'react';

const CustomToggle = ({ label, checked, onChange }: any) => {
  return (
    <div className="custom-control custom-switch">
      <input
        type="checkbox"
        className="custom-control-input"
        id="customSwitches1"
        checked={checked}
        onChange={onChange}
      />
      <label
        className="custom-control-label"
        htmlFor="customSwitches1"
      >
        {label}
      </label>
    </div>
  );
};

export default CustomToggle;
