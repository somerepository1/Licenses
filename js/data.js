const DB = {
    // 1. BASE PLANS & THEIR NATIVE CAPABILITIES
    plans: [
        { 
            name: "M365 Business Premium", 
            price: 22.0, 
            tier: "business", 
            max: 300, 
            capabilities: ["entra_p1", "intune", "dfe_p1", "dfo_p1", "purview_p1"],
            compliance: "CIS Controls v8 (Implementation Group 1), Basic Zero Trust"
        },
        { 
            name: "Microsoft 365 E3", 
            price: 36.0, 
            tier: "enterprise", 
            max: null, 
            capabilities: ["entra_p1", "intune", "dfe_p1", "purview_p1"],
            compliance: "CIS M365 Foundation Level 1, Base Zero Trust Identity"
        },
        { 
            name: "Microsoft 365 E5", 
            price: 57.0, 
            tier: "enterprise", 
            max: null, 
            capabilities: ["entra_p1", "entra_p2", "intune", "dfe_p1", "dfe_p2", "dfo_p1", "dfo_p2", "mdi", "mdca", "purview_p1", "purview_p2"],
            compliance: "CIS Level 1 & 2, Advanced Zero Trust Architecture, NIS2"
        }
    ],

    // 2. STANDALONE ADD-ONS (To fill the gaps if a base plan lacks a feature)
    addons: [
        { id: "addon_entra_p2", name: "Microsoft Entra ID P2", price: 9.00, provides: "entra_p2" },
        { id: "addon_mde_p2", name: "Defender for Endpoint P2", price: 5.20, provides: "dfe_p2" },
        { id: "addon_mdo_p2", name: "Defender for Office 365 P2", price: 5.00, provides: "dfo_p2" },
        { id: "addon_mdi", name: "Defender for Identity", price: 5.50, provides: "mdi" },
        { id: "addon_mdca", name: "Defender for Cloud Apps", price: 3.50, provides: "mdca" },
        { id: "addon_purview_p2", name: "Purview Information Protection P2", price: 5.00, provides: "purview_p2" },
        { id: "addon_entra_sse", name: "Entra Global Secure Access", price: 3.00, provides: "entra_sse" }
    ],
    
    // 3. ZERO TRUST PILLARS & FEATURES
    featureCategories: {
        "1. Identity": [
            { 
                id: "zt_id_1", 
                name: "Conditional Access & MFA", 
                desc: "Verify explicitly. Grant access based on user, location, and device context (Entra ID P1).", 
                learn: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview", 
                requires: "entra_p1" 
            },
            { 
                id: "zt_id_2", 
                name: "Risk-Based Identity Protection", 
                desc: "Automate responses to compromised user accounts and sign-in risks (Entra ID P2).", 
                learn: "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection", 
                requires: "entra_p2" 
            },
            { 
                id: "zt_id_3", 
                name: "Detect On-Premises Lateral Movement", 
                desc: "Protect Active Directory from pass-the-hash and DCSync attacks (Defender for Identity).", 
                learn: "https://learn.microsoft.com/en-us/defender-for-identity/what-is", 
                requires: "mdi" 
            }
        ],
        "2. Endpoints": [
            { 
                id: "zt_ep_1", 
                name: "Device Compliance & MDM", 
                desc: "Ensure devices meet security standards before granting access (Microsoft Intune).", 
                learn: "https://learn.microsoft.com/en-us/mem/intune/protect/device-compliance-get-started", 
                requires: "intune" 
            },
            { 
                id: "zt_ep_2", 
                name: "Next-Gen Antivirus & ASR", 
                desc: "Block malware and reduce attack surfaces on devices (Defender for Endpoint P1).", 
                learn: "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/next-generation-protection", 
                requires: "dfe_p1" 
            },
            { 
                id: "zt_ep_3", 
                name: "Endpoint Detection & Response (EDR)", 
                desc: "Deep visibility and automated investigation for advanced threats (Defender for Endpoint P2).", 
                learn: "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/overview-endpoint-detection-response", 
                requires: "dfe_p2" 
            }
        ],
        "3. Data": [
            { 
                id: "zt_dt_1", 
                name: "Manual Data Classification & DLP", 
                desc: "Apply sensitivity labels and prevent data loss for emails/files (Purview Info Protection P1).", 
                learn: "https://learn.microsoft.com/en-us/purview/information-protection", 
                requires: "purview_p1" 
            },
            { 
                id: "zt_dt_2", 
                name: "Auto-Labeling & Insider Risk", 
                desc: "Automatically classify sensitive data and detect risky user behavior (Purview Info Protection P2).", 
                learn: "https://learn.microsoft.com/en-us/purview/insider-risk-management", 
                requires: "purview_p2" 
            }
        ],
        "4. Applications": [
            { 
                id: "zt_ap_1", 
                name: "Email Threat Protection", 
                desc: "Defend against phishing, business email compromise, and malicious attachments (Defender for Office P1).", 
                learn: "https://learn.microsoft.com/en-us/microsoft-365/security/office-365-security/defender-for-office-365", 
                requires: "dfo_p1" 
            },
            { 
                id: "zt_ap_2", 
                name: "Shadow IT Discovery & Control", 
                desc: "Govern SaaS application usage and enforce session controls (Defender for Cloud Apps).", 
                learn: "https://learn.microsoft.com/en-us/defender-cloud-apps/what-is-defender-for-cloud-apps", 
                requires: "mdca" 
            }
        ],
        "5. Network & Infrastructure": [
            { 
                id: "zt_nw_1", 
                name: "Global Secure Access (SSE)", 
                desc: "Secure Internet & Private Access bypassing traditional VPNs (Entra Internet/Private Access).", 
                learn: "https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access", 
                requires: "entra_sse" 
            }
        ]
    }
};
