import { useRef, useState, useEffect } from "react";
import {
    BsPersonCircle,
    BsCashStack,
    BsFillHouseFill,
    BsExclamationCircleFill,
    BsBuildingFill,
    BsCashCoin,
    BsBoxArrowRight,
    BsBoxes,
    BsPeopleFill,
    BsFillAwardFill
} from "react-icons/bs";
import { FaUserCircle, FaHome, FaTint, FaExclamationCircle, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
const menuOptions = [
    {
        name: "Home",
        icon: BsFillHouseFill,
        link: "/home"
    },
    {
        name: "मालमत्ता कर विभाग",
        icon: BsFillHouseFill,
        link: "/propertydashboard"
    },
    {
        name: "पाणीपट्टी विभाग",
        icon: FaTint,
        link: "/waterdashboard"
    },
    {
        name: "तक्रारी व सूचना",
        icon: BsExclamationCircleFill,
        link: "/CADDashboard"
    },
    {
        name: "प्रशासकीय विभाग",
        icon: BsBuildingFill,
        link: "/Administrative"
    },
    {
        name: "सी.फ.सी विभाग",
        icon: BsCashCoin,
        link: "/CfcDashBoard"
    },
    {
        name: "अकाऊंट विभाग",
        icon: BsCashStack,
        link: "/Accounts"
    },
    {
        name: "इस्टेट विभाग",
        icon: BsBuildingFill,
        link: "/Estate"
    },
    {
        name: "आर.टी.एस विभाग",
        icon: BsCashCoin,
        link: "/Rts"
    },
    {
        name: "मार्केट विभाग",
        icon: BsCashCoin,
        link: "/Market"
    },
    {
        name: "ॲसेट मॅनेजमेंट विभाग",
        icon: BsBoxes,
        link: "/Asset"
    },
    {
        name: "समाज कल्याण विभाग",
        icon: BsPeopleFill,
        link: "/SocialWelfare"
    },
    {
        name: "लीगल विभाग",
        icon: BsFillAwardFill,
        link: "/Legal"
    }
];
const HeaderUserButton = ({ logOut }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Fallback to localStorage in case user state from useAuth context is empty or loading
    const storedUser = !user ? JSON.parse(localStorage.getItem("user") || "{}") : user;
    const userName = user?.data?.UserName || storedUser?.data?.UserName || "";
    const ulbName = user?.data?.UlbName || storedUser?.data?.UlbName || "";

    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    const handleNavigate = (link) => {
        setShowDropdown(false);
        navigate(link);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="flex h-[42px] w-[42px] items-center justify-center border-0 bg-white/20 text-white backdrop-blur-[10px]"
                style={{
                    borderRadius: "50%"
                }}
                onClick={() => setShowDropdown((prev) => !prev)}
            >
                <BsPersonCircle size={20} />
            </button>

            {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-gray-200 bg-white shadow-xl z-50 overflow-hidden">
                    {/* User Profile Details */}
                    {(userName || ulbName) && (
                        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50/50 flex flex-col gap-0.5">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                Profile Details
                            </div>
                            {userName && (
                                <div className="text-[14px] font-bold text-gray-800 truncate" title={userName}>
                                    User Name: {userName}
                                </div>
                            )}
                            {ulbName && (
                                <div className="text-xs text-gray-500 truncate" title={ulbName}>
                                    ULB Name: {ulbName}
                                </div>
                            )}
                        </div>
                    )}

                    {menuOptions.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.link}
                                onClick={() => handleNavigate(item.link)}
                                className="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                                style={{
                                    border: "none",
                                    cursor: "pointer",
                                    fontFamily: "sans-serif",
                                }}
                            >
                                <Icon className="mr-3" size={16} />
                                {item.name}
                            </button>
                        );
                    })}

                    <div className="border-t border-gray-200" />

                    <button
                        onClick={() => {
                            setShowDropdown(false);
                            logOut();
                        }}
                        className="flex w-full items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                        style={{
                            border: "none",
                            cursor: "pointer",
                            fontFamily: "sans-serif",
                        }}
                    >
                        <BsBoxArrowRight className="mr-3" size={16} />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default HeaderUserButton;