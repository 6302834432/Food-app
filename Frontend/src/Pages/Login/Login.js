import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../Login/Login.css'
import Title from '../../Components/Title/Title';
import Input from '../../Components/Input/Input';
import { Button } from '../../Components/Button/Button.js';
import { AuthContext } from '../../Hooks/UseAuthHook';

export default function LoginPage() {
  const {user,login}=useContext(AuthContext)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (!user) return;

    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user,navigate,returnUrl]);

  const submit = async ({ email, password }) => {
    await login(email, password);
  };

  return (
    <div className='login-container'>
      <div className='login-details'>
        <Title title="Login" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="email"
            label="Email"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: 'Email Is Not Valid',
              },
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register('password', {
              required: true,
            })}
            error={errors.password}
          />

          <Button type='submit' text="Login" />
          
          <div className='register'>
            <Link to='/forgotpassword'  style={{textDecoration:"none"}}> <span>Forgot Password    </span></Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <span>
            <Link to={`/register?${returnUrl?'returnUrl'+returnUrl:""}`}  style={{textDecoration:'none'}}>
            Register Here</Link>
            </span>
          </div>

        </form>
      </div>

    </div>
  );
}