import React from 'react'
import { render, fireEvent, act } from "@testing-library/react";
import Collapsed from '../Collapsed'

describe('test Collapsed', () => {
  test('測試collapsed', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <Collapsed />
      )
      // eslint-disable-next-line testing-library/no-debugging-utils
    })
  })
})