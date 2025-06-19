// components/AuthPersist.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyAuth } from '../features/auth/authThunks';

const AuthPersist = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(verifyAuth());
    }
  }, [dispatch, token]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (token) {
        dispatch(verifyAuth());
      }
    }, 300000); // Verify every 5 minutes
    return () => clearInterval(interval);
  }, [dispatch, token]);

  return null;
};

export default AuthPersist;