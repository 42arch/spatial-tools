import { ThemeProvider } from '@/components/theme-provider'
import './App.css'
import MainPage from './pages/main'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <MainPage />
    </ThemeProvider>
  )
}

export default App
