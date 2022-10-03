import { useInfiniteQuery } from '@tanstack/react-query'
import { flickrGetQuery } from '../Flickr'
import { PhotosResult } from '../types/photo'

type SearchPhotosProps = {
  /**
   * @description: A free text search.
   */
  text?: string
  /**
   * @description: How many items per page
   */
  perPage?: number
  /**
   * @description: Which page to retrieve
   */
  page?: number
}
/**
 * Executes a search query, or popular if no search is given
 * @param param0
 * @returns Promise
 */
export const searchPhotos = async ({
  text,
  perPage,
  page,
}: SearchPhotosProps) => {
  try {
    const { data } = await flickrGetQuery({
      method: 'flickr.photos.search',
      perPage: perPage ? `${perPage}` : '20',
      page: page ? `${page}` : '1',
      otherParams: {
        text: text || 'popular',
      },
    })
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}

type useSearchPhotosProps = {
  /**
   * @description: A free text search.
   */
  search?: string
  /**
   * @description: A free text search.
   */
  initialData: PhotosResult
}
/**
 * Returns and infinite query for the images using flick api
 * @param param0
 * @returns
 */
export const useSearchPhotos = ({
  search,
  initialData,
}: useSearchPhotosProps) =>
  useInfiniteQuery<PhotosResult>(
    ['searchPhotos', search],
    async ({ pageParam = 1 }) =>
      await searchPhotos({ text: search, page: pageParam }),
    {
      initialData: () => {
        if (initialData) {
          return {
            pageParams: [undefined, 1],
            pages: [initialData],
          }
        }
      },
      cacheTime: 5000,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.photos?.page < lastPage?.photos?.pages) {
          return pages.length + 1
        }
      },
    }
  )
