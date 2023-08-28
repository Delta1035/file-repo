import React, { useEffect, useState } from "react";
import { getRfqList } from "@/api/index";
import { Table, Tooltip, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import useMinutetimestamp from "@/hooks/minutetimestamp";
import { Observer } from "mobx-react";
import moment from "moment";
import { CockpitTable } from "../CockpitStyle";

export default function RFQProject (props) {

    const { datarfq, gettotalrfq, FormData, totalRfq, keyUrl } = props;

    const [rfqdata, setRFQData] = useState([]);

    const [sortFieldAw, setSortFieldAw] = useState();

    const [sortOrderAw, setSortOrderAw] = useState();

    const [current, setCurrent] = useState(1);

    const { t } = useTranslation();
    //long时间处理函数
    const minutetimestamp = useMinutetimestamp();

    const history = useHistory();

    useEffect(() => {
        getRfqList({
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
                rfqCode: FormData?.coderfq === 'rfqCode' ? FormData.odd : null,
                projectName: FormData?.coderfq === 'projectName' ? FormData.odd : null,
                customer: FormData?.customer,
                product: FormData?.product,
                status: FormData === undefined ? 1 : FormData.status,
                "rangeParams": {
                    projectProType: 2,
                    "createStartTime": FormData?.rangeParams === undefined ? '' : parseInt(moment(FormData.rangeParams[0]).valueOf() / 1000),
                    "createEndTime": FormData?.rangeParams === undefined ? '' : parseInt(moment(FormData.rangeParams[1]).valueOf() / 1000), //开始时间
                }
            }
        }).then(res => {
            setRFQData(res.data.data);
            gettotalrfq(res.data.pagination.total)
        });

    }, [sortFieldAw, sortOrderAw, current]);//eslint-disable-line

    const handletablesort = (pagination, filters, sorter) => {
        if (sorter.order === "ascend") {
            setSortOrderAw("asc");
            setSortFieldAw(sorter.field);
        } else if (sorter.order === "descend") {
            setSortOrderAw("desc");
            setSortFieldAw(sorter.field);
        }
    };

    const onPageChange = (current) => {
        setCurrent(current);
    };

    useEffect(() => {
        setCurrent(1);
        setRFQData(datarfq);
    }, [datarfq]);

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

    const columns = [
        {
            title: t('rfqProject.number'),
            align: "center",
            key: "name",
            width: '50px',
            render: (text, record, index) => {
                const Number = `${(current - 1) * 10 + (index + 1)}`;
                return (
                    <Space>{Number}</Space>
                );
            }
        },
        {
            title: t('rfqProject.status'),
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
            title: t('rfqProject.code'),
            dataIndex: "rfqCode",
            width: '150px',
            sorter: true,
            render: (record) => {
                if (record?.length >= 13) {
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
            title: t('rfqProject.projectName'),
            dataIndex: "projectName",
            key: "projectName",
            // width: '15%',
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
            // width: '25%',
            render: (text, record, index) =>
                minutetimestamp(record.createTime * 1000),
            sorter: true,
        },
    ];

    return (
        <Observer>
            {
                () => {
                    return (
                        <CockpitTable>
                            <Table
                                locale={{ cancelSort: "", triggerAsc: "", triggerDesc: "" }}
                                pagination={{
                                    position: ["bottomCenter"],
                                    total: totalRfq,
                                    itemRender: itemRender,
                                    onChange: onPageChange,
                                    current: current
                                }}
                                columns={columns}
                                dataSource={rfqdata}
                                onChange={handletablesort}
                                rowClassName={getRowClassName}
                                rowKey={(record) => record.rfqId}
                                onRow={record => {
                                    return {
                                        onClick: (e) => {
                                            history.push(`/cockpit/detail/${record.rfqCode}/${keyUrl}`);
                                        }
                                    };
                                }}
                            />
                        </CockpitTable>
                    )
                }
            }
        </Observer>
    );
}