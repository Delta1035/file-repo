import React, { useEffect, useState } from "react";
import { baseInfo, reviseGerber } from "@/api/index";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Descriptions, Collapse, Button, Tooltip, Modal, Form, Input, message } from "antd";
import { connect } from 'react-redux'

// import RfqFile from "../rfqfile/RfqFile";
import * as Style from "../../ProjectListStyle";
import store from "@/mobx/store";
import {
  SettingOutlined,
} from '@ant-design/icons';
const { Panel } = Collapse;

function BasicInfo (props) {

  const [formGerber] = Form.useForm();

  const [baseInfoList, setBaseInfoList] = useState({});

  const [projectName, setProjectName] = useState('');

  const [collapseStatus, setCollapseStatus] = useState(false);

  const { t } = useTranslation();

  const plmForm = props.match.params.id;

  const classification = props.match.params.classification;

  const [isModalVisible, setIsModalVisible] = useState(false)

  const biprojectName = <div>{t('basicInfo.Title')} <span style={{ color: "#486ADF", fontWeight: "normal", fontFamily: "Helvetica", fontSize: "14px", lineHeight: "16px" }}>{projectName}</span></div>;
  // 獲取URL上的字段 用於設置cockpit頁面和project list頁面中的兩種頂部展示效果
  const basicInfoUrl = props.history.location.pathname.substr(0, 8);

  useEffect(
    () => {
      baseInfo({
        plmForm,
        classification,
      }).then(res => {
        setBaseInfoList(res.data.data);
        setProjectName(res.data.data.projectName);
        store.changeProjectName(res.data.data.projectName);
        store.changeprojectCode(res.data.data.projectCode);
        store.changeplmForm(res.data.data.plmCode);
        store.changerfqCode(res.data.data.rfqCode);
      });
    }, [classification, plmForm]
  );
  //控制BasicInfo後面的projectname是否顯示
  const onChange = (key) => {
    if (key.toString() === '1') {
      setCollapseStatus(true);
    } else {
      setCollapseStatus(false);
    }
  };

  const handleReviseGerberReason = () => {
    formGerber.validateFields().then(values => {
      reviseGerber({
        plmForm: plmForm,
        reason: values.reason
      }).then(res => {
        if (res.data.code === 200) {
          message.success(t('basicInfo.updateSuccess'))
          setIsModalVisible(false)
          formGerber.resetFields()
          props.changedataProgress();
        } else {
          message.error(res.data.message)
          setIsModalVisible(false)
          formGerber.resetFields()
        }
      }).catch(err => {
        message.error(err.data.message)
        setIsModalVisible(false)
        formGerber.resetFields()
      })

    })
  }

  const onCancelClick = () => {
    formGerber.resetFields()
    setIsModalVisible(false)
  };

  const handleReviseGerber = () => {
    return (
      <Style.Popoverdiv>
        <Style.Popovercontent
          onClick={() => {
            onClickGerber();
          }}
        >
          <Button
            type="text"
            style={{ padding: '0px', fontSize: '14px' }}
          >
            {t('basicInfo.changeGerber')}
          </Button>
        </Style.Popovercontent>
      </Style.Popoverdiv>
    )
  }
  const onClickGerber = () => {
    setIsModalVisible(true)
  }
  return (
    <div>
      {basicInfoUrl === '/project' ? <Style.TitleInfo>{t('basicInfo.pageTitle')}
        {baseInfoList.projectStatus === 3 &&
          <Tooltip
            title={() =>
              handleReviseGerber()
            }
            trigger="focus"
            color="#FFFFFF"
            overlayInnerStyle={{
              padding: '0px 2px',
              borderRadius: '4px',
              border: '1px solid #D7D7D7',
            }}
          >
            <Button type="text" style={{ padding: '0px ' }}>
              <SettingOutlined style={{ fontSize: '18px' }} />
            </Button>
          </Tooltip>
        }
      </Style.TitleInfo> : <div style={{ margin: "24px 16px " }}><Style.ProjectTitle>Cockpit</Style.ProjectTitle></div>}
      <Style.Info data-testid="basicinfo">
        <Collapse expandIconPosition="end" ghost onChange={onChange}>
          <Panel header={collapseStatus === false ? biprojectName : t('basicInfo.Title')} key="1">
            <Descriptions
              column={5}
              layout="vertical"
              contentStyle={{
                fontWeight: "400",
                fontsize: "14px",
                color: "#333333"
              }}
              labelStyle={{
                fontWeight: "400",
                fontsize: "14px",
                color: "#797979"
              }}
            >
              <Descriptions.Item label={t('basicInfo.projectName')}>
                {baseInfoList.projectName}
              </Descriptions.Item>
              <Descriptions.Item label={t('basicInfo.projectCode')}>
                {baseInfoList.projectCode}
              </Descriptions.Item>
              <Descriptions.Item label={t('basicInfo.rfqCode')}>
                {baseInfoList.rfqCode}
              </Descriptions.Item>
              <Descriptions.Item label={t('basicInfo.plmCode')}>
                {baseInfoList.plmCode}
              </Descriptions.Item>
              <Descriptions.Item label={t('basicInfo.bu')}>
                {baseInfoList.bu}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions
              column={5}
              layout="vertical"
              contentStyle={{
                fontWeight: "400",
                fontsize: "14px",
                color: "#333333"
              }}
              labelStyle={{
                fontWeight: "400",
                fontsize: "14px",
                color: "#797979"
              }}
              style={{ marginTop: "18px" }}
            >
              <Descriptions.Item label={t('basicInfo.classification')}>
                {baseInfoList.classification}
              </Descriptions.Item>
              <Descriptions.Item label={t('basicInfo.customer')}>
                {baseInfoList.customer}
              </Descriptions.Item>
              <Descriptions.Item label={t('basicInfo.product')}>
                {baseInfoList.product}
              </Descriptions.Item>
              <Descriptions.Item label={t('basicInfo.wistronPartNo')} span={2}>
                {baseInfoList.wistronPartNo}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions
              column={5}
              layout="vertical"
              contentStyle={{
                fontWeight: "400",
                fontsize: "14px",
                color: "#333333"
              }}
              labelStyle={{
                fontWeight: "400",
                fontsize: "14px",
                color: "#797979"
              }}
              style={{ marginTop: "18px" }}
            >
              <Descriptions.Item label={t('basicInfo.pcbName')}>
                {baseInfoList.pcbName}
              </Descriptions.Item>
              <Descriptions.Item label={t('basicInfo.pcbNo')}>
                {baseInfoList.pcbNo}
              </Descriptions.Item>
              <Descriptions.Item label={t('basicInfo.pcbVersion')}>
                {baseInfoList.pcbVersion}
              </Descriptions.Item>
              <Descriptions.Item label={t('basicInfo.layers')}>
                {baseInfoList.layers}
              </Descriptions.Item>
              <Descriptions.Item label={t('basicInfo.greenFactorString')}>
                {baseInfoList.greenFactorString}
              </Descriptions.Item>
            </Descriptions>

            {/* 暂时移除，后续会做 */}
            {/* <Descriptions
              column={4}
              layout="vertical"
              contentStyle={{
                fontWeight: "400",
                fontsize: "14px",
                color: "#333333"
              }}
              labelStyle={{
                fontWeight: "400",
                fontsize: "14px",
                color: "#797979"
              }}
              style={{ marginTop: "16px" }}
            >
              <Descriptions.Item label="RFQ PRD">
                <RfqFile />
              </Descriptions.Item>
              <Descriptions.Item label="Award PRD">尚未開放上傳</Descriptions.Item>
            </Descriptions> */}
          </Panel>
        </Collapse>
      </Style.Info>
      <Modal title={t('basicInfo.modalTitle')} centered={true} visible={isModalVisible} onCancel={onCancelClick} okText="Submit" onOk={handleReviseGerberReason} width='550px' >
        <Style.GerberReasonTitle fontsize='16px' bottom='16px'>
        {t('basicInfo.inputReason')}
        </Style.GerberReasonTitle>
        <Style.ReasonForm>
          <Form form={formGerber} >
            <Form.Item label={t('basicInfo.changeGerberReason')} name='reason' rules={[{ required: true, message: t('basicInfo.rulesMessage'), }]}>
              <Input placeholder={t('basicInfo.rulesMessage')} />
            </Form.Item>
          </Form>
        </Style.ReasonForm>
        <Style.GerberWarn>
        {t('basicInfo.warning')}
          <div>{t('basicInfo.warningOne')}</div>
          <div>{t('basicInfo.warningTwo')}</div>
          <div>{t('basicInfo.warningThree')}</div>
        </Style.GerberWarn>
      </Modal>
    </div >
  );
}

const mapStateToProps = ({ DataProgress: { dataProgress } }) => {
  return {
    dataProgress,
  };
};
const mapDispatchToProps = {
  changedataProgress () {
    return {
      type: 'change_dataProgress',
    };
  },
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BasicInfo));