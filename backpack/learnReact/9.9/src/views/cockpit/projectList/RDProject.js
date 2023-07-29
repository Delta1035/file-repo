import React, { useEffect, useState } from "react";
import { Table, Tooltip, Space } from "antd";
import { useTranslation } from "react-i18next";
import { getRdList } from "@/api/index";
import { useHistory } from "react-router-dom";
import useMinutetimestamp from "@/hooks/minutetimestamp";
import { Observer } from "mobx-react";
import moment from "moment";
import { CockpitTable } from "../CockpitStyle";

export default function RDProject (props) {

  const { datard, gettotalrd, totalRd, FormData, keyUrl } = props

  const [current, setCurrent] = useState(1);

  const [sortFieldAw, setSortFieldAw] = useState();

  const [sortOrderAw, setSortOrderAw] = useState();

  const [rdData, setRDData] = useState([]);
  //long时间处理函数
  const minutetimestamp = useMinutetimestamp();

  const { t } = useTranslation();

  const history = useHistory();

  useEffect(() => {

    getRdList({
      sorter: [
        {
          field: sortFieldAw,
          order: sortOrderAw,
        }
      ],
      pagination: {
        current: current,
        pageSize: 10,
      },
      query: {
        projectCode: FormData?.code === 'rfqCode' ? FormData.odd : null,
        projectName: FormData?.code === 'projectName' ? FormData.odd : null,
        plmForm: FormData?.code === 'plmForm' ? FormData.odd : null,
        pcbNo: FormData?.code === 'pcbNo' ? FormData.odd : null,
        customer: FormData?.customer,
        product: FormData?.product,
        status: FormData === undefined ? 1 : FormData?.status,
        "rangeParams": {
          projectProType: 2,
          "plmCreateStartTime": FormData?.rangeParams === undefined ? '' : parseInt(moment(FormData.rangeParams[0]).valueOf() / 1000),
          "plmCreateEndTime": FormData?.rangeParams === undefined ? '' : parseInt(moment(FormData.rangeParams[1]).valueOf() / 1000), //开始时间
        }
      }
    }).then(res => {
      setRDData(res.data.data);
      gettotalrd(res.data.pagination.total)
    });

  }, [sortFieldAw, sortOrderAw, current]);//eslint-disable-line


  useEffect(() => {
    setCurrent(1);
    setRDData(datard);
  }, [datard]);

  // 分页切换
  const onPageChange = (current, size) => {
    setCurrent(current);
  };

  const handletablesort = (pagination, filters, sorter) => {
    if (sorter.order === "ascend") {
      setSortOrderAw("asc");
      setSortFieldAw(sorter.field);
    } else if (sorter.order === "descend") {
      setSortOrderAw("desc");
      setSortFieldAw(sorter.field);
    }
  };

  const columns = [
    {
      title: t('rdProject.number'),
      align: "center",
      width: '50px',
      render: (text, record, index) => {
        const Number = `${(current - 1) * 10 + (index + 1)}`;
        return (
          <Space>{Number}</Space>
        );
      }
    },
    {
      title: t('rdProject.status'),
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
      title: t('rdProject.code'),
      dataIndex: "projectCode",
      width: '150px',
      ellipsis: { showTitle: false },
      sorter: true,
      render: (record) => {
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
      },
    },
    {
      title: t('rdProject.projectName'),
      dataIndex: "projectName",
      // width: '15%',
      ellipsis: {
        showTitle: false,
      },
      sorter: true,
      render: (record) => {
        if (record?.length >= 15) {
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
    },
    {
      title: t('rdProject.plmForm'),
      dataIndex: "plmForm",
      // width: '8%',
      ellipsis: { showTitle: false },
      sorter: true,
      render: (record) => {
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
      },
    },
    {
      title: t('rdProject.bu'),
      dataIndex: "bu",
      width: '80px',
      key: "bu",
      sorter: true,
    },
    {
      title: t('rdProject.customer'),
      dataIndex: "customer",
      // width: '8%',
      sorter: true,
      ellipsis: { showTitle: false, },
      render: (record) => {
        if (record.length >= 7) {
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
    },
    {
      title: t('rdProject.product'),
      dataIndex: "product",
      // width: '7%',
      ellipsis: {
        showTitle: false,
      },
      render: (record) => {
        if (record?.length >= 7) {
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
      title: t('rdProject.pcbNo'),
      dataIndex: "pcbNo",
      width: '100px',
      sorter: true,
    },
    {
      title: t('rdProject.pcbVersion'),
      dataIndex: "pcbVersion",
      align: "center",
      width: '120px',
      sorter: true,
    },
    {
      title: t('rdProject.plmCreateTime'),
      dataIndex: "plmCreateTime",
      width: '150px',
      ellipsis: {
        showTitle: false,
      },
      sorter: true,
      render: (text, record, index) =>
        minutetimestamp(record.plmCreateTime * 1000),
    }
  ]; //默认降序

  const getRowClassName = (record, index) => {
    let className = "";
    className = index % 2 === 0 ? "oddRow" : "evenRow";
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
    <Observer>
      {() => {
        return (
          <div data-testid="OnGoing">
            <CockpitTable>
              <Table
                locale={{ cancelSort: "", triggerAsc: "", triggerDesc: "" }}
                data-testid="showTable"
                columns={columns}
                dataSource={rdData}
                rowClassName={getRowClassName}
                onChange={handletablesort}
                rowKey={record => record.rdId}
                pagination={{
                  position: ["bottomCenter"],
                  total: totalRd,
                  itemRender: itemRender,
                  onChange: onPageChange,
                  current: current
                }}
                onRow={record => {
                  return {
                    onClick: () => {
                      history.push(`/cockpit/detail/${record.plmForm}/${keyUrl}`);
                    }
                  };
                }}
              />
            </CockpitTable>
          </div>
        );
      }}
    </Observer>
  )
}
