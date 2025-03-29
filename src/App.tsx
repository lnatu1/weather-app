import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen gradient">
          <div className="max-w-md mx-auto w-full py-6">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
