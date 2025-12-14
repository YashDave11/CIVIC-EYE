# Civic Eye - Autonomous Intelligent Surveillance System

**Civic Eye** is a next-generation surveillance platform designed for the **Government of Rajasthan**. It shifts the paradigm from reactive monitoring to **preventive AI-driven action**, utilizing edge computing to detect anomalies like fire, accidents, and violence in real-time.

## 🚀 Key Features

*   **Real-Time Dashboard**: A high-performance, low-latency grid view monitoring multiple camera feeds simultaneously.
*   **Edge AI Detection**:
    *   **Fire Detection**: Uses TFLite models to instantly spot fire hazards.
    *   **Anomaly Detection**: Uses YOLOv8 to identify vehicle accidents and potential violence.
*   **Role-Based Alerting**:
    *   **Civil Dashboard**: Standard view for general surveillance.
    *   **Fire Department Portal**: Dedicated high-priority dashboard for fire alerts with auto-dispatch capabilities.
*   **Simulation Mode**: Built-in capabilities to simulate detection scenarios (e.g., Fire Video) for demonstrations.
*   **Privacy & Security**: 'Edge-first' processing ensures data privacy by analyzing video locally before transmission.

## 🛠️ Tech Stack

### Frontend (User Interface)
*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4 (Custom Navy/Government Theme)
*   **Icons**: Lucide React

### Backend & AI
*   **Core**: Python 3.10+
*   **API**: FastAPI (Microservice Architecture)
*   **Communication**: WebSockets (Real-time data streaming)
*   **Computer Vision**: OpenCV

### AI Models
*   **Object Detection**: YOLOv8 (Ultralytics)
*   **Edge Optimization**: TensorFlow Lite (Fire Detection)

## 📦 Getting Started

### Prerequisites
*   Node.js 18+
*   Python 3.10+
*   Webcam or IP Camera source

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/YashDave11/CIVIC-EYE.git
    cd CIVIC-EYE/civic-eye-web
    ```

2.  **Install Frontend Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

4.  **Run AI Microservice (Optional)**
    Navigate to the `civic-eye-ai` folder (if available) and run:
    ```bash
    pip install -r requirements.txt
    python main.py
    ```

## 🎥 Usage

1.  **Dashboard**: Navigate to `/dashboard` to view live feeds.
2.  **Add Camera**: Use the "Register Camera" feature to add new IP streams.
3.  **Fire Demo**: Play the "Cam-03" stream to see the **Fire Department Alert** system in action.
    *   *Note: Alerts trigger automatically > 0:50s mark.*
4.  **Fire Dept**: Access the dedicated portal at `/fire-department` to view incoming incident reports.

---
*Developed for the Rajasthan Hackathon 2025.*
