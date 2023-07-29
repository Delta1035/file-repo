import styled from "styled-components";
import { Form, Card, Button } from "antd";

const color = {
  primary_1: "#000000",
  primary_2: "#333333",
  primary_3: "#797979",
  primary_4: "#C1C1C1",
  primary_5: "#00000033",
  primary_6: "#383838",
  primary_7: "#1E1E1E",
  primary_8: "#999999",
  gray_1: "#EBEBEB",
  gray_2: "#D7D7D7",
  gray_3: "#D9D9D9",
  gray_4: "#F2F2F2",
  gray_5: "#EDEDED",
  gray_6: "#CCCCCC",
  gray_7: "#949494",
  yellow_1: "#F5C910",
  yellow_2: "#FFFBE6",
  yellow_3: "#f5c910",
  blue_1: "#486ADF",
  blue_2: "#EDF6F9",
  blue_3: "#1890FF",
  red_1: "#FF0000",
  red_2: "#FFF2F1",
  red_3: "#000066",
  green_1: "#00CB3B",
  green_2: "#F6FFED",
  green_3: "#52C41A",
  green_4: "#5EEC3B",
  green_5: "#EDE388",
  white_1: "#FFFFFF",
  orange_1: "#F9AC14",
  pink_1: "#FF8787"
};

export const CockpitTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  font-family: 'Microsoft JhengHei';
  line-height: 24px;
  margin-bottom: 50px;
`;

export const CockpitTable = styled.div`
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
          border-top: 1px solid ${color.primary_4};
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
      background-color:${color.yellow_3};
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
`;

export const CockpitForm = styled(Form)`
    .ant-form-item{
        margin-right:5px  ;
    .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder{
        color:${color.primary_2}
    };
    input::-webkit-input-placeholder {
        color: ${color.primary_2}
    } 
}
`;

export const Result = styled.div`
    margin-bottom:6px;
    height: 20px;
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
`;

export const Reset = styled.span`
    margin-left: 9px;
    font-family: 'Microsoft JhengHei';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: ${color.blue_1};
`;

export const ResetImg = styled.span`
    line-height: 15px;
    width: 14px;
    height: 14px;
    margin-left: 18px;
    margin-top: 1px;
    cursor: pointer;
`;

export const TabsBottom = styled.div`
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
`;

export const HeadTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  height: 32px;
  line-height: 22px;
  margin-right: 14px;
  color:${color.primary_2};
`;

export const CockpitCard = styled(Card)`
  margin: 12px 16px;
  .ant-card-body{
    padding: 12px;
  }
`;

export const CockpitContent = styled.div`
  display: flex;
  justify-content: space-between;
  height: 370px;
`;

export const CockpitProjectChar = styled.div`
  display: flex;
  /* width: 60%; */
  flex-direction: column;
`;

export const ProjectCharNumber = styled.div`
  display: flex;
  height: 40px;
`;

export const DotNum = styled.div`
  height: 40px;
  display: flex;
  /* width: 220px; */
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  `

export const DotColorFinished = styled.div`
      width: 10px;
      height: 10px;
      background-color: ${color.green_4};
      border-radius: 5px;
`

export const DotColorOngoing = styled.div`
      width: 10px;
      height: 10px;
      background-color: ${color.green_5};
      border-radius: 5px;
`
export const DotColorTodo = styled.div`
      width: 10px;
      height: 10px;
      background-color: ${color.blue_3};
      border-radius: 5px;
`
export const DotColorOverdue = styled.div`
      width: 10px;
      height: 10px;
      background-color: ${color.pink_1};
      border-radius: 5px;
`
export const DotColorSkip = styled.div`
      width: 10px;
      height: 10px;
      background-color: ${color.gray_3};
      border-radius: 5px;
`
export const DotFont = styled.div`
      font-size: 16px;
      color: ${color.primary_8};
      margin-left: 8px;
      margin-right: 15px;
`
export const DotPercent = styled.div`
      font-size: 16px;
      color: ${color.primary_2};

`
export const CockpitProjectTable = styled.div`
  width: 40%;
  margin-top: 60px;
  .ant-table-content{
    .ant-table-thead > tr >th{
      height: 36px;
      font-family: 'Microsoft JhengHei';
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      color: ${color.primary_8};
      background: ${color.white_1};
    }
  }
`;

export const CockpitFunctionHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CockpitFunctionForm = styled(Form)`
  margin-left: 16px;
`;

export const CockpitFunctionContent = styled.div`
  margin-top: 5px;
  height: 400px;
  display: flex;
  
  flex-direction: column;
`;

export const FunctionCharNumber = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
`;

export const CockpitDetailHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CockpitDetailForm = styled(Form)`
  margin-left: 16px;
`;

export const CockpitDetailPageButton = styled(Button)`
  width: 45px;
  padding: 4px 5px;
`;

export const TextHide = styled.div`
    width: 700px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const CockpitDetailContent = styled.div`
  margin-top: 5px;
  /* border: 1px solid red; */
  .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab{
    border: none;
  }
  .ant-tabs-top > .ant-tabs-nav::before{
    border: none;
  }
`;