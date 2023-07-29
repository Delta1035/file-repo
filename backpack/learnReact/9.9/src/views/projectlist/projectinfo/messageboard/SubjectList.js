import React from 'react'
import * as Style from './MessageBoardStyle'
import { Form, DatePicker, Input, Button, Table } from 'antd'
import { useTranslation } from "react-i18next";
import NewAddSubject from './NewAddSubject';
import { useState } from 'react';
import moment from 'moment'
import SubjectDiscussion from './SubjectDiscussion';
import { getSubjectList } from '@/api/index'
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import useMinutetimestamp from '@/hooks/minutetimestamp'
import { Observer } from 'mobx-react';
const { RangePicker } = DatePicker;
function SubjectList (props) {

  const minutetimestamp = useMinutetimestamp()
  const [formsearch] = Form.useForm();
  const [current, setCurrent] = useState(1)
  const [subjectDate, setSubjectData] = useState([])
  const [isupdatelist, setIsUpdateList] = useState(false)
  const [total, setTotal] = useState()
  const { t } = useTranslation();

  const onSearch = (values) => {
    getSubjectList({
      "query": {
        "subject": values?.keyword,
        "rfqCodeOrPlmForm": props.match.params.id,
        "rangeParams": {
          "startTime": values.date === undefined ? '' : parseInt(moment(values.date[0]).unix()),
          "endTime": values.date === undefined ? '' : parseInt(moment(values.date[1]).unix())
        }
      },
      "pagination": {
        "current": current,
        "pageSize": 10
      }
    }).then(res => {
      setSubjectData(res.data.data)
      setTotal(res.data.pagination.total)
    })
  }

  const handleClear = () => {
    formsearch.resetFields()
  }
  // 分页切换，
  const onPageChange = (current, size) => {
    setCurrent(current);
  };

  useEffect(() => {
    getSubjectList({
      "query": {
        "rfqCodeOrPlmForm": props.match.params.id,
      },
      "pagination": {
        "current": current,
        "pageSize": 10
      }
    }).then(res => {
      setSubjectData(res.data.data)
      setTotal(res.data.pagination.total)
    })
  }, [props.match.params.id, current, isupdatelist])

  const subjectcolums = [
    {
      title: t('subjectList.subject'),
      dataIndex: 'subject',

    },
    {
      title: t('subjectList.createBy'),
      dataIndex: 'createBy',
      align: 'center',
      width: 120
    },
    {
      title: t('subjectList.createTime'),
      dataIndex: 'createTime',
      align: 'center',
      width: 160,
      render: (text) => minutetimestamp(text * 1000)
    },
    {
      title: t('subjectList.lastUpdateTime'),
      dataIndex: 'lastUpdateTime',
      align: 'center',
      width: 160,
      render: (text) => minutetimestamp(text * 1000)
    }
  ]

  const [isvisibleadd, setIsVisibleAdd] = useState(false)
  const [isvisiblediscussion, setIsvisibleDiscussion] = useState(false)
  const [subjectId, setSubjectId] = useState('')

  const handleNewAdd = () => {
    setIsVisibleAdd(!isvisibleadd)
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
  return (
    <Observer>
      {
        () => {
          return <Style.Board >
            <Style.TitleFlex>
              <Style.BoardTitle>
                {t('subjectList.boardTitle')}<Style.ProjectType>{props.match.params.classification === '1' ? t('subjectList.rfqProject') : props.match.params.classification === '2' ? t('subjectList.rdProject') : t('subjectList.awardProject')}</Style.ProjectType>
              </Style.BoardTitle>
              <Style.AddButtton type='primary' onClick={handleNewAdd} data-testid='NewAddSubject'>
                {t('subjectList.addButtton')}
              </Style.AddButtton>
            </Style.TitleFlex>
            <Form
              data-testid='onSearch'
              onFinish={onSearch}
              form={formsearch}
              layout='inline'
            >
              <Form.Item name='date'>
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name='keyword'>
                <Input placeholder={t('subjectList.placeholder')}></Input>
              </Form.Item>
              <Form.Item
              >
                <Button htmlType="submit" style={{
                  background: "#333333",
                  color: "white",
                  borderRadius: "4px",
                  width: '100%'
                }}>
                  Search
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type='text' onClick={handleClear} data-testid='clear'>Clear</Button>
              </Form.Item>
            </Form>

            <Style.Total data-testid='total'>
              Total (Qty) : {total}
            </Style.Total>

            <Style.Table>
              <Table data-testid='showtable' columns={subjectcolums} size='small' dataSource={subjectDate} rowClassName={getRowClassName} rowKey={record => record.subjectId}
                pagination={{
                  position: ["bottomCenter"],
                  itemRender: itemRender,
                  size: 'default',
                  onChange: onPageChange,
                  total: total
                }}
                onRow={record => {
                  return {
                    onClick: (event) => {
                      setSubjectId(record.subjectId)
                      setIsvisibleDiscussion(true)
                    }
                  };
                }}
              />
            </Style.Table>
            {isvisibleadd && <NewAddSubject isvisibleadd={isvisibleadd} onClick={() => { setIsVisibleAdd(!isvisibleadd) }} onUpdate={() => { setIsUpdateList(!isupdatelist) }} />}
            {
              subjectId && <SubjectDiscussion onClickD={() => { setIsvisibleDiscussion(!isvisiblediscussion) }} isvisiblediscussion={isvisiblediscussion} subjectId={subjectId} id={props.match.params.id} classification={props.match.params.classification} />
            }
          </Style.Board>

        }
      }
    </Observer>

  )
}

export default withRouter(SubjectList)
