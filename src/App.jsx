import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductsSection from './ProductsSection'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsSection />
    </QueryClientProvider>
  )
}

export default App
