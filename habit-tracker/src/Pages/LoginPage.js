import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

function LoginPage() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const cookies = new Cookies();
  
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/login`, data);
  
      if (response.status === 200) {
        const { token } = response.data;
        cookies.set('authToken', token);
        navigate("/");
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email:</label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password:</label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="password"
                  {...field}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none"
          >
            Login
          </button>
        </form>
  
        <div className="mt-4 text-center">
          <Link to="/register" className="text-indigo-500 hover:text-indigo-600">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
