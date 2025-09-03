# Dany Akmallun Ni'am - Personal Portfolio & Blog

<div align="center">
  <img src="/public/opengraph.jpg" alt="Dany Akmallun Ni'am - Personal Portfolio" width="100%" />
</div>

<div align="center">
  <strong>Crypto enthusiast • Web Developer • Lifelong learner</strong>
</div>

<div align="center">
  <a href="https://danyakmallun.com">🌐 Live Website</a> •
  <a href="https://github.com/danyakmallun9999">📱 GitHub</a> •
  <a href="https://twitter.com/danyakmallun">🐦 Twitter</a>
</div>

---

## 🚀 Overview

Personal portfolio website built with **Next.js 15**, **React 19**, **Tailwind CSS v4**, and **Motion** animations. Features a modern, responsive design with a flexible blog system, project showcase, and professional presentation of skills and experience.

## ✨ Features

### 🎨 **Modern Design & Animations**
- **Motion-Primitives** powered animations for smooth interactions
- **Dark/Light mode** with system preference detection
- **Responsive design** optimized for all devices
- **Custom UI components** with magnetic effects and spotlights
- **Smooth scrolling** with progress indicators

### 📝 **Flexible Blog System**
- **File-based CMS** with auto-discovery from `content/blog/`
- **MDX support** with syntax highlighting and custom components
- **Frontmatter metadata** (title, description, tags, cover images)
- **Category and tag filtering**
- **SEO-optimized** URLs and metadata
- **Command-line tool** for creating new blog posts

### 💼 **Project Showcase**
- **Interactive project cards** with image previews
- **Tech stack display** with categorized tags
- **External links** to source code and live demos
- **Featured projects** highlighting on homepage

### 🔧 **Developer Experience**
- **TypeScript** for type safety
- **ESLint & Prettier** for code quality
- **Hot reload** during development
- **Optimized builds** for production
- **Vercel Analytics** integration

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **Tailwind CSS v4** - Utility-first CSS framework
- **Motion** - Animation library for React
- **TypeScript** - Type-safe JavaScript

### **Content & Blog**
- **MDX** - Markdown with JSX components
- **gray-matter** - Frontmatter parsing
- **react-syntax-highlighter** - Code syntax highlighting
- **next-mdx-remote** - MDX rendering

### **UI Components**
- **Lucide React** - Icon library
- **React Icons** - Additional icon sets
- **next-themes** - Theme switching
- **clsx & tailwind-merge** - Conditional styling

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Vercel Analytics** - Performance monitoring

## 📦 Installation

### Prerequisites
- **Node.js** 18.17 or later
- **npm** or **yarn** package manager
- **Git** for version control

### Step 1: Clone the Repository
```bash
git clone https://github.com/danyakmallun9999/nextjs-portfolio.git
cd nextjs-portfolio
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Environment Setup
Create a `.env.local` file in the root directory (optional):
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Step 4: Run Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📝 Blog System Usage

### Creating New Blog Posts

#### Method 1: Using the CLI Tool (Recommended)
```bash
npm run create-post
```

The script will prompt you for:
- **Title** - Blog post title
- **Description** - Brief description
- **Slug** - URL-friendly identifier
- **Tags** - Comma-separated tags
- **Cover Image** - Optional cover image path

#### Method 2: Manual Creation
1. Create a new `.mdx` file in `content/blog/`
2. Add frontmatter at the top:

```mdx
---
title: "Your Blog Post Title"
description: "Brief description of your post"
publishedAt: "2025-01-15"
coverImage: "/posts/cover-image.jpg"
tags: ["technology", "web3", "blockchain"]
---

# Your Blog Post Title

Your content here...
```

### Blog Post Structure
```
content/
└── blog/
    ├── your-first-post.mdx
    ├── another-post.mdx
    └── ...
```

### Available Scripts
```bash
# Create new blog post
npm run create-post

# Migrate existing posts (if needed)
npm run migrate-posts

# Clean up old blog structure
npm run cleanup-old-blog
```

## 🎨 Customization

### Personal Information
Edit `app/data.ts` to update:
- **Projects** - Your portfolio projects
- **Work Experience** - Professional experience
- **Social Links** - Social media profiles
- **Email** - Contact information

### Styling
- **Colors**: Modify `app/globals.css` for theme colors
- **Components**: Customize UI components in `components/ui/`
- **Layout**: Adjust layout in `app/layout.tsx`

### Blog Configuration
- **Categories**: Add categories in blog frontmatter
- **Tags**: Use consistent tags for better organization
- **Cover Images**: Store in `public/posts/` directory

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/danyakmallun9999/nextjs-portfolio)

### Other Platforms
The project can be deployed to any platform supporting Next.js:
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

## 📁 Project Structure

```
nextjs-portfolio/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── projects/          # Projects pages
│   ├── work/              # Work experience pages
│   ├── components/        # App-specific components
│   ├── data.ts           # Static data
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   └── ui/               # Custom UI components
├── content/              # Content files
│   └── blog/             # Blog posts (MDX)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
│   └── posts/            # Blog post images
├── scripts/              # Build and utility scripts
└── package.json          # Dependencies and scripts
```

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Blog Management
npm run create-post      # Create new blog post
npm run migrate-posts    # Migrate existing posts
npm run cleanup-old-blog # Clean up old blog structure
```

## 📊 Performance Features

- **Image Optimization** - Next.js automatic image optimization
- **Code Splitting** - Automatic route-based code splitting
- **Static Generation** - Pre-rendered pages for better performance
- **Analytics** - Vercel Analytics integration
- **SEO Optimization** - Meta tags and structured data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Motion-Primitives** for amazing animations
- **Next.js team** for the excellent framework
- **Tailwind CSS** for the utility-first approach
- **Vercel** for seamless deployment

## 📞 Contact

- **Website**: [danyakmallun.com](https://danyakmallun.com)
- **Email**: danyclasher9999@gmail.com
- **GitHub**: [@danyakmallun9999](https://github.com/danyakmallun9999)
- **Twitter**: [@danyakmallun](https://twitter.com/danyakmallun)
- **LinkedIn**: [Dany Akmallun Ni'am](https://www.linkedin.com/in/danyakmallun/)

---

<div align="center">
  <sub>Built with ❤️ by Dany Akmallun Ni'am</sub>
</div>
