import React from 'react';
import { Tabs } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import * as  Style from '../ProjectListStyle'
import YourProject from '../yourProject/yourProject';
import BUProject from '../buProject/BUProject';
import { Observer } from 'mobx-react';
const { TabPane } = Tabs;

export default function TabsProject () {

  const { t } = useTranslation();

  return (
    <Observer>
      {() => {
        return <>
          <Style.StyleTabs>
            <Tabs defaultActiveKey='1'>
              {/* your project 用黃色星星標註，以便於在BU project中快速辨認 */}
              <TabPane tab={<span><StarFilled style={{ color: '#F5C910' }} />{t('projectList.yourProject')}</span>} key="1">
                <YourProject />
              </TabPane>
              <TabPane tab={t('projectList.buProject')} key="2">
                <BUProject />
              </TabPane>
            </Tabs>
          </Style.StyleTabs >
        </>

      }}
    </Observer>

  )
}
