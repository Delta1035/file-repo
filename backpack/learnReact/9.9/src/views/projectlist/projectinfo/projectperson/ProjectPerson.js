import React, { useState, useEffect, } from 'react';
import { getTeamMemberList, getAllTeamMembers, updateMembersInfo } from '@/api/index';
import { withRouter } from 'react-router-dom';
import { Collapse, List, Descriptions, Modal, Form, Select, Tag, Tooltip, Button, message } from 'antd';
import { BackButton, SaveButton, LayoutEditFooter, Member } from './style';
import { EditOutlined } from '@ant-design/icons'
import { useUserStore } from '@/userstore/userStore'
import * as Style from '../../ProjectListStyle';
import { TitleContent } from '@/components/TitleContent/TitleContent';
import { useTranslation } from 'react-i18next';
import { Observer } from 'mobx-react';
import store from "@/mobx/store";

const { Panel } = Collapse;
const { Option } = Select;

const ProjectPerson = (props) => {

  const [formperson] = Form.useForm();

  const [dataTeamMember, setDataTeamMember] = useState({});

  const [isShowModal, setIsShowModal] = useState(false);

  const [memberData, setMemberData] = useState([]);

  const [option, setOption] = useState([]);

  const [emailList, setEmailList] = useState([]);

  const [isupdateinfo, setIsupdateinfo] = useState(false);

  const { perms } = useUserStore();

  const plmCode = props.match.params.id;

  const classification = props.match.params.classification;

  const projectCode = store.projectCode;

  const plmForm = store.plmForm;

  const rfqCode = store.rfqCode;
  const [memberoutsideemail, setMemberOutsideEmail] = useState([]);

  const [layoutLeader, setLayoutLeader] = useState([]);

  const [result, setResult] = useState(true);

  const [state, setState] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    getTeamMemberList({
      plmForm: plmCode,
      classification,
    }).then((res) => {
      setDataTeamMember(res.data.data)
      setMemberOutsideEmail(res.data.data[4]?.memberOutsideEmailInfo);
      setLayoutLeader(res.data.data[4]?.leadInfo);
      setMemberData(res.data.data[4]?.memberEmailInfo === null ? [] : res.data.data[4]?.memberEmailInfo)
      formperson.setFieldsValue({
        Member: res.data.data[4]?.memberEmailInfo === null ? [] : res.data.data[4]?.memberEmailInfo,
        Leader: layoutLeader === null ? [] : layoutLeader
      });
    })
  }, [classification, plmCode, state, isupdateinfo, formperson]);//eslint-disable-line

  // const optionsTest = [];
  // for (let i = 10; i < 36; i++) {
  //   optionsTest.push({
  //     // username: i.toString(36) + i,
  //     value: i.toString(36) + i,
  //   });
  // }

  // 獲取teamMember人員
  const hanldeTeamMember = async () => {
    const allMembers = await getAllTeamMembers();
    const optionList = allMembers.data.data;
    const TeamMember = optionList.map((item, index) => <Option key={index} value={item?.username}>{item?.username}</Option>);
    setOption(TeamMember);
    const emailList = optionList.map((item) => item?.username);
    setEmailList(emailList);
  };
  // 獲取select框中最新輸入的值
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    const selectValue = value.slice(-1).toString();
    setResult(emailList.includes(selectValue));
  };

  const handleUpdate = () => {
    formperson.validateFields().then(values => {
      updateMembersInfo({
        email: values.Member,
        function: 'Layout',
        projectCode: projectCode === null ? rfqCode : projectCode,
        plmForm: projectCode === null ? rfqCode : plmForm
      }).then((res) => {
        setDataTeamMember(res.data.data)
        message.success(t('projectPerson.modifySuccess'));
        setIsShowModal(false);
        setIsupdateinfo(!isupdateinfo);
      });
    })
  }

  const tagRenderLeader = (props) => {

    const { label, closable, onClose } = props;

    const value = '#1890FF';

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  const tagRender = (props) => {

    const { label, value, closable, onClose } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        color={
          result ? (memberoutsideemail?.includes(value) ? '' : '#1890FF') : (emailList.includes(value) ? (memberoutsideemail?.includes(value) ? '' : '#1890FF') : '')
        }
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }
        }
      >
        {label}
      </Tag >
    );
  };


  const ShowModal = () => {
    setIsShowModal(true);
  };

  const handleOk = () => {
    setIsShowModal(false);
  };

  const handleCancel = () => {
    setIsShowModal(false);
  };

  const FormItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const editIcon = <Button type='text' style={{ width: '40px' }} disabled={!(perms.includes('project:member:edit') || perms.includes('*:*:*'))}><EditOutlined onClick={() => { hanldeTeamMember(); ShowModal(); setState(!state) }} /></Button>

  return (
    <Observer>
      {
        () => {
          return (
            <div>
              <Style.Info>
                <Collapse expandIconPosition='end' ghost>
                  <Panel header={t('projectPerson.title')} key="1">
                    <Style.ProjectPerson>
                      <List
                        grid={{
                          gutter: 16,
                          xs: 2,
                          sm: 3,
                          md: 3,
                          lg: 4,
                          xl: 5,
                          xxl: 5,
                        }}
                        dataSource={dataTeamMember}
                        renderItem={(item) => {
                          if ((item.memberInfo == null || item.memberInfo.length <= 3) && (item.leadInfo == null || item.leadInfo?.length <= 2)) {
                            return (
                              <List.Item>
                                <Descriptions title={item.function} column={1} key={item.function}
                                  extra={item.function === 'Layout' ? editIcon : ''}
                                  labelStyle={{
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#D7D7D7',
                                  }}
                                  contentStyle={{
                                    color: '#333333',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                  }}>
                                  {(item.leadInfo == null) && <Descriptions.Item label={item.leadLabel}>{item.leadInfo}</Descriptions.Item>}
                                  {(item.leadInfo?.length < 3) && <Descriptions.Item label={item.leadLabel}>
                                    <div style={{ marginLeft: '22px' }}>
                                      {item.leadInfo.map((lead, index) => {
                                        return (
                                          <div key={index}>{lead}</div>
                                        );
                                      })}
                                    </div>
                                  </Descriptions.Item>}
                                  {/* {(item.leadInfo?.length === 1) && <Descriptions.Item label={item.leadLabel}>
                                    <div style={{ marginLeft: '22px', border:'1px solid blue'}}>
                                      {item.leadInfo.map((lead, index) => {
                                        return (
                                          <div key={index}>{lead}</div>
                                        );
                                      })}
                                    </div>
                                  </Descriptions.Item>} */}
                                  {(item.memberInfo == null) && <Descriptions.Item label={item.memberLabel}>{item.memberInfo}</Descriptions.Item>}
                                  {(item.memberInfo?.length < 2) && <Descriptions.Item label={item.memberLabel}>{item.memberInfo.toString()}</Descriptions.Item>}
                                  {(item.memberInfo?.length === 2) && <Descriptions.Item label={item.memberLabel}>
                                    <div>
                                      <Member>{item.memberInfo[0]}</Member>
                                      <Member>{item.memberInfo[1]}</Member>
                                    </div>
                                  </Descriptions.Item>}
                                  {(item.memberInfo?.length === 3) && <Descriptions.Item label={item.memberLabel} >
                                    <div>
                                      <Member>{item.memberInfo[0]}</Member>
                                      <Member>{item.memberInfo[1]}</Member>
                                      <Member>{item.memberInfo[2]}</Member>
                                    </div>
                                  </Descriptions.Item>}
                                </Descriptions>
                              </List.Item>
                            )
                          }
                          else if (item.memberInfo?.length > 3 && item.leadInfo?.length > 2) {
                            return (
                              <List.Item>
                                <Descriptions title={item.function} column={1} key={item.function}
                                  extra={item.function === 'Layout' ? editIcon : ''}
                                  labelStyle={{
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#D7D7D7',

                                  }}
                                  contentStyle={{
                                    color: '#333333',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    wordWwrap: ' break-word'
                                  }}>
                                  <Descriptions.Item label={item.leadLabel}>{item.leadInfo.slice(0, 2).toString() + '...'}</Descriptions.Item>
                                  <Descriptions.Item label={item.memberLabel} >
                                    <Tooltip
                                      title={<TitleContent data={item} />}
                                      defaultVisible={false}
                                      overlayStyle={{
                                        wordWrap: 'break-word',
                                        minWidth: '250px',
                                      }}
                                      overlayClassName={'newTooptip'}>
                                      <div>
                                        <Member>{item.memberInfo[0]}</Member>
                                        <Member>{item.memberInfo[1]}</Member>
                                        <div >{item.memberInfo[2] + `...(${item.memberInfo.length - 3})`}</div>
                                      </div>
                                    </Tooltip>
                                  </Descriptions.Item>
                                </Descriptions>
                              </List.Item>
                            )
                          } else if (item.memberInfo?.length > 3 && item.leadInfo == null) {
                            return (
                              <List.Item>
                                <Descriptions title={item.function} column={1} key={item.function}
                                  extra={item.function === 'Layout' ? editIcon : ''}
                                  labelStyle={{
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#D7D7D7',

                                  }}
                                  contentStyle={{
                                    color: '#333333',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    wordWwrap: ' break-word'
                                  }}>
                                  <Descriptions.Item label={item.leadLabel}>{item.leadInfo}</Descriptions.Item>
                                  <Descriptions.Item label={item.memberLabel} >
                                    <Tooltip title={<TitleContent data={item} />}
                                      placement='top'
                                      defaultVisible={false}
                                      overlayClassName={'newTooptip'}
                                      overlayStyle={{
                                        wordWrap: 'break-word',
                                        opacity: 1,
                                        minWidth: '250px',
                                      }}>
                                      <div>
                                        <div >{item.memberInfo[0]}</div>
                                        <div >{item.memberInfo[1]}</div>
                                        <div >{item.memberInfo[2] + `...(${item.memberInfo.length - 3})`}</div>
                                      </div>
                                    </Tooltip>
                                  </Descriptions.Item>
                                </Descriptions>
                              </List.Item>
                            )
                          }
                          else if (item.memberInfo == null && item.leadInfo?.length > 2) {
                            return (
                              <List.Item>
                                <Descriptions title={item.function} column={1}
                                  extra={item.function === 'Layout' ? editIcon : ''}
                                  labelStyle={{
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#D7D7D7',

                                  }}
                                  contentStyle={{
                                    color: '#333333',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    wordWwrap: ' break-word'
                                  }}>
                                  <Descriptions.Item label={item.leadLabel}>
                                    <Tooltip title={<TitleContent data={item} />}
                                      placement='top'
                                      defaultVisible={false}
                                      overlayClassName={'newTooptip'}
                                      overlayStyle={{
                                        wordWrap: 'break-word',
                                        opacity: 1,
                                        minWidth: '250px',
                                      }}>
                                      {item.leadLabel === 'Lead' ? (<div style={{ marginLeft: '22px' }}>
                                        <div >{item.leadInfo[0]}</div>
                                        <div >{item.leadInfo[1] + `...(${item.leadInfo.length - 2})`}</div>
                                      </div>)
                                        :
                                        (<div style={{ marginLeft: '22px' }}>
                                          {item.leadInfo.map((lead, index) => {
                                            return (
                                              <div key={index}>{lead}</div>
                                            );
                                          })}
                                        </div>)}
                                    </Tooltip>
                                  </Descriptions.Item>
                                  <Descriptions.Item label={item.memberLabel}>
                                    {item.memberInfo}
                                  </Descriptions.Item>
                                </Descriptions>
                              </List.Item>
                            )
                          } else if (item.memberInfo?.length > 3 && item.leadInfo?.length <= 2) {
                            return (
                              <List.Item>
                                <Descriptions title={item.function} column={1}
                                  extra={item.function === 'Layout' ? editIcon : ''}
                                  labelStyle={{
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#D7D7D7',
                                  }}
                                  contentStyle={{
                                    color: '#333333',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    wordWrap: 'break-word',
                                    width: '40px',
                                    whiteSpace: 'pre-line'
                                  }}>
                                  <Descriptions.Item label={item.leadLabel} >
                                    <div style={{ marginLeft: '22px' }}>{item.leadInfo}</div>
                                  </Descriptions.Item>
                                  <Descriptions.Item label={item.memberLabel} >
                                    <Tooltip
                                      title={<TitleContent data={item} />}
                                      defaultVisible={false}
                                      placement='top'
                                      overlayStyle={{
                                        wordWrap: 'break-word',
                                        minWidth: '250px',
                                        zIndex: 100,
                                        opacity: 1,
                                      }}
                                      overlayClassName={'newTooptip'}>
                                      <div>
                                        <Member>{item.memberInfo[0]}</Member>
                                        <Member>{item.memberInfo[1]}</Member>
                                        <div>{item.memberInfo[2] + `...(${item.memberInfo.length - 3})`}</div>
                                      </div>
                                    </Tooltip>
                                  </Descriptions.Item>
                                </Descriptions>
                              </List.Item>
                            )
                          }
                          else if (item.memberInfo?.length < 3 && item.leadInfo?.length > 2) {
                            return (

                              <List.Item>
                                <Descriptions title={item.function} column={1} key={item.function}
                                  extra={item.function === 'Layout' ? editIcon : ''}
                                  labelStyle={{
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    color: '#D7D7D7',

                                  }}
                                  contentStyle={{
                                    color: '#333333',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    wordWwrap: ' break-word'
                                  }}>
                                  <Descriptions.Item label={item.leadLabel}>{item.leadInfo.slice(0, 2).toString() + '...'}</Descriptions.Item>
                                  <Descriptions.Item label={item.memberLabel} >
                                    <Tooltip title={<TitleContent data={item} />}
                                      overlayStyle={{
                                        wordWwrap: ' break-word',
                                        opacity: 1,
                                        minWidth: '250px'
                                      }}
                                      overlayClassName={'newTooptip'}>
                                      {item.memberInfo.toString()}
                                    </Tooltip>
                                  </Descriptions.Item>
                                </Descriptions>
                              </List.Item>
                            )
                          }
                        }}
                      />
                    </Style.ProjectPerson>
                  </Panel >
                </Collapse >
              </Style.Info >
              <Modal
                forceRender
                title={t('projectPerson.modalTitle')}
                visible={isShowModal}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                footer={[
                  <LayoutEditFooter key="footer">
                    <BackButton key="back" onClick={handleCancel}>
                      {t('projectPerson.back')}
                    </BackButton>
                    <SaveButton key="save" onClick={handleUpdate}>
                      {t('projectPerson.save')}
                    </SaveButton>
                  </LayoutEditFooter>
                ]}
              >
                <Form
                  name="basic"
                  {...FormItemLayout}
                  autoComplete="off"
                  layout='vertical'
                  form={formperson}
                  initialValues={{ 'Leader': layoutLeader, 'Member': memberData }}
                >
                  <Form.Item
                    label={t('projectPerson.leader')}
                    name="Leader"
                  >
                    <Select style={{ minHeight: '30px' }} mode="tags" tagRender={tagRenderLeader} disabled></Select>
                  </Form.Item>
                  <Form.Item
                    label={t('projectPerson.member')}
                    name="Member"
                    style={{ marginTop: '20px' }}
                  >
                    <Select
                      onChange={handleChange}
                      mode="tags"
                      style={{
                        width: '100%',
                      }}
                      tagRender={tagRender}
                    // options={option}
                    >
                      {option}
                    </Select>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          )
        }
      }
    </Observer >

  )
}
export default withRouter(ProjectPerson)