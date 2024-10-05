import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthForm = ({ formType, handleSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    handleSubmit(email, password);
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-700">{formType === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          {formType === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600 text-center">
        {formType === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
        <a href={formType === 'login' ? '/register' : '/login'} className="text-blue-500 hover:underline">
          {formType === 'login' ? 'Sign Up' : 'Log In'}
        </a>
      </p>
    </div>
  );
};

export default AuthForm;
