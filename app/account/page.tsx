"use client";

import { useState, useEffect } from "react";
import { getUserFromToken } from "@/utils/getUser";
import { toast } from "react-toastify";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const user = getUserFromToken();
  const email = user?.email;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/getUser?email=${email}`);

      const data = await res.json();

      if (data.success) {
        setUserDetails(data.user);
      }
    };

    fetchUser();
  }, [email]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleUpdateDetails = async () => {
    setLoading(true);
    const res = await fetch("/api/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userDetails,
        email,
      }),
    });

    const data = await res.json();
    setLoading(false);
    if (data.success) {
      toast.success("Profile Updated Successfully ✅");
      setIsEditing(false);
    } else {
      toast.error(data.message);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const res = await fetch("/api/changePassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        currentPassword,
        newPassword,
      }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("✅ Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10 text-gray-950">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white rounded-xl shadow p-5 h-fit">
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left font-medium ${
                    activeTab === "profile"
                      ? "text-indigo-600"
                      : "text-gray-700"
                  }`}
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`w-full text-left font-medium ${
                    activeTab === "password"
                      ? "text-indigo-600"
                      : "text-gray-700"
                  }`}
                >
                  Change Password
                </button>
              </li>
            </ul>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3 bg-white rounded-xl shadow p-6">
            {/* PROFILE */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Profile Details</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={userDetails.name}
                    className="border p-3 rounded"
                    disabled
                  />
                  <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    className="border p-3 rounded"
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={userDetails.phone}
                    onChange={handleChange}
                    className="border p-3 rounded"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-6 mt-6">
                    Address Details
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={userDetails.address}
                      onChange={handleChange}
                      className="border p-3 rounded"
                      disabled={!isEditing}
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      name="pincode"
                      value={userDetails.pincode}
                      onChange={handleChange}
                      className="border p-3 rounded"
                      disabled={!isEditing}
                    />
                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      value={userDetails.city}
                      onChange={handleChange}
                      className="border p-3 rounded"
                      disabled={!isEditing}
                    />
                    <input
                      type="text"
                      placeholder="State"
                      name="state"
                      value={userDetails.state}
                      onChange={handleChange}
                      className="border p-3 rounded"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                    >
                      Edit Details
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleUpdateDetails}
                        disabled={loading}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                      >
                        {loading ? "Updating..." : "Update Profile"}
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-400 ml-4 text-white px-6 py-2 rounded hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* CHANGE PASSWORD */}
            {activeTab === "password" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Change Password</h2>

                <div className="grid gap-4 max-w-md">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="border p-3 rounded"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border p-3 rounded"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border p-3 rounded"
                  />

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <span className="text-sm text-gray-600">
                      Show Passwords
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePasswordChange}
                  className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                >
                  Update Password
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
