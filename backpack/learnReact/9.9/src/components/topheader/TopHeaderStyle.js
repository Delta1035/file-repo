import styled from 'styled-components';
import { memo } from 'react';
import { Menu } from 'antd'

const color = {
  primary_1: '#000000',
  primary_2: '#333333',
  primary_3: '#797979',
  primary_4: '#C1C1C1',
  primary_5: '#00000033',
  primary_6: '#383838',
  primary_7: '#1E1E1E',
  primary_8: '#999999',
  primary_9: '#333333',
  gray_1: '#CCCCCC',
  gray_2: '#D7D7D7',
  gray_3: '#F2F2F2',
  gray_4: '#6b6b6b54',
  yellow_1: '#F5C910',
  yellow_2: '#FFFBE6',
  yellow_3: '#f5c910',
  blue_1: '#66CCCC',
  blue_2: '#EDF6F9',
  red_1: '#FF0000',
  red_2: '#FFF2F1',
  red_3: '#ff000066',
  green_1: '#B7EB8F',
  green_2: '#F6FFED',
  green_3: '#52C41A',
  white_1: '#FFFFFF',
  orange_1: '#F9AC14',
};
export const Logout = memo(styled.div`
    float: right;
    cursor: pointer;
    font-weight: 400;
    margin-right: 20px;
    margin-left: 20px;
`)

export const TopHeader = memo(styled.div`
    height: 40px;
  .site-layout-sub-header-background{
    background: #d7d7d7;
    padding: 0 16px;
  }
`)



export const LoginName = memo(styled.div`
  float: right;
  font-weight: 400;
`)

export const Drop = memo(styled.div`
  float: right;
  .ant-select{
    margin-top: 5px;

   .ant-select-selector{
    background-color: ${color.gray_2};
    border: 1px solid ${color.primary_1};
    height: 24px;
    border-radius: 4px;
    line-height: 24px;
   } 
  }
 
`)

export const Backbtn = memo(styled.div`
   line-height: 40px;
   float: left;
   font-size: 14px;
   cursor: pointer;

`)

export const BlackMenu = styled(Menu)`
  &.ant-dropdown-menu{
    background: #333333;
    .ant-dropdown-menu-item{
      /* border: 1px solid red; */
      color: white;
    }
    .ant-dropdown-menu-item-active{
      background: #333333;
      color: #F5C910;
    }
  }
`;

export const HeaderMenuStylye = memo(styled.div`
  float: right;
  line-height: 40px;
  .ant-select{
  margin-right: 10px;
    .ant-select-selector{
    width: 100px;
    background-color: ${color.gray_2};
    border: 1px solid ${color.primary_2};
    height: 25px !important;
    border-radius: 4px;
    line-height: 24px;
    padding: 1px 7px  !important;
    .ant-select-selection-item{
      width: 77px;
    }
   } 
  }
  .ant-btn{
    margin-right: 10px;
    background-color: ${color.gray_2};
    border: 1px solid ${color.primary_2};
    height: 25px !important;
    border-radius: 4px;
    line-height: 24px;
    padding: 1px 7px  !important;
  }
  .ant-dropdown{
  }
`)

export const Version = styled.div`
    font-size: 12px;
    color: ${color.primary_2};
    font-family: 'Microsoft JhengHei';
    float: left;
    margin: 0px 20px;
`