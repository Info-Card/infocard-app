import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetCategoriesQuery } from '@/store/category';
import { getPlatformImageUrl } from '@/utils/image-helpers';
import { AddLinkModal } from '../shared/links/AddLinkModal';
import Image from 'next/image';
import { useGetLinksQuery } from '@/store/link';

const CategoriesList = ({ profile }: any) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [platform, setPlatform] = useState(null);
  const [link, setLink] = useState(null);
  const [editModalKey, setEditModalKey] = useState(0);

  const { data } = useGetCategoriesQuery<any>({});
  const { data: linksData } = useGetLinksQuery<any>({
    limit: 100,
    profile: profile?.id,
  });

  return (
    <div>
      <h3>Add Platforms</h3>
      {data?.results.map((category: any, key: any) => {
        return (
          <div className="text-center mt-3" key={key}>
            <h4>{category.name}</h4>
            <Row>
              {category.platforms.map((p: any) => {
                return (
                  <Col
                    xs={4}
                    md={2}
                    key={p.id}
                    onClick={() => {
                      const contactCard =
                        p.type === 'contact'
                          ? linksData?.results?.find(
                              (l: any) =>
                                l.platform.type === 'contact'
                            )
                          : undefined;

                      setPlatform(p);
                      setLink(contactCard);
                      setEditModalKey((prevKey) => prevKey + 1);
                      setShowLinkModal(true);
                    }}
                  >
                    <div className="text-center">
                      <Image
                        src={getPlatformImageUrl(p)}
                        alt={p.image}
                        className="p-1"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                          width: '100%',
                          height: 'auto',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: 'bold',
                        }}
                      >
                        {p.title}
                      </span>
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
        link={link}
        links={linksData?.results}
      />
    </div>
  );
};

export default CategoriesList;
