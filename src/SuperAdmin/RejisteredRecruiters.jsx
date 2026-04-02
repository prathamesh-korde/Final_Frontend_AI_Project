import { useMemo, useState } from "react";
import { Search, Eye, Trash2, X, Building2, Mail, Phone, MapPin, Users, Briefcase, CreditCard, FileText, Tag } from "lucide-react";

const STATIC_RECRUITERS = [
    {
        _id: "1", id: 1,
        companyName:    "Netfotech Solutions",
        email:          "netfotech@gmail.com",
        phoneNumber:    "+91 9876543210",
        companyType:    "Non-Tech",
        typeOfStaffing: "Contract",
        employees:      "250+",
        gstNumber:      "27AAPFN1234F1Z5",
        panNumber:      "AAPFN1234F",
        address1:       "Plot No. 14, IT Park",
        address2:       "Hinjewadi Phase 2",
        city:           "Pune",
        state:          "Maharashtra",
        createdAt:      "2026-01-10T10:00:00Z",
    },
    {
        _id: "2", id: 2,
        companyName:    "Infosys Limited",
        email:          "infosys@infosys.com",
        phoneNumber:    "+91 9123456780",
        companyType:    "IT",
        typeOfStaffing: "Permanent",
        employees:      "10000+",
        gstNumber:      "29AAACI1681G1ZK",
        panNumber:      "AAACI1681G",
        address1:       "Electronics City",
        address2:       "Phase 1",
        city:           "Bangalore",
        state:          "Karnataka",
       
        createdAt:      "2026-01-22T09:30:00Z",
    },
    {
        _id: "3", id: 3,
        companyName:    "TechMahindra",
        email:          "tech@techmahindra.com",
        phoneNumber:    "+91 9988776655",
        companyType:    "Product",
        typeOfStaffing: "Both",
        employees:      "5000+",
        gstNumber:      "36AACCT7456Q1ZE",
        panNumber:      "AACCT7456Q",
        address1:       "7th Floor, Cyber Towers",
        address2:       "Hitech City",
        city:           "Hyderabad",
        state:          "Telangana",
       
        createdAt:      "2026-02-05T11:00:00Z",
    },
    {
        _id: "4", id: 4,
        companyName:    "Wipro Technologies",
        email:          "wipro@wipro.com",
        phoneNumber:    "+91 9112233445",
        companyType:    "IT",
        typeOfStaffing: "Permanent",
        employees:      "8000+",
        gstNumber:      "29AAACW0572C1ZM",
        panNumber:      "AAACW0572C",
        address1:       "Sarjapur Road",
        address2:       "Outer Ring Road",
        city:           "Bangalore",
        state:          "Karnataka",
       
        createdAt:      "2026-02-18T08:30:00Z",
    },
    {
        _id: "5", id: 5,
        companyName:    "HCL Technologies",
        email:          "hcl@hcl.com",
        phoneNumber:    "+91 9090909090",
        companyType:    "Product",
        typeOfStaffing: "Contract",
        employees:      "3000+",
        gstNumber:      "09AAACH3047C1ZA",
        panNumber:      "AAACH3047C",
        address1:       "Sector 60",
        address2:       "Noida Express Way",
        city:           "Noida",
        state:          "Uttar Pradesh",
        
        createdAt:      "2026-03-01T14:00:00Z",
    },
    {
        _id: "6", id: 6,
        companyName:    "Tata Consultancy",
        email:          "tcs@tcs.com",
        phoneNumber:    "+91 9222333444",
        companyType:    "IT",
        typeOfStaffing: "Both",
        employees:      "15000+",
        gstNumber:      "27AABCT2773C1ZT",
        panNumber:      "AABCT2773C",
        address1:       "TCS House, Raveline Street",
        address2:       "Fort",
        city:           "Mumbai",
        state:          "Maharashtra",
        createdAt:      "2026-03-08T10:00:00Z",
    },
    {
        _id: "7", id: 7,
        companyName:    "Zensar Technologies",
        email:          "zensar@zensar.com",
        phoneNumber:    "+91 9333444555",
        companyType:    "Non-Tech",
        typeOfStaffing: "Contract",
        employees:      "1200+",
        gstNumber:      "27AABCZ0312M1ZU",
        panNumber:      "AABCZ0312M",
        address1:       "Kharadi",
        address2:       "EON IT Park",
        city:           "Pune",
        state:          "Maharashtra",
        subscription:   { planName: "Plus" },
        createdAt:      "2026-03-15T16:00:00Z",
    },
    {
        _id: "8", id: 8,
        companyName:    "Mphasis Limited",
        email:          "mphasis@mphasis.com",
        phoneNumber:    "+91 9444555666",
        companyType:    "Product",
        typeOfStaffing: "Permanent",
        employees:      "900+",
        gstNumber:      "29AABCM3895L1ZV",
        panNumber:      "AABCM3895L",
        address1:       "4th Floor, Bagmane World Technology Center",
        address2:       "Marathahalli",
        city:           "Kolkata",
        state:          "West Bengal",
        subscription:   { planName: "Kickstart" },
        createdAt:      "2026-03-20T13:00:00Z",
    },
];
// ─────────────────────────────────────────────

