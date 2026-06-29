import React from 'react';

interface Custom404Props {
  message?: string;
}

export default function Custom404({ message = "Oops! We couldn't find what you were looking for." }: Custom404Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8">{message}</p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go back home
      </a>
    </div>
  );
}
