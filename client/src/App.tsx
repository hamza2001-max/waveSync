import { useState } from "react";
import { Navigation } from "./components/include/Navigation";
// import { Home } from "./pages/Home";
import { Landing } from "./pages/Landing";
import { useStoreZus } from "./store";

function App() {
  // const [theme, setTheme] = useState("light");
  // const handleTheme = () => {
  //   setTheme(prev => prev === "light" ? prev = "dark" : prev = "light");
  // }
  const theme = useStoreZus((state) => state.theme);

  return (
    <main className={`${theme} h-screen bg-secondary text-primary px-8 py-5`}>
      {/* <button onClick={handleTheme}>{theme} mode</button> */}
      <Navigation />
      {/* <Home /> */}
      <Landing />
    </main>
  )
}

export default App
