# GitHub Copilot Instructions: "The Focus Grove" Project

**Role:** You are a senior full-stack web developer and UX designer. Your task is to build "The Focus Grove," an innovative productivity website that gamifies focus time through digital nature growth.

---

## 1. Project Overview

"The Focus Grove" is a productivity application designed to help users stay focused. It gamifies focus by allowing users to grow a magical digital forest. The longer a user focuses (e.g., avoids distractions, stays off their phone), the more their digital grove flourishes with trees, plants, and magical elements.

**Target Audience:** Students, remote workers, creatives, and anyone seeking to reduce screen time and improve focus.

---

## 2. Core Features to Implement

Implement the following core functionalities:

- **Focus Timer System:** A customizable Pomodoro-style timer (e.g., 25/5 minute intervals).
- **Digital Grove Visualization:** An interactive SVG-based forest visualization. This should use `d3.js` (or a similar library like `@react-spring/web` for animations with SVG) integrated into React components, showing real-time growth and smooth animations.
- **Achievement System:** Logic to unlock rare plants, trees, and magical elements based on focus milestones (e.g., total focus time, streak length).
- **Progress Tracking:** Visual statistics displaying focus streaks, total accumulated focus time, and the evolution of the grove over time.
- **Distraction Blocking (Optional but desirable):** Conceptual framework for website blocking or phone-away reminders.
- **Ambient Sounds (Optional):** Integration of calming nature sounds to enhance the focus experience.

---

## 3. Technical Stack & Design Requirements

- **Framework:** Next.js App Router for routing, server components, and API routes.
- **UI Library:** React for building interactive user interface components.
- **Styling:** Tailwind CSS for utility-first styling, combined with `shadcn/ui` for high-quality, accessible UI components.
- **Visualization:** `d3.js` (or an alternative like `@react-spring/web` for animations combined with a basic SVG library) for dynamic, interactive SVG grove visualizations with smooth growth animations.
- **Data Persistence:** Utilize Local Storage or IndexedDB for client-side persistence of user progress and settings.
- **PWA:** Consider Progressive Web App (PWA) capabilities for offline use and installability.
- **Aesthetic:** Calm, minimalist, and beautifully designed.
- **Color Palette:** Natural greens, earth tones, and soft magical accents.
- **Animation:** Smooth, satisfying growth animations (leveraging d3 transitions or React animation hooks).
- **Responsiveness:** Fully responsive design for desktop, tablet, and mobile devices.
- **Accessibility:** WCAG 2.1 AA compliant, focusing on clean, semantic HTML and CSS.

---

## 4. Deliverables

Your final output should include:

- A fully set up Next.js project using the App Router.
- Integrated Tailwind CSS and `shadcn/ui` for all styled components.
- React components incorporating `d3.js` (or chosen visualization library) for the interactive grove.
- Functional Pomodoro timer with customizable intervals and robust state management.
- Achievement system logic with at least 3-5 sample achievements defined.
- A progress tracking dashboard displaying visual statistics.
- A responsive and accessible design across various breakpoints.
- Clear comments and explanations for key functionality, architecture decisions, and complex logic.

---

## 5. Additional Considerations & Guidance

- Start with setting up the Next.js project with Tailwind CSS and `shadcn/ui`.
- Prioritize a component-based architecture for reusability and maintainability.
- For `d3.js` integration, consider how to effectively manage its lifecycle within React components (e.g., using `useEffect` for D3 operations).
- Ensure the grove growth animations are visually rewarding and convey a sense of magic.
- Design the user experience to be intuitive and engaging, particularly for new users.
- Include placeholder content and sample data for achievements and progress tracking.
- For any server-side logic (if deemed necessary beyond client-side persistence), utilize Next.js API routes or Server Components.
- Focus on gamification elements that encourage long-term user engagement.
- Provide clear instructions on how to run the project.

---

**Start by creating the basic Next.js project structure with Tailwind CSS and shadcn/ui configured.**

**Create a fully functional prototype that demonstrates the core concept and is easily extensible. Focus on making the grove growth visually satisfying and the overall experience genuinely helpful for productivity.**
