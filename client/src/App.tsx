import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/include/Navigation";
import { Landing } from "./pages/Landing";
import { useThemeZus } from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
import { Home } from "./pages/Home";

export const queryClient = new QueryClient();

function App() {
  const theme = useThemeZus((state) => state.theme);
  return (
    <main className={`${theme} h-screen bg-secondary text-primary px-8 py-5`}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navigation />
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
