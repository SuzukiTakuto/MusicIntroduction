import React from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

type LoginUser = {
  email: string,
  password: string
};

const Login = () => {
  const { register, watch, handleSubmit, formState } = useForm<LoginUser>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleOnSubmit: SubmitHandler<LoginUser> = async (values) => {
    console.log(values);

    return fetch ("http://localhost:8000/v1/user/login", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(values),
    }).then((res) => {
        return res.json();
    }).then((data) => {
        localStorage.setItem("token", data.token)
        console.log(data.token)
        window.location.href = "http://localhost:3000";
    }).catch(()=>{
        console.log("error");
    });

  }

  const handleOnError: SubmitErrorHandler<LoginUser> = (errors) => {
    console.log(errors)
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)} >

        <label htmlFor='email'>Email</label>
        {!!formState.errors.email && 
          <p>{formState.errors.email.message}</p>
        }
        <input
          id='email'
          type="email" 
          {...register('email', {
            required: '* this is required filed'
          })} 
        />

        <label htmlFor='password'>Password</label>
        {!!formState.errors.password && 
          <p>{formState.errors.password.message}</p>
        }
        <input
          id='password'
          type="password" 
          {...register('password', {
            required: '* this is required filed'
          })} 
        />


        // 送信ボタン
        <button type="submit" disabled={!formState.isDirty || formState.isSubmitting}>
           Click
         </button>
      </form>
    </>
  )
}

export default Login