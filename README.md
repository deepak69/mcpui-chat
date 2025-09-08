# MCP UI Chat Interface

A Next.js application that provides a chat interface for building UI components with AI assistance using MCP UI integration.

## Features

- **Interactive Chat Interface**: Clean, minimal chat UI with message history and timestamps
- **Smooth Animations**: Framer Motion powered transitions between chat and canvas views
- **Dynamic Component Rendering**: MCP UI components rendered in real-time based on chat interactions
- **Responsive Design**: Mobile-friendly interface that adapts to different screen sizes
- **Progressive Enhancement**: Start with simple components and build up to complex layouts

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: JavaScript (JSX) - No TypeScript
- **Styling**: SCSS Modules
- **Animations**: Framer Motion
- **UI Components**: Custom MCP UI renderer

## Project Structure

```
src/app/
├── components/
│   ├── Chat/
│   │   ├── Chat.jsx
│   │   └── Chat.module.scss
│   ├── Canvas/
│   │   ├── Canvas.jsx
│   │   └── Canvas.module.scss
│   └── MCPRenderer/
│       ├── MCPRenderer.jsx
│       └── MCPRenderer.module.scss
├── styles/
│   ├── globals.scss
│   └── variables.scss
├── layout.js
└── page.js
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Chat Interface
- Type messages in the input field at the bottom
- Ask for specific components like "Create a login form" or "Build a dashboard"
- The AI will respond and generate MCP UI components

### Canvas Area
- Automatically opens when AI generates components
- Displays rendered MCP UI components
- Close button returns to full-width chat view
- Components are interactive and responsive

### Supported Component Types

1. **Forms**: Login, signup, contact forms
2. **Dashboards**: Admin panels with widgets and charts
3. **Cards**: Profile cards, product cards, content cards
4. **Tables**: Data tables with sorting and filtering

## Example Interactions

```
User: "Create a login form"
AI: "I'll create a form component for you!"
→ Canvas opens with a login form component

User: "Add a dashboard"
AI: "I'll create a dashboard layout for you!"
→ Dashboard component added to canvas
```

## Component Props

### Form Component
```javascript
{
  type: 'form',
  props: {
    fields: ['email', 'password'],
    title: 'Login Form',
    submitText: 'Sign In'
  }
}
```

### Dashboard Component
```javascript
{
  type: 'dashboard',
  props: {
    title: 'Admin Dashboard',
    widgets: ['stats', 'charts', 'recent-activity']
  }
}
```

### Card Component
```javascript
{
  type: 'card',
  props: {
    title: 'User Profile',
    content: 'This is a sample card component',
    image: 'https://via.placeholder.com/300x200'
  }
}
```

### Table Component
```javascript
{
  type: 'table',
  props: {
    headers: ['Name', 'Email', 'Role', 'Status'],
    data: [
      ['John Doe', 'john@example.com', 'Admin', 'Active'],
      ['Jane Smith', 'jane@example.com', 'User', 'Active']
    ]
  }
}
```

## Styling

The application uses SCSS modules for component-scoped styling with:
- CSS variables for consistent theming
- Responsive breakpoints for mobile/tablet/desktop
- Smooth transitions and hover effects
- Modern design patterns

## Animation Details

- **Chat Transition**: Spring animation when moving from centered to aside position
- **Canvas Slide**: Smooth slide-in from right with backdrop overlay
- **Component Rendering**: Fade-in animation for new components
- **Typing Indicator**: Animated dots during AI response

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### Adding New Component Types

1. Add component definition to `MCPComponents` object in `MCPRenderer.jsx`
2. Create corresponding SCSS styles in `MCPRenderer.module.scss`
3. Update the `generateAIResponse` function in `Chat.jsx` to recognize new patterns

### Customizing Styles

- Modify `variables.scss` for global color and spacing changes
- Update component-specific SCSS modules for individual component styling
- Use CSS custom properties for runtime theme switching

## License

MIT License - feel free to use this project for your own applications.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions, please open an issue on the GitHub repository.