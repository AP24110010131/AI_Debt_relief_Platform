import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  FaMoneyBillWave,
  FaWallet,
  FaChartLine,
  FaUniversity,
  FaRobot,
  FaFileAlt,
} from "react-icons/fa";

function Dashboard() {
  const [loans, setLoans] = useState([]);
  const [financial, setFinancial] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const loanRes = await API.get("/loans/");
      const financialRes = await API.get("/financial/");

      setLoans(loanRes.data);
      setFinancial(financialRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalDebt = loans.reduce(
    (sum, loan) => sum + loan.outstanding_amount,
    0
  );

  const monthlyIncome =
    financial.length > 0
      ? financial[0].monthly_income
      : 0;

  const creditScore =
    financial.length > 0
      ? financial[0].credit_score
      : 0;

  const debtRatio =
    monthlyIncome === 0
      ? 0
      : ((totalDebt / monthlyIncome) * 100).toFixed(1);

  let health = "Poor";

  if (creditScore >= 750)
    health = "Excellent";
  else if (creditScore >= 700)
    health = "Good";
  else if (creditScore >= 650)
    health = "Moderate";

  return (
    <div
      className="d-flex"
      style={{
        background: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container-fluid p-4">

          <h2 className="fw-bold mb-4">
            Dashboard
          </h2>

          <div className="row g-4">

            <div className="col-lg-3 col-md-6">

              <div className="card shadow border-0">

                <div className="card-body">

                  <FaMoneyBillWave
                    size={35}
                    color="#2563EB"
                  />

                  <h6 className="mt-3">
                    Total Loans
                  </h6>

                  <h2>{loans.length}</h2>

                </div>

              </div>

            </div>

            <div className="col-lg-3 col-md-6">

              <div className="card shadow border-0">

                <div className="card-body">

                  <FaWallet
                    size={35}
                    color="#16A34A"
                  />

                  <h6 className="mt-3">
                    Outstanding Debt
                  </h6>

                  <h2>
                    ₹{totalDebt.toLocaleString()}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-lg-3 col-md-6">

              <div className="card shadow border-0">

                <div className="card-body">

                  <FaUniversity
                    size={35}
                    color="#DC2626"
                  />

                  <h6 className="mt-3">
                    Monthly Income
                  </h6>

                  <h2>
                    ₹{monthlyIncome.toLocaleString()}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-lg-3 col-md-6">

              <div className="card shadow border-0">

                <div className="card-body">

                  <FaChartLine
                    size={35}
                    color="#9333EA"
                  />

                  <h6 className="mt-3">
                    Credit Score
                  </h6>

                  <h2>{creditScore}</h2>

                </div>

              </div>

            </div>
                        <div className="col-lg-6">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h5 className="mb-4">
                    Financial Overview
                  </h5>

                  <div className="row">

                    <div className="col-6">

                      <div className="border rounded p-3 mb-3">

                        <h6>Debt Ratio</h6>

                        <h3>{debtRatio}%</h3>

                      </div>

                    </div>

                    <div className="col-6">

                      <div className="border rounded p-3 mb-3">

                        <h6>Financial Health</h6>

                        <h3>{health}</h3>

                      </div>

                    </div>

                    <div className="col-12">

                      <div className="alert alert-primary">

                        Keep your debt ratio below
                        <strong> 40%</strong> for a healthier
                        financial profile.

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div className="col-lg-6">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h5 className="mb-4">
                    Quick Actions
                  </h5>

                  <div className="d-grid gap-3">

                    <Link
                      to="/loans"
                      className="btn btn-primary"
                    >
                      Manage Loans
                    </Link>

                    <Link
                      to="/financial"
                      className="btn btn-success"
                    >
                      Financial Profile
                    </Link>

                    <Link
                      to="/ai"
                      className="btn btn-warning"
                    >
                      <FaRobot className="me-2" />
                      AI Recommendation
                    </Link>

                    <Link
                      to="/letter"
                      className="btn btn-info text-white"
                    >
                      <FaFileAlt className="me-2" />
                      Negotiation Letter
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="card shadow border-0 mt-5">

            <div className="card-body">

              <h4 className="mb-4">
                Recent Loans
              </h4>

              <table className="table table-striped">

                <thead>

                  <tr>

                    <th>Lender</th>

                    <th>Loan Type</th>

                    <th>Outstanding</th>

                    <th>Interest</th>

                    <th>Tenure</th>

                  </tr>

                </thead>

                <tbody>

                  {loans.length === 0 ? (

                    <tr>

                      <td
                        colSpan="5"
                        className="text-center"
                      >
                        No Loans Found

                      </td>

                    </tr>

                  ) : (

                    loans.map((loan) => (

                      <tr key={loan.id}>

                        <td>{loan.lender}</td>

                        <td>{loan.loan_type}</td>

                        <td>
                          ₹
                          {loan.outstanding_amount.toLocaleString()}
                        </td>

                        <td>
                          {loan.interest_rate}%
                        </td>

                        <td>
                          {loan.tenure} Months
                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>
                    <div className="row mt-5">

            <div className="col-lg-8">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h4 className="mb-3">
                    AI Powered Debt Relief
                  </h4>

                  <p>
                    This platform helps you manage your
                    loans, monitor your financial profile,
                    and generate AI-powered settlement
                    recommendations using Google Gemini.
                  </p>

                  <Link
                    to="/ai"
                    className="btn btn-primary mt-2"
                  >
                    Generate AI Recommendation
                  </Link>

                </div>

              </div>

            </div>

            <div className="col-lg-4">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h5 className="mb-3">
                    System Status
                  </h5>

                  <table className="table">

                    <tbody>

                      <tr>

                        <td>Backend</td>

                        <td>
                          <span className="badge bg-success">
                            Online
                          </span>
                        </td>

                      </tr>

                      <tr>

                        <td>Database</td>

                        <td>
                          <span className="badge bg-success">
                            Connected
                          </span>
                        </td>

                      </tr>

                      <tr>

                        <td>Gemini AI</td>

                        <td>
                          <span className="badge bg-success">
                            Active
                          </span>
                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;