import { useMutation } from '@tanstack/react-query';
import useAuthSuccess from 'hooks/auth/useAuthSuccess';
import { ReactNode } from 'react';
import { requestLogout } from 'services/auth';

const LogoutButton = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const onAuthSuccess = useAuthSuccess();
  const { isPending, mutate } = useMutation({
    mutationFn: requestLogout,
    onSuccess: onAuthSuccess,
  });
  return (
    <button onClick={() => mutate()} disabled={isPending} className={className}>
      {children}
    </button>
  );
};

export default LogoutButton;
