# REVO - Admin Dashboard

A responsive admin dashboard built with React, Vite, TypeScript, Tailwind CSS, and React Query.

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

### Installation Steps

1. **Clone or download the project**

   ```bash
   cd REVO
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This will install all required packages including React, Vite, TypeScript, Tailwind CSS, and React Query.

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will open automatically in your browser at `http://localhost:5173`

4. **Build for production** (optional)

   ```bash
   npm run build
   ```

   This creates an optimized production build in the `dist` folder.

5. **Preview production build** (optional)
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
REVO/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Admin/         # Admin-specific components
│   │   └── admin-ui/      # Shadcn UI components
│   ├── pages/             # Page components
│   ├── layouts/           # Layout components
│   ├── routes/            # Route configuration
│   ├── services/           # API services
│   │   └── api/
│   │       └── mockApi.tsx # Mock data with React Query
│   └── main.tsx           # Application entry point
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Query (@tanstack/react-query)** - Data fetching and state management
- **Shadcn UI** - UI component library
- **React Router** - Routing
- **ApexCharts** - Charts and graphs
- **Lucide React** - Icons

## ✨ Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ React Query with mocked data
- ✅ Loading states for all components
- ✅ Error handling
- ✅ TypeScript for type safety
- ✅ Modern UI components

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Components

The dashboard includes the following main components:

- **StatsCards** - Key performance metrics
- **NeedsApprovalCard** - Pending approval requests
- **PartnerFunnelCard** - Partner funnel visualization
- **PayoutsCard** - Payouts chart
- **ProgramGrowthCard** - Program growth breakdown
- **ChatPanel** - Chat/messaging panel
- **UserUpdateCard** - User activity updates

All components use React Query for data fetching with loading and error states.

## 🔧 Troubleshooting

### Port already in use

If port 5173 is already in use, Vite will automatically use the next available port.

### Module not found errors

If you see module not found errors:

1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

### Build errors

Make sure you're using Node.js version 18 or higher.

## 📋 Project Structure & Design Choices

- **Component Organization**: Components are organized by feature (Admin) and type (admin-ui for reusable Shadcn components). Each card component is self-contained with its own React Query hook for data fetching, making them easily testable and maintainable.

- **React Query Integration**: All data fetching uses React Query with mocked API functions. This provides a clean separation between UI and data logic, making it easy to swap mock data with real API calls later. Each component handles its own loading and error states.

- **TypeScript & Type Safety**: Full TypeScript implementation with interfaces for all data structures. This ensures type safety across components and makes the codebase more maintainable and less prone to runtime errors.

- **Responsive Design**: Built with Tailwind CSS using a mobile-first approach. The layout adapts using Tailwind's responsive breakpoints (md, lg, xl, 3xl) to ensure optimal viewing on all device sizes.
