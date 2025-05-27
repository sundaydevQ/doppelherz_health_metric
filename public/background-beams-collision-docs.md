# Background Beams with Collision Component

A stunning animated background component featuring light beams that fall from the top and explode when they hit the bottom. Based on the Aceternity UI component with the same name.

## Features

- ✨ Animated light beams falling from top to bottom
- 💥 Explosion effects when beams collide with the bottom
- 🎨 Customizable beam properties (speed, delay, size, position)
- 📱 Responsive design
- ⚡ Built with Framer Motion for smooth animations

## Installation

The component is already installed and ready to use. It uses the following dependencies:

- `framer-motion` (already installed)
- `clsx` (already installed)
- `tailwind-merge` (already installed)

## Basic Usage

```tsx
import { BackgroundBeamsWithCollision } from "../../../shared/components";

function App() {
  return (
    <BackgroundBeamsWithCollision>
      <h1 className="text-4xl font-bold text-center">Your content here</h1>
    </BackgroundBeamsWithCollision>
  );
}
```

## Advanced Usage

### Custom Height

```tsx
<BackgroundBeamsWithCollision className="h-screen">
  <div>Full screen background</div>
</BackgroundBeamsWithCollision>
```

### With Custom Styling

```tsx
<BackgroundBeamsWithCollision className="h-[60rem] bg-gradient-to-r from-blue-50 to-purple-50">
  <div className="max-w-4xl mx-auto p-8">
    <h1>Custom background gradient</h1>
  </div>
</BackgroundBeamsWithCollision>
```

## Props

### BackgroundBeamsWithCollision

| Prop        | Type              | Description                                 | Default     |
| ----------- | ----------------- | ------------------------------------------- | ----------- |
| `children`  | `React.ReactNode` | Content to be rendered inside the component | Required    |
| `className` | `string`          | Additional CSS classes for the container    | `undefined` |

## Beam Configuration

The component comes with pre-configured beams, but you can modify them in the source code:

```tsx
const beams = [
  {
    initialX: 10, // Starting X position
    translateX: 10, // Ending X position
    duration: 7, // Animation duration in seconds
    repeatDelay: 3, // Delay between repeats
    delay: 2, // Initial delay
    className: "h-6", // Custom classes for beam height
  },
  // ... more beam configurations
];
```

## Customization

### Beam Colors

Modify the beam gradient in the component:

```tsx
className = "bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent";
```

### Explosion Colors

Modify the explosion colors:

```tsx
className = "bg-gradient-to-b from-indigo-500 to-purple-500";
```

### Background

Change the background gradient:

```tsx
className =
  "bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800";
```

## Examples

### Health Dashboard Hero Section

```tsx
<BackgroundBeamsWithCollision className="h-[40rem]">
  <div className="max-w-2xl mx-auto p-4 text-center">
    <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white">
      Doppelherz Health Metric
    </h1>
    <p className="text-xl text-neutral-700 dark:text-neutral-200 mt-6">
      Advanced health tracking with stunning visuals
    </p>
  </div>
</BackgroundBeamsWithCollision>
```

### Landing Page Section

```tsx
<BackgroundBeamsWithCollision className="h-screen">
  <div className="flex flex-col items-center justify-center h-full">
    <h2 className="text-5xl font-bold mb-8">Transform Your Health Journey</h2>
    <button className="px-8 py-4 bg-purple-600 text-white rounded-lg">
      Get Started
    </button>
  </div>
</BackgroundBeamsWithCollision>
```

## File Structure

```
src/shared/components/
├── BackgroundBeamsWithCollision.tsx  # Main component
├── index.ts                          # Export from here
└── ...

src/features/home/components/
├── BackgroundBeamsDemo.tsx           # Demo implementation
├── BeamsExample.tsx                  # Usage example
└── ...
```

## Performance Notes

- The component uses `setInterval` for collision detection (runs every 50ms)
- Animations are hardware-accelerated via Framer Motion
- Component automatically cleans up intervals and timeouts
- Optimized for both desktop and mobile devices

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Works with React 18+
- Requires JavaScript enabled

## Troubleshooting

### Beams not visible

- Check if the container has sufficient height
- Ensure proper contrast between beam colors and background
- Verify that `overflow: hidden` is not hiding the beams

### Performance issues

- Reduce the number of beams in the configuration
- Increase the interval delay in collision detection
- Consider using `transform3d` for better GPU acceleration

## Contributing

To modify the component:

1. Edit `src/shared/components/BackgroundBeamsWithCollision.tsx`
2. Test with the demo components
3. Update this documentation if needed
