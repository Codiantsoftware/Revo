import { Suspense } from "react";
import "./App.css";
import { routes } from "./routes";
import { useRoutes, type RouteObject } from "react-router";
import { ThemeProvider } from "./contexts/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  function RouteLayout({ path }: { path: RouteObject[] }) {
    const element = useRoutes(path);
    return element;
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="admin-ui-theme">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                <h2>Loading...</h2>
              </div>
            }
          >
            <RouteLayout path={routes()} />
          </Suspense>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
