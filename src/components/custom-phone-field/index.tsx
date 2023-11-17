import React from 'react';
import { Form } from 'react-bootstrap';
import { useController, FieldValues } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface CustomFieldProps<T> {
  name: keyof T;
  control: any;
  label: string;
  type?: string;
  accept?: string;
  errors?: any;
  hidden?: boolean;
}

const CustomPhoneField = <T extends FieldValues>({
  name,
  control,
  label,
  errors,
  hidden,
}: CustomFieldProps<T>) => {
  const { field } = useController({
    name: name as string,
    control,
    defaultValue: '',
  });

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
      <PhoneInput
        {...field}
        country="pk"
        value={field.value || ''}
        inputStyle={{
          fontSize: 16,
          fontWeight: 500,
          lineHeight: '24px',
          color: 'lightgrey',
          backgroundColor: 'transparent',
          borderRadius: 5,
          width: '100%',
          height: '55px',
        }}
      />
      {errors && errors[name] && (
        <Form.Control.Feedback type="invalid">
          {errors[name].message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default CustomPhoneField;
