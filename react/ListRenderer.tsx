import * as React from 'react'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'

import useListContext from './useListContext'

const CSS_HANDLES = ['list', 'item'] as const

interface Props {
  listElement?: string
  itemElement?: string
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function RenderList({
  listElement = 'Fragment',
  itemElement = 'Fragment',
  classes,
}: Props) {
  const list = useListContext()?.list ?? []
  const { handles } = useCssHandles(CSS_HANDLES, { classes })

  const ListElement = listElement === 'Fragment' ? React.Fragment : listElement
  const ItemElement = itemElement === 'Fragment' ? React.Fragment : itemElement
  const listProps =
    listElement === 'Fragment' ? {} : { className: handles.list }
  const itemProps =
    itemElement === 'Fragment' ? {} : { className: handles.item }

  return (
    <ListElement {...listProps}>
      {list.map((item, idx) => (
        <ItemElement {...itemProps} key={idx}>
          {item}
        </ItemElement>
      ))}
    </ListElement>
  )
}

export default RenderList
