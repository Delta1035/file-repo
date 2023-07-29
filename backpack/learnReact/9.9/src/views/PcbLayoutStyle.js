import { memo } from 'react';
import styled from 'styled-components';
const color = {
  primary_1: '#000000',
  primary_2: '#333333',
  primary_3: '#797979',
  primary_4: '#C1C1C1',
  primary_5: '#00000033',
  primary_6: '#383838',
  primary_7: '#1E1E1E',
  primary_8: '#999999',
  primary_9: '#333333',
  gray_1: '#EBEBEB',
  gray_2: '#D7D7D7',
  gray_3: '#D9D9D9',
  gray_4: '#F2F2F2',
  gray_5: '#EDEDED',
  gray_6: '#CCCCCC',
  yellow_1: '#F5C910',
  yellow_2: '#FFFBE6',
  yellow_3: '#f5c910',
  blue_1: '#486ADF',
  blue_2: '#EDF6F9',
  blue_3: '#1890FF',
  red_1: '#FF0000',
  red_2: '#FFF2F1',
  red_3: '#000066',
  green_1: '#00CB3B',
  green_2: '#F6FFED',
  green_3: '#52C41A',
  white_1: '#FFFFFF',
  orange_1: '#F9AC14',
};

export const pcblayout = memo(styled.div`
  #components-layout-demo-responsive .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.2);

}

.site-layout-background {
  background: #EDEDED;
}

    #root,
    .ant-layout 
    {
      height: 100%;
    }

`)
