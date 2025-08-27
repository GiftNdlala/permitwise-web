# PermitWise Theme System

## Overview

The PermitWise application now features a comprehensive theme system that provides consistent light and dark themes across all components and pages. The system is designed with light theme as the default, ensuring optimal user experience and accessibility.

## Features

### 🎨 **Dual Theme Support**
- **Light Theme (Default)**: Clean, modern interface optimized for daytime use
- **Dark Theme**: Sophisticated dark interface for low-light environments

### 🔄 **Persistent Theme Selection**
- User theme preferences are automatically saved to localStorage
- Theme selection persists across browser sessions
- Seamless theme switching without page reload

### 🎯 **Consistent Design Language**
- Unified color palette across all components
- Consistent spacing, typography, and visual hierarchy
- Smooth transitions between theme states

## Architecture

### Theme Context (`src/context/ThemeContext.jsx`)
- Centralized theme state management
- Provides theme values and toggle functions
- Automatically applies theme to document root
- Handles theme persistence

### CSS Variables System
- Theme-specific CSS variables for colors, shadows, and spacing
- Automatic theme switching via `data-theme` attribute
- Consistent variable naming convention

### Component Integration
- All components use `useTheme()` hook for theme access
- Automatic theme-aware styling
- Responsive design considerations for both themes

## Usage

### Basic Theme Usage
```jsx
import { useTheme } from '../context/ThemeContext';

const MyComponent = () => {
  const { theme, toggleTheme, isLight, isDark } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Switch to {isLight ? 'dark' : 'light'} mode
    </button>
  );
};
```

### Theme Toggle Button
```jsx
<button className="theme-toggle" onClick={toggleTheme}>
  {isLight ? <MdDarkMode /> : <MdLightMode />}
</button>
```

## Theme Variables

### Core Colors
- `--bg`: Background color
- `--surface`: Surface/container background
- `--text`: Primary text color
- `--muted`: Secondary/muted text color
- `--primary`: Primary brand color
- `--accent`: Accent color
- `--success`: Success state color
- `--warning`: Warning state color
- `--danger`: Error/danger color

### UI Elements
- `--card-bg`: Card background
- `--card-border`: Card borders
- `--input-bg`: Input field background
- `--input-border`: Input field borders
- `--border`: General borders

### Interactive States
- `--background-light`: Light background for hover states
- `--background-hover`: Hover state background
- `--shadow`: Default shadow
- `--shadow-lg`: Large shadow for elevated elements

## Implementation Details

### Theme Provider Setup
The `ThemeProvider` wraps the entire application in `App.js`:

```jsx
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          {/* Routes */}
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### CSS Variable Application
Theme variables are applied via the `data-theme` attribute on the document root:

```css
[data-theme="light"] {
  --bg: #f8fafc;
  --surface: #ffffff;
  /* ... other light theme variables */
}

[data-theme="dark"] {
  --bg: #1e1e2d;
  --surface: #0f0f0f;
  /* ... other dark theme variables */
}
```

## Branding Integration

### PermitWise Brand Elements
- **Logo**: Traffic light emoji (🚦) with gradient text
- **Typography**: Inter font family for modern readability
- **Color Scheme**: Blue-based primary colors with consistent accents
- **Visual Identity**: Clean, professional design language

### Brand Consistency
- Consistent branding across all pages and components
- Unified header and sidebar branding
- Professional appearance suitable for government applications

## Accessibility Features

### High Contrast Support
- Optimized color ratios for both themes
- Clear visual hierarchy and focus states
- Consistent interactive element styling

### Keyboard Navigation
- Proper focus management
- Visible focus indicators
- Logical tab order

## Browser Compatibility

### Supported Browsers
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

### Fallback Support
- Graceful degradation for older browsers
- CSS custom properties fallbacks
- Progressive enhancement approach

## Performance Considerations

### Optimized Transitions
- Hardware-accelerated CSS transitions
- Minimal reflow/repaint during theme switches
- Efficient theme variable updates

### Bundle Size
- Minimal impact on JavaScript bundle
- CSS variables for efficient theme switching
- No additional dependencies required

## Future Enhancements

### Planned Features
- System theme detection (follows OS preference)
- Custom theme creation
- Theme-specific component variants
- Advanced color palette options

### Extensibility
- Easy addition of new themes
- Component-level theme customization
- Plugin system for theme extensions

## Troubleshooting

### Common Issues
1. **Theme not persisting**: Check localStorage permissions
2. **Inconsistent styling**: Verify CSS variable usage
3. **Performance issues**: Check for excessive transitions

### Debug Mode
Enable theme debugging by adding to console:
```javascript
localStorage.setItem('permitwise-theme', 'light'); // Force light theme
localStorage.setItem('permitwise-theme', 'dark');  // Force dark theme
```

## Contributing

When adding new components or modifying existing ones:

1. Use theme variables instead of hardcoded colors
2. Test both light and dark themes
3. Ensure proper contrast ratios
4. Follow the established design patterns
5. Update this documentation if needed

---

For technical support or questions about the theme system, please refer to the component documentation or contact the development team.
