import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Home from './components/Home'
import './App.css'

// Создаем клиент React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>NEVA</h1>
        <p>Frontend is running successfully!</p>
        
        {/* Компонент для проверки подключения к бэкенду */}
        <Home />
      </div>
      
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App