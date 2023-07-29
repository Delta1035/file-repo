import React from 'react'
import { render, fireEvent, act } from "@testing-library/react";
import User from '../User'

describe('test User', () => {
  test('測試user', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <User />
      )
      // eslint-disable-next-line testing-library/no-debugging-utils
    })
  })
})