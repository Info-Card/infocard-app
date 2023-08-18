import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getLinks } from "state/ducks/links/actions";
import Platform from "components/Platform";
import { Link } from "react-router-dom";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.links);
  const { profile } = useSelector((state) => state.users);

  useEffect(() => {
    if (profile) {
      dispatch(getLinks(profile.id));
    }
  }, [dispatch, profile]);
  return (
    <div>
      {categories ? (
        <>
          {categories.map((category, key) => {
            return (
              <div className="text-center" key={key}>
                <h4>{category.name}</h4>
                <Row>
                  {category.platforms.map((platform, key) => {
                    const handleRightClick = (event) => {
                      event.preventDefault();
                      window.open(`/links/${platform.platform}`, "_blank");
                    };

                    return (
                      <Col xs={4} md={2} key={key}>
                        <Link
                          to={`/links/${platform.platform}`}
                          style={{ color: "black" }}
                        >
                          <Platform
                            platform={platform}
                            showCheck={true}
                            onContextMenu={handleRightClick}
                          />
                        </Link>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Categories;
