import React, { useState } from "react";
import "./App.css";

function App() {
  const [employee, setEmployee] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [status, setStatus] = useState("Pending");
  const [filter, setFilter] = useState("");

  const [leaves, setLeaves] = useState([
    {
      id: 1,
      employee: "John",
      leaveType: "Sick Leave",
      status: "Approved",
    },
    {
      id: 2,
      employee: "Emma",
      leaveType: "Casual Leave",
      status: "Pending",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employee || !leaveType) {
      alert("Please fill all fields");
      return;
    }

    const newLeave = {
      id: Date.now(),
      employee,
      leaveType,
      status,
    };

    setLeaves([...leaves, newLeave]);
    setEmployee("");
    setLeaveType("");
    setStatus("Pending");
  };

  const updateStatus = (id, newStatus) => {
    setLeaves(
      leaves.map((leave) =>
        leave.id === id
          ? { ...leave, status: newStatus }
          : leave
      )
    );
  };

  const filteredLeaves = leaves.filter((leave) =>
    leave.employee.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h1>HR Employee Leave Management Tool</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Employee Name"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        />

        <input
          type="text"
          placeholder="Leave Type"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        />

        <button type="submit">Apply Leave</button>
      </form>

      <input
        type="text"
        placeholder="Filter by Employee"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter"
      />

      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.employee}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.status}</td>
              <td>
                <button
                  onClick={() =>
                    updateStatus(leave.id, "Approved")
                  }
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(leave.id, "Rejected")
                  }
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;