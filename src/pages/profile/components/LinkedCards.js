import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { TAG_RESET } from "state/ducks/tags/types";
import { getTags } from "state/ducks/tags/actions";
import { multilanguage } from "redux-multilanguage";
import LinkedCardModal from "./LinkedCardModal";

const LinkedCards = ({ strings }) => {
  const props = strings;
  const [showDeleteTag, setShowDeleteTag] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  console.log(showDeleteTag);
  console.log(selectedTag);

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

  return (
    <div className="mt-5">
      <h4>{strings["Linked Cards"]}</h4>
      <Table bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>{strings["Name"]}</th>
            <th>{strings["URL"]}</th>
            <th></th>
          </tr>
        </thead>
        {tags && (
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id}>
                <td>{tag.name || "N/A"}</td>
                <td>{tag.url}</td>
                <td>
                  <Button
                    style={{
                      width: "60px",
                    }}
                    className="btn-sm mr-2"
                    variant="primary"
                    onClick={(e) => {
                      setSelectedTag(tag);
                    }}
                  >
                    {strings["Edit"]}
                  </Button>
                  <Button
                    style={{
                      width: "60px",
                      justifyContent: "center", // Center the text horizontally
                    }}
                    className="btn-sm d-flex text-center"
                    variant="danger"
                    onClick={(e) => setShowDeleteTag(tag.id)}
                  >
                    {strings["UnLink"]}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      <LinkedCardModal message={props} />
    </div>
  );
};

export default multilanguage(LinkedCards);
