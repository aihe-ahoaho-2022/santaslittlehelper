import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { vi } from 'vitest'

import { createEvent } from '../../apiClient/event.js'
import CreateEvent from '../CreateEvent'

vi.mock('../../apiClient/event.js')

describe('CreateEvent component test', () => {
  it('renders', () => {
    render(<CreateEvent />, { wrapper: MemoryRouter })
    expect(screen.getByText(/Secret Santa/i)).toBeInTheDocument()
  })
  it('has input field', () => {
    render(<CreateEvent />, { wrapper: MemoryRouter })
    expect(screen.getByLabelText('Event Name:')).toBeInTheDocument()
    expect(screen.getByLabelText('Draw Date:')).toBeInTheDocument()
    expect(screen.getByLabelText('Budget:')).toBeInTheDocument()
  })
})

describe('test form use as a user', () => {
  test('type into input fields', async () => {
    createEvent.mockReturnValue(
      Promise.resolve({
        budget: 2,
        date: '2022-12-19',
        event_id: 6,
        event_name: 'Puppy Christmas Party',
        host_id: 69,
        invite_id: 'bde17bb3-b3db-4f8e-b468-e99dd4a5116a',
        status: 0,
      })
    )

    render(<CreateEvent />, { wrapper: MemoryRouter })

    const inputName = screen.getByLabelText('Event Name:')
    const inputDate = screen.getByLabelText('Draw Date:')
    const inputBudget = screen.getByLabelText('Budget:')

    await userEvent.type(inputName, 'Puppy Christmas Party')
    await userEvent.type(inputDate, '2022-12-19')
    await userEvent.type(inputBudget, '50')

    expect(inputName).toHaveValue('Puppy Christmas Party')
    expect(inputDate).toHaveValue('2022-12-19')
    expect(inputBudget).toHaveValue('50')

    await userEvent.click(
      screen.getByRole('button', { name: 'Create Your Event' })
    )

    expect(createEvent).toHaveBeenCalled()

    const link = await screen.findByRole('link', {
      name: /bde17bb3-b3db-4f8e-b468-e99dd4a5116a/,
    })

    expect(link.href).toMatch(/bde17bb3-b3db-4f8e-b468-e99dd4a5116a/)
  })
})
