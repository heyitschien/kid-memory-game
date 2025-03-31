# Vercel Deployment Guide for GitHub Projects

This guide explains how to set up automatic deployments for GitHub repositories using Vercel, including preview deployments for pull requests.

## Table of Contents
1. [Initial Setup](#initial-setup)
2. [Preview Deployments for Pull Requests](#preview-deployments-for-pull-requests)
3. [Working with the Vercel CLI](#working-with-the-vercel-cli)
4. [Best Practices](#best-practices)

## Initial Setup

### Connecting a GitHub Repository to Vercel

1. **Create or log in to your Vercel account** at [vercel.com](https://vercel.com)
2. **Import a project** by clicking "Add New..." → "Project"
3. **Select your GitHub repository** from the list
4. **Configure project settings**:
   - Framework preset (React, Next.js, etc.)
   - Build settings
   - Environment variables (if needed)
5. **Deploy** the project

Your main branch will be deployed to production automatically.

## Preview Deployments for Pull Requests

Preview deployments are automatically enabled when you connect your GitHub repository to Vercel. Here's how they work:

### How Preview Deployments Work

1. **Create a new branch** in your repository
   ```bash
   git checkout -b feature-branch
   ```

2. **Make changes** to your code

3. **Commit and push** your changes
   ```bash
   git add .
   git commit -m "Your commit message"
   git push -u origin feature-branch
   ```

4. **Create a pull request** on GitHub from your branch to main

5. **Vercel automatically deploys** a preview environment
   - A unique URL is generated (e.g., `https://project-name-branchname-username.vercel.app`)
   - Vercel adds a comment to your PR with the preview URL
   - The preview is updated each time you push new commits to the branch

### Verifying Preview Deployments

To check if preview deployments are working:

1. Go to your Vercel dashboard
2. Select your project
3. Click on "Deployments" in the top navigation
4. Look for deployments with "Preview" environment

## Working with the Vercel CLI

The Vercel CLI allows you to manage your deployments from the command line.

### Installation

```bash
npm i -g vercel
```

### Linking a Project

```bash
vercel link
```

### Listing Deployments

```bash
vercel ls
```

### Creating a New Deployment

```bash
vercel
```

### Environment Variables

```bash
vercel env add
```

## Best Practices

1. **Use environment variables** for sensitive information
2. **Set up a custom domain** for production deployments
3. **Configure build settings** appropriately for your framework
4. **Use the `.vercel` directory** in your `.gitignore` file
5. **Review preview deployments** before merging pull requests

## Troubleshooting

If preview deployments aren't working:

1. Check if the GitHub integration is properly configured
2. Verify that the "Preview" environment is enabled in your project settings
3. Make sure your build process is successful
4. Check if there are any errors in the build logs

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Integration Guide](https://vercel.com/docs/concepts/git/vercel-for-github)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
