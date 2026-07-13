import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function NegotiationLetter() {

  const [form, setForm] = useState({
    name: "",
    lender: "",
    total_debt: "",
    monthly_income: "",
  });

  const [letter, setLetter] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const generateLetter = async () => {

    try {

      const response = await API.post(
        "/ai/negotiation-letter",
        {
          name: form.name,
          lender: form.lender,
          total_debt: parseFloat(form.total_debt),
          monthly_income: parseFloat(form.monthly_income),
        }
      );

      setLetter(response.data.letter);

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
            AI Negotiation Letter
          </h2>

          <div className="card shadow border-0">

            <div className="card-body">

              <h4 className="mb-4">
                Enter Details
              </h4>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label>Name</label>

                  <input
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label>Lender</label>

                  <input
                    className="form-control"
                    name="lender"
                    value={form.lender}
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

                  <label>Monthly Income</label>

                  <input
                    className="form-control"
                    name="monthly_income"
                    value={form.monthly_income}
                    onChange={handleChange}
                  />

                </div>
                              </div>

              <button
                className="btn btn-primary mt-3"
                onClick={generateLetter}
              >
                Generate Negotiation Letter
              </button>

            </div>

          </div>

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4 className="mb-3">
                AI Generated Letter
              </h4>

              {letter === "" ? (

                <div className="alert alert-secondary">

                  Fill the details above and click
                  <strong> Generate Negotiation Letter </strong>
                  to receive a professional settlement letter.

                </div>

              ) : (

                <div
                  className="border rounded p-4"
                  style={{
                    background: "#ffffff",
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.8",
                    minHeight: "350px",
                  }}
                >

                  {letter}

                </div>

              )}

            </div>

          </div>

          <div className="row mt-4">

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Applicant</h6>

                  <h4>{form.name || "-"}</h4>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Lender</h6>

                  <h4>{form.lender || "-"}</h4>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Total Debt</h6>

                  <h4>
                    ₹{form.total_debt || 0}
                  </h4>

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

                    <li>
                      Review the AI-generated letter before sending it.
                    </li>

                    <li>
                      Replace placeholder information with your actual loan details.
                    </li>

                    <li>
                      Keep supporting documents ready when negotiating with the lender.
                    </li>

                    <li>
                      Maintain respectful and professional communication throughout the settlement process.
                    </li>

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

export default NegotiationLetter;