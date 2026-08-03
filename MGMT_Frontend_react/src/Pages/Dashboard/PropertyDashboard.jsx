import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopHeader from "../../HOC/TopHeader/TopHeader";
import { Button } from "react-bootstrap";
import { PageHeader } from "../../Components/NewLayout";
import {
  FaBuilding,
  FaWallet,
  FaChartPie,
  FaChartBar,
  FaUniversity,
  FaHome,
  FaCheckCircle,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { TbMoneybag } from "react-icons/tb";
import { PiSealPercentFill } from "react-icons/pi";
import { BsGraphUp } from "react-icons/bs";
import DashboardCard from "../../Components/NewDashboardCard";

const tilesData = [
  {
    id: 1,
    title: "दैनिक व साप्ताहिक कर संकलन",
    icon: FaWallet,
    route: "dailycollection",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "प्रभागनिहाय कर मागणी",
    icon: FaMoneyBillAlt,
    route: "TaxCollectionDemand",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-400",
  },
  {
    id: 3,
    title: "प्रभागनिहाय कर संकलन",
    icon: GiMoneyStack,
    route: "TaxCollectionWardWise",
    iconBg: "bg-gradient-to-br from-purple-500 to-violet-400",
  },
  {
    id: 4,
    title: "थकबाकीदार यादी",
    icon: TbMoneybag,
    route: "DefaulterListProp",
    iconBg: "bg-gradient-to-br from-orange-500 to-amber-400",
  },
  {
    id: 5,
    title: "विभागनिहाय टक्केवारी अहवाल",
    icon: PiSealPercentFill,
    route: "DivisionWisePrecentRpt",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-400",
  },
  {
    id: 6,
    title: "प्रभागनिहाय दैनिक संकलन",
    icon: BsGraphUp,
    route: "collection_graph",
    iconBg: "bg-gradient-to-br from-red-500 to-orange-400",
  },
  {
    id: 7,
    title: "कायदेशीर / बेकायदेशीर",
    icon: FaUniversity,
    route: "LegalIllegal",
    iconBg: "bg-gradient-to-br from-indigo-500 to-blue-400",
  },
  {
    id: 8,
    title: "निवासी / व्यावसायिक",
    icon: FaHome,
    route: "ResidentCommerical",
    iconBg: "bg-gradient-to-br from-teal-500 to-cyan-400",
  },
];

export default function PropertyDashboard() {
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

    // ✅ If running inside Flutter
    if (window.ToFlutter && window.ToFlutter.postMessage) {
      window.ToFlutter.postMessage(JSON.stringify(payload));
    }
    // ✅ Otherwise, navigate using React Router
    else {
      navigate(`/${route}`);
    }
  };
  return (
    <div className="min-h-screen bg-[#eef4ff] font-sans pb-6">
      <PageHeader
        title="Property Dashboard"
        subtitle="Welcome"
        onBack={handleGoBack}
      />
      <div className="mx-auto w-full lg:w-[40%]">
        <section class="container mx-auto md:-mt-3 px-4">
          <div class="grid grid-cols-2 gap-3">
            {tilesData.map((item) => (
              <DashboardCard
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
