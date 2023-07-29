import React, { Suspense } from "react";
import { Redirect, Route } from "react-router-dom";
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import SideMenu from "../components/sidemenu/SideMenu";
import TopHeader from "../components/topheader/TopHeader";
import WorkFlow from './workflow/WorkFlow'
import GuideLine from './guideline/GuideLine'
import User from './user/User'
import NoPermission from './nopermission/NoPermission'
import { Layout, Spin } from "antd";
import ProjectBox from "./projectlist/projectinfo/ProjectBox";
import ProjectList from "./projectlist/ProjectList";
import Cockpit from "./cockpit/Cockpit";
import CockpitDetail from "./cockpit/CockpitDetail";
import store from '../mobx/store';
import { Observer } from 'mobx-react';

const { Content } = Layout;
// const ProjectList = lazy(() => import('./projectlist/ProjectList'))

export default function PcbLayout () {
  return (
    <Observer>
      {
        () => {
          return <Layout>
            <SideMenu />
            <Layout className="site-layout">
              <TopHeader />
              <Content
                className="site-layout-background"
                style={{ minHeight: 280, overflowX: "hidden" }}
              >
                <Spin spinning={store.Projectloading} delay={500}>

                  <Suspense fallback={<div>Loading...</div>}>
                    <CacheSwitch>
                      <Route
                        path="/projectlist/info/:id/:classification"
                        component={ProjectBox}
                      />
                      <CacheRoute path='/projectlist' component={ProjectList} exact />
                      <CacheRoute path='/cockpit' component={Cockpit} exact />
                      <Route path="/cockpit/detail/:id/:classification" component={CockpitDetail} />\
                      <Route path='/workflow' component={WorkFlow} exact />
                      <Route path='/guideline' component={GuideLine} exact />
                      <Route path='/user' component={User} exact />
                      <Redirect from='/' to={localStorage.getItem('sidekey') === null ? '/projectlist' : localStorage.getItem('sidekey')} exact />
                      <Route path='*' component={NoPermission} />
                    </CacheSwitch>
                  </Suspense>
                </Spin>
              </Content>
            </Layout>
          </Layout>
        }
      }
    </Observer>

  );
}
