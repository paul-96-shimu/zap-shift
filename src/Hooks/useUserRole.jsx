import { useQuery } from '@tanstack/react-query';


import CustomHooks from './CustomHooks';
import UseAxios from './UseAxios';

const useUserRole = () => {
  const { user, loading: authLoading } = CustomHooks();
  const axiosSecure = UseAxios();

  const {
    data: role = '',
    isLoading: roleLoading,
    refetch
  } = useQuery({
    enabled: !authLoading && !!user?.email,
    queryKey: ['userRole', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return {
    role,
    roleLoading: authLoading || roleLoading,
    refetch
  };
};

export default useUserRole;
