import { useNavigate } from "react-router-dom"

function Welcome() {

    let navigate = useNavigate();
    let path = '/login/';

    function logout() {
        sessionStorage.clear();
        navigate(path)
    }

  return (
    <div className="bg-blue-900 min-h-screen flex items-center justify-center text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-lg mb-8">Transforming the digital world together.</p>
        <div className="bg-white text-blue-900 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Discover Endless Possibilities</h2>
          <p className="text-lg mb-6">Empowering businesses with cutting-edge solutions.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="bg-blue-900 text-white rounded-full h-12 w-12 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Innovative Solutions</h3>
                <p className="text-lg">Stay ahead with our cutting-edge technologies.</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-900 text-white rounded-full h-12 w-12 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m16-4V5a2 2 0 00-2-2H7a2 2 0 00-2 2v6"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Scalable Solutions</h3>
                <p className="text-lg">Grow your business with our scalable platforms.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <button className="bg-white hover:bg-gray-200 text-blue-900 font-semibold py-3 px-6 border border-gray-400 rounded-full shadow-lg mt-6">
            Explore Now
          </button>
          <button onClick={logout} className="bg-white hover:bg-gray-200 align-top text-blue-900 font-semibold py-3 px-6 border border-gray-400 rounded-full shadow-lg mt-6">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Welcome