import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutsucess,
  updateFailure,
  updateStart,
  updateSuccess,
} from '@/redux/user/userSlice';
import { getFileURL, uploadFile } from '@/lib/appwrite/uploadImage';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

const DashboardProfile = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const profilePicRef = useRef();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({});
  const [profileUrl, setProfileUrl] = useState(null);
  const [isImageReady, setIsImageReady] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const uploadImage = async () => {
    if (!imageFile) return currentUser.profilePicture;

    try {
      const uploadedFile = await uploadFile(imageFile);
      const profilePictureId = uploadedFile.$id;
      return profilePictureId;
    } catch (error) {
      toast.error('Image upload failed. Please try again!');
      console.error('Image upload failed: ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateStart());

      const profilePicture = await uploadImage();

      const updatedProfile = {
        ...formData,
        profilePicture,
      };

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      const data = await res.json();

      if (data.success === false) {
        toast.error('Update user failed. Please try again!');
        dispatch(updateFailure(data.message));
      } else {
        toast.success('User updated successfully.');
        dispatch(updateSuccess(data));
        setImagePreview(null); // Reset preview after update
        setImageFile(null);
      }
    } catch (error) {
      toast.error('Update user failed. Please try again!');
      dispatch(updateFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      console.log(error);
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutsucess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  const loadProfileImage = async () => {
    if (imagePreview) {
      setProfileUrl(imagePreview);
    
    } else if (currentUser?.profilePicture) {
      const url = await getFileURL(currentUser.profilePicture);
      setProfileUrl(url || '/default-profile.png');
  
    } else {
      setProfileUrl('/default-profile.png');
    
    }
  };

  loadProfileImage();
}, [currentUser, imagePreview]);

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='font-semibold my-7 text-center'>Update Your Profile</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          hidden
          ref={profilePicRef}
          onChange={handleImageChange}
        />

        <div className='w-32 h-32 self-center cursor-pointer overflow-hidden rounded-full border-8 border-gray-300'>
  
            <img
               src={profileUrl}
               alt=""
               className="rounded-full w-full h-full object-cover"
               onClick={() => profilePicRef.current.click()}
               onError={(e) => {
               e.target.onerror = null;
               e.target.src = '/default-profile.png';
              }}
             />
            
        </div>

        <Input
          type='text'
          id='username'
          placeholder='Username'
          defaultValue={currentUser.username}
          className='h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={handleChange}
        />

        <Input
          type='email'
          id='email'
          placeholder='User Email'
          defaultValue={currentUser.email}
          className='h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={handleChange}
        />

        <Input
          type='password'
          id='password'
          placeholder='Password'
          className='h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={handleChange}
        />

        <Button type='submit' className='h-12 bg-green-600'>
          Update Profile
        </Button>
      </form>

      <div className='text-red-500 flex justify-between mt-5 cursor-pointer'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='ghost' className='cursor-pointer'>
              Delete account
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className='bg-red-600' onClick={handleDeleteUser}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button variant='ghost' className='cursor-pointer' onClick={handleSignout}>
          Sign Out
        </Button>
      </div>

      <p className='text-red-600'>{error}</p>
    </div>
  );
};

export default DashboardProfile;
