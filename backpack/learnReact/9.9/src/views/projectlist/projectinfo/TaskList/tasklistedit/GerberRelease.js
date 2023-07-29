import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';
import * as Style from '../../../ProjectListStyle';
import { reviseConfirmInfo, revise, inherit } from '@/api/index';

const { TextArea } = Input;

export default function GerberRelease ({
  isModalVisible,
  onClick,
  gerberIdTypeVersion,
  updatelistclick,
  taskId,
}) {
  const [formReform] = Form.useForm();
  const [reviseInfo, setReviseInfo] = useState({});
  const [attachCommonInfoList, setAttachCommonInfoList] = useState([]);
  useEffect(() => {
    if (gerberIdTypeVersion.type !== undefined) {
      reviseConfirmInfo({
        taskType: (gerberIdTypeVersion.type === 'reformTask' || gerberIdTypeVersion.type === 'inheritTask') ? 3 : 2,
        taskId: (gerberIdTypeVersion.type === 'reformTask' || gerberIdTypeVersion.type === 'inheritTask') ? taskId : '',
        attachId: (gerberIdTypeVersion.type === 'reform' || gerberIdTypeVersion.type === 'inherit') ? gerberIdTypeVersion.id : ''
      }).then((res) => {
        setReviseInfo(res.data.data);
        setAttachCommonInfoList(res.data.data.attachCommonInfoList);
      });
    }
  }, [gerberIdTypeVersion.type, taskId, gerberIdTypeVersion.id]);

  const { t } = useTranslation();

  //取消按钮
  const onCancelClick = () => {
    onClick();
    formReform.resetFields();
  };

  const handleReformSubmit = () => {
    formReform.validateFields().then((values) => {
      if (gerberIdTypeVersion.type === 'reform' || gerberIdTypeVersion.type === 'reformTask') {
        revise({
          "taskType": gerberIdTypeVersion.type === 'reform' ? 2 : 3,
          "taskId": gerberIdTypeVersion.type === 'reformTask' ? taskId : null,
          "attachId": gerberIdTypeVersion.type === 'reform' ? gerberIdTypeVersion.id : null,
          "reviseReason": values.reformReason
        }).then(res => {
          if (res.data.code === 200) {
            message.success(t('GerberRelease.redosuccess'))
            onClick();
            updatelistclick()
            formReform.resetFields()
          } else {
            message.error(t('GerberRelease.redofail'))
            updatelistclick()
            onClick();
            formReform.resetFields()
          }
        }).catch(err => {
          message.error(err.data.message)
          formReform.resetFields()
          onClick();
        })
      } else if (gerberIdTypeVersion.type === 'inherit' || gerberIdTypeVersion.type === 'inheritTask') {
        inherit({
          "taskType": gerberIdTypeVersion.type === 'inherit' ? 2 : 3,
          "taskId": gerberIdTypeVersion.type === 'inheritTask' ? taskId : null,
          "attachId": gerberIdTypeVersion.type === 'inherit' ? gerberIdTypeVersion.id : null
        }).then(res => {
          if (res.data.code === 200) {
            message.success(t('GerberRelease.inheritsuccess'))
            formReform.resetFields()
            updatelistclick()
            onClick();
          } else {
            message.error(t('GerberRelease.inheritfail'))
            formReform.resetFields()
            updatelistclick()
            onClick();
          }
        }).catch(err => {
          message.error(err.data.message)
          formReform.resetFields()
          onClick();
        })
      }

    });
  };
  return (
    <div>
      <Modal
        forceRender
        title={(gerberIdTypeVersion.type === 'inherit' || gerberIdTypeVersion.type === 'inheritTask') ? t('GerberRelease.inheritModalTitle') : t('GerberRelease.redoModalTitle')}
        visible={isModalVisible}
        okText="Submit"
        centered={true}
        onCancel={onCancelClick}
        onOk={handleReformSubmit}
        bodyStyle={{ padding: '16px' }}
      >
        <Style.GerberReasonTitle fontsize="16px" bottom="16px" style={{ height: '25px' }}>
          {(gerberIdTypeVersion.type === 'inherit' || gerberIdTypeVersion.type === 'inheritTask') ? t('GerberRelease.inheritingContent') : t('GerberRelease.inputReason')}
        </Style.GerberReasonTitle>
        <Style.UploadTitle>{reviseInfo.route}</Style.UploadTitle>
        <Style.GerberReasonTitle fontsize="14px" bottom="12px">
          {reviseInfo.title}
        </Style.GerberReasonTitle>

        {attachCommonInfoList.map((item, index) => (
          <div key={index}>
            <Style.SkipFileName>{item.docName}</Style.SkipFileName>
            <Style.AuditUnit weight="400">V {item.version}</Style.AuditUnit>
          </div>
        ))}
        {(gerberIdTypeVersion.type === 'reformTask' || gerberIdTypeVersion.type === 'reform') &&
          <Form style={{ height: '60px', marginTop: '15px' }} form={formReform}>
            <Form.Item
              label={t('GerberRelease.redoReason')}
              name="reformReason"
              rules={[{ required: true, message: t('GerberRelease.rulesMessage') }]}
            >
              <TextArea placeholder={t('GerberRelease.rulesMessage')} />
            </Form.Item>
          </Form>
        }
      </Modal>
    </div>
  );
}
