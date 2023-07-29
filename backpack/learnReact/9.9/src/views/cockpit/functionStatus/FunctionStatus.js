import React from 'react';
import { Form, Select } from 'antd';
import { withRouter } from 'react-router-dom';
import * as Style from '../CockpitStyle';
import { useEffect, useState } from 'react';
import { taskCount } from '@/api';
import { useTranslation } from 'react-i18next';


const { Option } = Select;

function FunctionStatus (props) {

    const [taskCountData, setTaskCountData] = useState({});

    const [parent, setParent] = useState('');

    const plmForm = props.match.params.id;

    const [stageUrl, setStageUrl] = useState(` and ${process.env.REACT_APP_POWER_BI_FUNCTION_TABLENAME}/stage eq 'All'&`);

    const { t } = useTranslation();

    // prd
    // <iframe title="wipcbfunction_prd" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=7151dce6-78ed-4c5b-999b-8e29c9e2f800&autoAuth=true&ctid=de0795e0-d7c0-4eeb-b9bb-bc94d8980d3b" frameborder="0" allowFullScreen="true"></iframe>
    // sit
    // <iframe title="wipcbfunction_sit" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=061b1c3c-0391-4c4d-b11c-4a4524f9e189&autoAuth=true&ctid=de0795e0-d7c0-4eeb-b9bb-bc94d8980d3b" frameborder="0" allowFullScreen="true"></iframe>

    const iframeWipcbURL = `https://app.powerbi.com/reportEmbed?reportId=${process.env.REACT_APP_POWER_BI_FUNCTION_REPORTID}&navContentPaneEnabled=false&autoAuth=true&filter=${process.env.REACT_APP_POWER_BI_FUNCTION_TABLENAME}/plm_code eq '${plmForm}'${stageUrl}ctid=de0795e0-d7c0-4eeb-b9bb-bc94d8980d3b&pageName=ReportSection7635ccaf52a89e4777a5`

    // console.log('iframeURL===function', iframeWipcbURL);

    // console.log('stageUrlL===function', stageUrl);

    useEffect(() => {
        taskCount({
            plmForm,
            parent: parent
        }).then(res => {
            setTaskCountData(res.data.data)
        })
    }, [plmForm, parent])


    const handleSelectMorder = (value) => {
        setParent(value);
        switch (value) {
            case 'Design in / ME Stacking':
                setStageUrl(` and ${process.env.REACT_APP_POWER_BI_FUNCTION_TABLENAME}/stage eq 'Design in / ME Stacking'&`);
                break;
            case 'Placement':
                setStageUrl(` and ${process.env.REACT_APP_POWER_BI_FUNCTION_TABLENAME}/stage eq 'Placement'&`);
                break;
            case 'P1.1':
                setStageUrl(` and ${process.env.REACT_APP_POWER_BI_FUNCTION_TABLENAME}/stage eq 'P1.1'&`);
                break;
            case 'Routing':
                setStageUrl(` and ${process.env.REACT_APP_POWER_BI_FUNCTION_TABLENAME}/stage eq 'Routing'&`);
                break;
            case 'Gerber release':
                setStageUrl(` and ${process.env.REACT_APP_POWER_BI_FUNCTION_TABLENAME}/stage eq 'Gerber release'&`);
                break;
            default:
                setStageUrl(` and ${process.env.REACT_APP_POWER_BI_FUNCTION_TABLENAME}/stage eq 'All'&`);
        }
    }
    return (
        <Style.CockpitCard>
            <Style.CockpitFunctionHeader>
                <Style.HeadTitle>Function Status</Style.HeadTitle>
                <Style.CockpitFunctionForm
                    name='functionStatus'
                    autoComplete='off'
                    layout='inline'
                    initialValues={{ parent: '' }}
                >
                    <Form.Item name='parent' style={{ width: '200px' }}>
                        <Select onChange={handleSelectMorder}>
                            <Option value=''>{t('Cockpit.allParent')}</Option>
                            <Option value='Design in / ME Stacking'>Design in / ME Stacking</Option>
                            <Option value='Placement'>Placement</Option>
                            <Option value='P1.1'>P1.1</Option>
                            <Option value='Routing'>Routing</Option>
                            <Option value='Gerber release'>Gerber release</Option>
                        </Select>
                    </Form.Item>
                </Style.CockpitFunctionForm>
            </Style.CockpitFunctionHeader>
            <Style.CockpitFunctionContent>
                <Style.FunctionCharNumber>
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
                </Style.FunctionCharNumber>
                <iframe
                    title="wipcbfunction"
                    width="100%"
                    height="100%"
                    src={iframeWipcbURL}
                    style={{ border: 'none' }}
                />
            </Style.CockpitFunctionContent>
        </Style.CockpitCard>
    )
}


export default withRouter(FunctionStatus);
