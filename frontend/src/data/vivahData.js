import member1 from "../assets/images/member1.png";
import member2 from "../assets/images/member2.png";
import member3 from "../assets/images/member3.png";
import member4 from "../assets/images/member4.png";

import Success1 from "../assets/images/Success1.png";
import Success2 from "../assets/images/Success2.png";
import success4 from "../assets/images/success4.png";

export const members = [
  {
    id: 1,
    name: "Ananya Sharma",
    age: 26,
    height: "5'5",
    religion: "Hindu",
    caste: "Agarwal",
    city: "Jaipur",
    state: "Rajasthan",
    job: "Software Engineer",
    income: "₹12 - 15 LPA",
    education: "B.Tech / Computer Science",
    company: "Microsoft",
    image: member1,
    premium: true,
    verified: true,
    online: true,
  },
  {
    id: 2,
    name: "Arjun Malhotra",
    age: 30,
    height: "5'10",
    religion: "Sikh",
    caste: "Punjabi",
    city: "Delhi",
    state: "Delhi",
    job: "Business Owner",
    income: "₹20 - 25 LPA",
    education: "MBA",
    company: "Malhotra Exports",
    image: member2,
    premium: true,
    verified: true,
    online: false,
  },
  {
    id: 3,
    name: "Aisha Khan",
    age: 27,
    height: "5'4",
    religion: "Muslim",
    caste: "Sunni",
    city: "Lucknow",
    state: "Uttar Pradesh",
    job: "Doctor",
    income: "₹18 - 22 LPA",
    education: "MBBS",
    company: "Apollo Hospital",
    image: member3,
    premium: true,
    verified: true,
    online: true,
  },
  {
    id: 4,
    name: "Rohan Iyer",
    age: 29,
    height: "5'9",
    religion: "Hindu",
    caste: "Iyer",
    city: "Chennai",
    state: "Tamil Nadu",
    job: "Product Manager",
    income: "₹18 - 20 LPA",
    education: "MBA",
    company: "Zoho",
    image: member4,
    premium: true,
    verified: true,
    online: true,
  },
];

export const stories = [
  {
    id: 1,
    names: "Joel Jacob & Anna George",
    date: "Married on 12 Feb 2024",
    city: "Jaipur",
    image: Success1,
  },
  {
    id: 2,
    names: "Amit & Sneha",
    date: "Married on 05 Jan 2024",
    city: "Delhi",
    image: Success2,
  },
  {
    id: 3,
    names: "Karan & Neha",
    date: "Married on 16 Mar 2024",
    city: "Mumbai",
    image: success4,
  },
];

export const plans = [
  {
    id: 1,
    name: "Free",
    price: "₹0",
    duration: "FREE",
    popular: false,
    features: [
      "Create Profile",
      "Search Profiles",
      "Send 3 Interests / month",
      "WhatsApp access for 7 days after match accepted",
    ],
  },
  {
    id: 2,
    name: "Silver",
    price: "₹299",
    duration: "1 MONTH",
    popular: false,
    features: [
      "25 Interests / month",
      "WhatsApp access for 30 days",
      "View full profiles",
      "Basic support",
    ],
  },
  {
    id: 3,
    name: "Gold",
    price: "₹799",
    duration: "3 MONTHS",
    popular: true,
    features: [
      "100 Interests",
      "WhatsApp access for 90 days",
      "See who viewed you",
      "Priority listing",
    ],
  },
  {
    id: 4,
    name: "Platinum",
    price: "₹1499",
    duration: "6 MONTHS",
    popular: false,
    features: [
      "Unlimited interests",
      "WhatsApp access for 6 months",
      "Premium badge",
      "Priority support",
      "Profile highlighting",
    ],
  },
];