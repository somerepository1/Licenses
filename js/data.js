const DB = {
    plans: [
        { name: "M365 Business Premium", price: 22.0, tier: "business", max: 300, capabilities: ["int_p1", "dfe_p1", "dfo_p1"] },
        { name: "Microsoft 365 E3", price: 36.0, tier: "enterprise", max: null, capabilities: ["int_p1", "dfe_p1"] },
        { name: "Microsoft 365 E5", price: 57.0, tier: "enterprise", max: null, capabilities: ["int_p1", "int_p2", "dfe_p1", "dfe_p2", "dfo_p1", "dfo_p2"] }
    ],
    addons: [
        { id: "addon_int_p2", name: "Intune Plan 2 Add-on", price: 4.00, provides: "int_p2" },
        { id: "addon_mde_p2", name: "Defender for Endpoint P2", price: 5.20, provides: "dfe_p2" },
        { id: "addon_mdo_p2", name: "Defender for Office P2", price: 5.00, provides: "dfo_p2" }
    ],
    featureCategories: {
        "Endpoint Management (Intune)": {
            left: {
                title: "Intune Plan 1",
                features: [
                    { id: "int_p1_cp", name: "Cross-Platform Management", desc: "Enrollment and policy management for iOS, Android, Windows, and macOS.", requires: "int_p1", learn: "#" },
                    { id: "int_p1_cc", name: "Configuration & Compliance", desc: "Set password requirements, encryption standards (BitLocker), and VPN profiles.", requires: "int_p1", learn: "#" },
                    { id: "int_p1_mam", name: "Mobile Application Management (MAM)", desc: "Secure corporate data within apps without requiring full device enrollment.", requires: "int_p1", learn: "#" }
                ]
            },
            right: {
                title: "Intune Plan 2",
                features: [
                    { id: "int_p2_tunnel", name: "Microsoft Tunnel for MAM", desc: "Micro-VPN gateway for unenrolled BYOD iOS and Android devices.", requires: "int_p2", learn: "#", includes: ["int_p1_cp", "int_p1_cc", "int_p1_mam"] },
                    { id: "int_p2_linux", name: "Management of Linux Desktops", desc: "Expanded configuration and compliance capabilities specifically for Linux.", requires: "int_p2", learn: "#", includes: ["int_p1_cp", "int_p1_cc"] }
                ]
            }
        },
        "Endpoint Protection (Defender)": {
            left: {
                title: "Defender for Endpoint Plan 1",
                features: [
                    { id: "dfe_p1_ng", name: "Next-Gen Antivirus", desc: "Real-time, behavior-based protection against malware and ransomware.", requires: "dfe_p1", learn: "#" },
                    { id: "dfe_p1_asr", name: "Attack Surface Reduction", desc: "Rules to restrict risky behaviors and macro execution.", requires: "dfe_p1", learn: "#" }
                ]
            },
            right: {
                title: "Defender for Endpoint Plan 2",
                features: [
                    { id: "dfe_p2_edr", name: "Endpoint Detection & Response", desc: "Deep visibility, advanced hunting, and continuous monitoring.", requires: "dfe_p2", learn: "#", includes: ["dfe_p1_ng", "dfe_p1_asr"] },
                    { id: "dfe_p2_air", name: "Automated Investigation (AIR)", desc: "Auto-remediate threats to reduce SOC workload.", requires: "dfe_p2", learn: "#", includes: ["dfe_p1_ng", "dfe_p1_asr"] }
                ]
            }
        }
    }
};
