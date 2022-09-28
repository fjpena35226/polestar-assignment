import { flickrGetQuery } from '../Flickr'
import { PhotoApi } from '../types/photo'

type searchPhotosProps = {
  /**
   * @description: A free text search.
   */
  text?: string
  /**
   * @description: How many items per page
   */
  perPage?: string
  /**
   * @description: Which page to retrieve
   */
  page?: string
}

export const searchPhotos = async ({
  text,
  perPage,
  page,
}: searchPhotosProps) => {
  try {
    const { data } = await flickrGetQuery({
      method: text ? 'flickr.photos.search' : 'flickr.photos.getRecent',
      perPage,
      page,
      otherParams: text
        ? {
            text,
          }
        : {},
    })   

    return data && data.photos
      ? data.photos.photo?.map((photoEl: PhotoApi) => ({...photoEl}))
      : []
  } catch (err) {
    console.error(err);    
    throw err
  }
}
