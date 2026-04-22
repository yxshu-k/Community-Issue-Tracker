import { useState, useEffect } from 'react';
import axios from 'axios';

function MyIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyIssues();
  }, []);

  const fetchMyIssues = async () => {
    try {
      const res = await axios.get('/api/issues/myissues');
      setIssues(res.data);
    } catch (err) {
      setError('Failed to load your issues');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className='p-10'>Loading your issues...</div>;
  if (error) return <div className='p-10 text-red-500'>{error}</div>;

  return (
    <div className='p-10 bg-gray-50 min-h-screen'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8'>My Reported Issues</h1>

        {issues.length === 0 ? (
          <div className='bg-white p-8 rounded-xl shadow-md text-center'>
            <p className='text-gray-600 mb-4'>You haven't reported any issues yet.</p>
            <a href='/report' className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700'>
              Report Your First Issue
            </a>
          </div>
        ) : (
          <div className='space-y-6'>
            {issues.map(issue => (
              <div key={issue._id} className='bg-white p-6 rounded-xl shadow-md'>
                <div className='flex justify-between items-start mb-4'>
                  <div className='flex-1'>
                    <h3 className='font-semibold text-xl mb-2'>{issue.title}</h3>
                    <p className='text-gray-600 mb-3'>{issue.description}</p>
                    <div className='flex flex-wrap gap-4 text-sm text-gray-500'>
                      <span>Category: {issue.category}</span>
                      <span>Location: {issue.location}</span>
                      <span>Reported: {new Date(issue.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(issue.status)}`}>
                    {issue.status}
                  </span>
                </div>
                {issue.photo && (
                  <img src={issue.photo} alt='Issue' className='w-full max-w-md rounded-lg shadow-sm' />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyIssues;