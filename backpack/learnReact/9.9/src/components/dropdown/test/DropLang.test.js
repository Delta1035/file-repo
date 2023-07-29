import React from 'react'
import { render, fireEvent, act } from "@testing-library/react";
import DropLang from '../DropLang'

describe('test DropLang', () => {
  test('測試droplang', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <DropLang />
      )
      // eslint-disable-next-line testing-library/no-debugging-utils
    })
  })
})