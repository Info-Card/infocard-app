import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";

function CustomTextField({ id, label, error, control, placeholder }) {
  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Form.Control
            onChange={onChange}
            value={value}
            ref={ref}
            isInvalid={error}
            placeholder={placeholder}
          />
        )}
      />
      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
export default CustomTextField;
