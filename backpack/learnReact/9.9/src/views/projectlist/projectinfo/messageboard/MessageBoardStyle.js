import { Button } from 'antd';
import { memo } from 'react';
import styled from 'styled-components';
const color = {
  primary_1: '#000000',
  primary_2: '#333333',
  primary_3: '#797979',
  primary_4: '#C1C1C1',
  primary_5: '#00000033',
  primary_6: '#383838',
  primary_7: '#1E1E1E',
  primary_8: '#999999',
  gray_1: '#EBEBEB',
  gray_2: '#D7D7D7',
  gray_3: '#D9D9D9',
  gray_4: '#F2F2F2',
  gray_5: '#EDEDED',
  gray_6: '#CCCCCC',
  gray_7: '#808080',
  gray_8: '#ECECEC',
  yellow_1: '#F5C910',
  yellow_2: '#FFFBE6',
  yellow_3: '#f5c910',
  blue_1: '#486ADF',
  blue_2: '#EDF6F9',
  blue_3: '#1890FF',
  red_1: '#FF0000',
  red_2: '#FFF2F1',
  red_3: '#000066',
  green_1: '#00CB3B',
  green_2: '#F6FFED',
  green_3: '#52C41A',
  white_1: '#FFFFFF',
  orange_1: '#F9AC14',
};

export const Board = styled.div`
  padding: 2px 18px;

`
export const TitleFlex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  font-size: 16px;
`


export const BoardTitle = styled.div`
  color: ${color.primary_1};
`
export const AddButtton = styled(Button)`


`

export const Total = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: ${color.primary_1};
  margin-top: 13px;

`

export const BoardSpanOne = styled.span`
  font-size: 16px;
  font-weight: 400; 
  color: ${color.primary_1};

`

export const BoardSpanTwo = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${color.primary_8};
  margin-left: 16px;
`

export const MessageEdit = styled.div`
      .ql-container{
       height: ${props => props.height};
        overflow-y: auto;
      }
      .ql-toolbar{
        .ql-formats{
          vertical-align: bottom;
          margin-right: 14px;
        }
      }
`

export const UploadFile = styled.div`
   .ant-upload-list{
    display: flex;
    flex-wrap: wrap;
    .ant-upload-list-text-container{
      width: 165px;
    }
   }
`

export const MentionIcon = styled.div`
    position: absolute; 
    top: 11px;
    left: 180px; 
    color: ${color.gray_7}; 
    font-size: 20px 
`

export const MentionSelect = styled.div`
    position: absolute;
    top: 12px;
    left: 200px;

`
export const MessageBoard = styled.div`
    padding: 0px 16px;



`

export const Table = memo(styled.div`
  margin-bottom: 18px;
  .ant-table-wrapper {
    border: 1px solid ${color.gray_2};
    .ant-table-thead {
      tr {
        th {
          color:${color.primary_8};
          background: ${color.white_1};
          border-bottom: none;
          border-right: 0px;
          font-weight: 400;
          border-bottom: 2px solid ${color.gray_2};
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
    .ant-pagination-item{
      border-color: ${color.gray_2};
      border-radius: 4px;
     }
    
    .ant-pagination-item-active {
      background-color:${color.yellow_3};
     
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


export const Waring = styled.span`
    margin-left: 20px;
    font-size: 14px;
  `



export const HeaderSubject = styled.div`
    font-size: 18px;
    color: ${color.primary_2};
    font-family: 'Microsoft JhengHei';
    font-style: normal;
    font-weight: 700;
    margin-left: 15px;
  
  `
export const MetaDiv = styled.div`



`

export const MetaSpan = styled.span`
  font-family: 'Microsoft JhengHei';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color:${props => props.color}

`

export const Description = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const DescriptionText = styled.div`
      width:450px;
      overflow:hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: ${color.primary_2};
`
export const DescriptionTextFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

`

export const DescriptionText2 = styled.div`
  color: ${color.primary_2};
  margin-top: 8px;
  margin-left: 30px;
  width: 640px;
  height: 150px;
  overflow-y: auto;
`

export const DescriptionTime = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: ${color.primary_8};
  
`
export const DescriptionmessageParticipant = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  width: 550px;
  color: ${color.primary_8};
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
`


export const CardDiv = styled.div`
    height: 60px;
    width: 700px;
    .ant-card-bordered{
      border: none;
      .ant-card-body{
        padding: 10px 0px;
        padding-bottom: 0px;
        .ant-card-meta-avatar{
          padding-right: 6px;
        }
        .ant-card-meta-title{
          margin-bottom: 0px;
        }
      }
    }

`
export const File = styled.div`
    margin-left: 4px;
    margin-top: 4px;
    padding: 4px 8px;
    height: 40px;
    width: 150px;
    background-color: ${color.gray_8};
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const FileList = styled.div`
    padding: 0px 30px;
    padding-bottom: 4px;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 2px solid ${color.gray_8};
`



export const FileName = styled.div`
    width: 110px;
    font-weight: 400;
    font-size: 14px;
    color:${color.gray_7};
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
`

export const Respond = styled.div`
    border-top: 1px solid ${color.primary_8};
    padding-top: 12px;

`

export const RespondTitle = styled.div`
    display: flex;
    width: 700px; 
    justify-content: space-between;

`

export const RespondTitleSpan = styled.div`
    font-family: 'Microsoft JhengHei';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: ${props => props.color};
    cursor: pointer;
`

export const Empty = styled.div`
    border: 1px solid ${color.gray_2};
    height: ${props => props.height};
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

`

export const RespondContent = styled.div`
      overflow-y: auto;
      height: ${props => props.height};
      margin-top: 10px;
`

export const ModalContent = styled.div`
      display: flex;
`
export const ModalContentLeft = styled.div`
      width: 720px;
      margin-right: 20px;

`
export const ModalContentRight = styled.div`
      width: 720px;
      border-left: 1px solid ${color.primary_8};
      padding-left: 20px;
      .ant-form-item{
        margin-bottom: 10px;
      }
`

export const ContentRightTitle = styled.div`
      font-family: 'Microsoft JhengHei';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      color: ${color.blue_1};
      
`

export const Collapse = styled.div`
      width: 700px;
      border-bottom: 1px solid ${color.primary_8};
      .ant-collapse-icon-position-end{
        padding:5px 0px;
      }
`

export const ProjectType = styled.span`
      font-family: 'Helvetica Neue';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      color:${color.primary_8}
`
export const Participants = styled.div`
      padding: 5px 0px;


`

export const ParticipantsLabel = styled.div`
      margin-left: 10px;
      display: inline-block;

`

