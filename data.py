# Configuration and Data for Prince Gowon Enenche (G-ONE) Campaign Platform

G_ONE_CANDIDATE = {
    "name": "Prince Gowon Enenche",
    "moniker": "G-ONE (G1)",
    "office": "House of Representatives",
    "constituency": "Ankpa, Omala, and Olamaboro Federal Constituency",
    "state": "Kogi State",
    "party": "SDP",
    "partyFullName": "Social Democratic Party",
    "slogan": "Progress · In God We Trust",
    "subSlogan": "I Reserved For Him My Vote",
    "origin": "Imane, Olamaboro Local Government Area, Kogi State",
    "education": "B.Sc. Political Science, Kogi State University",
    "business": "Chairman & CEO, G1 Group of Companies & G-One Luxury Homes",
    "movementName": "The G-1 Movement",
    "website": "https://g-one-chi.vercel.app",
    "pillars": [
        {
            "title": "Economic Empowerment & Tech Hubs",
            "description": "Micro-grant schemes for SMEs, artisan tools empowerment, and establishing digital innovation bootcamps for youths across Ankpa, Omala, and Olamaboro.",
            "icon": "Cpu",
        },
        {
            "title": "Agrarian Revolution & Rural Roads",
            "description": "Direct investment in connecting farming communities to commercial markets, providing subsidized inputs, and rehabilitating feeder roads to curb post-harvest losses.",
            "icon": "Tractor",
        },
        {
            "title": "Quality Education & Youth Capital",
            "description": "Comprehensive scholarship schemes for tertiary students, renovation of primary and secondary schools, and vocational training centers.",
            "icon": "GraduationCap",
        },
        {
            "title": "Accessible Healthcare & Social Safety Nets",
            "description": "Equipping primary healthcare centers, routine medical outreach programs, and welfare support for elderly, widows, and vulnerable households.",
            "icon": "HeartPulse",
        },
    ],
}

FRAME_CONFIG = {
    "frameSrc": "/static/gone_frame.png",
    "dimensions": {"width": 1024, "height": 1024},
    "cutout": {
        "top": 267,      # 26.07% * 1024
        "left": 521,     # 50.88% * 1024
        "right": 68,     # 6.64% * 1024
        "bottom": 327,   # 31.93% * 1024
        "width": 435,    # 1024 - 521 - 68
        "height": 430,   # 1024 - 267 - 327
        "borderRadius": 28,
    },
}

CONSTITUENCY_LGAS = [
    {
        "name": "Ankpa",
        "constituency": "Ankpa/Omala/Olamaboro",
        "state": "Kogi",
        "count": 0,
        "wards": [
            "Ankpa Township",
            "Ankpa Suburb I",
            "Ankpa Suburb II",
            "Enjema I",
            "Enjema II",
            "Ojoku I",
            "Ojoku II",
            "Ojoku III",
            "Biraidu (Awo)",
            "Biraidu (Okaba)",
            "Biraidu (Inye)",
        ],
    },
    {
        "name": "Omala",
        "constituency": "Ankpa/Omala/Olamaboro",
        "state": "Kogi",
        "count": 0,
        "wards": [
            "Abejukolo I",
            "Abejukolo II",
            "Bagana",
            "Bagaji",
            "Akpacha",
            "Ogodu",
            "Icheke",
            "Oji-Aji",
            "Olla",
            "Ife",
        ],
    },
    {
        "name": "Olamaboro",
        "constituency": "Ankpa/Omala/Olamaboro",
        "state": "Kogi",
        "count": 0,
        "wards": [
            "Imane I",
            "Imane II",
            "Okpo",
            "Ogugu I",
            "Ogugu II",
            "Ogugu III",
            "Adeh",
            "Inele",
            "Ugo",
            "Ochadamu",
        ],
    },
]

CANDIDATE_GALLERY = [
    {
        "src": "/static/gone_hero.jpg",
        "title": "Grassroots Mobilizer",
        "subtitle": "G-ONE 2027 Official Campaign",
        "badge": "Campaign Trail",
    },
    {
        "src": "/static/gone_leader.jpg",
        "title": "The Leader of Our Dream",
        "subtitle": "Official SDP Campaign Flyer · House of Reps",
        "badge": "Official Flyer",
    },
    {
        "src": "/static/gone_thumbs.jpg",
        "title": "The People's Choice",
        "subtitle": "Double Thumbs Up for Progress",
        "badge": "SDP Official",
    },
    {
        "src": "/static/gone_native.jpg",
        "title": "Cultural Heritage & Leadership",
        "subtitle": "Rooted in Imane, Olamaboro",
        "badge": "Community Leader",
    },
    {
        "src": "/static/gone_corporate.jpg",
        "title": "Visionary Business Leader",
        "subtitle": "CEO, G-One Luxury Homes & G1 Group",
        "badge": "Private Sector",
    },
    {
        "src": "/static/gone_standing.jpg",
        "title": "Ready to Serve",
        "subtitle": "House of Representatives 2027",
        "badge": "Legislative Mission",
    },
    {
        "src": "/static/gone_rally.jpg",
        "title": "Massive Constituency Rally",
        "subtitle": "Uniting Ankpa, Omala & Olamaboro for G-ONE",
        "badge": "People's Movement",
    },
]
