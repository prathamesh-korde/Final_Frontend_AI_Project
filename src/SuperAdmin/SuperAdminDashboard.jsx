import React, { useEffect, useState } from "react";
import heroImage from "../assets/Frame.png";
import DistributionCard from "./dashBoardComponent/DistributionCard";
import PerformanceTrends from "./dashBoardComponent/PerformanceTrends";
import CompanyTable from "./dashBoardComponent/CompanyTable";

// ─────────────────────────────────────────────
// STATIC DATA — Replace with API responses when backend is ready
// ─────────────────────────────────────────────

const STATIC_USER_NAME = "Geeta";

const STATIC_COMPANIES = [
    { id: 1, companyName: "Netfotech Solutions",  type: "Non-Tech",  email: "netfotech@gmail.com",   state: "Pune",      hasExtraLocations: true,  createdAt: "2026-02-14T10:00:00Z" },
    { id: 2, companyName: "Infosys Ltd",          type: "IT",        email: "infosys@infosys.com",   state: "Bangalore", hasExtraLocations: false, createdAt: "2026-01-20T09:00:00Z" },
    { id: 3, companyName: "TechMahindra",         type: "Product",   email: "tech@techmahindra.com", state: "Hyderabad", hasExtraLocations: true,  createdAt: "2026-03-05T11:00:00Z" },
    { id: 4, companyName: "Wipro Technologies",   type: "IT",        email: "wipro@wipro.com",        state: "Chennai",   hasExtraLocations: false, createdAt: "2026-02-28T08:30:00Z" },
    { id: 5, companyName: "HCL Technologies",     type: "Product",   email: "hcl@hcl.com",           state: "Noida",     hasExtraLocations: true,  createdAt: "2026-03-10T14:00:00Z" },
    { id: 6, companyName: "Tata Consultancy",     type: "IT",        email: "tcs@tcs.com",           state: "Mumbai",    hasExtraLocations: false, createdAt: "2026-01-15T10:00:00Z" },
    { id: 7, companyName: "Zensar Technologies",  type: "Non-Tech",  email: "zensar@zensar.com",     state: "Pune",      hasExtraLocations: true,  createdAt: "2026-03-18T16:00:00Z" },
    { id: 8, companyName: "Mphasis Limited",      type: "Product",   email: "mphasis@mphasis.com",   state: "Kolkata",   hasExtraLocations: false, createdAt: "2026-02-07T13:00:00Z" },
];

const STATIC_ENQUIRIES = [
    { id: 1, name: "Amit Sharma",  email: "amit@gmail.com",  subject: "Job Inquiry",       status: "Open",    createdAt: "2026-01-10T10:00:00Z" },
    { id: 2, name: "Priya Patel",  email: "priya@gmail.com", subject: "Partnership Query", status: "Closed",  createdAt: "2026-02-22T09:00:00Z" },
    { id: 3, name: "Rohan Mehta",  email: "rohan@gmail.com", subject: "Support Request",   status: "Open",    createdAt: "2026-03-01T11:00:00Z" },
    { id: 4, name: "Neha Singh",   email: "neha@gmail.com",  subject: "General Inquiry",   status: "Closed",  createdAt: "2026-03-14T08:30:00Z" },
    { id: 5, name: "Karan Joshi",  email: "karan@gmail.com", subject: "Billing Issue",     status: "Open",    createdAt: "2026-03-20T14:00:00Z" },
    { id: 6, name: "Sneha Gupta",  email: "sneha@gmail.com", subject: "Feature Request",   status: "Pending", createdAt: "2026-02-05T10:00:00Z" },
    { id: 7, name: "Raj Kumar",    email: "raj@gmail.com",   subject: "Technical Support", status: "Open",    createdAt: "2026-01-25T16:00:00Z" },
    { id: 8, name: "Aisha Khan",   email: "aisha@gmail.com", subject: "Account Issue",     status: "Closed",  createdAt: "2026-03-08T13:00:00Z" },
];

