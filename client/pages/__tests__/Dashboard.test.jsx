import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { describe, expect, it } from 'vitest'

import { getEvents } from '../../apiClient/event'
import Dashboard from '../Dashboard'

vi.mock('../../apiClient/event.js')

const mockEventsData = [
  {
    id: 1,
    event_name: 'Dev Academy Christmas Party',
    date: '22-12-2022',
    host_id: 69,
    invite_id: 'fake-id',
    budget: 30,
  },
]

afterEach(() => {
  vi.clearAllMocks()
})

describe('Dashboard component test', () => {
  it('renders', async () => {
    getEvents.mockReturnValue(Promise.resolve(mockEventsData))
    render(<Dashboard />, { wrapper: MemoryRouter })
    expect(
      await screen.findByText(mockEventsData[0].event_name, { exact: false })
    ).toBeInTheDocument()
    expect(
      await screen.findByText(mockEventsData[0].date, { exact: false })
    ).toBeInTheDocument()
  })
  it('has a Christmas tree image', async () => {
    getEvents.mockReturnValue(Promise.resolve(mockEventsData))
    render(<Dashboard />, { wrapper: MemoryRouter })
    await screen.findByAltText(/christmas tree/i)
  })
  it('has an link', async () => {
    getEvents.mockReturnValue(Promise.resolve(mockEventsData))
    render(<Dashboard />, { wrapper: MemoryRouter })
    const link = await screen.findByRole('link', { name: /View Event/i })
    expect(link).toHaveAttribute('href', '/dashboard/fake-id')
  })
})
