import useLogout from 'hooks/auth/useLogout';
import { ReactNode } from 'react';

const LogoutButton = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { isLoading, mutate: logout } = useLogout();
  return (
    <button onClick={() => logout()} disabled={isLoading} className={className}>
      {children}
    </button>
  );
};

export default LogoutButton;
