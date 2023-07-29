
import TaskTable from '../TaskTable';
import React, { useContext } from 'react';
import { render, screen, within, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { HashRouter } from 'react-router-dom';
import * as  AppContext from '@/createContext/createContext';

describe('TaskTable', () => {

  test('測試TaskTable', async () => {
    const contextValues = {
      datetasklist: [{
        attachType: "no",
        completeTime: 1661767062,
        dueDate: 1661680662,
        id: 54,
        pic: null,
        progress: '1/3',
        picList: ['wits.binkliu'],
        status: 0,
        taskId: "1-1-1",
        taskNo: "1-1",
        value: "EE與TM, PM、PCB team確認需要使用的PCB疊構、材質 以及GBO schedule"
      }]
    }
    jest.spyOn(AppContext, 'useAppContext').mockImplementation(() => contextValues)
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      const { container } = render(
        <HashRouter>
          <TaskTable />
        </HashRouter>
      )
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      // const button = container.querySelector('.ant-table-row')
      // userEvent.click(button)
    })

    const showtable = await screen.findByTestId('showtable')
    expect(showtable).toBeInTheDocument()
    const taskNo = await within(showtable).findByText('1-1')
    expect(taskNo).toBeInTheDocument()
    const value = await within(showtable).findByText('EE與TM, PM、PCB team確認需要使用的PCB疊構、材質 以及GBO schedule')
    expect(value).toBeInTheDocument()
    // const status = await within(showtable).findByText('待辦')
    // expect(status).toBeInTheDocument()
    // const dueDate = await within(showtable).findByText('2022-08-28 到期!')
    // expect(dueDate).toBeInTheDocument()
    const completeTime = await within(showtable).findByText('2022-08-29')
    expect(completeTime).toBeInTheDocument()
    const progress = await within(showtable).findByText('1/3')
    expect(progress).toBeInTheDocument()

    // eslint-disable-next-line testing-library/no-node-access

    // eslint-disable-next-line testing-library/no-debugging-utils
  })
})