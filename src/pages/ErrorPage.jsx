import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <h1 className="text-3xl font-bold text-danger mb-4">404 - Page Not Found</h1>
    <p className="mb-6 text-gray-700">Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className="primary-color hover:underline">Go to Home</Link>
  </div>
);

export default ErrorPage;