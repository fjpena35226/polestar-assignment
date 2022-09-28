import axios from 'axios'
import { PhotoApi } from './types/photo'

type flickrQueryProps = {
  /**
   * @description: The flickr API method
   */
  method: string
  /**
   * @description: How many items per page
   */
  perPage?: string
  /**
   * @description: Which page to retrieve
   */
  page?: string
  /**
   * @description: Additional params to complement different flick API methods (eg. text for search)
   */
  otherParams: { [key: string]: string }
}

export const flickrGetQuery = async ({
  method,
  perPage,
  page,
  otherParams,
}: flickrQueryProps) => {
  try {
    const defaultParams = {
      method: method || '',
      api_key: process.env.PUBLIC_API_KEY || '',
      format: 'json',
      nojsoncallback: '1',
      per_page: perPage || '10',
      page: page || '1',
      ...otherParams,
    }

    return await axios.get(
      `https://www.flickr.com/services/rest/?${new URLSearchParams(
        defaultParams
      ).toString()}`
    )
  } catch (err) {
    throw err
  }
}

export function getPhotoUrl(photo: PhotoApi) {
  return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
}
