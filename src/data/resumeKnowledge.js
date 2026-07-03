const chunks = [
  {
    id: 'contact',
    keywords: ['contact', 'email', 'phone', 'location', 'reach', 'hire', 'available', 'toronto'],
    text: 'Name: Rafik Manla Hassan. Email: rafiksalam81@gmail.com. Phone: 647-920-0209. Location: Toronto, ON. LinkedIn: linkedin.com/in/manlahar. GitHub: github.com/rafiksalam.',
  },
  {
    id: 'summary',
    keywords: ['summary', 'background', 'overview', 'about', 'who', 'experience', 'engineer', 'profile'],
    text: "Rafik is a Software Engineering graduate and Master's candidate in Cybersecurity and Threat Intelligence. He has hands-on experience building and deploying ML pipelines, data preprocessing workflows, and AI-integrated backend systems. Proficient in Python, scikit-learn, and pandas, with a track record of delivering data quality improvements and model-driven solutions in production environments. Comfortable collaborating with cross-functional teams, writing maintainable tested code, and applying emerging AI/ML techniques to real operational problems.",
  },
  {
    id: 'skills-languages',
    keywords: ['language', 'programming', 'code', 'python', 'sql', 'javascript', 'java', 'bash', 'typescript', 'skill', 'know'],
    text: 'Programming Languages: Python, SQL, JavaScript, Java, Bash, TypeScript.',
  },
  {
    id: 'skills-frameworks',
    keywords: ['framework', 'library', 'scikit', 'pandas', 'numpy', 'fastapi', 'spring', 'react', 'node', 'skill', 'use'],
    text: 'Frameworks & Libraries: scikit-learn, pandas, NumPy, FastAPI, Spring Boot, React.js, Node.js.',
  },
  {
    id: 'skills-aiml',
    keywords: ['ai', 'ml', 'machine learning', 'feature engineering', 'preprocessing', 'model', 'anomaly', 'data profiling', 'training', 'validation', 'skill', 'artificial intelligence'],
    text: 'AI/ML Skills: Feature engineering, data preprocessing, model training and validation, anomaly detection, data profiling, demand forecasting, classification models.',
  },
  {
    id: 'skills-cloud',
    keywords: ['cloud', 'aws', 'gcp', 'cloud run', 'docker', 'github actions', 'ci/cd', 'devops', 'pipeline', 'deploy', 'skill'],
    text: 'Cloud & DevOps: AWS, GCP (Cloud Run), Docker, GitHub Actions, CI/CD Pipelines.',
  },
  {
    id: 'skills-databases',
    keywords: ['database', 'sql', 'postgresql', 'mongodb', 'ms sql', 'nosql', 'skill', 'storage'],
    text: 'Databases: PostgreSQL, MongoDB, MS SQL Server.',
  },
  {
    id: 'skills-practices',
    keywords: ['practice', 'agile', 'scrum', 'git', 'testing', 'rest', 'api', 'review', 'methodology'],
    text: 'Practices: Agile/Scrum, version control (Git), code reviews, unit testing, REST API design.',
  },
  {
    id: 'exp-fdm',
    keywords: ['fdm', 'fdm group', 'consultant', 'microservices', 'spring boot', 'java', 'cryptochain', 'jwt', 'gcp', 'cloud run', 'junit', 'mockito', 'tdd', 'solid', 'current', 'now', 'latest', 'job', 'recent'],
    text: 'FDM Group, Toronto ON. Role: Software Engineering Consultant. January 2026 – Present (most recent role). Built and deployed Java / Spring Boot microservices in a cross-functional team (BAs, QA, DevOps, SREs), owning features from design through production deployment with a focus on availability and observability. Engineered REST APIs and service integrations for Cryptochain, a financial services platform, using Spring Data JPA, JWT auth, and PostgreSQL, supporting 100% uptime across sprint releases. Containerized services with Docker and contributed to CI/CD pipelines via GitHub Actions and GCP Cloud Run, cutting deployment time by ~35% and eliminating manual environment inconsistencies. Applied JUnit/Mockito TDD, Java concurrency, and SOLID principles across all services, achieving 85%+ test coverage and reducing production defects between sprint cycles.',
  },
  {
    id: 'exp-tomatoes',
    keywords: ['tomatoes', 'bazar', 'ai engineer', 'operations', 'demand forecasting', 'sku', 'classification', 'inventory', 'current', 'now', 'latest', 'job', 'recent'],
    text: 'Tomatoes Bazar, Milton ON. Role: AI Engineer and Operations Lead. July 2025 – Present. Built an end-to-end demand forecasting pipeline in Python using scikit-learn, covering feature engineering, normalization, and train/test splitting across 200+ SKUs. Automated data quality checks using pandas to profile inventory datasets, detect anomalous stock movements, and flag inconsistencies before they reached reporting layers. Implemented and validated a SKU classification model, iterating on encoding strategies and normalization to improve accuracy across seasonal product categories.',
  },
  {
    id: 'exp-mto',
    keywords: ['mto', 'ministry', 'transportation', 'ontario', 'data', 'ai', 'engineering', 'pyspark', 'pipeline', 'intern', 'throughput', 'dashboard', 'spark', 'government'],
    text: 'Ministry of Transportation of Ontario (MTO), Toronto ON. Role: Data and AI Engineering Intern. May 2023 – September 2024. Integrated Python-based ML models into production reporting pipelines, collaborating with data engineers to align preprocessing outputs with model input requirements across 5+ enterprise teams. Engineered PySpark and pandas data pipelines handling 50+ GB weekly, applying feature engineering, normalization, and validation workflows that improved analytics throughput by 60%. Built data profiling and anomaly detection scripts to identify and remediate inconsistencies in pipeline outputs, directly improving data quality across downstream reporting systems. Automated operational dashboards using pandas and matplotlib, eliminating 3+ hours of daily manual analysis and delivering live reporting to 4 internal teams.',
  },
  {
    id: 'exp-cibc',
    keywords: ['cibc', 'bank', 'banking', 'security', 'information security', 'risk', 'threat', 'nist', 'iso', 'tra', 'assessment', 'clients', 'finance'],
    text: 'CIBC, Toronto ON. Role: Information Security Coordinator. May 2022 – September 2022. Conducted Threat Risk Assessments aligned with NIST and ISO 27001 frameworks, contributing to risk reduction initiatives covering 11M+ clients across 3 business units. Investigated anomalous access patterns and user behavior signals across 11M+ client accounts, identifying 15+ indicators of potential account abuse during TRA engagements.',
  },
  {
    id: 'exp-freelance',
    keywords: ['freelance', 'web', 'solutions', 'client', 'consultant', 'self-employed', 'web developer', 'business'],
    text: "Raf's Web Solutions. Role: Freelance Full-Stack Developer. September 2021 – Present. Delivered 20+ client web applications using React, Next.js, and Tailwind CSS. Built responsive, performance-optimized frontends with REST API integrations for small businesses.",
  },
  {
    id: 'proj-careguard',
    keywords: ['careguard', 'healthcare', 'co-pilot', 'copilot', 'guelph', 'research', 'risk scoring', 'risk-scoring', 'playbook', 'flask', 'llm', 'ransomware', 'phishing', 'medical device', 'graduate', 'pitch', 'clinic'],
    text: 'CareGuard AI (January 2026 – Present, graduate research project at the University of Guelph). Technologies: Python, Flask, LLM, NIST CSF, ISO 27001. Rafik was selected by a professor from the graduate cybersecurity cohort to lead the design, development, and pitch of CareGuard AI, an AI-driven cybersecurity co-pilot for under-resourced healthcare environments. Built a risk-scoring engine producing NIST CSF and ISO 27001 aligned Low/Medium/High ratings across network configuration, backup practices, and user awareness exposure. Developed adaptive incident response playbooks for ransomware, phishing, and medical device compromise, dynamically generated based on organizational risk profile. Prototyped a Flask and LLM-based assistant delivering real-time incident guidance, simulating a SOC co-pilot for non-technical healthcare staff.',
  },
  {
    id: 'proj-soc-lab',
    keywords: ['soc', 'siem', 'splunk', 'sigma', 'mitre', 'att&ck', 'attack', 'triage', 'ioc', 'cve', 'detection', 'incident response', 'globalprotect', 'palo alto', 'picerl', 'analyst', 'alert', 'log'],
    text: 'SOC Detection and Incident Triage Lab (January 2026 – May 2026, completed). Technologies: Splunk, Sigma, MITRE ATT&CK, Python. Built a SIEM-based detection environment using Splunk to analyze system logs and network traffic, triaging security alerts and validating indicators of compromise (IOCs) aligned with SOC analyst workflows. Authored Sigma detection rules mapped to MITRE ATT&CK techniques for CVE-2026-0257 (Palo Alto GlobalProtect authentication bypass), reducing false-positive alert volume and improving detection precision. Developed a structured incident response playbook covering triage steps, severity classification, escalation criteria, and audit-ready documentation aligned with NIST IR and SANS PICERL. Automated log parsing and multi-source IOC correlation using Python scripting to accelerate alert investigation and reduce manual analysis time.',
  },
  {
    id: 'proj-stride',
    keywords: ['stride', 'fitness', 'gym', 'social', 'leaderboard', 'badge', 'socket', 'socket.io', 'realtime', 'real-time', 'check-in', 'checkin', 'express', 'postgresql', 'pub/sub'],
    text: 'Stride, a social fitness platform (April 2026 – Present, active project). Technologies: React, Node.js, Express, PostgreSQL, Socket.io. Built a Node.js / Express backend with REST APIs handling real-time gym check-ins, leaderboard updates, and badge logic across concurrent users. Implemented real-time event-driven communication via Socket.io, applying pub/sub patterns with distributed architectures. Designed a PostgreSQL schema for user activity and leaderboard data, optimized for low-latency reads under concurrent load.',
  },
  {
    id: 'proj-f1',
    keywords: ['f1', 'formula', 'race', 'predictor', 'random forest', 'classifier', 'openf1', 'racing', 'sport', 'prediction', 'formula one'],
    text: 'F1 Race Outcome Predictor (April 2026 – Present, active project). Technologies: Python, scikit-learn, OpenF1 API, React.js. Built an end-to-end ML pipeline that ingests historical race data from the OpenF1 API, applying preprocessing, feature engineering, and normalization to prepare model-ready datasets. Trained and validated a Random Forest classifier to predict race outcomes, iterating on feature selection and hyperparameter tuning. Implemented a data ingestion layer to profile and clean raw API responses, handling missing values and inconsistencies before feeding data into the model pipeline.',
  },
  {
    id: 'proj-drivingman',
    keywords: ['drivingman', 'driving', 'full-stack', 'founder', 'react', 'tailwind', 'web app', 'startup', 'business', 'lessons', 'booking'],
    text: 'DrivingMan.ca (April 2024 – Present, live at drivingman.ca). Role: Founder and Full-Stack Developer. Technologies: React.js, Tailwind CSS, AWS Lambda, Spring Boot. Architected and deployed a mobile-first driving lesson booking platform with reusable component architecture, responsive design, and REST API integration for scheduling, payments, and notifications. Reached 1,000+ users within 2 months of launch.',
  },
  {
    id: 'proj-motive',
    keywords: ['motive', 'event', 'coordination', 'websocket', 'mongodb', 'node', 'express', 'ticket', 'payment', 'rbac', 'realtime'],
    text: 'Motive App (2024, completed). Technologies: React.js, Node.js, Express, MongoDB, WebSocket. Full-stack event coordination platform with real-time WebSocket features, ticket payment processing, admin dashboard with analytics, and role-based access control (RBAC).',
  },
  {
    id: 'proj-fire',
    keywords: ['fire', 'detection', 'iot', 'sensor', 'smart', 'alert', 'capstone', 'next.js', 'notification', 'hardware'],
    text: 'Smart Fire Detection System (2024 Capstone, completed). Technologies: Next.js, React.js, IoT Sensors. IoT-based fire detection system with real-time sensor data visualization and an automated alert system with email and mobile notifications.',
  },
  {
    id: 'proj-network',
    keywords: ['network', 'monitor', 'wireshark', 'packet', 'security', 'anomaly', 'ml', 'detection', 'traffic'],
    text: 'Network Security Monitor (2025, completed). Technologies: Python, Wireshark, ML. Real-time packet capture and analysis tool with ML-based anomaly detection and a web interface for network traffic monitoring. GitHub: github.com/rafiksalam/network-monitor.',
  },
  {
    id: 'proj-security-framework',
    keywords: ['enterprise', 'security', 'framework', 'nist', 'iso', 'tra', 'vendor', 'risk', 'compliance', 'governance', 'policy'],
    text: 'Enterprise Security Risk Assessment Framework (2025, completed). Technologies: NIST CSF, ISO 27001, Python. NIST CSF-aligned risk assessment framework with automated TRA templates, vendor risk assessment workflows, and a compliance dashboard. GitHub: github.com/rafiksalam/enterprise-risk-framework.',
  },
  {
    id: 'education-guelph',
    keywords: ["guelph", "master's", 'masters', 'cybersecurity', 'threat intelligence', 'graduate', 'education', 'degree', 'university', 'school', 'gpa'],
    text: "University of Guelph: Pursuing Master of Cybersecurity and Threat Intelligence. cGPA: 3.7/4.0. Expected Graduation: August 2026. Focus: Threat Hunting & Penetration Testing, Risk Management & Governance, Incident Response & Digital Forensics, AI-Driven Threat Detection.",
  },
  {
    id: 'education-mcmaster',
    keywords: ['mcmaster', 'bachelor', 'software engineering', 'bse', 'undergraduate', 'education', 'degree', 'university', 'school', 'gpa'],
    text: 'McMaster University: Bachelor of Software Engineering. cGPA: 3.3/4.0. September 2020 – April 2025.',
  },
];

export function retrieveContext(question, topK = 5) {
  const q = question.toLowerCase();
  const words = q.split(/\W+/).filter(w => w.length > 2);

  const scored = chunks.map(chunk => {
    let score = 0;
    for (const kw of chunk.keywords) {
      if (q.includes(kw)) score += 3;
    }
    for (const word of words) {
      if (chunk.text.toLowerCase().includes(word)) score += 1;
    }
    return { chunk, score };
  });

  const top = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter(c => c.score > 0);

  // Fall back to full resume if no keyword match (question too abstract)
  const selected = top.length > 0 ? top : scored.slice(0, topK);
  return selected.map(c => c.chunk.text).join('\n\n');
}
