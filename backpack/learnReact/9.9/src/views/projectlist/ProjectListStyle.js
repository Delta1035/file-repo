import { memo } from "react";
import { Form } from "antd";
import styled from "styled-components";
const color = {
  primary_1: "#000000",
  primary_2: "#333333",
  primary_3: "#797979",
  primary_4: "#C1C1C1",
  primary_5: "#00000033",
  primary_6: "#383838",
  primary_7: "#1E1E1E",
  primary_8: "#999999",
  primary_9: "#808080",
  gray_1: "#EBEBEB",
  gray_2: "#D7D7D7",
  gray_3: "#D9D9D9",
  gray_4: "#F2F2F2",
  gray_5: "#EDEDED",
  gray_6: "#CCCCCC",
  gray_7: "#949494",
  yellow_1: "#F5C910",
  yellow_2: "#FFFBE6",
  blue_1: "#486ADF",
  blue_2: "#EDF6F9",
  blue_3: "#1890FF",
  red_1: "#FF0000",
  red_2: "#FFF2F1",
  red_3: "#000066",
  green_1: "#00CB3B",
  green_2: "#F6FFED",
  green_3: "#52C41A",
  white_1: "#FFFFFF",
  orange_1: "#F9AC14"
};

export const ProjectTitle = memo(styled.div`
  font-size: 18px;
  font-weight: 700;
  font-family: 'Microsoft JhengHei';
  line-height: 24px;
`);

export const StyleTabs = styled.div`
  margin-top: 18px;
  .ant-tabs-top {
    .ant-tabs-nav::before {
      border-color: ${color.gray_2};
    }
    .ant-tabs-nav-list {
      .ant-tabs-ink-bar {
        background: ${color.yellow_1};
        border-bottom: 4px solid ${color.yellow_1};
      }
      .ant-tabs-tab-active {
        .ant-tabs-tab-btn {
          color: ${color.primary_2};
        }
      }
    }
    .ant-tabs-tab {
      padding: 9px 48px;
    }
  }
`;
export const StyleTabsBottom = memo(styled.div`
  /* margin-top: 18px; */
  .ant-tabs-top {
    .ant-tabs-nav {
      margin: 0 !important;
    }
    .ant-tabs-nav::before {
      border-color: ${color.gray_2};
      border-left: 2px solid ${color.yellow_1};
    }
    .ant-tabs-nav-list {
      .ant-tabs-ink-bar {
        background: ${color.yellow_1};
        border-bottom: 1px solid ${color.yellow_1} !important;
      }
      .ant-tabs-tab-active {
        .ant-tabs-tab-btn {
          color: ${color.yellow_1};
        }
      }
    }
    .ant-tabs-tab {
      padding: 9px 48px;
    }
  }
`);

export const Sum = memo(styled.div`
  /* display: flex; */
  margin-bottom:6px;
  height: 20px;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`);

export const Reset = memo(styled.span`
  margin-left: 9px;
  font-family: 'Microsoft JhengHei';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${color.blue_1};
`);
export const ResetImg = memo(styled.span`
  line-height: 15px;
  width: 14px;
  height: 14px;
  margin-left: 18px;
  margin-top: 1px;
  cursor: pointer;
`);

export const Table = memo(styled.div`
  .ant-table-wrapper {
    .ant-table-thead {
      tr {
        th {
          height: 48px;
          padding: 10px 10px;
          background: ${color.white_1};
          border-bottom: none;
          border-right: 0px;
          font-weight: 700;
          border-bottom: 1px solid ${color.primary_4};
        }
        th:before {
          display: none;
        }
      }
    }
    .ant-table-tbody > tr > td {
      height: 40px;
      padding: 8px 8px;
    }
    .ant-table-tbody tr{
      border-left: 3px solid yellow !important;
    }
  }
  .ant-table-column-sort {
    background: none;
  }
  .ant-table-pagination.ant-pagination{
    .ant-pagination-item-active {
      background-color:${color.yellow_1};
      border-color: transparent;
    a{
      color:${color.primary_2}!important
    }
    }
    .ant-pagination-next{
      a{
        color:${color.primary_2}
      }
    }
    .ant-pagination-prev{
      a{
        color:${color.primary_2}
      }
    }
    .ant-pagination-disabled{
      a{
      color:${color.gray_7}
      }
    }
  }
`);

