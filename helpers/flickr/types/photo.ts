export type Photo = {
  id: string
  secret: string
  server: string
  title: string
}

export type PhotosResult = {
  photos: {
    page: number,
    pages: number,
    perpage: number,
    total: number,
    photo: Photo[]
  }
}
