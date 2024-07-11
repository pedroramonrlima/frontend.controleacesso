import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export function useAccount() {
  const [account, setAccount] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const decodeToken = async () => {
      const token = await localStorage.getItem('token');
      if (token) {
        const data = jwtDecode(token);
        if (data) {
          const accountData = {
            login: data.login,
            group: data.group,
            name: data.name
          }
          setAccount(accountData);
        } else {
          localStorage.removeItem('token');
          navigate('/');
        }
      } else {
        navigate('/')
      }
    };
    decodeToken();
  }, []);

  return account;
}