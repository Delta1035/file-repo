import React from 'react'
import * as Style from './MessageBoardStyle'
import { Collapse, Avatar, Card, message, Tooltip } from 'antd'
import { useState, } from 'react'
import { PaperClipOutlined, DownloadOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import Icon from "@/icon/Icon";
import useMinutetimestamp from '@/hooks/minutetimestamp'
import { azureupload } from '@/api';
import useazuredownload from '@/hooks/azuredownload'
import { saveAs } from 'file-saver'
import { useTranslation } from 'react-i18next';

const { Panel } = Collapse;

export default function CollapseCompont ({ respondInfo }) {

  const minutetimestamp = useMinutetimestamp();

  const [ishowDescriptionText, setIshowDescriptionText] = useState(true);

  const { t } = useTranslation();

  const headersubject = (

    <>
      <Style.CardDiv >
        <Card>
          <Meta avatar={<Avatar icon={<Icon.PICMegGray />} style={{ color: 'blue' }} />}
            title={<Style.MetaDiv><Style.MetaSpan color='#333333'>{respondInfo.responder}</Style.MetaSpan></Style.MetaDiv>}
            description={
              <>
                <Style.Description >
                  <Style.DescriptionmessageParticipant><Tooltip overlayClassName={'newTooptip'} placement="topLeft" title={respondInfo.messageParticipants}>{respondInfo.messageParticipants}</Tooltip></Style.DescriptionmessageParticipant>

                  <Style.DescriptionTime>{minutetimestamp(respondInfo.respondTime * 1000)}</Style.DescriptionTime>
                </Style.Description>
                {
                  ishowDescriptionText &&
                  <Style.DescriptionTextFlex>
                    <Style.DescriptionText>{respondInfo.messageText}</Style.DescriptionText>
                    {respondInfo?.respondAttachList[0] && <PaperClipOutlined style={{ color: '#333333', float: 'right' }} />}
                  </Style.DescriptionTextFlex>
                }
              </>
            } />
        </Card>
      </Style.CardDiv>
    </>

  )

  const onChangeCollapse = (key) => {

    if (key[0] === '2') {
      setIshowDescriptionText(false)
    } else {
      setIshowDescriptionText(true)

    }
  }

  const handleDownload = async (filename) => {

    const azureinfo = await azureupload();
    const containerName = azureinfo.data.data.container; //Blob 存储中的容器的名称。 可以将其视为等同于文件系统的文件夹或目录
    const sasToken = azureinfo.data.data.azureStorageSAS; //使用 Azure 门户创建的 SAS 令牌
    const storageAccountName = azureinfo.data.data.account; //资源名称
    useazuredownload(
      storageAccountName,
      containerName,
      sasToken,
      filename//下載後的文件名字
    )().then(res => {
      message.success(t('subjectDiscussion.downloadSuccess'));
      if (filename.substring(filename.lastIndexOf(".")) === ".txt") {
        saveAs(res, filename);
      } else {
        handleDownFile(res);
      }
    })
      .catch(err => {
        message.error(t('subjectDiscussion.downloadFail'));
      });
  }

  const handleDownFile = fileurl => {
    const oa = document.createElement("a");
    oa.href = fileurl;
    oa.setAttribute("target", "_blank");
    document.body.appendChild(oa);
    oa.click();
  };

  return (
    <Style.Collapse>
      <Collapse onChange={onChangeCollapse} ghost expandIconPosition="end">
        <Panel header={headersubject} key={'2'} showArrow={false}>
          <div>
            <Style.FileList>
              {
                respondInfo?.respondAttachList.map(item => <Tooltip overlayClassName={'newTooptip'} title={item} key={item}>
                  <Style.File key={item}>
                    <Style.FileName>{item}</Style.FileName>
                    <DownloadOutlined onClick={() => { handleDownload(item) }} />
                  </Style.File>
                </Tooltip>)
              }
            </Style.FileList>
            <Style.DescriptionText2 dangerouslySetInnerHTML={{ __html: respondInfo.message }}></Style.DescriptionText2>
          </div>
        </Panel>
      </Collapse>

    </Style.Collapse>
  )
}
