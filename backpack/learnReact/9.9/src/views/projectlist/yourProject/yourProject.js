import React, { useState, useEffect } from "react";
import { getRfqList, getRdList, getAwardList, getCustomer, getProduct } from "@/api/index";
import { useTranslation } from "react-i18next";
import { Button, Select, Form, Input, DatePicker, Tabs, Row, Col } from "antd";
import * as Style from "../ProjectListStyle";
import RFQProject from "./RFQProject";
import RDProject from "./RDProject";
import AwardProject from "./AwardProject";
import Icon from "@/icon/Icon";
import moment from "moment";

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

export default function YourProject () {

  const [form] = Form.useForm();

  const [totalrRfq, setTotalRfq] = useState('0');

  const [totalRd, setTotalRd] = useState('0');

  const [totalAward, setTotalAward] = useState('0');

  const [rfq, setRFQData] = useState([]);

  const [RD, setRDData] = useState([]);

  const [Award, setAwardData] = useState([]);

  const [customer, setCustomer] = useState([]);

  const [productSlect, setProduct] = useState([]);

  const [formData, setFormData] = useState();

  const [tabKey, setTabKey] = useState('1');

  const [inputIsDisabled, setInputIsDisabled] = useState(true)

  const { t } = useTranslation();

  // clear 清空form數據按鈕
  const onReset = () => {
    form.resetFields();
  };
  //恢復顯示所有 Ongoing Project 
  const onChangeState = () => {
    setFormData(undefined);
    form.setFieldsValue({
      status: '1'
    });
    getRfqList({
      query: {
        status: 1,
        rangeParams: {
          projectProType: 1,
        }
      }
    }).then((res) => {
      setRFQData(res.data.data);
      setTotalRfq(res.data.pagination.total);
    });
    getRdList({
      query: {
        status: 1,
        rangeParams: {
          projectProType: 1,
        }
      }
    }).then((res) => {
      setRDData(res.data.data);
      setTotalRd(res.data.pagination.total);
    });
    getAwardList({
      query: {
        status: 1,
        rangeParams: {
          projectProType: 1,
        }
      }
    }).then((res) => {
      setAwardData(res.data.data);
      setTotalAward(res.data.pagination.total);
    });
  };
  //customer和product下拉框数据
  useEffect(() => {
    getCustomer({
      projectProType: 1
    }).then(res => {
      setCustomer(res.data.data);
    });

    getProduct({
      projectProType: 1
    }).then(res => {
      setProduct(res.data.data);
    });
    onChangeState();
  }, []);//eslint-disable-line

  // search 數據查詢按鈕
  const onFinish = (FormData) => {
    setFormData(FormData);
    const { coderfq, code, inputValue, customer, product, status } = FormData;
    // 獲取rfq數據
    getRfqList({
      query: {
        rfqCode: coderfq === 'rfqCode' ? inputValue : null,
        projectName: coderfq === 'projectName' ? inputValue : null,
        customer: customer,
        product: product,
        status: status,
        rangeParams: {
          projectProType: 1,
          createStartTime: FormData?.rangeParams === undefined ? '' : parseInt(moment(FormData.rangeParams[0]).valueOf() / 1000),
          createEndTime: FormData?.rangeParams === undefined ? '' : parseInt(moment(FormData.rangeParams[1]).valueOf() / 1000), //开始时间
        }
      }
    }).then(res => {
      setRFQData(res.data.data);
      setTotalRfq(res.data.pagination.total);
    });
    // 獲取rd數據
    getRdList({
      query: {
        projectCode: code === 'projectCode' ? inputValue : null,
        projectName: code === 'projectName' ? inputValue : null,
        plmForm: code === 'plmForm' ? inputValue : null,
        pcbNo: code === 'pcbNo' ? inputValue : null,
        customer: customer,
        product: product,
        status: status,
        rangeParams: {
          projectProType: 1,
          plmCreateStartTime: FormData.rangeParams === undefined ? '' : parseInt(moment(FormData.rangeParams[0]).valueOf() / 1000),
          plmCreateEndTime: FormData.rangeParams === undefined ? '' : parseInt(moment(FormData.rangeParams[1]).valueOf() / 1000), //开始时间
        }
      }
    }).then(res => {
      setRDData(res.data.data);
      setTotalRd(res.data.pagination.total);
    });
    // 獲取award數據
    getAwardList({
      query: {
        projectCode: code === 'projectCode' ? inputValue : null,
        projectName: code === 'projectName' ? inputValue : null,
        plmForm: code === 'plmForm' ? inputValue : null,
        pcbNo: code === 'pcbNo' ? inputValue : null,
        customer: customer,
        product: product,
        status: status,
        rangeParams: {
          projectProType: 1,
          plmCreateStartTime: FormData.rangeParams === undefined ? '' : parseInt(moment(FormData.rangeParams[0]).valueOf() / 1000),
          plmCreateEndTime: FormData.rangeParams === undefined ? '' : parseInt(moment(FormData.rangeParams[1]).valueOf() / 1000), //开始时间
        }
      }
    }).then(res => {
      setAwardData(res.data.data);
      setTotalAward(res.data.pagination.total);
    });
  };
  //獲取數據總量 

  const gettotalrfq = (total) => {
    setTotalRfq(total);
  }

  const gettotalrd = (total) => {
    setTotalRd(total);
  }

  const gettotalaward = (total) => {
    setTotalAward(total);
  }
  // 切換表格時的處理函數
  const handleChangeTab = (key) => {
    if (key === '1') {
      setTabKey('1');
    }
    else if (key === '2') {
      setTabKey('2');
    }
    else {
      setTabKey('3');
    }
  }

  const handleChangeProject = (value) => {
    setInputIsDisabled(false)
  }

  return (
    <div>
      <Style.StyledForm
        form={form}
        onFinish={onFinish}
        initialValues={{ 'status': '1' }}
        autoComplete="off"
      >
        <Row gutter={4}>
          <Col span={3}>
            {tabKey === "1" &&
              <Form.Item name="coderfq">
                <Select
                  onChange={handleChangeProject}
                  placeholder={t('projectList.selectProject')}
                  style={{ width: "100%" }}
                >
                  <Option value='rfqCode'>{t('projectList.rfqCode')}</Option>
                  <Option value="projectName">{t('projectList.projectName')}</Option>
                </Select>
              </Form.Item>
            }
            {tabKey !== "1" &&
              <Form.Item name="code">
                <Select
                  onChange={handleChangeProject}
                  placeholder={t('projectList.selectProject')}
                  style={{ width: "100%" }}
                >
                  <Option value="projectCode">{t('projectList.projectCode')}</Option>
                  <Option value="projectName">{t('projectList.projectName')}</Option>
                  <Option value="plmForm">{t('projectList.plmForm')}</Option>
                  <Option value="pcbNo">{t('projectList.pcbNo')}</Option>
                </Select>
              </Form.Item>}
          </Col>
          <Col span={3}>
            <Form.Item name="inputValue">
              <Input
                disabled={inputIsDisabled}
                placeholder={t('projectList.inputVaule')}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="customer">
              <Select
                placeholder={t('projectList.selectCustomer')}
                style={{ width: "100%" }}
                listHeight={150}
              >
                {customer.map((item, index) => {
                  return (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="product">
              <Select
                placeholder={t('projectList.selectProduct')}
                style={{ width: "100%" }}
                listHeight={150}
              >
                {productSlect.map((item, index) =>
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="status">
              <Select
                style={{ width: "100%" }}
              >
                <Option value="1">{t('projectList.onging')}</Option>
                <Option value="2">{t('projectList.canceled')}</Option>
                <Option value="3" >{t('projectList.closed')}</Option>
                <Option value="4" >Onhold</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="rangeParams" >
              <RangePicker
                allowClear={false}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Button
                style={{
                  background: "#333333",
                  color: "white",
                  borderRadius: "4px",
                  width: "100%"
                }}
                htmlType="submit"
              >
                {t('projectList.search')}
              </Button>
            </Form.Item>
          </Col>
          <Col span={1}>
            <Form.Item>
              <Button
                htmlType="button"
                type="text"
                onClick={onReset}
                style={{

                  width: "100%",
                  fontFamily: "Microsoft JhengHei",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#333333"
                }}
              >
                {t('projectList.clear')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Style.StyledForm>
      <Style.Sum>
        {t('projectList.result')}
        <Style.ResetImg>
          <Icon.Reset onClick={onChangeState} />
        </Style.ResetImg>
        <Style.Reset>{t('projectList.reset')}</Style.Reset>
      </Style.Sum>
      <div style={{ backgroundColor: "#ffffff" }}>
        <Style.StyleTabsBottom>
          <Tabs
            height={1}
            defaultActiveKey='1'
            onChange={handleChangeTab}
          >
            <TabPane tab={`${t('rfqProject.title')}(${totalrRfq})`} key="1">
              <RFQProject
                data={rfq}
                gettotalrfq={gettotalrfq}
                totalrfq={totalrRfq}
                FormData={formData}
                keyUrl="1"
              />
            </TabPane>
            <TabPane tab={`${t('rdProject.title')}(${totalRd})`} key="2">
              <RDProject
                data={RD}
                gettotalrd={gettotalrd}
                totalRd={totalRd}
                FormData={formData}
                keyUrl="2"
              />
            </TabPane>
            <TabPane tab={`${t('awardProject.title')}(${totalAward})`} key="3">
              <AwardProject
                data={Award}
                gettotalaward={gettotalaward}
                totalAward={totalAward}
                FormData={formData}
                keyUrl="3"
              />
            </TabPane>
          </Tabs>
        </Style.StyleTabsBottom>
      </div>
    </div >
  );
}
