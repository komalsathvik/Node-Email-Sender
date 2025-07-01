import React, { useState } from "react";
import axios from "axios";

export default function SendEmail() {
  const [form, setForm] = useState({
    to: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await axios.post("backend-url", form);
      setStatus("✅ Email sent successfully!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send email.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📧 Send an Email</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="to"
          placeholder="Recipient's Email"
          value={form.to}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="message"
          placeholder="Type your message..."
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          Send Email
        </button>
      </form>
      <p style={styles.status}>{status}</p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "vertical"
  },
  button: {
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  },
  status: {
    marginTop: "20px",
    textAlign: "center",
    color: "#555"
  }
};
