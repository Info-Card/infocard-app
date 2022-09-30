import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { TAG_RESET } from 'state/ducks/tags/types';
import { unlinkTag, getTags, updateTag } from 'state/ducks/tags/actions';
import { multilanguage } from 'redux-multilanguage';

const LinkedCards = ({ strings }) => {
  const [showDeleteTag, setShowDeleteTag] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [tagName, setTagName] = useState('');

  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.users);
  const { tags, success: tagSuccess } = useSelector((state) => state.tags);

  useEffect(() => {
    if (tagSuccess) {
      dispatch({ type: TAG_RESET });
    } else if (profile) {
      dispatch(getTags());
    }
  }, [dispatch, profile, tagSuccess]);

  const handleUpdateTag = (event) => {
    event.preventDefault();
    dispatch(updateTag(selectedTag.id, { name: tagName }));
    setSelectedTag(null);
  };

  const handleDeleteTag = (event) => {
    event.preventDefault();
    dispatch(unlinkTag(showDeleteTag));
    setShowDeleteTag('');
  };

  return (
    <div className="mt-5">
      <h4>{strings['Linked Cards']}</h4>
      <Table bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>{strings['Name']}</th>
            <th>{strings['URL']}</th>
            <th></th>
          </tr>
        </thead>
        {tags && (
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id}>
                <td>{tag.name || 'N/A'}</td>
                <td>{tag.url}</td>
                <td>
                  <Button
                    className="btn-sm mr-2"
                    variant="primary"
                    onClick={(e) => {
                      setSelectedTag(tag);
                    }}
                  >
                    {strings['Edit']}
                  </Button>
                  <Button
                    className="btn-sm"
                    variant="danger"
                    onClick={(e) => setShowDeleteTag(tag.id)}
                  >
                    {strings['UnLink']}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      <Modal show={selectedTag !== null}>
        <Modal.Header closeButton onHide={(e) => setSelectedTag(null)}>
          <Modal.Title>{strings['Update Tag information']}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateTag}>
            <Form.Group controlId="name">
              <Form.Label>{strings['Tag Name']}</Form.Label>
              <Form.Control
                type="name"
                placeholder={strings['Enter name']}
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              {strings['Update']}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showDeleteTag !== ''}>
        <Modal.Header closeButton onHide={(e) => setShowDeleteTag('')}>
          <Modal.Title>{strings['Warning']}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {strings['Are you sure you want to unlink this card?']}
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="danger" onClick={handleDeleteTag}>
            {strings['UnLink']}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default multilanguage(LinkedCards);
