import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetCategoriesQuery } from '@/store/category';
import Link from 'next/link';
import { AddLinkModal } from './AddLinkModal';
import { getPlatformImageUrl } from '@/utils/image-helpers';

const CategoriesList = ({ profileId }: any) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [platform, setPlatform] = useState(null);
  const [link, setLink] = useState(null);

  const { data } = useGetCategoriesQuery<any>({});

  return (
    <div>
      {data?.results.map((category: any, key: any) => {
        return (
          <div className="text-center" key={key}>
            <h4>{category.name}</h4>
            <Row>
              {category.platforms.map((p: any) => {
                return (
                  <Col
                    xs={4}
                    md={2}
                    key={p.id}
                    onClick={() => {
                      setPlatform(p);
                      setShowLinkModal(true);
                    }}
                  >
                    <div className="text-center">
                      <img
                        src={getPlatformImageUrl(p)}
                        alt={p.image}
                        className="img-fluid pb-1"
                        style={{
                          height: '100%',
                          width: '100%',
                        }}
                      />
                      <p style={{ fontSize: '12px' }}>{p.title}</p>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        );
      })}
      <AddLinkModal
        show={showLinkModal}
        setShow={setShowLinkModal}
        profileId={profileId}
        platform={platform}
      />
    </div>
  );
};

export default CategoriesList;
