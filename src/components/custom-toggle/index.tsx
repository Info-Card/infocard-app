import React from 'react';

const CustomToggle = ({ id, label, checked, onChange }: any) => {
  return (
    <div className="d-flex align-items-center">
      <label className="form-check-label mx-1" htmlFor={id}>
        {label}
      </label>
      <div
        className="form-check form-switch"
        style={{ paddingTop: '2px' }}
      >
        <input
          type="checkbox"
          className="form-check-input"
          id={id}
          checked={checked}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CustomToggle;
