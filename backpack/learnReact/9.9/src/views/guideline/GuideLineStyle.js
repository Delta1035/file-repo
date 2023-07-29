import { memo } from "react";
import { Button } from "antd";
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
  white_1: "#FFFFFF",
  orange_1: "#F9AC14"
};

export const SButton = styled(Button)`
  border-radius: 2px;
  background: ${color.primary_2};
  color: ${color.white_1};
  cursor: pointer;
  border: none;
  width: 100%;
  height: 32px;
  &:hover{
    background-color:${color.primary_2};
  }
`

export const ProjectTitle = memo(styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  font-family: 'Microsoft JhengHei';
  line-height: 24px;
  .ant-btn-text:hover{
    background: rgba(0,0,0,0);
  }
  .ant-btn-text:focus{
    background: rgba(0,0,0,0);
  }

`);

export const GuideLineFrom = styled.div`
  margin-top: 22px;

`

export const Table = memo(styled.div`
  .ant-table-wrapper {
    .ant-table-thead {
      tr {
        th {
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

  .ant-btn-text:hover{
    background: rgba(0,0,0,0);
  }
  .ant-btn-text:focus{
    background: rgba(0,0,0,0);
  }
`);


export const IconSpan = styled.a`
  display: inline-block;
  font-size: 17px;
  color: ${color.primary_2};
`

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

export const Effectivity = styled.span`
  display: inline-block;
  background-color: ${color.green_2};
  width: 29px;
  color: ${color.green_1};
`
export const Effectivity2 = styled.span`
  display: inline-block;
  background-color: ${color.gray_4};
  width: 29px;
  color: ${color.primary_8};

`