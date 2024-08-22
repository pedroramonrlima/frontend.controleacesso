import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function useAccount() {
  const [account, setAccount] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      //console.log("useraccount", user);
      const accountData = {
        login: user.login,
        name: user.name,
        title: user.title,
        id: user.id,
        manager: user.manager,
        departament: user.departament,
        isAdmin: user.isAdmin,
        isManager: user.isManager,
        isSpecialist: user.isSpecialist
      };
      setAccount(accountData);
    } else {
      navigate('/');
    }
  }, [user, navigate]);

  return account;
}