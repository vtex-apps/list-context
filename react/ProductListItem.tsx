import React, { useMemo } from 'react'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'
import { ProductSummaryLegacy } from 'vtex.product-summary'

// import { ExtensionPoint } from 'vtex.render-runtime'
/**
 * ProductListItem Component. Normalizes the item received in the props
 * to adapt to the extension point prop.
 */
const ProductListItem = ({ item }: any) => {
  // const newSummary = useMemo(() => assocPath(['name', 'tag'], 'h2', summary), [
  //   summary,
  // ])
  const product = useMemo(
    () => ProductSummary.mapCatalogProductToProductSummary(item),
    [item]
  )

  return <ProductSummaryLegacy product={product} />
}

export default ProductListItem
