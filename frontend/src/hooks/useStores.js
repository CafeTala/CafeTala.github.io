import { useState, useEffect } from 'react';
import { fetchStores } from '../services/storeService';

const useStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStores = async () => {
      try {
        const response = await fetchStores();
        setStores(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadStores();
  }, []);

  return { stores, loading, error };
};

export default useStores;
