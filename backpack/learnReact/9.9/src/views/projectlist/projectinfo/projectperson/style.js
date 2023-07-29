import styled from "styled-components";
import { Button, Select } from "antd";

export const LayoutEditFooter = styled.div`
    margin-right: 6px;
`;

export const BackButton = styled(Button)`
 &.ant-btn{
    font-family: 'Microsoft JhengHei';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    border: 1px solid #000000;
    border-radius: 4px;
    background: #FFFFFF;
    align-items: center;
    text-align: center;
    color: #000000;
    width: 90px;
 }
`;

export const SaveButton = styled(Button)`
 &.ant-btn{
    font-family: 'Microsoft JhengHei';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    border: 1px solid #000000;
    border-radius: 4px;
    background: #000000;
    align-items: center;
    text-align: center;
    color: #FFFFFF;
    width: 90px;
 }
`;

export const Member = styled.div`
   text-overflow: ellipsis;
   width: 100;
   white-space: nowrap;
   overflow: hidden;
`;

export const MySelect = styled(Select)`
   &.ant-select-selector{
      height: '120px';
      width: '100%';
   }
`;