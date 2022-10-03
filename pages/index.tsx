import { ChangeEvent, useEffect, useState } from 'react'
import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from 'next'
import SearchIcon from '@mui/icons-material/Search'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Alert, Grid, InputAdornment, Snackbar, TextField } from '@mui/material'

import { searchPhotos, useSearchPhotos } from 'helpers/flickr/queries/photos'
import Gallery from 'components/gallery/Gallery'
import useAlert from 'hooks/useAlert'
import ScrollToTop from 'components/scrollToTop/ScrollToTop'
import useDebounce from 'hooks/useDebounce'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const photos = await searchPhotos({})
  return {
    props: {
      photos,
    },
  }
}

const Home: NextPage = ({
  photos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  const { isLoading, isError, error, data, fetchNextPage, hasNextPage, failureCount } =
    useSearchPhotos({ search: debouncedSearch, initialData: photos })

  const { showAlert, closeAlert, alertOpen, alertMessage, alertColor } =
    useAlert()

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget
    setSearch(value)
  }

  useEffect(() => {
    const { searchText } = router?.query
    if (searchText && searchText !== search) setSearch(searchText as string)
  }, [router.query, search])

  useEffect(() => {
    if (isError && !alertOpen && failureCount < 5) {
      showAlert({
        alertMessage: 'Something went wrong trying to get the images',
        alertColor: 'error',
      })
      console.error(error)
    }
  }, [isError, error, showAlert])

  return (
    <>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => closeAlert({})}
      >
        <Alert
          onClose={() => closeAlert({})}
          severity={alertColor || 'info'}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ paddingX: { xs: 4, lg: 10 }, paddingY: 5 }}
      >
        <Grid
          item
          container
          xs={12}
          sx={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}
        >
          <Grid
            item
            xs={6}
            sm={4}
            md={2}
            lg={1}
            sx={{ position: 'relative', minHeight: '45px', '& img': { objectFit: 'cover' } }}
          >
            <Image src='/img/flickr-logo-brandlogos.net_.png' layout='fill' alt='Flickr logo' />
          </Grid>
          <Grid item xs={12} sm={8} md={10}>
            <TextField
              placeholder='Search photos'
              name='search'
              aria-label='search'
              value={search || ''}
              onChange={handleOnChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: '100%' }}
            />
          </Grid>
        </Grid>
        <Gallery
          isLoading={isLoading}
          data={data}
          onLoadMore={fetchNextPage}
          hasMore={hasNextPage}
        />
      </Grid>
      <ScrollToTop />
    </>
  )
}

export default Home
