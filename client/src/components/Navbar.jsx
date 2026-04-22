import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className='flex justify-between items-center px-10 py-5 shadow-sm bg-white'>
      <Link to='/' className='text-2xl font-bold text-blue-600'>Community Issue Tracker</Link>

      <div className='space-x-6 flex items-center'>
        <Link to='/' className='hover:text-blue-600'>Home</Link>
        {user ? (
          <>
            <Link to='/dashboard' className='hover:text-blue-600'>Dashboard</Link>
            <Link to='/report' className='hover:text-blue-600'>Report Issue</Link>
            <Link to='/myissues' className='hover:text-blue-600'>My Issues</Link>
            <span className='text-gray-600'>Hello, {user.name}</span>
            <button onClick={logout} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>Logout</button>
          </>
        ) : (
          <>
            <Link to='/login' className='hover:text-blue-600'>Login</Link>
            <Link to='/register' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;