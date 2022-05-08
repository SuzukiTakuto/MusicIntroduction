import React from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { accessUrl } from '../spotify/Spotify';
import { Input, FormHeader, Container, Form } from '../components/components';
import styled from 'styled-components';

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
        window.location.href = accessUrl;
    }).catch(()=>{
        console.log("error");
    });

  }

  const handleOnError: SubmitErrorHandler<LoginUser> = (errors) => {
    console.log(errors)
  }

  return (
    <Container>
      
      <Form onSubmit={handleSubmit(handleOnSubmit, handleOnError)} >
        <FormHeader>ログイン</FormHeader>
        <Input>
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
        </Input>
        
        <Input>
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
        </Input>
        
        <Button type="submit" disabled={!formState.isDirty || formState.isSubmitting}>
           ログイン
         </Button>
      </Form>
    </Container>
  )
}

const Button = styled.button`
  border: none;
  width: 80px;
  height: 30px;
  border-radius: 30px;
  background-color: #000;
  color: #fff;
  display: block;
  margin: 0 auto;
`;



export default Login