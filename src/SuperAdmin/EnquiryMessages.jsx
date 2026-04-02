import { useMemo, useState } from "react";
import { Search, Eye, X, Mail, Phone, Building2, Calendar, MessageSquare } from "lucide-react";
import TE from "../img/TEE.png";
import PE from "../img/PE.png";
import CE from "../img/CE.png";
import ISL from "../img/ISL.png";
import TAL from "../img/TAL.png";

const STATIC_ENQUIRIES = [
    { _id: "1", companyName: "Netfotech Solutions",  emailid: "netfotech@gmail.com",   phone: "9876543210", message: "We are looking for AI-powered recruitment tools for our growing team in Pune. Please share your plans.",                                             status: "Pending",  createdAt: "2026-01-10T10:00:00Z" },
    { _id: "2", companyName: "Infosys Limited",       emailid: "infosys@infosys.com",   phone: "9123456780", message: "Interested in enterprise subscription. Want to understand how candidate screening works with your platform.",                                     status: "Closed",   createdAt: "2026-01-22T09:30:00Z" },
    { _id: "3", companyName: "TechMahindra",          emailid: "tech@techmahindra.com", phone: "9988776655", message: "Need assistance for bulk recruiter onboarding. Do you support HRMS integration?",                                                              status: "Pending",  createdAt: "2026-02-05T11:00:00Z" },
    { _id: "4", companyName: "Wipro Technologies",    emailid: "wipro@wipro.com",        phone: "9112233445", message: "Looking for a custom plan for 500+ employees. Please provide a pricing quote.",                                                                status: "Closed",   createdAt: "2026-02-18T08:30:00Z" },
    { _id: "5", companyName: "HCL Technologies",      emailid: "hcl@hcl.com",           phone: "9090909090", message: "We are evaluating your platform for JD generation and interview scheduling features. Need a demo.",                                             status: "Pending",  createdAt: "2026-03-01T14:00:00Z" },
    { _id: "6", companyName: "Tata Consultancy",      emailid: "tcs@tcs.com",           phone: "9222333444", message: "Enquiring about white-label solution for TCS internal hiring portal.",                                                                         status: "Closed",   createdAt: "2026-03-08T10:00:00Z" },
    { _id: "7", companyName: "Zensar Technologies",   emailid: "zensar@zensar.com",     phone: "9333444555", message: "Question about candidate analytics reports and export features. We need detailed insights per recruiter.",                                       status: "Pending",  createdAt: "2026-03-15T16:00:00Z" },
    { _id: "8", companyName: "Mphasis Limited",       emailid: "mphasis@mphasis.com",   phone: "9444555666", message: "Can we integrate your platform with Slack and Microsoft Teams for recruiter notifications?",                                                   status: "Pending",  createdAt: "2026-03-20T13:00:00Z" },
    { _id: "9", companyName: "Capgemini India",       emailid: "capgemini@cap.com",     phone: "9555666777", message: "Want to understand RMG admin features in detail before making a purchase decision.",                                                            status: "Closed",   createdAt: "2026-03-22T09:00:00Z" },
    { _id:"10", companyName: "L&T Technology",        emailid: "lnt@lnt.com",           phone: "9666777888", message: "Requesting support for multi-language JD creation. We hire globally and need multilingual support.",                                            status: "Pending",  createdAt: "2026-03-25T11:30:00Z" },
];
// ─────────────────────────────────────────────

const ITEMS_PER_PAGE = 7;

const normalizeStatus = (t) => {
    const s = (t?.status || "Pending").toString().toLowerCase();
    return s === "closed" || s === "resolved" ? "Closed" : "Pending";
};

