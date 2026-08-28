import Navbar from "./components/Navbar";
import AppRoutes from "./routes/appRoutes";
import AuthProvider from "./auth/AuthProvider";

export default function App() {
  return (
    <main>
      <Navbar />
      <AuthProvider>

      <AppRoutes />
      </AuthProvider>
    </main>
  );
}
