import React, { useEffect } from 'react';
import { Button, Modal, Form, Tag, Radio, Select, Input, DatePicker, Space, message } from 'antd';
import * as Style from '../../../ProjectListStyle';
import { useState } from 'react';
import Icon from '../../../../../icon/Icon';
import { dueDateInfo, updateDueDateInfo } from '@/api/index';
import useDatetimestamp from '@/hooks/datetimestamp';
import { useTranslation } from "react-i18next";
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

export default function DueDate ({ useroptions, isModalVisible, onClick, duedateinfo, updatelistclick }) {

  const [form] = Form.useForm();
  //日期时间戳
  const datetimeFormat = useDatetimestamp();

  const [isAbledSubmit, setIsAbledSubmit] = useState(true);

  //日期选择是否禁用
  const [isduedatedisabled, setIsduedatedisabled] = useState(false);

  const [value, setValue] = useState(false);

  const [currentduedate, setCurrentduedate] = useState('');

  //duedate不設定
  const [dueDateDontSet, setDueDateDontSet] = useState(false)

  const { t } = useTranslation();

  //duedate修改value
  const [dueDateModify, setDueDateModify] = useState(false)
  //duedate 信息
  const [isDueDateInfo, setIsDueDateInfo] = useState({});

  const [defaultarryuser, setDefaultArryUser] = useState([])

  useEffect(() => {
    let toarry = [];
    if (duedateinfo?.id !== undefined) {
      dueDateInfo({
        attachId: duedateinfo.id,
      }).then((res) => {
        setIsDueDateInfo(res.data.data);
        setCurrentduedate(datetimeFormat(res.data.data.attachmentDueDateInfo.dueDate * 1000));
        // setCurrentduedate(res.data.data.attachmentDueDateInfo.dueDate)
        setDueDateModify(res.data.data.attachmentDueDateInfo.dueDate !== null && res.data.data.attachmentDueDateInfo.dueDate !== 0)
        setDueDateDontSet(false)
        setIsduedatedisabled(false)
        setIsAbledSubmit(true)
        if (res.data.data.attachmentDueDateInfo.toOrFrom === '') {
          setDefaultArryUser(toarry)
        } else {
          toarry = res.data.data.attachmentDueDateInfo.toOrFrom.split(',')
          setDefaultArryUser(toarry)
          form.setFieldsValue({
            notify: toarry,
            Radio: false
          })
        }


      });
    }

  }, [duedateinfo?.id]);//eslint-disable-line
  // submit回调
  const onOkClick = async () => {

    form.validateFields().then((values) => {
      updateDueDateInfo({
        "attachId": duedateinfo.id,
        "dueDate": isduedatedisabled ? 0 : Date.parse(new Date(currentduedate)) / 1000,
        "reason": values.reason === undefined ? '初次設定' : values.reason,
        "notifyList": values.notify
      }).then(res => {
        message.success(t('DueDate.updateSuccess'))
        updatelistclick()
        form.resetFields()
        onClick();
      })
        .catch(res => {
          message.success(t('DueDate.uploadFail'))
        })
    });
  };

  //取消按钮
  const onCancelClick = () => {
    form.resetFields(['StartTripTime']);
    form.resetFields()
    onClick();
  };

  const onChange = (e) => {
    setIsduedatedisabled(e.target.value);
    setValue(e.target.value);
    setIsAbledSubmit(!e.target.value);
    setDueDateDontSet(e.target.value)
    if (isDueDateInfo.attachmentDueDateInfo.dueDate !== null && isDueDateInfo.attachmentDueDateInfo.dueDate !== 0) {
      setDueDateModify(!e.target.value)

    }

  };

  const onChangeDueDate = (value, mode) => {
    setCurrentduedate(mode);
    setIsAbledSubmit(false);
  };

  const tagRender = (props) => {
    const { label, closable, onClose } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        color="#486ADF"
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
      forceRender
      title="Due Date Setting"
      visible={isModalVisible}
      onOk={onOkClick}
      onCancel={onCancelClick}
      centered={true}
      bodyStyle={{ padding: '16px' }}
      maskClosable={false}
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
        </Button>,
      ]}
    >
      <Style.UploadTitle>{isDueDateInfo.route} </Style.UploadTitle>
      <Style.TaskListEditTitle color="#333333" fontsize="14px">
        {isDueDateInfo.title}
      </Style.TaskListEditTitle>
      <Style.FormStyle>
        <Form data-testid='uploadform' labelAlign="left" labelCol={{ span: 6 }} form={form} initialValues={{ 'notify': defaultarryuser, 'Radio': false }} >
          <Form.Item label="File Name">
            <Style.TaskListEditTitle fontsize="14px">
              {isDueDateInfo.attachmentDueDateInfo?.docName}
            </Style.TaskListEditTitle>
          </Form.Item>
          <Form.Item label="to">
            <Style.TaskListEditTitle fontsize="14px">
              {isDueDateInfo.attachmentDueDateInfo?.toOrFrom}
            </Style.TaskListEditTitle>
          </Form.Item>
          <Form.Item label={t('DueDate.dueDateSetting')} name='Radio'>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={false}>Y</Radio>
              <Radio value={true}>N</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            style={{ height: '50px' }}
            label={
              <>
                Due Date
                <Icon.Time style={{ marginLeft: '7.5px' }} />
              </>
            }
            name='reason'
            rules={[
              {
                required: (dueDateDontSet || dueDateModify),
                message: 'Please input your reason!',
              },
            ]}
          >
            <Space>
              {currentduedate === '1970-01-01' ? (
                <DatePicker
                  format={dateFormat}
                  disabled={isduedatedisabled}
                  disabledDate={(current) => {
                    return current && current < moment().subtract(1, 'days');
                  }}
                  onChange={onChangeDueDate}
                />
              ) : (
                <DatePicker
                  value={moment(currentduedate, dateFormat)}
                  format={dateFormat}
                  disabled={isduedatedisabled}
                  disabledDate={(current) => {
                    return current && current < moment().subtract(1, 'days');
                  }}
                  onChange={onChangeDueDate}
                  allowClear={false}
                />
              )}
              {dueDateDontSet && <Input placeholder={t('DueDate.dueDateDontSetPlaceholder')}></Input>}
              {dueDateModify && <Input placeholder={t('DueDate.dueDateModifyPlaceholder')}></Input>}
            </Space>
          </Form.Item>
          <Form.Item label="Notify Loop" name='notify'>
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              style={{
                width: '100%',
              }}
              options={useroptions}
            />
          </Form.Item>
        </Form>
      </Style.FormStyle>
    </Modal>
  );
}
