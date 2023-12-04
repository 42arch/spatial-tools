import { ThemeProvider } from '@/components/theme-provider'
import MainPage from './pages/main'
import './App.css'
import 'allotment/dist/style.css'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <MainPage />
    </ThemeProvider>
  )
}

export default App
