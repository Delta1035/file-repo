import React, { useState, useEffect } from 'react';
import { getDetailFunctions, getDetailParentAndChild, getDetailData } from '@/api';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import useDatetimestamp from '@/hooks/datetimestamp';
import * as Style from '../CockpitStyle';
import { Form, Table, Select, Tabs, Button, Space, Tooltip } from 'antd';

const { Option } = Select;

const { TabPane } = Tabs;

function DetailInfo (props) {

  const { t } = useTranslation();

  const [Cockpitform] = Form.useForm();

  const [functionData, setFunctonData] = useState([]);

  const [parentData, setParentData] = useState([]);

  const [childData, setChildData] = useState([]);

  const [detailData, setDetailData] = useState([]);

  const [Overduecurrent, setOverduecurrent] = useState(1);

  // const [Ongoingcurrent, setOngoingcurrent] = useState(1);

  const [detailTotal, setDetailTotal] = useState(0);

  const [selectFunctionTeam, setSelectFunctionTeam] = useState('');

  const [selectParent, setSelectParent] = useState('');

  const [selectChlid, setSelectChlid] = useState('');

  // const [tabkey, setTabkey] = useState('Overdue');

  const datetimestamp = useDatetimestamp();

  const plmForm = props.match.params.id;

  const functionArray = [...functionData];
  functionArray.unshift('All Dept.');

  const parentArray = [...parentData];
  parentArray.unshift(t('Cockpit.allParent'));

  const chlidArray = [...childData];
  chlidArray.unshift(t('Cockpit.allChild'));

  useEffect(() => {

    getDetailFunctions({
      plmForm
    }).then((res) => {
      setFunctonData(res.data.data);
    });

    getDetailParentAndChild({
      parent: selectParent,
      plmForm
    }).then((res) => {
      setParentData(res.data.data.parentList);
      setChildData(res.data.data.childList);
    });

  }, [selectParent, plmForm]);


  useEffect(() => {

    getDetailData({
      pagination: {
        current: Overduecurrent,
        pageSize: 10,
      },
      query: {
        child: selectChlid,
        dpt: selectFunctionTeam,
        parent: selectParent,
        plmForm,
        status: 'Overdue',
      }
    }).then((res) => {
      setDetailData(res.data.data);
      setDetailTotal(res.data.pagination.total);
    })
  }, [Overduecurrent, plmForm, selectChlid, selectFunctionTeam, selectParent]);

  const OverduePageChange = (current) => {
    setOverduecurrent(current);
  }

  // const OngoingPageChange = (current) => {
  //   setOngoingcurrent(current);
  // }

  const handleFunctionTeamChange = (functionTeam) => {
    setSelectFunctionTeam(functionTeam);
  };
  // 當切換母階時，子階回到ALL子階默認選項
  const handleParentChange = (parent) => {
    setSelectParent(parent);
    setSelectChlid('');
    Cockpitform.setFieldsValue({
      child: t('Cockpit.allChild')
    })
  };

  const handleChlidChange = (child) => {
    setSelectChlid(child);
  };

  // const handleTabsChange = (key) => {
  //   setTabkey(key);
  // }

  const getRowClassName = (record, index) => {
    let className = "";
    className = index % 2 === 0 ? "oddRow" : "evenRow";
    return className;
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <Style.CockpitDetailPageButton>Prev</Style.CockpitDetailPageButton>;
    }

    if (type === "next") {
      return <Style.CockpitDetailPageButton>Next</Style.CockpitDetailPageButton>;
    }

    return originalElement;
  };

  const columns = [
    {
      title: 'Dpt.',
      dataIndex: 'dpt',
      key: 'dpt',
    },
    {
      title: t('Cockpit.parent'),
      dataIndex: 'parent',
      key: 'parent',
    },
    {
      title: t('Cockpit.child'),
      dataIndex: 'child',
      key: 'child',
    },
    {
      title: 'Task Name',
      dataIndex: 'taskName',
      key: 'taskName',
      width: '30%',
      ellipsis: { showTitle: false },
      render: (record) => {
        return (
          <Tooltip
            placement="topLeft"
            title={record}
            overlayStyle={{
              wordWrap: 'break-word',
            }}
            overlayClassName={'newTooptip'}>
            {record}
          </Tooltip>
        )
      },
    },
    {
      title: 'Doc Name',
      dataIndex: 'docName',
      key: 'docName',
    },
    // Overdue項目Due Data用紅色顯示
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (text) => <Space style={{ color: '#FF0000' }}>{text === null ? '' : datetimestamp(text * 1000)}</Space>
    },
    {
      title: 'Final Ver.(Qty)',
      dataIndex: 'finalNum',
      key: 'finalNum',
    },
    {
      title: 'non-Final Ver.(Qty)',
      dataIndex: 'nonFinalNum',
      key: 'nonFinalNum',
    },
  ]

  return (
    <Style.CockpitCard>
      <Style.CockpitDetailHeader>
        <Style.HeadTitle>Detail Information</Style.HeadTitle>
        <Style.CockpitDetailForm
          name='detailInfo'
          form={Cockpitform}
          initialValues={{ 'functionTeam': 'All Dept.', 'parent': t('Cockpit.allParent'), 'child': t('Cockpit.allChild') }}
          autoComplete="off"
          layout='inline'
        >
          <Form.Item name='functionTeam' style={{ width: '100px' }}>
            <Select onChange={handleFunctionTeamChange}>
              {functionArray.map((item) => {
                return (
                  <Option key={item === 'All Dept.' ? '' : item}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name='parent' style={{ width: '200px' }}>
            <Select onChange={handleParentChange}>
              {parentArray.map((item) => {
                return (
                  <Option key={item === t('Cockpit.allParent') ? '' : item}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name='child' style={{ width: '250px' }}>
            <Select onChange={handleChlidChange}>
              {chlidArray.map((item) => {
                return (
                  <Option key={item === t('Cockpit.allChild') ? '' : item}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Style.CockpitDetailForm>
      </Style.CockpitDetailHeader>
      <Style.CockpitDetailContent>
        <Tabs
          // onChange={handleTabsChange}
          defaultActiveKey='Overdue'
          type='card'>
          <TabPane tab={<Button style={{ background: '#1890FF', color: '#FFFFFF' }}>Overdue</Button>} key="Overdue">
            <Style.CockpitTable>
              <Table
                dataSource={detailData}
                columns={columns}
                rowClassName={getRowClassName}
                rowKey={record => record.id}
                pagination={{
                  position: ['bottomCenter'],
                  itemRender: itemRender,
                  total: detailTotal,
                  current: Overduecurrent,
                  onChange: OverduePageChange,
                  showSizeChanger: false,
                }}
              />
            </Style.CockpitTable>
          </TabPane>
          {/* <TabPane tab={<Button style={tabkey === 'Ongoing' ? { background: '#1890FF', color: '#FFFFFF' } : { background: '#FFFFFF' }}>Ongoing</Button>} key="Ongoing">
            <Style.CockpitTable>
              <Table
                dataSource={detailData}
                columns={columns}
                rowClassName={getRowClassName}
                rowKey={record => record.id}
                pagination={{
                  position: ['bottomCenter'],
                  itemRender: itemRender,
                  total: detailTotal,
                  current: Ongoingcurrent,
                  onChange: OngoingPageChange,
                  showSizeChanger: false,
                }}
              />
            </Style.CockpitTable>
          </TabPane> */}
        </Tabs>
      </Style.CockpitDetailContent>
    </Style.CockpitCard>
  )
}

export default withRouter(DetailInfo)
