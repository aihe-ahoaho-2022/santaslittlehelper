import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { vi } from 'vitest'

import { updatedWishlistApi } from '../../apiClient/guest.js'
import Wishlist from '../Wishlist'

vi.mock('../../apiClient/guest.js')

describe('Add wishlist variation of the component test', async () => {
  it('renders', () => {
    render(<Wishlist />, { wrapper: MemoryRouter })
    expect(screen.getByText(/Secret Santa/i)).toBeInTheDocument()
  })
  it('has input field for the wishlist', () => {
    render(<Wishlist />, { wrapper: MemoryRouter })
    expect(
      screen.getByPlaceholderText(/Type your wishlist here/i)
    ).toBeInTheDocument()
  })
})

describe('As a user', async () => {
  test('type into input fields', async () => {
    updatedWishlistApi.mockReturnValue(
      Promise.resolve({
        id: 13,
        guest_code: 'holly2022',
        event_id: 6,
        name: 'Holly',
        wishlist: 'A new couch, a sun spot, and a mountain of treats',
        gifter_id: '',
      })
    )

    render(<Wishlist />, { wrapper: MemoryRouter })

    const inputWishlist = screen.getByPlaceholderText('Type your wishlist here')

    await userEvent.type(
      inputWishlist,
      'A new couch, a sun spot, and a mountain of treats'
    )

    expect(inputWishlist).toHaveValue(
      'A new couch, a sun spot, and a mountain of treats'
    )

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(updatedWishlistApi).toHaveBeenCalled()
  })
})

describe('Add assigned variation of the component test', async () => {
  it.todo('renders', () => {
    render(<Wishlist />, { wrapper: MemoryRouter })
    expect(screen.getByText(/buddy/i)).toBeInTheDocument()
  })
})
