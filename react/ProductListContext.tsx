import React, { useContext, createContext, FC } from 'react'
import { compose, graphql } from 'react-apollo'
import ProductListItem from './ProductListItem'

import productsQuery from './graphql/products.graphql'

interface Props {
  data: {
    products: Product[]
  }
}

const ProductListStateContext = createContext<JSX.Element[] | undefined>(
  undefined
)

const ProductList: FC<Props> = ({ children, data }) => {
  const componentList = data.products.map(product => (
    <ProductListItem key={product.productId} item={product} />
  ))

  return (
    <ProductListStateContext.Provider value={componentList}>
      {children}
    </ProductListStateContext.Provider>
  )
}

function useProductListState() {
  const context = useContext(ProductListStateContext)
  if (context === undefined) {
    throw new Error('useProductListState must be used within a ProductList')
  }
  return context
}

const parseFilters = ({ id, value }: { id: string; value: string }) =>
  `specificationFilter_${id}:${value}`

const ORDER_BY_OPTIONS = {
  ORDER_BY_RELEVANCE: {
    name: 'admin/editor.shelf.orderType.relevance',
    value: '',
  },
  ORDER_BY_TOP_SALE_DESC: {
    name: 'admin/editor.shelf.orderType.sales',
    value: 'OrderByTopSaleDESC',
  },
  ORDER_BY_PRICE_DESC: {
    name: 'admin/editor.shelf.orderType.priceDesc',
    value: 'OrderByPriceDESC',
  },
  ORDER_BY_PRICE_ASC: {
    name: 'admin/editor.shelf.orderType.priceAsc',
    value: 'OrderByPriceASC',
  },
  ORDER_BY_NAME_ASC: {
    name: 'admin/editor.shelf.orderType.nameAsc',
    value: 'OrderByNameASC',
  },
  ORDER_BY_NAME_DESC: {
    name: 'admin/editor.shelf.orderType.nameDesc',
    value: 'OrderByNameDESC',
  },
  ORDER_BY_RELEASE_DATE_DESC: {
    name: 'admin/editor.shelf.orderType.releaseDate',
    value: 'OrderByReleaseDateDESC',
  },
  ORDER_BY_BEST_DISCOUNT_DESC: {
    name: 'admin/editor.shelf.orderType.discount',
    value: 'OrderByBestDiscountDESC',
  },
}

const productQueryOptions = {
  options: ({
    category = '',
    collection,
    hideUnavailableItems = false,
    orderBy = ORDER_BY_OPTIONS.ORDER_BY_TOP_SALE_DESC.value,
    specificationFilters = [],
  }: ProductsQueryParams & {
    specificationFilters: { id: string; value: string }[]
  }) => ({
    ssr: true,
    name: 'productList',
    variables: {
      category,
      ...(collection != null
        ? {
            collection,
          }
        : {}),
      specificationFilters: specificationFilters.map(parseFilters),
      orderBy,
      from: 0,
      to: 9,
      hideUnavailableItems,
    },
  }),
}

const EnhancedProductList: FC = compose(
  graphql(productsQuery, productQueryOptions)
)(ProductList)

export default EnhancedProductList

export { useProductListState }
