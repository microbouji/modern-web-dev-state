import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { getProducts } from './products-data'
import { Container, Heading } from './BaseStyles'
import { ProductsFilters, ProductsList } from './Products'

const filters = ['All', 'Lamp', 'Chair', 'Table', 'Sofa']

export const ProductsHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 48em) {
    display: block;
  }
`

export const ProductsTitle = styled(Heading)`
  @media (min-width: 80em) {
    margin-bottom: 0.625em;
  }
`

function ProductsSection() {
  const [activeFilter, setActiveFilter] = useState({
    current: 'All',
    prev: null,
  })
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function mockFetchingData() {
      setLoading(true)
      await new Promise((r) => setTimeout(r, 2200)) // sleep

      setLoading(false)
      setProducts(getProducts(activeFilter.current))
    }

    mockFetchingData()
  }, [activeFilter])

  function onChangeFilter(filter) {
    setActiveFilter((activeFilter) => ({
      prev: activeFilter.current,
      current: filter,
    }))
  }

  return (
    <Container smPadding="left" mdPadding="horizontal" role="main">
      <ProductsHeading>
        <ProductsTitle>Products</ProductsTitle>
        <ProductsFilters
          filters={filters}
          activeFilter={activeFilter}
          onChangeFilter={onChangeFilter}
        ></ProductsFilters>
      </ProductsHeading>

      <ProductsList
        loading={loading}
        activeFilter={activeFilter}
        products={products}
      />
    </Container>
  )
}

export default ProductsSection
