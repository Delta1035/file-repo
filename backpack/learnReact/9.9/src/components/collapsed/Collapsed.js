import React from 'react'
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './collapesed.css'
import * as Style from '../sidemenu/SideMenuStyle';


export default function Collapsed ({ isCollapsed, onClick }) {
  const { t } = useTranslation();
  return (
    <div >
      <Style.Divider />
      <Style.Collapsed onClick={onClick}>
        {isCollapsed ?
          <RightOutlined style={{ fontSize: '20px', paddingLeft: 'calc(50% - 20px / 2)' }} />
          : (
            <React.Fragment>
              <LeftOutlined style={{ fontSize: '20px', marginLeft: 20 }} />
              <span style={{ position: 'relative', marginLeft: 10, fontSize: 17 }}>{t('sideMenu.collapsed')}</span>
            </React.Fragment>
          )}
      </Style.Collapsed>
    </div>
  )
}
