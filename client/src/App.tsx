import { Navigation } from "./components/include/Navigation";
import { Landing } from "./pages/Landing";
import { useStoreZus } from "./store";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const theme = useStoreZus((state) => state.theme);
  const queryClient = new QueryClient();
  return (
    <main className={`${theme} h-screen bg-secondary text-primary px-8 py-5`}>
      <QueryClientProvider client={queryClient}>
        <Navigation />
        <Landing />
      </QueryClientProvider>
    </main>
  )
}

export default App
