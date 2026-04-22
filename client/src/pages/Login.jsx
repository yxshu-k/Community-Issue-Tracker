import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md bg-white shadow-lg p-8 rounded-2xl'>
        <h2 className='text-3xl font-bold mb-6 text-center'>Login</h2>

        {error && <p className='text-red-500 mb-4'>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            className='w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className='w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Password'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50'
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className='mt-4 text-center'>
          Don't have an account? <Link to='/register' className='text-blue-600'>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;