# 🚗 Partho-Cars-Rental – Premium Car Rental System (MERN Stack)
Partho-CARS is a sophisticated, full-stack car rental application designed for a high-end user experience. It allows enthusiasts and travelers to browse an elite collection of Luxury, SUV, and Economy vehicles, view technical specifications, and send instant booking inquiries to the administration.

**🔗 [Live Demo Link]** |(https://ornate-strudel-c20f6c.netlify.app/) **🔗 [Backend Repository]**(https://github.com/parthodevroy/car-rental-server-demo)



## About the Project 
This project is a specialized Car Fleet Management & Booking System tailored for premium rental services.

The platform provides a seamless, interactive interface where users can evaluate vehicles based on critical performance data like Horsepower, Engine Capacity, and Seating. The core objective is to bridge the gap between customers and service providers through an automated, user-friendly communication channel.

Built with a focus on scalability and clean code, this application utilizes modern frontend technologies to deliver a fully responsive, "Dark Mode" aesthetic that aligns with luxury automotive branding.
---

## Project Overview  
This platform empowers car rental businesses to showcase their inventory, process customer inquiries, and manage booking workflows — all within a single, unified ecosystem.

---

## Key Features  
## Premium UI/UX Design
Luxury Dark Theme: A visually striking interface optimized for premium branding.

Fluid Animations: Integrated Framer Motion and Lottie-React for high-quality transitions and micro-interactions.

Mobile-First Design: Fully responsive layout built with Tailwind CSS and DaisyUI.

## Vehicle Inventory Management
Dynamic Data Fetching: Real-time data synchronization with MongoDB Atlas.

Technical Specifications: Detailed car cards displaying Year, Color, Category, and Pricing.

Categorized Filtering: Effortless navigation between Economy, Luxury, and SUV categories.

## Advanced Booking & Communication
Validated Booking Form: Secure user input handling via React Hook Form.

EmailJS Integration: Automated email triggers that notify the admin immediately upon form submission.

Interactive Feedback: Real-time user notifications using SweetAlert2 and React-Toastify.

## Security & Optimization
Secure API Handling: Use of Environment Variables (.env) to protect sensitive API keys and database URIs.

Performance Optimization: Efficient image rendering and state management using TanStack React Query.

## Tech Stack  
**Frontend:** React (Vite)
React.js (Vite) & React Router DOM

Tailwind CSS + DaisyUI

Framer Motion (Smooth Animations)

Axios (HTTP Client)

Swiper.js (Interactive Sliders)

**Backend:** Node.js

Node.js & Express.js

MongoDB (NoSQL Database)

JWT (JSON Web Tokens) for Secure Routing

**Tools:** Git · VS Code · Firebase · Vercel · EmailJS

---

## 📁 Project Structure

src/
├─ components/   # Reusable UI components (Navbar, Footer, CarCard)
├─ pages/        # Main View Components (Home, Fleet, Contact)
├─ layouts/      # Application Shell and Routing Layouts
├─ hooks/        # Custom React Hooks (e.g., useAxiosPublic)
├─ context/      # Auth and Global State Management
├─ assets/       # Branding assets and styling
└─ main.jsx      # Application Entry Point

## Dependencies  
List required dependencies or major libraries:

```json
 {
    "@tanstack/react-query": "^5.90.10",
    "axios": "^1.13.2",
    "emailjs-com": "^3.2.0",
    "framer-motion": "^11.0.0",
    "react-hook-form": "^7.66.0",
    "react-router-dom": "^6.22.0",
    "sweetalert2": "^11.26.3",
    "swiper": "^12.0.3",
    "lucide-react": "^0.344.0"
 },
```

---

## Installation️ & Setup
1. Clone the repo and install dependencies:

```bash
git clone https://github.com/parthodevroy/car_rental_frontend_demo
cd car-rental-frontend-demo
npm install
```

2. Set up environment variables by creating a `.env` file in the root directory:

```env
VITE_API_URL=your_backend_api_url
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

3. Run the application:

```bash
npm run dev
```
## Contact
Developer: Partho Dev Roy

Email: rpartho787@gmail.com

LinkedIn: [linkedin.com/in/parthodevroy](https://bd.linkedin.com/in/partho-roy10566)

Portfolio:[ Visit My Live Site](https://parthodevroy.vercel.app/)
