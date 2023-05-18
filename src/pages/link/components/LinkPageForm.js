import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import Loader from "components/Loader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createLink, deleteLink, updateLink } from "state/ducks/links/actions";

const schema = yup.object().shape({
  This: yup.string().required(),
});

const LinkPageForm = ({ strings }) => {
  const { categories, link, loading, success } = useSelector(
    (state) => state.links
  );
  const { profile } = useSelector((state) => state.users);
  const [path, setPath] = useState("");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data) => {
    const value = data.This;
    console.log(value);
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
    reset();
  };
  const handleDeleteClick = (e) => {
    e.preventDefault();
    dispatch(deleteLink(link.id));
  };
  useEffect(() => {
    if (link) {
      setPath(link.type === "contact" ? profile.id : link.value);
    }
  }, [link, categories, dispatch, success, profile]);
  return (
    <>
      <Form onSubmit={handleSubmit(submitHandler)}>
        {
          <Form.Group controlId="value">
            <Form.Control
              type="text"
              {...register("This")}
              placeholder="Enter Here"
              value={path}
              onChange={(e) => setPath(e.target.value)}
            ></Form.Control>
          </Form.Group>
        }
        <p className="validation-color">{errors.This?.message}</p>

        {loading || uploading ? (
          <Loader />
        ) : (
          <div>
            <Button type="submit" variant="primary">
              {link.id ? strings["Update"] : strings["Save"]}
            </Button>
            {link.id ? (
              <Button
                type=""
                variant="danger"
                style={{ marginLeft: "10px" }}
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            ) : (
              <></>
            )}
          </div>
        )}
      </Form>
    </>
  );
};

export default LinkPageForm;
