# Calendar Design - Pixel Perfect Implementation

This project is a pixel-perfect implementation of a calendar design from Figma, recreated using HTML and CSS.

## Features

- **Exact Figma Reproduction**: Built to match the original Figma design specifications exactly
- **Responsive Layout**: 400x827px container with proper scrolling behavior
- **Dark Theme**: Professional dark color scheme matching the design
- **November 2023 Calendar**: Shows the specific month from the Figma design
- **Selected Date Highlight**: Day 16 is highlighted with blue accent color
- **Interactive Elements**: Hover effects for navigation arrows and calendar icon
- **Previous/Next Month Dates**: Properly styled dates from adjacent months

## Design Specifications

### Colors
- Background: `#0D0D0D`
- Header Background: `#171717`
- Border Color: `#242424`
- Text Color (Current Month): `#969696`
- Text Color (Other Months): `rgba(187, 187, 187, 0.6)`
- Selected Day Background: `#2525E6`
- White Text: `#FFFFFF`

### Typography
- Primary Font: Inter
- Header Font: Euclid Circular B (fallback to Inter)
- Header Font Size: 16px, Weight: 600
- Day Headers: 7.58px, Weight: 500
- Calendar Days: 9.94px, Weight: 500

### Layout
- Container: 400px × 827px
- Header: 50px height
- Calendar Grid: 7 columns × 8 rows (including headers)
- Each Day Cell: 50px × 91.2px

## File Structure

```
calendar-2/
├── index.html          # Main HTML structure
├── style.css          # All CSS styling
├── assets/            # Downloaded Figma assets
│   ├── arrow-left.svg
│   ├── arrow-right.svg
│   └── calendar-icon-2.svg
└── README.md          # This documentation
```

## How to View

Simply open `index.html` in any modern web browser. The calendar is designed to display exactly as shown in the Figma design.

## Browser Compatibility

- Chrome/Chromium
- Safari
- Firefox
- Edge

All modern browsers supporting CSS Grid and Flexbox.

## Original Design

This implementation is based on the Figma design located at:
https://www.figma.com/design/pUYktG5jFviKwkUsQgbl5o/Recruitment?node-id=18-914

The design has been recreated with pixel-perfect accuracy, including exact positioning, colors, fonts, and spacing as specified in the Figma file.
