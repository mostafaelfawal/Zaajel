// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, rtdb } from "./firebase";
import LoginPage from "./pages/Login";
import Mainpage from "./pages/Mainpage";
import LoadingSpinner from "./components/Loading";
import { ref, onDisconnect, set, serverTimestamp } from "firebase/database";
import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";

export default function App() {
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (!user) return;

    const requestPermission = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey:
            "BItvrN22fc_8YnY79u1hr-PkqwvcY35tcS79nssesF-n1GYRLqa_yN90lvh3QIPqlWR0XQYBLTnJi7F2z04tccA",
        });
        if (token) {
          console.log("FCM Token:", token);
        } else {
          console.log("مافيش token, المستخدم رفض الإشعارات");
        }
      } catch (err) {
        console.error("خطأ في جلب التوكن:", err);
      }
    };

    requestPermission();

    // استقبال الإشعارات لما الأبليكيشن مفتوح
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("رسالة جديدة:", payload);
      alert(`${payload.notification?.title}: ${payload.notification?.body}`);
    });

    return () => unsubscribe();
  }, [user]);

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
