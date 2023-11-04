import { Form } from 'react-bootstrap';

const CustomFileField = ({ name, accept, label, setFile }: any) => {
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Form.Group
      controlId={name}
      className="mb-3"
      style={{ textAlign: 'left' }}
    >
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="file"
        accept={accept}
        onChange={handleFileChange}
      />
    </Form.Group>
  );
};

export default CustomFileField;
