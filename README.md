# 3D Frontend Experience

A modern, interactive 3D website built with React, Three.js, and React Three Fiber. This project demonstrates advanced 3D web development techniques including interactive objects, particle systems, dynamic lighting, and responsive design.

## 🚀 Features

- **Interactive 3D Objects**: Click and hover on cubes, spheres, and torus shapes
- **Particle System**: Dynamic floating particles with color variations
- **Advanced Lighting**: Multiple light sources with shadows
- **Smooth Animations**: Spring-based animations using React Spring
- **Performance Monitoring**: Real-time FPS and memory usage tracking
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Glass-morphism design with smooth transitions

## 🛠️ Technologies Used

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **React Spring** - Spring-physics based animations

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 3DFrontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎮 Controls

- **Mouse**: Rotate the camera around the scene
- **Scroll**: Zoom in and out
- **Right-click + Drag**: Pan the camera
- **Click Objects**: Interact with 3D objects (cubes, spheres, torus)
- **Info Panel**: Click the info button (ℹ) on the right to see detailed controls
- **Performance Monitor**: Click the chart icon (📊) on the left to view performance stats

## 🏗️ Project Structure

```
src/
├── components/
│   ├── 3d/
│   │   ├── Cube.jsx          # Interactive rotating cube
│   │   ├── Sphere.jsx        # Floating sphere with animations
│   │   ├── Torus.jsx         # Interactive torus shape
│   │   ├── Particles.jsx     # Particle system
│   │   └── Lighting.jsx      # Scene lighting setup
│   ├── ui/
│   │   ├── Navigation.jsx    # Top navigation bar
│   │   ├── InfoPanel.jsx     # Information sidebar
│   │   └── PerformanceMonitor.jsx # Performance tracking
│   └── Scene3D.jsx           # Main 3D scene component
├── App.jsx                   # Main application component
├── App.css                   # Application styles
└── index.css                 # Global styles
```

## 🎨 Customization

### Adding New 3D Objects

1. Create a new component in `src/components/3d/`
2. Import and add it to `Scene3D.jsx`
3. Use React Three Fiber's mesh components and Three.js geometries

### Modifying Animations

- Edit spring configurations in individual components
- Adjust `useFrame` callbacks for custom animations
- Modify particle behavior in `Particles.jsx`

### Styling

- Update CSS custom properties in `index.css` for theme changes
- Modify component-specific styles in their respective CSS files

## 🚀 Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

Requires WebGL support for 3D rendering.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.
