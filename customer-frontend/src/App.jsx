
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// Your Spring Boot backend
const API = "http://localhost:8080/customer";

function App() {
  const [customers, setCustomers] = useState([]);
  const [welcome, setWelcome] = useState("");
  const [message, setMessage] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: "",
    email: "",
    phone: "",
  };

  const [form, setForm] = useState(emptyForm);

  // Load all customers
  async function loadCustomers() {
    try {
      const response = await axios.get(`${API}/getcustomers`);
      setCustomers(response.data);
    } catch (error) {
      setMessage("Could not load customers. Check your backend.");
    }
  }

  // Load the welcome message
  async function loadWelcome() {
    try {
      const response = await axios.get(`${API}/wel`);
      setWelcome(response.data);
    } catch (error) {
      setWelcome("Welcome to Customer Management");
    }
  }

  useEffect(() => {
    loadCustomers();
    loadWelcome();
  }, []);

  // Update form fields when typing
  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  // Create or update customer
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (editingId !== null) {
        await axios.put(
          `${API}/update/${editingId}`,
          form
        );
        setMessage("Customer updated successfully!");
      } else {
        await axios.post(`${API}/create`, form);
        setMessage("Customer created successfully!");
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadCustomers();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to save customer. Check the backend."
      );
    }
  }

  // Search by customer ID
  async function searchById() {
    if (!searchId.trim()) {
      setMessage("Please enter a customer ID.");
      return;
    }

    try {
      const response = await axios.get(
        `${API}/getCus/${encodeURIComponent(searchId)}`
      );
      setCustomers([response.data]);
      setMessage("Customer found!");
    } catch (error) {
      setMessage("Customer ID not found.");
    }
  }

  // Search by email
  async function searchByEmail() {
    if (!searchEmail.trim()) {
      setMessage("Please enter an email.");
      return;
    }

    try {
      const response = await axios.get(
        `${API}/getcus/email/${encodeURIComponent(searchEmail)}`
      );
      setCustomers([response.data]);
      setMessage("Customer found!");
    } catch (error) {
      setMessage("Customer email not found.");
    }
  }

  // Put selected customer details into the form
  function editCustomer(customer) {
    setEditingId(customer.cid);
    setForm({
      name: customer.name ?? "",
      email: customer.email ?? "",
      phone: customer.phone ?? "",
    });
    setMessage("Edit the details and click Update Customer.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Delete a customer
  async function deleteCustomer(cid) {
    if (!window.confirm(`Delete customer ${cid}?`)) {
      return;
    }

    try {
      await axios.delete(`${API}/delete/${cid}`);
      setMessage("Customer deleted successfully!");
      await loadCustomers();
    } catch (error) {
      setMessage("Unable to delete customer.");
    }
  }

  // Clear the form
  function clearForm() {
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Customer Management</h1>
        <p>{welcome}</p>
      </header>

      <main className="container">
        {message && (
          <div className="message">{message}</div>
        )}

        <section className="card">
          <h2>
            {editingId !== null
              ? "Update Customer"
              : "Add New Customer"}
          </h2>

          <form onSubmit={handleSubmit}>
            <label>Customer Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter customer name"
              required
            />

            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />

            <label>Phone Number</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />

            <div className="actions">
              <button type="submit">
                {editingId !== null
                  ? "Update Customer"
                  : "Create Customer"}
              </button>

              <button
                type="button"
                className="secondary"
                onClick={clearForm}
              >
                Clear
              </button>
            </div>
          </form>
        </section>

        <section className="card">
          <h2>Search Customer</h2>

          <div className="search-row">
            <input
              value={searchId}
              onChange={(event) =>
                setSearchId(event.target.value)
              }
              placeholder="Enter customer ID"
            />
            <button onClick={searchById}>Search ID</button>
          </div>

          <div className="search-row">
            <input
              type="email"
              value={searchEmail}
              onChange={(event) =>
                setSearchEmail(event.target.value)
              }
              placeholder="Enter customer email"
            />
            <button onClick={searchByEmail}>
              Search Email
            </button>
          </div>

          <button
            className="secondary"
            onClick={() => {
              loadCustomers();
              setMessage("");
            }}
          >
            Show All Customers
          </button>
        </section>

        <section className="card">
          <div className="table-heading">
            <h2>Customer List</h2>
            <span>{customers.length} displayed</span>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.cid}>
                    <td>{customer.cid}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="edit"
                          onClick={() =>
                            editCustomer(customer)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete"
                          onClick={() =>
                            deleteCustomer(customer.cid)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {customers.length === 0 && (
                  <tr>
                    <td colSpan="5">
                      No customers to display.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
