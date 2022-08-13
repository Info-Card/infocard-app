import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { TAG_RESET } from 'state/ducks/tags/types';
import { deleteTag, getTags, updateTag } from 'state/ducks/tags/actions';
import { multilanguage } from 'redux-multilanguage';

const LinkedCards = ({ strings }) => {
  const [showDeleteTag, setShowDeleteTag] = useState('');
  const [showUpdateTag, setShowUpdateTag] = useState('');
  const [tagName, setTagName] = useState('');

  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.users);
  const { results: tags, success: tagSuccess } = useSelector(
    (state) => state.tags
  );

  useEffect(() => {
    if (tagSuccess) {
      dispatch({ type: TAG_RESET });
    } else if (profile) {
      dispatch(getTags(profile.user));
    }
  }, [dispatch, profile, tagSuccess]);

  const handleUpdateTag = (event) => {
    event.preventDefault();
    dispatch(updateTag(showUpdateTag, { name: tagName }));
    setShowUpdateTag('');
  };

  const handleDeleteTag = (event) => {
    event.preventDefault();
    dispatch(deleteTag(showDeleteTag));
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
                <td>{tag.name || tag.id}</td>
                <td>https://app.infocard.me/{tag.id}</td>

                <td>
                  <Button
                    className="btn-sm mr-2"
                    variant="primary"
                    onClick={(e) => {
                      setShowUpdateTag(tag.id);
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
      <Modal show={showUpdateTag !== ''}>
        <Modal.Header closeButton onHide={(e) => setShowUpdateTag('')}>
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
