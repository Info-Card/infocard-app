import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetCategoriesQuery } from '@/store/category';
import { getPlatformImageUrl } from '@/utils/image-helpers';
import { AddLinkModal } from '../shared/links/AddLinkModal';
import Image from 'next/image';

const CategoriesList = ({ profile }: any) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [platform, setPlatform] = useState(null);
  const [editModalKey, setEditModalKey] = useState(0);

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
                      setEditModalKey((prevKey) => prevKey + 1);
                      setShowLinkModal(true);
                    }}
                  >
                    <div className="text-center">
                      <Image
                        src={getPlatformImageUrl(p)}
                        alt={p.image}
                        className="pb-1"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                          width: '100%',
                          height: 'auto',
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
        key={editModalKey}
        show={showLinkModal}
        setShow={setShowLinkModal}
        profile={profile}
        platform={platform}
      />
    </div>
  );
};

export default CategoriesList;
