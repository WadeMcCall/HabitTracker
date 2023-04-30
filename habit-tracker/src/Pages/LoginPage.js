import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

function LoginPage() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/login`, data);
  
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} />}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password:</label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => <input type="password" {...field} />}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Login</button>
      </form>

      <Link to="/register">Register</Link>
    </div>
  );
}

export default LoginPage;
