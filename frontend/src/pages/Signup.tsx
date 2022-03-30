import React, { useState, useRef } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

type User = {
    username: string,
    email: string,
    password: string
};

const Signup = () => {
  const { register, watch, handleSubmit, formState } = useForm<User>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  const handleOnSubmit: SubmitHandler<User> = async (values) => {
    console.log(values);

    return fetch ("http://localhost:8000/v1/user/create", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(values)
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data.token)
        localStorage.setItem("token", data.token)
    }).catch(()=>{
        console.log("error");
    });
  }

  const handleOnError: SubmitErrorHandler<User> = (errors) => {
    console.log(errors)
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)} >
        <label htmlFor='name'>User Name</label>
        {!!formState.errors.username && 
          <p>{formState.errors.username.message}</p>
        }
        <input
          id='name'
          type="text" 
          {...register('username', {
            required: '* this is required filed'
          })} 
        />

        <label htmlFor='name'>Email</label>
        {!!formState.errors.email && 
          <p>{formState.errors.email.message}</p>
        }
        <input
          id='name'
          type="email" 
          {...register('email', {
            required: '* this is required filed'
          })} 
        />

        <label htmlFor='name'>Password</label>
        {!!formState.errors.password && 
          <p>{formState.errors.password.message}</p>
        }
        <input
          id='name'
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

export default Signup