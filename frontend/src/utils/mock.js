// Mock data and utilities for portfolio

export const contactFormMock = {
  submit: async (formData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful submission
    console.log('Mock contact form submission:', formData);
    return {
      success: true,
      message: 'Thanks — I\'ll respond within 48 hours.'
    };
  }
};

export const resumeUrl = "/Prem_B-Resume.pdf";

export const socialLinks = {
  github: 'https://github.com/11prem',
  linkedin: 'http://linkedin.com/in/premb2004',
  email: 'prem112004@gmail.com',
  phone: '+91 8056187431'
};

export const personalInfo = {
  name: 'Prem B',
  location: 'Chengalpattu, Tamil Nadu, India',
  taglines: {
    short: 'Engineering AI systems and real-time mobile apps.',
    recruiter: 'B.Tech CSE student — Google Developers & ISRO internships, production focus.',
    technical: 'Building production-grade ML systems, real-time dashboards, and Android apps (Flutter).'
  },
  subtitle: 'Mobile App Developer, AI/ML Engineer, Full-Stack Developer',
  about: 'Computer Science & Engineering undergrad (B.Tech, CGPA 8.81). I build production-ready systems combining mobile apps, real-time backends, and ML models. Recent internships: Google Developers (AI/ML), ISRO ISTRAC (Full-Stack), ISRO SDSC (AI & Robotics). I focus on measurable outcomes: data latency reduction, production dashboards, and reliable mobile integrations.'
};

export const skills = {
  'Programming Languages': ['Python', 'Java', 'JavaScript', 'Dart (Flutter)'],
  'Database': ['SQL', 'NoSQL - Firebase'],
  'Web & Full-Stack': ['Flask', 'Dash', 'RESTful APIs', 'HTML/CSS', 'UDP', 'Real-time Data Acquisition'],
  'AI/ML & Data Analytics': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Pandas', 'Matplotlib', 'CNNs', 'RNNs', 'Reinforcement Learning'],
  'DevOps & Cloud': ['AWS', 'CI/CD (GitHub Actions)', 'Virtual Environments', 'ELK Stack'],
  'Web Technology': ['Next.js', 'Vanta.js', 'Tailwind CSS', 'GitHub Actions', 'Vercel / S3+CloudFront']
};

export const projects = [
  {
    id: 'aarcs',
    title: 'AARCS — Automated Ambulance Route Clearance System',
    summary: 'Real-time ambulance routing & notification system (mobile + backend).',
    bullets: [
      'Engineered dual Flutter apps with Firebase Realtime Database & Node.js backend, reducing emergency vehicle travel time by 50% in urban areas.',
      'Integrated Google Maps API with real-time GPS tracking and dynamic route recalculation, enabling live ETA predictions across 10+ traffic signals.',
      'Implemented Firebase Admin SDK custom token authentication & role-based access control, achieving 65% reduction in traffic congestion delays.'
    ],
    tech: ['Flutter (Android)', 'Flask', 'Flask-SocketIO', 'Firebase', 'AWS', 'GitHub Actions'],
    github: 'https://github.com/11prem/AARCS-AMBULANCE',
    demo: null,
    image: '/images/AARCS.png'
  },
  {
    id: 'google-analytics',
    title: 'Analytics Visualization — Google Developers',
    summary: 'Dash-based analytics suite for large-scale datasets and stakeholder reporting.',
    bullets: [
      'Cleaned & normalized 8 large datasets, uncovering +12% more relevant trends.',
      'Built interactive Dash dashboards reducing stakeholder analysis time by ~30%.',
      'Produced technical report & walkthrough adopted by global teams.'
    ],
    tech: ['Python', 'Dash', 'SQL', 'Plotly'],
    github: null,
    demo: null,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDB8fHx8MTc1OTMyOTM4NHww&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 'telemetry',
    title: 'NavIC Ranging Data Monitoring System',
    summary: 'Mission telemetry dashboard converting binary telemetry streams to live visual logs.',
    bullets: [
      'Engineered binary→JSON ingestion and low-latency REST + WebSocket APIs.',
      'Reduced telemetry latency from 5s to 2s and automated data-prep, cutting labor by ~60%.',
      'Integrated ELK for centralized logging (improved debugging speed ~40%).'
    ],
    tech: ['Python', 'Flask', 'SQL', 'WebSockets', 'ELK'],
    github: null,
    demo: null,
    image: '/images/Telemetry_Dashboard.png'
  },
  {
    id: 'robotics',
    title: 'Robotic Arm Manipulator using Reinforcement Learning',
    summary: 'Robotic Arm Manipulator (simulation).',
    bullets: [
      'Designed and simulated robotic-arm workflows in PyBullet + OpenCV, achieving a 92% pick-and-place success rate (simulation).',
      'Trained RL agents (PPO & DQN), improving assembly precision by 15% (simulation).',
      'Documented system architecture and delivered training to a 5-member team.'
    ],
    tech: ['PyBullet', 'OpenCV', 'NumPy', 'Reinforcement Learning'],
    github: null,
    demo: null,
    image: '/images/Robotic_Arm_Manipulator.png'
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website — This Site',
    summary: 'Recruiter-focused portfolio site showcasing mobile, real-time, and ML projects — React + Tailwind + Canvas.',
    bullets: [
      'Minimal, aesthetic UI with animated background, light/dark modes, accessible components and resume download.',
      'SEO & performance-first: meta tags, lazy-loaded assets, optimized images.',
      'Responsive design with micro-interactions and smooth animations throughout.'
    ],
    tech: ['React', 'Tailwind CSS', 'Canvas API', 'React Router', 'Lucide Icons'],
    github: 'https://github.com/11prem/Portfolio-Website',
    demo: null,
    image: '/images/Portfolio_Website.png'
  }
];

export const experience = [
  {
    company: 'Google Developers',
    role: 'Machine Learning Engineer Intern',
    period: 'Apr 2025 – May 2025',
    description: 'Cleaned and normalized eight large datasets, developed an interactive Dash visualization suite, and delivered technical documentation and video walkthroughs used by three global teams to uncover content trends.'
  },
  {
    company: 'ISRO ISTRAC',
    role: 'Software Engineer Intern',
    period: 'Jan 2025 – Feb 2025',
    description: 'Built a real-time telemetry dashboard using Flask and SQL for launch data, automated binary-to-JSON data ingestion and query filtering, and integrated the ELK stack for centralized logging, reducing latency and improving error analysis speed.'
  },
  {
    company: 'ISRO SDSC',
    role: 'AI and Robotics Intern',
    period: 'Sep 2024 – Oct 2024',
    description: 'Designed and simulated robotic-arm workflows in PyBullet and OpenCV, trained PPO and DQN reinforcement learning agents, and documented architecture while conducting hands-on training for a team of five to optimize assembly precision.'
  }
];

export const education = [
  {
    degree: 'B.Tech, Computer Science & Engineering',
    period: '2022 - 2026',
    institution: 'Bharath Institute of Science and Technology',
    cgpa: '8.81',
    scoreLabel: 'CGPA'
  },
  {
    degree: 'Intermediate (MPC)',
    period: '2020 - 2022',
    institution: "St. Vincent's. Mat. High. Sec. School",
    cgpa: '74.5%',
    scoreLabel: 'Score'
  },
  {
    degree: 'State Board (SSLC)',
    period: '2019 - 2020',
    institution: "St. Vincent's. Mat. High. Sec. School",
    cgpa: '81.6%',
    scoreLabel: 'Score'
  }
];