const ITEMS_PER_PAGE = 8;

const getCompanyTypeBadge = (type = "") => {
    const t = (type || "").toLowerCase();
    if (t.includes("non"))     return "bg-[#F1E9FF] text-[#7C3AED]";
    if (t.includes("product")) return "bg-[#E8F2FF] text-[#2563EB]";
    if (t.includes("service")) return "bg-[#FFE8F1] text-[#DB2777]";
    if (t === "it" || t.includes("it")) return "bg-[#E9FFF4] text-[#16A34A]";
    return "bg-gray-100 text-gray-600";
};

const getSubscriptionBadge = (label = "") => {
    const t = (label || "").toLowerCase();
    if (t.includes("kick"))       return "bg-violet-600 text-white";
    if (t.includes("plus"))       return "bg-amber-600 text-white";
    if (t.includes("pro"))        return "bg-blue-600 text-white";
    if (t.includes("enterprise")) return "bg-purple-700 text-white";
    return "bg-gray-200 text-gray-800";
};

const getInitials = (name = "") =>
    (name || "")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("");

export default function RejisteredRecruiters() {
    const [searchTerm,       setSearchTerm]       = useState("");
    const [selectedRegister, setSelectedRegister] = useState(null);
    const [currentPage,      setCurrentPage]      = useState(1);

    const filtered = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return STATIC_RECRUITERS;
        return STATIC_RECRUITERS.filter(
            (r) =>
                (r.companyName || "").toLowerCase().includes(term) ||
                (r.email || "").toLowerCase().includes(term)
        );
    }, [searchTerm]);

    const totalPages   = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIndex   = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this company?")) {
            console.log(`[Static] Delete company with _id=${id} (no-op until backend is ready)`);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FE] p-4 sm:p-6 md:p-8">

            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Registered Companies</h1>
                
                </div>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search company or email…"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400/30 focus:border-violet-400 transition"
                    />
                </div>
            </div>

            
            <div className="bg-white rounded-2xl border border-violet-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <table className="w-full">
                        <thead className="bg-[#F3F1FF] border-b border-violet-100">
                            <tr className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                <th className="px-5 py-3.5 whitespace-nowrap">Serial No.</th>
                                <th className="px-5 py-3.5 whitespace-nowrap">Company Name</th>
                                <th className="px-5 py-3.5 whitespace-nowrap">Email</th>
                                <th className="px-5 py-3.5 whitespace-nowrap">Phone No.</th>
                                <th className="px-5 py-3.5 whitespace-nowrap">Company Type</th>
                                <th className="px-5 py-3.5 whitespace-nowrap text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-gray-400 text-sm">
                                        No records found.
                                    </td>
                                </tr>
                            ) : currentItems.map((r) => {
                                const subLabel = r.subscription?.planName || "NA";
                                return (
                                    <tr key={r._id} className="hover:bg-violet-50/20 transition-colors">
                                        <td className="px-5 py-4 text-sm text-gray-500">{r.id}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EDE9FF] flex items-center justify-center text-xs font-bold text-violet-600">
                                                    {getInitials(r.companyName)}
                                                </div>
                                                <span className="text-sm font-medium text-gray-900 whitespace-nowrap">{r.companyName}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-gray-600 whitespace-nowrap">{r.email}</td>
                                        <td className="px-5 py-4 text-sm text-gray-600 whitespace-nowrap">{r.phoneNumber}</td>
                                        <td className="px-5 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getCompanyTypeBadge(r.companyType)}`}>
                                                {r.companyType}
                                            </span>
                                        </td>
                                    
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => setSelectedRegister(r)}
                                                    className="w-8 h-8 grid place-items-center rounded-lg bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(r._id)}
                                                    className="w-8 h-8 grid place-items-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Pagination ── */}
            <div className="flex items-center justify-center gap-2 mt-5">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                            p === currentPage
                                ? "bg-violet-600 text-white shadow"
                                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                        {p}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    Next
                </button>
            </div>

            {selectedRegister && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-[620px] bg-white rounded-[24px] shadow-2xl flex flex-col relative animate-in fade-in zoom-in duration-200">
                        
                        {/* ── Header ── */}
                        <div className="flex items-center justify-between px-8 pt-8 pb-2">
                            <h2 className="text-2xl font-bold text-gray-900">Company Details</h2>
                            <button
                                onClick={() => setSelectedRegister(null)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-900 transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* ── Scrollable Body ── */}
                        <div className="overflow-y-auto px-8 pb-12 max-h-[85vh] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden relative">
                            
                            {/* ── Edit Button ── */}
                            <div className="absolute right-0 top-6">
                                <button className="px-6 py-1.5 rounded-[20px] border border-[#362377] text-[#362377] font-medium text-[15px] hover:bg-[#362377]/5 transition">
                                    Edit
                                </button>
                            </div>

                            {/* ── Logo ── */}
                            <div className="flex justify-center mt-6 mb-12">
                                <div className="w-[150px] h-[150px] rounded-full bg-[#f8f1f1] flex flex-col items-center justify-center">
                                    {/* Mock interior to simulate the SVG logo */}
                                    <div className="relative w-14 h-10 mt-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-black absolute top-0 left-0"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-black absolute top-0 right-0"></div>
                                        <div className="w-2.5 h-10 bg-black rounded-full rotate-[35deg] absolute left-2.5 -top-1"></div>
                                        <div className="w-2.5 h-10 bg-black rounded-full rotate-[35deg] absolute right-1 -top-1"></div>
                                    </div>
                                    <div className="mt-3 text-[13px] font-bold tracking-[0.25em] text-black">COMPANY</div>
                                    <div className="text-[9px] font-medium tracking-widest text-[#3A3A3A] mt-0.5">est. 2021</div>
                                </div>
                            </div>

                            {/* ── Grid Stats ── */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-10 gap-x-4">
                                {/* Row 1 */}
                                <div>
                                    <p className="text-[15px] font-bold text-gray-900 mb-3">Company Name</p>
                                    <p className="text-[14px] font-medium text-gray-600">{selectedRegister.companyName || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[15px] font-bold text-gray-900 mb-3">Company Type</p>
                                    <p className="text-[14px] font-medium text-gray-600">{selectedRegister.companyType || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[15px] font-bold text-gray-900 mb-3">Email</p>
                                    <p className="text-[14px] font-medium text-gray-600 break-all">{selectedRegister.email || "-"}</p>
                                </div>

                                {/* Row 2 */}
                                <div>
                                    <p className="text-[15px] font-bold text-gray-900 mb-3">Contact Person</p>
                                    <p className="text-[14px] font-medium text-gray-600">Sharad Bhole</p>
                                </div>
                                <div className="hidden sm:block"></div>
                                <div>
                                    <p className="text-[15px] font-bold text-gray-900 mb-3">Contact No.</p>
                                    <p className="text-[14px] font-medium text-gray-600">{selectedRegister.phoneNumber || "-"}</p>
                                </div>

                                {/* Row 3 */}
                                <div>
                                    <p className="text-[15px] font-bold text-gray-900 mb-3">GST No.</p>
                                    <p className="text-[14px] font-medium text-gray-600">{selectedRegister.gstNumber || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[15px] font-bold text-gray-900 mb-3">PAN No.</p>
                                    <p className="text-[14px] font-medium text-gray-600">{selectedRegister.panNumber || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[15px] font-bold text-gray-900 mb-3">Type of staffing</p>
                                    <p className="text-[14px] font-medium text-gray-600">{selectedRegister.typeOfStaffing || "Full Time"}</p>
                                </div>

                                {/* Row 4 */}
                                <div className="sm:col-span-2">
                                    <p className="text-[15px] font-bold text-gray-900 mb-3">Address</p>
                                    <p className="text-[14px] font-medium text-gray-600 pr-6 leading-relaxed">
                                        {[selectedRegister.address1, selectedRegister.address2].filter(Boolean).join(", ") || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[15px] font-bold text-gray-900 mb-3">Country</p>
                                    <p className="text-[14px] font-medium text-gray-600">India</p>
                                </div>

                                {/* Row 5 */}
                                <div>
                                    <p className="text-[15px] font-bold text-gray-900 mb-3">City</p>
                                    <p className="text-[14px] font-medium text-gray-600">{selectedRegister.city || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[15px] font-bold text-gray-900 mb-3">State</p>
                                    <p className="text-[14px] font-medium text-gray-600">{selectedRegister.state || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-[15px] font-bold text-gray-900 mb-3">PIN Code</p>
                                    <p className="text-[14px] font-medium text-gray-600">700065</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}