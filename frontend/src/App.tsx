import Navbar from "./components/Navbar";
import AppRoutes from "./routes/appRoutes";
import AuthProvider from "./auth/AuthProvider";

export default function App() {
  return (
    <main>
      <AuthProvider>
        <Navbar />

        <AppRoutes />
      </AuthProvider>
    </main>
  );
}
