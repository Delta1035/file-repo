import React, { useState, useEffect } from 'react'
import * as Style from "./GuideLineStyle";
import moment from 'moment'
import { SettingOutlined, DeleteOutlined, EditOutlined, LinkOutlined } from '@ant-design/icons'
import { Form, Select, DatePicker, Input, Button, Row, Col, Table, Modal, Radio, message, Tooltip } from 'antd'
import { guidelineList, addGuideline, updateGuidelineList, deleteGuidelineList, getRole, setGuidelineAdmin, getAllUserEmail, addGuidelineAdminInfo } from '@/api'
import useDatetimestamp from '@/hooks/datetimestamp'
import { useTranslation } from 'react-i18next';

const { RangePicker } = DatePicker;
export default function GuideLine () {
  const [formadd] = Form.useForm();
  const [formdel] = Form.useForm();
  const [formsearch] = Form.useForm();
  const [formadmin] = Form.useForm();

  // 切换的当前分页的数据
  const [current, setCurrent] = useState(1);

  const [sorterfield, setSorterfield] = useState('')

  const [sorterorder, setSorterOrder] = useState('')

  const [guidelinelist, setGuideLineList] = useState([])

  const [total, setTotal] = useState()

  const [isupdatelist, setIsUpdateList] = useState(false)

  const datetimeFormat = useDatetimestamp()

  const [id, setId] = useState()

  const [currentlistinfo, setCurrentListInfo] = useState({})
  const [permissions, setPermissions] = useState([])

  const [functions, setFunctions] = useState([])

  const [defaultvalue, setDefaultValue] = useState('')

  const [defaultvalueAdmin, setDefaultValueAdmin] = useState()
  const [ismodaldelete, setIsModalDelete] = useState(false)
  const [ismodaladd, setIsModalAdd] = useState(false)
  const [radiovalue, setRadioValue] = useState(false)
  const [ismodalset, setIsModalSet] = useState(false)
  const [type, setType] = useState('')

  const [defaultguidename, setDefaultGuidename] = useState()
  const [defaultremark, setDfaultRemark] = useState()
  const [defaultlink, setDefaultLink] = useState('')
  const [allUserEmail, setAllUserEmail] = useState([])

  const { t } = useTranslation();

  useEffect(() => {
    getRole().then(res => {
      setPermissions(res.data.data.permissions)
      setFunctions(res.data.data.functions)
      setDefaultValue(res.data.data.functions[0].value)
      formsearch.setFieldsValue({
        user: res.data.data.functions[0].value
      })
      setUser(res.data.data.functions[0].value)
      guidelineList(
        {
          "query": {
            "department": res.data.data.functions[0].value
          },
          "sorter": [
            {
              "field": sorterfield,
              "order": sorterorder
            }
          ],
          "pagination": {
            "current": current,
            "pageSize": 10
          }
        }
      ).then(res => {
        setGuideLineList(res.data.data)
        setTotal(res.data.pagination.total)
      })
    })
  }, [])//eslint-disable-line
  useEffect(() => {
    getAllUserEmail().then(res => {
      setAllUserEmail(res.data.data)
    })
  }, [])

  useEffect(() => {

    if (user !== '') {
      guidelineList(
        {
          "query": {
            "department": user
          },
          "sorter": [
            {
              "field": sorterfield,
              "order": sorterorder
            }
          ],
          "pagination": {
            "current": current,
            "pageSize": 10
          }
        }
      ).then(res => {
        setGuideLineList(res.data.data)
        setTotal(res.data.pagination.total)
      })
    }

  }, [sorterfield, sorterorder, current, isupdatelist])//eslint-disable-line


  const handletablesort = (pagination, filters, sorter) => {


    if (sorter.order === "ascend") {
      setSorterOrder("asc");
      setSorterfield(sorter.field);
    } else if (sorter.order === "descend") {
      setSorterOrder("desc");
      setSorterfield(sorter.field);
    }
  }


  const guidelinecolumns = [
    {
      title: t('guideLine.number'),
      align: "center",
      render: (text, record, index) =>
        `${(current - 1) * 10 + (index + 1)}`,
      width: 70

    },
    {
      title: t('guideLine.guidelineName'),
      dataIndex: 'guidelineName',
      sorter: true,
      ellipsis: { showTitle: false },
      render: text => (
        <Tooltip overlayClassName={'newTooptip'} placement="topLeft" title={text}>
          {text}
        </Tooltip>
      )
    },
    {
      title: t('guideLine.effectivity'),
      align: 'center',
      dataIndex: 'effectivity',
      width: 100,
      sorter: true,
      render: (text) => {
        return text === 'Y' ? <Style.Effectivity >{text}</Style.Effectivity> : <Style.Effectivity2>{text}</Style.Effectivity2>
      }
    },
    {
      title: t('guideLine.department'),
      dataIndex: 'department',
      align: 'center',
      sorter: true,
      width: 130
    },
    {
      title: t('guideLine.remark'),
      dataIndex: 'remark',
      ellipsis: { showTitle: false },
      sorter: true,
      render: (text) => {
        return <Tooltip title={text} placement="topLeft" overlayStyle={{
          maxWidth: '500px',
        }}
          overlayClassName={'newTooptip'}>
          {text}
        </Tooltip>
      }
    },
    {
      title: t('guideLine.administrator'),
      dataIndex: 'administrator',
      sorter: true,
      width: 200,
    },
    {
      title: t('guideLine.lastEditTime'),
      dataIndex: 'lastEditTime',
      sorter: true,
      width: 150,
      render: (text) => {
        return text === null ? '-' : datetimeFormat(text * 1000)
      }
    },
    {
      dataIndex: 'delete',
      width: 50,
      render: (text, record) => (permissions.includes('guideline:list:delete') || permissions.includes('*:*:*')) && <Button style={{ padding: '0px ' }} type='text' ><Style.IconSpan onClick={() => { handleDelete(record) }}><DeleteOutlined /></Style.IconSpan></Button>
    },
    {
      dataIndex: 'modification',
      width: 50,
      render: (text, record) =>
        (permissions.includes('guideline:list:edit') || permissions.includes('*:*:*')) && <Button style={{ padding: '0px ' }} type='text'><Style.IconSpan disable={true} onClick={() => {
          handleAdd('compile', record)
        }}><EditOutlined /></Style.IconSpan></Button>

    },
    {
      dataIndex: 'link',
      width: 50,
      render: (link) =>
        <Style.IconSpan href={link} target='_blank'> <LinkOutlined /></Style.IconSpan>

    }
  ]

  const [user, setUser] = useState('')

  // 查詢按鈕
  const onFinish = (values) => {
    setUser(values.user)
    setUser(values.user)
    guidelineList({
      "query": {
        "department": values.user,
        "guidelineName": values.keyword,
        "rangeParams": {
          "lastEditStartTime": values.date === undefined ? '' : parseInt(moment(values.date[0]).unix()),
          "lastEditEndTime": values.date === undefined ? '' : parseInt(moment(values.date[1]).unix()), //开始时间

        }
      },
    }).then(res => {
      setGuideLineList(res.data.data)
      setTotal(res.data.pagination.total)
    })

  };

  const handleClear = () => {
    formsearch.resetFields()
  }

  const getRowClassName = (record, index) => {
    let className = '';
    className = index % 2 === 0 ? "evenRow" : "oddRow";
    return className;
  }
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Prev</a>;
    }

    if (type === "next") {
      return <a>Next</a>;
    }

    return originalElement;
  };

  // 分页切换，
  const onPageChange = (current, size) => {
    setCurrent(current);
  };

  // 新增确认窗口
  const handleOkCompile = () => {
    formadd.validateFields().then(values => {
      if (type === 'ADD') {
        addGuideline({
          "guidelineName": values.guidename,
          "effectivity": values.effectivity,
          'department': user,
          "link": values.link,
          "remark": values.remark,
        }).then(res => {
          if (res.data.code === 200) {
            message.success(t('guideLine.addSuccess'))
            setIsUpdateList(!isupdatelist)
            setIsModalAdd(false);
            formadd.resetFields()
          }
        })
      } else if (type === 'compile') {
        updateGuidelineList({
          'id': id,
          "guidelineName": values.guidename,
          "effectivity": values.effectivity,
          "link": values.link,
          "remark": values.remark,
        }).then(res => {
          message.success(t('guideLine.modifySuccess'))
          formadd.resetFields()
          setIsUpdateList(!isupdatelist)
          setIsModalAdd(false);
        })
      }
    })
  };
  // 删除确认按钮
  const handleOkDelete = () => {
    formdel.validateFields().then(values => {
      deleteGuidelineList({
        "guidelineListId": id,
        "reason": values.reason
      }).then(res => {
        if (res.data.code === 200) {
          message.success(t('guideLine.deleteSuccess'))
          formdel.resetFields()
          setIsUpdateList(!isupdatelist)
          setIsModalDelete(false);
        }
      })
    })

  }

  const handleCancelDelete = () => {
    setIsModalDelete(false);
  }
  const handleCancelCompile = () => {
    setIsModalAdd(false);
  }

  const onChangeRadio = (e) => {
    setRadioValue(e.target.value)

  };

  const handleDelete = (record) => {
    setIsModalDelete(true)
    setCurrentListInfo(record)
    setId(record.id)
  }


  const handleAdd = (type, record) => {
    setIsModalAdd(true)
    setType(type)
    if (type === 'compile') {
      setId(record.id)
      setDefaultGuidename(record.guidelineName)
      setDfaultRemark(record.remark)
      setDefaultLink(record.link)
      formadd.setFieldsValue({
        guidename: record.guidelineName,
        link: record.link,
        remark: record.remark,
        effectivity: record.effectivity
      })
    } else if (type === 'ADD') {
      formadd.setFieldsValue({
        guidename: '',
        link: 'https://',
        remark: '',
        effectivity: ''
      })
    }

  }

  const handleOkSet = () => {

    formadmin.validateFields().then(values => {
      setGuidelineAdmin({
        "department": values.user,
        "usernameList": values.admin
      }).then(res => {
        if (res.data.code === 200) {
          message.success(t('guideLine.addPermissionSuccess'))
          setIsModalSet(false)
          formadmin.resetFields()
        }
      })
    })
  }


  const handleCancelSet = () => {
    setIsModalSet(false)
    formadmin.resetFields()
  }

  //點開齒輪
  const handleSet = () => {

    addGuidelineAdminInfo({
      function: defaultvalue
    }).then(res => {
      setDefaultValueAdmin(res.data.data)
      formadmin.setFieldsValue({
        admin: res.data.data
      })
    })

    setIsModalSet(true)
  }

  // 切換function
  const handleSwitchFunction = (value) => {
    addGuidelineAdminInfo({
      function: value
    }).then(res => {
      setDefaultValueAdmin(res.data.data)
      formadmin.setFieldsValue({
        admin: res.data.data
      })
    })
  }
  return (
    <div style={{ margin: "24px 48px " }}>
      <Style.ProjectTitle>
        <div>{t('guideLine.title')} {(permissions.includes('guideline:list:settingAdmin') || permissions.includes('*:*:*')) && <Button style={{ padding: '0px', fontSize: '17px' }} type='text'><SettingOutlined onClick={handleSet} /></Button>} </div>

        {
          (permissions.includes('guideline:list:add') || permissions.includes('*:*:*')) && <Button type='primary' style={{ width: '150px' }} onClick={() => {
            handleAdd('ADD')
          }} >{t('guideLine.add')}</Button>
        }
      </Style.ProjectTitle >
      <Style.GuideLineFrom>
        <Form
          onFinish={onFinish}
          form={formsearch}
          initialValues={{ 'user': defaultvalue }}
        >
          <Row gutter={8}>
            <Col span={2}>
              <Form.Item name='user' >
                <Select options={functions} disabled={!(permissions.includes('guideline:list:functionCombobox') || permissions.includes('*:*:*'))}>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name='date'>
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name='keyword'>
                <Input placeholder={t('guideLine.inputKeyword')}></Input>
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item
              >
                <Button htmlType="submit" style={{
                  background: "#333333",
                  color: "white",
                  borderRadius: "4px",
                  width: '100%'
                }}>
                  {t('guideLine.search')}
                </Button>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item>
                <Button type='text' onClick={handleClear}>{t('guideLine.clear')}</Button>
              </Form.Item>
            </Col>
          </Row>

        </Form>
      </Style.GuideLineFrom>

      <Style.Table>
        <Table data-testid='showtable' columns={guidelinecolumns} dataSource={guidelinelist} onChange={handletablesort} rowClassName={getRowClassName}
          showSorterTooltip={false}
          rowKey={record => record.id}
          pagination={{
            position: ["bottomCenter"],
            itemRender: itemRender,
            onChange: onPageChange,
            total: total,
          }} />
      </Style.Table>
      <Modal title={t('guideLine.deleteModalTitle')} centered={true} visible={ismodaldelete} okText='Submit' onOk={handleOkDelete} onCancel={handleCancelDelete} width='700px' bodyStyle={{ padding: '16px' }}  >

        <Style.FormStyle>
          <Form labelAlign="left" labelCol={{ span: 6 }} form={formdel} validateTrigger='onSubmit' >
            <Form.Item label='Guideline Name'>
              {currentlistinfo.guidelineName}
            </Form.Item>
            <Form.Item label='Effectivity'>
              {currentlistinfo.effectivity}
            </Form.Item>
            <Form.Item label='Department'>
              {currentlistinfo.department}
            </Form.Item>
            <Form.Item label='Link'>
              {currentlistinfo.link}
            </Form.Item>
            <Form.Item name='reason' label='Delete Reason' rules={[{ required: true, message: t('guideLine.deleteReasonMessage'), }]}>
              <Input placeholder={t('guideLine.deleteReasonPlaceholder')} />
            </Form.Item>
          </Form>
        </Style.FormStyle>

      </Modal>
      <Modal title={t('guideLine.newAddModalTitle')} centered={true} visible={ismodaladd} okText='Save' onOk={handleOkCompile} onCancel={handleCancelCompile} width='700px' bodyStyle={{ padding: '16px' }}>
        <Style.FormStyle>
          <Form labelAlign="left" labelCol={{ span: 6 }} form={formadd} validateTrigger='onSubmit' initialValues={{ 'guidename': defaultguidename, 'link': defaultlink, 'remark': defaultremark, 'effectivity': 'Y' }}>
            <Form.Item label='Guideline Name' name='guidename' rules={[{ required: true, message: t('guideLine.guideLineNameMessage'), }]}>
              <Input />
            </Form.Item>
            <Form.Item label='Effectivity' name='effectivity' rules={[{ required: true, message: t('guideLine.effectivityMessage'), }]}>
              <Radio.Group onChange={onChangeRadio} value={radiovalue} name='effectivity'>
                <Radio value='Y'>{t('guideLine.effectivityValueY')}</Radio>
                <Radio value='N'>{t('guideLine.effectivityValueN')}</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label='Department' >
              {user}
            </Form.Item>
            <Form.Item label='Link' name='link' rules={[{ required: true, message: t('guideLine.linkMessage'), }, { type: 'url', message: t('guideLine.urlMessage') }]} >
              <Input />
            </Form.Item >
            <Form.Item label='Remark' name='remark' rules={[{ required: true, message: t('guideLine.remarkMessage'), }]} >
              <Input />
            </Form.Item>
          </Form >
        </Style.FormStyle >
      </Modal >

      <Modal title={t('guideLine.settingModalTitle')} centered={true} visible={ismodalset} okText='Save' onOk={handleOkSet} onCancel={handleCancelSet} width='700px' bodyStyle={{ padding: '16px' }} >
        <Style.FormStyle >
          <Form labelAlign="left" labelCol={{ span: 6 }} initialValues={{ 'user': defaultvalue, 'admin': defaultvalueAdmin }} form={formadmin} validateTrigger='onSubmit'>
            <Form.Item label='Department' name='user'>
              <Select style={{ width: '120px' }} options={functions} onChange={handleSwitchFunction}>
              </Select>
            </Form.Item>
            <Form.Item label='Supervisor' name='admin' rules={[{ required: true, message: t('guideLine.settingMessage'), }]}>
              <Select mode="tags" placeholder={t('guideLine.settingPlaceholder')} options={allUserEmail}>
              </Select>
            </Form.Item>
          </Form >
        </Style.FormStyle >
      </Modal >
    </div >
  )
}
