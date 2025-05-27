# Colorful Text Component

A stunning animated text component that displays each character with dynamic color transitions, blur effects, and smooth animations. Based on the Aceternity UI Colorful Text component.

## Features

- 🌈 Dynamic color animations for each character
- ✨ Smooth blur and scale effects
- 🎨 Pre-defined vibrant color palette
- ⚡ Built with Framer Motion for smooth animations
- 🔄 Auto-shuffling colors every 5 seconds
- 📱 Responsive and accessible

## Installation

The component is already installed and ready to use. It uses the following dependencies:

- `framer-motion` (already installed)
- `react` (already installed)

## Basic Usage

```tsx
import { ColourfulText } from "../../../shared/components";

function App() {
  return (
    <h1 className="text-4xl font-bold">
      <ColourfulText text="Hello World!" />
    </h1>
  );
}
```

## Advanced Usage Examples

### Hero Section

```tsx
<section className="text-center py-16">
  <h1 className="text-6xl font-bold mb-4">
    <ColourfulText text="Doppelherz Health Metric" />
  </h1>
  <p className="text-xl text-gray-600">Transform your health journey</p>
</section>
```

### Feature Headlines

```tsx
<div className="grid md:grid-cols-3 gap-8">
  <div className="text-center">
    <h3 className="text-2xl font-semibold mb-3">
      <ColourfulText text="Track Progress" />
    </h3>
  </div>
  <div className="text-center">
    <h3 className="text-2xl font-semibold mb-3">
      <ColourfulText text="Get Insights" />
    </h3>
  </div>
  <div className="text-center">
    <h3 className="text-2xl font-semibold mb-3">
      <ColourfulText text="Stay Healthy" />
    </h3>
  </div>
</div>
```

### Call to Action

```tsx
<button className="bg-blue-600 text-white px-8 py-3 rounded-lg">
  <ColourfulText text="Get Started" />
</button>
```

## Props

### ColourfulText

| Prop   | Type     | Description                                                      | Required |
| ------ | -------- | ---------------------------------------------------------------- | -------- |
| `text` | `string` | The text string to be rendered with colorful animated characters | Yes      |

## Color Palette

The component uses a predefined set of vibrant colors:

- `rgb(131, 179, 32)` - Green
- `rgb(47, 195, 106)` - Emerald
- `rgb(42, 169, 210)` - Sky Blue
- `rgb(4, 112, 202)` - Blue
- `rgb(107, 10, 255)` - Purple
- `rgb(183, 0, 218)` - Magenta
- `rgb(218, 0, 171)` - Pink
- `rgb(230, 64, 92)` - Red
- `rgb(232, 98, 63)` - Orange
- `rgb(249, 129, 47)` - Amber

## Animation Details

- **Duration**: 0.5 seconds per character
- **Delay**: 0.05 seconds between characters (staggered effect)
- **Effects**: Color change, vertical movement (-3px), scale (1.01x), blur (5px), opacity (0.8)
- **Color Shuffle**: Every 5 seconds, colors are randomly shuffled
- **Transition**: Smooth easing with Framer Motion

## Customization

### Custom Colors

To modify the color palette, edit the `colors` array in the component:

```tsx
const colors = [
  "rgb(255, 0, 0)", // Red
  "rgb(0, 255, 0)", // Green
  "rgb(0, 0, 255)", // Blue
  // Add more colors...
];
```

### Animation Timing

Modify animation timing in the component:

```tsx
React.useEffect(() => {
  const interval = setInterval(() => {
    // Shuffle logic
  }, 3000); // Change from 5000ms to 3000ms for faster shuffling
}, [colors]);
```

### Character Animation

Customize individual character animations:

```tsx
animate={{
  color: currentColors[index % currentColors.length],
  y: [0, -5, 0],        // Increase vertical movement
  scale: [1, 1.05, 1],  // Increase scale effect
  filter: ["blur(0px)", "blur(3px)", "blur(0px)"], // Reduce blur
  opacity: [1, 0.9, 1], // Adjust opacity
}}
transition={{
  duration: 0.8,        // Slower animation
  delay: index * 0.1,   // More delay between characters
}}
```

## Performance Notes

- Each character is rendered as a separate `motion.span` for individual animation
- Colors are shuffled every 5 seconds to create dynamic effects
- Component automatically cleans up intervals on unmount
- Optimized for smooth 60fps animations

## Accessibility

- Maintains original text content for screen readers
- Uses semantic HTML with proper spacing
- Respects user's reduced motion preferences (consider adding)

## Browser Support

- Modern browsers with CSS transforms support
- Works with React 18+
- Requires JavaScript enabled for animations

## File Structure

```
src/shared/components/
├── ColourfulText.tsx                 # Main component
├── index.ts                          # Export from here
└── ...

src/features/home/components/
├── ColourfulTextDemo.tsx             # Full demo page
├── ColourfulTextExample.tsx          # Practical examples
└── ...
```

## Examples in Project

### For Headers

```tsx
<h1 className="text-5xl font-bold">
  <ColourfulText text="Health Dashboard" />
</h1>
```

### For Buttons

```tsx
<button className="bg-purple-600 text-white px-6 py-3 rounded-lg">
  <ColourfulText text="Start Survey" />
</button>
```

### For Feature Highlights

```tsx
<div className="text-center">
  <h2 className="text-3xl font-semibold mb-4">
    <ColourfulText text="Track Your Progress" />
  </h2>
</div>
```

## Best Practices

1. **Use for Headlines**: Perfect for main titles and important text
2. **Keep Text Short**: Works best with shorter text strings
3. **Consider Context**: Use sparingly to avoid overwhelming users
4. **Test Performance**: Monitor performance with longer text strings
5. **Responsive Design**: Test across different screen sizes

## Troubleshooting

### Animation not working

- Ensure Framer Motion is installed and imported correctly
- Check that the component is properly imported
- Verify React version compatibility

### Performance issues

- Limit the length of text strings
- Consider reducing animation frequency
- Test on lower-end devices

### Color not changing

- Check that the useEffect is running
- Verify the colors array is properly defined
- Ensure component is not being unmounted/remounted frequently
