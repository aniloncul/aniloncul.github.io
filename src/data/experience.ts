export interface Experience {
    id: string;
    role: string;
    company: string;
    location: string;
    coordinates: [number, number]; // [Latitude, Longitude]
    period: string;
    summary: string;
    type: "work" | "education";
}

export const experiences: Experience[] = [
    {
        id: "self-employed",
        role: "AI Automation Engineer",
        company: "Self Employed",
        location: "Berlin",
        coordinates: [52.52, 13.405],
        period: "Mar 2025 - Present",
        summary: "Architected Python-driven AI pipelines and geospatial automation tools for efficient content generation and route optimization.",
        type: "work"
    },
    {
        id: "my-group",
        role: "Business Analyst",
        company: "My Group GmbH",
        location: "Berlin (on-site)",
        coordinates: [52.52, 13.405],
        period: "Jun 2025 - Dec 2025",
        summary: "Engineered custom warehouse systems and route optimization engines to drastically reduce operational errors and delivery times.",
        type: "work"
    },
    {
        id: "soulutions",
        role: "Data Analyst & BI Manager",
        company: "Soulutions GmbH",
        location: "Berlin (on-site)",
        coordinates: [52.52, 13.405],
        period: "Nov 2024 - Mar 2025",
        summary: "Built high-performance ETL pipelines and Power BI reporting systems to streamline e-commerce data analytics.",
        type: "work"
    },
    {
        id: "kocsistem",
        role: "Software Engineer (Intern)",
        company: "KoçSistem",
        location: "Ankara (remote)",
        coordinates: [39.93, 32.85],
        period: "Aug 2024 - Oct 2024",
        summary: "Worked with back-end and front-end teams to develop a full-stack application using C# and .NET Core.",
        type: "work"
    },
    {
        id: "edu-ue",
        role: "M.Sc. Software Engineering",
        company: "University of Europe for Applied Sciences",
        location: "Berlin",
        coordinates: [52.52, 13.405],
        period: "Sep 2023 - Aug 2024",
        summary: "Specialized in Generative AI for native mobile language learning applications.",
        type: "education"
    },
    {
        id: "acterys",
        role: "Business Intelligence Consultant",
        company: "Acterys",
        location: "New York City (remote)",
        coordinates: [40.71, -74.00],
        period: "Sep 2022 - Aug 2024",
        summary: "Developed driver-based financial models and advanced BI dashboards to enhance strategic revenue forecasting.",
        type: "work"
    },
    {
        id: "luba",
        role: "Project Manager",
        company: "LUBA INSAAT",
        location: "Bursa (on-site)",
        coordinates: [40.18, 29.06],
        period: "Nov 2020 - Dec 2021",
        summary: "Managed complex construction projects through precise budgeting, procurement, and financial performance tracking.",
        type: "work"
    },
    {
        id: "cengiz-kolin",
        role: "TBM Engineer",
        company: "CENGIZ-KOLIN-KALYON JV",
        location: "Istanbul (on-site)",
        coordinates: [41.00, 28.97],
        period: "Sep 2019 - Feb 2020",
        summary: "Analyzed TBM sensor data to optimize excavation strategies and visualize key performance indicators.",
        type: "work"
    },

    {
        id: "edu-ogu",
        role: "B.Sc. Civil Engineering",
        company: "Eskisehir Osmangazi University",
        location: "Turkey",
        coordinates: [39.76, 30.52],
        period: "Graduated",
        summary: "Foundation in engineering principles and complex project management.",
        type: "education"
    }
];
