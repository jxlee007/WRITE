# OS - Creative Operating System

A modern, interactive operating system interface built with React, TypeScript, and Convex. This project showcases an innovative approach to desktop environments with project management, media library, AI-powered generation, and real-time collaboration features.

## 📋 Project Overview

**OS** is a creative desktop environment platform that empowers users to manage projects, organize media, and leverage AI for content generation. It combines a modern UI with powerful backend capabilities through Convex, enabling seamless project workflows and creative asset management.

**Project URL**: https://lovable.dev/projects/9ebd68a4-82c8-4aab-8af8-2999ebbfd75f

### Key Features

- **Project Management**: Create, organize, and manage creative projects
- **Media Library**: Store and browse generated and uploaded media assets
- **AI Generation**: Leverage OpenRouter API for AI-powered content generation
- **Document Management**: Organize project documents with a hierarchical tree view
- **File Explorer**: Browse and manage project files efficiently
- **Real-time Chat**: Collaborate with team members in real-time
- **Token Management**: Track and manage API token usage
- **Export Options**: Multiple export formats for project deliverables

## 🛠 Technology Stack

This project is built with modern technologies:

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn-ui, Tailwind CSS
- **Backend**: Convex (Backend-as-a-Service)
- **Authentication**: Convex Auth
- **AI Integration**: OpenRouter API
- **Build Tool**: Vite with TypeScript support

## 📁 Project Structure

```
src/
  ├── components/        # React components (UI, dialogs, panels)
  ├── hooks/             # Custom React hooks
  ├── lib/               # Utility functions and helpers
  └── pages/             # Page components
convex/
  ├── schema.ts          # Data model definitions
  ├── chat.ts            # Chat functionality
  ├── documents.ts       # Document management
  ├── projects.ts        # Project management
  ├── generatedImages.ts # Image generation handling
  ├── mediaLibrary.ts    # Media storage
  ├── openrouter.ts      # AI API integration
  ├── auth.config.ts     # Authentication setup
  └── tokenUsage.ts      # Token tracking
images/                  # Case study and demo images
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Git

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd OS

# Install dependencies
npm i

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🌐 Deployment

Click **Share → Publish** in the [Lovable dashboard](https://lovable.dev/projects/9ebd68a4-82c8-4aab-8af8-2999ebbfd75f) to deploy.

### Custom Domain
To connect a custom domain, navigate to **Project > Settings > Domains** and click **Connect Domain**. [Learn more](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 📝 Environment Setup

Create a `.env.local` file in the root directory with necessary API keys and configuration variables for Convex and OpenRouter integration.

## 🤝 Contributing

This project is built on Lovable, so contributions flow through the platform. Changes are automatically synced to this repository.

## 📄 License

See LICENSE file for details.

---

Built with ❤️ using [Lovable](https://lovable.dev)
