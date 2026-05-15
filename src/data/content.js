import { Clock, FileText, TrendingUp, Users } from "lucide-react";
export const reportDetailsMap = {
  1: {
    radarData: [
      { subject: "Realistic", A: 110, fullMark: 150 },
      { subject: "Investigative", A: 130, fullMark: 150 },
      { subject: "Artistic", A: 80, fullMark: 150 },
      { subject: "Social", A: 100, fullMark: 150 },
      { subject: "Enterprising", A: 105, fullMark: 150 },
      { subject: "Conventional", A: 120, fullMark: 150 },
    ],
    pieData: [
      { name: "Numerical Ability", value: 65, color: "#3B82F6" },
      { name: "Verbal Ability", value: 75, color: "#14B8A6" },
      { name: "Logical Reasoning", value: 25, color: "#0C7E7F" },
      { name: "General Aptitude", value: 40, color: "#0C7E7F" },
    ],
  },
  2: {
    radarData: [
      { subject: "Realistic", A: 100, fullMark: 150 },
      { subject: "Investigative", A: 120, fullMark: 150 },
      { subject: "Artistic", A: 105, fullMark: 150 },
      { subject: "Social", A: 95, fullMark: 150 },
      { subject: "Enterprising", A: 85, fullMark: 150 },
      { subject: "Conventional", A: 90, fullMark: 150 },
    ],
    pieData: [
      { name: "Verbal Ability", value: 45, color: "#14B8A6" },
      { name: "Logical Reasoning", value: 30, color: "#0C7E7F" },
      { name: "Numerical Ability", value: 25, color: "#3B82F6" },
      { name: "General Aptitude", value: 25, color: "#0C7E7F" },
    ],
  },
  3: {
    radarData: [
      { subject: "Realistic", A: 90, fullMark: 150 },
      { subject: "Investigative", A: 110, fullMark: 150 },
      { subject: "Artistic", A: 100, fullMark: 150 },
      { subject: "Social", A: 85, fullMark: 150 },
      { subject: "Enterprising", A: 95, fullMark: 150 },
      { subject: "Conventional", A: 80, fullMark: 150 },
    ],
    pieData: [
      { name: "Logical Reasoning", value: 40, color: "#0C7E7F" },
      { name: "Numerical Ability", value: 35, color: "#3B82F6" },
      { name: "Verbal Ability", value: 25, color: "#14B8A6" },
      { name: "General Aptitude", value: 25, color: "#0C7E7F" },
    ],
  },
};

export const reportHistory = [
  {
    id: 1,
    date: "2024-01-15",
    type: "Report 1",
    status: "completed",
    summary:
      "Comprehensive psychometric evaluation with career recommendations",
  },
  {
    id: 2,
    date: "2024-01-10",
    type: "Report 2",
    status: "completed",
    summary: "Personality type assessment and behavioral analysis",
  },
  {
    id: 3,
    date: "2024-01-05",
    type: "Report 3",
    status: "pending",
    summary: "Cognitive abilities and skill assessment",
  },
];
export const careerRecommendations = [
  {
    id: 1,
    title: "Software Engineer",
    match: 92,
    description:
      "Ideal for analytical and problem-solving minds. Design and build software while thriving in both solo and team-based environments.",
    colleges: ["MIT", "Stanford", "Carnegie Mellon"],
    strengths: ["Logical reasoning", "Technical aptitude", "Problem solving"],
    weaknesses: ["Team collaboration", "Communication skills"],
    improvements: ["Develop soft skills", "Practice public speaking"],
  },
  {
    id: 2,
    title: "Data Scientist",
    match: 88,
    description:
      "Great for data-driven thinkers. Analyze and interpret complex data to uncover insights using programming, statistics, and storytelling.",
    colleges: ["UC Berkeley", "Harvard", "University of Washington"],
    strengths: [
      "Statistical analysis",
      "Pattern recognition",
      "Research skills",
    ],
    weaknesses: ["Business acumen", "Presentation skills"],
    improvements: ["Learn business fundamentals", "Improve data storytelling"],
  },
  {
    id: 3,
    title: "UX Designer",
    match: 78,
    description:
      "Blends creativity with problem-solving. Craft user-friendly and visually appealing interfaces that focus on real user needs.",
    colleges: ["RISD", "Parsons", "ArtCenter"],
    strengths: ["Creative thinking", "User empathy", "Visual design"],
    weaknesses: ["Technical implementation", "User research"],
    improvements: ["Learn prototyping tools", "Conduct user interviews"],
  },
  {
    id: 4,
    title: "Product Manager",
    match: 75,
    description:
      "Best for leaders with strategic thinking. Manage product vision and collaborate across teams to align business and tech goals.",
    colleges: ["Wharton", "Kellogg", "Stanford GSB"],
    strengths: ["Strategic thinking", "Leadership", "Decision making"],
    weaknesses: ["Market analysis", "Stakeholder management"],
    improvements: ["Develop business strategy skills", "Practice negotiation"],
  },
  {
    id: 5,
    title: "Research Scientist",
    match: 72,
    description:
      "Perfect for curious, analytical minds. Conduct investigations to advance knowledge with persistence, precision, and critical thinking.",
    colleges: ["Caltech", "Princeton", "University of Chicago"],
    strengths: ["Research methodology", "Critical thinking", "Data analysis"],
    weaknesses: ["Grant writing", "Collaborative research"],
    improvements: ["Improve scientific writing", "Network with researchers"],
  },
];

