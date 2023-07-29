import React from 'react';
import { Progress } from 'antd';
import * as Style from '../../ProjectListStyle';
import useDatetimestamp from '@/hooks/datetimestamp';
import { useTranslation } from "react-i18next";

export default function ProGressCompont (props) {
  const { lable, data } = props;

  const { t } = useTranslation();

  //日期时间戳
  const datetimeFormat = useDatetimestamp();
  return (
    <div>
      <Style.CircleContent>
        <Progress
          type="circle"
          strokeLinecap="square"
          percent={props.percent}
          width={160}
          strokeColor={'#00CB3B'}
          format={(percent) => percent === 100 ? '100%' : `${percent}%`}
        />
        <Style.CircleTitle height={props.height} top={props.top}>
          <Style.CircleTitlediv><span>{lable?.title1}</span></Style.CircleTitlediv>
        </Style.CircleTitle>
        <Style.CircleTitleNum>{lable?.num}</Style.CircleTitleNum>
        {
          data.planTimeDisplayStatus === 1 ? <Style.ProgressDate marginTop="29px" color="#333333">
            {data.plan === 0 || data.plan === null ? '-' : datetimeFormat(data.plan * 1000)}
          </Style.ProgressDate> : <Style.ProgressDate marginTop="29px" color="#FF0000">
            {data.plan === 0 || data.plan === null ? '-' : datetimeFormat(data.plan * 1000)}
          </Style.ProgressDate>
        }
        {
          (data.actual === null || props.percent === 0) && <Style.ProgressDate marginTop="7px" color="#486ADF">
            -
          </Style.ProgressDate>
        }
        {
          props.percent > 0 && props.percent < 100 && <Style.ProgressDate marginTop="7px" color="#486ADF">
            {t('ProjectGress.onging')}
          </Style.ProgressDate>
        }
        {
          data.actual !== null && props.percent === 100 && (data.actualTimeDisplayStatus === 1 ? <Style.ProgressDate marginTop="7px" color="#333333">
            {datetimeFormat(data.actual * 1000)}
          </Style.ProgressDate> : <Style.ProgressDate marginTop="7px" color="#FF0000">
            {datetimeFormat(data.actual * 1000)}
          </Style.ProgressDate>)
        }

        {props.isshowcircleshadow ? <Style.CircleShadow></Style.CircleShadow> : ''}
        {data.reviseGerberStatus === 2 && <Style.ReviseGerber>
          {t('ProjectGress.change')}
        </Style.ReviseGerber>}
      </Style.CircleContent>
    </div >
  );
}