const STATIC_TICKETS = [
    { id: 1, title: "Login not working",      priority: "High",   status: "Open",     createdAt: "2026-01-12T10:00:00Z" },
    { id: 2, title: "Dashboard data missing", priority: "Medium", status: "Resolved", createdAt: "2026-02-18T09:00:00Z" },
    { id: 3, title: "Profile update error",   priority: "Low",    status: "Open",     createdAt: "2026-03-05T11:00:00Z" },
    { id: 4, title: "Payment gateway issue",  priority: "High",   status: "Pending",  createdAt: "2026-03-16T08:30:00Z" },
    { id: 5, title: "Email not delivered",    priority: "Medium", status: "Open",     createdAt: "2026-02-10T14:00:00Z" },
    { id: 6, title: "Report export failing",  priority: "Low",    status: "Resolved", createdAt: "2026-03-22T10:00:00Z" },
    { id: 7, title: "Slow page load time",    priority: "Medium", status: "Open",     createdAt: "2026-01-28T16:00:00Z" },
];

const STATIC_PERFORMANCE_DATA = [
    { name: "Jan", enquiries: 45,  companies: 12, tickets: 8  },
    { name: "Feb", enquiries: 72,  companies: 18, tickets: 14 },
    { name: "Mar", enquiries: 60,  companies: 24, tickets: 11 },
    { name: "Apr", enquiries: 95,  companies: 15, tickets: 20 },
    { name: "May", enquiries: 110, companies: 30, tickets: 25 },
    { name: "Jun", enquiries: 85,  companies: 22, tickets: 18 },
    { name: "Jul", enquiries: 130, companies: 35, tickets: 30 },
    { name: "Aug", enquiries: 100, companies: 28, tickets: 22 },
    { name: "Sep", enquiries: 140, companies: 40, tickets: 35 },
    { name: "Oct", enquiries: 120, companies: 32, tickets: 28 },
    { name: "Nov", enquiries: 90,  companies: 20, tickets: 15 },
    { name: "Dec", enquiries: 160, companies: 45, tickets: 38 },
];

const STATIC_DISTRIBUTION_DATA = [
    { name: "Enquiries", value: 72, fill: "url(#purpleGradient)", percentage: 58 },
    { name: "Companies", value: 52, fill: "#FF8A7A",              percentage: 42 },
];

