import React from 'react'
import { render, fireEvent, act, screen, within } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import HeaderMenu from '../HeaderMenu'
import { BrowserRouter } from 'react-router-dom';

describe('test HeaderMenu', () => {
  test('測試headerMenu', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <BrowserRouter>
          <HeaderMenu />
        </BrowserRouter>
      )
      // eslint-disable-next-line testing-library/no-debugging-utils
    })
    const back = await screen.findByText('Back')

    userEvent.click(back)

    // const LogOut = await screen.findByText('Log Out')

    // userEvent.click(LogOut)

    const showselect = await screen.findByTestId('showselect')

    // const zh = await within(showselect).findByText('繁體中文')
    // expect(zh).toBeInTheDocument()

    userEvent.type(showselect)



  })
})