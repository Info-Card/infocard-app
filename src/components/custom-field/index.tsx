import React, { useState } from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { useController, FieldValues } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface CustomFieldProps<T> {
  name: keyof T;
  control: any;
  label: string;
  type?: string;
  accept?: string;
  errors?: any;
  setValue?: any;
  as?: any;
  hidden?: boolean;
}

const CustomField = <T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  accept,
  errors,
  setValue,
  as,
  hidden,
}: CustomFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

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
    if (setValue && event.target.files) {
      setValue(name, event.target.files);
    }
  };

  return (
    <Form.Group
      controlId={name as string}
      className="mb-2"
      style={{
        textAlign: 'left',
      }}
      hidden={hidden}
    >
      <Form.Label>{label}</Form.Label>
      {type === 'file' ? (
        <Form.Control
          type={type}
          accept={accept}
          onChange={handleFileChange}
          isInvalid={invalid && isTouched}
        />
      ) : type === 'password' ? (
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            {...field}
            as={as}
            isInvalid={invalid && isTouched}
          />
          <InputGroup.Text
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
        </InputGroup>
      ) : (
        <Form.Control
          type={showPassword ? 'text' : 'password'}
          {...field}
          as={as}
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