export const File = memo(styled.div`
  width: 200px;
  height: 32px;
  border: 1px solid ${color.primary_2};
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 8px;
  box-sizing: border-box;
`);

export const Info = memo(styled.div`
  /* padding: 18px 16px; */
  background: ${color.white_1};
  box-sizing: border-box;
  margin: 16px;
  .ant-btn-text:hover{
    background: rgba(0,0,0,0);
  }
  .ant-btn-text:focus{
    background: rgba(0,0,0,0);
  }
  .ant-collapse {
    .ant-collapse-header {
      .ant-collapse-header-text {
        font-weight: 700;
        font-size: 16px;
        height: 16px;
        line-height: 16px;
        color: ${color.primary_2};
      }
    }
  }
  .ant-tabs {
    .ant-tabs-nav {
      background: ${color.gray_5};
      .ant-tabs-tab {
        background: ${color.gray_6};
        .ant-tabs-tab-btn {
          color: ${color.white_1};
        }
      }
      .ant-tabs-tab-active {
        background: ${color.blue_1};
        .ant-tabs-tab-btn {
          color: ${color.white_1};
        }
      }
    }
  }
  .ant-collapse-content-box {
    .ant-descriptions-row > th,
    .ant-descriptions-row > td {
      padding-bottom: 14px;
    }
  }
`);

export const GerberReasonTitle = styled.div`
    font-weight: 700;
    font-size: ${props => props.fontsize};
    color: ${color.primary_2};
    margin-bottom: ${props => props.bottom};
`

export const GerberWarn = styled.div`
  font-size: 14px;
  color: ${color.primary_2};
`
export const TitleInfo = memo(styled.div`
  height: 34px;
  width: 100%;
  line-height: 34px;
  background: ${color.white_1};
  text-align: center;

  .ant-btn-text:hover{
    background: rgba(0,0,0,0);
  }
  .ant-btn-text:focus{
    background: rgba(0,0,0,0);
  }
`);

export const ProjectPerson = memo(styled.div`
  .ant-list {
    .ant-spin-container {
      .ant-row {
        .ant-descriptions {
          box-sizing: border-box;
          border: 1px solid ${color.gray_1};
          padding: 1px 0px 0px 16px;
          height: 165px;
          overflow: hidden;
          text-overflow: ellipsis;
          .ant-descriptions-item {
            padding-bottom: 8px;
          }
        }
      }
    }
  }
`);


export const ProgressTitle = memo(styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  padding-left: 16px;
  color: ${color.primary_2};
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;

  .ant-btn-text:hover{
    background: rgba(0,0,0,0);
  }
  .ant-btn-text:focus{
    background: rgba(0,0,0,0);
  }
`);

export const ProgressCircle = memo(styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 60px;
  margin-bottom: 42px;
`);

export const CircleContent = memo(styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`);

export const ProgressDate = memo(styled.div`
  margin-top: ${props => props.marginTop};
  font-weight: 400;
  font-size: 14px;
  color: ${props => props.color};
`);

export const DateLable = memo(styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 190px;
  width: 200px;
`);

export const ProgressPlace = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

export const DateLablecontent = memo(styled.div`
  font-size: 14px;
  color: ${color.primary_8};
  margin-top: ${props => props.marginTop};
  width: ${props => props.width}
`);

export const ReviseGerber = styled.div`
  font-size: 12px;
  padding: 3px;
  color: ${color.primary_9};
  border: 1px solid ${color.primary_9};
  border-radius: 5px;
  position: absolute;
  top: 187px;
  left: 144px;
`

export const CircleTitle = memo(styled.div`
  font-size: 14px;
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  justify-content: space-between;
  top: ${props => props.top};
  height: ${props => props.height};
`);

export const CircleTitlediv = memo(styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${color.primary_3};
  font-size: 14px;
  font-weight: 400;
  word-wrap: break-word;
  width: 90px;
  height: 44px;

`);

export const CircleTitleNum = memo(styled.div`

  position: absolute;
  top: 110px;
`)

export const TaskTitle = memo(styled.div`
  font-size: 16px;
  height: 32px;
  line-height: 32px;
  font-weight: ${props => props.weight};
  color: ${props => props.color};
  background: ${props => props.backgroundColor};
  text-align: center;
  border-radius: 4px;
`);

export const TaskList = memo(styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 20px;
  .ant-btn-primary {
    border-radius: 4px;
    width: 100%;
  }
  .ant-form {
    align-items: center;
  }
`);