// ── Inline SVGs provided by design —————————————————————
const TotalCompaniesSVG = () => (
    <svg width="100%" height="100%" viewBox="0 0 269 129" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <g clipPath="url(#clip0_comp)">
            <rect width="269" height="129" rx="20" fill="white"/>
            <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M-1.83398 102.404C-1.83398 102.404 8.75664 101.068 20.7975 104.279C43.6987 110.387 45.005 99.2018 53.497 93.8085C61.2663 88.8743 67.7006 91.8849 76.351 97.9191C82.7312 102.37 92.0293 109.84 101.659 108.637C110.461 107.538 116.701 98.7761 128.901 96.5478C138.571 94.7817 146.43 99.6337 157.564 97.9191C172.67 95.5932 179.417 81.9001 190.213 81.9001C203.537 81.9001 212.919 70.3191 225.04 70.3191C237.091 70.3191 238.725 77.129 251.906 81.9001C261.984 85.5477 266.833 81.9001 266.833 81.9001V120.986H-1.83398V102.404Z" fill="url(#paint0_comp)"/>
            <path d="M-1.83398 96.3342C-1.83398 96.3342 8.75664 95.0167 20.7975 98.1818C43.6987 104.201 45.005 93.1781 53.497 87.8628C61.2663 83.0001 67.7006 85.9669 76.351 91.9138C82.7312 96.2998 92.0293 103.662 101.659 102.477C110.461 101.394 116.701 92.7585 128.901 90.5623C138.571 88.8218 146.43 93.6035 157.564 91.9138C172.67 89.6216 179.417 76.1268 190.213 76.1268C203.537 76.1268 212.919 64.6858 225.04 64.6858C237.091 64.6858 237.73 71.4247 250.912 76.1268C260.989 79.7215 266.833 76.1268 266.833 76.1268" stroke="url(#paint1_comp)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="67" cy="87" r="4" fill="#654CB7"/>
        </g>
        <defs>
            <linearGradient id="paint0_comp" x1="46.721" y1="96.0279" x2="46.721" y2="120.986" gradientUnits="userSpaceOnUse">
                <stop stopColor="#654CB7"/>
                <stop offset="1" stopColor="white" stopOpacity="0.01"/>
            </linearGradient>
            <linearGradient id="paint1_comp" x1="-1.83398" y1="83.6452" x2="266.833" y2="83.6452" gradientUnits="userSpaceOnUse">
                <stop stopColor="#AEABFF"/>
                <stop offset="0.480364" stopColor="#654CB7"/>
                <stop offset="1" stopColor="#AEABFF"/>
            </linearGradient>
            <clipPath id="clip0_comp">
                <rect width="269" height="129" rx="20" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);

const TotalEnquiriesSVG = () => (
    <svg width="100%" height="100%" viewBox="0 0 269 129" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <g clipPath="url(#clip0_enq)">
            <rect width="269" height="129" rx="20" fill="white"/>
            <path opacity="0.1" fillRule="evenodd" clipRule="evenodd" d="M-1.80078 95.4294C-1.80078 95.4294 8.94501 93.6168 21.1623 97.9713C44.3991 106.253 45.7245 91.087 54.341 83.7741C62.224 77.0836 68.7526 81.1658 77.5298 89.3478C84.0035 95.3823 93.4377 105.512 103.208 103.881C112.139 102.391 118.471 90.5098 130.85 87.4883C140.662 85.0936 148.635 91.6726 159.933 89.3478C175.26 86.194 182.106 67.6271 193.06 67.6271C206.58 67.6271 214.703 89.3495 227.001 89.3495C239.228 89.3495 242.282 61.1578 255.658 67.6271C265.882 72.5729 270.802 67.6271 270.802 67.6271V120.625H-1.80078V95.4294Z" fill="url(#paint0_enq)"/>
            <path d="M-1.80078 87.1989C-1.80078 87.1989 8.94501 85.4124 21.1623 89.7041C44.3991 97.8661 45.7245 82.9194 54.341 75.7123C62.224 69.1187 68.7526 73.1416 77.5298 81.2051C84.0035 87.1523 93.4377 97.1354 103.208 95.5283C112.139 94.059 118.471 82.3505 130.85 79.3726C140.662 77.0126 148.635 83.4963 159.933 81.2051C175.26 78.097 182.106 59.799 193.06 59.799C206.58 59.799 213.703 81.2042 226.001 81.2042C238.228 81.2042 241.273 53.4233 254.648 59.799C264.873 64.6732 270.802 59.799 270.802 59.799" stroke="url(#paint1_enq)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="67" cy="73.1904" rx="4" ry="4.22951" fill="#FF6F61"/>
        </g>
        <defs>
            <linearGradient id="paint0_enq" x1="47.4656" y1="86.7849" x2="47.4656" y2="120.627" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF6F61"/>
                <stop offset="1" stopColor="white" stopOpacity="0.01"/>
            </linearGradient>
            <linearGradient id="paint1_enq" x1="-1.80078" y1="69.9925" x2="270.802" y2="69.9925" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFCEAB"/>
                <stop offset="0.480364" stopColor="#FF6F61"/>
                <stop offset="1" stopColor="#FFCEAB"/>
            </linearGradient>
            <clipPath id="clip0_enq">
                <rect width="269" height="129" rx="20" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);
// ─────────────────────────────────────────────

export default function SuperAdminDashboard() {
    const [currentDate, setCurrentDate] = useState("");

    const totalCompanies    = STATIC_COMPANIES.length;
    const totalEnquiries    = STATIC_ENQUIRIES.length;
    const distributionTotal = STATIC_DISTRIBUTION_DATA.reduce((sum, item) => sum + item.value, 0);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    useEffect(() => {
        const updateDate = () => {
            const now = new Date();
            const options = { year: "numeric", month: "long", day: "numeric" };
            setCurrentDate(now.toLocaleDateString("en-US", options));
        };
        updateDate();
        const interval = setInterval(updateDate, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#F8F9FE] p-4 sm:p-6 md:p-8">

            {/* ── TOP ROW: Banner (3/4) + Stat Cards (1/4) ── */}
            {/* grid-cols-4 gives exact 3:1 ratio */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-5">

                {/* BANNER — 3 cols */}
                <div className="relative h-44 w-full overflow-hidden rounded-[32px] sm:h-52 lg:h-full lg:col-span-3">
                    <img
                        src={heroImage}
                        alt="Dashboard Banner"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="relative z-10 flex h-full flex-col justify-center p-6 sm:p-8 lg:p-10">
                        <p className="text-xs font-medium text-[#2D1C50]/60 tracking-widest uppercase">{currentDate}</p>
                        <h1 className="mt-1 text-xl font-bold text-[#2D1C50] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                            {getGreeting()}, {STATIC_USER_NAME}!
                        </h1>
                        <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#2D1C50]/75 sm:max-w-sm lg:max-w-md">
                            Control everything effortlessly using superpowers, smart tools, and stress-free efficiency.
                        </p>
                        <div className="mt-5">
                            <button className="inline-flex items-center justify-center rounded-xl bg-[#635BBA] px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#5249a1] transition-colors active:scale-95">
                                See All Companies
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 lg:col-span-1">

                    <div className="relative flex-1 overflow-hidden rounded-[28px] bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between px-4 pt-4 pb-0">
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E9E0FF] flex-shrink-0">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M2 2C0.895 2 0 2.895 0 4V16C0 17.105 0.895 18 2 18H16C17.105 18 18 17.105 18 16V4C18 2.895 17.105 2 16 2H2ZM5 12C5 11.448 4.552 11 4 11C3.448 11 3 11.448 3 12V16C3 16.552 3.448 17 4 17C4.552 17 5 16.552 5 16V12ZM9 8C9.552 8 10 8.448 10 9V16C10 16.552 9.552 17 9 17C8.448 17 8 16.552 8 16V9C8 8.448 8.448 8 9 8ZM15 6C15 5.448 14.552 5 14 5C13.448 5 13 5.448 13 5V16C13 16.552 13.448 17 14 17C14.552 17 15 16.552 15 16V6Z" fill="#654CB7"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-[#64748B] leading-tight">Total</p>
                                    <p className="text-xs font-semibold text-[#64748B] leading-tight">Companies</p>
                                </div>
                            </div>
                            <span className="text-3xl font-extrabold text-[#5D50C6]">{totalCompanies}</span>
                        </div>
                        <div className="mt-1 -mx-[1px] -mb-[1px] h-20">
                            <TotalCompaniesSVG />
                        </div>
                    </div>
                    <div className="relative flex-1 overflow-hidden rounded-[28px] bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between px-4 pt-4 pb-0">
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFE0E7] flex-shrink-0">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M13.875 12.75C13.875 13.3717 13.3717 13.875 12.75 13.875C12.1283 13.875 11.625 13.3717 11.625 12.75C11.625 12.1283 12.1283 11.625 12.75 11.625C13.3717 11.625 13.875 12.1283 13.875 12.75ZM17.7803 17.7803C17.634 17.9265 17.442 18 17.25 18C17.058 18 16.866 17.9265 16.7197 17.7803L15.3533 16.4137C14.6175 16.938 13.7205 17.25 12.75 17.25C10.269 17.25 8.25 15.231 8.25 12.75C8.25 10.269 10.269 8.25 12.75 8.25C15.231 8.25 17.25 10.269 17.25 12.75C17.25 13.7205 16.938 14.6175 16.4137 15.3533L17.7803 16.7197C18.0735 17.013 18.0735 17.487 17.7803 17.7803ZM9.75 6H14.655C14.3948 5.3152 13.995 4.6852 13.4618 4.152L10.8488 1.5375C10.3147 1.0042 9.6847 0.6045 9 0.345V5.25C9 5.6632 9.336 6 9.75 6ZM6.75 12.75C6.75 10.4925 8.0047 8.5238 9.852 7.5H9.75C8.5095 7.5 7.5 6.4905 7.5 5.25V0.018C7.3793 0.0098 7.2585 0 7.1363 0H3.75C1.6823 0 0 1.6823 0 3.75V14.25C0 16.3177 1.6823 18 3.75 18H9.852C8.0047 16.9762 6.75 15.0075 6.75 12.75Z" fill="#FF6F61"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-[#64748B] leading-tight">Total</p>
                                    <p className="text-xs font-semibold text-[#64748B] leading-tight">Enquiries</p>
                                </div>
                            </div>
                            <span className="text-3xl font-extrabold text-[#FF715B]">{totalEnquiries}</span>
                        </div>
                        <div className="mt-1 -mx-[1px] -mb-[1px] h-20">
                            <TotalEnquiriesSVG />
                        </div>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-5">
                <div className="lg:col-span-1">
                    <DistributionCard
                        distributionData={STATIC_DISTRIBUTION_DATA}
                        distributionTotal={distributionTotal}
                    />
                </div>
                <div className="lg:col-span-3">
                    <PerformanceTrends performanceData={STATIC_PERFORMANCE_DATA} />
                </div>
            </div>

            <div className="w-full">
                <CompanyTable data={STATIC_COMPANIES} />
            </div>

        </div>
    );
}