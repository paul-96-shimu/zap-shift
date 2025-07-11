import React from 'react';
import { Link } from 'react-router';

const ForBidden = () => {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-4">🚫 Access Denied</h1>
      <p className="text-lg text-gray-700 mb-6">
        You do not have permission to view this page.
      </p>
      <Link to="/" className="btn btn-primary">
        🔙 Go Back Home
      </Link>
    </div>
    );
};

export default ForBidden;