import React, { useState, useEffect } from 'react'
import { Form, Select, Input, Button, Modal, Upload, message, Spin, Tag } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import * as Style from './MessageBoardStyle'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';//富文本样式文件
import { azureupload, addSubject, getProjectMembers } from '@/api/index'
import useazureUpload from '@/hooks/azureupload'
import { withRouter } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const functionList = [
  "PM",
  "TM",
  "EE",
  "ME",
  "Layout",
  "EMC",
  "Antenna",
  "Acoustic",
  "RFI",
  "RFC",
  "SPIV",
  "TDC",
  "BG_Acoustic"
]
function NewAddSubject (props) {
  const { isvisibleadd, onClick, onUpdate } = props
  const [editorvalue, setEditorvalue] = useState('');
  const [editorText, setEditorText] = useState('');
  const [formAddSubject] = Form.useForm();
  const [projectMembers, setProjectMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation();
  const [editorTextLength, setEditorTextLength] = useState();

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

  useEffect(() => {
    getProjectMembers({
      rfqCodeOrPlmForm: props.match.params.id,
      subjectId: '',
      classification: props.match.params.classification
    }).then(res => {
      setProjectMembers(res.data.data)
    })
  }, [props.match.params.id, props.match.params.classification])

  // submit回調
  const handleOkNewAdd = async () => {
    if (editorTextLength !== 1) {


      // 获取sas密钥
      const azureinfo = await azureupload()
      const containerName = azureinfo.data.data.container; //Blob 存储中的容器的名称。 可以将其视为等同于文件系统的文件夹或目录
      const sasToken = azureinfo.data.data.azureStorageSAS; //使用 Azure 门户创建的 SAS 令牌

      const storageAccountName = azureinfo.data.data.account; //资源名称
      formAddSubject.validateFields().then(values => {
        setLoading(true)
        let filename = []
        const promises = []
        fileList.forEach(file => {
          promises.push(useazureUpload(containerName, sasToken, storageAccountName)(file, file.name.substring(0, file.name.lastIndexOf('.')) + '-' + file.uid + file.name.substring(file.name.lastIndexOf("."))))
          filename.push(file.name.substring(0, file.name.lastIndexOf('.')) + '-' + file.uid + file.name.substring(file.name.lastIndexOf(".")))
        })
        Promise.all(promises).then(res => {
          addSubject({
            rfqCodeOrPlmForm: props.match.params.id,
            projectType: props.match.params.classification,
            subject: values.subject,
            description: editorvalue,
            descriptionText: editorText,
            participants: values.participants,
            attachList: filename
          }).then(response => {
            setLoading(false)
            message.success(t('newAddSubject.subjectSuccess'))
            onClick()
            onUpdate()
            formAddSubject.resetFields()
            setEditorvalue('')
            setFileList([])
          })
        }).catch(err => {
          setLoading(false)
          message.error(t('newAddSubject.subjectFail'))
          onClick()
          onUpdate()
          formAddSubject.resetFields()
          setEditorvalue('')
          setFileList([])
        })
      })
    } else {
      message.error(t('newAddSubject.contentMessage'))
    }

  }

  const handleChangeEditor = (content, delta, source, editor) => {
    setEditorvalue(content)
    setEditorText(editor.getText())
    setEditorTextLength(editor.getText().length)
  }

  const handleCancelNewAdd = () => {
    onClick()
    formAddSubject.resetFields()
    setEditorvalue('')
    setFileList([])
    setIsDisabledUpload(false)
  }
  const [fileList, setFileList] = useState([]);
  const [isdisabledupload, setIsDisabledUpload] = useState(false)

  // 文件列表处理
  const handleChange = (info) => {

    if (info.fileList.length >= 5) {
      setIsDisabledUpload(true)
    } else {
      setIsDisabledUpload(false)
    }
  };

  const propsfile = {
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
  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;


    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };


    return (
      <Tag
        color={functionList.includes(value) ? '#486ADF' : ''}
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
      <Modal title="New Add Subject" centered={true} visible={isvisibleadd} okText='Submit' onOk={handleOkNewAdd} onCancel={handleCancelNewAdd} width='700px' bodyStyle={{ padding: '16px' }}>
        <Spin tip={t('newAddSubject.addLoading')} spinning={loading}>
          <Style.FormStyle>
            <Form layout='vertical' form={formAddSubject} validateTrigger='onSubmit' >
              <Form.Item label='Subject' name='subject' rules={[{ required: true, message: t('newAddSubject.inputSubject'), }]}>
                <Input />
              </Form.Item>
              <Form.Item label='Participants' name='participants' rules={[{ required: true, message: t('newAddSubject.participantsMessage'), }]} >
                <Select mode="multiple" tagRender={tagRender} placeholder={t('newAddSubject.participantsPlaceholder')} options={projectMembers}>
                </Select>
              </Form.Item>
              <Form.Item >
                <Style.MessageEdit height='150px'>
                  <ReactQuill
                    value={editorvalue}
                    onChange={handleChangeEditor}
                    className="publish-quill"
                    placeholder={t('newAddSubject.quillPlaceholder')}
                    theme="snow"
                    modules={modules}
                  />
                </Style.MessageEdit>
              </Form.Item>
              <Form.Item >
                <Style.UploadFile>
                  <Upload
                    {...propsfile}
                    maxCount={5}
                  >
                    <Button icon={<UploadOutlined />} disabled={isdisabledupload}>
                      Upload File (Max:5)
                    </Button>
                    <Style.Waring>{t('newAddSubject.waring')}</Style.Waring>
                  </Upload>
                </Style.UploadFile>
              </Form.Item>
            </Form>
          </Style.FormStyle>
        </Spin>
      </Modal>
    </div>
  )
}

export default withRouter(NewAddSubject)