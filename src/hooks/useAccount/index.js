import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function useAccount() {
  const [account, setAccount] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const accountData = {
        login: user.login,
        group: user.group,
        name: user.name
      };
      setAccount(accountData);
    } else {
      navigate('/');
    }
  }, [user, navigate]);

  return account;
}