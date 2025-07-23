import React from "react"
import "./styles/main.css"
import { GroveProvider } from "./contexts/GroveContext"
import Timer from "./components/Timer"
import Grove from "./components/Grove"
import Achievements from "./components/Achievements"
import { NotificationSystem } from "./components/NotificationSystem"

function AppContent() {
  return (
    <div className="App min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <header className="text-center my-8 animate-grow-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-primary">
            Focus Grove
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mt-2">
            Cultivate your focus, one digital tree at a time.
          </p>
        </header>

        <main className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3 flex flex-col gap-8">
            <Timer />
            <Achievements />
          </div>
          <div className="lg:w-2/3">
            <Grove />
          </div>
        </main>

        <footer className="text-center text-muted-foreground text-sm mt-12">
          <p>Built with 🌳 and React. &copy; 2024</p>
        </footer>
      </div>
      <NotificationSystem />
    </div>
  )
}

function App() {
  return (
    <GroveProvider>
      <AppContent />
    </GroveProvider>
  )
}

export default App
