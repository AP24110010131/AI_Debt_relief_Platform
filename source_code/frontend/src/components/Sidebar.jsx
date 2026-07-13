import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaMoneyBillWave,
  FaChartLine,
  FaRobot,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      name: "Loans",
      icon: <FaMoneyBillWave />,
      path: "/loans",
    },
    {
      name: "Financial Profile",
      icon: <FaChartLine />,
      path: "/financial",
    },
    {
      name: "AI Recommendation",
      icon: <FaRobot />,
      path: "/ai",
    },
    {
      name: "Negotiation Letter",
      icon: <FaFileAlt />,
      path: "/letter",
    },
  ];

  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#1E3A8A",
        color: "white",
        padding: "25px",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "35px",
          fontWeight: "bold",
        }}
      >
        Debt Relief AI
      </h3>

      {menu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px",
              marginBottom: "12px",
              borderRadius: "10px",
              background:
                location.pathname === item.path
                  ? "#2563EB"
                  : "transparent",
              cursor: "pointer",
            }}
          >
            {item.icon}
            {item.name}
          </div>
        </Link>
      ))}

      <div
        style={{
          position: "absolute",
          bottom: "30px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
        }}
      >
        <FaSignOutAlt />
        Logout
      </div>
    </div>
  );
}

export default Sidebar;