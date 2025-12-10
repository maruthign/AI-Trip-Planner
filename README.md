# 🌍 AI Trip Planner

An intelligent travel companion that generates personalized trip itineraries using **Google Gemini AI**.  
Built with **React**, **Vite**, **Tailwind CSS**, and **Firebase**.

![AI Trip Planner Banner](/placeholder.jpg)

## ✨ Features

-   **🧠 AI-Powered Itineraries**: Generates day-by-day travel plans based on your budget, travelers, and interests using Google's Gemini Flash model.
-   **🏨 Smart Hotel Recommendations**: Suggests top-rated hotels with images, prices, and geo-coordinates.
-   **📅 Interactive Timeline**: Visualizes your daily itinerary in a vertical timeline "journey" view.
-   **📸 Rich Media**: Automatically fetches high-quality place photos using **Google Places API**.
-   **📍 Integrated Maps**: Deep links to Google Maps for one-click navigation to hotels and attractions.
-   **🔐 Secure Authentication**: Google Sign-In via OAuth 2.0.
-   **📱 Fully Responsive**: Premium mobile-first design with a glassmorphism header and adaptive grids.
-   **📤 Share Trips**: Copy and share your generated trip URL with friends instantly.

## 🛠️ Tech Stack

-   **Frontend**: React.js, Vite
-   **Styling**: Tailwind CSS, PostCSS
-   **AI Model**: Google Gemini 1.5 Flash
-   **Data & Auth**: Firebase Firestore, Google OAuth
-   **APIs**: Google Places API (New), Google Maps
-   **Icons**: React Icons, Lucide React
-   **Fonts**: 'Outfit' (Google Fonts)

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18+)
-   npm or yarn
-   Google Cloud Console Project (for API Keys)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/AI-Trip-Planner.git
    cd AI-Trip-Planner
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory and add the following keys:

    ```env
    VITE_GOOGLE_PLACE_API_KEY=your_google_places_api_key
    VITE_GOOGLE_GEMINI_AI_API_KEY=your_gemini_api_key
    VITE_GOOGLE_AUTH_CLIENT_ID=your_google_oauth_client_id
    ```

    > **Note**: ensure your Google Maps API key has "Places API (New)" enabled.

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Building for Production

To create a production-ready build:

```bash
npm run build
```

## ☁️ Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Add the environment variables (`VITE_GOOGLE_PLACE_API_KEY`, etc.) in the Vercel Project Settings.
4.  Deploy!

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

---

**Made with ❤️ using AI**
