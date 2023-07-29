
import React from 'react'
import { Layout } from 'antd';
import * as Style from './TopHeaderStyle';
import HeaderMenu from '../headermenu/HeaderMenu';
const { Header } = Layout;
export default function TopHeader () {


  return (
    <Style.TopHeader>
      <Header className='site-layout-sub-header-background'>
        <HeaderMenu />
      </Header>
    </Style.TopHeader>
  )
}
