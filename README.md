# 🌳 Focus Grove - Digital Forest Productivity App

Transform your focus sessions into a thriving digital forest ecosystem. Focus Grove gamifies productivity by growing beautiful trees for each completed focus session.

## ✨ Features

- **🎯 Advanced Pomodoro Timer** - Customizable focus sessions (15-60 minutes)
- **🌲 Interactive Digital Grove** - D3.js powered tree visualization with realistic growth animations
- **🏆 Achievement System** - Unlock rare trees and achievements based on focus milestones
- **📊 Detailed Analytics** - Track streaks, total focus time, and session statistics
- **🎨 Beautiful UI** - Modern design with smooth animations using Framer Motion
- **🌙 Dark/Light Mode** - Automatic theme switching with next-themes
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **⚡ High Performance** - Built with Next.js 14 App Router and optimized for speed

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion + D3.js for tree visualizations
- **State Management**: Zustand with persistence
- **Icons**: Lucide React
- **Themes**: next-themes for dark/light mode

## 🛠️ Installation & Setup

1. **Clone and install dependencies:**
   \`\`\`bash
   git clone <your-repo>
   cd focus-grove
   npm install
   \`\`\`

2. **Run development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Build for production:**
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

## 📁 Project Structure

\`\`\`
focus-grove/
├── app/ # Next.js App Router
│ ├── globals.css # Global styles with CSS variables
│ ├── layout.tsx # Root layout with providers
│ ├── page.tsx # Home page component
│ └── providers.tsx # Theme and state providers
├── components/ # React components
│ ├── ui/ # Reusable UI components
│ ├── timer.tsx # Advanced Pomodoro timer
│ ├── grove.tsx # Interactive grove visualization
│ ├── achievements.tsx # Achievement system
│ └── ...
├── lib/ # Utilities and configuration
│ ├── stores/ # Zustand state management
│ ├── hooks/ # Custom React hooks
│ ├── constants.ts # App configuration
│ └── utils.ts # Utility functions
└── public/ # Static assets
\`\`\`

## 🎮 How to Use

1. **Start a Focus Session**: Choose your timer duration (default 25 minutes) and click Start
2. **Stay Focused**: The timer counts down while you work on your tasks
3. **Grow Trees**: Complete sessions to automatically plant trees in your grove
4. **Unlock Achievements**: Reach milestones to unlock special trees and badges
5. **Track Progress**: View detailed statistics and maintain focus streaks

## 🌟 Key Improvements Made

### Architecture

- ✅ Migrated from Create React App to Next.js 14 with App Router
- ✅ Implemented modern TypeScript throughout
- ✅ Added Zustand for efficient state management with persistence
- ✅ Created modular component architecture with shadcn/ui

### Features

- ✅ Enhanced D3.js tree visualizations with realistic animations
- ✅ Advanced timer with multiple session types (Focus/Break/Long Break)
- ✅ Comprehensive achievement system with rarity tiers
- ✅ Real-time statistics and progress tracking
- ✅ Theme switching with system preference detection

### User Experience

- ✅ Smooth Framer Motion animations throughout
- ✅ Responsive design for all screen sizes
- ✅ Accessible components following WCAG guidelines
- ✅ Beautiful gradient backgrounds and nature-inspired design
- ✅ Sound effects and notification system

### Performance

- ✅ Optimized bundle size with Next.js 14
- ✅ Efficient state management with selective updates
- ✅ Lazy loading and code splitting
- ✅ Optimized D3.js rendering with memoization

## 🎨 Design Philosophy

Focus Grove combines the proven Pomodoro Technique with the psychological benefits of nurturing a digital garden. The app's design emphasizes:

- **Calm & Mindful**: Nature-inspired colors and gentle animations
- **Rewarding**: Visual progress through tree growth and achievements
- **Motivating**: Streaks and statistics encourage consistent use
- **Beautiful**: Modern UI that makes productivity feel delightful

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details on how to submit pull requests, report issues, and suggest improvements.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with 🌳 and Next.js • Designed for mindful productivity**
