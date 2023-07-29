import React from 'react'
import { render, fireEvent, act } from "@testing-library/react";
import ErrorPage from '../ErrorPage'

describe('ErrorPage', () => {
  test('ErrorPage', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <ErrorPage />
      )
      // eslint-disable-next-line testing-library/no-debugging-utils
    })
  })
})