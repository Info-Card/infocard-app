import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useController, FieldValues } from 'react-hook-form';

interface CustomFieldProps<T> {
  name: keyof T;
  control: any;
  label: string;
  type?: string;
  accept?: string;
  errors?: any;
  setValue?: any; // Add setValue prop
}

const CustomField = <T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  accept,
  errors,
  setValue,
}: CustomFieldProps<T>) => {
  const {
    field,
    fieldState: { invalid, isTouched },
  } = useController({
    name: name as string,
    control,
    defaultValue: '',
  });

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Set the value using setValue when a file is selected
    if (setValue && event.target.files) {
      setValue(name, event.target.files);
    }
  };

  return (
    <Form.Group
      controlId={name as string}
      className="mb-2"
      style={{ textAlign: 'left' }}
    >
      <Form.Label>{label}</Form.Label>
      {type === 'file' ? (
        <Form.Control
          type={type}
          accept={accept}
          onChange={handleFileChange}
          isInvalid={invalid && isTouched}
        />
      ) : (
        <Form.Control
          type={type}
          {...field}
          isInvalid={invalid && isTouched}
        />
      )}
      {errors && errors[name] && (
        <Form.Control.Feedback type="invalid">
          {errors[name].message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default CustomField;
