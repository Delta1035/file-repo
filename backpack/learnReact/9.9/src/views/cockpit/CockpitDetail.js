import React from 'react';
import { UserContextProvider } from '@/userstore/userStore';
import BasicInfo from '../projectlist/projectinfo/basicinfo/BasicInfo';
import ProjectStatus from './projectStatus/ProjectStatus';
import FunctionStatus from './functionStatus/FunctionStatus';
import DetailInfo from './detailInfo/DetailInfo';


export default function CockpitDetail (props) {
  return (
    <UserContextProvider id={props.match.params.id}>
      <BasicInfo />
      <ProjectStatus />
      <FunctionStatus />
      <DetailInfo />
    </UserContextProvider>
  )
}
