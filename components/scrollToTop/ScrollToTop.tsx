import { useEffect, useState } from 'react'
import { Fab } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

const ScrollToTop = () => {
  const [toTopVisible, setToTopVisible] = useState(false)

  const toggleToTopVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      setToTopVisible(true)
    } else if (scrolled <= 300) {
      setToTopVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window?.addEventListener('scroll', toggleToTopVisible)
  }, [])

  return toTopVisible ? (
    <Fab
      color={'primary'}
      onClick={scrollToTop}
      sx={{ position: 'fixed', zIndex: '10', bottom: '30px', right: '30px' }}
    >
      <ArrowUpwardIcon className='text-white' />
    </Fab>
  ) : null
}

export default ScrollToTop
