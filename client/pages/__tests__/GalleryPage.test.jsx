import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

import { getPeets } from '../../apiClient/peets'

vi.mock('../../apiClient/peets')

import GalleryPage from '../GalleryPage'

describe('<GalleryPage />', () => {
  it('loads peets from api on load', async () => {
    getPeets.mockReturnValue(
      Promise.resolve([
        {
          id: 1,
          petname: 'Croissant',
          owner: 'Rohan',
          image: 'PEET-18.jpg',
        },
        {
          id: 2,
          petname: 'Frank',
          owner: 'Ben',
          image: 'PEET-12.jpg',
        },
        {
          id: 3,
          petname: 'George',
          owner: 'James',
          image: 'PEET-29.jpg',
        },
      ])
    )
    render(<GalleryPage />)
    return await waitFor(() => getPeets.mock.calls.length > 0).then(
      async () => {
        let peets = await screen.findAllByRole('list')
        expect(peets).not.toBeNull()
      }
    )
  })
})
