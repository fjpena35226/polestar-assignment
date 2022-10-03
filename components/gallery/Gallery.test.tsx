import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Gallery from './Gallery'

describe('Gallery', () => {
  it('Empty Gallery should render properly and show message', () => {
    render(<Gallery />)

    const heading = screen.getByText('No images found.')

    expect(heading).toBeInTheDocument()
  })

  it('It should render one element properly', () => {
    const alt = 'MSN Email issues and easy Fix'
    const data = {
      pageParams: [undefined, 1],
      pages: [
        {
          photos: {
            page: 1,
            pages: 1,
            perpage: 1,
            total: 1,
            photo: [
              {
                id: '52392285176',
                secret: '7ae539029a',
                server: '65535',
                title: alt,
              },
            ],
          },
        },
      ],
    }

    render(<Gallery data={data} />)

    const img = screen.getByAltText(alt)

    expect(img).toBeInTheDocument()
  })
})
