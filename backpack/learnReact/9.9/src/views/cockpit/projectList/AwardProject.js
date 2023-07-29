import React, { useEffect, useState } from "react";
import { getAwardList } from "@/api";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Space, Table, Tooltip } from "antd";
import useMinutetimestamp from "@/hooks/minutetimestamp";
import { Observer } from "mobx-react";
import moment from "moment";
import { CockpitTable } from "../CockpitStyle";

export default function AwardProject (props) {

    const { dataaward, gettotalaward, totalAward, FormData, keyUrl } = props;

    const [sortFieldAw, setSortFieldAw] = useState();

    const [sortOrderAw, setSortOrderAw] = useState();
    //long时间处理函数
    const minutetimestamp = useMinutetimestamp();

    const [current, setCurrent] = useState(1);

    const [awardData, setAwardData] = useState([]);

    const { t } = useTranslation();

    const history = useHistory();

    useEffect(() => {
        getAwardList({
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
                projectCode: FormData?.code === 'projectCode' ? FormData.odd : null,
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
            setAwardData(res.data.data);
            gettotalaward(res.data.pagination.total)
        });

    }, [sortFieldAw, sortOrderAw, current]);//eslint-disable-line

    useEffect(() => {
        setCurrent(1);
        setAwardData(dataaward);
    }, [dataaward])

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
            width: '50px',
            render: (text, record, index) => {
                const Number = `${(current - 1) * 10 + (index + 1)}`;
                return (
                    <Space>{Number}</Space>
                );
            }
        },
        {
            title: t('awardProject.status'),
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
            align: "left",
            ellipsis: {
                showTitle: false,
            },
            render: (value) => {
                if (value?.length >= 12) {
                    return (
                        <Tooltip placement="topLeft"
                            title={value} 
                            overlayStyle={{
                                wordWrap: 'break-word',
                                maxWidth: '270px',
                            }}
                            overlayClassName={'newTooptip'}>
                            {value}
                        </Tooltip>
                    )
                } else {
                    return <span>{value}</span>
                }
            },
            sorter: true,
        },
        {
            title: t('awardProject.plmForm'),
            dataIndex: "plmForm",
            // width: '8%',
            ellipsis: { showTitle: false },
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
            sorter: true,
        },
        {
            title: t('awardProject.pcbVersion'),
            dataIndex: "pcbVersion",
            align: "center",
            width: '120px',
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
    ];

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
                    <div >
                        <CockpitTable>
                            <Table
                                locale={{ cancelSort: "", triggerAsc: "", triggerDesc: "" }}
                                onChange={handletablesort}
                                rowKey={record => record.awardId}
                                columns={columns}
                                dataSource={awardData}
                                rowClassName={getRowClassName}
                                pagination={{
                                    position: ["bottomCenter"],
                                    itemRender: itemRender,
                                    total: totalAward,
                                    onChange: onPageChangeAwrd,
                                    current: current,
                                    hideOnSinglePage: false,
                                    showSizeChanger: false,
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
                    </div >
                );
            }}
        </Observer >
    )
}
