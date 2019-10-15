interface ProductsQueryParams {
  category: string
  collection: string
  specificationFilters: string[]
  orderBy: string
  from: number
  to: number
  hideUnavailableItems: boolean
}

interface Product {
  cacheId: string
  productId: string
  productName: string
  productReference: string
  description: string
  link: string
  linkText: string
  brand: string
  brandId: number
  specificationGroups: {
    name: string
    specifications: {
      name: string
      values: string[]
    }
  }
  items: {
    name: string
    itemId: string
    measurementUnit: string
    unitMultiplier: number
    referenceId: {
      Value: string
    }
    images: {
      imageUrl: string
      imageTag: string
      imageLabel: string
    }
    sellers: {
      sellerId: string
      commertialOffer: {
        Installments: {
          Value: number
          InterestRate: number
          TotalValuePlusInterestRate: number
          NumberOfInstallments: number
          Name: string
        }
        AvailableQuantity: number
        Price: number
        ListPrice: number
        teasers: {
          name: string
        }
        discountHighlights: {
          name: string
        }
      }
    }
  }
  productClusters: {
    id: string
    name: string
  }
  properties: {
    name: string
    values: string[]
  }
}
