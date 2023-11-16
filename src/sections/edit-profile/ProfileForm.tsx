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
import CustomField from '@/components/custom-field';
import Loader from '@/components/loader';
import { colors } from '@/configs/constants';
import { getProfileImageUrl } from '@/utils/image-helpers';
import { showAlert } from '@/utils/show-alert';
import ImageCropper from '@/components/image-cropper';
import { useGetMeQuery } from '@/store/auth';

const schema = yup.object().shape({
  name: yup.string().max(25).required(),
  bio: yup.string().max(300),
  address: yup.string().max(100),
  company: yup.string().max(23),
  jobTitle: yup.string().max(30),
  dateOfBirth: yup.string(),
});

const ProfileForm = ({ profile }: any) => {
  const [themeColor, setThemeColor] = useState(profile.themeColor);
  const [showImage, setShowImage] = useState(false);

  const [file, setFile] = useState<any>(null);
  const [image, setImage] = useState();

  const { refetch } = useGetMeQuery<any>({});

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
    console.log(image);

    try {
      await updateProfile({
        id: profile.id,
        body: { themeColor, ...data, image },
      }).unwrap();
      refetch();
      toast.success('Profile updated');
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleImageEdit = () => {
    showAlert({
      title: 'Image Options',
      button1Text: 'Edit',
      button2Text: 'Delete',
      onButton1Click: () => {
        const inputElement = document.getElementById(
          'profile-image'
        ) as HTMLInputElement;
        inputElement.click();
      },
      onButton2Click: () => {},
    });
  };

  const handleInputImageChange = async (event: any) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      try {
        setFile(URL.createObjectURL(selectedFile));
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
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
              src={
                image
                  ? URL.createObjectURL(image)
                  : getProfileImageUrl(profile)
              }
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
          hidden
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleInputImageChange}
          id="profile-image"
        />
        <ImageCropper
          file={file}
          setFile={setFile}
          setCroppedImage={setImage}
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