export const TaskTable = styled.div`
  margin: 0 16px;
  min-height: 430px;
  .ant-table-thead > tr > th {
    background: ${color.white_1};
    border-bottom: none;
  }
  .ant-table {
    border: 1px solid ${color.gray_4};
  }

  .oddRow {
    background-color: #ffffff;
  }
  .evenRow {
    background-color: #f2f2f2;
  }

  .ant-btn-text:hover{
    background: rgba(0,0,0,0);
  }
  .ant-btn-text:focus{
    background: rgba(0,0,0,0);
  }

`;
export const TextHide = styled.div`
    width: 700px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const ButtonWait = styled.button`
  background: ${color.yellow_2};
  color: ${color.yellow_1};
  border: none;
  height: 24px;
  width: ${props => props.width};
  line-height: 24px;
  text-align: center;
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;
`;

export const GerberMesIconBlue = styled.div`
  line-height: 0px;
  cursor: pointer;
  svg path{
    fill:#486ADF
  }
`

export const GerberMesIconGray = styled.div`
  line-height: 0px;
  cursor: pointer;
`

export const ButtonUnderway = styled.button`
  background: ${color.blue_2};
  color: ${color.blue_1};
  border: none;
  height: 24px;
  width: ${props => props.width};
  line-height: 24px;
  text-align: center;
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;
`;

export const ButtonComplete = memo(styled.button`
  background: ${color.green_2};
  color: ${color.green_1};
  border: none;
  height: 24px;
  width: ${props => props.width};
  line-height: 24px;
  text-align: center;
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;
`);

export const ButtonAlreadySkip = styled.div`
  background: ${color.primary_8};
  color: ${color.white_1};
  border: none;
  height: 24px;
  width: ${props => props.width};
  line-height: 24px;
  text-align: center;
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;

`

export const TaskListEditTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: ${props => props.fontsize};
  color: ${props => props.color};
`;

export const TaskEditState = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 16px 0 18px 0;
  height: 32px;
  line-height: 24px;

  .date {
    display: inline-block;
    color: ${color.primary_8};
    margin-left: 16px;
    margin-right: auto;
    font-weight: 400;
    font-size: 12px;
    width: 300px;
  }
  .ant-btn-primary {
    width: 137px;
  }
`;
export const SkipTaskSet = styled.div`
  display: flex;
  align-items: flex-end;
  .anticon-setting{
    margin-top: 7px;
  }
`
export const TaskEditState2 = styled.div`
  margin: 16px 0 18px 0;
  height: 32px;
  line-height: 24px;
  display: flex;
  align-items: center;
`;


export const TaskEditTable = styled.div`
  min-width: 740px;
  margin-bottom: 22px;
  .Tasktitle {
    font-weight: 700;
    color: ${color.primary_2};
    font-size: 14px;
    margin-bottom: 9px;
    span {
      color: ${color.blue_3};
      font-weight: 400;
    }
  }

  .ant-table {
    .ant-table-thead {
      tr {
        th {
          color: ${color.primary_8};
          font-weight: 400;
        }
      }
    }
  }
`;

export const OutputWarn = styled.div`
  display: inline-block;
  font-size: 14px;
  padding: 2px;
  color: ${color.blue_1};
  border-radius: 2px;
  background-color: ${color.blue_2};
`

export const CircleShadow = memo(styled.div`
  width: 174px;
  height: 174px;
  border-radius: 87px;
  box-shadow: 1px 1px 12px 6px #f9efb7;
  position: absolute;
  top: -7px;
  left: 13px;
`);

export const Line = memo(styled.div`
  width: 0px;
  height: 20px;
  border: 1px solid ${color.primary_3};
  margin-top: 6px;
`);

export const UploadTitle = memo(styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${color.primary_3};
`);

export const TaskDetailTitle = styled.div`
  margin-right: auto;
  margin-left: 8px;
  color: ${color.blue_1};
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

export const FormStyle = styled.div`
  .ant-form-item {
    margin-bottom: 11px;
  }

  .ant-upload-list-item {
    .ant-upload-span {
      .ant-upload-text-icon {
        svg {
          fill: ${color.blue_1};
        }
      }
      .ant-upload-list-item-name {
        color: ${color.blue_1};
      }
    }
  }
`;

export const ReasonForm = styled.div`
  height: 50px;
