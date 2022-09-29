import axios from 'axios'
import { Photo } from './types/photo'

type FlickrQueryProps = {
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

/**
 * Fetch a get query from the flickr API
 * @param object
 * @returns Promise
 */
export const flickrGetQuery = async ({
  method,
  perPage,
  page,
  otherParams,
}: FlickrQueryProps) => {
  try {
    const defaultParams = {
      method: method || '',
      api_key: process.env.NEXT_PUBLIC_API_KEY || '',
      format: 'json',
      nojsoncallback: '1',
      per_page: perPage || '12',
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

/**
 * Calc the url for a given photo
 * @param photo 
 * @returns 
 */
export function getPhotoUrl(photo: Photo) {
  return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
}

/**
 * Max items per Flickr request
 */
export const FLICKR_MAX_ITEMS_PER_PAGE = 500
