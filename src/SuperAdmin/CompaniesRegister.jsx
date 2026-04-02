import React, { useState } from "react";
import {
    Upload, ChevronDown, Trash2, CheckCircle, AlertCircle,
    Loader2, Building2, Mail, Phone, Users, Briefcase,
    CreditCard, FileText, MapPin
} from "lucide-react";

const DEMO_PREFILL = {
    companyName:       "Netfotech Solutions",
    companyType:       "Non-Tech",
    contactPerson:     "Rajesh Pandi",
    email:             "netfotech@gmail.com",
    phoneNo:           "9876543210",
    numberOfEmployees: "250",
    gstNumber:         "27AAPFN1234F1Z5",
    panNumber:         "AAPFN1234F",
    typeOfStaffing:    "contract",
    address1:          "Plot No. 14, IT Park, Hinjewadi Phase 2",
    address2:          "Wakad",
    city:              "Pune",
    state:             "Maharashtra",
    logo:              null,
};
// ─────────────────────────────────────────────

const COUNTRY_CODES  = ["+91", "+1", "+44", "+86", "+81"];
const STATES         = [
    "Select State", "Maharashtra", "Delhi", "Karnataka",
    "Tamil Nadu", "Gujarat", "Uttar Pradesh", "West Bengal",
    "Rajasthan", "Telangana", "Andhra Pradesh"
];
const STAFFING_TYPES = [
    { value: "",          label: "Select Type of Staffing" },
    { value: "contract",  label: "Contract" },
    { value: "permanent", label: "Permanent" },
    { value: "both",      label: "Both" },
];

// ── Reusable input wrapper ───────────────────
function Field({ label, children }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                {label}
            </label>
            {children}
        </div>
    );
}

const inputCls =
    "h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm placeholder:text-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400 transition disabled:opacity-60";