`

export const YfinalVersion = memo(styled.button`
  width: 32px;
  height: 19px;
  background: ${color.green_2};
  color: ${color.green_1};
  border: none;
  line-height: 19px;
`);

export const NfinalVersion = memo(styled.button`
  width: 32px;
  height: 19px;
  background: ${color.gray_4};
  color: ${color.primary_8};
  border: none;
  line-height: 19px;
`);

export const Warning = memo(styled.div`
  color: ${color.red_1};
  font-weight: 400;
  font-size: 16px;
  width: 100%;
  text-align: center;

`);

export const CurrentVersion = memo(styled.span`
  width: 131px;
  height: 19px;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${color.blue_1};
  background: ${color.blue_2};
  display: inline-block;
  text-align: center;
`);

export const StyledForm = memo(styled(Form)`
.ant-form-item{
  margin-right:5px  ;
  .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder{
    color:${color.primary_2}
  };
  input::-webkit-input-placeholder {
    color: ${color.primary_2}
  } 
}

`);
export const Popovercontent = memo(styled.p`
  cursor: pointer;
  text-align: center;
  color: ${color.primary_2};
  font-size: 16px;
`);

export const Popoverdiv = memo(styled.div`
  p:hover {
    background: ${color.yellow_2};
  }
  p{
    margin-bottom: 0px;
  }
`);

export const StylePopover = memo(styled.div`
  .contentpadding {
    .ant-popover-content {
      .ant-popover-inner {
        .ant-popover-inner-content {
          padding: 0x 3px !important ;
        }
      }
    }
  }
`);

export const Transition = styled.div`
  .listedit-enter {
    opacity: 0;
    /* transform: scale(0.9); */
    transform: translateX(100px);
  }
  .listedit-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 400ms, transform 400ms;
  }
  .listedit-exit {
    opacity: 1;
  }
  .listedit-exit-active {
    opacity: 0;
    transform: translateX(100px);
    transition: opacity 400ms, transform 400ms;
  }

  .my-node-enter {
    opacity: 0;
    transform: translateX(100px);
  }
  .my-node-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 400ms, transform 400ms;
  }
  .my-node-exit {
    opacity: 1;
  }
  .my-node-exit-active {
    opacity: 0;
    transform: translateX(100px);
    transition: opacity 400ms, transform 400ms;
  }
`;


export const MesIcon = styled.span`
  position: absolute;
  margin-left: 8px;
  margin-top: 2px;
  cursor: pointer;
  svg:hover path{
    fill:#486ADF
  }
  
`

export const MesIconBlue = styled.span`
position: absolute;
margin-left: 8px;
margin-top: 2px;
cursor: pointer;
 svg path{
    fill:#486ADF
  }

`

export const DateMsgIcon = styled.span`
  position: absolute;
  margin-left: 8px;
  margin-top: ${props => props.top};
  cursor: pointer;
  svg:hover path{
    fill:#486ADF
  }
  
`

export const SearchInput = styled.div`
  position: relative;
`

export const SearchTable = styled.div`
  position: absolute;
  right: 2%;
  float: right;
  top: 45px;
  z-index: 5;
  width: 800px;
  border: 1px solid ${color.blue_1};
  background-color: ${color.white_1};
  
`

export const SearchEdit = styled.div`
 position: relative;
  z-index: 100;
`

export const SearchText = styled.div`
    color: ${color.primary_1};
    cursor: pointer;
    font-size: 16px;
`

export const SearchIcon = styled.div`
  position: absolute;
  top: 6px;
  right: 5%;
  color: ${color.primary_8};
`

export const TableTitle = styled.div`
  color: ${color.blue_3};
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 15px;
  margin-left: 8px;
  margin-top: 8px;

`

export const UploadWarning = styled.div`
  display: inline-block;
  color: ${color.red_1};
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
`

export const SkipStatus = styled.div`
  background-color: ${props => props.color};
  color: ${color.white_1};
  border-radius: 4px;
  width: ${props => props.width};
  height: 23px;
  font-size: 14px;
`

export const SwithTitle = styled.div`
  font-family: 'Microsoft JhengHei';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: ${color.primary_2};
  margin-left: 10px;
`
export const SkipFileName = styled.span`
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  color: ${color.primary_2};
  width: 250px;
`
export const AuditUnit = styled.span`
  font-size: 14px;
  font-weight: ${props => props.weight};
  color: ${color.primary_2};
  margin-left: 5px;
`