import { useState } from "react";
import { Navigation } from "./components/include/Navigation";
import { Home } from "./pages/Home";
import { Landing } from "./pages/Landing";

function App() {
  const [theme, setTheme] = useState("light");
  const handleTheme = () => {
    setTheme(prev => prev === "light" ? prev = "dark" : prev = "light");
  }
  return (
    <main className={`${theme} px-8 py-5`}>
      <button onClick={handleTheme}>{theme} mode</button>
      <Navigation />
      {/* <Home /> */}
      <Landing />
    </main>
  )
}

export default App
