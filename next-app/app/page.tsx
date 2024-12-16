import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-extrabold mb-12 text-gray-800">
        Welcome to <span className="text-blue-600">PRDify!</span>
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center space-y-6 w-full max-w-md">
        <p className="text-lg text-gray-700 font-semibold text-center">Start your journey:</p>
        <div className="flex flex-row items-center space-x-4">
          <Link href="/login">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
