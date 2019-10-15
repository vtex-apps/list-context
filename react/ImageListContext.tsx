import React, { FC, createContext, useContext } from 'react'
import { Image } from 'vtex.store-image'

interface Image {
  link?: {
    url: string
    noFollow: boolean
    openNewTab: boolean
    title: string
  }
  image: string
  mobileImage: string
  description: string
}

interface Props {
  images: Image[]
}

const ImageListStateContext = createContext<JSX.Element[] | undefined>(
  undefined
)

// function getImageUrl(isMobile: boolean, image: string, mobileImage: string) {
//   return !!mobileImage && isMobile ? mobileImage : image
// }

const ImageList: FC<Props> = ({ children, images }) => {
  const imageListComponents = images.map(
    ({ link, image, mobileImage, description }, idx) => {
      // const imageUrl = getImageUrl(
      //   isMobile,
      //   formatIOMessage({ id: image, intl }),
      //   formatIOMessage({ id: mobileImage, intl })
      // )
      // const imageAltDescription = formatIOMessage({ id: description, intl })
      // const imageLink = link && {
      //   ...link,
      //   url: formatIOMessage({ id: link.url, intl }),
      //   title: formatIOMessage({ id: link.title, intl }),
      // }

      return (
        <Image
          key={idx}
          src={image}
          alt={description}
          link={link}
          width="100%"
        />
      )
    }
  )

  return (
    <ImageListStateContext.Provider value={imageListComponents}>
      {children}
    </ImageListStateContext.Provider>
  )
}

export function useImageListState() {
  const context = useContext(ImageListStateContext)
  if (context === undefined) {
    throw new Error('useImageListState must be used within a ImageList')
  }
  return context
}

export default ImageList
