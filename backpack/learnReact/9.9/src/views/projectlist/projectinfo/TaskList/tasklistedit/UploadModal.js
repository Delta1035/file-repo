import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Tag, Upload, Checkbox, Select, Input, message, Spin, Tooltip } from 'antd';
import * as Style from '../../../ProjectListStyle';
import { UploadOutlined, LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import { PaperClipOutlined } from '@ant-design/icons';
import useazureUpload from '@/hooks/azureupload'
import { azureupload, uploadInfo, updateUploadInfo, downloadInput, getFunctionMember } from '@/api/index'
import useMinutetimestamp from '@/hooks/minutetimestamp'
import { v4 as uuidv4 } from 'uuid';
import store from '@/mobx/store';
import useazuredownload from '@/hooks/azuredownload'

export default function UploadModal ({ useroptions, isModalVisible, onClick, uploadtabledate, updatelistclick, click, plmCode, revise }) {

  const minutetimestamp = useMinutetimestamp()

  // 文件列表
  const [fileList, setFileList] = useState([]);

  //设置等待文件上传显示
  const [isShowWaitUpload, setIsShowWaitUpload] = useState(true);

  // 设置是否禁用上传按钮
  const [isDiableUpload, setIsDiableUpload] = useState(false);

  //显示final version 选框
  const [isShowVersionCheck, setIsShowVersionCheck] = useState(false);

  // // 设置修改最终版本的理由组件
  // const [isShowVersionCase, setIsShowVersionCase] = useState(false)
  // 文件未上传警告
  const [isShowWaring, setIsShowWaring] = useState(false)

  // 理由未输入警告
  const [isShowReasonWaring, setIsShowReasonWaring] = useState(false)
  // 设置 submit确认按钮
  const [isAbledSubmit, setIsAbledSubmit] = useState(true)

  // cancel按鈕
  const [isAbledCancel, setIsAbledCancel] = useState(false)

  //upload信息
  const [uploadinfo, setUploadinfo] = useState({})

  const [form] = Form.useForm();

  const [filerandomname, setFileRandomName] = useState('')

  // 文件是否最终版本
  const [finalversion, setFinalversion] = useState(false)

  const [user, setUser] = useState('')
  const [reason, setReason] = useState('')
  const [content, setContent] = useState('')
  // modal右上角叉叉
  const [modalclosable, setModalclosable] = useState(true)

  const [formatdata, setFormatdata] = useState([])

  const [defaultarryuser, setDefaultArryUser] = useState([])

  const [functionmembers, setFunctionMembers] = useState([])

  const [loading, setLoading] = useState(false)

  const { t } = useTranslation();


  useEffect(() => {
    let toarry = [];
    if (uploadtabledate?.id !== undefined) {
      uploadInfo({
        attachId: uploadtabledate.id
      }).then(res => {
        setUploadinfo(res.data.data)
        setFinalversion(res.data.data.attachmentUploadInfo.isFinal)
        setFormatdata(res.data.data.attachmentUploadInfo.format)
        if (res.data.data.attachmentUploadInfo.toOrFrom === '') {
          setDefaultArryUser(toarry)
          form.setFieldsValue({
            notify: toarry
          })
        } else {
          toarry = res.data.data.attachmentUploadInfo.toOrFrom.split(',')
          setDefaultArryUser(toarry)
          form.setFieldsValue({
            notify: toarry
          })
        }


        getFunctionMember({
          plmCode: plmCode
        }).then(response => {
          setFunctionMembers(response.data.data.filter(item =>
            res.data.data.attachmentUploadInfo.toOrFrom.includes(item.function)
          ))
        })
      })


    }
  }, [uploadtabledate?.id, plmCode])//eslint-disable-line




  // submit回调
  const onOkClick = async () => {
    // 获取sas密钥
    const azureinfo = await azureupload()
    const containerName = azureinfo.data.data.container; //Blob 存储中的容器的名称。 可以将其视为等同于文件系统的文件夹或目录
    const sasToken = azureinfo.data.data.azureStorageSAS; //使用 Azure 门户创建的 SAS 令牌
    // const sasToken = '?sv=2020-08-04&ss=bqtf&srt=sco&spr=https&st=2022-11-28T06:17:11Z&se=2022-12-05T06:17:11Z&sp=rwdxlacupt&sig=r5BoZGyAfUZ2MzVZvyEcDXBQzmiXkk6etD8tWrD0LLo%3D'
    const storageAccountName = azureinfo.data.data.account; //资源名称


    form.validateFields().then(values => {
      store.changeloadingShow()

      setIsAbledSubmit(true)
      setModalclosable(false)
      setIsAbledCancel(true)
      setLoading(true)
      // 文件上传
      useazureUpload(containerName, sasToken, storageAccountName)(fileList[0], filerandomname).then(res => {
        // 清空文件列表

        //保持文件信息同步后端
        updateUploadInfo({
          "id": uploadtabledate.id,
          "version": Number(uploadinfo.attachmentUploadInfo.version) + 1,
          "isFinal": finalversion,
          "docRealName": filerandomname,
          "docRandomName": fileList[0].uid + fileList[0].name.substring(fileList[0].name.lastIndexOf(".")),
          "demandModifier": values.user,
          "reason": values.cause,
          "note": values.content,
          "plmCode": uploadinfo.attachmentUploadInfo.plmCode,
          "taskTemplateId": uploadinfo.attachmentUploadInfo.taskTemplateId,
          "notifyList": values.notify
        }).then(res => {
          //清除inputvalue 信息
          setUser('')
          setReason('')
          setContent('')
          //触发列表更新
          updatelistclick()

          form.resetFields();

          // 情況文件列表
          setFileList([]);
          //顯示上傳按鈕
          setIsDiableUpload(false);

          //隱藏最終版文件選框
          setIsShowVersionCheck(false);
          //顯示上傳等待
          setIsShowWaitUpload(true)


          handleClick(minutetimestamp(res.data.data.lastUpdateTime * 1000))

          //上传成功提示框
          message.success(t('UploadModal.uploadSuccess'));

          setLoading(false)

          //关闭modal窗口
          onClick();
          // 顯示器取消按鈕
          setIsAbledCancel(false)
          // 顯示右上角關閉按鈕
          setModalclosable(true)
          //Cancel后取消警告提醒
          setIsShowWaring(false)

          if (values.email !== undefined) {
            sendMail(uploadtabledate.id, uploadinfo.attachmentUploadInfo?.docName, values.email)
          }


        }).catch((err) => {
          message.error(t('UploadModal.uploadFail'));
          setLoading(false)
          setIsAbledCancel(false)
          // 顯示右上角關閉按鈕
          setModalclosable(true)
          //Cancel后取消警告提醒
          setIsShowWaring(false)
          //Cancel后取消警告提醒
          setIsShowWaring(false)
        })
      })
        .catch((err) => {
          form.resetFields();
          message.error(t('UploadModal.uploadFail'));
          setLoading(false)
          //关闭modal窗口
          onClick();

          // 情況文件列表
          setFileList([]);
          //顯示上傳按鈕
          setIsDiableUpload(false);

          //隱藏最終版文件選框
          setIsShowVersionCheck(false);
          //顯示上傳等待
          setIsShowWaitUpload(true)

          //关闭modal窗口
          onClick();
          // 顯示器取消按鈕
          setIsAbledCancel(false)
          // 顯示右上角關閉按鈕
          setModalclosable(true)
          //Cancel后取消警告提醒
          setIsShowWaring(false)
        })
    }).catch(err => {
      console.log('校验失败:', err);
    })

  };

  // 呼叫outlook、
  const sendMail = async (attachId, attachDocName, email) => {

    //点击outLook请求链接地址
    const res = await downloadInput({
      attachId: attachId
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
    )().then(res => {

      let link = encodeURIComponent(res); //进行编码
      const body = `Project Name: ${store.ProjectName}%0d%0aDocument Name: ${attachDocName}%0d%0aDownload Link: ${link}%0d%0a%0d%0a%0d%0a${t('UploadModal.linkWarning')}`;
      window.location.href = `mailto:${email.join(';')}&body=${body} `;
    });

  };

  const handleClick = (value) => {
    click(value)
  }
  //取消按钮
  const onCancelClick = () => {
    onClick();
    setFileList([]);
    //设置等待文件上传显示
    setIsShowWaitUpload(true);
    // 设置是否禁用上传按钮
    setIsDiableUpload(false);
    //隐藏最终版本选框
    setIsShowVersionCheck(false);
    //关闭窗口 submit恢复不可点击
    setIsAbledSubmit(true)
    //Cancel后取消警告提醒
    setIsShowWaring(false)

    //取消理由提醒
    setIsShowReasonWaring(false)
    //文件格式上传警告取消
    setIsShowUploadWarning(false)


    setUser('')
    setReason('')
    setContent('')
    form.resetFields();

  };

  // 监听三个input输入框
  useEffect(() => {
    if (user !== '' && reason !== '' && content !== '' && isShowWaitUpload === false) {
      setIsAbledSubmit(false)
      setIsShowWaring(true)
      setIsShowReasonWaring(false)
    } else {
      if (isShowWaitUpload === false && uploadinfo.attachmentUploadInfo?.isFinal === true) {
        setIsAbledSubmit(true)
        setIsShowWaring(false)
        setIsShowReasonWaring(true)
      }
    }

  }, [user, reason, content, isShowWaitUpload])//eslint-disable-line
  const handlereason = (e) => {
    setReason(e.target.value)

  }
  const handleuser = (e) => {
    setUser(e.target.value)
  }
  const handlecontent = (e) => {
    setContent(e.target.value)
  }

  // 文件列表处理
  const handleChange = (info) => {
    if (formatdata === '' || formatdata === null || formatdata.includes(info.fileList[0]?.name.substring(info.fileList[0]?.name.lastIndexOf(".") + 1))) {
      setIsShowUploadWarning(false)

      if (info.fileList[0] !== undefined) {

        setFileRandomName(info.fileList[0].name.substring(0, info.fileList[0].name.lastIndexOf('.')) + '-' + uuidv4() + info.fileList[0].name.substring(info.fileList[0].name.lastIndexOf(".")))
        if (uploadinfo.attachmentUploadInfo?.isFinal === true && (user === '' || reason === '' || content === '')) {
          setIsShowReasonWaring(true)
        } else {
          setIsShowWaring(true)
          setIsAbledSubmit(false)
        }
      }
    }


  };

  const props = {

    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      // 显示可以点上传按钮
      setIsDiableUpload(false);
      //不显示final version 选框
      setIsShowVersionCheck(false);
      //等待文件上传显示
      setIsShowWaitUpload(true);
      //禁用submit按钮
      setIsAbledSubmit(true)
      //删除文件后取消警告提醒
      setIsShowWaring(false)
      setIsShowReasonWaring(false)


    },
    beforeUpload: (file) => {
      if (formatdata === null || formatdata === '' || formatdata.includes(file.name.substring(file.name.lastIndexOf(".") + 1))) {
        setFileList([...fileList, file]);
        setIsShowWaitUpload(false);
        //显示final version 选框
        setIsShowVersionCheck(true);
        //设置等待文件上传显示

        setTimeout(() => {
          // 设置是否禁用上传按钮
          setIsDiableUpload(true);
          setIsShowVersionCheck(true);
          //显示final version 选框
        }, 50);

        return false
      } else {
        setIsShowUploadWarning(true)
      }

    },
    onChange: handleChange,

    fileList,
  };




  const [isShowUploadWarning, setIsShowUploadWarning] = useState(false)


  // 获取是否为最终版本
  const onChange = (e) => {

    setFinalversion(e.target.checked)
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;


    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };


    return (
      <Tag
        color={defaultarryuser.includes(value) ? '#486ADF' : ''}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };


  return (
    <Modal
      closable={modalclosable}
      forceRender
      onClick={handleClick}
      title="Upload"
      visible={isModalVisible}
      onOk={onOkClick}
      onCancel={onCancelClick}
      centered={true}
      bodyStyle={{ padding: '16px' }}
      maskClosable={false}
      okText='submit'
      width='700px'
      footer={[
        // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
        <Button key="back" onClick={onCancelClick} disabled={isAbledCancel} >Cancel</Button>,
        <Button key="submit" disabled={isAbledSubmit} type="primary" onClick={onOkClick}>
          Submit
        </Button>,]}
    >
      <Spin spinning={loading} tip={t('UploadModal.uploadLoading')}
        indicator={<LoadingOutlined style={{ fontSize: 24, }} />}>

        <Style.UploadTitle>{uploadinfo.route} </Style.UploadTitle>
        <Style.TaskListEditTitle color="#333333" fontsize="14px">
          {uploadinfo.title}
        </Style.TaskListEditTitle>
        <Style.FormStyle>
          <Form labelAlign="left" labelCol={{ span: 5 }} form={form}
            initialValues={{ 'notify': defaultarryuser }}>
            <Form.Item label="File Name">
              <Style.TaskListEditTitle fontsize="14px">{uploadinfo.attachmentUploadInfo?.docName}</Style.TaskListEditTitle>
            </Form.Item>
            <Form.Item label="Format">
              <Style.TaskListEditTitle fontsize="14px">{uploadinfo.attachmentUploadInfo?.format}</Style.TaskListEditTitle>
            </Form.Item>
            <Form.Item label="to">
              <div style={{ fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>{
                functionmembers.map((item, index) =>
                  <Tooltip key={index} overlayClassName={'newTooptip'} placement="bottomLeft" title={
                    <div>
                      <div>· Lead - {item.lead}</div>
                      <div>· Member -  {item.member.join(' , ')}</div>
                    </div>
                  }>
                    <span>{item.function} </span>
                  </Tooltip>
                )

              }</div>
            </Form.Item>
            <Form.Item label="File" width={50}
            >
              <Upload
                {...props}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />} disabled={isDiableUpload}>
                  Select File (Max 1)
                </Button>

                {isShowUploadWarning && <Style.UploadWarning> <ExclamationCircleOutlined style={{ marginLeft: '10px' }} />{t('UploadModal.formatWarning')}</Style.UploadWarning>}
              </Upload>
              {isShowWaitUpload && (
                <div style={{ color: '#D7D7D7', marginTop: '8px' }}>
                  <PaperClipOutlined /> Wait for Upload
                </div>
              )}

              {isShowVersionCheck && <div style={{ marginTop: "8px" }}><Style.CurrentVersion>Current Version : V{Number(uploadinfo.attachmentUploadInfo.version) + 1}</Style.CurrentVersion> <Checkbox checked={finalversion} onChange={onChange} >Final Version</Checkbox></div>}
            </Form.Item>
            <Form.Item label="Notify Loop" name='notify' >
              <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                style={{
                  width: '100%',
                }}
                options={useroptions}
              >

              </Select>
            </Form.Item>
            <Form.Item name='email' label='Email'>
              <Select
                mode="tags"
                style={{
                  width: '100%',
                }}
                placeholder={t('UploadModal.emailPlaceholder')}
                open={false}
              >
              </Select>
            </Form.Item>
          </Form>
          {(uploadinfo.attachmentUploadInfo?.isFinal || revise !== 0) && <Form labelAlign="left" form={form} labelCol={{ span: 5 }}> <Form.Item
            label={t('UploadModal.user')}
            name="user"
            rules={[
              {
                required: true,
                message: t('UploadModal.userMessage')
              },
            ]}
          >
            <Input placeholder={t('UploadModal.userPlaceholder')} onChange={handleuser} />
          </Form.Item>
            <Form.Item
              label={t('UploadModal.reason')}
              name="cause"
              rules={[
                {
                  required: true,
                  message: t('UploadModal.reasonMessage')

                },
              ]}
            >
              <Input placeholder={t('UploadModal.reasonPlaceholder')} onChange={handlereason} />
            </Form.Item>
            <Form.Item
              label={t('UploadModal.content')}
              name='content'
              rules={[
                {
                  required: true,
                  message: t('UploadModal.contentMessage')
                },
              ]}
            >
              <Input placeholder={t('UploadModal.contentPlaceholder')} onChange={handlecontent} />
            </Form.Item>
          </Form>}

          {(isShowReasonWaring || revise !== 0) && <Style.Warning>{t('UploadModal.modifyWarning')}</Style.Warning>}
          {isShowWaring && <Style.Warning>{t('UploadModal.submitWarning')}</Style.Warning>}
        </Style.FormStyle>
      </Spin >

    </Modal >
  );
}
