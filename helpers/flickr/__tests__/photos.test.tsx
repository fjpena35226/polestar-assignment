import { searchPhotos } from "../queries/photos"

describe('Search Photos should be working', () => {
  it('Should request the photos from Flickr', async () => {
    const data = await searchPhotos({})
    expect(data).toBeDefined()
  })
})
