import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { getPlatformImageUrl } from "helpers/imageHelpers";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { multilanguage } from "redux-multilanguage";
import Loader from "components/Loader";
import { createLink, deleteLink, updateLink } from "state/ducks/links/actions";
import ContactLinkList from "./links/ContactLinksList";

const LinkForm = ({ link, strings }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.links);
  const [value, setValue] = useState(
    link.type === "contact" ? profile?.id : link.value ?? ""
  );

  const submitHandler = (e) => {
    e.preventDefault();
    if (link.id) {
      dispatch(updateLink(link.id, { value }));
    } else {
      dispatch(
        createLink({
          platform: link.platform,
          value,
          profile: profile.id,
        })
      );
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    dispatch(deleteLink(link.id));
  };

  if (!profile) {
    return <></>;
  }

  return (
    <div className="text-center">
      <div className="">
        <img
          src={getPlatformImageUrl(link)}
          alt="platform"
          className="m-3"
          style={{ height: "100px", width: "100px" }}
        />
        <h4>{link.title ?? ""}</h4>
        <p>{link.headline ?? ""}</p>
        <Form onSubmit={submitHandler}>
          {link.type === "phone" && (
            <Form.Group controlId="value">
              <PhoneInput
                placeholder="Enter phone number"
                country={"us"}
                value={value}
                onChange={(phone) => setValue(phone)}
              />
            </Form.Group>
          )}
          {link.type !== "contact" && link.type !== "phone" && (
            <Form.Group controlId="value">
              <Form.Control
                type="text"
                placeholder="Enter Here"
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}
          {link.type === "contact" && (
            <ContactLinkList links={profile?.platforms} />
          )}

          <div>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? (
                <Loader />
              ) : link.id ? (
                strings["Update"]
              ) : (
                strings["Save"]
              )}
            </Button>
            {link.id && (
              <Button
                type=""
                variant="danger"
                style={{ marginLeft: "10px" }}
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default multilanguage(LinkForm);
