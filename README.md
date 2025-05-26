# GameSnips - Game Idea Snippet Sharing App

**Developer:** Prince Pal

## Project Overview

GameSnips is a simplified mobile application built with React Native that allows users to quickly share and discover short, inspiring game ideas. The app functions as a social platform where users can create, view, and interact with game concept snippets through an intuitive feed-based interface.

## Setup & Installation

### Prerequisites
- Node.js (version 16.x or higher recommended)
- npm or yarn package manager
- React Native development environment
- Android Studio (for Android) or Xcode (for iOS)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/[your-username]/gamesnips-app.git
   cd gamesnips-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies (iOS only):**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start the Metro bundler(Expo Go):**
   ```bash
   npx expo start 

   ```

5. **Run the application:**
   ```bash
   # For Android
   npm run android
   # or
   yarn android

   # For iOS
   npm run ios
   # or
   yarn ios
   ```
# 🧠 Data Persistence & State Management

## ✅ Option B: AsyncStorage + Zustand

- **State Management:** zustand for centralized global store
- **Persistence:** AsyncStorage (with middleware for persisting user sessions, themes, and snippet data)
- **Why:** Lightweight, scalable, and faster to implement than Redux

# 🔐 Authentication

- **Firebase Authentication:** Email/password sign-up & login
- **Session Management:** Persistent sessions across app restarts
- **Security:** Handles authentication state via Zustand + Firebase listeners

# 🌗 Theme Support

- **Dark/Light Mode Toggle:**
  - Theme preference saved with AsyncStorage
  - Applied via custom ThemeProvider across the app

# ✅ Implemented Features

## Core Features

- Feed Screen (FlatList of game snippets)
- Create Snippet Screen (form with validation)
- Like/Unlike functionality
- Navigation (stack-based)
- State Management with Zustand
- AsyncStorage for data persistence

## Bonus Features — ✅ All Implemented

- User Authentication with Firebase
- Pull-to-Refresh on Feed screen
- Input Validation for snippet form
- Animations & Transitions for smoother UX
- Snippet Detail View on snippet tap
- Error Handling for data operations (try/catch, alerts)

# ⚙️ Architecture & Technical Decisions

## Component Design

- Functional components with Hooks
- Reusable, atomic UI components
- Clear separation between screens, logic, and layout

## Zustand Store

- Centralized state: snippets, likes, theme, auth
- Custom hooks to subscribe to store slices

## Navigation

- @react-navigation/stack with auth and main flow stacks
- Smooth transitions, detail view navigation

## Data Flow

- User → Create Snippet → Zustand Store → Feed updates instantly
- Likes handled with local state → persisted with AsyncStorage
- Authenticated users only can create or like snippets

# ⚖️ Trade-offs Made

- **Local Storage vs Cloud Database:** Used AsyncStorage instead of Firestore to reduce complexity and keep app offline-capable
- **Zustand over Redux:** Faster to implement, no boilerplate, easy state sharing across components
- **Expo Managed Workflow:** Speeds up dev time, but limits custom native modules

# 🪲 Known Issues & Limitations

- No backend for snippet syncing across devices (yet)
- Image upload feature is mocked (preview only)
- Theme preference is global, not user-based
- Authentication uses basic email/password (no social logins)

### Current Limitations
- [List any known bugs or limitations]
- [Describe any performance considerations]
- [Note any incomplete features]

### Areas for Future Improvement
- **Enhanced UI/UX:** More sophisticated animations and transitions
- **Advanced Features:** Search functionality, categories, user profiles
- **Performance:** Image caching and lazy loading
- **Social Features:** Comments, sharing, following users
- **Data Validation:** More robust form validation and error handling





## Dependencies

### Core Dependencies
- `react-native`: [version]
- `@react-navigation/native`: Navigation library
- `@react-navigation/stack`: Stack navigator
- `react-native-async-storage/async-storage`: Local storage (if using Option B)
- `firebase`: Cloud storage (if using Option C)

### Development Dependencies
- `@types/react-native`: TypeScript definitions
- `eslint`: Code linting
- `prettier`: Code formatting

## Submission Notes

- **Video Demonstration:** [https://drive.google.com/drive/u/0/folders/10GERIN-S5uKSGSAgkx-xmbgzxyh0HDF7]
- **Development Time:** [35-40]
## Key Challenges

- ⚠️ **Firebase Authentication Setup**: Faced compatibility issues with Firebase and React Native, especially regarding version mismatches and native module linking.
- ⚙️ **Metro Bundler Configuration**: Encountered bundling issues due to incorrect configuration and Firebase dependencies, which required tweaking the `metro.config.js` and clearing the cache.
- 💾 **Persistent State Handling**: Managing theme, session, and like states across app restarts using AsyncStorage in combination with Zustand’s middleware was tricky to debug.
- 🔄 **Real-Time UI Sync**: Ensuring that likes, snippets, and auth state update reactively without UI lag took fine-tuning of Zustand store subscriptions.

## What You're Most Proud Of

- 🚀 Implemented **full Firebase Authentication** including persistent login state and seamless error handling.
- 🎨 Created a **fully themed UI** with a Dark/Light toggle that remembers user preference.
- 📦 Built a **clean and scalable Zustand store** managing snippets, likes, authentication, and theme settings in a centralized way.
- ✅ Completed **all bonus features**, including detail view navigation, animations, and form validation — making the app feel complete and polished.


---

## Contact

For any questions or clarifications about this project:
- **Email:** [princepal9120@gmail.com]
- **GitHub:** [princepal9120]

---

