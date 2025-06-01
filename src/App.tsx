import { BrowserRouter } from "react-router-dom"; // Correct import
import { ConfigProvider } from "antd"; // Removed unnecessary AntApp import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainRoutes from "./app/routes/MainRoutes/MainRoutes";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Bai Jamjuree",
            colorLink: "#02cf5b",
            borderRadius: 4,
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <MainRoutes />
        </QueryClientProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;