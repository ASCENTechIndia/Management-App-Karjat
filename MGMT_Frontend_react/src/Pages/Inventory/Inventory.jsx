import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../Components/NewLayout";
import { FaListAlt } from "react-icons/fa";
import DashboardCard from "../../Components/NewDashboardCard";

const tilesData = [
  {
    id: 1,
    title: "Inventory Summary",
    icon: FaListAlt,
    route: "InventoryAhwal",
    iconBg: "bg-gradient-to-br from-amber-600 to-orange-400",
  },
];

export default function Inventory() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleGoBack = () => {
    navigate("/home");
  };

  const openFeature = (route) => {
    const payload = { type: "navigate", route };

    if (window.ToFlutter && window.ToFlutter.postMessage) {
      window.ToFlutter.postMessage(JSON.stringify(payload));
    } else {
      navigate(`/${route}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef4ff] font-sans pb-6">
      <PageHeader
        title="Inventory Department"
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
