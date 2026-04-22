import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className='text-center py-24 px-6 bg-gradient-to-b from-blue-50 to-white'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-5xl md:text-6xl font-bold mb-6 text-gray-900'>
          Report Local Issues, <span className='text-blue-600'>Build Better Communities</span>
        </h1>
        <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
          Connect citizens and authorities for faster resolution of potholes, garbage, streetlights, and more. Track progress in real-time.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            to='/register'
            className='bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg'
          >
            Get Started Free
          </Link>
          <Link
            to='/login'
            className='border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-colors'
          >
            Login to Dashboard
          </Link>
        </div>

        <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
          <div className='bg-white p-6 rounded-xl shadow-md'>
            <div className='text-3xl mb-4'>📱</div>
            <h3 className='font-semibold mb-2'>Easy Reporting</h3>
            <p className='text-gray-600'>Report issues with photos and location in seconds</p>
          </div>
          <div className='bg-white p-6 rounded-xl shadow-md'>
            <div className='text-3xl mb-4'>📊</div>
            <h3 className='font-semibold mb-2'>Real-time Tracking</h3>
            <p className='text-gray-600'>Monitor status updates from authorities</p>
          </div>
          <div className='bg-white p-6 rounded-xl shadow-md'>
            <div className='text-3xl mb-4'>🏛️</div>
            <h3 className='font-semibold mb-2'>Government Integration</h3>
            <p className='text-gray-600'>Direct connection to local authorities</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;