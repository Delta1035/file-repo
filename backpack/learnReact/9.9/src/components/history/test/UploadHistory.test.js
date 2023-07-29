import React from 'react';
import { render, fireEvent, act, screen, within } from '@testing-library/react';
import UploadHistory from '../UploadHistory';
import * as UserContext from '@/userstore/userStore';
import { Service } from '../../../utils/request';
import userEvent from '@testing-library/user-event';
var MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(Service, { onNoMatch: 'throwWException' });

describe('UploadHistory', () => {
  beforeAll(() => {
    mock.onAny('/attachment/historyUploadInfo').reply(200, {
      data: {
        attachHistoryUploadInfoList: [
          {
            attachId: 1203,
            demandModifier: '111',
            docRandomName: 'rc-upload-1664240393328-18.docx',
            docRealName: 'azure-958d3375-4d23-4d13-b6d7-39a325bdafbc.docx',
            dueDate: 1664496000,
            historyId: null,
            isFinal: true,
            note: '3333',
            reason: '222',
            uploadBy: 'Peter Wang',
            uploadTime: 1664241878,
            version: '3',
          },
        ],
        fileName: 'Board shape dxf',
        format: 'docx,doc',
        route: 'Design in / ME Stacking / ME / 1.ME Board shape ,DXF、PDF',
        title: '3-2 ME以Mail的方式提供初版Board shape、最大板型尺寸、板上板下限高給EE作為參考',
        toOrFrom: 'EE,RFC',
      },
    });
  });

  afterAll(() => {
    mock.restore();
  });
  beforeEach(() => {
    mock.resetHistory();
  });

  test('UploadHistory', async () => {
    const contextValues = {
      perms: ['*:*:*'],
      functions: ['*'],
    };

    jest.spyOn(UserContext, 'useUserStore').mockImplementation(() => contextValues);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <UploadHistory isModalVisible={true} historyattacid={1203} user="ME" onClick={true} />
      );
      // eslint-disable-next-line testing-library/no-debugging-utils
    });

    // eslint-disable-next-line testing-library/no-debugging-utils

    // const close = await screen.findByText('Close')
    // userEvent.click(close)
    const showtable = await screen.findByTestId('showtable');
    expect(showtable).toBeInTheDocument();

    const download = await within(showtable).findByTestId('download');
    userEvent.click(download);

    // const final = await within(showtable).findByText('Y')
    // expect(final).toBeInTheDocument()
    // const version = await within(showtable).findByText('3')
    // expect(version).toBeInTheDocument()

    // const dueDate = await within(showtable).findByText('2022-09-30')
    // expect(dueDate).toBeInTheDocument()
  });
});
