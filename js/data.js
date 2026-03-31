const DB = {
    plans: [
        { 
            name: "M365 Business Premium", 
            price: 22.0, 
            tier: "business", 
            max: 300, 
            capabilities: [
                "entra_p1_ca", "entra_p1_passprot", 
                "mde_p1_core", 
                "mdo_p1_safe", 
                "purview_mip_labels", 
                "intune_p1_core",
                "mda_discovery" // Базовый Cloud Discovery включен
            ] 
        },
        { 
            name: "Microsoft 365 E3", 
            price: 36.0, 
            tier: "enterprise", 
            max: null, 
            capabilities: [
                "entra_p1_ca", "entra_p1_passprot", 
                "mde_p1_core", 
                "purview_mip_labels", 
                "intune_p1_core",
                "mda_discovery" // Базовый Cloud Discovery включен
            ] 
        },
        { 
            name: "Microsoft 365 E5", 
            price: 57.0, 
            tier: "enterprise", 
            max: null, 
            capabilities: [
                "entra_p1_ca", "entra_p1_passprot", "entra_p2_pim", "entra_p2_idprot",
                "mde_p1_core", "mde_p2_edr", "mde_p2_air", "mde_p2_tvm",
                "mdo_p1_safe", "mdo_p2_explorer", "mdo_p2_sim",
                "mda_discovery", "mda_casb", // Включает полный CASB
                "mdi_core", // Включает Defender for Identity
                "purview_mip_labels", "purview_dlp", 
                "intune_p1_core"
            ] 
        }
    ],

    addons: [
        { id: "addon_entra_p2", name: "Entra ID P2", price: 9.00, provides: "entra_p2_idprot" },
        { id: "addon_entra_p2_pim", name: "Entra ID P2 (PIM)", price: 9.00, provides: "entra_p2_pim" },
        { id: "addon_mde_p2", name: "Defender for Endpoint P2", price: 5.20, provides: "mde_p2_edr" },
        { id: "addon_mde_p2_air", name: "Defender for Endpoint P2", price: 5.20, provides: "mde_p2_air" },
        { id: "addon_mde_p2_tvm", name: "Defender for Endpoint P2", price: 5.20, provides: "mde_p2_tvm" },
        { id: "addon_mdo_p2", name: "Defender for Office 365 P2", price: 5.00, provides: "mdo_p2_explorer" },
        { id: "addon_mdo_p2_sim", name: "Defender for Office 365 P2", price: 5.00, provides: "mdo_p2_sim" },
        { id: "addon_mda", name: "Defender for Cloud Apps", price: 3.50, provides: "mda_casb" },
        { id: "addon_mdi", name: "Defender for Identity", price: 5.50, provides: "mdi_core" },
        { id: "addon_purview_dlp", name: "Purview Data Loss Prevention", price: 5.00, provides: "purview_dlp" },
        { id: "addon_intune_suite", name: "Intune Suite", price: 10.00, provides: "intune_suite_epm" }
    ],

    featureCategories: {
        "Identity & Access (Entra)": {
            left: {
                title: "Entra ID Plan 1",
                features: [
                    { id: "entra_p1_ca", name: "Conditional Access", desc: "Configure access policies based on signals (location, device, risk).", requires: "entra_p1_ca", learn: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview" },
                    { id: "entra_p1_passprot", name: "Password Protection", desc: "Block known weak passwords and custom company password lists.", requires: "entra_p1_passprot", learn: "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad" }
                ]
            },
            right: {
                title: "Entra ID Plan 2",
                features: [
                    { id: "entra_p2_pim", name: "Privileged Identity Management (PIM)", desc: "Just-In-Time (JIT) administrator access with workflow approvals.", requires: "entra_p2_pim", learn: "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure", includes: ["entra_p1_ca", "entra_p1_passprot"] },
                    { id: "entra_p2_idprot", name: "Identity Protection", desc: "Automated protection against account compromise using real-time risk.", requires: "entra_p2_idprot", learn: "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection", includes: ["entra_p1_ca", "entra_p1_passprot"] }
                ]
            }
        },
        
        "Endpoint Security": {
            left: {
                title: "Defender for Endpoint P1",
                features: [
                    { id: "mde_p1_core", name: "Next-Gen Protection & ASR", desc: "Next-generation antivirus, network isolation, and attack surface reduction.", requires: "mde_p1_core", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/next-generation-protection" }
                ]
            },
            right: {
                title: "Defender for Endpoint P2",
                features: [
                    { id: "mde_p2_edr", name: "Endpoint Detection & Response (EDR)", desc: "Advanced attack detection, deep device telemetry collection, and hunting.", requires: "mde_p2_edr", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/overview-endpoint-detection-response", includes: ["mde_p1_core"] },
                    { id: "mde_p2_air", name: "Automated Investigation & Response", desc: "Automated 24/7 alert investigation and threat remediation.", requires: "mde_p2_air", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/automated-investigations", includes: ["mde_p2_edr", "mde_p1_core"] },
                    { id: "mde_p2_tvm", name: "Threat & Vulnerability Management", desc: "Continuous software vulnerability monitoring and proactive patching.", requires: "mde_p2_tvm", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/next-gen-threat-and-vuln-mgt", includes: ["mde_p1_core"] }
                ]
            }
        },

        "Email & Collaboration": {
            left: {
                title: "Defender for Office 365 P1",
                features: [
                    { id: "mdo_p1_safe", name: "Safe Links & Safe Attachments", desc: "Time-of-click URL verification and sandbox detonation for attachments.", requires: "mdo_p1_safe", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/office-365-security/safe-links-about" }
                ]
            },
            right: {
                title: "Defender for Office 365 P2",
                features: [
                    { id: "mdo_p2_explorer", name: "Threat Explorer & AIR", desc: "Detailed phishing campaign analysis and auto-purging of malicious emails.", requires: "mdo_p2_explorer", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/office-365-security/threat-explorer-about", includes: ["mdo_p1_safe"] },
                    { id: "mdo_p2_sim", name: "Attack Simulation Training", desc: "Run simulated phishing campaigns to test and improve employee awareness.", requires: "mdo_p2_sim", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/office-365-security/attack-simulation-training-get-started", includes: ["mdo_p1_safe"] }
                ]
            }
        },

        "Data Security (Purview)": {
            left: {
                title: "Information Protection",
                features: [
                    { id: "purview_mip_labels", name: "Sensitivity Labels", desc: "Document and email classification with optional encryption.", requires: "purview_mip_labels", learn: "https://learn.microsoft.com/en-us/purview/sensitivity-labels" }
                ]
            },
            right: {
                title: "Data Loss Prevention",
                features: [
                    { id: "purview_dlp", name: "Endpoint & Cloud DLP", desc: "Prevent unauthorized data exfiltration across endpoints and cloud services.", requires: "purview_dlp", learn: "https://learn.microsoft.com/en-us/purview/dlp-learn-about-dlp", includes: ["purview_mip_labels"] }
                ]
            }
        },

        "Endpoint Management": {
            left: {
                title: "Intune Plan 1",
                features: [
                    { id: "intune_p1_core", name: "Core MDM / MAM", desc: "Device management for Windows, macOS, iOS, Android, and corporate data protection.", requires: "intune_p1_core", learn: "https://learn.microsoft.com/en-us/mem/intune/fundamentals/what-is-intune" }
                ]
            },
            right: {
                title: "Intune Suite",
                features: [
                    { id: "intune_suite_epm", name: "Endpoint Privilege Management (EPM)", desc: "Allows standard users to run approved applications with temporarily elevated privileges.", requires: "intune_suite_epm", learn: "https://learn.microsoft.com/en-us/mem/intune/protect/epm-overview", includes: ["intune_p1_core"] }
                ]
            }
        },

        "Cloud App & AD Security": {
            left: {
                title: "App Security (Basic)",
                features: [
                    { id: "mda_discovery", name: "Cloud App Discovery", desc: "Discover Shadow IT and analyze cloud app usage across the organization.", requires: "mda_discovery", learn: "https://learn.microsoft.com/en-us/defender-cloud-apps/set-up-cloud-discovery" }
                ]
            },
            right: {
                title: "SaaS & AD Security (Advanced)",
                features: [
                    { id: "mda_casb", name: "SaaS Security (CASB)", desc: "Session control for cloud apps, SaaS DLP, and advanced app governance.", requires: "mda_casb", learn: "https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps", includes: ["mda_discovery"] },
                    { id: "mdi_core", name: "AD Threat Protection (MDI)", desc: "Protect on-premises AD against advanced attacks (Pass-the-Hash, Golden Ticket).", requires: "mdi_core", learn: "https://learn.microsoft.com/en-us/defender-for-identity/what-is" }
                ]
            }
        }
    }
};
