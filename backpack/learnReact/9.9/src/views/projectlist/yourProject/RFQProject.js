import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getRfqList } from "@/api/index";
import { StarFilled } from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import { Space, Table, Tooltip } from "antd";
import * as Style from "../ProjectListStyle";
import useMinutetimestamp from "@/hooks/minutetimestamp";
import "./table.css";
import moment from "moment";

function RFQProject (props) {

  const { data, gettotalrfq, totalrfq, FormData, keyUrl } = props;

  const [sortFieldRFQ, setSortFieldRFQ] = useState();

  const [sortOrderRFQ, setSortOrderRFQ] = useState();

  const [current, setCurrent] = useState(1);

  const [rfqdata, setRFQData] = useState([]);

  const { t } = useTranslation();
  //long时间处理函数
  const minutetimestamp = useMinutetimestamp();

  useEffect(() => {
    getRfqList({
      query: {
        rfqCode: FormData?.coderfq === 'rfqCode' ? FormData.inputValue : null,
        projectName: FormData?.coderfq === 'projectName' ? FormData.inputValue : null,
        customer: FormData?.customer,
        product: FormData?.product,
        status: FormData === undefined ? 1 : FormData.status,
        "rangeParams": {
          projectProType: 1,
          "createStartTime": FormData?.rangeParams === undefined ? '' : parseInt(moment(FormData.rangeParams[0]).valueOf() / 1000),
          "createEndTime": FormData?.rangeParams === undefined ? '' : parseInt(moment(FormData.rangeParams[1]).valueOf() / 1000), //开始时间
        }
      },
      sorter: [
        {
          field: sortFieldRFQ,
          order: sortOrderRFQ,
        }
      ],
      pagination: {
        current: current,
        pageSize: 10,
      },
    }).then(res => {
      setRFQData(res.data.data);
      gettotalrfq(res.data.pagination.total)
    });

  }, [sortFieldRFQ, sortOrderRFQ, current]);//eslint-disable-line
  // 升序降序排列
  const handletablesort = (pagination, filters, sorter) => {
    if (sorter.order === "ascend") {
      setSortOrderRFQ("asc");
      setSortFieldRFQ(sorter.field);
    } else if (sorter.order === "descend") {
      setSortOrderRFQ("desc");
      setSortFieldRFQ(sorter.field);
    }
  };
  // 分页切换
  const onPageChange = (current) => {
    setCurrent(current);
  };

  useEffect(() => {
    setCurrent(1);
    setRFQData(data);
  }, [data]);
  // 設置奇數行和偶數行樣式
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

  const columns = [
    {
      title: t('rfqProject.number'),
      align: "center",
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
      title: t('rfqProject.status'),
      dataIndex: "status",
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
      title: t('rfqProject.code'),
      dataIndex: "rfqCode",
      width: '150px',
      sorter: true,
      ellipsis: { showTitle: false },
      render: (text) => {
        if (text.length >= 14) {
          return (
            <Tooltip
              placement="topLeft"
              title={text}
              overlayStyle={{
                wordWrap: 'break-word',
                maxWidth: '270px',
              }}
              overlayClassName={'newTooptip'}>
              {text}
            </Tooltip>
          )
        } else {
          return <Space>{text}</Space>
        }
      }
    },
    {
      title: t('rfqProject.projectName'),
      dataIndex: "projectName",
      key: "projectName",
      sorter: true,
      ellipsis: { showTitle: false },
      render: (record) => {
        if (record?.length >= 18) {
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
          return <Space>{record}</Space>
        }
      }
    },
    {
      title: t('rfqProject.bu'),
      dataIndex: "bu",
      key: "bu",
      width: '80px',
      sorter: true,
    },
    {
      title: t('rfqProject.customer'),
      dataIndex: "customer",
      key: "customer",
      // width: '7%',
      sorter: true,
      ellipsis: { showTitle: false },
      render: (record) => {
        if (record?.length >= 8) {
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
          return <Space>{record}</Space>
        }
      }
    },
    {
      title: t('rfqProject.product'),
      dataIndex: "product",
      key: "product",
      // width: '8%',
      sorter: true,
      ellipsis: { showTitle: false },
      render: (record) => {
        if (record?.length >= 8) {
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
          return <Space>{record}</Space>
        }
      }
    },
    {
      title: t('rfqProject.createtime'),
      dataIndex: "createTime",
      key: "createTime",
      // width: '20%',
      render: (text, record, index) =>
        minutetimestamp(record.createTime * 1000),
      sorter: true,
    },
  ];
  return (
    <Style.Table>
      <Table
        locale={{ cancelSort: "", triggerAsc: "", triggerDesc: "" }}
        columns={columns}
        dataSource={rfqdata}
        onChange={handletablesort}
        rowClassName={getRowClassName}
        rowKey={(record) => record.rfqId}
        pagination={{
          position: ["bottomCenter"],
          itemRender: itemRender,
          total: totalrfq,
          current: current,
          onChange: onPageChange,
          hideOnSinglePage: false,
        }}
        onRow={record => {
          return {
            onClick: (event) => {
              props.history.push(`/projectlist/info/${record.rfqCode}/${keyUrl}`);
            }
          };
        }}
      />
    </Style.Table>
  );
}
export default withRouter(RFQProject);
