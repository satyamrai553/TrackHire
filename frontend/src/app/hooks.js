import { useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

// Custom hooks for specific slices
export const useAuth = () => {
  return useAppSelector((state) => state.auth);
};

export const useUser = () => {
  return useAppSelector((state) => state.user);
};

export const useJobs = () => {
  return useAppSelector((state) => state.jobs);
};

export const useApplications = () => {
  return useAppSelector((state) => state.applications);
};

export const useAdmin = () => {
  return useAppSelector((state) => state.admin);
}; 