export const tests = [
  {
    id: 1,
    title: "General Aptitude Assessment",
    category: "normal",
    testCode: "general-aptitude",
    questions: 25,
    timeLimit: 60,
    status: "active",
    created: "2024-01-15",
    responses: 234,
  },
  {
    id: 2,
    title: "Creative Thinking Assessment",
    category: "personality-test",
    testCode: "creative-thinking",
    questions: 15,
    timeLimit: 90,
    status: "active",
    created: "2024-01-10",
    responses: 189,
  },
  {
    id: 3,
    title: "Interest Inventory Assessment",
    category: "interest-test",
    testCode: "interest-inventory",
    questions: 30,
    timeLimit: 45,
    status: "active",
    created: "2024-01-08",
    responses: 312,
  },
  {
    id: 4,
    title: "Aptitude Assessment",
    category: "aptitude-test",
    testCode: "aptitude-assessment",
    questions: 20,
    timeLimit: 120,
    status: "draft",
    created: "2024-01-05",
    responses: 0,
  },
];

export const categories = [
  { value: "all", label: "All Categories" },
  { value: "normal", label: "Normal Test" },
  { value: "personality-test", label: "Personality Test" },
  { value: "interest-test", label: "Interest-Test (Interest)" },
  { value: "aptitude-test", label: "Aptitude-Test (Aptitude)" },
];
export const getCategoryColor = (category) => {
  switch (category) {
    case "normal":
      return "bg-blue-100 text-teal-800";
    case "personality-test":
      return "bg-purple-100 text-purple-800";
    case "interest-test":
      return "bg-green-100 text-green-800";
    case "aptitude-test":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const availableAssessments = [
  {
    id: "personality-test",
    name: "Personality Test",
    // description: "Assesses innovation and idea generation.",
  },
  {
    id: "interest-test",
    name: "Interest Inventory",
    // description: "Identifies your hobbies and preferences.",
  },
  {
    id: "aptitude-test",
    name: "Aptitude Assessment",
    // description: "Checks natural strengths and abilities.",
  },
];
export const counselors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Career Guidance & Development",
    rating: 4.9,
    sessions: 150,
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    availability: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
    price: 75,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Educational Psychology",
    rating: 4.8,
    sessions: 200,
    image:
      "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    availability: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"],
    price: 80,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "Personality Assessment",
    rating: 4.7,
    sessions: 120,
    image:
      "https://images.pexels.com/photos/7389421/pexels-photo-7389421.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    availability: ["9:30 AM", "12:00 PM", "2:30 PM", "4:30 PM"],
    price: 70,
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialization: "Academic Counseling",
    rating: 4.6,
    sessions: 180,
    image:
      "https://images.pexels.com/photos/6749818/pexels-photo-6749818.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    availability: ["8:00 AM", "11:30 AM", "1:30 PM", "3:30 PM"],
    price: 65,
  },
];
export const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
];
export const progressSteps = [
  { name: "Profile Test", completed: false },
  { name: "Personality Test", completed: false },
  { name: "Interest Test", completed: false },
  { name: "Aptitude Test", completed: false },
];
export const getBadgeColor = (type) => {
  switch (type) {
    case "aptitude-test":
      return "bg-orange-100 text-orange-800";
    case "personality-test":
      return "bg-purple-100 text-purple-800";
    case "interest-test":
      return "bg-green-100 text-green-800";
    case "normal":
      return "bg-blue-100 text-teal-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
export const getDimensionsForType = (type) => {
  switch (type) {
    case "aptitude-test":
      return ["Abstract", "Verbal", "Numerical"];
    case "interest-test":
      return ["R", "I", "A", "S", "E", "C"];
    case "personality-test":
      return ["EI", "SN", "TF", "JP"];
    default:
      return [];
  }
};
export const kpiData = [
  {
    label: "Total Assessments",
    value: "1,247",
    change: "+12%",
    icon: FileText,
    color: "primary-color",
    bgColor: "bg-blue-100",
  },
  {
    label: "Reports Generated",
    value: "892",
    change: "+8%",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    label: "Pending Approval",
    value: "23",
    change: "-5%",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    label: "Active Students",
    value: "456",
    change: "+15%",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

export const chartData = [
  { month: "Jan", assessments: 65, reports: 58 },
  { month: "Feb", assessments: 78, reports: 72 },
  { month: "Mar", assessments: 90, reports: 85 },
  { month: "Apr", assessments: 85, reports: 80 },
  { month: "May", assessments: 105, reports: 95 },
  { month: "Jun", assessments: 120, reports: 110 },
];

export const recentActivity = [
  {
    user: "Sarah Johnson",
    action: "Completed Assessment",
    time: "2 minutes ago",
    status: "completed",
  },
  {
    user: "Mike Chen",
    action: "Report Reviewed",
    time: "15 minutes ago",
    status: "reviewed",
  },
  {
    user: "Emily Davis",
    action: "Started Assessment",
    time: "1 hour ago",
    status: "in-progress",
  },
  {
    user: "James Wilson",
    action: "Report Approved",
    time: "2 hours ago",
    status: "approved",
  },
  {
    user: "Anna Brown",
    action: "Scheduled Counselling",
    time: "3 hours ago",
    status: "scheduled",
  },
];

export const pendingReports = [
  {
    id: "RPT-001",
    student: "Alex Thompson",
    type: "Full Assessment",
    submitted: "2 hours ago",
    priority: "high",
  },
  {
    id: "RPT-002",
    student: "Maria Garcia",
    type: "Career Guidance",
    submitted: "4 hours ago",
    priority: "medium",
  },
  {
    id: "RPT-003",
    student: "David Kim",
    type: "Aptitude Test",
    submitted: "1 day ago",
    priority: "low",
  },
  {
    id: "RPT-004",
    student: "Lisa Wang",
    type: "Interest Inventory",
    submitted: "1 day ago",
    priority: "medium",
  },
];

export const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "reviewed":
      return "bg-teal-100 text-teal-800";
    case "in-progress":
      return "bg-yellow-100 text-yellow-800";
    case "approved":
      return "bg-green-100 text-green-800";
    case "scheduled":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getPriorityColor1 = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const statusOptions = [
  { value: "all", label: "All Reports" },
  { value: "pending", label: "Pending Approval" },
  { value: "approved", label: "Approved" },
  { value: "revision-requested", label: "Revision Requested" },
];
export const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusColoradmin = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "approved":
      return "bg-green-100 text-green-800";
    case "revision-requested":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const traitInfoMap = {
  strengths: {
    title: "Strengths",
    description: "These are areas where the student excels.",
    items: [
      {
        name: "Investigative",
        description:
          "Curious, analytical, and enjoys exploring complex ideas and solving problems.",
      },
      {
        name: "Artistic",
        description:
          "Creative, expressive, and skilled in visualizing and producing original work.",
      },
    ],
  },
  areasToImprove: {
    title: "Areas to Improve",
    description: "These are areas where the student can develop further.",
    items: [
      {
        name: "Conventional",
        description:
          "Needs to build better organization, accuracy, and routine-following skills.",
      },
      {
        name: "Social",
        description:
          "Can improve interpersonal communication and teamwork abilities.",
      },
    ],
  },
  dominantTraits: {
    title: "Dominant Traits",
    description: "Key personality characteristics observed.",
    items: [
      {
        name: "Numerical Ability",
        description:
          "Excels at working with numbers, solving math problems, and quantitative reasoning.",
      },
      {
        name: "Verbal Ability",
        description:
          "Strong in language comprehension, expression, and verbal communication.",
      },
    ],
  },
  developmentAreas: {
    title: "Development Areas",
    description: "Traits that can be worked on for personality growth.",
    items: [
      {
        name: "Logical Reasoning",
        description:
          "Can enhance critical thinking and structured problem-solving abilities.",
      },
      {
        name: "Verbal Ability",
        description:
          "Should focus on expressing ideas more clearly and expanding vocabulary.",
      },
    ],
  },
};

export const strengthsdata = [
  {
    id: 1,
    strength: "Logical Thinking",
    description: "Able to analyze situations and make rational decisions.",
  },
  {
    id: 2,
    strength: "Verbal Communication",
    description: "Effectively expresses thoughts through speech and writing.",
  },
  {
    id: 3,
    strength: "Numerical Ability",
    description: "Comfortable working with numbers and quantitative data.",
  },
  {
    id: 4,
    strength: "Spatial Reasoning",
    description:
      "Understands and remembers the spatial relationships among objects.",
  },
  // {
  //   id: 5,
  //   strength: "Abstract Thinking",
  //   description: "Thinks conceptually and understands complex ideas.",
  // },
  // {
  //   id: 6,
  //   strength: "Memory Retention",
  //   description: "Remembers and recalls information effectively.",
  // },
  // {
  //   id: 7,
  //   strength: "Problem Solving",
  //   description: "Identifies issues and finds logical solutions quickly.",
  // },
  // {
  //   id: 8,
  //   strength: "Analytical Thinking",
  //   description: "Breaks complex issues into simpler parts to solve them.",
  // },
  // {
  //   id: 9,
  //   strength: "Practical Application",
  //   description: "Applies learned knowledge effectively in real-world tasks.",
  // },
  // {
  //   id: 10,
  //   strength: "Observation Skills",
  //   description: "Notices details and changes in surroundings.",
  // },
  // {
  //   id: 11,
  //   strength: "Innovative Thinking",
  //   description: "Thinks outside the box to create new solutions.",
  // },
];

export const reports = [
  {
    id: 1,
    reportId: "RPT-001", // for display
    studentName: "Alex Thompson",
    email: "alex.thompson@email.com",
    testType: "Full Assessment",
    status: "pending",
    submittedDate: "2024-01-20",
    score: 95,
    timeTaken: "01:15:30",
    assignedTo: null,
    priority: "high",
  },
  {
    id: 2,
    reportId: "RPT-002",
    studentName: "Maria Garcia",
    email: "maria.garcia@email.com",
    testType: "Career Guidance",
    status: "in-review",
    submittedDate: "2024-01-19",
    score: 84,
    timeTaken: "00:40:20",
    assignedTo: "Dr. Sarah Johnson",
    priority: "medium",
  },
  {
    id: 3,
    reportId: "RPT-003",
    studentName: "David Kim",
    email: "david.kim@email.com",
    testType: "Aptitude Test",
    status: "completed",
    submittedDate: "2024-01-18",
    score: 75,
    timeTaken: "00:30:20",
    assignedTo: "Dr. Michael Chen",
    priority: "low",
  },
  {
    id: 4,
    reportId: "RPT-004",
    studentName: "Lisa Wang",
    email: "lisa.wang@email.com",
    testType: "Interest Inventory",
    status: "approved",
    submittedDate: "2024-01-17",
    score: 64,
    timeTaken: "00:50:20",
    assignedTo: "Dr. Emily Rodriguez",
    priority: "medium",
  },
  {
    id: 5,
    reportId: "RPT-005",
    studentName: "James Wilson",
    email: "james.wilson@email.com",
    testType: "Full Assessment",
    status: "pending",
    submittedDate: "2024-01-16",
    score: 55,
    timeTaken: "00:55:20",
    assignedTo: null,
    priority: "high",
  },
];

// export const psychologists = [
//   {
//     id: 1,
//     name: "Dr. Sarah Johnson",
//     specialization: "Career Guidance",
//     workload: 5,
//   },
//   {
//     id: 2,
//     name: "Dr. Michael Chen",
//     specialization: "Educational Psychology",
//     workload: 3,
//   },
//   {
//     id: 3,
//     name: "Dr. Emily Rodriguez",
//     specialization: "Personality Assessment",
//     workload: 7,
//   },
//   {
//     id: 4,
//     name: "Dr. James Wilson",
//     specialization: "Academic Counseling",
//     workload: 2,
//   },
// ];

export const entityCodes = ["MCA 101", "MCA 102", "BCA 201", "BTECH 301"];

export const timeOptions = [30, 45, 60, 90];

export const timePerQuestionByType = {
  "personality-test": "60 seconds",
  "interest-test": "45 seconds",
  "aptitude-test": "90 seconds",
  normal: "30 seconds",
};

export const questions = [
  {
    id: "q1",
    type: "a-test",
    text: "Identify the next pattern in the sequence.",
    images: [],
    options: ["▲", "■", "●", "◆"],
    correctOption: 1,
    dimension: "Abstract",
  },
  {
    id: "q2",
    type: "a-test",
    text: "Choose the synonym of 'Abundant'.",
    images: [],
    options: ["Rare", "Plentiful", "Few", "Scarce"],
    correctOption: 1,
    dimension: "Verbal",
  },
  {
    id: "q3",
    type: "a-test",
    text: "What is 15% of 200?",
    images: [],
    options: ["30", "25", "20", "35"],
    correctOption: 0,
    dimension: "Numerical",
  },
  {
    id: "q4",
    type: "i-test",
    text: "Which activity do you enjoy most?",
    images: [],
    options: [
      "Building things",
      "Helping people",
      "Creating art",
      "Analyzing data",
    ],
    correctOption: null,
    dimension: "R",
  },
  {
    id: "q5",
    type: "i-test",
    text: "Which setting appeals to you?",
    images: [],
    options: ["Laboratory", "Stage", "Office", "Workshop"],
    correctOption: null,
    dimension: "I",
  },
  {
    id: "q6",
    type: "i-test",
    text: "You prefer tasks that involve:",
    images: [],
    options: ["Organization", "Creativity", "Sales", "Support"],
    correctOption: null,
    dimension: "A",
  },
  {
    id: "q7",
    type: "c-test",
    text: "You recharge by:",
    images: [],
    options: ["Being alone", "Being with people"],
    correctOption: null,
    dimension: "EI",
  },
  {
    id: "q8",
    type: "c-test",
    text: "You focus more on:",
    images: [],
    options: ["Facts", "Ideas"],
    correctOption: null,
    dimension: "SN",
  },
  {
    id: "q9",
    type: "c-test",
    text: "When making decisions, you rely on:",
    images: [],
    options: ["Logic", "Feelings"],
    correctOption: null,
    dimension: "TF",
  },
];

export const typeLabels = {
  "personality-test": "Personality-Test (Creativity)",
  "interest-test": "Interest-Test (Interest)",
  "aptitude-test": "Aptitude-Test (Aptitude)",
  normal: "Profile Questions",
};

export const profileQuestions = {
  student: [
    {
      text: "How has your academic performance been this year?",
      type: "profile",
      options: ["Very Good", "Good", "Average", "Bad"],
      expanded: true,
    },
    {
      text: "Top 3 Subjects You Like (Choose any 3)",
      type: "profile",
      options: [
        "Physics",
        "Chemistry",
        "Math",
        "Biology",
        "Computer Science",
        "Economics",
        "Business Studies",
        "Book Keeping and Accountancy",
        "Commerce",
        "Art & Craft",
        "Psychology",
        "Sociology",
        "Political Science",
        "Home Science",
        "Media Studies",
        "Fashion Studies",
        "Music & Dance",
        "Health and Physical Education",
        "Other: ________",
      ],
      expanded: true,
      maxSelect: 3,
    },
    {
      text: "Top 2 Subjects You Dislike (Choose any 2)",
      type: "profile",
      options: [
        "Physics",
        "Chemistry",
        "Math",
        "Biology",
        "Computer Science",
        "Economics",
        "Business Studies",
        "Book Keeping and Accountancy",
        "Commerce",
        "Art & Craft",
        "Psychology",
        "Sociology",
        "Political Science",
        "Home Science",
        "Media Studies",
        "Fashion Studies",
        "Music & Dance",
        "Health and Physical Education",
        "Other: ________",
      ],
      expanded: true,
      maxSelect: 2,
    },
    {
      text: "What Are Your Top 3 Skills? (Choose any 3)",
      type: "profile",
      options: [
        "Playing with Numbers & logic",
        "Drawing / designing",
        "Talking to people",
        "Fixing / building things",
        "Writing / storytelling",
        "Science experiments",
        "Leading groups",
        "Helping others",
        "Computers / tech",
        "Sports / physical work",
      ],
      expanded: true,
      maxSelect: 3,
    },
    {
      text: "What Are Your Preferred Career Preferences? (Choose any 3)",
      type: "profile",
      options: [
        "Engineering",
        "Medical",
        "Arts",
        "Commerce",
        "Law",
        "Defence",
        "Government Services",
        "Information Technology",
        "Design",
        "Media & Communication",
        "Entrepreneurship",
        "Education",
        "Science & Research",
        "Social Services",
        "Hospitality",
        "Sports",
        "Other: ________",
      ],
      expanded: true,
      maxSelect: 3,
    },
    {
      text: "What type of career do you want? ",
      type: "profile",
      options: [
        "Safe/stable jobs (like Government, Teacher, Doctor, etc)",
        "High-growth jobs (like IT, Business, Finance, etc)",
        "Creative jobs (like Design, Fine Art, Films, etc)",
        "Hands-on jobs (like Mechanic, Farming, Construction, etc)",
        "Other: ________",
      ],
      expanded: true,
    },
  ],
  parent: [
    {
      text: "What Subjects Does Your Child Enjoy the Most? (Choose any 3)",
      type: "profile",
      options: [
        "Physics",
        "Chemistry",
        "Math",
        "Biology",
        "Computer Science",
        "Economics",
        "Business Studies",
        "Book Keeping and Accountancy",
        "Commerce",
        "Art & Craft",
        "Psychology",
        "Sociology",
        "Political Science",
        "Home Science",
        "Media Studies",
        "Fashion Studies",
        "Music & Dance",
        "Health and Physical Education",
        "Other: ________",
      ],
      expanded: true,
      maxSelect: 3,
    },
    {
      text: "Subjects Your Child Does Not Like (Choose any 2)",
      type: "profile",
      options: [
        "Physics",
        "Chemistry",
        "Math",
        "Biology",
        "Computer Science",
        "Economics",
        "Business Studies",
        "Book Keeping and Accountancy",
        "Commerce",
        "Art & Craft",
        "Psychology",
        "Sociology",
        "Political Science",
        "Home Science",
        "Media Studies",
        "Fashion Studies",
        "Music & Dance",
        "Health and Physical Education",
        "Other: ________",
      ],
      expanded: true,
      maxSelect: 2,
    },
    {
      text: "Top 3 Skills Your Child Excels In (Choose any 3)",
      type: "profile",
      options: [
        "Playing with Numbers & logic",
        "Drawing / designing",
        "Talking to people",
        "Fixing / building things",
        "Writing / storytelling",
        "Science experiments",
        "Leading groups",
        "Helping others",
        "Computers / tech",
        "Sports / physical work",
      ],
      expanded: true,
      maxSelect: 3,
    },
    {
      text: "Best Careers for Your Child (Choose any 3)",
      type: "profile",
      options: [
        "Engineering",
        "Medical",
        "Arts",
        "Commerce",
        "Law",
        "Defence",
        "Government Services",
        "Information Technology",
        "Design",
        "Media & Communication",
        "Entrepreneurship",
        "Education",
        "Science & Research",
        "Social Services",
        "Hospitality",
        "Sports",
        "Other: ________",
      ],
      expanded: true,
      maxSelect: 3,
    },
    {
      text: "Careers Your Child Should Not Pursue (Choose any 2)",
      type: "profile",
      options: [
        "Engineering",
        "Medical",
        "Arts",
        "Commerce",
        "Law",
        "Defence",
        "Government Services",
        "Information Technology",
        "Design",
        "Media & Communication",
        "Entrepreneurship",
        "Education",
        "Science & Research",
        "Social Services",
        "Hospitality",
        "Sports",
        "Other: ________",
      ],
      expanded: true,
      maxSelect: 2,
    },
    {
      text: "What type of jobs suit your child’s nature?",
      type: "profile",
      options: [
        "Safe/stable jobs (like Government, Teacher, Doctor, etc)",
        "High-growth jobs (like IT, Business, Finance, etc)",
        "Creative jobs (like Design, Fine Art, Films, etc)",
        "Hands-on jobs (like Mechanic, Farming, Construction, etc)",
        "Other: ________",
      ],
      expanded: true,
    },
  ],
};

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
export const sentences = [
  "Thank you for registering with Career Mitra!",
  "Let's get to know you a little more.",
  "Please complete some simple questions.",
];
export const subjectOptions = [
  "Physics",
  "Chemistry",
  "Math",
  "Biology",
  "Computer Science",
  "Economics",
  "Business Studies",
  "Book Keeping and Accountancy",
  "Commerce",
  "Art & Craft",
  "Psychology",
  "Sociology",
  "Political Science",
  "Home Science",
  "Media Studies",
  "Fashion Studies",
  "Music & Dance",
  "Health and Physical Education",
];
export const skillOptions = [
  "Playing with Numbers & logic",
  "Drawing / designing",
  "Talking to people",
  "Fixing / building things",
  "Writing / storytelling",
  "Science experiments",
  "Leading groups",
  "Helping others",
  "Computers / tech",
  "Sports / physical work",
];
export const careerOptions = [
  "Medicine & Healthcare",
  "Engineering & Technology",
  "Hardware & Industrial Repair",
  "IT & Software Development",
  "Agriculture & Pure Sciences",
  "Aviation, Logistics & Defense",
  "Architecture & Planning",
  "Finance & Investments",
  "Banking & Accounting",
  "Management & Startups",
  "Digital Marketing & Sales",
  "Fine Arts & Fashion",
  "Product & Industrial Design",
  "Teaching & Education",
  "Social Work & NGOs",
  "Law & Legal Services",
  "Media & Entertainment",
  "Humanities & Social Sciences",
  "Office Support & Admin",
  "Hospitality & Culinary Arts",
  "Govt. Services & Police / Defense",
];
export const careerTypes = [
  "Safe/stable jobs",
  "High-growth jobs",
  "Creative jobs",
  "Hands-on jobs",
  "Other",
];
export const dimensions = [
  {
    title: "Personality",
    description: [
      "Know your strengths",
      "Understand what might challenge you",
      "Learn how your personality fits different career paths",
    ],
  },
  {
    title: "Interest",
    description: [
      "Discover what you love doing",
      "Match your preferences to job roles",
      "Explore work environments where you’ll thrive",
    ],
  },
  {
    title: "Aptitude",
    description: [
      "Measure your strengths in verbal, numerical & abstract reasoning",
      "Identify the areas where you shine the most",
      "See which careers align with your natural abilities",
    ],
  },
];

export const introSentences = [
  "Lovely! Thanks for your inputs.",
  "As we begin, here’s a quick overview of the 3 exciting dimensions we will be measuring.",
];
export const lines = [
  "Remember, these are not pass/fail test questions",
  "Do not think about what is right or wrong",
  "Just answer honestly as you would talk to your Friend.",
  "We are your Career Mitra, these questions are only to understand YOU !!",
  "Be honest. Be yourself. Give genuine answers.",
  "Ready to begin? Let’s go!",
];
export const thankYouScreenText = {
  header: "Thank You!",
  sectionCompleted: "Section Completed ✓",
  confettiSuccess: "Test Completed!",
  motivational: {
    "personality-test":
      "Great start! You're one step closer to discovering your potential.",
    "interest-test":
      "Excellent progress! Your interests are shaping your unique profile.",
  },
  button: {
    next: "Continue to Next Test",
    results: "View Results",
  },
  messages: {
    "personality-test": "Thanks you for Completing the Personality Test.",
    "interest-test": "Thanks you for Completing the Interest Test.",
    "aptitude-test": "Thanks you for Completing the Aptitude Test.",
    default: "Thank you for completing the test section.",
  },
  instructions: {
    "personality-test": {
      title: "Now we will begin Interest Test.",
      desc1:
        "Imagine you have a chance to try different activities for 1 day in your life. For each of the activity displayed, share your eagerness to try it (starting from Completely Like, Like, 50-50, Dislike, Completely Dislike).",
      desc2:
        "Remember there are NO right or wrong answers here, answer as you relate to the situation and answer as you would normally act.",
      desc3:
        "Time Limit – 30 sec. This 30 sec time limit is suggested only, you should be able to answer in much less time. Even if you take longer there is no issue.",
    },
    "interest-test": {
      title: "Now we will begin Aptitude Test.",
      desc1:
        "The Test will have three type of Questions – Numerical, Verbal & Logical. Each of the question will have four options. Select 1 of the 4 choices.",
      desc2:
        "Remember these are Aptitude questions which DO have Right and Wrong answers. Hence read the question carefully and then select the correct answer.",
      desc3:
        "Time Limit – 90 sec. This time limit is suggested only, Even if you take longer there is no issue.",
    },
    "aptitude-test": {
      title: "Assessment Complete!",
      desc1:
        "You have successfully completed all sections of the assessment. Your responses have been recorded and will be used to generate your personalized career guidance report.",
    },
  },
};

export const chartedData = [
  { month: "Jan", assessments: 45, reports: 38 },
  { month: "Feb", assessments: 52, reports: 45 },
  { month: "Mar", assessments: 61, reports: 55 },
  { month: "Apr", assessments: 58, reports: 52 },
  { month: "May", assessments: 70, reports: 63 },
  { month: "Jun", assessments: 75, reports: 68 },
];

export const institutions = [
  { id: "1", name: "Delhi Public School" },
  { id: "2", name: "St. Xavier's College" },
  { id: "3", name: "Presidency School" },
];

export const counsellors = [
  { id: "1", name: "Dr. Sarah Johnson" },
  { id: "2", name: "Ms. Priya Sharma" },
  { id: "3", name: "Mr. Rajesh Kumar" },
];

export const cities = ["Delhi", "Mumbai", "Bangalore", "Pune", "Hyderabad"];

export const states = ["Delhi", "Maharashtra", "Karnataka", "Telangana"];

export const generateMetrics = () => {
  const base = {
    feesCollected: 1250000,
    totalRegisteredUsers: 4850,
    usersCompletedTest: 3920,
    usersPendingTest: 930,
    approvedReports: 2150,
    pendingReports: 540,
    totalCounsellingUsers: 2890,
    pendingCounsellings: 380,
  };

  const random = (n) => Math.round(Math.random() * n - n / 2);

  return {
    feesCollected: Math.max(0, base.feesCollected + random(200000)),
    totalRegisteredUsers: Math.max(0, base.totalRegisteredUsers + random(500)),
    usersCompletedTest: Math.max(0, base.usersCompletedTest + random(400)),
    usersPendingTest: Math.max(0, base.usersPendingTest + random(200)),
    approvedReports: Math.max(0, base.approvedReports + random(200)),
    pendingReports: Math.max(0, base.pendingReports + random(100)),
    totalCounsellingUsers: Math.max(
      0,
      base.totalCounsellingUsers + random(300),
    ),
    pendingCounsellings: Math.max(0, base.pendingCounsellings + random(100)),
  };
};

import counsellingImg from "../assets/counselling.png";
import reportImg from "../assets/report.jpeg";

export const steps = [
  {
    title: "Personality Test",
    short:
      "Understand how you prefer to work and make decisions, and the environments.",
    full: `Many students and parents focus only on marks or external factors when choosing a career, without understanding the student's personality and working style. This can lead to misalignment between the student's natural preferences and their chosen career path, resulting in dissatisfaction and lack of motivation.

Approach: The personality assessment helps you understand your working style and preferences.This assessment helps you understand whether you prefer structured or flexible environments, people-oriented or independent roles, leadership or individual contribution, and how you respond to pressure and responsibility.

What You Get:
• Your working style and preference analysis
• Understanding of people-oriented vs independent roles
• Leadership and collaboration preferences
• Pressure and work-environment suitability insights
• Personality-career alignment clarity`,
  },
  {
    title: "Interest Test",
    short:
      "Discover what naturally keeps you engaged and motivated for long-term career satisfaction.",
    full: `Many students choose careers based on external pressure, trends, or marks, without understanding what truly interests them. This can lead to dissatisfaction and burnout in the long run.

Approach: The interest assessment helps you understand the activities and subjects that naturally hold your attention and the kinds of problems you enjoy solving. 
The assessment helps you identify career domains aligned with your interests, such as helping people, building or designing things, creative expression, business and strategy, systems and analysis, or science and nature-related fields.

What You Get:
• Interest profile across multiple career domains
• Areas that naturally keep you engaged
• Motivation and preference insights
• Career direction aligned with your interests
• Clarity without pressure or confusion`,
  },
  {
    title: "Aptitude Test",
    short:
      "Understand your strengths and discover what you can learn and perform comfortably.",
    full: `Many students confuse marks with ability. Marks often reflect effort, practice, or coaching, while aptitude helps identify the areas where you can grow more efficiently and sustainably.

Approach: Aptitude testing helps distinguish effort-based performance from your actual strength areas.It helps you understand where learning feels easier and where you can perform more comfortably over time.
Understanding your aptitude helps you choose career paths where your strengths match the demands of the field, making learning easier and reducing future stress or burnout.

What You Get:
• Verbal reasoning analysis (language, comprehension, communication)
• Numerical reasoning analysis (maths, data, problem-solving)
• Logical reasoning assessment (patterns, analytical thinking)
• Spatial ability insights (visualisation, design, mechanics)`,
  },
];

export const stepTwoThree = [
  {
    title: "Step 2 - Career Report",
    img: reportImg,
    short: "Personalised report with best career options and roadmap.",
    full: `You receive a detailed, easy-to-understand report combining Aptitude, Personality, and Interest results. The report highlights suitable career paths, recommended streams, strengths, and areas to improve.

What You Get:
• 16-19 page detailed career report
• Complete API-based analysis (Aptitude, Personality, Interest)
• Identification of strengths and improvement areas
• Recommended career paths based on your profile
• Stream and subject selection guidance
• Career fit and suitability analysis
• Clear action steps for future planning`,
  },
  {
    title: "Step 3 - Expert Counselling",
    img: counsellingImg,
    short:
      "One-to-one expert session to finalise career direction confidently.",
    full: `In this session, the counsellor explains the assessment results to both parents and students, answers career-related doubts, and helps finalise the best direction based on strengths and interests.

What You Get:
• One-to-one 30-45 minutes counselling session 
• Report explanation in simple language
• Career & stream clarity
• Action plan for future steps
• Expert guidance without confusion
• Opportunity to ask personal career-related questions
• Clear understanding of next academic and career decisions`,
  },
];

export const testimonials = [
  {
    text: "We were worried about our child. Career-Mitra helped us understand what we could not understand about our Child and his Strengths. We now understand that our Son can do many things in his Career.",
    name: "Raghav's Mother",
    role: "Parent",
  },
  {
    text: "Career-Mitra Test and Counselling was like Google Map for us. Instead of various paths, we can now choose the correct path for our son.",
    name: "Anthony Martin",
    role: "Parent",
  },
  {
    text: "Career-Mitra helped in creating a huge alignment between me and my parents, specially my father. Now I understand my strengths and most importantly my father understand the same.",
    name: "Raghav",
    role: "Student",
  },
  {
    text: "Before the test, I had lot of concerns about how my mind works, what slows me down, etc. I also wanted clarity on my Career options which did not restrict me. The test report and counselling cleared the doubts and I can now pursue my career path.",
    name: "Ronit Martin",
    role: "Student",
  },
];

export const videos = ["Kee0GP7KCDg", "qcg_K7I5ygA", "wieuOA77Kus"];

export const FAQs = [
  {
    q: "Why should I choose CareerCompass over other career guidance platforms?",
    a: "Unlike generic advice, CareerCompass starts by understanding you first. Through structured assessments and expert counselling, we help you identify career paths that truly match your strengths, interests, and long-term goals. The recommendations are personalized and data-driven, so you get clarity instead of confusion.",
  },
  {
    q: "Who can take this test?",
    a: "The test is designed for students from Class 9 to 12, college students, graduates, and anyone seeking career clarity or direction.",
  },
  {
    q: "How accurate is the career assessment?",
    a: "The assessment is built on established psychometric concepts and evaluates personality, interests, and aptitude together. This holistic approach gives reliable career guidance based on your unique profile, rather than just one dimension.",
  },
  {
    q: "How long does the assessment take?",
    a: "The full assessment typically takes around 30 minutes. You can complete it online at your own pace, on any device.",
  },
  {
    q: "What happens after I complete the test?",
    a: "Once your assessment is complete, you receive a personalized report with your strengths, areas to develop, and suitable career directions. You can then book a one-on-one counselling session with our expert to discuss your results and plan next steps.",
  },
  {
    q: "Is counselling compulsory after the test?",
    a: "Counselling is not compulsory, but it is highly recommended. The session helps interpret your report in context, address parent and student concerns together, and turn insights into a clear, actionable plan.",
  },
  {
    q: "How is the counselling session conducted?",
    a: "Counselling sessions are conducted one-on-one with an expert counsellor, available online so you can join from anywhere comfortable.",
  },
  {
    q: "Can my parents join the counselling session?",
    a: "Absolutely — we encourage it. Career decisions are usually a family conversation, and having parents in the session helps everyone get on the same page about the recommended path.",
  },
];

export const ADMIN_PERMISSION_MAP = {
  Dashboard: "Dashboard",
  "Entity Management": "Entity Management",
  "Promo Code": "Promo Code",
  "Test Management": "Test Management",
  "Question Management": "Question Management",
  "Report Management": "Report Management",
  "Counsellor Management": "Counsellor Management",
  "User and Permission Management": "User Management",
  "Payment Management": "Payment Management",
  "Product Management": "Product Management",
  "Support Tickets": "Support Ticket",
};

export const ADMIN_NAV_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Entity Management", href: "/admin/entity" },
  { name: "Promo Code", href: "/admin/promo-code" },
  { name: "Test Management", href: "/admin/tests" },
  { name: "Question Management", href: "/admin/question-management-list" },
  { name: "Report Management", href: "/admin/reports" },
  { name: "Counsellor Management", href: "/admin/counsellor-management" },
  { name: "User and Permission Management", href: "/admin/users-management" },
  { name: "Payment Management", href: "/admin/payments" },
  { name: "Product Management", href: "/admin/product" },
  { name: "Support Tickets", href: "/admin/issues" },
];
