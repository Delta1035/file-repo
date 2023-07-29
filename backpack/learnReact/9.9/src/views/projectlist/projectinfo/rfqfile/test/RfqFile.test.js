import React from 'react'
import { render, fireEvent, act } from "@testing-library/react";
import RfqFile from '../RfqFile'

describe('test RfqFile', () => {
  test('測試rfqfile', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <RfqFile />
      )
      // eslint-disable-next-line testing-library/no-debugging-utils
    })
  })
})