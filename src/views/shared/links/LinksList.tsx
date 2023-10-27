import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import LinkCard from './LinkCard';
import Link from 'next/link';

const LinksList = ({ links, direct }: any) => {
  return (
    <div>
      <h4>Platforms & Analytics</h4>
      <Row className="g-2">
        {links.map((link: any, key: any) => {
          return (
            <Col key={key} xs={12}>
              <LinkCard link={link} direct={direct} />
            </Col>
          );
        })}
      </Row>
      <Card className="px-2 py-3 mb-2 text-center">
        <Link
          href={'/profile'}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          + Add Links and Contact Info
        </Link>
      </Card>
    </div>
  );
};

export default LinksList;
