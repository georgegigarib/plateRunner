# 🚗 Plates Runner

A dynamic license plate queue application with animated car displays. Create custom plate lists, set intervals, and watch cars drive by with your plates.

## ✨ Features

### 🏠 Home Screen
- **My Plate Lists**: Access your saved plate lists
- **Run Random Plates**: Quick start with randomly generated plates

### 📋 Lists Management
- **Create Lists**: Name and color-code your plate collections
- **Random List Generator**: Auto-generate lists with random plates (5-8 characters)
- **Persistent Storage**: All lists saved to localStorage

### 📝 List Detail / Editor
- **Single Input**: Add plates one at a time (Enter/Tab to submit)
- **Bulk Import**: Paste multiple plates (comma/space/newline separated)
- **Random Plate**: Generate random plates with one click
- **Drag & Drop**: Reorder plates by dragging
- **Inline Edit**: Click any plate to edit
- **Delete Plates**: Remove individual plates
- **Color Picker**: Change list color anytime
- **Interval Control**: Set seconds between cars (default: 30s)
- **Play Button**: Start the playback

### 🎬 Playback Screen
- **Animated Cars**: SVG car silhouettes drive from bottom to top
- **Color Cycling**: Each car gets a different color
- **License Plates**: Displayed on the back of each car
- **Highway Effect**: Animated road lines for immersion

#### Controls
| Button | Function |
|--------|----------|
| ⏸/▶️ | Pause/Resume (preserves exact position) |
| 🔄 | Restart from beginning |
| ⏭️ | Skip to next plate |
| 🔂 | Repeat current plate indefinitely |
| ♾️ | Toggle infinite loop mode |
| 🏠 | Exit to home |
| 🚦 Speed Sign | Click to edit interval time |

### 📊 End of List
- When not infinite: Dialog asks to repeat or go home
- When infinite: Loops back to first plate automatically

## 🏗️ Project Structure

```
src/
├── components/
│   ├── car/
│   │   └── CarSilhouette.tsx    # SVG car with plate overlay
│   ├── lists/
│   │   ├── ListCard.tsx         # List preview card
│   │   └── ListColorPicker.tsx  # Color selection
│   ├── plates/
│   │   ├── PlateInput.tsx       # Single plate input
│   │   ├── PlateItem.tsx        # Draggable plate item
│   │   ├── PlateListEditor.tsx  # DnD plate list
│   │   └── PlateTextarea.tsx    # Bulk import
│   ├── playback/
│   │   ├── PlaybackControls.tsx # Control buttons
│   │   └── SpeedControl.tsx     # Traffic sign input
│   └── ui/                      # shadcn components
├── hooks/
│   └── use-mobile.tsx           # Mobile detection
├── lib/
│   ├── plateUtils.ts            # Plate generation & helpers
│   ├── storage.ts               # localStorage operations
│   └── utils.ts                 # General utilities
├── pages/
│   ├── Home.tsx                 # Landing page
│   ├── Lists.tsx                # All lists view
│   ├── ListDetail.tsx           # List editor
│   ├── Playback.tsx             # Car animation
│   └── NotFound.tsx             # 404 page
├── types/
│   └── index.ts                 # TypeScript interfaces
├── App.tsx                      # Router setup
├── main.tsx                     # Entry point
└── index.css                    # Design system & animations
```

## 🎨 Design System

- **Theme**: Night highway aesthetic
- **Primary Color**: Amber (traffic light inspired)
- **Accent Color**: Green (go signal)
- **Typography**: Orbitron (display), Inter (body)
- **Components**: Glass cards, traffic sign controls, license plate styling

## 🔧 Technologies

- **React 18** + TypeScript
- **Tailwind CSS** + shadcn/ui
- **Framer Motion** for animations
- **dnd-kit** for drag & drop
- **React Router** for navigation
- **localStorage** for persistence

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open http://localhost:5173

## 📱 Usage

1. **Create a list**: Go to Lists → New List → Add plates
2. **Set interval**: Adjust the speed sign (seconds between cars)
3. **Play**: Hit the play button and watch the cars
4. **Controls**: Pause, skip, repeat, or toggle infinite loop

---

Built with ❤️ for license plate enthusiasts
