import React, { useState, useEffect } from "react";

import {
  Store,
  UserRound,
  Camera,
  ArrowRight,
  ChevronDown,
  MessageCircle,
  GraduationCap,
  Info,
} from "lucide-react";

import "../styles/Registration.css";

const Registration = () => {

  // Account Type
  const [accountType, setAccountType] = useState("user");

  // Form Data
  const [formData, setFormData] = useState({
    phone: "",
    fullName: "",
    username: "",
    email: "",
    country: "Kenya",
  });

  // Country Code
  const [countryCode, setCountryCode] = useState("+254");

  // Profile Image
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Error Message
  const [error, setError] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // Handle Country Change
  const handleCountryChange = (e) => {

    const selectedCountry = e.target.value;

    setFormData((prev) => ({
      ...prev,
      country: selectedCountry,
    }));

    const codes = {
      Kenya: "+254",
      Bhutan: "+975",
      India: "+91",
      "United States": "+1",
      "United Kingdom": "+44",
    };

    setCountryCode(codes[selectedCountry]);

  };

  // Handle Image Upload
  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG and PNG images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");

  };

  // Clean up generated image URLs
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Handle Registration
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (
      !formData.phone.trim() ||
      !formData.fullName.trim() ||
      !formData.username.trim() ||
      !formData.email.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^[0-9\s-]{7,15}$/.test(formData.phone)) {
      setError("Please enter a valid WhatsApp number.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {

      const registrationData = {
        accountType,
        phone: `${countryCode}${formData.phone.replace(/\D/g, "")}`,
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        country: formData.country,
        profileImage,
      };

      console.log("Registration Data:", registrationData);

      // TODO: Send registration data to your backend API.
      // TODO: Initiate WhatsApp OTP verification.

      alert(
        "Form validated successfully. WhatsApp verification requires backend integration."
      );

    } catch (err) {

      setError("Something went wrong. Please try again.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="registration-page">

      {/* HEADER */}

      <header className="registration-header">

        <div className="registration-brand">

          <div className="registration-logo">
            <GraduationCap size={21} />
          </div>

          <div className="registration-brand-text">
            <span>Commerce</span>
            <span>Orchestration</span>
          </div>

        </div>

        <button
          type="button"
          className="registration-help"
        >
          Need help?
        </button>

      </header>

      {/* MAIN CONTAINER */}

      <main className="registration-container">

        {/* ACCOUNT SELECTION */}

        <div className="registration-tabs">

          <button
            type="button"
            className={`registration-tab ${
              accountType === "user" ? "selected" : ""
            }`}
            onClick={() => setAccountType("user")}
          >
            <UserRound size={17} />
            User
          </button>

          <button
            type="button"
            className={`registration-tab ${
              accountType === "merchant" ? "selected" : ""
            }`}
            onClick={() => setAccountType("merchant")}
          >
            <Store size={17} />
            Merchant
          </button>

        </div>

        {/* WELCOME SECTION */}

        <section className="registration-welcome">

          <h1>
            Welcome. Let's get started.
          </h1>

          <p>
            Create your account to shop, pay or receive orders.
            Start with your WhatsApp number.
          </p>

        </section>

        {/* REGISTRATION FORM */}

        <form onSubmit={handleSubmit}>

          {/* WHATSAPP */}

          <section className="registration-whatsapp">

            <div className="whatsapp-heading">

              <MessageCircle size={20} />

              <h3>
                Your account starts on WhatsApp
              </h3>

            </div>

            <div className="whatsapp-label-row">

              <label htmlFor="registration-phone">
                WhatsApp number
              </label>

              <span>
                Primary contact
              </span>

            </div>

            <div className="whatsapp-input-row">

              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="registration-code"
                aria-label="Country dialing code"
              >
                <option value="+254">+254</option>
                <option value="+975">+975</option>
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>

              <input
                id="registration-phone"
                type="tel"
                name="phone"
                placeholder="712 345 678"
                value={formData.phone}
                onChange={handleChange}
                className="registration-input"
                required
              />

            </div>

            <p className="whatsapp-description">
              We'll send a verification code on WhatsApp.
              Your number is not verified yet.
            </p>

          </section>

          {/* ABOUT YOU */}

          <section className="registration-about">

            <h2>
              About you
            </h2>

            {/* FULL NAME */}

            <div className="registration-field">

              <label htmlFor="registration-fullname">
                Full name
              </label>

              <input
                id="registration-fullname"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="registration-input"
                required
              />

            </div>

            {/* USERNAME */}

            <div className="registration-field">

              <label htmlFor="registration-username">
                Username
              </label>

              <input
                id="registration-username"
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                className="registration-input"
                required
              />

            </div>

            {/* EMAIL */}

            <div className="registration-field">

              <label htmlFor="registration-email">
                Email address
              </label>

              <input
                id="registration-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="registration-input"
                required
              />

            </div>

            {/* COUNTRY */}

            <div className="registration-field">

              <label htmlFor="registration-country">
                Country
              </label>

              <div className="registration-select-wrapper">

                <select
                  id="registration-country"
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                  className="registration-input registration-country"
                >
                  <option value="Kenya">Kenya</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="India">India</option>
                  <option value="United States">
                    United States
                  </option>
                  <option value="United Kingdom">
                    United Kingdom
                  </option>
                </select>

                <ChevronDown size={17} />

              </div>

            </div>

          </section>

          {/* PROFILE PHOTO */}

          <section className="registration-upload">

            <label className="registration-upload-label">

              <div className="registration-upload-icon">

                {imagePreview ? (

                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="registration-preview"
                  />

                ) : (

                  <Camera size={23} />

                )}

              </div>

              <div className="registration-upload-text">

                <p>
                  Upload profile photo
                  <span> (optional)</span>
                </p>

                <small>
                  JPG or PNG · up to 5 MB
                </small>

              </div>

              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleImageUpload}
                hidden
              />

            </label>

          </section>

          {/* ERROR MESSAGE */}

          {error && (

            <div className="registration-error">
              {error}
            </div>

          )}

          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            className="registration-submit"
            disabled={loading}
          >

            {loading
              ? "Processing..."
              : "Continue to WhatsApp verification"
            }

            {!loading && <ArrowRight size={18} />}

          </button>

          {/* TERMS */}

          <p className="registration-terms">

            By continuing, you agree to our{" "}

            <a href="/terms">
              Terms of service
            </a>

            {" "}and{" "}

            <a href="/privacy">
              Privacy policy
            </a>

            .

          </p>

        </form>

        {/* SIGN IN */}

        <div className="registration-signin">

          Already have an account?{" "}

          <a href="/login">
            Sign in
          </a>

        </div>

        {/* INFORMATION */}

        <div className="registration-info">

          <Info size={16} />

          <p>
            Your user ID and account creation date are
            assigned automatically when you register.
          </p>

        </div>

      </main>

    </div>

  );

};

export default Registration;