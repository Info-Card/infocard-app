import { Controller, FieldError } from 'react-hook-form';
import {
  Form,
  FormControlProps,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { useState } from 'react';

interface CustomFieldProps extends FormControlProps {
  control: any; // Replace 'any' with the correct type if available
  name: string;
  label: string;
  errors: FieldError | undefined;
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel';
}

const CustomField: React.FC<CustomFieldProps> = ({
  control,
  name,
  label,
  errors,
  type = 'text', // Default to 'text' if type is not provided
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(
    type !== 'password'
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form.Group
      className="mb-3"
      controlId={name}
      style={{ textAlign: 'left' }}
    >
      <Form.Label>{label}</Form.Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <InputGroup className="mb-3">
            <Form.Control
              {...field}
              {...rest}
              type={
                type === 'password'
                  ? showPassword
                    ? 'text'
                    : 'password'
                  : type
              }
              isInvalid={!!errors}
            />
            {type === 'password' && (
              <button
                id="button-show"
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  border: 'none',
                  backgroundColor: '#f7f7f9',
                  borderLeft: '#dfdfe0 solid 1px',
                  color: 'grey',
                  transition: 'border-color 0.2s ease-in-out', // Add a transition for smoother hover effect
                  outline: 'none',
                  padding: '0px 15px 0px 15px',
                }}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            )}
          </InputGroup>
        )}
      />
      <Form.Control.Feedback type="invalid">
        {errors?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default CustomField;
