import React from 'react'
import * as Style from '../../views/login/LoginStyle'
import { useMsal } from '@azure/msal-react';
import { message } from 'antd';
import { useEffect } from 'react';
import { getToken, getLoginRole } from '@/api/index'
import { useIsAuthenticated } from "@azure/msal-react";
import SignInButton from './SignInButton';
import useLoginLogoutHook from '@/hooks/useLoginLogoutHook';
import { changeLanguage } from '../../i18n/i18next';

export default function Login (props) {

  const { instance } = useMsal();

  const { whenLoginSucces, whenLoginFail } = useLoginLogoutHook();

  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    instance.handleRedirectPromise().then(tokenResponse => {
      localStorage.setItem('accessToken', tokenResponse.accessToken);
      if (tokenResponse) {
        getToken()
          .then(res => {
            if (res.data?.code === 200) {
              message
                .loading('登錄中..', 1.5)
                .then(() => message.success('登錄成功', 1.5))
              const { username } = res.data.data
              localStorage.setItem('language', res.data.data.userConfig.language)
              changeLanguage(res.data.data.userConfig.language)
              whenLoginSucces(username)
              setTimeout(() => {
                props.history.replace('/')
              }, 1500);
            } else if (res.response.status === 401) {
              whenLoginFail()
              setTimeout(() => {
                instance.logoutRedirect({
                  postLogoutRedirectUri: `${process.env.REACT_APP_AZURE_REDIRECT}/login/`,
                })
              }, 3000);
            }
          }).catch(err => {
            if (err.response.data.message === "token无效! ! !") {
              window.location.href = "/login";
            }
            message.error(err.response.data.message);
          })
        getLoginRole().then(res => {
          localStorage.setItem("loginRole", res.data.data.loginRole)
        })
      } else {
        props.history.replace('/login')
      }
    })
      .catch(error => {
        props.history.replace('/login')
      });
  }, [])//eslint-disable-line

  return (
    <Style.LoginStyle bgImg={require('../../assets/imgs/icons/Login/TEST LOGIN_TMS_index.png')}>
      <Style.LoginContainer>
        <Style.Welcome alt='' src={require('../../assets/imgs/icons/Login/Group 11092.png')}></Style.Welcome>
        <Style.LoginLog alt='' src={require('../../assets/imgs/icons/Login/Vector.png')}></Style.LoginLog>
        <Style.LoginTitle>PCB Develop Management System</Style.LoginTitle>
        {/* {isAuthenticated ? <Style.LoginLoading>登陆中......</Style.LoginLoading> : <SignInButton />} */}
        <SignInButton isAuthenticated={isAuthenticated} />
      </Style.LoginContainer>

      <Style.LoginNotice> Supported browser version include Chrome 69 or above, IE 11 or above.Copyright © 2020 Wistron Corporation. All Rights Reserved.</Style.LoginNotice>
    </Style.LoginStyle>
  )
}
