import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ReportIssue() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other',
    location: '',
    photo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post('/api/issues', formData);
      navigate('/myissues');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to report issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4'>
      <div className='max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-2xl'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Report an Issue</h1>

        {error && <p className='text-red-500 mb-4 text-center'>{error}</p>}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium mb-2'>Title</label>
            <input
              className='w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Brief title of the issue'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Description</label>
            <textarea
              className='w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32'
              placeholder='Detailed description of the issue'
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Category</label>
            <select
              className='w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              name='category'
              value={formData.category}
              onChange={handleChange}
            >
              <option value='pothole'>Pothole</option>
              <option value='garbage'>Garbage</option>
              <option value='streetlight'>Streetlight</option>
              <option value='water'>Water Leakage</option>
              <option value='other'>Other</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Location</label>
            <input
              className='w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Street address or landmark'
              name='location'
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Photo URL (optional)</label>
            <input
              className='w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='https://example.com/photo.jpg'
              name='photo'
              value={formData.photo}
              onChange={handleChange}
            />
          </div>

          <button
            className='w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-lg font-semibold'
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Issue'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;