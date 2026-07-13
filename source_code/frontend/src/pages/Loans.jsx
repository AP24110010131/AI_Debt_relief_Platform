import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Loans() {
  const [loans, setLoans] = useState([]);

  const [form, setForm] = useState({
    user_id: 1,
    lender: "",
    loan_type: "",
    outstanding_amount: "",
    interest_rate: "",
    tenure: "",
  });

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await API.get("/loans/");
      setLoans(response.data);
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

const addLoan = async () => {
  try {
    const payload = {
      user_id: parseInt(form.user_id),
      lender: form.lender.trim(),
      loan_type: form.loan_type.trim(),
      outstanding_amount: parseFloat(form.outstanding_amount),
      interest_rate: parseFloat(form.interest_rate),
      tenure: parseInt(form.tenure),
    };

    console.log(payload);

    await API.post("/loans/create", payload);

    alert("Loan Added Successfully");

    fetchLoans();

    setForm({
      user_id: 1,
      lender: "",
      loan_type: "",
      outstanding_amount: "",
      interest_rate: "",
      tenure: "",
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
            Loan Management
          </h2>

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4 className="mb-4">
                Add New Loan
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

                  <label>Lender</label>

                  <input
                    className="form-control"
                    name="lender"
                    value={form.lender}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-4 mb-3">

                  <label>Loan Type</label>

                  <input
                    className="form-control"
                    name="loan_type"
                    value={form.loan_type}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-4 mb-3">

                  <label>Outstanding Amount</label>

                  <input
                    className="form-control"
                    name="outstanding_amount"
                    value={form.outstanding_amount}
                    onChange={handleChange}
                  />

                </div>
                                <div className="col-md-4 mb-3">

                  <label>Interest Rate (%)</label>

                  <input
                    className="form-control"
                    name="interest_rate"
                    value={form.interest_rate}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-4 mb-3">

                  <label>Tenure (Months)</label>

                  <input
                    className="form-control"
                    name="tenure"
                    value={form.tenure}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <button
                className="btn btn-primary mt-3"
                onClick={addLoan}
              >
                Add Loan
              </button>

            </div>

          </div>

          <div className="card shadow border-0">

            <div className="card-body">

              <h4 className="mb-4">
                Loan Records
              </h4>

              <table className="table table-striped table-hover">

                <thead className="table-dark">

                  <tr>

                    <th>ID</th>

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
                        colSpan="6"
                        className="text-center"
                      >
                        No Loans Available
                      </td>

                    </tr>

                  ) : (

                    loans.map((loan) => (

                      <tr key={loan.id}>

                        <td>{loan.id}</td>

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

          <div className="row mt-4">

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Total Loans</h6>

                  <h2>{loans.length}</h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Total Outstanding Debt</h6>

                  <h2>
                    ₹
                    {loans
                      .reduce(
                        (sum, loan) =>
                          sum + loan.outstanding_amount,
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

                  <h6>Average Interest Rate</h6>

                  <h2>
                    {loans.length > 0
                      ? (
                          loans.reduce(
                            (sum, loan) =>
                              sum + loan.interest_rate,
                            0
                          ) / loans.length
                        ).toFixed(1)
                      : 0}
                    %
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

export default Loans;