import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { CirclePicker } from 'react-color';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ImageViewer from 'react-simple-image-viewer';
import { FaPen } from 'react-icons/fa';
import Image from 'next/image';
import { useUpdateProfileMutation } from '@/store/profile';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import CustomField from '@/components/custom-field';
import ImageCropper from '@/components/image-croper';
import Loader from '@/components/loader';
import { colors } from '@/configs/constants';
import { getProfileImageUrl } from '@/utils/image-helpers';

const schema = yup.object().shape({
  name: yup.string().max(25).required(),
  bio: yup.string().max(300),
  address: yup.string().max(100),
  company: yup.string().max(23),
  jobTitle: yup.string().max(30),
  dateOfBirth: yup.string(),
});

const ProfileForm = ({ profile }: any) => {
  const [image, setImage] = useState(null);
  const [themeColor, setThemeColor] = useState(profile.themeColor);
  const [showImage, setShowImage] = useState(false);
  const [showImageCropper, setShowImageCropper] = useState(false);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile.name,
      bio: profile.bio,
      dateOfBirth: profile.dateOfBirth,
      address: profile.address,
      jobTitle: profile.jobTitle,
      company: profile.company,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      await updateProfile({
        id: profile.id,
        body: { themeColor, ...data },
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Profile updated');
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleImageEdit = () => {
    Swal.fire({
      title: '<strong>Warning</strong>',
      icon: 'warning',
      html: 'Are you sure you want to unlink this card?',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        document?.getElementById('fileInput')?.click();
      } else {
      }
    });
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setImage(file);
    setShowImageCropper(true);
  };

  return (
    <Card>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="p-2"
        noValidate
      >
        <div
          style={{
            backgroundColor: themeColor ?? 'grey',
            height: '140px',
            width: '100%',
            paddingTop: '80px',
            marginBottom: '60px',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100px',
              height: '100px',
              margin: 'auto',
            }}
          >
            <Image
              src={getProfileImageUrl(profile)}
              className="rounded-circle"
              width={100}
              height={100}
              style={{
                objectFit: 'contain',
              }}
              alt="profile-image"
              onClick={() => {
                if (profile.image && profile.image !== '')
                  setShowImage(true);
              }}
            />
            <div
              className="card p-2 rounded-circle"
              style={{ position: 'absolute', bottom: 0, right: 0 }}
              onClick={handleImageEdit}
            >
              <FaPen />
            </div>
          </div>
        </div>
        {showImage && (
          <div className="image-viewer">
            <ImageViewer
              src={[getProfileImageUrl(profile)]}
              closeOnClickOutside={true}
              onClose={() => {
                setShowImage(false);
              }}
            />
          </div>
        )}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <ImageCropper
          show={showImageCropper}
          setShow={setShowImageCropper}
          image={image}
          setImage={setImage}
        />
        <CustomField
          control={control}
          name="name"
          label="Name"
          errors={errors.name}
        />
        <CustomField
          control={control}
          name="bio"
          label="Bio"
          as="textarea"
          errors={errors.bio}
        />
        <CustomField
          control={control}
          name="dateOfBirth"
          label="Date Of Birth"
          type="date"
          errors={errors.dateOfBirth}
        />
        <CustomField
          control={control}
          name="address"
          label="Address"
          as="textarea"
          errors={errors.address}
        />
        <CustomField
          control={control}
          name="company"
          label="Company"
          errors={errors.company}
        />
        <CustomField
          control={control}
          name="jobTitle"
          label="Job Title"
          errors={errors.jobTitle}
        />
        <Form.Group controlId="color">
          <Form.Label>Color</Form.Label>
          <CirclePicker
            name="color"
            className="mb-2"
            colors={colors}
            onChangeComplete={(color: any, event: any) => {
              const { hex } = color;
              setThemeColor(hex);
            }}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="">
          {isLoading ? <Loader /> : 'Update'}
        </Button>
      </Form>
    </Card>
  );
};

export default ProfileForm;
