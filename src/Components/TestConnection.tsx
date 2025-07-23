import { useState, useEffect } from 'react';
import { wishService } from '../services/wishService';
import { toast } from 'react-toastify';

const TestConnection = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await wishService.getWishes();
        setData(response);
        setStatus('success');
        toast.success('Backend connection successful!');
      } catch (error) {
        console.error('Connection failed:', error);
        setStatus('error');
        toast.error('Failed to connect to backend');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg shadow-lg z-50">
      <h3 className="font-bold mb-2">API Connection Status</h3>
      {status === 'loading' && (
        <div className="flex items-center gap-2">
          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
          <span>Testing connection...</span>
        </div>
      )}
      {status === 'success' && (
        <div className="text-green-400">
          Connected! Found {data?.results?.length || 0} wishes
        </div>
      )}
      {status === 'error' && (
        <div className="text-red-400">
          Connection failed
        </div>
      )}
    </div>
  );
};

export default TestConnection;