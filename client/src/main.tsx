import { createRoot } from 'react-dom/client'
import 'react-chatbot-kit/build/main.css';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <App />,
)
