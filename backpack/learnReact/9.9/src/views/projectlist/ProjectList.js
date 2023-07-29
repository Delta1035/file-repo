import React from "react";
import TabsProject from "./tabsproject/TabsProject";
import * as Style from "./ProjectListStyle";
import { useTranslation } from "react-i18next";
export default function ProjectList () {

  const { t } = useTranslation();

  return (
    <div style={{ margin: "24px 48px " }}>
      <Style.ProjectTitle>{t('projectList.title')}</Style.ProjectTitle>
      <TabsProject />
    </div>
  );
}
