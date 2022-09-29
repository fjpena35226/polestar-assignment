import React from 'react'
import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { InfiniteData } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'

import { getPhotoUrl } from 'helpers/flickr/Flickr'
import { Photo, PhotosResult } from 'helpers/flickr/types/photo'
import classes from './gallery.module.css'

type GalleryItemProps = {
  photo: Photo
}

type GalleryProps = {
  isLoading: boolean
  data?: InfiniteData<PhotosResult>
  onLoadMore?: Function
  hasMore?: boolean
}

const GalleryItem = ({ photo }: GalleryItemProps) => {
  return (
    <Box className={classes.container}>
      <Image
        src={getPhotoUrl(photo)}
        layout='fill'
        alt={photo.title}
        className='img-fluid'
      />
    </Box>
  )
}

const InfiniteLoading = () => (
  <Box className={classes.container}>
    <CircularProgress color='primary' />
  </Box>
)

const Gallery = ({
  isLoading,
  data,
  onLoadMore,
  hasMore = true,
}: GalleryProps) => {
  return isLoading ? (
    <LinearProgress color='primary' sx={{ width: '100%' }} />
  ) : (
    <Grid
      item
      container
      justifyContent='center'
      alignItems='center'
      spacing={2}
      sx={{ marginX: 0 }}
    >
      {data?.pages?.length === 0 || !data?.pages[0].photos ? (
        <Typography variant='h3' color='primary'>
          No images found.
        </Typography>
      ) : (
        data && (
          <>
            <InfiniteScroll
              dataLength={data?.pages?.length * 12}
              next={() => (onLoadMore ? onLoadMore() : undefined)}
              hasMore={hasMore}
              loader={<InfiniteLoading />}
              className='infinite-container'
            >
              {data?.pages?.map((page: PhotosResult, index) => (
                <React.Fragment key={`page-${index}`}>
                  {page?.photos?.photo?.map((photo: Photo) => (
                    <GalleryItem key={photo.id} photo={photo} />
                  ))}
                </React.Fragment>
              ))}
            </InfiniteScroll>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            ></Grid>
          </>
        )
      )}
    </Grid>
  )
}

export default Gallery
