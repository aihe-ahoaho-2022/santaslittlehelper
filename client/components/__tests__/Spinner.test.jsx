import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('../Spinner.jsx')
import Spinner from '../Spinner'

describe('<Spinner />', () => {
  it('Loads a Spinner when the page is loading', () => {
    render(<Spinner />)
    const spinner = screen.queryByTestId('loader')
    expect(spinner).toBeDefined()
  })
})
