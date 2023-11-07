import Image from 'next/image';
import { Button, Col, Row } from 'react-bootstrap';
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
          className="mt-5"
        >
          <QRCode
            value={`${HOST_URL}/${user?.username}`}
            size={180}
          />
        </div>
        <p>{`${HOST_URL}/${user?.username}`}</p>
        <Button
          type="submit"
          variant="outline-primary"
          size="sm"
          className="m-2 rounded-circle bordered"
          onClick={() => {
            navigator.clipboard.writeText(
              `${HOST_URL}/${user?.username}`
            );
            toast.success('Link copied');
          }}
        >
          <FaCopy />
        </Button>
        <RWebShare
          data={{
            url: `${HOST_URL}/${user?.username}`,
            title: 'Connect to my profile using this link',
          }}
          onClick={() => console.log('shared successfully!')}
        >
          <Button
            type="submit"
            variant="outline-primary"
            size="sm"
            className="m-2 rounded-circle"
          >
            <FaShare />
          </Button>
        </RWebShare>
      </Col>
    </Row>
  );
};

SharePage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default SharePage;
