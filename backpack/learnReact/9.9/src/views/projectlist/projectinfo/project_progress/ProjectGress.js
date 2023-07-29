import React, { useEffect } from 'react'
import * as Style from '../../ProjectListStyle'
import ProGressCompont from './ProGressCompont';
import { Observer } from 'mobx-react';
import store from '../../../../mobx/store';
import { developProgress, getSetUpParentPlanDateInfo, updateParentPlanDate } from '@/api/index'
import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import { connect } from 'react-redux'
import { EditOutlined } from '@ant-design/icons'
import { Modal, Form, Button, DatePicker, message, Input } from 'antd';
import useDatetimestamp from '@/hooks/datetimestamp';
import { useTranslation } from "react-i18next";
import { useUserStore } from '@/userstore/userStore'
import moment from 'moment';
const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';


function ProjectGress (props) {

  const { perms } = useUserStore()

  const [form] = Form.useForm();
  //日期时间戳
  const datetimeFormat = useDatetimestamp();

  const [dataProgress, setDataProgress] = useState([])

  const [isModalVisible, setIsModalVisible] = useState(false)

  // const [currentduedate, setCurrentduedate] = useState('');

  const [plandateinfo, setPlandateinfo] = useState([])

  //save按鈕是否禁用
  const [isAbledSave, setIsAbledSave] = useState(true)

  //原因輸入框的顯示
  const [isShowReason, setIsShowReason] = useState(false)

  //更新plan actual时间
  const [isupdatetime, setIsupdatetime] = useState(false)
  // const [reason, setReason] = useState('')
  const { t } = useTranslation();




  useEffect(() => {
    developProgress({
      plmCode: props.match.params.id
    }).then(res => {
      setDataProgress(res.data.data)
      store.getdataProgress(res.data.data)
    })
  }, [props.dataProgress, props.match.params.id, isupdatetime])


  useEffect(() => {
    getSetUpParentPlanDateInfo({
      plmCode: props.match.params.id
    }).then(res => {
      setPlandateinfo(res.data.data)
    })

  }, [props.match.params.id, isupdatetime])


  const handleplandata = () => {
    setIsModalVisible(!isModalVisible)
  }

  const onOkClick = () => {

    form.validateFields().then((values) => {
      let arrayid = Object.keys(values)
      let arraydate = []
      arrayid.forEach(item => {
        if (item !== 'reason') {
          const changedate = {
            id: item,
            planDate: values[item] === null ? 0 : (values[item] === undefined) ? -1 : parseInt(moment(values[item]).unix())
          }
          arraydate.push(changedate)
        }
      })
      updateParentPlanDate({
        parentPlanDateInfoList: arraydate,
        reason: values.reason
      }).then(res => {
        if (res.status === 200) {
          message.success(t('ProjectGress.updateSuccess'))
          setIsAbledSave(true)
          setIsModalVisible(!isModalVisible)
          setIsupdatetime(!isupdatetime)
          setIsShowReason(false)
        }
      })
    })

  }

  const onCancelClick = () => {
    setIsModalVisible(!isModalVisible)
    setIsShowReason(false)
    setIsAbledSave(true)
  }

  const onChangeDueDate = (date, dateString) => {
    form.validateFields().then(values => {
      let flag = true
      Object.keys(values).forEach(item => {
        if (values[item] === null) {

          flag = false
        }

      })
      if (flag === true) {
        if (date._i !== undefined) {
          if (dateString !== date?._i) {
            setIsShowReason(true)
            setIsAbledSave(false)
            if (values.reason === undefined) {
              setIsAbledSave(true)
            }
          } else {
            setIsShowReason(false)
            setIsAbledSave(true)
          }
        } else {
          setIsAbledSave(false)
        }
      }

    })

  };
  const handlereason = (e) => {
    if (e.target.value !== '') {
      setIsAbledSave(false)
    } else {
      setIsAbledSave(true)
    }
  }
  useEffect(() => {
    form.resetFields();
  }, [form, isModalVisible]);
  return (
    <Observer>
      {
        () => {
          return <>
            <Style.ProgressTitle>
              {t('ProjectGress.progressTitle')}
              {
                <Button
                  style={{ padding: '0px ', marginRight: '16px' }}
                  type='text'
                  disabled={!(perms.includes('checklist:progress:edit') || perms.includes('*:*:*'))}
                >
                  <EditOutlined onClick={handleplandata} />
                </Button>
              }
            </Style.ProgressTitle>
            <Style.ProgressCircle>
              <Style.DateLable>
                <Style.DateLablecontent width={localStorage.getItem('language') === 'zh_TW' ? '90px' : '170px'}>{t('ProjectGress.finishDate')}</Style.DateLablecontent>
                <Style.DateLablecontent marginTop='8px' width={localStorage.getItem('language') === 'zh_TW' ? '90px' : '170px'}>{t('ProjectGress.finishDateAlready')}</Style.DateLablecontent>
              </Style.DateLable>
              {
                dataProgress.map((item, index) => <ProGressCompont key={item.name} percent={Math.round(item.finishedCount / item.taskCount * 100)} height={'100px'} top={'21px'} lable={{
                  title1: item.name, num: item.finishedCount + '/' + item.taskCount
                }} data={{ plan: item.planTime, actual: item.actualTime, planTimeDisplayStatus: item.planTimeDisplayStatus, actualTimeDisplayStatus: item.actualTimeDisplayStatus, reviseGerberStatus: item.reviseGerberStatus }} isshowcircleshadow={store.ShowCircleList[index + 1]}></ProGressCompont>)
              }
            </Style.ProgressCircle>
            <Modal
              forceRender
              title={t('ProjectGress.modalTitle')}
              visible={isModalVisible}
              onOk={onOkClick}
              onCancel={onCancelClick}
              centered={true}
              bodyStyle={{ padding: '16px' }}
              maskClosable={false}
              destroyOnClose={true}
              okText="submit"
              width='358px'
              footer={[
                // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
                <Button key="back" onClick={onCancelClick}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" disabled={isAbledSave} onClick={onOkClick}>
                  Save
                </Button>
              ]}
            >

              <Form labelAlign="left" labelCol={{ span: 12 }} form={form}
                validateTrigger='onSubmit'
              >
                {
                  plandateinfo.map(item =>
                    <Form.Item
                      label={item.name}
                      name={item.id}
                      key={item.id}
                      initialValue={item.planDate === 0 || item.planDate === null ? null : moment(datetimeFormat(item.planDate * 1000))}
                    >

                      <DatePicker
                        key={item.id}

                        format={dateFormat}
                        disabledDate={(current) => {
                          return current && current < moment().subtract(1, 'days');
                        }}
                        onChange={onChangeDueDate}
                        allowClear={false}
                      />
                    </Form.Item>
                  )
                }
                {
                  isShowReason && <Form.Item name='reason'>
                    <TextArea placeholder={t('ProjectGress.textAreaplaceholder')} onChange={handlereason}></TextArea>
                  </Form.Item>
                }
              </Form>
            </Modal>
          </>
        }
      }
    </Observer >
  )

}

const mapStateToProps = ({ DataProgress: { dataProgress } }) => ({
  dataProgress
})

export default connect(mapStateToProps)(withRouter(ProjectGress))
