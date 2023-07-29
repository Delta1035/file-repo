import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getProjectStatus, taskCount } from '@/api';
import useDatetimestamp from '@/hooks/datetimestamp';
import { Space, Table } from 'antd';
import * as Style from '../CockpitStyle';
import { useTranslation } from 'react-i18next';

function ProjectStatus (props) {
    const [projectData, setProjectData] = useState([]);
    const [taskCountData, setTaskCountData] = useState({});


    const plmForm = props.match.params.id;
    // 時間戳轉化方法
    const datetimestamp = useDatetimestamp();
    // 獲取系統當前的時間戳
    const timeStamp = Date.now();

    const { t } = useTranslation();
    // prd
    // <iframe title="wipcb_prd" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=eda4672d-c378-405b-b7d9-8ab639056fab&autoAuth=true&ctid=de0795e0-d7c0-4eeb-b9bb-bc94d8980d3b" frameborder="0" allowFullScreen="true"></iframe>

    // sit
    // <iframe title="wipcb_sit" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=fb17c795-7806-4bb8-a383-d99672e9db77&autoAuth=true&ctid=de0795e0-d7c0-4eeb-b9bb-bc94d8980d3b" frameborder="0" allowFullScreen="true"></iframe>

    const iframeWipcbURL = `https://app.powerbi.com/reportEmbed?reportId=${process.env.REACT_APP_POWER_BI_PORJECT_REPORTID}&navContentPaneEnabled=false&autoAuth=true&filter=${process.env.REACT_APP_POWER_BI_PORJECT_TABLENAME}/plm_code eq '${plmForm}'&ctid=de0795e0-d7c0-4eeb-b9bb-bc94d8980d3b&pageName=ReportSection4de0b8539aa01313cc67`

    // console.log('iframeURL===project', iframeWipcbURL);

    useEffect(() => {
        getProjectStatus({
            plmForm,
        }).then((res) => {
            setProjectData(res.data.data);
        })

        taskCount({
            plmForm,
            parent: ''
        }).then(res => {
            setTaskCountData(res.data.data)
        })
    }, [plmForm]);


    const columns = [
        {
            title: t('Cockpit.parent'),
            dataIndex: 'parent',
            key: 'parent',
        },
        {
            title: t('Cockpit.planDate'),
            width:'105px',
            dataIndex: 'planDate',
            key: 'planDate',
            render: (text, record) => {
                const day = record.dateDiff === null ? '0' : record.dateDiff;
                const blackLine = <span style={{ color: '#333333' }}>-</span>;
                if (day === '0') {
                    return (
                        <Space style={text * 1000 < timeStamp ? { color: '#FF0000' } : { color: '#333333' }}>
                            {text === 0 ? blackLine : datetimestamp(text * 1000)}
                        </Space>
                    );
                } else {
                    return text === 0 ? '-' : datetimestamp(text * 1000);
                }
            },
        },
        {
            title: t('Cockpit.actualDate'),
            width:'105px',
            dataIndex: 'actualDate',
            key: 'actualDate',
            render: (text) => (text === 0 ? '-' : datetimestamp(text * 1000)),
        },
        {
            title: t('Cockpit.dateDiff'),
            dataIndex: 'dateDiff',
            key: 'dateDiff',
            /* 差異天數為正數時用紅色顯示，為空時用黑色橫線顯示 */
            render: (text) => {
                if (text < 0) {
                    return text;
                } else if (text === null) {
                    return '-';
                } else {
                    const redNumber = '+' + text.toString();
                    return (
                        <Space style={text === 0 ? { color: 'black' } : { color: '#FF0000' }}>
                            {redNumber}
                        </Space>
                    );
                }
            },
        },
    ];

    return (
        <Style.CockpitCard>
            <Style.HeadTitle>Project Status</Style.HeadTitle>
            <Style.CockpitContent >
                <Style.CockpitProjectChar>
                    <Style.ProjectCharNumber>
                        <Style.DotNum>
                            <Style.DotColorFinished />
                            <Style.DotFont>Finished</Style.DotFont>
                            <Style.DotPercent> {taskCountData.finished?.percent} ({taskCountData.finished?.ratio})</Style.DotPercent>
                        </Style.DotNum>
                        <Style.DotNum>
                            <Style.DotColorOngoing />
                            <Style.DotFont>Ongoing</Style.DotFont>
                            <Style.DotPercent> {taskCountData.ongoing?.percent} ({taskCountData.ongoing?.ratio})</Style.DotPercent>
                        </Style.DotNum>
                        <Style.DotNum>
                            <Style.DotColorTodo />
                            <Style.DotFont>To do</Style.DotFont>
                            <Style.DotPercent>{taskCountData.todo?.percent} ({taskCountData.todo?.ratio})</Style.DotPercent>
                        </Style.DotNum>
                        <Style.DotNum>
                            <Style.DotColorOverdue />
                            <Style.DotFont>Overdue</Style.DotFont>
                            <Style.DotPercent>{taskCountData.overdue?.percent} ({taskCountData.overdue?.ratio})</Style.DotPercent>
                        </Style.DotNum>
                        <Style.DotNum>
                            <Style.DotColorSkip />
                            <Style.DotFont>Skip</Style.DotFont>
                            <Style.DotPercent>{taskCountData.skip?.percent} ({taskCountData.skip?.ratio})</Style.DotPercent>
                        </Style.DotNum>
                    </Style.ProjectCharNumber>
                    <iframe
                        title="wipcb"
                        width="100%"
                        height="100%"
                        src={iframeWipcbURL}
                        style={{ border: 'none' }}
                    />
                </Style.CockpitProjectChar>
                <Style.CockpitProjectTable>
                    <Table
                        dataSource={projectData}
                        columns={columns}
                        pagination={false}
                        size="small"
                        rowKey={(record) => record.parent}
                    />
                </Style.CockpitProjectTable>
            </Style.CockpitContent>
        </Style.CockpitCard>
    );
}

export default withRouter(ProjectStatus);
