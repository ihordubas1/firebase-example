import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/protected-route.component";
import { AuthProvider } from "./contexts/auth.context";
import { LoginPage, ScenesPage } from "./pages";

const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* LOGIN */}
          <Route path="/login" element={<LoginPage />} />

          {/* MY SCENES(HOME) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ScenesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export { App };
