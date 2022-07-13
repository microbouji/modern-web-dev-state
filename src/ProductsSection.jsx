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
  const [activeFilter, setActiveFilter] = useState('All')
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function mockFetchingData() {
      await new Promise((r) => setTimeout(r, 1500)) // sleep for 1500ms
      setProducts(getProducts(activeFilter))
    }

    mockFetchingData()
  }, [activeFilter])

  function onChangeFilter(filter) {
    setActiveFilter(filter)
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

      <ProductsList products={products} />
    </Container>
  )
}

export default ProductsSection
