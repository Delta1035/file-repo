import React from 'react'
import { render, fireEvent, act } from "@testing-library/react";
import NoPermission from '../NoPermission'

describe('test WorkFlow', () => {
  test('測試workflow', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <NoPermission />
      )
      // eslint-disable-next-line testing-library/no-debugging-utils
    })
  })
})