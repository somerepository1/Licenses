const DB = {
    plans: [
        { 
            name: "M365 Business Premium", 
            price: 22.0, 
            tier: "business", 
            max: 300, 
            features: ["Defender for Endpoint P1", "Defender for Office 365 P1", "Intune"] 
        },
        { 
            name: "Microsoft 365 E3", 
            price: 36.0, 
            tier: "enterprise", 
            max: null, 
            features: ["Defender for Endpoint P1", "Intune"] 
        },
        { 
            name: "Microsoft 365 E5", 
            price: 57.0, 
            tier: "enterprise", 
            max: null, 
            features: ["Defender for Endpoint P2", "Defender for Office 365 P2", "Defender for Identity", "Defender for Cloud Apps", "Intune"] 
        }
    ],
    defenderSuite: {
        "Endpoint Protection": [
            { id: "Defender for Endpoint P1", desc: "Next-gen antimalware and attack surface reduction.", includes: [] },
            { id: "Defender for Endpoint P2", desc: "Full EDR, TVM, and automated investigation/remediation.", includes: ["Defender for Endpoint P1"] }
        ],
        "Email & Collaboration": [
            { id: "Defender for Office 365 P1", desc: "Safe Links, Safe Attachments, and anti-phishing.", includes: [] },
            { id: "Defender for Office 365 P2", desc: "Threat trackers, Explorer, and attack simulation training.", includes: ["Defender for Office 365 P1"] }
        ],
        "Identity Security": [
            { id: "Defender for Identity", desc: "Monitor Domain Controllers to detect lateral movement and AD attacks.", includes: [] }
        ],
        "Cloud App Security (CASB)": [
            { id: "Defender for Cloud Apps", desc: "Visibility and control over shadow IT and SaaS apps.", includes: [] }
        ]
    }
};
