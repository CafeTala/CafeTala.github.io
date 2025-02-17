import { useState, useEffect } from 'react';
import { fetchStores } from '../services/storeService';

const useStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStores = async () => {
      try {
        const data = await fetchStores();
        setStores(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getStores();
  }, []);

  return { stores, loading, error };
};

export default useStores;
