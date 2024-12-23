# PRDify

## Background
PRDify combines **Machine Learning (ML)** and **Cloud Computing (CC)** to automate the generation of **Product Requirement Documents (PRD)** using **Large Language Models (LLM)**. The goal is to create a scalable and efficient solution for PRD generation with minimal human intervention.

### Cloud Computing
The project architecture integrates a **Next.js frontend**, **Express.js backend**, and **ML model** hosted on Google Cloud services. The architecture is as follows:

- **Frontend**: Hosted on **Google App Engine** using Next.js for efficient server-side rendering and deployment.
- **Backend**: Hosted on **Google Compute Engine** for managing API requests, handling authentication, and interacting with the database.
- **ML API**: Hosted on **Google Cloud Run**, running containerized applications that handle PRD generation using the fine-tuned LLM model.
- **Database & Storage**: Managed with **Google Compute Engine** for the backend database and **Google Cloud Storage** for securely storing PRD documents. Metadata is handled by **Google Firestore**.

This combination ensures high availability, scalability, and performance across all components of the system.

---

## Installation & Setup

To get started with **PRD Maker** locally, follow these steps:

### Frontend (Next.js)
1. Clone the repository:
   ```bash
   git clone https:github.comunChris666C242-PM02.git
   ```

2. Navigate to the **`next-app`** folder:
   ```bash
   cd C242-PM02/next-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

   The frontend should now be running at `http:localhost:3000`.

---

### Backend (Express.js on Google Compute Engine)
1. Navigate to the **`Backend`** folder:
   ```bash
   cd C242-PM02/Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend development server:
   ```bash
   npm run dev
   ```

   The backend should now be running at `http:localhost:5000`.

---

### ML API (Cloud Run)
1. Set up the ML API to run on **Google Cloud Run**:
   - Build and deploy the containerized ML API using Google Cloud's [Cloud Run](https:cloud.google.comrun) service.
   - Ensure that the **Groq API** is correctly integrated to handle the PRD generation process.

2. Once deployed, your ML API endpoint will be available on Cloud Run, and you can interact with it from the backend to generate PRDs.

---

## Cloud Architecture Overview

### **1. Frontend (Next.js on Google App Engine)**
The frontend application is hosted on **Google App Engine**, which handles the deployment of the Next.js app with server-side rendering capabilities. App Engine ensures easy scaling based on traffic demands and integrates seamlessly with other Google Cloud services.

- **Frontend URL**: Accessible via a custom domain or App Engine-provided URL.

### **2. Backend (Express.js on Google Compute Engine)**
The backend API is hosted on **Google Compute Engine**, which is used to process requests, authenticate users, and handle interactions with the database and ML API.

- **Backend URL**: Hosted on Google Compute Engine instance(s).
- **Database**: Google Firestore is used for managing metadata, and Cloud Storage stores the PRD documents.

### **3. ML API (Google Cloud Run)**
The **ML API** is deployed on **Google Cloud Run**. This serverless platform allows you to deploy containerized applications that scale automatically. The ML API interacts with the fine-tuned LLM model hosted on the **Groq API** to generate PRDs.

- **ML API URL**: Deployed via Cloud Run for scalable inference processing.

---

## Contributing
We welcome contributions! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes and push to your fork.
5. Open a pull request.

---
