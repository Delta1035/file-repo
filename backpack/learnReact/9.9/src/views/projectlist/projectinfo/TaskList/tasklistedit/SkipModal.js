import React, { useState, useEffect } from 'react'
import * as Style from '../../../ProjectListStyle';
import { Modal, Button, Form, Input, Select, Tag, Radio, Space, message } from 'antd'
import useMinutetimestamp from '@/hooks/minutetimestamp'
import { skipApplyInfo, skipApply, skipRecoverInfo, skipRecallInfo, skipRecall, skipAuditInfo, skipAudit, skipRecover, taskSkipApplyInfo, taskSkipApply, taskSkipRecoverInfo, taskSkipRecallInfo, taskSkipRecover, taskSkipRecall } from '@/api/index';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;


export default function SkipModal ({ useroptions, isModalVisible, onClick, skipIdTypeVersion, updatelistclick, plmForm }) {

  const minutetimestamp = useMinutetimestamp();

  const [formSkip] = Form.useForm();

  const [isAbledSubmit, setIsAbledSubmit] = useState(false);

  const [defaultarryuser, setDefaultArryUser] = useState([])


  const [skipResultValue, setSkipResultValue] = useState(true)

  const [skipApplyData, setSkipApplyData,] = useState({})

  const [attachSkipApplyData, setAttachSkipApplyData] = useState([])

  const [attachSkipApplyListInfo, setAttachSkipApplyListInfo] = useState([])

  const [checkReason, setCheckReason] = useState('');

  const {t} = useTranslation();

  useEffect(() => {
    if (skipIdTypeVersion.type === 'skip') {
      skipApplyInfo({
        attachId: skipIdTypeVersion.id
      }).then(res => {
        if (res.data.code === 200) {
          setSkipApplyData(res.data.data)
          setAttachSkipApplyData(res.data.data.attachSkipApplyInfo)
          setDefaultArryUser(res.data.data.notifyLoop)
          formSkip.setFieldsValue({
            notify: res.data.data.notifyLoop
          })
        } else {
          onClick()
          updatelistclick()
        }
      }).catch(err => {
        onClick()
        updatelistclick()
      })
    } else if (skipIdTypeVersion.type === 'recoverSkip') {
      skipRecoverInfo({
        attachId: skipIdTypeVersion.id
      }).then(res => {
        if (res.data.code === 200) {
          setSkipApplyData(res.data.data)
          setAttachSkipApplyData(res.data.data.attachSkipRecoverInfo)
          setDefaultArryUser(res.data.data.notifyLoop)
          formSkip.setFieldsValue({
            notify: res.data.data.notifyLoop
          })
        } else {
          onClick()
          updatelistclick()
        }
      }).catch(err => {
        onClick()
        updatelistclick()
      })
    } else if (skipIdTypeVersion.type === 'recall') {
      skipRecallInfo({
        attachId: skipIdTypeVersion.id
      }).then(res => {
        if (res.data.code === 200) {
          setSkipApplyData(res.data.data)
          setAttachSkipApplyData(res.data.data.attachSkipRecallInfo)
          setDefaultArryUser(res.data.data.notifyLoop)
          formSkip.setFieldsValue({
            notify: res.data.data.notifyLoop
          })
        } else {
          onClick()
          updatelistclick()

        }
      }).catch(err => {
        onClick()
        updatelistclick()

      })
    } else if (skipIdTypeVersion.type === 'check') {
      skipAuditInfo({
        attachId: skipIdTypeVersion.id
      }).then(res => {
        if (res.data.code === 200) {
          setSkipApplyData(res.data.data)
          setAttachSkipApplyData(res.data.data.attachSkipAuditInfo)
        } else {
          onClick()
          updatelistclick()
        }
      }).catch(err => {
        onClick()
        updatelistclick()
      })
    } else if (skipIdTypeVersion.type === 'skiptask') {
      taskSkipApplyInfo({
        taskTemplateId: skipIdTypeVersion.id,
        plmForm: skipIdTypeVersion.oddId
      }).then(res => {
        setSkipApplyData(res.data.data)
        setAttachSkipApplyListInfo(res.data.data.attachSkipApplyListInfo)
        setDefaultArryUser(res.data.data.notifyLoop)
        formSkip.setFieldsValue({
          notify: res.data.data.notifyLoop
        })
      })
    } else if (skipIdTypeVersion.type === 'recoverSkipTask') {
      taskSkipRecoverInfo({
        taskTemplateId: skipIdTypeVersion.id,
        plmForm: skipIdTypeVersion.oddId
      }).then(res => {
        setSkipApplyData(res.data.data)
        setAttachSkipApplyListInfo(res.data.data.attachSkipRecoverListInfo)
        setDefaultArryUser(res.data.data.notifyLoop)
        formSkip.setFieldsValue({
          notify: res.data.data.notifyLoop
        })
      })
    } else if (skipIdTypeVersion.type === 'recallSkipTask') {
      taskSkipRecallInfo({
        taskTemplateId: skipIdTypeVersion.id,
        plmForm: skipIdTypeVersion.oddId
      }).then(res => {
        setSkipApplyData(res.data.data)
        setAttachSkipApplyListInfo(res.data.data.attachSkipRecallListInfo)
        setDefaultArryUser(res.data.data.notifyLoop)
        formSkip.setFieldsValue({
          notify: res.data.data.notifyLoop
        })
      })
    }
  }, [skipIdTypeVersion.id])//eslint-disable-line



  // submit回调
  const onOkClick = async () => {
    setSkipResultValue(true)
    setIsAbledSubmit(false)
    formSkip.validateFields().then(values => {
      if ((skipIdTypeVersion.skip === 0 || skipIdTypeVersion.skip === 3) && skipIdTypeVersion.type === 'skip') {
        skipApply({
          taskType: 2,
          plmForm: plmForm,
          attachId: skipIdTypeVersion.id,
          attachVersion: skipIdTypeVersion.version,
          skipReason: values.reason,
          notifyLoop: values.notify
        }).then(res => {
          if (res.data.code === 200) {
            message.success(t('SkipModal.applySkipSuccess'))
            onClick()
            formSkip.resetFields()
            updatelistclick()
          } else {
            message.error(t('SkipModal.applySkipFail'))
            onClick()
            formSkip.resetFields()
            updatelistclick()
          }
        })
          .catch(err => {
            message.error(err.data.message)
            onClick()
            formSkip.resetFields()
            updatelistclick()
          })
      } else if ((skipIdTypeVersion.skip === 1 || skipIdTypeVersion.skip === 4 || skipIdTypeVersion.skip === 3 || skipIdTypeVersion.skip === 5) && skipIdTypeVersion.type === 'recall') {
        skipRecall({
          plmForm: plmForm,
          taskType: 2,
          attachId: skipIdTypeVersion.id,
          skip: skipIdTypeVersion.skip,
          skipRecallReason: values.reason,
          notifyLoop: values.notify
        }).then(res => {
          if (res.data.code === 200) {
            message.success(t('SkipModal.withdrawSkipSuccess'))
            onClick()
            formSkip.resetFields()
            updatelistclick()
          } else {
            message.error(t('SkipModal.withdrawSkipFail'))
            onClick()
            formSkip.resetFields()
            updatelistclick()
          }
        }).catch(err => {
          message.error(t('SkipModal.withdrawSkipFail'))
          onClick()
          formSkip.resetFields()
          updatelistclick()
        })
      } else {
        if ((skipIdTypeVersion.skip === 1 || skipIdTypeVersion.skip === 4) && skipIdTypeVersion.type === 'check') {
          skipAudit({
            attachId: skipIdTypeVersion.id,
            skip: skipIdTypeVersion.skip,
            skipAuditReason: checkReason,
            auditStatus: skipResultValue === true ? 1 : 2,
            notifyLoop: values.notify
          }).then(res => {
            if (res.data.code === 200) {
              message.success(t('SkipModal.checkSkipSuccess'))
              onClick()
              formSkip.resetFields()
              updatelistclick()
            } else {
              message.error(t('SkipModal.checkSkipFail'))
              onClick()
              formSkip.resetFields()
              updatelistclick()
            }
          }).catch(err => {
            message.error(t('SkipModal.checkSkipFail'))
            onClick()
            formSkip.resetFields()
            updatelistclick()
          })
        } else if ((skipIdTypeVersion.skip === 2 || skipIdTypeVersion.skip === 5) && skipIdTypeVersion.type === 'recoverSkip') {
          skipRecover({
            plmForm: plmForm,
            taskType: 2,
            attachId: skipIdTypeVersion.id,
            skipRecoverReason: values.reason,
            notifyLoop: values.notify
          }).then(res => {
            if (res.data.code === 200) {
              message.success(t('SkipModal.recoverSkipSuccess'))
              onClick()
              formSkip.resetFields()
              updatelistclick()
            } else {
              message.error(t('SkipModal.recoverSkipFail'))
              onClick()
              formSkip.resetFields()
              updatelistclick()
            }
          }).catch(err => {
            message.error(t('SkipModal.recoverSkipFail'))
            onClick()
            formSkip.resetFields()
            updatelistclick()
          })
        } else if (skipIdTypeVersion.type === 'skiptask') {
          taskSkipApply({
            taskType: (skipIdTypeVersion.attachType === 'input' || skipIdTypeVersion.attachType === 'no') ? 1 : 3,
            taskTemplateId: skipIdTypeVersion.id,
            plmForm: skipIdTypeVersion.oddId,
            skipReason: values.reason,
            notifyLoop: values.notify
          }).then(res => {
            if (res.data.code === 200) {
              message.success(t('SkipModal.applyTaskSkipSuccess'))
              onClick()
              formSkip.resetFields()
              updatelistclick()
            } else {
              message.error(t('SkipModal.applyTaskSkipFail'))
              onClick()
              formSkip.resetFields()
              updatelistclick()
            }
          }).catch(err => {
            message.error(t('SkipModal.applyTaskSkipFail'))
            onClick()
            formSkip.resetFields()
            updatelistclick()
          })
        } else if (skipIdTypeVersion.type === 'recoverSkipTask') {
          taskSkipRecover({
            taskType: (skipIdTypeVersion.attachType === 'input' || skipIdTypeVersion.attachType === 'no') ? 1 : 3,
            taskTemplateId: skipIdTypeVersion.id,
            plmForm: skipIdTypeVersion.oddId,
            skipRecoverReason: values.reason,
            notifyLoop: values.notify
          }).then(res => {
            if (res.data.code === 200) {
              message.success(t('SkipModal.recoverSkipTaskSuccess'))
              onClick()
              formSkip.resetFields()
              updatelistclick()
            } else {
              message.error(t('SkipModal.recoverSkipTaskFail'))
              onClick()
              formSkip.resetFields()
              updatelistclick()
            }
          }).catch(err => {
            message.error(t('SkipModal.recoverSkipTaskFail'))
            onClick()
            formSkip.resetFields()
            updatelistclick()
          })
        } else if (skipIdTypeVersion.type === 'recallSkipTask') {
          taskSkipRecall({
            taskType: (skipIdTypeVersion.attachType === 'input' || skipIdTypeVersion.attachType === 'no') ? 1 : 3,
            taskTemplateId: skipIdTypeVersion.id,
            plmForm: skipIdTypeVersion.oddId,
            skipRecallReason: values.reason,
            notifyLoop: values.notify
          }).then(res => {
            if (res.data.code === 200) {
              message.success(t('SkipModal.withdrawSkipSuccess'))
              onClick()
              formSkip.resetFields()
              updatelistclick()
            } else {
              message.error(t('SkipModal.withdrawSkipFail'))
              onClick()
              formSkip.resetFields()
              updatelistclick()
            }
          }).catch(err => {
            message.error(t('SkipModal.withdrawSkipFail'))
            onClick()
            formSkip.resetFields()
            updatelistclick()
          })
        }

      }
    })
  };

  const handleDelete = (value) => {
    if (defaultarryuser?.includes(value)) {
      formSkip.setFieldsValue({
        notify: value
      })
    }
  }

  //取消按钮
  const onCancelClick = () => {
    setIsAbledSubmit(false)
    onClick();
    formSkip.resetFields()
    setSkipResultValue(true)
  };
  const onCheckResult = (e) => {
    setSkipResultValue(e.target.value)
    setIsAbledSubmit(!e.target.value)
  };

  const handleReason = (e) => {
    if (e.target.value) {
      setIsAbledSubmit(false)
      setCheckReason(e.target.value)
    } else (
      setIsAbledSubmit(true)
    )
  }
  const tagRender = (props) => {
    const { label, value, onClose } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        color={defaultarryuser?.includes(value) ? '#486ADF' : ''}
        onMouseDown={onPreventMouseDown}
        closable={defaultarryuser?.includes(value) ? false : true}
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
      <Modal
        title={skipIdTypeVersion.type === 'skip' ? t('SkipModal.modalTitleSkipDoc') : skipIdTypeVersion.type === 'recoverSkip' ? t('SkipModal.modalTitleRecoverSkip') : skipIdTypeVersion.type === 'recall' ? t('SkipModal.modalTitleWithdraw') : skipIdTypeVersion.type === 'skiptask' ? t('SkipModal.modalTitleSkipTask') : skipIdTypeVersion.type === 'recoverSkipTask' ? t('SkipModal.modalTitleRecoverSkipTask') : skipIdTypeVersion.type === 'check' ? t('SkipModal.modalTitleCheck') : t('SkipModal.modalTitleWithdraw')}
        visible={isModalVisible}
        centered={true}
        bodyStyle={{ padding: '16px' }}
        maskClosable={false}
        onCancel={onCancelClick}
        okText="submit"
        width="700px"
        destroyOnClose={true}
        footer={[
          // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
          <Button key="back" onClick={onCancelClick}>
            Cancel
          </Button>,
          <Button key="submit" disabled={isAbledSubmit} type="primary" onClick={onOkClick}>
            Submit
          </Button>
        ]}
      >
        <Style.UploadTitle>{skipApplyData.route}</Style.UploadTitle>
        <Style.TaskListEditTitle color="#333333" fontsize="14px">
          {skipApplyData.title}
        </Style.TaskListEditTitle>
        <Style.FormStyle>
          <Form data-testid='uploadform' labelAlign="left" labelCol={{ span: 5 }} form={formSkip} initialValues={{ 'notify': defaultarryuser }} >
            {(skipIdTypeVersion.type !== 'skiptask' && skipIdTypeVersion.type !== 'recoverSkipTask' && skipIdTypeVersion.type !== 'recallSkipTask') && <Form.Item label="File Name">
              <Style.TaskListEditTitle fontsize="14px">
                {attachSkipApplyData.docName}
              </Style.TaskListEditTitle>
            </Form.Item>}
            {!(skipIdTypeVersion.type === 'check' || skipIdTypeVersion.type === 'recall' || skipIdTypeVersion.type === 'skiptask' || skipIdTypeVersion.type === 'recoverSkipTask' || skipIdTypeVersion.type === 'recallSkipTask') && <Form.Item label={t('SkipModal.check')}>
              <Style.TaskListEditTitle fontsize="14px">
                {attachSkipApplyData.auditFunction}
              </Style.TaskListEditTitle>
            </Form.Item>}
            {
              skipIdTypeVersion.type === 'check' && <Form.Item label={t('SkipModal.applyCheck')}>
                <Style.TaskListEditTitle fontsize="14px">
                  {attachSkipApplyData.function}
                </Style.TaskListEditTitle>
              </Form.Item>
            }
            {
              skipIdTypeVersion.type === 'check' && <Form.Item label={t('SkipModal.time')}>
                <Style.TaskListEditTitle fontsize="14px">
                  {minutetimestamp(attachSkipApplyData.time * 1000)}
                </Style.TaskListEditTitle>
              </Form.Item>
            }

            {
              skipIdTypeVersion.type === 'check' && <Form.Item label={t('SkipModal.skip')}>
                <Style.TaskListEditTitle fontsize="14px">
                  {attachSkipApplyData.reason}
                </Style.TaskListEditTitle>
              </Form.Item>
            }
            {
              skipIdTypeVersion.type === 'check' && <Form.Item label={t('SkipModal.result')}>
                <Space>
                  <Radio.Group onChange={onCheckResult} defaultValue={true}>
                    <Radio value={true}>Approve</Radio>
                    <Radio value={false}>Reject</Radio>
                  </Radio.Group>
                  {
                    !skipResultValue && <Input onChange={handleReason} placeholder={t('SkipModal.inputReason')} style={{ width: '300px' }} />
                  }
                </Space>
              </Form.Item>
            }

            {
              (skipIdTypeVersion.type === 'skiptask' || skipIdTypeVersion.type === 'recoverSkipTask' || skipIdTypeVersion.type === 'recallSkipTask') && attachSkipApplyListInfo !== null &&
              <Form.Item style={{ marginTop: '7px' }}>
                {
                  attachSkipApplyListInfo?.map(item =>
                    <div key={item.attachId}>
                      <Style.SkipFileName>{item.docName}</Style.SkipFileName>{t('SkipModal.check:')}<Style.AuditUnit weight='700'>{item.auditFunction}</Style.AuditUnit>
                    </div>
                  )
                }

              </Form.Item>
            }

            {skipIdTypeVersion.type !== 'check' &&
              <Form.Item
                label={(skipIdTypeVersion.type === 'skip') ? t('SkipModal.skip') : (skipIdTypeVersion.type === 'recall' ? t('SkipModal.withdrawReason') : (skipIdTypeVersion.type === 'recoverSkip' ? t('SkipModal.recoverSkipReason') : skipIdTypeVersion.type === 'skiptask' ? t('SkipModal.skipTaskReason') : skipIdTypeVersion.type === 'recoverSkipTask' ? t('SkipModal.recoverSkipTaskReason') : t('SkipModal.withdrawReason')))}
                name='reason'
                rules={[
                  {
                    required: true,
                    message: 'Please input your reason!',
                  },
                ]}
              >
                <TextArea placeholder={(skipIdTypeVersion.type === 'skip' || skipIdTypeVersion.type === 'skiptask') ? t('SkipModal.inputSkip') : (skipIdTypeVersion.type === 'recall' ? t('SkipModal.inputWithdraw') : (skipIdTypeVersion.type === 'recoverSkip' ? t('SkipModal.inputRecoverSkip') : skipIdTypeVersion.type === 'recoverSkipTask' ? t('SkipModal.inputRecoverSkipTask') : t('SkipModal.inputWithdraw')))}></TextArea>
              </Form.Item>}
            {skipIdTypeVersion.type !== 'check' && <Form.Item label="Notify Loop" name='notify'>
              <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                onDeselect={handleDelete}
                style={{
                  width: '100%',
                }}
                options={useroptions.filter(item => !defaultarryuser.includes(item.value))}
              />
            </Form.Item>}
          </Form>
        </Style.FormStyle>
      </Modal>
    </div>
  )
}
