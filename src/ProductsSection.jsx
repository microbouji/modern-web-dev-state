import { useState } from 'react'
import styled from 'styled-components'
import ky from 'ky'
import { useQuery } from '@tanstack/react-query'

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
  function onChangeFilter(filter) {
    setActiveFilter((activeFilter) => ({
      prev: activeFilter.current,
      current: filter,
    }))
  }

  const [activeFilter, setActiveFilter] = useState({
    current: 'All',
    prev: null,
  })

  let endpoint =
    'https://c300bbvloc.execute-api.us-east-1.amazonaws.com/dev/products'

  if (activeFilter.current !== 'All') {
    endpoint += '/' + activeFilter.current
  }

  const {
    isLoading,
    error,
    data: products = [],
    isPreviousData,
  } = useQuery({
    queryKey: ['products', activeFilter.current],
    queryFn: async () => await ky.get(endpoint).json(),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  })

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

      {error ? (
        error.message
      ) : (
        <ProductsList
          loading={isLoading || isPreviousData}
          activeFilter={activeFilter}
          products={products}
        />
      )}
    </Container>
  )
}

export default ProductsSection
