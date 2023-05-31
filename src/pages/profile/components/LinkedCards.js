import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { TAG_RESET } from "state/ducks/tags/types";
import { getTags } from "state/ducks/tags/actions";
import { multilanguage } from "redux-multilanguage";
import UpdateCardModal from "./UpdateCardModal";
import LinkedCardsButtons from "./LinkedCardsButtons";

const LinkedCards = ({ strings }) => {
  const [selectedTag, setSelectedTag] = useState(null);
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
                  <LinkedCardsButtons
                    strings={strings}
                    tag={tag}
                    setSelectedTag={setSelectedTag}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      {selectedTag && (
        <UpdateCardModal tag={selectedTag} setTag={setSelectedTag} />
      )}
    </div>
  );
};

export default multilanguage(LinkedCards);
