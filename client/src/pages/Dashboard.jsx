import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await axios.get('/api/issues');
      setIssues(res.data);
    } catch (err) {
      setError('Failed to load issues');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/issues/${id}`, { status });
      fetchIssues();
    } catch (err) {
      alert('Failed to update status');
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

  if (loading) return <div className='p-10'>Loading...</div>;
  if (error) return <div className='p-10 text-red-500'>{error}</div>;

  return (
    <div className='p-10 bg-gray-50 min-h-screen'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8'>Issue Management Dashboard</h1>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white p-6 rounded-xl shadow-md'>
            <h3 className='text-2xl font-bold text-blue-600'>{issues.length}</h3>
            <p className='text-gray-600'>Total Issues</p>
          </div>
          <div className='bg-white p-6 rounded-xl shadow-md'>
            <h3 className='text-2xl font-bold text-yellow-600'>{issues.filter(i => i.status === 'pending').length}</h3>
            <p className='text-gray-600'>Pending</p>
          </div>
          <div className='bg-white p-6 rounded-xl shadow-md'>
            <h3 className='text-2xl font-bold text-green-600'>{issues.filter(i => i.status === 'resolved').length}</h3>
            <p className='text-gray-600'>Resolved</p>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-md overflow-hidden'>
          <div className='p-6 border-b'>
            <h2 className='text-2xl font-semibold'>All Issues</h2>
          </div>
          <div className='divide-y'>
            {issues.map(issue => (
              <div key={issue._id} className='p-6 hover:bg-gray-50'>
                <div className='flex justify-between items-start mb-4'>
                  <div>
                    <h3 className='font-semibold text-lg'>{issue.title}</h3>
                    <p className='text-gray-600'>{issue.description}</p>
                    <p className='text-sm text-gray-500 mt-2'>
                      Reported by: {issue.reportedBy.name} • Location: {issue.location}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(issue.status)}`}>
                    {issue.status}
                  </span>
                </div>
                {user.role === 'authority' && (
                  <div className='flex gap-2'>
                    <button
                      onClick={() => updateStatus(issue._id, 'in-progress')}
                      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                    >
                      Mark In Progress
                    </button>
                    <button
                      onClick={() => updateStatus(issue._id, 'resolved')}
                      className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
                    >
                      Mark Resolved
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;