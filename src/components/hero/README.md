# Hero Geometric Component

A refactored hero section with floating geometric shapes, following separation of concerns principles.

## Structure

```
hero-geometric/
├── ElegantShape.tsx      # Individual floating shape component
├── FloatingShapes.tsx    # Container for all floating shapes
├── HeroBadge.tsx         # Logo badge component
├── HeroTitle.tsx         # Main title with custom font
├── HeroDescription.tsx   # Description text component
├── animations.ts         # Animation variants and configurations
├── shapes-config.ts      # Configuration for all floating shapes
├── index.ts             # Barrel exports
└── README.md            # This file
```

## Components

### ElegantShape
Individual floating shape with animation and styling.
- **Props**: className, delay, width, height, rotate, gradient
- **Responsibility**: Render single floating shape with animations

### FloatingShapes
Container component that renders all floating shapes based on configuration.
- **Props**: None (uses shapes-config.ts)
- **Responsibility**: Manage all floating shapes in the background

### HeroBadge
Logo and text badge component.
- **Props**: badge, custom, variants
- **Responsibility**: Display logo and badge text with animation

### HeroTitle
Main hero title with custom Pacifico font.
- **Props**: title1, title2, custom, variants
- **Responsibility**: Display main hero heading with gradient text

### HeroDescription
Description text component.
- **Props**: description, custom, variants
- **Responsibility**: Display hero description with animation

## Configuration Files

### animations.ts
Contains all animation variants:
- `fadeUpVariants`: Staggered fade-up animations for content
- `shapeAnimations`: Initial animations for shapes
- `floatingAnimation`: Continuous floating animation

### shapes-config.ts
Configuration array for all floating shapes:
- Position, size, rotation, gradient, and timing for each shape
- Easy to modify or add new shapes

## Usage

```tsx
import HeroGeometric from "./hero-geometric"

<HeroGeometric 
  badge="Your Brand"
  title1="Your Main"
  title2="Title"
  description="Your description text"
/>
```

## Benefits of This Structure

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be reused independently
3. **Maintainability**: Easy to modify individual parts without affecting others
4. **Testability**: Each component can be tested in isolation
5. **Configuration**: Shape and animation settings are externalized
6. **Type Safety**: Proper TypeScript interfaces for all components 