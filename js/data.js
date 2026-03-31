const DB = {
    plans: [
        { 
            name: "M365 Business Premium", price: 22.0, tier: "business", max: 300, 
            capabilities: ["dfe_p1", "dfo_p1", "intune"],
            compliance: "Aligns with CIS Controls v8 (Implementation Group 1)"
        },
        { 
            name: "Microsoft 365 E3", price: 36.0, tier: "enterprise", max: null, 
            capabilities: ["dfe_p1", "intune"],
            compliance: "Aligns with CIS M365 Foundation Benchmark Level 1"
        },
        { 
            name: "Microsoft 365 E5", price: 57.0, tier: "enterprise", max: null, 
            capabilities: ["dfe_p1", "dfe_p2", "dfo_p1", "dfo_p2", "mdi", "mdca", "intune"],
            compliance: "Aligns with CIS Level 1 & 2, Zero Trust Architecture, NIS2"
        }
    ],

    // Standalone Add-ons to fulfill missing capabilities
    addons: [
        { id: "addon_mde_p2", name: "Defender for Endpoint P2", price: 5.20, provides: "dfe_p2" },
        { id: "addon_mdo_p2", name: "Defender for Office 365 P2", price: 5.00, provides: "dfo_p2" },
        { id: "addon_mdi", name: "Defender for Identity", price: 5.50, provides: "mdi" },
        { id: "addon_mdca", name: "Defender for Cloud Apps", price: 3.50, provides: "mdca" }
    ],
    
    featureCategories: {
        "Defender for Endpoint (Devices)": [
            { id: "feat_ngp", name: "Next-Gen Antivirus (NGAV)", desc: "Behavior-based and heuristic real-time protection.", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/next-generation-protection", requires: "dfe_p1" },
            { id: "feat_asr", name: "Attack Surface Reduction (ASR)", desc: "Rules to restrict risky behaviors and macro execution.", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/attack-surface-reduction", requires: "dfe_p1" },
            { id: "feat_wcf", name: "Web Content Filtering", desc: "Block access to malicious or non-compliant websites.", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/web-content-filtering", requires: "dfe_p1" },
            { id: "feat_edr", name: "Endpoint Detection & Response (EDR)", desc: "Deep visibility into advanced persistent threats.", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/overview-endpoint-detection-response", requires: "dfe_p2" },
            { id: "feat_air", name: "Automated Investigation & Response (AIR)", desc: "Auto-remediate threats to reduce SOC workload.", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/automated-investigations", requires: "dfe_p2" },
            { id: "feat_tvm", name: "Threat & Vulnerability Management (TVM)", desc: "Continuous vulnerability assessment without active scans.", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/next-gen-threat-and-vuln-mgt", requires: "dfe_p2" }
        ],
        "Defender for Office 365 (Email)": [
            { id: "feat_slsa", name: "Safe Links & Attachments", desc: "Detonation of malicious links and payloads in sandboxes.", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/office-365-security/safe-links-about", requires: "dfo_p1" },
            { id: "feat_atpp", name: "Anti-Phishing Policies", desc: "Machine learning to detect impersonation and spoofing.", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/office-365-security/anti-phishing-policies-about", requires: "dfo_p1" },
            { id: "feat_exp", name: "Threat Explorer", desc: "Hunt for malicious emails across the organization.", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/office-365-security/threat-explorer-about", requires: "dfo_p2" },
            { id: "feat_sim", name: "Attack Simulation Training", desc: "Run realistic phishing campaigns to train employees.", learn: "https://learn.microsoft.com/en-us/microsoft-365/security/office-365-security/attack-simulation-training-get-started", requires: "dfo_p2" }
        ],
        "Defender for Identity (AD)": [
            { id: "feat_mdi", name: "Lateral Movement & DCSync Detection", desc: "Monitor on-premises AD for compromised identities.", learn: "https://learn.microsoft.com/en-us/defender-for-identity/what-is", requires: "mdi" }
        ],
        "Defender for Cloud Apps (SaaS)": [
            { id: "feat_mdca", name: "Shadow IT & App Governance", desc: "Discover unmanaged cloud apps and enforce session controls.", learn: "https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps", requires: "mdca" }
        ]
    }
};
