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
      const res = await axios.post("local-host url", form);
      setStatus("✅ Email sent successfully!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send email.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📧 Send an Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="to"
          placeholder="To"
          value={form.to}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        /><br /><br />
        <textarea
          name="message"
          placeholder="Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Send Email</button>
      </form>
      <p>{status}</p>
    </div>
  );
}
