import React from 'react';
import { accessUrl } from '../spotify/Spotify';

const Login = () => {
  return (
    <div>
        <h2>ログイン前です</h2>
        <a href={accessUrl}>spotifyへログイン</a>
    </div>
  )
}

export default Login