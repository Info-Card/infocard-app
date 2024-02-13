import React from 'react';

const CustomToggle = ({ id, label, checked, onChange }: any) => {
  return (
    <>
      <label className="form-check-label mx-1" htmlFor={id}>
        {label}
      </label>
      <div className="form-check form-switch">
        <input
          type="checkbox"
          className="form-check-input"
          id={id}
          checked={checked}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default CustomToggle;
