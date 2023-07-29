import React, { useEffect, useState } from 'react';
import * as Style from '../../../ProjectListStyle';
import { Table, Button, Modal, message, Tooltip, Switch } from 'antd';
import {
  UploadOutlined,
  EllipsisOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import store from '../../../../../mobx/store';
import Icon from '@/icon/Icon';
import { withRouter } from 'react-router-dom';
import {
  taskInfoRequest,
  updateStatus,
  downloadInput,
  notifyUser,
  reviseConfirm,
} from '@/api/index';
import { connect } from 'react-redux';
import UploadModal from './UploadModal';
import UploadHistory from '@/components/history/UploadHistory';
import DueDate from './DueDate';
import useMinutetimestamp from '@/hooks/minutetimestamp';
import useDatetimestamp from '@/hooks/datetimestamp';
import { azureupload } from '@/api/index';
import useazuredownload from '@/hooks/azuredownload';
import { saveAs } from 'file-saver';
import { useUserStore } from '@/userstore/userStore';
import '@/App.scss';
import SkipModal from './SkipModal';
import { useTranslation } from 'react-i18next';
import GerberRelease from './GerberRelease';
const { confirm } = Modal;
function TaskListEdit (props) {
  const { perms, functions } = useUserStore();

  const { t } = useTranslation();

  const { onClick, HandleShowTask, getTaskList, taskvaluekeyid } = props;
  // 分钟时间戳
  const minutetimestamp = useMinutetimestamp();

  //日期时间戳
  const datetimeFormat = useDatetimestamp();

  const taskDetailData = JSON.parse(localStorage.getItem('record'));

  const [taskInfo, setTaskInfo] = useState({});

  const [status, setStatus] = useState();

  const [revise, setRevise] = useState();
  //上传弹窗
  const [visible, setVisible] = useState(false);
  //日期弹窗
  const [visibleduedate, setVisibleduedate] = useState(false);
  //历史弹窗
  const [visiblehistory, setVisiblehistory] = useState(false);
  //
  const [visibleSkip, setVisibleSkip] = useState(false);

  const [visibleGerber, setVisibleGerber] = useState(false);
  //完成时间
  const [completetime, setCompletetime] = useState('');

  //列表数据upload上传
  const [uploadtabledate, setUploadtabledate] = useState({});

  //历史数据的attachId获取
  const [historyattacid, setHistoryattacid] = useState();

  //上传列表数据
  const [outputInfoList, setOutputInfoList] = useState([]);

  const [outputInfoListOld, setOutputInfoListOld] = useState([]);

  //下载列表数据
  const [inputInfoList, setInputInfoList] = useState([]);

  const [inputInfoListOld, setInputInfoListOld] = useState([]);

  //触发列表更新
  const [triggerlistupdate, setTriggerlistupdate] = useState(false);

  //duedate信息
  const [duedateinfo, setDuedateinfo] = useState({});

  const [skipIdTypeVersion, setSkipIdTypeVersion] = useState({});

  const [gerberIdTypeVersion, setGerberIdTypeVersion] = useState({});


  const [taskGear, setTaskGear] = useState([]);

  const [useroptions, setUseroptions] = useState([]);

  const [user, setUser] = useState('');

  useEffect(() => {
    taskInfoRequest({
      plmCode: props.match.params.id,
      taskId: taskDetailData.taskId,
      taskNo: taskDetailData.taskNo,
      role: props.user,
    }).then((res) => {
      setTaskInfo(res.data.data);
      setStatus(res.data.data.status);
      setRevise(res.data.data.revise);
      setOutputInfoList(res.data.data.attachmentOutputInfoList);
      setOutputInfoListOld(res.data.data.attachmentOutputInfoList);
      setInputInfoList(res.data.data.attachmentInputInfoList);
      setInputInfoListOld(res.data.data.attachmentInputInfoList);
      setTaskGear(res.data.data.taskGear);
      setUser(res.data.data.function);
      props.changedataProgress();

    });
  }, [props.match.params.id, taskDetailData.taskId, taskDetailData.taskNo, triggerlistupdate]);//eslint-disable-line

  useEffect(() => {
    notifyUser({}).then((res) => {
      setUseroptions(res.data.data);
    });
  }, []);

  // 窗口关闭
  const handleclosewin = () => {
    onClick();
    // 判断是否用户选择了子皆的下拉框 用来刷新页面
    if (
      taskvaluekeyid.secondvalue === undefined ||
      taskvaluekeyid.secondvalue === '' ||
      taskvaluekeyid.user === '' ||
      taskvaluekeyid.user === undefined
    ) {
      HandleShowTask();
    } else {
      getTaskList(
        taskvaluekeyid.secondvalue,
        taskvaluekeyid.childkey,
        taskvaluekeyid.mothvalue,
        taskvaluekeyid.user
      );
    }
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
  //skip彈窗
  const onCloseSkip = () => {
    setVisibleSkip(!visibleSkip);
  };

  const onCloseGerber = () => {
    setVisibleGerber(!visibleGerber);
  };
  //SKIP彈窗
  const onClickSkip = (attachId, type, version, skip) => {
    setVisibleSkip(!visibleSkip);
    setSkipIdTypeVersion({
      id: attachId,
      type: type,
      version: version,
      skip: skip,
    });
  };
  //Gerber重做彈窗
  const onClickGerber = (attachId, type, version, attachDocName) => {
    setVisibleGerber(!visibleGerber);
    setGerberIdTypeVersion({
      id: attachId,
      type: type,
      version: version,
      attachDocName: attachDocName,
    });
  };

  const showConfirm = () => {
    confirm({
      title: t('TaskListEdit.confirmTitle'),
      content: `${t('TaskListEdit.confirmComplete')}“ ${taskInfo.title}“？`,
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
          role: props.user,
        }).then((res) => {
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

  // skip审核中弹窗
  const handleCheck = (attachId, type, version, skip) => {
    setVisibleSkip(!visibleSkip);
    setSkipIdTypeVersion({
      id: attachId,
      type: type,
      version: version,
      skip: skip,
    });
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
      title: 'Status',
      dataIndex: 'skip',
      align: 'center',
      width: 120,
      render: (text, record) => {
        return (
          <div>
            {text === null || text === 0 ? (
              ''
            ) : text === 1 || text === 4 ? (
              <Tooltip
                title={
                  <div>
                    <div>
                      {t('TaskListEdit.time')}{minutetimestamp(record.attachSkipOperationContent.time * 1000)}
                    </div>
                    <div>{t('TaskListEdit.skipReason')}{record.attachSkipOperationContent.reason}</div>
                  </div>
                }
                overlayClassName={'newTooptip'}
                placement="topLeft"
              >
                <Button type="text" style={{ padding: '0px' }}>
                  <Style.SkipStatus width={localStorage.getItem('language') === 'zh_TW' ? '63px' : '90px'} type="text" color="#1890FF">
                    {t('TaskListEdit.checking')}
                  </Style.SkipStatus>
                </Button>
              </Tooltip>
            ) : text === 2 ? (
              <Tooltip
                title={
                  <div>
                    <div>
                      {t('TaskListEdit.time')}{minutetimestamp(record.attachSkipOperationContent.time * 1000)}
                    </div>
                    <div>{t('TaskListEdit.skipReason')}{record.attachSkipOperationContent.reason}</div>
                  </div>
                }
                overlayClassName={'newTooptip'}
                placement="topLeft"
              >
                <Button type="text" style={{ padding: '0px' }}>
                  <Style.SkipStatus width={localStorage.getItem('language') === 'zh_TW' ? '63px' : '90px'} type="text" color={'#999999'}>
                    {t('TaskListEdit.alreadySkip')}
                  </Style.SkipStatus>
                </Button>
              </Tooltip>
            ) : (
              <Tooltip
                title={
                  <div>
                    <div>
                      {t('TaskListEdit.time')}{minutetimestamp(record.attachSkipOperationContent.time * 1000)}
                    </div>
                    <div>{t('TaskListEdit.rejectReason')}{record.attachSkipOperationContent.reason}</div>
                  </div>
                }
                overlayClassName={'newTooptip'}
                placement="topLeft"
              >
                <Button type="text" style={{ padding: '0px' }}>
                  <Style.SkipStatus width={localStorage.getItem('language') === 'zh_TW' ? '63px' : '90px'} type="text" color={'#FF0000'}>
                    {t('TaskListEdit.return')}
                  </Style.SkipStatus>
                </Button>
              </Tooltip>
            )}
          </div>
        );
      },
    },

    {
      title: 'Ver.',
      dataIndex: 'version',
      align: 'center',
      width: 80,
      render: (text, record) => {
        return (record.revise === 0 || record.revise === 4) ? (
          <div>
            <span style={{ color: '#486ADF', textAlign: 'center' }}>{text === '0' ? '-' : text}</span>
            {record.versionModifyContent.reason !== null && (
              <Tooltip
                placement="topLeft"
                overlayClassName={'newTooptip'}
                title={
                  <span style={{ color: '#FFFFFF' }}>
                    <div>
                      {t('TaskListEdit.updateUser')} {record.versionModifyContent.modifyBy}
                    </div>
                    <div>
                      {t('TaskListEdit.updateReason')} {record.versionModifyContent.reason}
                    </div>
                    <div>
                      {t('TaskListEdit.updateContent')} {record.versionModifyContent.content}
                    </div>
                  </span>
                }
                color="#333333"
              >
                <Style.MesIcon>
                  <Icon.Message style={{ marginLeft: '3px' }} />
                </Style.MesIcon>
              </Tooltip>
            )}
          </div>
        ) : <div>
          <span style={{ color: '#486ADF', textAlign: 'center' }}>{text === '0' ? '-' : text}</span>
          {record.revise === 5 && (
            <Tooltip
              placement="topLeft"
              overlayClassName={'newTooptip'}
              title={
                <span style={{ color: '#FFFFFF' }}>
                  <div>
                    {t('TaskListEdit.updateUser')} {record.versionModifyContent.modifyBy}
                  </div>
                  <div>
                    {t('TaskListEdit.updateReason')} {record.versionModifyContent.reason}
                  </div>
                  <div>
                    {t('TaskListEdit.updateContent')} {record.versionModifyContent.content}
                  </div>
                </span>
              }
              color="#333333"
            >
              <Style.MesIconBlue>
                <Icon.Message style={{ marginLeft: '3px' }} />
              </Style.MesIconBlue>
            </Tooltip>
          )}
          {(record.revise === 3 || record.revise === 1) && (
            <Style.MesIconBlue>
              <Icon.Message style={{ marginLeft: '3px' }} />
            </Style.MesIconBlue>
          )}

        </div>
      }
    },
    {
      title: 'Final',
      dataIndex: 'isFinal',
      align: 'center',
      width: 60,
      render: (text, record) => {
        return (record.version === '0' && record.revise === 0) ? (
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
      width: 165,
      render: (text, record) => {
        return text === 0 ? (
          <div style={{ display: 'flex', justifyContent: "space-evenly", alignItems: 'center' }}>
            <span>{t('TaskListEdit.setting')}</span>
            <Button
              style={{ padding: '0px ' }}
              type="text"
              disabled={
                !(perms.includes('checklist:attachment:editDueDate') || perms.includes('*:*:*')) ||
                !(functions.includes(user) || functions.includes('*')) ||
                record.skip === 2 ||
                record.skip === 4 ||
                record.skip === 5 || record.revise === 1 || record.revise === 4
              }
            >
              <CalendarOutlined
                onClick={() => {
                  onClickModalDueDate(record);
                }}
              />
            </Button>
            {record.dueDateModifyContent.reason !== null && (
              <Tooltip
                placement="top"
                overlayClassName={'newTooptip'}
                title={
                  <span style={{ color: '#FFFFFF' }}>
                    {t('TaskListEdit.settingReason')}
                    {record.dueDateModifyContent.reason}
                  </span>
                }
                color="#333333"
              >
                <Style.DateMsgIcon top="8px">
                  <Icon.Message style={{ marginLeft: '3px' }} />
                </Style.DateMsgIcon>
              </Tooltip>
            )}
          </div>
        ) : text === null ? (
          <div style={{ color: '#FF0000', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <span >{t('TaskListEdit.waitSetting')}</span>
            <Button
              style={{ padding: '0px ', color: '#FF0000' }}
              type="text"
              disabled={
                !(perms.includes('checklist:attachment:editDueDate') || perms.includes('*:*:*')) ||
                !(functions.includes(user) || functions.includes('*')) ||
                record.skip === 2 ||
                record.skip === 4 ||
                record.skip === 5 || record.revise === 1 || record.revise === 4
              }
            >
              <CalendarOutlined
                onClick={() => {
                  onClickModalDueDate(record);
                }}
              />
            </Button>
          </div>
        ) : (
          <div>
            {datetimeFormat(text * 1000)}{' '}
            <Button
              style={{ padding: '0px ' }}
              type="text"
              disabled={
                !(perms.includes('checklist:attachment:editDueDate') || perms.includes('*:*:*')) ||
                !(functions.includes(user) || functions.includes('*')) ||
                record.skip === 2 ||
                record.skip === 4 ||
                record.skip === 5 || record.revise === 1 || record.revise === 4
              }
            >
              <CalendarOutlined
                onClick={() => {
                  onClickModalDueDate(record);
                }}
              />
            </Button>
            {record.dueDateModifyContent.reason !== null && (
              <Tooltip
                placement="top"
                overlayClassName={'newTooptip'}
                title={
                  <span style={{ color: '#FFFFFF' }}>
                    {t('TaskListEdit.dueDateReason')}
                    {record.dueDateModifyContent.reason}
                  </span>
                }
                color="#333333"
              >
                <Style.DateMsgIcon top="8px">
                  <Icon.Message style={{ marginLeft: '3px' }} />
                </Style.DateMsgIcon>
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      title: 'Format',
      dataIndex: 'format',
      align: 'center',
    },
    {
      title: 'to',
      dataIndex: 'to',
      align: 'center',
      ellipsis: { showTitle: false },
      render: (name) => (
        <Tooltip placement="topLeft" overlayClassName={'newTooptip'} title={name}>
          {name}
        </Tooltip>
      ),
    },
    {
      dataIndex: 'upload',
      align: 'center',
      width: 60,
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
              !(functions.includes(user) || functions.includes('*')) ||
              record.skip === 2 ||
              record.skip === 4 ||
              record.skip === 5 || record.revise === 1 || record.revise === 4
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
      dataIndex: 'option',
      align: 'center',
      width: 60,
      render: (text, record) => {
        return (
          <Tooltip
            title={() => uploadcontent(record.id, record.docName, record.version, record.skip, record.revise)}
            color="#FFFFFF"
            trigger="focus"
            overlayInnerStyle={{
              padding: '6px 2px',
              borderRadius: '4px',
              border: '1px solid #D7D7D7',
            }}
          >
            <Button type="text" style={{ padding: '0px ' }}>
              <EllipsisOutlined />
            </Button>
          </Tooltip>
        );
      },
    },
  ];

  //三个点弹出框内容
  const uploadcontent = (attachId, attachDocName, version, skip, revise) => {
    return (
      <Style.Popoverdiv>
        <Style.Popovercontent
          onClick={() => {
            onClickHistory(attachId);
          }}
        >
          History
        </Style.Popovercontent>
        <Style.Popovercontent
          onClick={() => {
            sendMail(attachId, attachDocName);
          }}
        >
          <Button
            type="text"
            style={{ padding: '0px', fontSize: '16px' }}
            disabled={(version === '0' ? true : false) || (revise === 0 ? false : true)}
          >
            Outlook
          </Button>
        </Style.Popovercontent>
        {((skip === 0 || skip === null || skip === 3) && revise === 0) && (
          <Style.Popovercontent
            onClick={() => {
              onClickSkip(attachId, 'skip', version, skip);
            }}
          >
            <Button
              type="text"
              style={{ padding: '0px', fontSize: '16px' }}
              disabled={!(functions.includes(user) || functions.includes('*'))}
            >
              Skip
            </Button>
          </Style.Popovercontent>
        )}
        {(skip === 1 || skip === 4 || skip === 3 || skip === 5) && (
          <Style.Popovercontent
            onClick={() => {
              onClickSkip(attachId, 'recall', version, skip);
            }}
          >
            <Button
              type="text"
              style={{ padding: '0px', fontSize: '16px' }}
              disabled={!(functions.includes(user) || functions.includes('*'))}
            >
              {t('TaskListEdit.withdraw')}
            </Button>
          </Style.Popovercontent>
        )}
        {(skip === 2 || skip === 5) && revise === 0 && (
          <Style.Popovercontent
            onClick={() => {
              onClickSkip(attachId, 'recoverSkip', version, skip);
            }}
          >
            <Button
              type="text"
              style={{ padding: '0px', fontSize: '16px' }}
              disabled={!(functions.includes(user) || functions.includes('*'))}
            >
              {t('TaskListEdit.recoverSkip')}
            </Button>
          </Style.Popovercontent>
        )}

        {revise === 1 &&
          <Style.Popovercontent
            onClick={() => {
              onClickGerber(attachId, 'inherit', version, attachDocName);
            }}
          >
            <Button
              type="text"
              style={{ padding: '0px', fontSize: '16px' }}
              disabled={!(functions.includes(user) || functions.includes('*'))}
            >
              {t('TaskListEdit.inherit')}
            </Button>
          </Style.Popovercontent>
        }

        {revise === 1 &&
          <Style.Popovercontent
            onClick={() => {
              onClickGerber(attachId, 'reform', version, attachDocName);
            }}
          >
            <Button
              type="text"
              style={{ padding: '0px', fontSize: '16px' }}
              disabled={!(functions.includes(user) || functions.includes('*'))}
            >
              {t('TaskListEdit.redo')}
            </Button>
          </Style.Popovercontent>
        }
      </Style.Popoverdiv>
    );
  };

  const sendMail = async (attachId, attachDocName) => {
    //点击outLook请求链接地址
    const res = await downloadInput({
      attachId: attachId,
    });
    const fileinfo = res.data.data;

    const azureinfo = await azureupload();
    const containerName = azureinfo.data.data.container; //Blob 存储中的容器的名称。 可以将其视为等同于文件系统的文件夹或目录
    const sasToken = azureinfo.data.data.azureStorageSAS; //使用 Azure 门户创建的 SAS 令牌
    const storageAccountName = azureinfo.data.data.account; //资源名称

    useazuredownload(
      storageAccountName,
      containerName,
      sasToken,
      fileinfo.docRealName //下載後的文件名字
    )().then((res) => {
      let link = encodeURIComponent(res); //进行编码
      const body = `Project Name: ${store.ProjectName}%0d%0aDocument Name: ${attachDocName}%0d%0aDownload Link: ${link}%0d%0a%0d%0a%0d%0a${t('UploadModal.linkWarning')}`;
      window.location.href = `mailto:${""}?cc=${""} &subject=${""} &body=${body} `;
    });
  };

  const columnsinput = [
    {
      title: 'Doc. Name',
      dataIndex: 'docName',
      render: (text, record) => {
        return <span style={{ fontWeight: 700 }}>{text}</span>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'skip',
      align: 'center',
      width: 120,
      render: (text, record) => {
        return (
          <div>
            {text === null || text === 0 ? (
              ''
            ) : text === 1 || text === 4 ? (
              <Tooltip
                title={
                  <div>
                    <div>
                      {t('TaskListEdit.time')}{minutetimestamp(record.attachSkipOperationContent.time * 1000)}
                    </div>
                    <div>{t('TaskListEdit.skipReason')}{record.attachSkipOperationContent.reason}</div>
                  </div>
                }
                overlayClassName={'newTooptip'}
                placement="topLeft"
              >
                <Button
                  type="text"
                  disabled={!(functions.includes(user) || functions.includes('*'))}
                  style={{ padding: '0px' }}
                  onClick={() => {
                    handleCheck(record.id, 'check', record.version, record.skip);
                  }}
                >
                  <Style.SkipStatus width={localStorage.getItem('language') === 'zh_TW' ? '63px' : '90px'} type="text" color="#1890FF">
                    {t('TaskListEdit.waitCheck')}
                  </Style.SkipStatus>
                </Button>
              </Tooltip>
            ) : text === 2 ? (
              <Tooltip
                title={
                  <div>
                    <div>
                      {t('TaskListEdit.time')}{minutetimestamp(record.attachSkipOperationContent.time * 1000)}
                    </div>
                    <div>{t('TaskListEdit.skipReason')}{record.attachSkipOperationContent.reason}</div>
                  </div>
                }
                overlayClassName={'newTooptip'}
                placement="topLeft"
              >
                <Button type="text" style={{ padding: '0px' }}>
                  <Style.SkipStatus width={localStorage.getItem('language') === 'zh_TW' ? '63px' : '90px'} type="text" color={'#999999'}>
                    {t('TaskListEdit.alreadySkip')}
                  </Style.SkipStatus>
                </Button>
              </Tooltip>
            ) : text === 6 || text === 7 ? (
              <Tooltip
                title={
                  <div>
                    <div>
                      {t('TaskListEdit.time')}{minutetimestamp(record.attachSkipOperationContent.time * 1000)}
                    </div>
                    <div>{t('TaskListEdit.skipReason')}{record.attachSkipOperationContent.reason}</div>
                  </div>
                }
                overlayClassName={'newTooptip'}
                placement="topLeft"
              >
                <Button type="text" style={{ padding: '0px' }}>
                  <Style.SkipStatus width={localStorage.getItem('language') === 'zh_TW' ? '63px' : '90px'} type="text" color={'#1890FF'}>
                    {t('TaskListEdit.alreadyCheck')}
                  </Style.SkipStatus>
                </Button>
              </Tooltip>
            ) : (
              <Tooltip
                title={
                  <div>
                    <div>
                      {t('TaskListEdit.time')}{minutetimestamp(record.attachSkipOperationContent.time * 1000)}
                    </div>
                    <div>{t('TaskListEdit.rejectReason')}{record.attachSkipOperationContent.reason}</div>
                  </div>
                }
                overlayClassName={'newTooptip'}
                placement="topLeft"
              >
                <Button type="text" style={{ padding: '0px' }}>
                  <Style.SkipStatus width={localStorage.getItem('language') === 'zh_TW' ? '63px' : '90px'} type="text" color={'#FF0000'}>
                    {t('TaskListEdit.return')}
                  </Style.SkipStatus>
                </Button>
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      title: 'Ver.',
      dataIndex: 'version',
      align: 'center',
      width: 80,
      render: (text, record) => {
        return text === '0' ? '-' : <div><span style={{ color: '#486ADF', textAlign: 'center' }}>{text}</span>{record.versionModifyContent.reason !== null && <Tooltip placement="topLeft" overlayClassName={'newTooptip'} title={<span style={{ color: "#FFFFFF" }}>
          <div>{t('TaskListEdit.updateUser')}{record.versionModifyContent.modifyBy}</div>
          <div>{t('TaskListEdit.updateReason')}{record.versionModifyContent.reason}</div>
          <div>{t('TaskListEdit.updateContent')}{record.versionModifyContent.content}</div>
        </span>} color='#333333'><Style.MesIcon><Icon.Message style={{ marginLeft: "3px" }} /></Style.MesIcon></Tooltip>}</div>
      }
    },
    {
      title: 'Final',
      dataIndex: 'isFinal',
      align: 'center',
      width: 60,
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
      width: 165,
      render: (text, record) => {
        return text === 0 ? (
          <div style={{ display: 'flex', justifyContent: "space-evenly", alignItems: 'center' }}>
            <span>{t('TaskListEdit.setting')}</span>

            {record.dueDateModifyContent.reason !== null && (
              <Tooltip
                placement="top"
                overlayClassName={'newTooptip'}
                title={
                  <span style={{ color: '#FFFFFF' }}>
                    {t('TaskListEdit.settingReason')}{record.dueDateModifyContent.reason}
                  </span>
                }
                color="#333333"
              >
                <Style.DateMsgIcon top="3px">
                  <Icon.Message style={{ marginLeft: '3px' }} />
                </Style.DateMsgIcon>
              </Tooltip>
            )}
          </div>
        ) : text === null ? (
          <div>
            <span style={{ marginRight: '33px', color: '#FF0000' }}>{t('TaskListEdit.waitSetting')}</span>
          </div>
        ) : (
          <div>
            {datetimeFormat(text * 1000)}{' '}
            {record.dueDateModifyContent.reason !== null && (
              <Tooltip
                placement="top"
                overlayClassName={'newTooptip'}
                title={
                  <span style={{ color: '#FFFFFF' }}>
                    {t('TaskListEdit.dueDateReason')}{record.dueDateModifyContent.reason}
                  </span>
                }
                color="#333333"
              >
                <Style.DateMsgIcon top="3px">
                  <Icon.Message style={{ marginLeft: '3px' }} />
                </Style.DateMsgIcon>
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      title: 'Format',
      dataIndex: 'format',
      align: 'center',
    },
    {
      title: 'from',
      dataIndex: 'from',
      align: 'center',
      ellipsis: { showTitle: false },
      render: (name) => (
        <Tooltip placement="topLeft" overlayClassName={'newTooptip'} title={name}>
          {name}
        </Tooltip>
      ),
    },
    {
      dataIndex: 'input',
      align: 'center',
      width: 60,
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
      width: 60,
      render: (text, record) => {
        return (
          <Tooltip
            title={() => uploadcontent(record.id, record.docName, record.version)}
            color="#FFFFFF"
            trigger="focus"
            overlayInnerStyle={{
              padding: '6px 2px',
              borderRadius: '4px',
              border: '1px solid #D7D7D7',
            }}
          >
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

    useazuredownload(
      storageAccountName,
      containerName,
      sasToken,
      fileinfo.docRealName //下載後的文件名字
    )()
      .then((res) => {
        message.success(t('TaskListEdit.downloadSuccess'));
        if (fileinfo.docRealName.substring(fileinfo.docRealName.lastIndexOf('.')) === '.txt') {
          saveAs(res, fileinfo.docRealName);
        } else {
          handleDownFile(res);
        }
      })
      .catch((err) => {
        message.error(t('TaskListEdit.downloadFail'));
      });
  };
  const handleDownFile = (fileurl) => {
    const oa = document.createElement('a');
    oa.href = fileurl;
    oa.setAttribute('target', '_blank');
    document.body.appendChild(oa);
    oa.click();
  };

  const onChangeSkipShow = (checked) => {
    if (checked && outputInfoListOld !== null) {
      setOutputInfoList(outputInfoListOld.filter((item) => item.skip !== 2));
      setInputInfoList(inputInfoListOld.filter((item) => item.skip !== 2));
    } else {
      setOutputInfoList(outputInfoListOld);
      setInputInfoList(inputInfoListOld);
    }
  };

  // 齒輪彈出內容
  const handleSkipTask = (id, attachType, oddId) => {
    return (
      <Style.Popoverdiv>
        {taskGear.includes(1) && (
          <Style.Popovercontent
            onClick={() => {
              onClickSkipTask(id, attachType, oddId, 'skiptask');
            }}
          >
            <Button
              type="text"
              style={{ padding: '0px', fontSize: '16px' }}
              disabled={!(functions.includes(user) || functions.includes('*'))}
            >
              Skip Task
            </Button>
          </Style.Popovercontent>
        )}
        {taskGear.includes(2) && (
          <Style.Popovercontent
            onClick={() => {
              onClickSkipTask(id, attachType, oddId, 'recoverSkipTask');
            }}
          >
            <Button
              type="text"
              style={{ padding: '0px', fontSize: '16px' }}
              disabled={!(functions.includes(user) || functions.includes('*'))}
            >
              {t('TaskListEdit.recoverSkipTask')}
            </Button>
          </Style.Popovercontent>
        )}
        {taskGear.includes(3) && (
          <Style.Popovercontent
            onClick={() => {
              onClickSkipTask(id, attachType, oddId, 'recallSkipTask');
            }}
          >
            <Button
              type="text"
              style={{ padding: '0px', fontSize: '16px' }}
              disabled={!(functions.includes(user) || functions.includes('*'))}
            >
              {t('TaskListEdit.withdrawSkipTask')}
            </Button>
          </Style.Popovercontent>
        )}
        {taskGear.includes(5) && attachType === 'output' && (
          <Style.Popovercontent
            onClick={() => {
              onClickGerberRelease(id, attachType, oddId, 'inheritTask');
            }}
          >
            <Button
              type="text"
              style={{ padding: '0px', fontSize: '16px' }}
              disabled={!(functions.includes(user) || functions.includes('*'))}
            >
              {t('TaskListEdit.inherit')}
            </Button>
          </Style.Popovercontent>
        )}
        {taskGear.includes(4) && attachType === 'output' &&
          <Style.Popovercontent
            onClick={() => {
              onClickGerberRelease(id, attachType, oddId, 'reformTask');
            }}
          >
            <Button
              type="text"
              style={{ padding: '0px', fontSize: '16px' }}
              disabled={!(functions.includes(user) || functions.includes('*'))}
            >
              {t('TaskListEdit.redo')}
            </Button>
          </Style.Popovercontent>
        }
        {(taskGear[0] === undefined) &&
          <Style.Popovercontent

          >
            <Button
              type="text"
              style={{ padding: '0px', fontSize: '16px' }}
              disabled={true}
            >
              {t('TaskListEdit.notAllow')}
            </Button>
          </Style.Popovercontent>
        }
      </Style.Popoverdiv>
    );
  };

  // 齒輪批量skip task彈窗
  const onClickSkipTask = (id, attachType, oddId, skiptype) => {
    setVisibleSkip(!visibleSkip);
    setSkipIdTypeVersion({
      id: id,
      attachType: attachType,
      oddId: oddId,
      type: skiptype,
    });
  };
  // GerberRelease批量彈窗
  const onClickGerberRelease = (id, attachType, oddId, Gerbertype) => {
    setVisibleGerber(!visibleGerber);
    setGerberIdTypeVersion({
      id: id,
      attachType: attachType,
      oddId: oddId,
      type: Gerbertype,
    });
  };

  // gerber修訂 Process task確認完成
  const handleGerberComplete = () => {
    confirm({
      title: t('TaskListEdit.confirmTitle'),
      content: `${t('TaskListEdit.confirmComplete')}“ ${taskInfo.title}“？`,
      okText: 'Confirm',
      centered: true,
      icon: false,
      bodyStyle: { textAlign: 'center' },
      width: '452px',
      style: { top: '260px' },
      okButtonProps: { style: { background: '#486ADF' } },
      onOk () {
        reviseConfirm({
          taskId: taskInfo.taskId,
        })
          .then((res) => {
            // props.changedataProgress()
            if (res.data.code === 200) {
              message.success(t('TaskListEdit.comfirmSuccess'));
              updatelistclick()
            } else {
              message.error(t('TaskListEdit.comfirmFail'));
              updatelistclick()
            }
          })
          .catch((err) => {
            message.error(err.data.message);
            updatelistclick()
          });
      },
      onCancel () {
        console.log('Cancel');
      },
    });
  };
  return (
    <div>
      <Style.TaskTable>
        <Style.TaskListEditTitle>
          <Icon.Rectangle />
          <Style.TaskDetailTitle>
            <span>{taskInfo.title}</span>
          </Style.TaskDetailTitle>
          <Style.SearchText onClick={handleclosewin}>
            <Icon.Goback style={{ margin: '0px 5px' }} />
            {t('TaskListEdit.returnTask')}
          </Style.SearchText>
        </Style.TaskListEditTitle>
        {status === 0 && (
          <Style.TaskEditState>
            {status === 0 && (
              <Style.SkipTaskSet>
                <Style.ButtonWait>{t('TaskListEdit.todolist')}</Style.ButtonWait>
                <Tooltip
                  title={() =>
                    handleSkipTask(
                      taskDetailData.id,
                      taskDetailData.attachType,
                      props.match.params.id
                    )
                  }
                  color="#FFFFFF"
                  trigger="focus"
                  overlayInnerStyle={{
                    padding: '0px 2px',
                    borderRadius: '4px',
                    border: '1px solid #D7D7D7',
                  }}
                >
                  <Button type="text" style={{ padding: '0px ' }}>
                    <SettingOutlined style={{ fontSize: '18px' }} />
                  </Button>
                </Tooltip>
                <Switch
                  defaultChecked={false}
                  onChange={onChangeSkipShow}
                  style={{ marginLeft: '18px' }}
                />
                <Style.SwithTitle>{t('TaskListEdit.hideSkip')}</Style.SwithTitle>
              </Style.SkipTaskSet>
            )}
            {status === 0 && (taskInfo.attachType === 'no' || taskInfo.attachType === 'input') && (
              <Button
                type="primary"
                onClick={showConfirm}
                disabled={
                  !(
                    perms.includes('checklist:processTask:editStatus') || perms.includes('*:*:*')
                  ) || !(functions.includes(user) || functions.includes('*')) || !taskInfo.taskAvailable
                }
                style={{ height: '28px', lineHeight: '18px' }}
              >
                {t('TaskListEdit.completeTask')}
                <CheckCircleOutlined />
              </Button>
            )}
          </Style.TaskEditState>
        )}
        {status === 1 && (
          <Style.TaskEditState2>
            <Style.ButtonUnderway>{t('TaskListEdit.onging')}</Style.ButtonUnderway>
            <Tooltip
              title={() =>
                handleSkipTask(taskDetailData.id, taskDetailData.attachType, props.match.params.id)
              }
              trigger="focus"
              color="#FFFFFF"
              overlayInnerStyle={{
                padding: '0px 2px',
                borderRadius: '4px',
                border: '1px solid #D7D7D7',
              }}
            >
              <Button type="text" style={{ padding: '0px ' }}>
                <SettingOutlined style={{ fontSize: '18px' }} />
              </Button>
            </Tooltip>
            <Switch
              defaultChecked={false}
              onChange={onChangeSkipShow}
              style={{ marginLeft: '18px' }}
            />
            <Style.SwithTitle>{t('TaskListEdit.hideSkip')}</Style.SwithTitle>
          </Style.TaskEditState2>
        )}
        {status === 2 && revise !== 1 && (
          <Style.TaskEditState>
            <Style.SkipTaskSet>
              <Style.ButtonComplete>{t('TaskListEdit.complete')}</Style.ButtonComplete>
              <Tooltip
                title={() =>
                  handleSkipTask(
                    taskDetailData.id,
                    taskDetailData.attachType,
                    props.match.params.id
                  )
                }
                trigger="focus"
                color="#FFFFFF"
                overlayInnerStyle={{
                  padding: '0px 2px',
                  borderRadius: '4px',
                  border: '1px solid #D7D7D7',
                }}
              >
                <Button type="text" style={{ padding: '0px ' }}>
                  <SettingOutlined style={{ fontSize: '18px' }} />
                </Button>
              </Tooltip>
              <Switch
                defaultChecked={false}
                onChange={onChangeSkipShow}
                style={{ marginLeft: '18px' }}
              />
              <Style.SwithTitle>{t('TaskListEdit.hideSkip')}</Style.SwithTitle>
              <span className="date">
                {t('TaskListEdit.completeTime')}{' '}
                {completetime === ''
                  ? minutetimestamp(taskDetailData.completeTime * 1000)
                  : completetime}
              </span>
            </Style.SkipTaskSet>
            <Button type="link" style={{ lineHeight: '35px' }}>
              {t('TaskListEdit.finishTask')}<CheckCircleOutlined />
            </Button>
          </Style.TaskEditState>
        )}
        {status === 2 && revise === 1 && (
          <Style.TaskEditState>
            <Style.SkipTaskSet>
              <Style.ButtonComplete>{t('TaskListEdit.complete')}</Style.ButtonComplete>
              <Tooltip
                title={() =>
                  handleSkipTask(
                    taskDetailData.id,
                    taskDetailData.attachType,
                    props.match.params.id
                  )
                }
                trigger="focus"
                color="#FFFFFF"
                overlayInnerStyle={{
                  padding: '0px 2px',
                  borderRadius: '4px',
                  border: '1px solid #D7D7D7',
                }}
              >
                <Button type="text" style={{ padding: '0px ' }}>
                  <SettingOutlined style={{ fontSize: '18px' }} />
                </Button>
              </Tooltip>
              <Switch
                defaultChecked={false}
                onChange={onChangeSkipShow}
                style={{ marginLeft: '18px' }}
              />
              <Style.SwithTitle>{t('TaskListEdit.hideSkip')}</Style.SwithTitle>
              <span className="date">
                {t('TaskListEdit.completeTime')}
                {completetime === ''
                  ? minutetimestamp(taskDetailData.completeTime * 1000)
                  : completetime}
              </span>
            </Style.SkipTaskSet>
            {taskInfo.attachType !== 'output' && <Button onClick={handleGerberComplete} type="primary" style={{ borderRadius: '4px' }}>
              {t('TaskListEdit.confirmComplete')}
            </Button>}
          </Style.TaskEditState>
        )}
        {status === 3 && (
          <Style.TaskEditState>
            <Style.SkipTaskSet>
              <Tooltip
                title={
                  <div>
                    <div>
                      {t('TaskListEdit.time')}{minutetimestamp(taskInfo.taskSkipOperationContent.time * 1000)}
                    </div>
                    <div>{t('TaskListEdit.skipReason')}{taskInfo.taskSkipOperationContent.reason}</div>
                  </div>
                }
                overlayClassName={'newTooptip'}
                placement="topLeft"
              >
                <Style.ButtonAlreadySkip>{t('TaskListEdit.alreadySkip')}</Style.ButtonAlreadySkip>
              </Tooltip>
              <Tooltip
                title={() =>
                  handleSkipTask(
                    taskDetailData.id,
                    taskDetailData.attachType,
                    props.match.params.id
                  )
                }
                color="#FFFFFF"
                trigger="focus"
                overlayInnerStyle={{
                  padding: '6px 6px',
                  borderRadius: '4px',
                  border: '1px solid #D7D7D7',
                }}
              >
                {' '}
                <Button type="text" style={{ padding: '0px ' }}>
                  <SettingOutlined style={{ fontSize: '18px' }} />
                </Button>
              </Tooltip>
              <Switch
                defaultChecked={false}
                onChange={onChangeSkipShow}
                style={{ marginLeft: '18px' }}
              />
              <Style.SwithTitle>{t('TaskListEdit.hideSkip')}</Style.SwithTitle>
            </Style.SkipTaskSet>
          </Style.TaskEditState>
        )}

        {taskInfo.attachType === 'output' && (
          <Style.TaskEditTable>
            <div className="Tasktitle">
              Output
              {revise === 1 &&
                <Style.OutputWarn>
                  {t('TaskListEdit.outputWarning')}<EllipsisOutlined />{t('TaskListEdit.or')}<SettingOutlined />
                  {t('TaskListEdit.select')}
                </Style.OutputWarn>
              }
            </div>
            <Table
              columns={columns}
              dataSource={outputInfoList}
              pagination={false}
              rowKey={(record) => record.id}
              size="small"
              onRow={(record, index) => {
                if (record.skip === 2) {
                  return {
                    style: {
                      background: '#F2F2F2',
                    },
                  };
                }
              }}
            />
          </Style.TaskEditTable>
        )}
        {taskInfo.attachType === 'input' && (
          <Style.TaskEditTable>
            <div className="Tasktitle">
              Intput<span>{t('TaskListEdit.download')}</span>
            </div>
            <Table
              columns={columnsinput}
              dataSource={inputInfoList}
              pagination={false}
              rowKey={(record) => record.id}
              size="small"
              onRow={(record, index) => {
                if (record.skip === 2) {
                  return {
                    style: {
                      background: '#F2F2F2',
                    },
                  };
                }
              }}
            />
          </Style.TaskEditTable>
        )}
        {taskInfo.attachType === 'inout' && (
          <>
            <Style.TaskEditTable>
              <div className="Tasktitle">
                Output<span>{t('TaskListEdit.download')}</span>
              </div>
              <Table
                columns={columns}
                dataSource={outputInfoList}
                pagination={false}
                rowKey={(record) => record.id}
                size="small"
                onRow={(record, index) => {
                  if (record.skip === 2) {
                    return {
                      style: {
                        background: '#F2F2F2',
                      },
                    };
                  }
                }}
              />
            </Style.TaskEditTable>
            <Style.TaskEditTable>
              <div className="Tasktitle">
                Input<span>{t('TaskListEdit.download')}</span>
              </div>
              <Table
                columns={columnsinput}
                dataSource={inputInfoList}
                pagination={false}
                rowKey={(record) => record.id}
                size="small"
                onRow={(record, index) => {
                  if (record.skip === 2) {
                    return {
                      style: {
                        background: '#F2F2F2',
                      },
                    };
                  }
                }}
              />
            </Style.TaskEditTable>
          </>

        )}
      </Style.TaskTable>

      <UploadModal
        revise={revise}
        useroptions={useroptions}
        isModalVisible={visible}
        onClick={onClickModalUpload}
        uploadtabledate={uploadtabledate}
        updatelistclick={updatelistclick}
        plmCode={props.match.params.id}
        click={onClickTime}
      ></UploadModal>
      <DueDate
        useroptions={useroptions}
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
      <SkipModal
        useroptions={useroptions}
        plmForm={props.match.params.id}
        onClick={onCloseSkip}
        isModalVisible={visibleSkip}
        skipIdTypeVersion={skipIdTypeVersion}
        updatelistclick={updatelistclick}
      ></SkipModal>
      <GerberRelease
        useroptions={useroptions}
        plmForm={props.match.params.id}
        onClick={onCloseGerber}
        isModalVisible={visibleGerber}
        gerberIdTypeVersion={gerberIdTypeVersion}
        updatelistclick={updatelistclick}
        taskId={taskInfo.taskId}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskListEdit));
