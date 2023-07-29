import React from 'react'
import { render, fireEvent, act } from "@testing-library/react";
import SideMenu from '../SideMenu'
import { BrowserRouter } from 'react-router-dom';

describe('test SideMenu', () => {
  test('測試sidemenu', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <BrowserRouter>
          <SideMenu />
        </BrowserRouter>
      )
      // eslint-disable-next-line testing-library/no-debugging-utils
    })
  })
})