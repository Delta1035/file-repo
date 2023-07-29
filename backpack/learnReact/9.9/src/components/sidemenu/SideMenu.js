import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import Collapsed from '../collapsed/Collapsed'
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Style from './SideMenuStyle';
import Icon from '@/icon/Icon';

const { Sider } = Layout;

function SideMenu (props) {

  const [isCollapsed, setIsCollapsed] = useState(false);

  const { t } = useTranslation();

  const onClickCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handlechangerouter = ({ key }) => {
    props.history.push(key);
    localStorage.setItem('sidekey', key)
  }
  const items = [
    {
      key: '/projectlist',
      icon: <Icon.Pjct />,
      label: t('sideMenu.projectList'),
    },
    {
      key: '/cockpit',
      icon: <Icon.Cockpit />,
      label: 'Cockpit',
    },
    // {
    //   key: '/workflow',
    //   icon: <Icon.Work />,
    //   label: 'WorkFlow',
    // },
    {
      key: '/guideline',
      icon: <Icon.Guinde />,
      label: t('sideMenu.guideline'),
    },

    // {
    //   key: '/user',
    //   icon: <Icon.User />,
    //   label: 'User管理',
    // },

  ]

  const noCockpit = [
    {
      key: '/projectlist',
      icon: <Icon.Pjct />,
      label: t('sideMenu.projectList'),
    },
    {
      key: '/guideline',
      icon: <Icon.Guinde />,
      label: t('sideMenu.guideline'),
    },
  ]
  return (
    <Style.SideMenuitem>
      <Sider
        collapsed={isCollapsed}
        width={200}

        trigger={null}
        collapsedWidth={64}

      >
        <Style.Pcblog>
          <Icon.Logpcb />
        </Style.Pcblog>

        <Menu
          theme='dark'
          items={localStorage.getItem("loginRole") === "Member" ? noCockpit : items}
          mode='inline'
          inlineIndent={22}
          onClick={handlechangerouter}
          defaultSelectedKeys={localStorage.getItem('sidekey') === null ? '/projectlist' : localStorage.getItem('sidekey')}
        // selectedKeys={selectKey}
        />
        <div className="bottom">
          <Collapsed isCollapsed={isCollapsed} onClick={onClickCollapsed} />
        </div>

      </Sider>
    </Style.SideMenuitem>



  )
}
export default withRouter(SideMenu)