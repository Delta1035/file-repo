import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getAwardList } from "@/api";
import { useTranslation } from "react-i18next";
import { StarFilled } from '@ant-design/icons';
import { Space, Table, Tooltip } from "antd";
import * as Style from "../ProjectListStyle";
import useMinutetimestamp from "@/hooks/minutetimestamp";

import moment from "moment";

function AwardProject (props) {
  const { data, gettotalaward, totalAward, FormData, keyUrl } = props;
  //long时间处理函数
  const minutetimestamp = useMinutetimestamp();
  // 切换的当前分页的数据
  const [current, setCurrent] = useState(1);

  const [awardData, setAwardData] = useState(data);

  const [sortFieldAw, setSortFieldAw] = useState();

  const [sortOrderAw, setSortOrderAw] = useState();

  const { t } = useTranslation();

  useEffect(() => {
    getAwardList({
      query: {
        projectCode: FormData?.code === 'projectCode' ? FormData.inputValue : null,
        projectName: FormData?.code === 'projectName' ? FormData.inputValue : null,
        plmForm: FormData?.code === 'plmForm' ? FormData.inputValue : null,
        pcbNo: FormData?.code === 'pcbNo' ? FormData.inputValue : null,
        customer: FormData?.customer,
        product: FormData?.product,
        status: FormData === undefined ? 1 : FormData?.status,
        rangeParams: {
          projectProType: 1,
          plmCreateStartTime: FormData?.rangeParams === undefined ? '' : parseInt(moment(FormData.rangeParams[0]).valueOf() / 1000),
          plmCreateEndTime: FormData?.rangeParams === undefined ? '' : parseInt(moment(FormData.rangeParams[1]).valueOf() / 1000), //开始时间
        }
      },
      pagination: {
        current: current,
        pageSize: 10,
      },
      sorter: [
        {
          field: sortFieldAw,
          order: sortOrderAw,
        }
      ],
    }).then((res) => {
      setAwardData(res.data.data);
      gettotalaward(res.data.pagination.total);
    })
  }, [current, sortFieldAw, sortOrderAw, FormData]);//eslint-disable-line

  useEffect(() => {
    setCurrent(1);
    setAwardData(data);
  }, [data]);

  const handletablesort = (pagination, filters, sorter) => {
    if (sorter.order === "ascend") {
      setSortOrderAw("asc");
      setSortFieldAw(sorter.field);
    } else if (sorter.order === "descend") {
      setSortOrderAw("desc");
      setSortFieldAw(sorter.field);
    }
  };

  const onPageChangeAwrd = (current) => {
    setCurrent(current);
  };

  const columns = [
    {
      title: t('awardProject.number'),
      align: "center",
      key: "awardId",
      width: '50px',
      render: (text, record, index) => {
        const ProType = record.projectProType;
        const Number = `${(current - 1) * 10 + (index + 1)}`;
        const StarIcon = <StarFilled style={{ color: '#F5C910' }} />;
        return (
          <Space>{ProType === '1' ? StarIcon : Number}</Space>
        );
      }
    },
    {
      title: t('awardProject.status'),
      dataIndex: "status",
      key: "status",
      width: '100px',
      sorter: true,
      render: (value, item, index) => {
        return (
          <div>
            {value === 1 && 'Ongoing'}
            {value === 2 && 'Canceled'}
            {value === 3 && 'Closed'}
            {value === 4 && 'Onhold'}
          </div>
        );
      }
    },
    {
      title: t('awardProject.code'),
      dataIndex: "projectCode",
      width: '150px',
      sorter: true,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: t('awardProject.projectName'),
      dataIndex: "projectName",
      // width: '12%',
      ellipsis: {
        showTitle: false,
      },
      render: (record) => {
        if (record?.length >= 12) {
          return (
            <Tooltip
              placement="topLeft"
              title={record}
              overlayStyle={{
                wordWrap: 'break-word',
                maxWidth: '270px',
              }}
              overlayClassName={'newTooptip'}>
              {record}
            </Tooltip>
          )
        } else {
          return <span>{record}</span>
        }
      },
      sorter: true,
    },
    {
      title: t('awardProject.plmForm'),
      dataIndex: "plmForm",
      width: 150,
      ellipsis: { showTitle: false },
      sorter: true,
    },
    {
      title: t('awardProject.bu'),
      dataIndex: "bu",
      width: '80px',
      key: "bu",
      sorter: true,
    },
    {
      title: t('awardProject.customer'),
      dataIndex: "customer",
      // width: '8%',
      ellipsis: {
        showTitle: false,
      },
      render: (record) => {
        if (record?.length >= 10) {
          return (
            <Tooltip placement="topLeft"
              title={record}
              overlayStyle={{
                wordWrap: 'break-word',
                maxWidth: '270px',
              }}
              overlayClassName={'newTooptip'}>
              {record}
            </Tooltip>
          )
        } else {
          return <span>{record}</span>
        }
      },
      sorter: true,
    },
    {
      title: t('awardProject.product'),
      dataIndex: "product",
      // width: '10%',
      ellipsis: {
        showTitle: false,
      },
      render: (record) => {
        if (record?.length >= 10) {
          return (
            <Tooltip placement="topLeft"
              title={record}
              overlayStyle={{
                wordWrap: 'break-word',
                maxWidth: '270px',
              }}
              overlayClassName={'newTooptip'}>
              {record}
            </Tooltip>
          )
        } else {
          return <span>{record}</span>
        }
      },
      sorter: true,
    },
    {
      title: t('awardProject.pcbNo'),
      dataIndex: "pcbNo",
      width: '100px',
      ellipsis: {
        showTitle: false,
      },
      sorter: true,
    },
    {
      title: t('awardProject.pcbVersion'),
      dataIndex: "pcbVersion",
      align: "center",
      width: '120px',
      ellipsis: {
        showTitle: false,
      },
      sorter: true,
    },
    {
      title: t('awardProject.plmCreateTime'),
      dataIndex: "plmCreateTime",
      width: '150px',
      sorter: true,
      render: (text, record, index) =>
        minutetimestamp(record.plmCreateTime * 1000),
    }
  ]; //默认降序

  const getRowClassName = (record, index) => {
    let className = "";
    className = index % 2 === 0 ? "inputValueRow" : "evenRow";
    return className;
  };

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
    <Style.Table>
      <Table
        locale={{ cancelSort: "", triggerAsc: "", triggerDesc: "" }}
        columns={columns}
        dataSource={awardData}
        onChange={handletablesort}
        rowClassName={getRowClassName}
        rowKey={record => record.awardId}
        pagination={{
          position: ["bottomCenter"],
          total: totalAward,
          itemRender: itemRender,
          onChange: onPageChangeAwrd,
          current: current,
          hideOnSinglePage: false,
          showSizeChanger: false,
        }}
        onRow={record => {
          return {
            onClick: (event) => {
              props.history.push(`/projectlist/info/${record.plmForm}/${keyUrl}`);
            }
          };
        }}
      />
    </Style.Table>

  );
}

export default withRouter(AwardProject);
