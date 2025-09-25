import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    contactPerson: "",
    mobile: "",
    demoDate: "",
    demoTime: "",
    members: "",
    branches: "",
    currentCBS: "",
    email: "",
    futuristic: [],
    digital: [],
    personsAttending: "",
    category: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const futuristicOptions = [
    "CBS – Aadhaar Based Customer Opening",
    "Gold Loan Special Module",
    "Recovery – AI Calling",
    "Mobile App – Recovery / Marketing / New Loan Visit",
    "101 Notice & Other Notice Management",
    "Payroll",
  ];

  const digitalOptions = [
    "Fund Transfer (RTGS / NEFT / IMPS)",
    "Any Bank Cash Withdrawal – AEPS",
    "QR Code Collection",
    "Agent-less Pigmy / RD / EMI Collection",
    "AI Marketing – Deposit / Loan Schemes",
    "CIBIL Checking",
    "Mobile Banking for Customers",
  ];

  const initialFormState = {
    contactPerson: "",
    mobile: "",
    demoDate: "",
    demoTime: "",
    members: "",
    branches: "",
    currentCBS: "",
    email: "",
    futuristic: [],
    digital: [],
    personsAttending: "",
    category: "",
  };

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("futuristic-") || name.startsWith("digital-")) {
      const category = name.split("-")[0];
      const index = parseInt(name.split("-")[1]);
      const option = category === "futuristic" ? futuristicOptions[index] : digitalOptions[index];

      setFormData((prev) => {
        const currentOptions = prev[category];
        let updatedOptions;
        if (checked) {
          updatedOptions = [...currentOptions, option];
        } else {
          updatedOptions = currentOptions.filter((item) => item !== option);
        }
        return { ...prev, [category]: updatedOptions };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formattedFormData = {
        ...formData,
        futuristic: formData.futuristic.length > 0 ? formData.futuristic.join(", ") : "None selected",
        digital: formData.digital.length > 0 ? formData.digital.join(", ") : "None selected",
      };

      const response = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formattedFormData,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      console.log("SUCCESS!", response.status, response.text);
      setFormData(initialFormState);
      showNotification("Form submitted successfully! 🎉", "success");
    } catch (err) {
      console.log("FAILED...", err);
      showNotification("Failed to send form. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", position: "relative" }}>
      {notification.show && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: notification.type === "success" ? "#4CAF50" : "#f44336",
            color: "white",
            padding: "15px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
            fontSize: "16px",
            fontWeight: "500",
            maxWidth: "350px",
            wordWrap: "break-word",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          {notification.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="logo">
          <img src="image.png" alt="Logo" />
        </div>

        <h2>Demo Prerequisite Form – Credit Society</h2>

        <div className="form-row firstrow">
          <div className="form-group formadj">
            <label>Contact Person:</label>
            <input name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
          </div>
          <div className="form-group formadj">
            <label>Mobile:</label>
            <input name="mobile" value={formData.mobile} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Demo Date:</label>
            <input type="date" name="demoDate" value={formData.demoDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Demo Time:</label>
            <input type="time" name="demoTime" value={formData.demoTime} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>No. of Members for Demo:</label>
            <input type="number" name="members" value={formData.members} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>No. of Branches:</label>
            <input type="number" name="branches" value={formData.branches} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row firstrow formadj">
          <div className="form-group">
            <label>Current CBS Vendor:</label>
            <input name="currentCBS" value={formData.currentCBS} onChange={handleChange} />
          </div>
          <div className="form-group formadj">
            <label>Email (Optional):</label>
            <input name="email" value={formData.email} onChange={handleChange}/>
          </div>
        </div>

        <h3>Futuristic Banking</h3>
        {futuristicOptions.map((item, idx) => (
          <div key={idx} className="checkbox-group">
            <input
              type="checkbox"
              name={`futuristic-${idx}`}
              checked={formData.futuristic.includes(item)}
              onChange={handleChange}
            />
            <label>{item}</label>
          </div>
        ))}

        <h3>Digital Banking</h3>
        {digitalOptions.map((item, idx) => (
          <div key={idx} className="checkbox-group">
            <input
              type="checkbox"
              name={`digital-${idx}`}
              checked={formData.digital.includes(item)}
              onChange={handleChange}
            />
            <label>{item}</label>
          </div>
        ))}
      <div className="form-row">
        <div className="form-group formadj">
          <label>Tentative no of persons attending:</label>
          <input type="number" name="personsAttending" value={formData.personsAttending} onChange={handleChange} />
        </div>

        <div className="form-group formadj">
          <label>Category:</label>
          <input name="category" value={formData.category} onChange={handleChange} />
        </div>
</div>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? "#ccc" : "#009bb5",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.7 : 1,
            marginTop: "20px",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Form;