// ── Main Component ────────────────────────────
function CompaniesRegister() {
    const [formData,            setFormData]            = useState(DEMO_PREFILL);
    const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
    const [isSubmitting,        setIsSubmitting]        = useState(false);
    const [submitStatus,        setSubmitStatus]        = useState(null);  // "success" | "error"
    const [message,             setMessage]             = useState("");
    const [tenantDetails,       setTenantDetails]       = useState(null);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (submitStatus === "error") { setSubmitStatus(null); setMessage(""); }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) setFormData({ ...formData, logo: file });
    };

    const handleRemoveLogo = () => {
        setFormData({ ...formData, logo: null });
        const input = document.getElementById("logo-upload");
        if (input) input.value = "";
    };

    const validate = () => {
        const required = [
            ["companyName", "Company name"],
            ["companyType", "Company type"],
            ["email",       "Email"],
            ["phoneNo",     "Phone number"],
            ["numberOfEmployees", "Number of employees"],
            ["gstNumber",   "GST number"],
            ["panNumber",   "PAN number"],
            ["typeOfStaffing", "Type of staffing"],
            ["address1",    "Address"],
            ["city",        "City"],
        ];
        const errs = required.filter(([k]) => !formData[k]?.trim()).map(([, l]) => `${l} is required`);
        if (!formData.state || formData.state === "Select State") errs.push("Please select a state");
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email || "");
        if (formData.email && !emailOk) errs.push("Please enter a valid email address");
        const phoneOk = /^\d{10}$/.test(formData.phoneNo || "");
        if (formData.phoneNo && !phoneOk) errs.push("Please enter a valid 10-digit phone number");
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus(null); setMessage(""); setTenantDetails(null);

        const errs = validate();
        if (errs.length) { setSubmitStatus("error"); setMessage(errs.join(" · ")); return; }

        setIsSubmitting(true);
        try {
           
            await new Promise((res) => setTimeout(res, 1500));

            const simulatedTenant = {
                companyName: formData.companyName,
                subdomain:   formData.companyName.toLowerCase().replace(/\s+/g, "-"),
                adminEmail:  formData.email,
            };
            setSubmitStatus("success");
            setMessage(`✅ "${formData.companyName}" has been registered successfully!`);
            setTenantDetails(simulatedTenant);

            setTimeout(() => {
                setFormData(DEMO_PREFILL);
                setSubmitStatus(null);
                setTenantDetails(null);
            }, 6000);
        } catch {
            setSubmitStatus("error");
            setMessage("Network error. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const logoPreview = formData.logo
        ? typeof formData.logo === "string"
            ? formData.logo
            : URL.createObjectURL(formData.logo)
        : null;

    return (
        <div className="min-h-screen bg-[#F8F9FE] p-4 sm:p-6 md:p-8">

            {isSubmitting && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl px-8 py-6 flex flex-col items-center gap-3 shadow-2xl">
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                        <p className="text-sm font-semibold text-gray-700">Registering company…</p>
                    </div>
                </div>
            )}

            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900">Register New Company</h1>
                <p className="text-sm text-gray-500 mt-0.5">Fill in the details to onboard a new company to the platform.</p>
            </div>

            {/* Status banner */}
            {submitStatus && (
                <div className={`mb-5 rounded-2xl border p-4 flex items-start gap-3 ${
                    submitStatus === "success"
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-red-50 border-red-200"
                }`}>
                    {submitStatus === "success"
                        ? <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-emerald-600" />
                        : <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-500" />
                    }
                    <div>
                        <p className={`text-sm font-semibold ${submitStatus === "success" ? "text-emerald-800" : "text-red-700"}`}>
                            {message}
                        </p>
                        {tenantDetails && (
                            <div className="mt-2 text-xs text-emerald-700 space-y-0.5">
                                <p>Subdomain: <strong>{tenantDetails.subdomain}.recruiterAI.com</strong></p>
                                <p>Admin email: <strong>{tenantDetails.adminEmail}</strong></p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-8">

                    <div className="space-y-4">

  <h3 className="text-xl font-bold text-gray-900">Company Details</h3>

  <div className="flex items-center gap-10">
    <div className="relative w-36 h-36 rounded-full bg-[#ffffff] border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
      {logoPreview ? (
        <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
      ) : (
        
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
          <line x1="16" y1="19" x2="22" y2="19" strokeWidth="2" />
          <line x1="19" y1="16" x2="19" y2="22" strokeWidth="2" />
        </svg>
      )}
    </div>

    <div className="flex flex-col gap-3">
      <input 
        id="logo-upload" 
        type="file" 
        accept="image/*" 
        onChange={handleFileUpload} 
        disabled={isSubmitting} 
        className="hidden" 
      />
      
      <label
        htmlFor="logo-upload"
        className="px-6 py-2 rounded-xl border border-[#5D5FEF] text-[#5D5FEF] text-lg font-medium cursor-pointer hover:bg-indigo-50 transition-all active:scale-95"
      >
        Upload
      </label>

      {formData.logo && (
        <button
          type="button"
          onClick={handleRemoveLogo}
          className="text-xs text-red-500 font-semibold hover:underline mt-1"
        >
          Remove Image
        </button>
      )}
    </div>
  </div>
</div>



                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Building2 className="w-4 h-4 text-indigo-500" />
                            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Company Information</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <Field label="Company Name">
                                <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange}
                                    disabled={isSubmitting} placeholder="Enter company name" className={inputCls} />
                            </Field>
                            <Field label="Company Type">
                                <input type="text" name="companyType" value={formData.companyType} onChange={handleInputChange}
                                    disabled={isSubmitting} placeholder="e.g. IT, Product, Non-Tech" className={inputCls} />
                            </Field>
                            <Field label="Contact Person">
                                <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange}
                                    disabled={isSubmitting} placeholder="Full name" className={inputCls} />
                            </Field>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Mail className="w-4 h-4 text-indigo-500" />
                            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Contact Details</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <Field label="Email">
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                                    disabled={isSubmitting} placeholder="company@email.com" className={inputCls} />
                            </Field>
                            <Field label="Contact Number">
                                <div className="flex h-11 rounded-xl border border-gray-200 bg-white overflow-hidden focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-400/30 transition">
                                    <div className="relative w-24 border-r border-gray-200 flex-shrink-0">
                                        <select
                                            value={selectedCountryCode}
                                            onChange={(e) => setSelectedCountryCode(e.target.value)}
                                            disabled={isSubmitting}
                                            className="h-full w-full appearance-none bg-white pl-3 pr-7 text-sm focus:outline-none"
                                        >
                                            {COUNTRY_CODES.map((c) => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300 pointer-events-none" />
                                    </div>
                                    <input
                                        type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange}
                                        disabled={isSubmitting} placeholder="10-digit number"
                                        maxLength="10" pattern="[0-9]{10}"
                                        className="flex-1 px-3 text-sm placeholder:text-gray-400 focus:outline-none"
                                    />
                                </div>
                            </Field>
                            <Field label="Number of Employees">
                                <input type="text" name="numberOfEmployees" value={formData.numberOfEmployees} onChange={handleInputChange}
                                    disabled={isSubmitting} placeholder="e.g. 250" className={inputCls} />
                            </Field>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <CreditCard className="w-4 h-4 text-indigo-500" />
                            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Legal & Staffing</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <Field label="GST Number">
                                <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleInputChange}
                                    disabled={isSubmitting} placeholder="GST No." className={inputCls} />
                            </Field>
                            <Field label="PAN Number">
                                <input type="text" name="panNumber" value={formData.panNumber} onChange={handleInputChange}
                                    disabled={isSubmitting} placeholder="PAN No." className={inputCls} />
                            </Field>
                            <Field label="Type of Staffing">
                                <div className="relative">
                                    <select
                                        name="typeOfStaffing" value={formData.typeOfStaffing}
                                        onChange={handleInputChange} disabled={isSubmitting}
                                        className={`${inputCls} appearance-none pr-10`}
                                    >
                                        {STAFFING_TYPES.map((t) => (
                                            <option key={t.value} value={t.value} disabled={t.value === ""}>{t.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                                </div>
                            </Field>
                        </div>
                    </div>

                    {/* ── Section: Address ── */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-4 h-4 text-indigo-500" />
                            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Address</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <Field label="Address Line 1">
                                <input type="text" name="address1" value={formData.address1} onChange={handleInputChange}
                                    disabled={isSubmitting} placeholder="Street / Building" className={inputCls} />
                            </Field>
                            <Field label="Address Line 2">
                                <input type="text" name="address2" value={formData.address2} onChange={handleInputChange}
                                    disabled={isSubmitting} placeholder="Area / Landmark (optional)" className={inputCls} />
                            </Field>
                            <Field label="City">
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange}
                                    disabled={isSubmitting} placeholder="City" className={inputCls} />
                            </Field>
                            <Field label="State">
                                <div className="relative">
                                    <select
                                        name="state" value={formData.state}
                                        onChange={handleInputChange} disabled={isSubmitting}
                                        className={`${inputCls} appearance-none pr-10`}
                                    >
                                        {STATES.map((s) => (
                                            <option key={s} value={s} disabled={s === "Select State"}>{s}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                                </div>
                            </Field>
                        </div>
                    </div>

                    {/* ── Submit ── */}
                    <div className="flex justify-end pt-2 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 h-11 px-8 rounded-xl text-sm font-semibold text-white bg-[#6D5BD0] hover:bg-[#5B4BC7] shadow transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Registering…</>
                            ) : "Register Company"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CompaniesRegister;