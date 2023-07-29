import { memo } from 'react';
import styled from 'styled-components';

const color = {
  primary_1: '#000000',
  primary_2: '#333333',
  primary_3: '#797979',
  primary_4: '#C1C1C1',
  primary_5: '#0000033',
  primary_6: '#383838',
  primary_7: '#1E1E1E',
  primary_8: '#999999',
  primary_9: '#333333',
  gray_2: '#D7D7D7',
  gray_3: '#D9D9D9',
  gray_4: '#F2F2F2',
  yellow_1: '#F5C910',
  yellow_2: '#FFFBE6',
  yellow_3: '#f5c910',
  blue_1: '#486ADF',
  blue_2: '#EDF6F9',
  blue_3: '#1890FF',
  red_1: '#FF0000',
  red_2: '#FFF2F1',
  red_3: '#ff000066',
  green_1: '#00CB3B',
  green_2: '#F6FFED',
  green_3: '#52C41A',
  white_1: '#FFFFFF',
  orange_1: '#F9AC14',
};

export const Collapsed = memo(styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  color: ${color.white_1};
  cursor: pointer;
  transition: all 0.2s;
`);

export const Divider = memo(styled.div`
  color: ${color.primary_3};
  border: 0.5px solid;
  margin: 0px 16px;
`);

export const Pcblog = memo(styled.div`
  height:64px;
  background-color: ${color.primary_1};
  line-height: 64px;
  svg{
    margin-left: 8px;
  }
`);

export const SideMenuitem = memo(styled.div`
  height: 100%;
  .ant-layout-sider{
    height: 100%;
  }
.ant-layout-sider-children {
  background: ${color.primary_9};
  .ant-menu {
  background-color: ${color.primary_9};
}
  .ant-menu-item{
    margin-top: 0;
    margin-bottom: 0;
    height: 64px ;
    display: flex;
    align-items: center;
    font-size: 17px;
    /* padding: 0 calc(50% - 22px / 2); */
   
    .ant-menu-title-content{
    color: ${color.white_1} ;
    }
    .ant-menu-item-icon{
      flex-shrink: 0;
     
    } 
  }
  .ant-menu-item-selected {
  background-color:${color.yellow_3}  !important;

  path{
        fill: ${color.primary_1};
      }
  
  .ant-menu-title-content{
    color: ${color.primary_1}  ;
  }
  .icon-user:before {
    color: ${color.primary_1};
  }
}
}
`);

