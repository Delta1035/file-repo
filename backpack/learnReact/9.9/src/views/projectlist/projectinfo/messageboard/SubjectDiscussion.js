import React from 'react'
import * as Style from './MessageBoardStyle'
import { Form, Button, Upload, Select, Modal, Collapse, Avatar, Card, Empty, Tooltip, message, Tag, Spin } from 'antd'
import { useState, useEffect } from 'react'
import { PaperClipOutlined, MailOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import CollapseCompont from './CollapseCompont';
import Icon from "@/icon/Icon";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';//富文本样式文件
import { getDiscussionInfo, getProjectMembers, azureupload, addRespond } from '@/api';
import useMinutetimestamp from '@/hooks/minutetimestamp'
import useazureUpload from '@/hooks/azureupload'
import useazuredownload from '@/hooks/azuredownload'
import { saveAs } from 'file-saver'
import { useTranslation } from "react-i18next";

const { Panel } = Collapse;

export default function SubjectDiscussion ({ isvisiblediscussion, onClickD, subjectId, id, classification }) {
  const minutetimestamp = useMinutetimestamp()
  const [editorvalue, setEditorvalue] = useState('');
  const [editorText, setEditorText] = useState('');
  const [editorTextLength, setEditorTextLength] = useState();
  const [formdiscussion] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isdisabledupload, setIsDisabledUpload] = useState(false)
  const [ishowRespondContent, setIshowRespondContent] = useState(false)
  const [collapseKey, setCollapseKey] = useState()
  const [ishowDescriptionText, setIshowDescriptionText] = useState(true)
  const [sortType, setSortType] = useState(false)
  const [sort, setSort] = useState('desc')
  const [subjectInfo, setSubjectInfo] = useState({})
  const [respondList, setRespondList] = useState([])
  const [projectMembers, setProjectMembers] = useState([])
  const [defaultFunctions, setDefaultFunctions] = useState([])
  const [isUpdateDiscussionInfo, setIsUpdateDiscussionInfo] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checkCreator, setCheckCreator] = useState(false)
  const [subjectAttachList, setSubjectAttachList] = useState()
  const { t } = useTranslation();

  useEffect(() => {
    getDiscussionInfo({
      subjectId: subjectId,
      order: sort
    }).then(res => {
      setSubjectInfo(res.data.data)
      setRespondList(res.data.data.respondList)
      setCheckCreator(res.data.data.checkCreator)
      setDefaultFunctions(res.data.data.participantList)
      setSubjectAttachList(res.data.data.subjectAttachList[0]);

      if (res.data.data.checkCreator) {
        formdiscussion.setFieldsValue({
          participants: res.data.data.participantList
        })
      } else {
        formdiscussion.setFieldsValue({
          participants: [],
        })
        setDefaultFunctions([])
      }
      if (res.data.data.respondList[0] === undefined) {
        setIshowRespondContent(true)
      } else {
        setIshowRespondContent(false)
      }
    })
  }, [subjectId, sort, isUpdateDiscussionInfo])//eslint-disable-line

  useEffect(() => {
    getProjectMembers({
      rfqCodeOrPlmForm: id,
      subjectId: subjectId,
      classification: classification
    }).then(res => {
      setProjectMembers(res.data.data)
    })
  }, [id, isUpdateDiscussionInfo])//eslint-disable-line

  // 文件列表处理
  const handleChange = (info) => {

    if (info.fileList.length >= 5) {
      setIsDisabledUpload(true)
    } else {
      setIsDisabledUpload(false)
    }
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    onChange: handleChange,

    fileList,
  };

  const handleSubmitDiscussion = async () => {
    if (editorTextLength !== 1) {
      // 获取sas密钥
      const azureinfo = await azureupload()
      const containerName = azureinfo.data.data.container; //Blob 存储中的容器的名称。 可以将其视为等同于文件系统的文件夹或目录
      const sasToken = azureinfo.data.data.azureStorageSAS; //使用 Azure 门户创建的 SAS 令牌
      const storageAccountName = azureinfo.data.data.account; //资源名称
      formdiscussion.validateFields().then(values => {
        setLoading(true)
        let filename = []
        const promises = []
        fileList.forEach(file => {
          promises.push(useazureUpload(containerName, sasToken, storageAccountName)(file, file.name.substring(0, file.name.lastIndexOf('.')) + '-' + file.uid + file.name.substring(file.name.lastIndexOf("."))))
          filename.push(file.name.substring(0, file.name.lastIndexOf('.')) + '-' + file.uid + file.name.substring(file.name.lastIndexOf(".")))
        })
        Promise.all(promises).then(res => {
          addRespond({
            subjectId: subjectId,
            message: editorvalue,
            messageText: editorText,
            participants: values.participants,
            respondAttach: filename
          }).then(response => {
            if (response.data.code === 200) {
              setLoading(false)
              message.success(t('subjectDiscussion.discussionSuccess'))
              formdiscussion.resetFields()
              setEditorvalue('')
              setFileList([])
              setIsUpdateDiscussionInfo(!isUpdateDiscussionInfo)
            } else {
              setLoading(false)
              message.success(t('subjectDiscussion.discussionFail'))
            }
          }).catch(err => {
            setLoading(false)
            message.error(t('subjectDiscussion.discussionFail'))
          })

        }).catch(err => {
          message.error(t('subjectDiscussion.discussionFail'))
          setLoading(false)
        })
      })
    } else {
      message.error(t('subjectDiscussion.contentMessage'))
    }
  }

  const handleChangeEditor = (content, delta, source, editor) => {
    setEditorvalue(content)
    setEditorTextLength(editor.getText().length);
    setEditorText(editor.getText())
  }

  const handleCancelDiscussion = () => {
    onClickD()
    formdiscussion.resetFields()
    setEditorvalue('')
    setFileList([])
  }

  const handleChangeSort = (value) => {
    setSortType(!sortType)
    setSort(value)
  }

  const onChangeCollapse = (key) => {
    if (key[0] === '1') {
      setCollapseKey(key[0])
      setIshowDescriptionText(false)
    } else {
      setTimeout(() => {
        setCollapseKey(key[0])
      }, 200);
      setIshowDescriptionText(true)
    }
  }

  const handleDownload = async (filename) => {

    const azureinfo = await azureupload();
    const containerName = azureinfo.data.data.container; //Blob 存储中的容器的名称。 可以将其视为等同于文件系统的文件夹或目录
    const sasToken = azureinfo.data.data.azureStorageSAS; //使用 Azure 门户创建的 SAS 令牌
    const storageAccountName = azureinfo.data.data.account; //资源名称
    useazuredownload(
      storageAccountName,
      containerName,
      sasToken,
      filename//下載後的文件名字
    )().then(res => {
      message.success(t('subjectDiscussion.downloadSuccess'));
      if (filename.substring(filename.lastIndexOf(".")) === ".txt") {
        saveAs(res, filename);
      } else {
        handleDownFile(res);
      }
    })
      .catch(err => {
        message.error(t('subjectDiscussion.downloadFail'));
      });
  }

  const handleDownFile = fileurl => {
    const oa = document.createElement("a");
    oa.href = fileurl;
    oa.setAttribute("target", "_blank");
    document.body.appendChild(oa);
    oa.click();
  };

  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }],
        ['clean']

      ],
    },
  };


  const headersubject = (
    <>
      <Style.CardDiv >
        <Card>
          <Meta avatar={<Avatar icon={<Icon.PICMegBlue />} style={{ color: 'blue' }} />}
            title={<Style.MetaDiv><Style.MetaSpan color='#486ADF'>{subjectInfo.creator}</Style.MetaSpan><Style.MetaSpan color='#C4C4C4'>- Originator</Style.MetaSpan></Style.MetaDiv>}
            description={
              <>
                <Style.Description >

                  <Style.DescriptionmessageParticipant><Tooltip title={subjectInfo.participants} overlayClassName={'newTooptip'} placement="topLeft">{subjectInfo.participants}  </Tooltip></Style.DescriptionmessageParticipant>

                  <Style.DescriptionTime>{minutetimestamp(subjectInfo.createTime * 1000)}</Style.DescriptionTime>
                </Style.Description>
                {
                  ishowDescriptionText &&
                  <Style.DescriptionTextFlex>
                    <Style.DescriptionText >
                      {subjectInfo.descriptionText}
                    </Style.DescriptionText>
                    {subjectAttachList && <PaperClipOutlined style={{ color: '#333333' }} />}
                  </Style.DescriptionTextFlex>
                }
              </>
            } />
        </Card>
      </Style.CardDiv>
    </>
  )


  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;


    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };


    return (
      <Tag
        color={subjectInfo.functionList.includes(value) ? '#486ADF' : ''}
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
    <div>
      <Modal title="Subject Discussion" centered={true} visible={isvisiblediscussion} okText='Submit' onOk={handleSubmitDiscussion} onCancel={handleCancelDiscussion} width='1500px' bodyStyle={{ padding: '15px', height: '750px' }} >
        <Spin tip={t('subjectDiscussion.addLoading')} spinning={loading}>
          <Style.ModalContent data-testid='modal'>
            <Style.ModalContentLeft >
              <Style.HeaderSubject><MailOutlined /> {subjectInfo.subject}</Style.HeaderSubject>
              <Collapse onChange={onChangeCollapse} ghost expandIconPosition="end">
                <Panel header={headersubject} key={'1'} showArrow={false}>
                  <div>
                    <Style.FileList>
                      {
                        subjectInfo.subjectAttachList?.map(item => <Tooltip overlayClassName={'newTooptip'} title={item} key={item}>
                          <Style.File >
                            <Style.FileName>{item}</Style.FileName>
                            <DownloadOutlined onClick={() => { handleDownload(item) }} />
                          </Style.File>
                        </Tooltip>)
                      }
                    </Style.FileList>

                    <Style.DescriptionText2 > <span dangerouslySetInnerHTML={{ __html: subjectInfo.description }} /> </Style.DescriptionText2>

                  </div>
                </Panel>
              </Collapse>
              <Style.Respond>
                <Style.RespondTitle>
                  <div>Respond : (Qty:{subjectInfo.total})</div>
                  {ishowRespondContent ? <Style.RespondTitleSpan color='#999999' ><Icon.Sorting /> {t('subjectDiscussion.showLatest')} </Style.RespondTitleSpan> : (sortType ? <Style.RespondTitleSpan color='#333333' onClick={() => handleChangeSort('desc')}><Icon.Sorting2 />{t('subjectDiscussion.showAncient')}</Style.RespondTitleSpan> :
                    <Style.RespondTitleSpan color='#333333' onClick={() => handleChangeSort('asc')}><Icon.Sorting2 /> {t('subjectDiscussion.showLatest')} </Style.RespondTitleSpan>)}
                </Style.RespondTitle>
              </Style.Respond>
              {
                ishowRespondContent ? (<Style.Empty height={collapseKey === '1' ? (subjectAttachList ? (subjectInfo.subjectAttachList.length > 3 ? '300px' : '340px') : '385px') : '560px'}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('subjectDiscussion.emptyDescription')} />
                </Style.Empty>) :
                  <Style.RespondContent height={collapseKey === '1' ? (subjectAttachList ? (subjectInfo.subjectAttachList.length > 3 ? '300px' : '340px') : '385px') : '560px'}>
                    {
                      respondList.map(item => <CollapseCompont respondInfo={item} key={item.discussionId} />)
                    }
                  </Style.RespondContent>
              }
            </Style.ModalContentLeft>
            <Style.ModalContentRight >
              <Style.ContentRightTitle>New add Respond</Style.ContentRightTitle>
              {!checkCreator && <Style.Participants>
                Current Participants : <Style.ParticipantsLabel>{subjectInfo.participants}</Style.ParticipantsLabel>
              </Style.Participants>}
              <Form layout='vertical' form={formdiscussion} initialValues={{ 'participants': defaultFunctions }}>
                <Form.Item name='participants' rules={[{ required: checkCreator, message: t('subjectDiscussion.participantsMessage'), }]} >
                  <Select mode="multiple" options={projectMembers} tagRender={tagRender} placeholder='New add participants' >
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Style.MessageEdit height='500px'>
                    <ReactQuill
                      value={editorvalue}
                      onChange={handleChangeEditor}
                      className="publish-quill"
                      placeholder={t('subjectDiscussion.quillPlaceholder')}
                      theme="snow"
                      modules={modules}
                    />
                  </Style.MessageEdit>
                </Form.Item>
                <Form.Item>
                  <Style.UploadFile>
                    <Upload
                      {...props}
                      maxCount={5}
                    >
                      <Button icon={<UploadOutlined />} disabled={isdisabledupload}>
                        Upload File (Max:5)
                      </Button>
                      <Style.Waring>{t('subjectDiscussion.waring')}</Style.Waring>
                    </Upload>
                  </Style.UploadFile>
                </Form.Item>
              </Form>




            </Style.ModalContentRight>
          </Style.ModalContent>
        </Spin>
      </Modal>
    </div >
  )
}
