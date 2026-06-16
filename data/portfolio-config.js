/**
 * Portfolio Configuration Data
 * Contains all section content for Biswa Prakash Acharya's portfolio.
 */

export const PortfolioConfig = {
  personal: {
    name: "Biswa Prakash Acharya",
    title: "Windchill PLM Engineer | Java | Enterprise Systems",
    location: "Pune, India",
    email: "acharyabiswaprakash06@gmail.com",
    phone: "+91-8984291205",
    linkedin: "https://www.linkedin.com/in/biswaprakash-acharya-5b8a5b183",
    resumeUrl: "assets/BISWA_RESUME_2026.pdf"
  },

  hero: {
    name: "BISWA PRAKASH ACHARYA",
    title: "Windchill PLM Engineer | Java | Enterprise Systems",
    skillTags: ["Java", "SQL", "XML", "Windchill", "ACL", "PLM", "System Design"],
    subtitle: "Building enterprise tools and PLM-driven solutions",
    backgroundImage: "assets/hero-bg.jpg",
    resumeUrl: "assets/BISWA_RESUME_2026.pdf"
  },

  about: {
    profileImage: "assets/profile.jpg",
    description: "Windchill PLM professional with experience in customization, ACL analysis, enterprise tool development, and system debugging.",
    stats: [
      { label: "Tools Built", value: "2" },
      { label: "Technologies", value: "10+" },
      { label: "Domain", value: "PLM" }
    ]
  },

  experience: [
    {
      company: "ZF Friedrichshafen AG",
      role: "Engineering Trainee – IT PLM Core",
      period: "Nov 2025 – Present",
      responsibilities: [
        "Windchill lifecycle customization",
        "Workflow, roles, and OIR configuration",
        "ACL access analysis",
        "SQL reporting and QML",
        "XML configuration",
        "Full-stack development inside Windchill"
      ],
      achievements: [
        "Built ACL Automation System (frontend + backend) for automated access analysis across PLM systems",
        "Developed BIZILOGS – a full-stack business intelligence platform for managing companies, contacts, org hierarchy, and business requirements with AI-assisted insights (BISWA) and MongoDB storage",
        "Designed and delivered enterprise PLM solutions including workflow configuration, ACL optimization, and system-level customizations"
      ]
    }
  ],

  skills: [
    {
      category: "PLM & Tools",
      skills: [
        { name: "Windchill", proficiency: 90 },
        { name: "Lifecycle Management", proficiency: 85 },
        { name: "ACL Configuration", proficiency: 85 },
        { name: "QML", proficiency: 75 }
      ]
    },
    {
      category: "Programming",
      skills: [
        { name: "Java", proficiency: 85 },
        { name: "SQL", proficiency: 80 },
        { name: "XML", proficiency: 80 },
        { name: "PowerShell", proficiency: 70 }
      ]
    },
    {
      category: "Concepts",
      skills: [
        { name: "PLM Customization", proficiency: 90 },
        { name: "Data Analysis", proficiency: 75 },
        { name: "Debugging", proficiency: 85 }
      ]
    },
    {
      category: "Other",
      skills: [
        { name: "Azure AI", proficiency: 65 },
        { name: "MATLAB & Simulink", proficiency: 60 },
        { name: "VLSI", proficiency: 55 },
        { name: "Embedded Systems", proficiency: 60 }
      ]
    }
  ],

  toolsBuilt: [
    {
      name: "ACL Automation System",
      description: "End-to-end automation system that detects, analyzes, and reports ACL changes across Windchill environments with zero manual intervention.",
      techStack: ["Node.js", "File System", "CSV Processing", "PowerShell", "Outlook Integration", "Task Scheduler"],
      icon: "lock",
      badge: "Zero-Touch Automation",
      highlights: [
        "✔ Backend automation pipeline (Node.js)",
        "✔ UI-based reporting and visualization",
        "✔ Zero-touch execution (Scheduler + Email)"
      ],
      workflow: "Export → Detect → Compare → Report → Email",
      features: [
        "Auto-detection of latest CSV exports",
        "Composite key-based comparison logic",
        "Large-scale data handling (~1M rows)",
        "Automated report generation (CSV + ZIP)",
        "Email delivery via Outlook integration",
        "Scheduled execution (Task Scheduler)",
        "UI-based project visualization",
        "Clean reporting structure display"
      ],
      aiHighlight: "Fully automated pipeline: Windchill exports ACL data → System detects new files → Compares using composite keys → Generates categorized reports (Added/Removed/Changed) → ZIPs and emails to stakeholders — all with zero manual effort."
    },
    {
      name: "BIZILOGS – Business Intelligence Platform",
      description: "A full-stack business intelligence platform that manages companies, contacts, organizational hierarchy, and business requirements with real-time collaboration, role-based access, and AI-powered insights.",
      techStack: ["Node.js", "Express", "MongoDB", "REST API", "Netlify", "Render", "AI Assistant"],
      icon: "network",
      badge: "Real-Time Collaboration System",
      highlights: [
        "✔ Company & Contact Management",
        "✔ Organizational Hierarchy Visualization",
        "✔ Role-Based Access (Admin/User)",
        "✔ AI Assistant (BISWA for smart queries)",
        "✔ Persistent Cloud Storage (MongoDB)"
      ],
      workflow: "Login → Manage Companies → Build Org Chart → Track Requirements → Query via BISWA AI → Data Persists in MongoDB",
      features: [
        "Real-time data persistence using MongoDB Atlas",
        "Dynamic org chart rendering with hierarchy rebuild",
        "AI-assisted filtering and search (BISWA)",
        "Multi-entity management (companies, contacts, requirements)",
        "API-based architecture for scalability",
        "Responsive and modern UI"
      ],
      aiHighlight: "Business Intelligence Flow: Users create structured company data → contacts form hierarchical relationships → requirements connect business needs → BISWA enables intelligent querying → data persists across sessions using MongoDB → enabling real-world business decision support."
    }
  ],

  projects: [
    {
      title: "Oscillatory Transient Mitigation and Voltage Stability Enhancement",
      description: "Advanced control strategy for improving voltage stability in renewable-integrated microgrids.",
      detailedDescription: "Focuses on mitigating oscillatory transients and improving voltage stability using DVR controlled via snake optimization technique. Published in Springer (Control Applications in Modern Power Systems). Nominated for Best Presenter at NIT Jamshedpur.",
      type: "PUBLICATION",
      link: "#",
      tags: ["MATLAB", "Power Systems", "Optimization", "Springer"]
    },
    {
      title: "Systematic Representation, Design, Analysis, and Construction of an R-C Plane",
      description: "Mathematical and electrical modeling of R-C plane structures.",
      detailedDescription: "Explores systematic modeling, analysis, and design principles of R-C plane systems. Presented at NIT Rourkela Innovision and SOA Symposium.",
      type: "PROJECT",
      tags: ["Electronics", "Aerodynamics", "Modeling"]
    },
    {
      title: "Over and Under Voltage Protection using Op-Amps and Arduino",
      description: "Hardware implementation of voltage protection system.",
      detailedDescription: "Developed a real-time voltage protection system using operational amplifiers and Arduino for circuit safety. Presented at SOA Proxima.",
      type: "PROJECT",
      tags: ["Arduino", "Op-Amps", "Circuit Design"]
    }
  ],

  education: [
    {
      institution: "ITER, SOA University",
      degree: "B.Tech – Electrical & Electronics Engineering",
      period: "2020–2024",
      score: "CGPA: 8.8"
    },
    {
      institution: "L.R DAV Public School, Cuttack",
      degree: "Secondary & Senior Secondary Education (CBSE)",
      period: "2007–2020",
      score: "10th: 93.8% (2018) | 12th: 87.8% (2020)"
    }
  ],

  certifications: [
    { name: "Azure AI Fundamentals", issuer: "Microsoft Certified" },
    { name: "SQL", issuer: "NASBA Certified" },
    { name: "PowerShell", issuer: "NASBA Certified" },
    { name: "Windchill Fundamentals", issuer: "PTC / ZF" },
    { name: "Electrical Power Distribution", issuer: "L&T" },
    { name: "Core Java", issuer: "LIT" },
    { name: "Model-Based Design", issuer: "KPIT NOVA" },
    { name: "XML", issuer: "LinkedIn" },
    { name: "VLSI", issuer: "CTTC" },
    { name: "Embedded with C", issuer: "Pantech AI" }
  ],

  projectExperience: [
    {
      organization: "Society of Automotive Engineers – ITER",
      role: "Department Head",
      period: "Nov 2021 – May 2023",
      details: [
        "Worked on MAHINDRA E-BAJA 2021-22 project",
        "Completed two phases successfully",
        "Focused on simulation, execution, and reporting",
        "Managed budgeting, cost optimization, scheduling"
      ],
      tags: ["Simulation", "Budgeting", "E-BAJA", "Reporting"]
    },
    {
      organization: "High Radius Corporation",
      role: "Consulting Intern",
      period: "May 2023 – June 2023",
      details: [
        "Worked in Highway to High-Radius program",
        "Prepared reports, estimations, presentations",
        "Strong problem-solving exposure"
      ],
      tags: ["Consulting", "Reporting", "Problem Solving"]
    },
    {
      organization: "Central Tool Room and Centre",
      role: "VLSI Intern/Trainee",
      period: "Nov 2024 – Feb 2025",
      details: [
        "Worked on Layout Design",
        "Used VHDL, Verilog",
        "Configured PLDs, FPGA, Microcontrollers"
      ],
      tags: ["VHDL", "Verilog", "FPGA", "Microcontroller"]
    }
  ],

  contact: {
    location: "Pune, India",
    email: "acharyabiswaprakash06@gmail.com",
    linkedin: "https://www.linkedin.com/in/biswaprakash-acharya-5b8a5b183"
  }
};
