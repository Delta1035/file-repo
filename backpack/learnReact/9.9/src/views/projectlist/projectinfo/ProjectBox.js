import React from 'react'
import BasicInfo from './basicinfo/BasicInfo'
import ProjectPerson from './projectperson/ProjectPerson'
import * as Style from '../ProjectListStyle'
import { Tabs } from 'antd';
import ProjectGress from './project_progress/ProjectGress';
import TaskList from './TaskList/TaskList';
import { useTranslation } from 'react-i18next';
import { UserContextProvider } from '@/userstore/userStore';
import MessageBoard from './messageboard/SubjectList';


const { TabPane } = Tabs;

export default function ProjectBox (props) {

  const { t } = useTranslation();



  return (
    <UserContextProvider id={props.match.params.id}>
      <BasicInfo />
      <ProjectPerson />
      <Style.Info>
        <Tabs type="card" defaultActiveKey={props.match.params.classification === '1' ? '1' : '2'}>
          <TabPane tab={t('subjectList.title')} key="1">
            <MessageBoard></MessageBoard>
          </TabPane>
          <TabPane tab={t('ProjectGress.title')} key="2">
            <ProjectGress />
            <TaskList />
          </TabPane>
        </Tabs>
      </Style.Info>
    </UserContextProvider>
  )
}
