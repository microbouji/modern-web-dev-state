import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ky from 'ky'

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
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(() => {
    let cancelled = false
    let endpoint =
      'https://c300bbvloc.execute-api.us-east-1.amazonaws.com/dev/products'
    if (activeFilter.current !== 'All') {
      endpoint += '/' + activeFilter.current
    }

    async function getProducts() {
      setError(null)
      setLoading(true)
      try {
        const data = await ky.get(endpoint).json()
        if (!cancelled) setProducts(data)
      } catch (e) {
        if (!cancelled) setError(e)
      }

      if (!cancelled) setLoading(false)
    }

    getProducts()

    return () => {
      cancelled = true
    }
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

      {error ? (
        error.message
      ) : (
        <ProductsList
          loading={loading}
          activeFilter={activeFilter}
          products={products}
        />
      )}
    </Container>
  )
}

export default ProductsSection
