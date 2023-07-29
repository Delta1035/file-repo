import React, { useEffect } from 'react';
import { Button, Modal, Form, message, Table, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons'
import useDatetimestamp from '@/hooks/datetimestamp';
import useMinutetimestamp from '@/hooks/minutetimestamp'
import useazuredownload from '@/hooks/azuredownload'
import { historyUploadInfo, azureupload } from '@/api/index'
import { useTranslation } from "react-i18next";
import * as Style from '@/views/projectlist/ProjectListStyle';
import { useState } from 'react';
import { saveAs } from 'file-saver'
import { useUserStore } from '@/userstore/userStore'
export default function UploadHistory ({ isModalVisible, onClick, historyattacid, user }) {
  // 分钟时间戳
  const minutetimestamp = useMinutetimestamp();

  //日期时间戳
  const datetimeFormat = useDatetimestamp()

  const { perms, functions } = useUserStore()

  //历史记录数据
  const [historydata, setHistorydata] = useState({});
  // 历史表格数据
  const [historydatasource, setHistorydatasource] = useState([]);

  const { t } = useTranslation();

  useEffect(
    () => {
      if (historyattacid !== undefined) {
        historyUploadInfo({
          attachId: historyattacid
        }).then(res => {
          setHistorydata(res.data.data);
          setHistorydatasource(res.data.data.attachHistoryUploadInfoList);
        });
      }
    },
    [historyattacid]
  );

  const onCancelClick = () => {
    onClick();
  };
  const columns = [
    {
      title: 'Final',
      dataIndex: 'isFinal',
      width: 50,
      align: 'center',
      render: (text, record) => {
        return record.version === "0"
          ? "-"
          : text === false
            ? <Style.NfinalVersion>N</Style.NfinalVersion>
            : <Style.YfinalVersion>Y</Style.YfinalVersion>;
      }
    },
    {
      title: 'Ver.',
      dataIndex: 'version',
      width: 40,
      align: 'center',
      render: (text, record) => {
        return text === "0"
          ? "-"
          : <div style={{ color: "#486ADF", textAlign: "center" }}>
            {text}
          </div>;
      }
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      align: "center",
      render: (text, record) => {
        return text === 0
          ? <div>{t('UploadHistory.noSetting')}</div>
          : text === null
            ? <div style={{ color: "#FF0000" }}>{t('UploadHistory.waitSetting')}</div>
            : <div>
              {datetimeFormat(text * 1000)}{" "}
            </div>;
      }
    },
    {
      title: "Upload by",
      dataIndex: "uploadBy",
      align: "center",
      render: (text, record) => {
        return text === null ? "-" : text;
      }
    },
    {
      title: "Last Update Time ",
      dataIndex: "uploadTime",
      width: 160,
      align: "center",
      render: (text, record) => {
        return text === null ? "-" : minutetimestamp(text * 1000);
      }
    },
    {
      title: t("UploadHistory.demandModifier"),
      dataIndex: "demandModifier",
      render: text => (
        <Tooltip overlayClassName={'newTooptip'} placement="topLeft" title={text}>
          {text == null ? '-' : <Style.TextHide>{text}</Style.TextHide>}
        </Tooltip>
      )
    },
    {
      title: t("UploadHistory.reason"),
      dataIndex: "reason",
      render: text => (
        <Tooltip overlayClassName={'newTooptip'} placement="topLeft" title={text}>
          {text == null ? '-' : <Style.TextHide>{text}</Style.TextHide>}
        </Tooltip>
      )
    },
    {
      title: t("UploadHistory.content"),
      dataIndex: "note",
      render: text => (
        <Tooltip overlayClassName={'newTooptip'} placement="topLeft" title={text}>
          {text == null ? '-' : <Style.TextHide>{text}</Style.TextHide>}
        </Tooltip>
      )
    },
    {
      title: "Note",
      align: "center",
      width: 60,
      render: (text, record) => {
        return <Button data-testid='download' style={{ padding: '0px ' }} type='text' disabled={record.version === '0' || !(perms.includes('checklist:processTask:download') || perms.includes('*:*:*')) || !(functions.includes(user) || functions.includes('*'))} ><DownloadOutlined onClick={() => {
          handledownloadfile(record)
        }} /></Button>
      }
    }
  ];

  // 下载请求
  const handledownloadfile = async record => {
    const azureinfo = await azureupload();
    const containerName = azureinfo.data.data.container; //Blob 存储中的容器的名称。 可以将其视为等同于文件系统的文件夹或目录
    const sasToken = azureinfo.data.data.azureStorageSAS; //使用 Azure 门户创建的 SAS 令牌
    const storageAccountName = azureinfo.data.data.account; //资源名称

    useazuredownload(
      storageAccountName,
      containerName,
      sasToken,
      record.docRealName
    )()
      .then(res => {
        message.success(t("UploadHistory.downloadSuccess"));
        if (
          record.docRealName.substring(record.docRealName.lastIndexOf(".")) ===
          ".txt"
        ) {
          saveAs(res, record.docRealName);
        } else {
          handleDownFile(res);
        }
      })
      .catch(res => {
        message.error(t("UploadHistory.downloadFail"));
      });
  };
  const handleDownFile = fileurl => {
    const oa = document.createElement("a");
    oa.href = fileurl;
    oa.setAttribute("target", "_blank");
    document.body.appendChild(oa);
    oa.click();
  };
  return (
    <Modal
      title="Upload History"
      visible={isModalVisible}
      onCancel={onCancelClick}
      centered={true}
      bodyStyle={{ padding: "16px" }}
      maskClosable={false}
      okText="submit"
      width="1200px"
      destroyOnClose={true}
      footer={[
        // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮

        <Button key="submit" type="primary" onClick={onCancelClick}>
          Close
        </Button>
      ]}
    >
      <Style.UploadTitle>
        {historydata.route}
      </Style.UploadTitle>
      <Style.TaskListEditTitle color="#333333" fontsize="14px">
        {historydata.title}
      </Style.TaskListEditTitle>
      <Style.FormStyle>
        <Form data-testid="uploadform" labelAlign="left" labelCol={{ span: 5 }}>
          <Form.Item label="File Name">
            <Style.TaskListEditTitle fontsize="14px">
              {historydata.fileName}
            </Style.TaskListEditTitle>
          </Form.Item>
          <Form.Item label="Format">
            <Style.TaskListEditTitle fontsize="14px">
              {historydata.format}
            </Style.TaskListEditTitle>
          </Form.Item>
          <Form.Item label="to">
            <Style.TaskListEditTitle fontsize="14px">
              {historydata.toOrFrom}
            </Style.TaskListEditTitle>
          </Form.Item>
        </Form>
      </Style.FormStyle>
      <Table
        data-testid='showtable'
        columns={columns}
        dataSource={historydatasource}
        rowKey={record => record.docRandomName}
        scroll={{
          y: 200
        }}
        size="small"
        pagination={false}
      />
    </Modal>
  );
}
