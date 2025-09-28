// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, rtdb } from "./firebase";
import LoginPage from "./pages/Login";
import Mainpage from "./pages/Mainpage";
import LoadingSpinner from "./components/Loading";
import { ref, onDisconnect, set, serverTimestamp } from "firebase/database";
import { useEffect } from "react";

export default function App() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const statusRef = ref(rtdb, `status/${uid}`);

    // كل ما المستخدم يغلق المتصفح أو يقطع الاتصال
    onDisconnect(statusRef).set({
      state: false,
      lastChanged: serverTimestamp(),
    });

    // المستخدم متصل
    set(statusRef, {
      state: true,
      lastChanged: serverTimestamp(),
    });
  }, [user]);

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
