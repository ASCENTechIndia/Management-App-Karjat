import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../Components/NewLayout";
import {
  FaChartPie,
  FaClipboardList,
  FaExclamationCircle,
  FaBuilding,
  FaListAlt,
  FaClock,
  FaCalendarAlt,
  FaFileAlt,
  FaRedo,
} from "react-icons/fa";
import DashboardCard from "../../Components/NewDashboardCard";

const tilesData = [
  {
    id: 1,
    title: "डॅशबोर्ड",
    icon: FaChartPie,
    route: "CrmDashBoardOut",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "तक्रार सारांश",
    icon: FaClipboardList,
    route: "ComplaintSummary2",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-400",
  },
  {
    id: 3,
    title: "तक्रार प्रकार",
    icon: FaExclamationCircle,
    route: "ComplaintType",
    iconBg: "bg-gradient-to-br from-purple-500 to-violet-400",
  },
  {
    id: 4,
    title: "विभागनिहाय तक्रार",
    icon: FaBuilding,
    route: "ComplaintDepartmentWise",
    iconBg: "bg-gradient-to-br from-orange-500 to-amber-400",
  },
  {
    id: 5,
    title: "तक्रारीचा प्रकार",
    icon: FaListAlt,
    route: "TypeOfComplaint",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-400",
  },
  {
    id: 6,
    title: "वेळेवर अहवाल प्रतिबिंब",
    icon: FaClock,
    route: "ReportTimelyReflection",
    iconBg: "bg-gradient-to-br from-red-500 to-orange-400",
  },
  {
    id: 7,
    title: "कालावधीनुसार तक्रार अहवाल",
    icon: FaCalendarAlt,
    route: "ComplaintReportByPeriod",
    iconBg: "bg-gradient-to-br from-indigo-500 to-blue-400",
  },
  {
    id: 8,
    title: "तक्रार अहवाल",
    icon: FaFileAlt,
    route: "ComplaintGrvRpt",
    iconBg: "bg-gradient-to-br from-teal-500 to-cyan-400",
  },
  {
    id: 9,
    title: "रिओपन",
    icon: FaRedo,
    route: "ReOpen",
    iconBg: "bg-gradient-to-br from-amber-500 to-yellow-400",
  },
];

export default function CADDashboard() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const handleGoBack = () => {
    navigate("/home");
  };

  const filteredTiles = tilesData.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase()),
  );

  const openFeature = (route) => {
    const payload = { type: "navigate", route };

    if (window.ToFlutter && window.ToFlutter.postMessage) {
      window.ToFlutter.postMessage(JSON.stringify(payload));
    } else {
      if (route.startsWith("https")) {
        window.open(route, "_blank");
      } else {
        navigate(`/${route}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#eef4ff] font-sans pb-6">
      <PageHeader
        title="CRM Dashboard"
        subtitle="Welcome"
        onBack={handleGoBack}
      />
      <div className="mx-auto w-full lg:w-[40%]">
        <section className="container mx-auto md:-mt-3 px-4">
          <div className="grid grid-cols-2 gap-3">
            {tilesData.map((item) => (
              <DashboardCard
                key={item.id}
                onClick={() => openFeature(item.route)}
                icon={item.icon}
                title={item.title}
                iconBg={item.iconBg}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
