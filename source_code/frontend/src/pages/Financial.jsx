import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Financial() {
  const [profiles, setProfiles] = useState([]);

  const [form, setForm] = useState({
    user_id: 1,
    monthly_income: "",
    monthly_expense: "",
    total_debt: "",
    credit_score: "",
  });

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await API.get("/financial/");
      setProfiles(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      await API.post("/financial/create", {
        user_id: parseInt(form.user_id),
        monthly_income: parseFloat(form.monthly_income),
        monthly_expense: parseFloat(form.monthly_expense),
        total_debt: parseFloat(form.total_debt),
        credit_score: parseInt(form.credit_score),
      });

      alert("Financial Profile Saved");

      fetchProfiles();

      setForm({
        user_id: 1,
        monthly_income: "",
        monthly_expense: "",
        total_debt: "",
        credit_score: "",
      });

    } catch (err) {
      console.log(err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  return (
    <div
      className="d-flex"
      style={{
        background: "#F5F7FA",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container-fluid p-4">

          <h2 className="fw-bold mb-4">
            Financial Profile
          </h2>

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4 className="mb-4">
                Update Financial Details
              </h4>

              <div className="row">

                <div className="col-md-4 mb-3">

                  <label>User ID</label>

                  <input
                    className="form-control"
                    name="user_id"
                    value={form.user_id}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-4 mb-3">

                  <label>Monthly Income</label>

                  <input
                    className="form-control"
                    name="monthly_income"
                    value={form.monthly_income}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-4 mb-3">

                  <label>Monthly Expense</label>

                  <input
                    className="form-control"
                    name="monthly_expense"
                    value={form.monthly_expense}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label>Total Debt</label>

                  <input
                    className="form-control"
                    name="total_debt"
                    value={form.total_debt}
                    onChange={handleChange}
                  />

                </div>
                                <div className="col-md-6 mb-3">

                  <label>Credit Score</label>

                  <input
                    className="form-control"
                    name="credit_score"
                    value={form.credit_score}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <button
                className="btn btn-success mt-3"
                onClick={saveProfile}
              >
                Save Profile
              </button>

            </div>

          </div>

          <div className="card shadow border-0">

            <div className="card-body">

              <h4 className="mb-4">
                Financial Records
              </h4>

              <table className="table table-striped table-hover">

                <thead className="table-dark">

                  <tr>

                    <th>ID</th>
                    <th>Income</th>
                    <th>Expense</th>
                    <th>Total Debt</th>
                    <th>Credit Score</th>

                  </tr>

                </thead>

                <tbody>

                  {profiles.length === 0 ? (

                    <tr>

                      <td
                        colSpan="5"
                        className="text-center"
                      >
                        No Financial Profile Found
                      </td>

                    </tr>

                  ) : (

                    profiles.map((profile) => (

                      <tr key={profile.id}>

                        <td>{profile.id}</td>

                        <td>
                          ₹
                          {profile.monthly_income.toLocaleString()}
                        </td>

                        <td>
                          ₹
                          {profile.monthly_expense.toLocaleString()}
                        </td>

                        <td>
                          ₹
                          {profile.total_debt.toLocaleString()}
                        </td>

                        <td>
                          {profile.credit_score}
                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

          <div className="row mt-4">

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Profiles</h6>

                  <h2>{profiles.length}</h2>

                </div>

              </div>

            </div>
                        <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Total Monthly Income</h6>

                  <h2>
                    ₹
                    {profiles
                      .reduce(
                        (sum, profile) =>
                          sum + profile.monthly_income,
                        0
                      )
                      .toLocaleString()}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Average Credit Score</h6>

                  <h2>
                    {profiles.length > 0
                      ? (
                          profiles.reduce(
                            (sum, profile) =>
                              sum + profile.credit_score,
                            0
                          ) / profiles.length
                        ).toFixed(0)
                      : 0}
                  </h2>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Financial;