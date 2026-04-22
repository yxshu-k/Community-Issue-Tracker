import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'citizen' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md bg-white shadow-lg p-8 rounded-2xl'>
        <h2 className='text-3xl font-bold mb-6 text-center'>Create Account</h2>

        {error && <p className='text-red-500 mb-4'>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            className='w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          <select
            className='w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            name='role'
            value={formData.role}
            onChange={handleChange}
          >
            <option value='citizen'>Citizen</option>
            <option value='authority'>Authority</option>
          </select>

          <button
            className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50'
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Signup'}
          </button>
        </form>

        <p className='mt-4 text-center'>
          Already have an account? <Link to='/login' className='text-blue-600'>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;