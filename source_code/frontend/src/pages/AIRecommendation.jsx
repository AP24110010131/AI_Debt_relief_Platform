import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AIRecommendation() {

  const [form, setForm] = useState({
    user_id: 1,
    monthly_income: "",
    monthly_expense: "",
    total_debt: "",
    credit_score: "",
  });

  const [recommendation, setRecommendation] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const generateRecommendation = async () => {

    try {

      const response = await API.post(
        "/ai/settlement",
        {
          user_id: parseInt(form.user_id),
          monthly_income: parseFloat(form.monthly_income),
          monthly_expense: parseFloat(form.monthly_expense),
          total_debt: parseFloat(form.total_debt),
          credit_score: parseInt(form.credit_score),
        }
      );

      setRecommendation(
        response.data.recommendation
      );

    } catch (err) {

      console.log(err.response?.data);

      alert(
        JSON.stringify(err.response?.data)
      );

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
            AI Settlement Recommendation
          </h2>

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4 className="mb-4">
                Enter Financial Details
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
                className="btn btn-primary mt-3"
                onClick={generateRecommendation}
              >
                Generate AI Recommendation
              </button>

            </div>

          </div>

          <div className="card shadow border-0">

            <div className="card-body">

              <h4 className="mb-4">
                AI Recommendation
              </h4>

              {recommendation === "" ? (

                <div className="alert alert-secondary">

                  Click
                  <strong> Generate AI Recommendation </strong>
                  to receive personalized financial advice.

                </div>

              ) : (

                <div
                  className="alert alert-success"
                  style={{
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.8",
                  }}
                >

                  {recommendation}

                </div>

              )}

            </div>

          </div>

          <div className="row mt-4">

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Monthly Income</h6>

                  <h2>
                    ₹
                    {form.monthly_income || 0}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Total Debt</h6>

                  <h2>
                    ₹
                    {form.total_debt || 0}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Credit Score</h6>

                  <h2>
                    {form.credit_score || 0}
                  </h2>

                </div>

              </div>

            </div>

          </div>
                    <div className="row mt-4">

            <div className="col-md-12">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h5 className="mb-3">
                    Tips
                  </h5>

                  <ul>
                    <li>Maintain your credit score above <strong>700</strong>.</li>
                    <li>Keep your debt-to-income ratio below <strong>40%</strong>.</li>
                    <li>Pay EMIs on time to avoid penalties.</li>
                    <li>Use the AI recommendation before requesting a settlement.</li>
                  </ul>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AIRecommendation;