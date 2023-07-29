import React from 'react';
import { useTranslation } from 'react-i18next';

export default function WorkFlow () {
  const {t} = useTranslation();
  return (
    <div>{t('siedMenu.workFlow')}</div>
  )
}
