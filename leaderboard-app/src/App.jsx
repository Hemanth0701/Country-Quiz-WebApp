// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import StartSection from "./components/StartSection.jsx";
import About from "./components/About.jsx";
import Reviews from "./components/Reviews.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage";
import GamePage from "./pages/GamePage.jsx";
import { fetchLeaderboard } from "./api/leaderboard.js";

export default function App() {
  const [overall, setOverall] = useState([]);
  const [today, setToday] = useState([]);
  const [loading, setLoading] = useState({ overall: true, today: true });
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("demo_user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading((prev) => ({ ...prev, overall: true }));
      const data = await fetchLeaderboard("overall");
      if (mounted) {
        setOverall(data);
        setLoading((prev) => ({ ...prev, overall: false }));
      }
    })();

    (async () => {
      setLoading((prev) => ({ ...prev, today: true }));
      const data = await fetchLeaderboard("today");
      if (mounted) {
        setToday(data);
        setLoading((prev) => ({ ...prev, today: false }));
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleLogin = (profile) => {
    setUser(profile);
    localStorage.setItem("demo_user", JSON.stringify(profile));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("demo_user");
  };

  return (
    <Router>
      <div className="app">
        <Header user={user} onLogout={handleLogout} />

        <main className="container">
          <Routes>
            {/* Home Page (leaderboards + start + about + reviews) */}
            <Route
              path="/"
              element={
                <>
                  <section
                    className="leaderboards"
                    aria-labelledby="leaderboards-heading"
                  >
                    <h2 id="leaderboards-heading" className="sr-only">
                      Leaderboards
                    </h2>
                    <Leaderboard
                      title="Overall Leaderboard"
                      items={overall}
                      loading={loading.overall}
                    />
                    <Leaderboard
                      title="Today’s Leaderboard"
                      items={today}
                      loading={loading.today}
                    />
                  </section>

                  <StartSection user={user} />
                  <About />
                  <Reviews />
                </>
              }
            />

            {/* Login page */}
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            {/* register page */}
            <Route path="/register" element={<RegisterPage />} />

            {/* Game page */}
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </main>

        <footer className="footer">
          © {new Date().getFullYear()} Leaderboard App
        </footer>
      </div>
    </Router>
  );
}
