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
    futuristic: [], // Store selected options as array of strings
    digital: [], // Store selected options as array of strings
    personsAttending: "",
    category: "",
  });

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
          updatedOptions = [...currentOptions, option]; // Add option if checked
        } else {
          updatedOptions = currentOptions.filter((item) => item !== option); // Remove option if unchecked
        }
        console.log(`Updated ${category}:`, updatedOptions); // Debug checkbox state
        return { ...prev, [category]: updatedOptions };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format futuristic and digital as comma-separated strings
    const formattedFormData = {
      ...formData,
      futuristic: formData.futuristic.length > 0 ? formData.futuristic.join(", ") : "None selected",
      digital: formData.digital.length > 0 ? formData.digital.join(", ") : "None selected",
    };

    // Debug the data being sent to EmailJS
    console.log("Raw formData:", formData);
    console.log("Formatted Form Data:", formattedFormData);

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID, // Use environment variable
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID, // Use environment variable
        formattedFormData,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY // Use environment variable
      )
      .then(
        (response) => {
          alert("Form submitted successfully!");
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          alert("Failed to send form.");
          console.log("FAILED...", err);
        }
      );
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "800px", margin: "auto" }}>
      <div className="logo"> <img src="image.png" alt="Logo" /></div>

      <h2>Demo Prerequisite Form – Credit Society</h2>

      <div>
        <label>Contact Person:</label>
        <input name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
      </div>

      <div>
        <label>Mobile:</label>
        <input name="mobile" value={formData.mobile} onChange={handleChange} required />
      </div>

      <div>
        <label>Demo Date:</label>
        <input type="date" name="demoDate" value={formData.demoDate} onChange={handleChange} required />
      </div>

      <div>
        <label>Demo Time:</label>
        <input type="time" name="demoTime" value={formData.demoTime} onChange={handleChange} required />
      </div>

      <div>
        <label>No. of Members for Demo:</label>
        <input type="number" name="members" value={formData.members} onChange={handleChange} />
      </div>

      <div>
        <label>No. of Branches:</label>
        <input type="number" name="branches" value={formData.branches} onChange={handleChange} />
      </div>

      <div>
        <label>Current CBS Vendor:</label>
        <input name="currentCBS" value={formData.currentCBS} onChange={handleChange} />
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

      <div>
        <label>Tentative no of persons attending:</label>
        <input type="number" name="personsAttending" value={formData.personsAttending} onChange={handleChange} />
      </div>

      <div>
        <label>Category:</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Chairman">Chairman</option>
          <option value="Director">Director</option>
          <option value="General Manager">General Manager</option>
          <option value="Manager">Manager</option>
          <option value="Staff/Other">Staff/Other</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;