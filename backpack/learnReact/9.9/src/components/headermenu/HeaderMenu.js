import React from 'react'
import { Button, Dropdown, Space, Select, message } from 'antd'
import { DownOutlined, LeftOutlined } from '@ant-design/icons';
import { BlackMenu } from '../topheader/TopHeaderStyle'
import { withRouter } from 'react-router-dom'
import * as Style from '../topheader/TopHeaderStyle'
import store from '../../mobx/store'
import { useMsal } from "@azure/msal-react";
import useLoginLogoutHook from '@/hooks/useLoginLogoutHook';
import { changeLanguage } from '../../i18n/i18next';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '../../api';
const { Option } = Select;

function HeaderMenu (props) {


  const { t } = useTranslation();
  const urlList = ['/projectlist', '/cockpit', '/guideline'];

  const handleBack = () => {
    // props.history.goBack();
    props.history.replace(props.location.pathname.substr(0, 8) === '/cockpit' ? '/cockpit' : '/projectlist');
    store.resetShowCircleList()
  }

  const { whenLogout } = useLoginLogoutHook()
  const { instance } = useMsal();

  const handleLogout = () => {
    whenLogout()
    instance.logoutRedirect({
      postLogoutRedirectUri: `${process.env.REACT_APP_AZURE_REDIRECT}/login/`,
    }).catch(res => {
      console.error(res);
    })
  }
  // 語言切換
  const handleChangeLanguage = (value) => {

    setLanguage({
      language: value
    }).then(res => {
      if (res.data.code === 200) {
        localStorage.setItem('language', value)
        changeLanguage(value)
        window.location.reload()
      } else {
        message.error(t('headerMenu.errorMessage'))
      }
    }).catch(err => {
      message.error(t('headerMenu.errorMessage'))
    })

  }


  const ExternalLink = (
    <BlackMenu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="http://cissvr.wistron.com/rd.htm">
              Cissvr compare web
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://emdm-wsd.wistron.com/#/">
              eMDM
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://plm.wistron.com/Windchill/app/#ptc1/homepage">
              PLM
            </a>
          ),
        },
        {
          key: '4',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://pts.wistron.com/~pts/login.php">
              PTS
            </a>
          ),
        },
        {
          key: '5',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://wistron.sharepoint.com/sites/CSBG-RD_Database_Portal/SIV_PIV%20Database/StackUp/SitePages/%E9%A6%96%E9%A0%81.aspx">
              Stack up web
            </a>
          ),
        },
        {
          key: '6',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="http://10.41.67.30/yii-advanced/frontend/web/index.php?r=urs%2Fhome%2Findex">
              URS
            </a>
          ),
        },
        {
          key: '7',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://widfx.wistron.com/">
              WiDFX
            </a>
          ),
        },
        {
          key: '8',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://wiflowx.wistron.com/dashboard">
              WiFlowX
            </a>
          ),
        },
        {
          key: '9',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="http://proi.wistron.com/Windchill/app/">
              Windchill
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <>
      {urlList.includes(props.location.pathname) ? '' : <Style.Backbtn onClick={handleBack}><LeftOutlined />Back</Style.Backbtn>}
      <Style.HeaderMenuStylye>
        <Style.Version>System Version:{process.env.REACT_APP_VERSIONS}-20221202-Sprint9</Style.Version>
        <Dropdown overlay={ExternalLink} trigger={['click']}>
          <Space>
            <Button
              type='link'
              style={{ color: '#333333' }}>
              {t('headerMenu.externalLink')}
              <DownOutlined />
            </Button>
          </Space>
        </Dropdown>
        <a target="_blank" href='https://wistron.sharepoint.com/:f:/t/WiPCB2/Eq3gvQ_jJZ9DtrM0K9l9mCUBo9o7ZiX880pUQrIm8uKddw?e=gGMYL5' rel="noreferrer"><Button type='text'>{t('headerMenu.operationSOP')}</Button></a>
        <Select
          data-testid='showselect'
          defaultValue={localStorage.getItem('language') === null ? 'zh_TW' : localStorage.getItem('language')}
          size='small'
          onChange={handleChangeLanguage}
        >
          <Option value="zh_TW">{t('headerMenu.traditional')}</Option>
          <Option value="en_US">{t('headerMenu.english')}</Option>

        </Select>


        <Style.LoginName>{localStorage.getItem('username')}</Style.LoginName>
        <Style.Logout onClick={handleLogout}>
          {t('headerMenu.logOut')}
        </Style.Logout>

      </Style.HeaderMenuStylye>
      {/* <Modal
        title="語言切換"
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal> */}
    </>

  )
}

export default withRouter(HeaderMenu);
