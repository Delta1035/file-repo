import React from 'react'
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../utils/authConfig";
import * as Style from '@/views/login/LoginStyle'

export default function SignInButton ({ isAuthenticated }) {

  const { instance } = useMsal();



  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch(e => {
      console.log(e);
    })
  }

  return (
    <div>
      <Style.LoginButton onClick={handleLogin}>Log In</Style.LoginButton>
    </div>
  )
}
