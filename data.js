// =====================================================================
//  All site content for Experience, Projects and the Featured section.
//  Edit this file to add / change entries — no HTML changes needed.
//
//  Fields (all optional except id + title):
//    id          unique string, used by `featured` below
//    title       card + popup heading
//    org         company / lab / course
//    period      e.g. "May 2025 – Aug 2025"
//    location    e.g. "Montreal, QC"
//    kicker      small uppercase label above the title
//    summary     1–2 lines shown on the card
//    description array of paragraphs shown in the popup
//    highlights  array of bullet points shown in the popup
//    tags        array of short labels
//    links       { github, live, paper }  — omit any that don't exist
// =====================================================================

window.PORTFOLIO = {
  // Ids shown on the home page, in this order.
  featured: ["exp-gradiant", "proj-ipl", "exp-cscan"],

  experience: [
    {
      id: "exp-gradiant",
      title: "Data Science Intern (Mitacs)",
      org: "Gradiant AI",
      period: "May 2026 – Sept. 2026",
      location: "Montreal, QC",
      kicker: "Internship · Data Science",
      summary: "Built an LLM-powered recommender system for Praxis, backed by an ETL, embedding and knowledge-graph pipeline over 28K+ bilingual records.",
      description: [
        "Built a recommender system for Praxis, a bilingual knowledge-sharing platform, that suggests the notes, people and communities most relevant to a user's question.",
        "I built its data foundation: ingesting and validating multi-source data, embedding bilingual text for vector search, and modelling the integrated data as a knowledge graph that powers GraphRAG retrieval."
      ],
      highlights: [
        "Developed a Python ETL pipeline (pandas) that ingests, cleans, joins and validates 28K+ records from eight CSV sources into curated Parquet datasets.",
        "Processed bilingual (FR/EN) text into 38K chunks and generated 1024-dimensional BGE-M3 embeddings for a FAISS vector index.",
        "Tuned search performance with a FAISS IVF index (nlist=100, nprobe=10) for fast similarity lookups over the full collection.",
        "Built a Neo4j knowledge graph (22K nodes, 88K edges) from the integrated data, and added caching so repeated expensive LLM calls were not recomputed.",
        "Measured latency and cost against three baselines, traced the main bottleneck to one component, and fixed it.",
        "Removed personal information before processing and documented data structures, transformations and data-quality issues."
      ],
      tags: ["Python", "pandas", "Parquet", "FAISS", "BGE-M3", "Neo4j"],
      video: {
        src: "media/gradiant-demo.mp4?v=3",
        poster: "media/gradiant-demo-poster.jpg?v=3",
        caption: "Captioned walkthrough: what Praxis is, the En commun Discovery interface, its three search modes (Guided, Connected GraphRAG, Quick vector) and live Neo4j neighbourhood graphs."
      },
      links: {}
    },
    {
      id: "exp-cscan",
      title: "Junior Researcher / Analyst",
      org: "CS-CAN | INFO-CAN",
      period: "Sept. 2026 – Present",
      location: "Montreal, QC",
      kicker: "Research · Part-time",
      summary: "Automating data collection from NSERC and Statistics Canada into consistent yearly series.",
      description: [
        "Part-time research and analysis role at CS-CAN | INFO-CAN, building the data collection and processing scripts behind the organization's charts and summaries."
      ],
      highlights: [
        "Write Python scripts (requests, pandas) that automate data collection from the NSERC dashboard and combine it with Statistics Canada tables.",
        "Filter and reshape the data in pandas by field of study, level and enrolment status, producing consistent yearly series for charts and summaries."
      ],
      tags: ["Python", "requests", "pandas", "Data Analysis"],
      links: {}
    },
    {
      id: "exp-ta",
      title: "Graduate Teaching Assistant",
      org: "McGill University",
      period: "Aug. 2025 – Present",
      location: "Montreal, QC",
      kicker: "Teaching",
      summary: "Leading Python tutorials and reviewing student code.",
      highlights: [
        "Lead Python programming tutorials, help students debug their code and write practice problems on data structures.",
        "Review and grade student code for correctness and clarity, and give structured written feedback."
      ],
      tags: ["Python", "Teaching", "Data Structures"],
      links: {}
    },
    {
      id: "exp-find-device",
      title: "Mobile Application Development Intern",
      org: "Tamopahaa Technologies",
      period: "Sept. 2023 – Oct. 2023",
      location: "Bangalore, India · Remote",
      kicker: "Internship · Mobile",
      summary: "Built “Find My Device”, an Android app that pairs phones with Bluetooth Find-Me Tags to locate belongings.",
      description: [
        "Built “Find My Device”, an Android application that connects users’ phones to Bluetooth-enabled Find-Me Tags for locating and securing personal belongings."
      ],
      highlights: [
        "Designed and developed the Bluetooth architecture for the app, enabling seamless connectivity between mobile devices and Bluetooth-enabled hardware.",
        "Built and tested application features using Java, Android SDK, Android Studio, UI components (ImageView, Layouts) and Java utilities (Timer & TimerTask).",
        "Implemented activity navigation with Intents and lifecycle management to ensure smooth user interaction."
      ],
      tags: ["Java", "Android SDK", "Android Studio", "Bluetooth"],
      links: { github: "https://github.com/balaji025/Find-My-Device-Internship-project" }
    }
  ],

  projects: [
    {
      id: "proj-ipl",
      title: "IPL Analytics",
      org: "Python Data Processing Pipeline",
      period: "Oct. 2026",
      kicker: "Data Engineering · Full-stack",
      summary: "Batch ETL over 19 IPL seasons (1,243 matches) served through 14 fast Flask API endpoints.",
      description: [
        "An end-to-end analytics platform for the Indian Premier League: a batch pipeline turns raw ball-by-ball data into precomputed statistics, and a Flask API and web frontend serve team-wise and player-wise insights."
      ],
      highlights: [
        "Built a batch ETL pipeline in pandas and DuckDB that normalizes nested ball-by-ball JSON for 1,243 matches and 809 players across 19 seasons.",
        "Wrote SQL transformations (joins, CTEs, window functions) to compute batting, bowling and season aggregates.",
        "Moved heavy computation offline and loaded results into indexed SQLite tables, so 14 Flask API endpoints return results quickly.",
        "Added 11 automated tests that check outputs against known records, and documented the pipeline, setup and API."
      ],
      tags: ["Python", "pandas", "DuckDB", "SQL", "SQLite", "Flask"],
      links: {
        github: "https://github.com/balaji025/IPL_ANALYTICS",
        live: "https://balajiramesh03.pythonanywhere.com/"
      }
    },
    {
      id: "proj-figurative",
      title: "Figurative Reasoning: LLM Benchmark",
      org: "COMP 545 · McGill University",
      period: "Aug. 2025 – Dec. 2025",
      kicker: "NLP · Evaluation",
      summary: "Stress-testing four LLM families on idioms under minimal context; best model hit 0.78 vs. ~0.75 human.",
      description: [
        "A curated benchmark that stress-tests how large language models interpret figurative language under minimal context. High-ambiguity idioms were extracted from MAGPIE and evaluated with both probabilistic and free-generation methods."
      ],
      highlights: [
        "Built a Python evaluation workflow running four LLM families on a 50-idiom benchmark under three prompting strategies across 20 settings.",
        "Analyzed accuracy, variance and errors; the best model reached 0.78 against a human baseline of about 0.75."
      ],
      tags: ["Python", "LLMs", "Prompting", "Evaluation"],
      links: { github: "https://github.com/balaji025/COMP545_Project_Code" }
    },
    {
      id: "proj-lrcn",
      title: "Cricket Shot Classification with a Modified LRCN",
      org: "IEEE SILCON 2024",
      period: "Feb. 2024 – May 2024",
      kicker: "Deep Learning · Computer Vision",
      summary: "CNN–LSTM model classifying cricket shots from video with up to 95% accuracy.",
      description: [
        "A deep learning model for cricket shot classification from video, using a modified LRCN architecture that combines CNN and LSTM layers to capture spatial and temporal features. Published and presented at IEEE SILCON 2024, NIT Agartala."
      ],
      highlights: [
        "Processed labelled video into frame sequences for model training and evaluation in Python.",
        "Trained a modified CNN–LSTM (LRCN) model, reaching up to 95% accuracy."
      ],
      tags: ["PyTorch", "CNN", "LSTM", "Computer Vision"],
      links: {
        github: "https://github.com/balaji025/Video-based-cricket-shot-classification-using-modified-LRCN-approach",
        paper: "https://ieeexplore.ieee.org/abstract/document/10910682"
      }
    },
    {
      id: "proj-crypto",
      title: "Hybrid Lightweight Cryptography for Data Security",
      org: "C2I6-2024 · IEEE Xplore",
      kicker: "Cryptography · Security",
      summary: "Dynamic RSA combined with ASCON lightweight cryptography for secure, efficient encryption.",
      description: [
        "Designed and implemented an improved hybrid cryptographic scheme by integrating dynamic RSA with ASCON lightweight cryptography to enhance security and efficiency.",
        "Built the full algorithmic pipeline in Python and validated its performance through experimental evaluation. Peer-reviewed, presented at the 5th International Conference on Communication, Computing & Industry 6.0 (C2I6-2024), and published in IEEE Xplore."
      ],
      tags: ["Python", "Cryptography", "RSA", "ASCON"],
      links: {
        github: "https://github.com/balaji025/Hybrid-Lightweight-Cryptography-for-Data-Security",
        paper: "https://ieeexplore.ieee.org/document/10895892"
      }
    },
    {
      id: "proj-game",
      title: "Someone's Adventure",
      kicker: "Game · Python",
      summary: "A five-level pygame platformer with traps, teleports and a player database.",
      description: [
        "A platformer game built with Python and pygame, with five levels of increasing difficulty and special features like trap doors and teleports.",
        "Different soundtracks play in-game and in menus, and a user database stores each player's login, progress and scores."
      ],
      tags: ["Python", "pygame", "SQL"],
      links: { github: "https://github.com/balaji025/Someones-adventure" }
    }
  ]
};
