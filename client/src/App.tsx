import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/include/Navigation";
import { Landing } from "./pages/Landing";
import { useStoreZus } from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
import { Home } from "./pages/Home";

function App() {
  const theme = useStoreZus((state) => state.theme);
  const queryClient = new QueryClient();

  return (
    <main className={`${theme} h-screen bg-secondary text-primary px-8 py-5`}>
      <QueryClientProvider client={queryClient}>
        <Navigation />
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="landing" element={<Landing />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </main>
  )
}

export default App
