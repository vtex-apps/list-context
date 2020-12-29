import * as React from 'react'
import { render } from '@vtex/test-tools/react'

import GeneralList from '../GeneralList'
import useListContext from '../useListContext'

interface Props {
  foo: string
}

const Component: React.FC<Props> = ({ foo }) => <div>{foo}</div>

const OtherComponent: React.FC<Props> = ({ foo }) => <div>Other {foo}</div>

const RenderList: React.FC = () => {
  const list = useListContext()?.list ?? []

  return (
    <>
      {list.map((item, idx) => (
        <React.Fragment key={idx}>{item}</React.Fragment>
      ))}
    </>
  )
}

test('should add all items to the list provider', () => {
  const items: Props[] = [
    {
      foo: '123',
    },
    {
      foo: 'bar',
    },
  ]

  const { getByText } = render(
    <GeneralList Component={Component} items={items}>
      <RenderList />
    </GeneralList>
  )

  expect(getByText('123')).toBeTruthy()
  expect(getByText('bar')).toBeTruthy()
})

test('should append items to the list provider', () => {
  const items1: Props[] = [
    {
      foo: '123',
    },
    {
      foo: 'bar',
    },
  ]

  const items2: Props[] = [
    {
      foo: 'zaz',
    },
  ]

  const { getByText } = render(
    <GeneralList Component={Component} items={items1}>
      <GeneralList Component={OtherComponent} items={items2}>
        <RenderList />
      </GeneralList>
    </GeneralList>
  )

  expect(getByText('123')).toBeTruthy()
  expect(getByText('bar')).toBeTruthy()
  expect(getByText('Other zaz')).toBeTruthy()
})
