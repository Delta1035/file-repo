import React from 'react'
import { render, fireEvent, act } from "@testing-library/react";
import TopHeader from '../TopHeader'
import { BrowserRouter } from 'react-router-dom';

describe('test TopHeader', () => {
  test('測試topheader', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <BrowserRouter>
          <TopHeader />
        </BrowserRouter>
      )
      // eslint-disable-next-line testing-library/no-debugging-utils
    })
  })
})