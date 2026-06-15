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
      { label: "Domain", value: "PLM & Enterprise" }
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
        "Built ACL Comparison Tool (frontend + backend)",
        "Built Logging & Monitoring Tool",
        "Designed enterprise PLM solutions"
      ]
    }
  ],

  skills: [
    {
      category: "PLM & Tools",
      skills: [
        { name: "Windchill" },
        { name: "Lifecycle Management" },
        { name: "ACL Configuration" },
        { name: "QML" }
      ]
    },
    {
      category: "Programming",
      skills: [
        { name: "Java" },
        { name: "SQL" },
        { name: "XML" },
        { name: "PowerShell" }
      ]
    },
    {
      category: "Concepts",
      skills: [
        { name: "PLM Customization" },
        { name: "Data Analysis" },
        { name: "Debugging" }
      ]
    },
    {
      category: "Other",
      skills: [
        { name: "Azure AI" },
        { name: "MATLAB & Simulink" },
        { name: "VLSI" },
        { name: "Embedded Systems" }
      ]
    }
  ],

  toolsBuilt: [
    {
      name: "ACL Comparison Tool",
      description: "Compares user roles, domains, and access permissions across Windchill environments.",
      techStack: ["Java", "Windchill API", "SQL", "HTML/CSS"],
      icon: "lock"
    },
    {
      name: "Business Logging & Monitoring Tool",
      description: "Tracks system behavior, errors, and execution flows for enterprise PLM operations.",
      techStack: ["Java", "Log4j", "SQL", "Dashboard UI"],
      icon: "chart"
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
      score: "10th: 93.8%(2018) | 12th: 87.8%(2020)"
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