const formatDate = (dateString) => {
    if (!dateString) return "NA";
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}-${mm}-${yy}`;
};

function StatCard({ label, value, valueColor, iconImage, chartImage }) {
    const [first, ...rest] = (label || "").split(" ");
    return (
        <div className="rounded-2xl bg-white px-5 py-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500 leading-tight">
                    {first}
                    {rest.length > 0 && <><br />{rest.join(" ")}</>}
                </p>
                <div className="h-9 w-9">
                    {chartImage && <img src={chartImage} alt="icon" className="h-full w-full object-contain" />}
                </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
                <p className={`text-3xl font-extrabold ${valueColor}`}>{value}</p>
                {iconImage && <img src={iconImage} alt="chart" className="h-8 object-contain" />}
            </div>
        </div>
    );
}

function EnquiryMessages() {
    const [currentPage, setCurrentPage]       = useState(1);
    const [searchTerm, setSearchTerm]         = useState("");
    const [showPopup, setShowPopup]           = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    // Filter
    const filtered = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return STATIC_ENQUIRIES;
        return STATIC_ENQUIRIES.filter(
            (t) =>
                (t.companyName || "").toLowerCase().includes(term) ||
                (t.emailid || "").toLowerCase().includes(term)
        );
    }, [searchTerm]);

    // Pagination
    const totalPages     = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIdx       = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems   = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    // Totals
    const totals = useMemo(() => ({
        total:   STATIC_ENQUIRIES.length,
        pending: STATIC_ENQUIRIES.filter((t) => normalizeStatus(t) === "Pending").length,
        closed:  STATIC_ENQUIRIES.filter((t) => normalizeStatus(t) === "Closed").length,
    }), []);

    const statCards = [
        { label: "Total Enquiries",   value: totals.total,   valueColor: "text-indigo-600",  iconImage: ISL, chartImage: TE },
        { label: "Pending Enquiries", value: totals.pending, valueColor: "text-red-400",     iconImage: TAL, chartImage: PE },
        { label: "Closed Enquiries",  value: totals.closed,  valueColor: "text-purple-700",  iconImage: ISL, chartImage: CE },
    ];

    const handleSearchChange = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };
    const handleView         = (t) => { setSelectedTicket(t); setShowPopup(true); };
    const handleClosePopup   = () => { setShowPopup(false); setSelectedTicket(null); };

    return (
        <div className="min-h-screen bg-[#F8F9FE] p-4 sm:p-6 md:p-8">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {statCards.map((c, i) => <StatCard key={i} {...c} />)}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h2 className="text-lg font-bold text-gray-900">Enquiries</h2>
                
<div className="flex flex-col sm:flex-row items-center gap-4 w-fit">
  
  <div className="relative w-72">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
    <input
      type="text"
      placeholder="Search by company or email…"
      value={searchTerm}
      onChange={handleSearchChange}
      className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400 transition"
    />
  </div>

  <button className="whitespace-nowrap h-10 bg-gradient-to-r from-[#735BC7] to-[#AAA9FB] text-white px-6 rounded-xl text-sm font-semibold shadow-md hover:opacity-90 transition-all active:scale-95">
    Mark As Resolved
  </button>
  
</div>
            </div>

            <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <table className="w-full">
                        <thead className="bg-indigo-50 border-b border-indigo-100">
                            <tr className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                <th className="px-5 py-3.5 whitespace-nowrap">Serial No.</th>
                                <th className="px-5 py-3.5 whitespace-nowrap">Company Name</th>
                                <th className="px-5 py-3.5 whitespace-nowrap">Email</th>
                                <th className="px-5 py-3.5 whitespace-nowrap">Phone</th>
                                <th className="px-5 py-3.5 whitespace-nowrap">Date</th>
                                <th className="px-5 py-3.5 whitespace-nowrap">Status</th>
                                <th className="px-5 py-3.5 whitespace-nowrap">Message</th>
                                <th className="px-5 py-3.5 whitespace-nowrap text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="py-12 text-center text-gray-400 text-sm">
                                        No enquiries found.
                                    </td>
                                </tr>
                            ) : currentItems.map((ticket, idx) => (
                                <tr key={ticket._id} className="hover:bg-indigo-50/30 transition-colors">
                                    <td className="px-5 py-4 text-sm text-gray-500">{startIdx + idx + 1}</td>
                                    <td className="px-5 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{ticket.companyName}</td>
                                    <td className="px-5 py-4 text-sm text-gray-600 whitespace-nowrap">{ticket.emailid}</td>
                                    <td className="px-5 py-4 text-sm text-gray-600 whitespace-nowrap">{ticket.phone}</td>
                                    <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">{formatDate(ticket.createdAt)}</td>
                                    <td className="px-5 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                            normalizeStatus(ticket) === "Closed"
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-amber-50 text-amber-700"
                                        }`}>
                                            {normalizeStatus(ticket)}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-gray-500 max-w-[220px] truncate">{ticket.message}</td>
                                    <td className="px-5 py-4 text-center">
                                        <button
                                            onClick={() => handleView(ticket)}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                                            title="View"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {totalPages > 1 && (
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
                                    ? "bg-indigo-600 text-white shadow"
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
            )}

            {showPopup && selectedTicket && (


                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-md bg-white rounded-[28px] shadow-2xl overflow-hidden p-8 animate-in fade-in zoom-in duration-200">

  <div className="relative mb-8">
    <h3 className="text-[28px] font-bold text-gray-900 text-center">Enquiry Details</h3>
    <button
      onClick={handleClosePopup}
      className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-900 hover:opacity-70 transition"
    >
      <X className="w-8 h-8" />
    </button>
  </div>

  <div className="space-y-5 text-center">
    <div>
      <p className="text-xl text-gray-900">
        <span className="font-bold">Company Name :</span>{" "}
        <span className="text-gray-500 font-medium">{selectedTicket.companyName}</span>
      </p>
    </div>

    <div>
      <p className="text-xl text-gray-900">
        <span className="font-bold">Email :</span>{" "}
        <span className="text-gray-500 font-medium">{selectedTicket.emailid}</span>
      </p>
    </div>

    <div>
      <p className="text-xl text-gray-900">
        <span className="font-bold">Phone :</span>{" "}
        <span className="text-gray-500 font-medium">{selectedTicket.phone}</span>
      </p>
    </div>

    <div>
      <p className="text-xl text-gray-900">
        <span className="font-bold">Date Created :</span>{" "}
        <span className="text-gray-500 font-medium">{formatDate(selectedTicket.createdAt)}</span>
      </p>
    </div>

    <div className="border-t border-dashed border-gray-300 my-8"></div>

    <div className="space-y-4">
      <h4 className="text-[22px] font-bold text-gray-900">Message</h4>
      <p className="text-xl text-gray-500 leading-relaxed max-w-[90%] mx-auto">
        {selectedTicket.message}
      </p>
    </div>
  </div>
</div>
                </div>
            )}
        </div>
    );
}

export default EnquiryMessages;