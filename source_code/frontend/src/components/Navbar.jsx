import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg bg-white shadow-sm"
      style={{
        height: "70px",
        paddingLeft: "30px",
        paddingRight: "30px",
      }}
    >
      <div className="container-fluid">

        <h4
          style={{
            fontWeight: "bold",
            color: "#1E3A8A",
            margin: 0,
          }}
        >
          AI Powered Debt Relief Platform
        </h4>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "25px",
            fontSize: "22px",
          }}
        >
          <FaBell style={{ cursor: "pointer" }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FaUserCircle
              style={{
                fontSize: "35px",
                color: "#2563EB",
              }}
            />

            <div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Welcome
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "gray",
                }}
              >
                User
              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;