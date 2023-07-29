import React, { useEffect, useState } from 'react';
import * as Style from '../../../ProjectListStyle';
import { Table, Button, Modal, message, Tooltip } from 'antd';
import {
  UploadOutlined,
  EllipsisOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import store from '@/mobx/store';
import Icon from '@/icon/Icon';
import { withRouter } from 'react-router-dom';
import { taskInfoRequest, updateStatus, downloadInput } from '@/api/index';
import { connect } from 'react-redux';
import UploadModal from './UploadModal';
import UploadHistory from '@/components/history/UploadHistory';
import DueDate from './DueDate';
import { useTranslation } from "react-i18next";
import useMinutetimestamp from '@/hooks/minutetimestamp'
import useDatetimestamp from '@/hooks/datetimestamp'
import moment from 'moment'
import { azureupload } from '@/api/index'
import useazuredownload from '@/hooks/azuredownload'
import { saveAs } from 'file-saver'
import { useUserStore } from '@/userstore/userStore';
import '@/App.scss';
const { confirm } = Modal;
function TaskListEditSearch (props) {
  const { perms, functions } = useUserStore();

  const { onClick, user } = props;
  // 分钟时间戳
  const minutetimestamp = useMinutetimestamp();

  //日期时间戳
  const datetimeFormat = useDatetimestamp();

  const { t } = useTranslation();

  const taskDetailData = JSON.parse(localStorage.getItem('searchrecord'))

  const [taskInfo, setTaskInfo] = useState({})

  const [status, setStatus] = useState()
  //上传弹窗
  const [visible, setVisible] = useState(false);
  //日期弹窗
  const [visibleduedate, setVisibleduedate] = useState(false);
  //历史弹窗
  const [visiblehistory, setVisiblehistory] = useState(false);
  //完成时间
  const [completetime, setCompletetime] = useState('');

  //列表数据upload上传
  const [uploadtabledate, setUploadtabledate] = useState({});

  //历史数据的attachId获取
  const [historyattacid, setHistoryattacid] = useState();

  //上传列表数据
  const [outputInfoList, setOutputInfoList] = useState([]);

  //下载列表数据
  const [inputInfoList, setInputInfoList] = useState([]);

  //触发列表更新
  const [triggerlistupdate, setTriggerlistupdate] = useState(false);

  //duedate信息
  const [duedateinfo, setDuedateinfo] = useState({});

  useEffect(() => {
    taskInfoRequest({
      plmCode: props.match.params.id,
      taskId: taskDetailData.taskId,
      taskNo: taskDetailData.taskNo,
      role: taskDetailData.role,
    }).then((res) => {
      setTaskInfo(res.data.data);
      setStatus(res.data.data.status);
      setOutputInfoList(res.data.data.attachmentOutputInfoList);
      setInputInfoList(res.data.data.attachmentInputInfoList);
      setCompletetime(minutetimestamp(res.data.data.completeTime * 1000));
      props.changedataProgress();
    });
  }, [props.match.params.id, taskDetailData.taskId, taskDetailData.taskNo, triggerlistupdate]);//eslint-disable-line

  // 窗口关闭
  const handleclosewin = () => {
    store.changeTable();
    onClick();

  };

  // 上传 moadl 请求弹窗
  const onClickModalUpload = (record) => {
    setVisible(!visible);
    setUploadtabledate(record);
  };
  // duedate修改弹窗
  const onClickModalDueDate = (record) => {
    setVisibleduedate(!visibleduedate);
    setDuedateinfo(record);
  };
  //历史记录弹窗
  const onClickHistory = (attachId) => {
    setVisiblehistory(!visiblehistory);
    setHistoryattacid(attachId);
  };
  const showConfirm = () => {
    confirm({
      title: t('TaskListEditSearch.confirmTitle'),
      content: `${t('TaskListEditSearch.confirmComplete')}“ ${taskInfo.title}“？`,
      okText: 'Confirm',
      icon: false,
      bodyStyle: { textAlign: 'center' },
      width: '452px',
      style: { top: '55%' },
      okButtonProps: { style: { background: '#486ADF' } },
      onOk () {
        updateStatus({
          plmCode: props.match.params.id,
          status: 2,
          id: taskDetailData.id,
          role: taskDetailData.role,
        }).then((res) => {
          // props.changedataProgress()
          setStatus(res.data.data.status);
          setCompletetime(minutetimestamp(res.data.data.completeTime * 1000));
          props.changedataProgress();
        });
      },

      onCancel () {
        console.log('Cancel');
      },
    });
  };

  const updatelistclick = () => {
    setTriggerlistupdate(!triggerlistupdate);
  };
  const columns = [
    {
      title: 'Doc. Name',
      dataIndex: 'docName',
      render: (text, record) => {
        return <span style={{ fontWeight: 700 }}>{text}</span>;
      },
    },
    {
      title: 'Ver.',
      dataIndex: 'version',
      align: 'center',
      render: (text, record) => {
        return text === '0' ? '-' : <div><span style={{ color: '#486ADF', textAlign: 'center' }}>{text}</span>{record.versionModifyContent.reason !== null && <Tooltip placement="leftBottom" overlayClassName={'newTooptip'} title={<span style={{ color: "#FFFFFF" }}>
          <div>{t('TaskListEditSearch.updateUser')}{record.versionModifyContent.modifyBy}</div>
          <div>{t('TaskListEditSearch.updateReason')}{record.versionModifyContent.reason}</div>
          <div>{t('TaskListEditSearch.updateContent')}{record.versionModifyContent.content}</div>
        </span>} color='#333333'><Style.MesIcon><Icon.Message style={{ marginLeft: "3px" }} /></Style.MesIcon></Tooltip>}</div>
      }
    },
    {
      title: 'Final',
      dataIndex: 'isFinal',
      align: 'center',
      render: (text, record) => {
        return record.version === '0' ? (
          '-'
        ) : text === false ? (
          <Style.NfinalVersion>N</Style.NfinalVersion>
        ) : (
          <Style.YfinalVersion>Y</Style.YfinalVersion>
        );
      },
    },
    {
      title: 'Last Update by',
      dataIndex: 'lastUpdateBy',
      align: 'center',
      render: (text, record) => {
        return text === null ? '-' : text;
      },
    },
    {
      title: 'Last Update Time ',
      dataIndex: 'lastUpdateTime',
      align: 'center',
      render: (text, record) => {
        return text === null ? '-' : minutetimestamp(text * 1000);
      },
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      align: 'center',
      render: (text, record) => {
        return text === 0 ? <div><span style={{ marginRight: '29px' }}>{t('TaskListEditSearch.noSetting')}</span> <Button style={{ padding: '0px ' }} type='text' disabled={!(perms.includes('checklist:attachment:editDueDate') || perms.includes('*:*:*')) || !(functions.includes(user) || functions.includes("*"))}>< CalendarOutlined onClick={() => {
          onClickModalDueDate(record)
        }} /></Button>{record.dueDateModifyContent.reason !== null && <Tooltip placement="leftBottom" overlayClassName={'newTooptip'} title={<span style={{ color: "#FFFFFF" }}>{t('TaskListEditSearch.noSettingDueDate')}{record.dueDateModifyContent.reason}</span>} color='#333333'><Style.DateMsgIcon top='8px'><Icon.Message style={{ marginLeft: "3px" }} /></Style.DateMsgIcon></Tooltip>}</div> : (text === null) ? <div style={{ color: '#FF0000' }}><span style={{ marginRight: '33px' }}>{t('TaskListEditSearch.waitSetting')}</span><Button style={{ padding: '0px ', color: '#FF0000' }} type='text' disabled={!(perms.includes('checklist:attachment:editDueDate') || perms.includes('*:*:*')) || !(functions.includes(user) || functions.includes("*"))}>< CalendarOutlined onClick={() => {
          onClickModalDueDate(record)
        }} /></Button></div> : <div>{datetimeFormat(text * 1000)} <Button style={{ padding: '0px ' }} type='text' disabled={!(perms.includes('checklist:attachment:editDueDate') || perms.includes('*:*:*')) || !(functions.includes(user) || functions.includes("*"))}>< CalendarOutlined onClick={() => {
          onClickModalDueDate(record)
        }} /></Button>{record.dueDateModifyContent.reason !== null && <Tooltip placement="leftBottom" overlayClassName={'newTooptip'} title={<span style={{ color: "#FFFFFF" }}>{t('TaskListEditSearch.dueDateReason')}{record.dueDateModifyContent.reason}</span>} color='#333333'><Style.DateMsgIcon top='8px'><Icon.Message style={{ marginLeft: "3px" }} /></Style.DateMsgIcon></Tooltip>}</div>
      }
    },
    {
      title: 'to',
      dataIndex: 'to',
      align: 'center',
    },
    {
      dataIndex: 'upload',
      align: 'center',
      render: (text, record) => {
        return (
          <Button
            style={{ padding: '0px ' }}
            type="text"
            disabled={
              record.dueDate === null ||
              !(
                perms.includes('checklist:attachment:uploadOutputFile') || perms.includes('*:*:*')
              ) ||
              !(functions.includes(user) || functions.includes('*'))
            }
          >
            <UploadOutlined
              onClick={() => {
                onClickModalUpload(record);
              }}
            ></UploadOutlined>
          </Button>
        );
      },
    },
    {
      dataIndex: 'docName',
      align: 'center',
      width: 70,
      render: (text, record) => {
        return (
          <Tooltip title={() => uploadcontent(record.id)} color="#FFFFFF" trigger="focus">
            {' '}
            <Button type="text" style={{ padding: '0px ' }}>
              <EllipsisOutlined />
            </Button>
          </Tooltip>
        );
      },
    },
  ];

  //三个点弹出框内容
  const uploadcontent = (attachId) => (
    <Style.Popoverdiv>
      <Style.Popovercontent
        onClick={() => {
          onClickHistory(attachId);
        }}
      >
        History
      </Style.Popovercontent>
      <Style.Popovercontent>Share</Style.Popovercontent>
    </Style.Popoverdiv>
  );

  const columnsinput = [
    {
      title: 'Doc. Name',
      dataIndex: 'docName',
      render: (text, record) => {
        return <span style={{ fontWeight: 700 }}>{text}</span>;
      },
    },
    {
      title: 'Ver.',
      dataIndex: 'version',
      align: 'center',
      render: (text, record) => {
        return text === '0' ? '-' : <div><span style={{ color: '#486ADF', textAlign: 'center' }}>{text}</span>{record.versionModifyContent.reason !== null && <Tooltip placement="leftBottom" overlayClassName={'newTooptip'} title={<span style={{ color: "#FFFFFF" }}>
          <div>{t('TaskListEditSearch.updateUser')}{record.versionModifyContent.modifyBy}</div>
          <div>{t('TaskListEditSearch.updateReason')}{record.versionModifyContent.reason}</div>
          <div>{t('TaskListEditSearch.updateContent')}{record.versionModifyContent.content}</div>
        </span>} color='#333333'><Style.MesIcon><Icon.Message style={{ marginLeft: "3px" }} /></Style.MesIcon></Tooltip>}</div>
      }
    },
    {
      title: 'Final',
      dataIndex: 'isFinal',
      align: 'center',
      render: (text, record) => {
        return record.version === '0' ? (
          '-'
        ) : text === false ? (
          <Style.NfinalVersion>N</Style.NfinalVersion>
        ) : (
          <Style.YfinalVersion>Y</Style.YfinalVersion>
        );
      },
    },
    {
      title: 'Last Update by',
      dataIndex: 'lastUpdateBy',
      align: 'center',
      render: (text, record) => {
        return text === null ? '-' : text;
      },
    },
    {
      title: 'Last Update Time ',
      dataIndex: 'lastUpdateTime',
      align: 'center',
      render: (text, record) => {
        return text === null ? '-' : minutetimestamp(text * 1000);
      },
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      align: 'center',
      render: (title, record) => {
        return title === null ? '-' : (title === 0) ? <div style={{ color: '#FF0000', fontWeight: '700' }}>{t('TaskListEditSearch.warning')}<Tooltip placement="leftBottom" overlayClassName={'newTooptip'} title={<span style={{ color: "#FFFFFF" }}>{t('TaskListEditSearch.dueDateReason')}{record.dueDateModifyContent.reason}</span>} color='#333333'><Style.DateMsgIcon top='2px'><Icon.Message style={{ marginLeft: "3px" }} /></Style.DateMsgIcon></Tooltip></div> : (Date.parse(moment().format('YYYY-MM-DD')) / 1000 > title) ? <div style={{ color: '#FF0000' }}>{datetimeFormat(title * 1000)}<Tooltip placement="leftBottom" overlayClassName={'newTooptip'} title={<span style={{ color: "#FFFFFF" }}>{t('TaskListEditSearch.dueDateReason')}{record.dueDateModifyContent.reason}</span>} color='#333333'><Style.DateMsgIcon top='2px'><Icon.Message style={{ marginLeft: "3px" }} /></Style.DateMsgIcon></Tooltip></div> : <span>{datetimeFormat(title * 1000)}<Tooltip placement="leftBottom" overlayClassName={'newTooptip'} title={<span style={{ color: "#FFFFFF" }}>{t('TaskListEditSearch.dueDateReason')}{record.dueDateModifyContent.reason}</span>} color='#333333'><Style.DateMsgIcon top='2px'><Icon.Message style={{ marginLeft: "3px" }} /></Style.DateMsgIcon></Tooltip></span>
      }
    },
    {
      title: 'from',
      dataIndex: 'from',
      align: 'center',
    },
    {
      dataIndex: 'input',
      align: 'center',
      render: (text, record) => {
        return (
          <Button
            style={{ padding: '0px ' }}
            type="text"
            disabled={
              record.version === '0' ||
              !(perms.includes('checklist:processTask:download') || perms.includes('*:*:*')) ||
              !(functions.includes(user) || functions.includes('*'))
            }
          >
            <DownloadOutlined
              onClick={() => {
                handleDonwLoad(record);
              }}
            ></DownloadOutlined>
          </Button>
        );
      },
    },
    {
      dataIndex: 'option',
      align: 'center',
      width: 70,
      render: (text, record) => {
        return (
          <Tooltip title={() => uploadcontent(record.id)} color="#FFFFFF" trigger="focus">
            {' '}
            <Button type="text" style={{ padding: '0px ' }}>
              <EllipsisOutlined />
            </Button>
          </Tooltip>
        );
      },
    },
  ];
  const onClickTime = (value) => {
    setCompletetime(value);
  };

  //下載
  const handleDonwLoad = async (record) => {
    const res = await downloadInput({
      attachId: record.id,
    });
    const fileinfo = res.data.data;

    const azureinfo = await azureupload();
    const containerName = azureinfo.data.data.container; //Blob 存储中的容器的名称。 可以将其视为等同于文件系统的文件夹或目录
    const sasToken = azureinfo.data.data.azureStorageSAS; //使用 Azure 门户创建的 SAS 令牌
    const storageAccountName = azureinfo.data.data.account; //资源名称

    useazuredownload(storageAccountName, containerName, sasToken, fileinfo.docRealName)().then(res => {

      message.success(t('TaskListEditSearch.downloadSuccess'))
      if (fileinfo.docRealName.substring(fileinfo.docRealName.lastIndexOf(".")) === '.txt') {
        saveAs(res, fileinfo.docRealName);
      } else {
        handleDownFile(res)
      }
    })
      .catch(err => {
        message.error(t('TaskListEditSearch.downloadFail'))
      })
      .catch((err) => {
        message.error(t('TaskListEditSearch.downloadFail'));
      });
  };
  const handleDownFile = (fileurl) => {
    const oa = document.createElement('a');
    oa.href = fileurl;
    oa.setAttribute('target', '_blank');
    document.body.appendChild(oa);
    oa.click();
  };

  return (
    <div>
      <Style.TaskTable>
        <Style.TaskListEditTitle>
          <Icon.Rectangle />   <Style.TaskDetailTitle>  <span>{taskInfo.title}</span></Style.TaskDetailTitle>
          <Style.SearchText onClick={handleclosewin}> <CloseOutlined />
            {t('TaskListEditSearch.search')}</Style.SearchText>
        </Style.TaskListEditTitle>
        {status === 0 && <Style.TaskEditState>
          {
            status === 0 && <Style.ButtonWait>{t('TaskListEditSearch.todolist')}</Style.ButtonWait>

          }
          {
            status === 0 && (taskInfo.attachType === 'no' || taskInfo.attachType === 'input') && <Button type='primary' onClick={showConfirm} disabled={!(perms.includes('checklist:processTask:editStatus') || perms.includes('*:*:*')) || !(functions.includes(user) || functions.includes("*"))} style={{ height: "28px", lineHeight: '18px' }}>{t('TaskListEditSearch.completeTask')}<CheckCircleOutlined /></Button>
          }
        </Style.TaskEditState>}
        {
          status === 1 && <Style.TaskEditState><Style.ButtonUnderway>{t('TaskListEditSearch.onging')}</Style.ButtonUnderway></Style.TaskEditState>
        }

        {
          status === 2 && <Style.TaskEditState>
            <Style.ButtonComplete>{t('TaskListEditSearch.complete')}</Style.ButtonComplete>
            <span className='date'>{t('TaskListEditSearch.completeTime')} {completetime}</span>
            <Button type='link' style={{ lineHeight: '35px' }}>{t('TaskListEditSearch.finishTask')} <CheckCircleOutlined /></Button>
          </Style.TaskEditState>
        }
        {taskInfo.attachType === 'output' && <Style.TaskEditTable>
          <div className='Tasktitle'>Output</div>
          <Table columns={columns} dataSource={outputInfoList} pagination={false} rowKey={(record) => record.id} size='small' />
        </Style.TaskEditTable>}
        {
          taskInfo.attachType === 'input' && <Style.TaskEditTable>
            <div className='Tasktitle'>Iutput<span>{t('TaskListEditSearch.download')}</span></div>
            <Table columns={columnsinput} dataSource={inputInfoList} pagination={false} rowKey={(record) => record.id} size='small' />
          </Style.TaskEditTable>
        }
        {taskInfo.attachType === 'input' && (
          <Style.TaskEditTable>
            <div className="Tasktitle">
              Itput<span>{t('TaskListEditSearch.download')}</span>
            </div>
            <Table
              columns={columnsinput}
              dataSource={inputInfoList}
              pagination={false}
              rowKey={(record) => record.id}
              size="small"
            />
          </Style.TaskEditTable>
        )}
      </Style.TaskTable>

      <UploadModal
        isModalVisible={visible}
        onClick={onClickModalUpload}
        uploadtabledate={uploadtabledate}
        updatelistclick={updatelistclick}
        click={onClickTime}
      ></UploadModal>

      <DueDate
        isModalVisible={visibleduedate}
        onClick={onClickModalDueDate}
        duedateinfo={duedateinfo}
        updatelistclick={updatelistclick}
      ></DueDate>
      <UploadHistory
        isModalVisible={visiblehistory}
        onClick={onClickHistory}
        historyattacid={historyattacid}
        user={user}
      ></UploadHistory>
    </div>
  );
}

const mapStateToProps = ({ DataProgress: { dataProgress } }) => {
  return {
    dataProgress,
  };
};
const mapDispatchToProps = {
  changedataProgress () {
    return {
      type: 'change_dataProgress',
    };
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskListEditSearch));
