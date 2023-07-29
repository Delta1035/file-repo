import React, { useEffect, useState } from "react";
import { getRfqList, getRdList, getAwardList, getCustomer, getProduct } from "@/api/index";
import { Button, Select, Form, Input, DatePicker, Tabs, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { CockpitForm, CockpitTitle, Result, Reset, ResetImg, TabsBottom } from './CockpitStyle';
import RFQProject from "./projectList/RFQProject";
import RDProject from "./projectList/RDProject";
import AwardProject from "./projectList/AwardProject";
import moment from "moment";
import Icon from "@/icon/Icon";
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

export default function Cockpit () {

  const [form] = Form.useForm();

  const [totalRfq, setTotalRfq] = useState('0');

  const [totalRd, setTotalRd] = useState('0');

  const [totalAward, setTotalAward] = useState('0');

  const [rfqdata, setRFQData] = useState([]);

  const [rddata, setRDData] = useState([]);

  const [Award, setAwardData] = useState();

  const [tabKey, setTabKey] = useState('1');

  const [customer, setCustomer] = useState([]);

  const [productSlect, setProduct] = useState([]);
  // 搜索框中的值
  const [values, setValues] = useState();

  const { t } = useTranslation();

  const [inputIsDisabled, setInputIsDisabled] = useState(true)


  const onReset = () => {
    form.resetFields();
  };
  //恢復顯示所有 Ongoing Project 
  const onChangeState = () => {
    setValues(undefined);
    form.setFieldsValue({
      status: '1'
    });
    /* status 參數說明 
      1. 表示Ongoing狀態
      2. 表示Canceled狀態
      3. 表示Closed狀態
      4. 表示Onhold狀態
    */
    getRfqList({
      query: {
        status: 1,
        rangeParams: {
          projectProType: 2,
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
          projectProType: 2,
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
          projectProType: 2,
        }
      }
    }).then((res) => {
      setAwardData(res.data.data);
      setTotalAward(res.data.pagination.total);
    });
  };

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


  const onFinish = (values) => {
    setValues(values);
    const { coderfq, code, odd, customer, product, status } = values;
    getRfqList({
      query: {
        rfqCode: coderfq === 'rfqCode' ? odd : null,
        projectName: coderfq === 'projectName' ? odd : null,
        customer: customer,
        product: product,
        status: status,
        "rangeParams": {
          projectProType: 2,
          "createStartTime": values.rangeParams === undefined ? '' : parseInt(moment(values.rangeParams[0]).valueOf() / 1000),
          "createEndTime": values.rangeParams === undefined ? '' : parseInt(moment(values.rangeParams[1]).valueOf() / 1000), //开始时间
        }
      }
    }).then((res) => {
      setRFQData(res.data.data);
      setTotalRfq(res.data.pagination.total);
    });

    getRdList({
      query: {
        projectCode: code === 'projectCode' ? odd : null,
        projectName: code === 'projectName' ? odd : null,
        plmForm: code === 'plmForm' ? odd : null,
        pcbNo: code === 'pcbNo' ? odd : null,
        customer: customer,
        product: product,
        status: status,
        "rangeParams": {
          projectProType: 2,
          "plmCreateStartTime": values.rangeParams === undefined ? '' : parseInt(moment(values.rangeParams[0]).valueOf() / 1000),
          "plmCreateEndTime": values.rangeParams === undefined ? '' : parseInt(moment(values.rangeParams[1]).valueOf() / 1000), //开始时间
        }
      }
    }).then((res) => {
      setRDData(res.data.data);
      setTotalRd(res.data.pagination.total);
    });

    getAwardList({
      query: {
        projectCode: code === 'projectCode' ? odd : null,
        projectName: code === 'projectName' ? odd : null,
        plmForm: code === 'plmForm' ? odd : null,
        pcbNo: code === 'pcbNo' ? odd : null,
        customer: customer,
        product: product,
        status: status,
        "rangeParams": {
          projectProType: 2,
          "plmCreateStartTime": values.rangeParams === undefined ? '' : parseInt(moment(values.rangeParams[0]).valueOf() / 1000),
          "plmCreateEndTime": values.rangeParams === undefined ? '' : parseInt(moment(values.rangeParams[1]).valueOf() / 1000), //开始时间
        }
      }
    }).then((res) => {
      setAwardData(res.data.data);
      setTotalAward(res.data.pagination.total);
    });
  };
  // 獲取rfq rd award project的項目總數
  const gettotalrfq = (total) => {
    setTotalRfq(total);
  }

  const gettotalrd = (total) => {
    setTotalRd(total);
  }

  const gettotalaward = (total) => {
    setTotalAward(total);
  }

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
    <div style={{ margin: "24px 48px " }}>
      <CockpitTitle>Cockpit Project List</CockpitTitle>
      <div data-testid="OnGoing">
        <CockpitForm
          form={form}
          onFinish={onFinish}
          initialValues={{ status: '1' }}
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

              <Form.Item name="odd">
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
                  dropdownStyle={{}}
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
                  placeholder=""
                  style={{ width: "100%" }}
                >
                  <Option value="1">{t('projectList.onging')}</Option>
                  <Option value="2">{t('projectList.canceled')}</Option>
                  <Option value="3">{t('projectList.closed')}</Option>
                  <Option value="4">Onhold</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="rangeParams">
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
                    width: '100%',
                    fontFamily: "Microsoft JhengHei",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "14px",
                    textAlign: "center",
                    color: "#333333"
                  }}
                >
                  {t('projectList.clear')}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </CockpitForm>
        <Result>
          {t('projectList.result')}
          <ResetImg>
            <Icon.Reset onClick={onChangeState} />
          </ResetImg>
          <Reset>{t('projectList.reset')}</Reset>
        </Result>
        <div style={{ backgroundColor: "#ffffff" }}>
          <TabsBottom>
            <Tabs
              height={1}
              defaultActiveKey="1"
              onChange={handleChangeTab}
            >
              <TabPane tab={`RFQ Project(${totalRfq})`} key="1">
                <RFQProject
                  gettotalrfq={gettotalrfq}
                  datarfq={rfqdata}
                  totalRfq={totalRfq}
                  FormData={values}
                  keyUrl="1"
                />
              </TabPane>
              <TabPane tab={`RD Project(${totalRd})`} key="2">
                <RDProject
                  gettotalrd={gettotalrd}
                  datard={rddata}
                  totalRd={totalRd}
                  FormData={values}
                  keyUrl="2"
                />
              </TabPane>
              <TabPane tab={`Award Project(${totalAward})`} key="3">
                <AwardProject
                  gettotalaward={gettotalaward}
                  dataaward={Award}
                  totalAward={totalAward}
                  FormData={values}
                  keyUrl="3"
                />
              </TabPane>
            </Tabs>
          </TabsBottom>
        </div>
      </div>
    </div>
  )
}
