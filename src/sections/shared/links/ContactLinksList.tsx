import React from 'react';
import { Row } from 'react-bootstrap';
import { useUpdateLinkMutation } from '@/store/link';
import { toast } from 'react-toastify';
import ContactLinkCard from './ContactLinkCard';

const ContactLinksList = ({ links }: any) => {
  const [updateLink] = useUpdateLinkMutation();

  const handleShareChange = async (index: any) => {
    try {
      await updateLink({
        id: links[index].id,
        body: { isContact: !links[index].isContact },
      }).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="m-2 mt-2">
      <Row className="g-2">
        {links?.map((link: any, index: any) => {
          return (
            <ContactLinkCard
              key={link.id}
              link={link}
              handleShareChange={() => handleShareChange(index)}
            />
          );
        })}
      </Row>
    </div>
  );
};

export default ContactLinksList;
