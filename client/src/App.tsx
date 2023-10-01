import { Navigation } from "./components/include/Navigation";
import { Landing } from "./pages/Landing";
import { useStoreZus } from "./store";

function App() {
  const theme = useStoreZus((state) => state.theme);
  return (
    <main className={`${theme} h-screen bg-secondary text-primary px-8 py-5`}>
      <Navigation />
      <Landing />
    </main>
  )
}

export default App
