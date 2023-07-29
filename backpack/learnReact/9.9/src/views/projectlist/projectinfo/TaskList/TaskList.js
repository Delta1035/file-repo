import React, { useState } from 'react';
import { Button, Input, Select, Table, Tooltip, Col, Row } from 'antd';
import * as Style from '../../ProjectListStyle';
import { useTranslation } from "react-i18next";
import store from '@/mobx/store';
import TaskListEdit from './tasklistedit/TaskListEdit';
import TaskTable from './TaskTable';
import { useEffect } from 'react';
import { selectList, TaskLists, currentRoleDevelopProgress, allFunctions, taskSearchBoxData } from '@/api/index'
import AppContext from '@/createContext/createContext';
import { Observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { useUserStore } from '@/userstore/userStore'
import { SearchOutlined } from '@ant-design/icons'
import TaskListEditSearch from './tasklistedit/TaskListEditSearch';

const { Option } = Select;
const morderlist = {
  1: 'Design in / ME Stacking',
  2: 'Placement',
  3: 'P1.1',
  4: 'Routing',
  5: 'Gerber release'
}

// 通过切换不同的母階来获取其对应的value值 来筛选出对应的子皆的的数据 然后循环渲染在dom上

// 组件
function TaskList (props) {

  const { perms } = useUserStore()

  //用戶數組
  const [functions, setFunctions] = useState([])

  //默認用戶數組
  const [firstfunctions, setFirstfunctions] = useState([])

  const [selectdata, setSelectdata] = useState([])

  const [morders, setMorders] = useState([]);
  // 子皆下拉框的对象数组
  const [corders, setCrders] = useState({});
  // 任务列表 的数据  会通过usecontext传递给table组件
  const [datetasklist, setDatetasklist] = useState([])
  //联级切换使用的  设置这个可以让在母階切换时候 子皆下拉框随着变动
  const [secondCorder, setSecondCorder] = useState([])

  // 获取用户切换的value
  const [user, setUser] = useState('')

  // 母階切换的value值
  const [typeId, settypeId] = useState(1);

  const [childorderlist, setChildorderlist] = useState({})

  // 获取子皆的value值
  const [secondValue, setSecondValue] = useState('')

  // 获取子階的key值
  const [childkey, setChildkey] = useState('')

  // 获取点击显示列表后存储valuehekey值 用来传给 tasklistedit 来刷新页面使用
  const [taskvaluekeyid, setTaskvaluekeyid] = useState({})

  const [currentprogressdata, setCurrentprogressdata] = useState([])

  const [filtercurrentprogressdata, setFiltercurrentprogressdata] = useState([])

  const [isOnclickSearch, setIsOnclickSearch] = useState(true)

  const [searchselectdata, setSearchSelectData] = useState({})

  const { t } = useTranslation();
  // 母階子階下拉数据的获取
  useEffect(() => {
    allFunctions().then(response => {
      setFunctions(response.data.data)
      setFirstfunctions(response.data.data[0])
      setUser(response.data.data[0])
      selectList(
        {
          "plmCode": props.match.params.id,
          "role": response.data.data[0]
        }
      ).then(res => {
        setSelectdata(res.data.data.pcsList)
        setMorders(res.data.data.parentStageValueList)
        setCrders(res.data.data.childrenStageValueMap)
        Object.keys(morderlist).forEach((index) => {
          if (morderlist[index] === res.data.data.parentStageValueList[0]) {
            setSecondCorder(res.data.data.childrenStageValueMap[index])
            setChildorderlist(res.data.data.pcsList.filter(item => item.parentStageOrder.toString() === index.toString()))
            store.changeCircle(Number(index));
            settypeId(index)

          }
        })

        // 页面初始化 默认请求三个选项的第一个选项
        TaskLists({
          'childrenStageId': res.data.data.pcsList[0]?.childrenStageList[0].childrenStageActualOrder,
          'childrenStageNo': res.data.data.pcsList[0]?.childrenStageList[0].childrenStageViewOrder,
          'parentStageId': res.data.data.pcsList[0]?.parentStageOrder,
          'plmCode': props.match.params.id,
          "role": response.data.data[0]
        }).then(res => {
          setDatetasklist(res.data.data)
        })
      })
      console.log('progress2');
      currentRoleDevelopProgress({
        plmCode: props.match.params.id,
        role: response.data.data[0]
      }).then(res => {
        // task完成更新当前母階进度
        const progressdatanew = res.data.data.filter(item => item.name === morderlist[typeId])
        setFiltercurrentprogressdata(progressdatanew)
        setCurrentprogressdata(res.data.data)
      })

    })

  }, [props.match.params.id])//eslint-disable-line





  useEffect(() => {
    setChildorderlist(selectdata?.filter(item => item.parentStageOrder.toString() === typeId.toString()))

  }, [typeId, selectdata])


  // 用户部门触发value
  const handleFirstuserchange = (value) => {
    setIsOnclickSearch(true)
    setUser(value)
    setFirstfunctions(value)

    setSecondValue('')
    // 切換用戶請求 報告當前進度請求


    selectList(
      {
        "plmCode": props.match.params.id,
        "role": value
      }
    ).then(response => {
      setSelectdata(response.data.data.pcsList)
      setMorders(response.data.data.parentStageValueList)
      setCrders(response.data.data.childrenStageValueMap)
      Object.keys(morderlist).forEach((index) => {
        if (morderlist[index] === response.data.data.parentStageValueList[0]) {
          setSecondCorder(response.data.data.childrenStageValueMap[index])
          setChildorderlist(response.data.data.pcsList.filter(item => item.parentStageOrder.toString() === index.toString()))
          store.changeCircle(Number(index));
          settypeId(index)
          currentRoleDevelopProgress({
            plmCode: props.match.params.id,
            role: value
          }).then(res => {
            // task完成更新当前母階进度
            const progressdatanew = res.data.data.filter(item => item.name === morderlist[index])
            setFiltercurrentprogressdata(progressdatanew)
            setCurrentprogressdata(res.data.data)
          })
        }

      })
      //存储当前数据给tasklistedit 做关闭页面的时候刷新使用
      const taskvaluekeyid = {}
      taskvaluekeyid.secondvalue = response.data.data.pcsList[0]?.childrenStageList[0].childrenStageActualOrder.toString()
      taskvaluekeyid.childkey = response.data.data.pcsList[0]?.childrenStageList[0].childrenStageViewOrder.toString()
      taskvaluekeyid.mothvalue = response.data.data.pcsList[0]?.parentStageOrder.toString()
      taskvaluekeyid.user = value
      setTaskvaluekeyid(taskvaluekeyid)
      // 页面初始化 默认请求三个选项的第一个选项
      TaskLists({
        'childrenStageId': response.data.data.pcsList[0]?.childrenStageList[0].childrenStageActualOrder,
        'childrenStageNo': response.data.data.pcsList[0]?.childrenStageList[0].childrenStageViewOrder,
        'parentStageId': response.data.data.pcsList[0]?.parentStageOrder,
        'plmCode': props.match.params.id,
        "role": value
      }).then(res => {
        setDatetasklist(res.data.data)
      })
    })

  }




  // 母階选择后触发的事件
  const handleMorderChange = (value, lable) => {
    setIsOnclickSearch(true)
    setMorders(value)
    setSecondCorder(corders[value]);
    settypeId(value)
    store.changeCircle(Number(value));
    setSecondValue('')
    // 选择不同母階更新当前母階进度


    const selectprogressdata = currentprogressdata.filter(item => item.name === lable.children)
    setFiltercurrentprogressdata(selectprogressdata)


  };

  // confirm后更新一次进度数据 通过获取请求
  useEffect(() => {
    if (user !== '') {
      console.log('progress1');
      currentRoleDevelopProgress({
        plmCode: props.match.params.id,
        role: user
      }).then(res => {
        // task完成更新当前母階进度
        const progressdatanew = res.data.data.filter(item => item.name === morderlist[typeId])
        setFiltercurrentprogressdata(progressdatanew)
        setCurrentprogressdata(res.data.data)
      })
    }

  }, [props.dataProgress, props.match.params.id])//eslint-disable-line


  // 子階选择后触发的事件
  const onSecondCorderChange = (value, key) => {
    setIsOnclickSearch(true)
    setChildkey(key.key)
    setSecondValue(value)
    setSecondCorder(value)

  };

  // 显示任务咨询button按钮显示的任务列表
  const HandleShowTask = () => {
    setIsShowSelectTable(true)
    setIsShowSearchEdit(false)

    //存储当前数据给tasklistedit 做关闭页面的时候刷新使用
    const taskvaluekeyid = {}
    taskvaluekeyid.secondvalue = secondValue.toString()
    taskvaluekeyid.childkey = childkey
    taskvaluekeyid.mothvalue = typeId.toString()
    taskvaluekeyid.user = user
    setTaskvaluekeyid(taskvaluekeyid)
    // 判断当用户不选子皆的时候默认子皆的第一个选项
    if (secondValue === '') {

      //获取当前用户如果不点选select下拉框的时候默认获取当前下拉框的第一个选项
      const childrenStageList = selectdata.filter(item => item.parentStageOrder.toString() === typeId.toString())
      let secondValuen1 = childrenStageList[0].childrenStageList[0].childrenStageActualOrder
      let childkeyn1 = childrenStageList[0].childrenStageList[0].childrenStageViewOrder

      // 获取默认列表数据
      TaskLists({
        'childrenStageId': secondValuen1,
        'childrenStageNo': childkeyn1,
        'parentStageId': typeId,
        'plmCode': props.match.params.id,
        "role": user
      }).then(res => {
        setDatetasklist(res.data.data)
      })

    } else {
      // 获取用户选择后列表数据

      TaskLists({
        'childrenStageId': secondValue,
        'childrenStageNo': childkey,
        'parentStageId': typeId,
        'plmCode': props.match.params.id,
        "role": user
      }).then(res => {
        setDatetasklist(res.data.data)
      })
    }
  }

  const handleSearchButton = () => {
    setIsShowSelectTable(true)
    setIsShowSearchEdit(false)
    const { role, parentStageId, childrenStageId } = searchselectdata


    TaskLists({
      'childrenStageId': childrenStageId,
      'childrenStageNo': childrenStageId,
      'parentStageId': parentStageId,
      'plmCode': props.match.params.id,
      "role": role
    }).then(res => {
      setDatetasklist(res.data.data)

    })
  }
  const [oldselect, SetOldSelect] = useState({})
  //搜索详情页点击显示任何活动button按钮触发操作
  const handleOnclickSearch = (value, parentStageId, childrenStageId, parentName) => {
    setUser(value)
    setFirstfunctions(value)
    setSearchSelectData({
      role: value,
      parentStageId,
      childrenStageId,
      parentName
    })
    let oldmorders = (morders instanceof Array) ? 1 : morders
    let oldsecondCorder = (secondCorder instanceof Array) ? 1 : secondCorder
    SetOldSelect({
      firstfunctions,
      oldmorders, oldsecondCorder
    })


    selectList(
      {
        "plmCode": props.match.params.id,
        "role": value
      }
    ).then(response => {
      setSelectdata(response.data.data.pcsList)
      setChildorderlist(response.data.data.pcsList.filter(item => item.parentStageOrder.toString() === parentStageId.toString()))
      setCrders(response.data.data.childrenStageValueMap)
      setSecondCorder(response.data.data.childrenStageValueMap[parentStageId])
      setSecondCorder(Number(childrenStageId))
      setMorders(response.data.data.parentStageValueList)
      setMorders(Number(parentStageId))
      store.changeCircle(Number(parentStageId));
      settypeId(parentStageId)
    })

  }
  // 恢復上一次select數據
  const recoverOldselect = () => {
    setIsOnclickSearch(true)
    const { firstfunctions, oldmorders, oldsecondCorder } = oldselect
    setUser(firstfunctions)

    setFirstfunctions(firstfunctions)
    selectList(
      {
        "plmCode": props.match.params.id,
        "role": firstfunctions
      }
    ).then(response => {
      setSelectdata(response.data.data.pcsList)
      setChildorderlist(response.data.data.pcsList.filter(item => item.parentStageOrder.toString() === oldmorders.toString()))
      setCrders(response.data.data.childrenStageValueMap)

      setSecondCorder(response.data.data.childrenStageValueMap[oldmorders])
      setSecondCorder(oldsecondCorder)
      setMorders(response.data.data.parentStageValueList)
      setMorders(oldmorders)
      store.changeCircle(Number(oldmorders));
      settypeId(oldmorders)
      setChildkey(oldsecondCorder)
      setSecondValue(oldsecondCorder)
      setUser(firstfunctions)
      currentRoleDevelopProgress({
        plmCode: props.match.params.id,
        role: firstfunctions
      }).then(res => {
        // task完成更新当前母階进度
        const progressdatanew = res.data.data.filter(item => item.name === morderlist[oldmorders])
        setFiltercurrentprogressdata(progressdatanew)
        setCurrentprogressdata(res.data.data)
      })
    })
    getTaskList(oldsecondCorder, oldsecondCorder, oldmorders, firstfunctions)
  }
  // tasklistedit 页面关闭的时候做刷新使用的
  const getTaskList = (secondValue, childkey, typeId, user) => {
    TaskLists({
      'childrenStageId': secondValue,
      'childrenStageNo': childkey,
      'parentStageId': typeId,
      'plmCode': props.match.params.id,
      "role": user
    }).then(res => {
      setDatetasklist(res.data.data)
    })
  }
  const Searchcolumns = [
    {
      dataIndex: 'parentName',
      width: 170
    },
    {
      dataIndex: 'childrenName',
      width: 170,
      ellipsis: { showTitle: false },
      render: name => (
        <Tooltip placement="topLeft" title={name}>
          {name}
        </Tooltip>
      )
    },
    {
      dataIndex: 'taskName',
      ellipsis: { showTitle: false },
      render: name => (
        <Tooltip placement="topLeft" title={name}>
          {name}
        </Tooltip>
      )
    },

  ];
  const [backsearchdata, setBackSearchData] = useState([])
  const [filtersearchdata, setFilterSearchData] = useState([])
  const [isShowSearchEdit, setIsShowSearchEdit] = useState(false)
  const [isShowSearchTable, setIsShowSearchTable] = useState(false)
  const [isShowSelectTable, setIsShowSelectTable] = useState(true)
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    taskSearchBoxData({}).then(res => {
      setBackSearchData(res.data.data.taskSearchBoxData)
    })
  }, [])

  // 搜索框输入监听
  const handleSearchValue = (event) => {
    setInputValue(event.target.value)
    if (event.target.value === '') {
      setIsShowSearchTable(false)
    } else {
      var newsearchdata = backsearchdata.filter(item => item.taskName.toUpperCase().includes(event.target.value.toUpperCase()) || item.childrenName.toUpperCase().includes(event.target.value.toUpperCase()))
      setFilterSearchData(newsearchdata.slice(0, 5))
      setIsShowSearchTable(true)
    }
  }
  const [showListEdit, setShowListEdit] = useState(false);
  const [showTable, setShowTable] = useState(true);

  return (
    <Observer>
      {
        () => {
          return <>
            <AppContext.Provider value={{ datetasklist }}>
              <Style.TaskList>
                <Row gutter={20}>
                  <Col span={1.5}>
                    <Style.TaskTitle weight={400} style={{ marginLeft: '16px' }}>{t('TaskList.TaskTitle')}</Style.TaskTitle>

                  </Col>
                  <Col span={2}>
                    <Select
                      value={firstfunctions}
                      style={{ width: '100%' }}
                      onSelect={handleFirstuserchange}
                    >
                      {
                        functions.map((item, index) => (<Option key={item} value={item}>{item}</Option>))
                      }
                    </Select>
                  </Col>

                  <Col span={4}>
                    <Select
                      value={morders}
                      style={{
                        width: '100%',
                      }}
                      onSelect={handleMorderChange}
                    >
                      {selectdata?.map((item) => (
                        <Option value={item.parentStageOrder} key={item.parentStageOrder}>
                          {item.parentStageName}
                        </Option>
                      ))}
                    </Select>
                  </Col>

                  <Col span={3}>
                    <Style.TaskTitle color='#486ADF' backgroundColor='#EDF6F9' style={{ width: "100%", height: "32px" }}>
                      {t('TaskList.progress')} {typeId.toString() === '1' ? Math.round(currentprogressdata[0]?.finishedCount / currentprogressdata[0]?.taskCount * 100) : Math.round(filtercurrentprogressdata[0].finishedCount / filtercurrentprogressdata[0].taskCount * 100)} %
                    </Style.TaskTitle>
                  </Col>

                  <Col span={6}>
                    <Select
                      style={{ width: '100%' }}
                      onSelect={onSecondCorderChange}
                      value={secondCorder}
                    >
                      {childorderlist[0]?.childrenStageList.map(item =>
                        <Option value={item.childrenStageActualOrder} key={item.childrenStageViewOrder}>{item.childrenStageName}</Option>
                      )}
                    </Select>
                  </Col>


                  <Col span={3}>
                    <Button data-testid="bule" type="primary" htmlType="submit" onClick={isOnclickSearch ? HandleShowTask : handleSearchButton} disabled={!(perms.includes('checklist:taskActivity:view') || perms.includes('checklist:attachment:viewOutput') || perms.includes('checklist:attachment:viewInput') || perms.includes('*:*:*'))} >
                      {t('TaskList.showTask')}
                    </Button>
                  </Col>
                  <Col span={0.5}>
                    <Style.Line></Style.Line>
                  </Col>
                  <Col span={3}>
                    <Style.SearchInput>
                      <Input style={{ width: '100%' }} onChange={handleSearchValue} value={inputValue}></Input>
                      <Style.SearchIcon>
                        <SearchOutlined />
                      </Style.SearchIcon>
                    </Style.SearchInput>
                  </Col>
                </Row>
                {isShowSearchTable && <Style.SearchTable>
                  <Style.TableTitle>{t('TaskList.tableTitle')}</Style.TableTitle>
                  <Table showHeader={false} columns={Searchcolumns} dataSource={filtersearchdata} rowKey={(record) => record.id} size='small' pagination={false} locale={{ emptyText: t('TaskList.emptyText') }} onRow={record => {
                    return {
                      onClick: event => {
                        localStorage.setItem('searchrecord', JSON.stringify(record))
                        setIsShowSearchEdit(true)
                        setIsShowSelectTable(false)
                        setIsShowSearchTable(false)
                        setIsOnclickSearch(false)
                        handleOnclickSearch(record.role, record.parentNo, record.childrenNo, record.parentName)
                      } // 点击行
                    };
                  }} />
                </Style.SearchTable>}
              </Style.TaskList>

              {
                isShowSelectTable &&

                <>{showTable && <TaskTable onClick={() => {
                  setShowTable(false)
                  setShowListEdit(true)
                }} />}

                  {showListEdit && <TaskListEdit HandleShowTask={HandleShowTask} getTaskList={getTaskList} taskvaluekeyid={taskvaluekeyid} user={user} onClick={() => {
                    setShowTable(true)
                    setShowListEdit(false)
                  }} ></TaskListEdit>}
                </>

              }


              {isShowSearchEdit &&
                <TaskListEditSearch getTaskList={getTaskList} user={user} onClick={() => {
                  setIsShowSelectTable(true)
                  setIsShowSearchEdit(false)
                  setInputValue('')
                  // 恢復上一次數據
                  recoverOldselect()

                }} ></TaskListEditSearch>
              }
            </AppContext.Provider>
          </>
        }
      }
    </Observer >
  );
}


const mapStateToProps = ({ DataProgress: { dataProgress } }) => ({
  dataProgress
})

export default connect(mapStateToProps)(withRouter(TaskList))
