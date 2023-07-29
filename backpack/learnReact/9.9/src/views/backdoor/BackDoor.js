import React from "react";
import { message } from "antd";
import { Service } from "../../utils/request";
import useLoginLogoutHook from "@/hooks/useLoginLogoutHook";
import * as Style from './BackDoorStyle'
import { changeLanguage } from '../../i18n/i18next';

export default function BackDoor (props) {

  const { whenLoginSucces, whenLoginFail } = useLoginLogoutHook();

  // const { t } = useTranslation();

  const onFinish = () => {
    var inputValue = document.getElementById("inputvalue").value;

    if (inputValue !== '') {
      Service({
        url: "/system/commonBackdoor",
        params: { username: inputValue }
      })
        .then(res => {
          localStorage.setItem('accessToken', res.data.data.token);
          whenLoginSucces(res.data.data.username);
          localStorage.setItem('accessToken', res.data.data.token);
          localStorage.setItem('language', res.data.data.userConfig.language);
          changeLanguage(res.data.data.userConfig.language)
          setTimeout(() => {
            props.history.replace("/");
          }, 1000);
        })
        .catch(err => {
          whenLoginFail();
          props.history.replace("/changerole");
        });
    } else {
      message.error('請輸入用戶名')
    }
  };

  return (
    <Style.LoginBackDoor>

      <Style.LoginForm>
        <Style.LogingForm >
          <Style.Log></Style.Log>
          <Style.InputBox>
            <input type="text" id='inputvalue' required="required" />
            <span>User Email</span>
            <i></i>
          </Style.InputBox>
          <input type="submit" value="Login" onClick={onFinish} />
        </Style.LogingForm>
      </Style.LoginForm>
      <div class="square">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="circle">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </Style.LoginBackDoor>
  );
}
