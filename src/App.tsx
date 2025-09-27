// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import LoginPage from "./pages/Login";
import Mainpage from "./pages/Mainpage";
import LoadingSpinner from "./components/Loading";

export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* لو المستخدم مسجل دخول يروح للصفحة الرئيسية */}
      <Route
        path="/"
        element={user ? <Mainpage /> : <Navigate to="/login" replace />}
      />

      {/* لو مش مسجل دخول يروح للـ login */}
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/" replace />}
      />

      {/* أي Route مش معروف يرجع على حسب الحالة */}
      <Route
        path="*"
        element={<Navigate to={user ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}
