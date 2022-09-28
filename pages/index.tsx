import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from 'next'

import { searchPhotos } from 'helpers/flickr/queries/photos'
import { getPhotoUrl } from 'helpers/flickr/Flickr'
import { PhotoApi } from 'helpers/flickr/types/photo'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const photos = await searchPhotos({ text: 'teach' })
  return {
    props: {
      photos: photos,
    },
  }
}

const Home: NextPage = ({
  photos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      {photos.map((photo: PhotoApi) => (
        <img src={getPhotoUrl(photo)} width={500} height={500}/>
      ))}
    </div>
  )
}

export default Home
