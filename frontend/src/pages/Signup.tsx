import React, { useState, useEffect, useRef } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { LoginUser, Limit } from '../type';
import styled from 'styled-components';
import { Input, FormHeader, Container, Form } from '../components/components';

const Signup = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const { register, watch, handleSubmit, formState } = useForm<LoginUser>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      iconImg: ''
    }
  });

  const handleOnSubmit: SubmitHandler<LoginUser> = async (values) => {
    console.log(values);
    values.iconImg = imageUrl;

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
        console.log(data)
        localStorage.setItem("token", data.token)
        window.location.href = "http://localhost:3000/login";
    }).catch((err: Error)=>{
        console.log(err);
    });
  }

  const handleOnError: SubmitErrorHandler<LoginUser> = (errors) => {
    console.log(errors)
  }

  const handleAddImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null) {
      const file = e.currentTarget.files[0];
      upImage(file)
    }
  }

  const upImage = async (file: File) => {
    const imgUrl: string  = await readImage(file);
    setImageUrl(imgUrl);
    displayProcess(imgUrl);
  }

  const readImage = (img: File) => {
    return new Promise<string>((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result as string);
      }
      fileReader.readAsDataURL(img);
    });
  }

  const newImg = new Image();

  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const [context,setContext] = useState<CanvasRenderingContext2D>();

  const displayProcess = async (imgUrl: string) => {
    if (!canvas || !context) {
      return
    }
    let scale: number = await getImageRetio(imgUrl);
    displayImage(newImg, scale);
    //imageMove(scale);
  }

  const [limit, setLimit] = useState<Limit>({x: 0, y: 0});

  const getImageRetio = (url: string) => {
    return new Promise<number>((resolve, reject) => {
      let scale: number;

      if (!canvas || !context) {
        return
      }

      newImg.onload = () => {
        context.restore();
        let ratio = newImg.width / newImg.height;
        switch (true) {
          case ratio < 1:
            scale = canvas.width / newImg.width;
            break;
          case ratio >= 1:
            scale = canvas.height / newImg.height;
            break;
        }
        setLimit({
          x: newImg.width * scale,
          y: newImg.height * scale,
        });
        resolve(scale);
      }
      newImg.src = url;
    });
  }

  const displayImage = (img: HTMLImageElement, scale: number) => {
    if (!context) {
      return
    }
    context.save();
    context.scale(scale, scale);
    context.drawImage(img, 0, 0);
    setImageUrl(context.canvas.toDataURL());
  }


  useEffect(()=>{
    const gotCanvas = document.getElementById("canvas") as HTMLCanvasElement;
    setCanvas(gotCanvas);
    if (!gotCanvas) return
    const canvasContext = gotCanvas.getContext("2d") as CanvasRenderingContext2D;
    setContext(canvasContext);
  },[]);

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleOnSubmit, handleOnError)} >
        <FormHeader>アカウント作成</FormHeader>
        <CanvasContainer>
          <Canvas>
            <canvas width="300" height="300" id="canvas"></canvas>
          </Canvas>
          <label htmlFor='iconImg'>
            画像選択
            <input 
              id="iconImg"
              type="file"
              accept="image/jpeg"
              {...register('iconImg', {
                required: '* this is required filed'
              })} 
              onChange={handleAddImg}
            />
          </label>
          {!!formState.errors.iconImg && 
            <p>{formState.errors.iconImg.message}</p>
          }
        </CanvasContainer>
      
      

        <Input>
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
            maxLength={4}
          />
        </Input>
        
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
            id='passwrod'
            type="password" 
            {...register('password', {
              required: '* this is required filed'
            })} 
          />
        </Input>
        

        <Button type="submit" disabled={!formState.isDirty || formState.isSubmitting}>
           Click
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

const CanvasContainer = styled.div`

`;

const Canvas = styled.div`
  border: 1px solid #222;
  width: 300px;
  height: auto;
  margin: 0 auto;
`;

export default Signup