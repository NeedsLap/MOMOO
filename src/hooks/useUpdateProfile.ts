import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { useState } from 'react';
import useAuthContext from './useAuthContext';
import { FirebaseError } from 'firebase/app';
import useUploadImg from './useUploadImg';

type Profile = {
  file: File | null;
  displayName: string | null;
  email: string | null;
  password: string | null;
};

export const useUpdateProfile = () => {
  const [error, setError] = useState<null | string>(null);
  const [isPending, setPending] = useState(false);
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();

  const setProfile = async ({
    file,
    displayName,
    email,
    password,
  }: Profile) => {
    setError(null);
    setPending(true);

    if (user === null) {
      return;
    }

    interface Opt {
      displayName: string | null;
      photoURL?: string;
    }

    const opt: Opt = { displayName };

    if (displayName) {
      opt.displayName = displayName;
    }

    try {
      if (file !== null) {
        opt.photoURL = await useUploadImg(`profile/${user.uid}`, file);
      }

      if (opt.displayName || user.displayName !== null || opt.photoURL) {
        await updateProfile(user, opt);
      }

      if (email) {
        await updateEmail(user, email);
      }

      if (password) {
        await updatePassword(user, password);
      }

      setError(null);
      setPending(false);
      dispatch({ type: 'login', payload: user });
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
      } else {
        setError('프로필 변경에 실패했습니다');
      }

      setPending(false);
    }
  };

  return { error, isPending, setProfile };
};
