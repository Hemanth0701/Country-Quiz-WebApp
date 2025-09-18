// import React, { useEffect, useState } from "react";
// import { useAuth } from "../hooks/useAuth";
// import UserDashboard from "./UserDashboard";
// import AdminDashboard from "./AdminDashboard";

// export default function Dashboard() {
//  // const { role, user } = useAuth();
//   const { role } = useAuth();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       const token = localStorage.getItem("token");

//       if (role === "USER") {
//         const res = await fetch("/api/user/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setData(await res.json());
//       } else if (role === "ADMIN") {
//         const res = await fetch("/api/admin/stats", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setData(await res.json());
//       }
//     }

//     if (role) fetchData();
//   }, [role]);

//   if (!role) return <p className="p-6 text-center">Loading...</p>;
//   if (!data) return <p className="p-6 text-center">Fetching dashboard data...</p>;

//   return role === "USER" ? (
//     <UserDashboard user={data} />
//   ) : (
//     <AdminDashboard stats={data} />
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import UserDashboard from "./UserDashboard";
// import AdminDashboard from "./AdminDashboard";

// export default function Dashboard() {
//   const { user, token } = useAuth();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       if (!user || !token) return;

//       const endpoint = user.role === "USER" ? "/api/user/me" : "/api/admin/stats";

//       const res = await fetch(endpoint, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.ok) {
//         setData(await res.json());
//       }
//     }

//     fetchData();
//   }, [user, token]);

//   if (!user) return <p className="p-6 text-center">Loading...</p>;
//   if (!data) return <p className="p-6 text-center">Fetching dashboard data...</p>;

//   return user.role === "USER" ? (
//     <UserDashboard user={data} />
//   ) : (
//     <AdminDashboard stats={data} />
//   );
// }

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import { API_URL } from "../config/constants";

export default function Dashboard() {
  const { role,  token } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!role || !token) return;

      try {
        if (role === "USER") {
          const res = await fetch(`${API_URL}/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setData(await res.json());
        } else if (role === "ADMIN") {
          const res = await fetch(`${API_URL}/admin/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setData(await res.json());
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    }

    fetchData();
  }, [role, token]); // ✅ added token, no missing dependency now

  if (!role) return <p className="p-6 text-center">Loading...</p>;
  if (!data) return <p className="p-6 text-center">Fetching dashboard data...</p>;

  return role === "USER" ? (
    <UserDashboard user={data} />
  ) : (
    <AdminDashboard stats={data} />
  );
}
