import Image from 'next/image';
import { Col, Row, Stack } from 'react-bootstrap';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';
import { FaCopy, FaShare } from 'react-icons/fa';
import { useAuth } from '@/hooks/use-auth';
import { HOST_URL } from '@/configs/constants';
import { MainLayout } from '@/layouts/main/layout';
import { RWebShare } from 'react-web-share';

const SharePage = () => {
  const { user }: any = useAuth();

  return (
    <Row className="mt-2">
      <Col md={4} className="text-center m-auto">
        <Image
          src="/assets/images/logo.png"
          alt=""
          height={60}
          width={120}
          style={{ marginBottom: '50px' }}
        />
        <h3>Share QR Code</h3>
        <div
          style={{
            background: 'white',
            padding: '16px',
          }}
        >
          <QRCode
            value={`${HOST_URL}/${user?.username}`}
            size={180}
          />
        </div>
        <h5>{`${HOST_URL}/${user?.username}`}</h5>
        <Stack
          className="d-flex flex-row justify-content-center"
          gap={4}
        >
          <div className="d-flex flex-column">
            <FaCopy
              size={30}
              onClick={() => {
                navigator.clipboard.writeText(
                  `${HOST_URL}/${user?.username}`
                );
                toast.success('Link copied');
              }}
            />
            Copy
          </div>
          <RWebShare
            data={{
              url: `${HOST_URL}/${user?.username}`,
              title: 'Connect to my profile using this link',
            }}
            onClick={() => console.log('shared successfully!')}
          >
            <div className="d-flex flex-column">
              <FaShare size={30} />
              Share
            </div>
          </RWebShare>
        </Stack>
      </Col>
    </Row>
  );
};

SharePage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default SharePage;
