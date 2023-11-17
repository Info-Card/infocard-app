import React from 'react';

const CustomToggle = ({ id, label, checked, onChange }: any) => {
  return (
    <div className="form-check form-switch">
      <input
        type="checkbox"
        className="form-check-input"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default CustomToggle;
