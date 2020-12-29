import * as React from 'react'

import ListContextProvider from './ListContextProvider'
import useListContext from './useListContext'

interface Props {
  items: object[]
  Component: React.ComponentType
}

function GeneralList({
  items = [],
  Component,
  children,
}: React.PropsWithChildren<Props>) {
  const list = useListContext()?.list ?? []

  const generalListContent = Array.isArray(items)
    ? items.map((itemProps, idx) => <Component key={idx} {...itemProps} />)
    : []

  const newListContextValue = list.concat(generalListContent)

  return (
    <ListContextProvider list={newListContextValue}>
      {children}
    </ListContextProvider>
  )
}

export default GeneralList
