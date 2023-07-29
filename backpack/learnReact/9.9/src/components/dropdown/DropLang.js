import React from 'react'
import * as Style from '../topheader/TopHeaderStyle'
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

const { Option } = Select;

export default function DropLang () {

  const {t}= useTranslation();
  return (
    <Style.Drop>
      <Select
        defaultValue='en'
      >
        <Option value="en">{t('headerMenu.english')}</Option>
        <Option value="zh">{t('headerMenu.traditional')}</Option>
      </Select>
    </Style.Drop>
  )
}
