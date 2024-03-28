import { useState } from "react";

const App = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone' && !/^\d*$/.test(value)) {
            // If the input is not a digit, don't update the state
            return;
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const regex = {
            name: /^[a-zA-Z\s]+$/,
            phone: /^\+?\d{10}$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[a-zA-Z\d@]{8,}$/,
            confirmPassword:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[a-zA-Z\d@]{8,}$/,
        };
        const errors = {};
        if (!regex.name.test(formData.name)) {
            errors.name = "Name is invalid.";
        }
        if (!regex.phone.test(formData.phone)) {
            errors.phone = "number is invalid.";
        }
        if (!regex.password.test(formData.password)) {
            errors.password = "Password is invalid.";
        }
        if (!regex.confirmPassword.test(formData.confirmPassword)) {
            errors.confirmPassword = "Confirm password is invalid.";
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            setShowSuccessPopup(true);
        }
    };
    const handlePopupClose = () => {
        setShowSuccessPopup(false);
        setFormData({
            name: "",
            phone: "",
            password: "",
            confirmPassword: "",
        });
        setFormErrors({
            name: "",
            phone: "",
            password: "",
            confirmPassword: "",
        });
    };
    return (
        <>
            <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {formErrors.name && (
                        <p className="error-message">{formErrors.name}</p>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="tel">Number:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        pattern="[0-9]"
                        onChange={handleChange}
                        className={`w-100 p-2 ${formErrors.phone ? "error" : ""}`}
                        maxLength={10}
                    />
                    {formErrors.phone && (
                        <p className="error-message">{formErrors.phone}</p>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={formErrors.password ? "error" : ""}
                    />
                    {formErrors.password && (
                        <p className="error-message">{formErrors.password}</p>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={formErrors.confirmPassword ? "error" : ""}
                    />
                    {formErrors.confirmPassword && (
                        <p className="error-message">{formErrors.confirmPassword}</p>
                    )}
                </div>
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
            {showSuccessPopup && (
                <div className="success-popup">
                    <p>Form submitted successfully!</p>
                    <button onClick={handlePopupClose}>Close</button>
                </div>
            )}
        </>
    );
};
export default App;
