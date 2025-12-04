import './App.css'
import AppRoutes from './route/route-config'
import { ChatbotToggle } from "./components/chatbot/chatbotToggle"
import ScrollToTop from "./components/ui/scrollToTop";

function App() {
 
  return (
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    //   <LoginPage />
    // </div>
    <div className="min-h-screen">
      <ScrollToTop />
      <AppRoutes />
      <ChatbotToggle />
    </div>
  )
}

export default App
