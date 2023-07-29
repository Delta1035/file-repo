import React from 'react'
import { Table, Tooltip } from 'antd';
import * as Style from '../../ProjectListStyle'
import Icon from '@/icon/Icon';
import { useAppContext } from '@/createContext/createContext';
import useDatetimestamp from '@/hooks/datetimestamp'
import { useTranslation } from "react-i18next";
import store from '@/mobx/store';
import { withRouter } from 'react-router-dom';
import moment from 'moment'

function TaskTable (props) {

  const { onClick } = props

  const datetimeFormat = useDatetimestamp()

  const { datetasklist } = useAppContext()

  const { t } = useTranslation();

  const columns = [
    {
      title: 'No',
      dataIndex: 'taskNo',
      align: 'center',
      width: 60
    },
    {
      title: t('TaskTable.value'),
      dataIndex: 'value',
      render: name => (
        <Tooltip overlayClassName={'newTooptip'} placement="topLeft" title={name}>
          <Style.TextHide>{name}</Style.TextHide>
        </Tooltip>
      )
    },
    {
      title: t('TaskTable.status'),
      dataIndex: 'status',
      width: 100,
      align: 'center',
      render: (title, record) => {
        return record.status === 0 ? <Style.ButtonWait width={localStorage.getItem('language') === 'zh_TW' ? '60px' : '90px'} >{t('TaskTable.waitToDo')}</Style.ButtonWait> : (record.status === 1) ? <Style.ButtonUnderway width={localStorage.getItem('language') === 'zh_TW' ? '60px' : '90px'}>{t('TaskTable.onging')}</Style.ButtonUnderway> : (record.status === 3) ? <Style.ButtonAlreadySkip width={localStorage.getItem('language') === 'zh_TW' ? '60px' : '90px'}>{t('TaskTable.skip')}</Style.ButtonAlreadySkip> : <Style.ButtonComplete width={localStorage.getItem('language') === 'zh_TW' ? '60px' : '90px'}>{t('TaskTable.complete')}</Style.ButtonComplete>
      }
    },
    {
      dataIndex: 'revise',
      align: 'center',
      width: 40,
      render: (title, record) => {
        return (
          <>
            {title === 1 && <Tooltip
              placement="topLeft"
              overlayClassName={'newTooptip'}
              title={
                <span style={{ color: '#FFFFFF' }}>
                  {t('TaskTable.waitComfirm')}
                </span>
              }
              color="#333333"
            >
              <Style.GerberMesIconGray>
                <Icon.Message />
              </Style.GerberMesIconGray>
            </Tooltip>}

            {(title === 2 || title === 3 || title === 4) && <Tooltip
              placement="topLeft"
              overlayClassName={'newTooptip'}
              title={
                <span style={{ color: '#FFFFFF' }}>
                  {title === 2 ? t('TaskTable.alreadyComfirm') : title === 3 ? t('TaskTable.alreadyModify') : t('TaskTable.alreadyInherit')}
                </span>
              }
              color="#333333"
            >
              <Style.GerberMesIconBlue>
                <Icon.Message />
              </Style.GerberMesIconBlue>
            </Tooltip>}
          </>
        )
      }
    },
    {
      title: t('TaskTable.pic'),
      dataIndex: 'picList',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return text.length === 0 ? <Tooltip overlayClassName={'newTooptip'} placement="topLeft" title={<span>{t('TaskTable.tooltipTitle')}</span>} trigger="hover"><Icon.Pic /></Tooltip> : <Tooltip overlayClassName={'newTooptip'} placement="topLeft" title={text.map((item, index) => <span>{item} {index + 1 === text.length ? '' : ','}</span>)} trigger="hover"><Icon.Pic /></Tooltip>
      }
    },
    {
      title: t('TaskTable.dueDate'),
      dataIndex: 'dueDate',
      width: 200,
      align: 'center',
      render: (title, record) => {
        return (title === null && (record.attachType === 'no')) ? '-' : (title === 0) ? <div style={{ color: '#333333', fontWeight: '700' }}>{t('TaskTable.noSetting')}</div> : (title === null && record.attachType !== 'no') ? <div style={{ color: '#FF0000', fontWeight: '700' }}>{t('TaskTable.noSettingDueDate')}</div> : (Date.parse(moment().format('YYYY-MM-DD')) / 1000 > title) ? <div style={{ color: '#FF0000' }}>{datetimeFormat(title * 1000)}{t('TaskTable.overdue')}</div> : datetimeFormat(title * 1000)
      }
    },
    /* <div style={{ color: '#FF0000', fontWeight: '700' }}>未指定檔案Due Date</div> */
    {
      title: t('TaskTable.completeTime'),
      dataIndex: 'completeTime',
      align: 'center',
      width: 150,
      render: (title, item) => {
        return item.completeTime === null ? '-' : datetimeFormat(item.completeTime * 1000)
      }
    },
    {
      title: t('TaskTable.progress'),
      dataIndex: 'progress',
      align: 'center',
      width: 150,
      render: (title, record) => {
        return title === null ? '-' : title
      }
    }
  ];

  const getRowClassName = (record, index) => {
    let className = '';
    className = index % 2 === 0 ? "evenRow" : "oddRow";
    return className;
  }
  return (
    <Style.TaskTable>
      <Table data-testid='showtable' columns={columns} dataSource={datetasklist} rowClassName={getRowClassName} rowKey={(record) => record.taskId} size='small'
        onRow={(record) => {
          return {
            onClick: (event) => {
              onClick()
              store.changeDetail()
              localStorage.setItem('record', JSON.stringify(record))
            }, // 点击行
          };
        }}
      />
    </Style.TaskTable>
    // </myTaskDetail.Provider>
  )
}

export default withRouter(TaskTable)