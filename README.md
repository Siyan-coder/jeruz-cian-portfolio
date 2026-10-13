# Cian Marco Jeruz - Personal Web Portfolio

A single-page personal portfolio website built with semantic **HTML5**, **CSS3**, and **JavaScript** for **CC107: Application Development (Web Platforms) - Activity 4**.

---

## 📁 Project Structure

```text
cian-jeruz-portfolio-html/
├── index.html            # Main HTML5 document with semantic markup
├── style.css             # Separate stylesheet (Flexbox/Grid, glassmorphism, responsive)
├── script.js             # Separate JavaScript file (fully commented interactive features)
├── README.md             # Project documentation and deployment guide
└── assets/               # Image assets (profile photo, project previews)
    ├── profile.jpg
    ├── project1.jpg
    ├── project2.png
    └── project3.png
```

---

## 🌟 Required Sections Checklist

- [x] **Header / Navigation (`<header>`, `<nav>`)**: Brand name (`Cian Marco Jeruz`), anchor links to each section, and responsive mobile hamburger menu.
- [x] **Hero / About Me (`<section id="about">`)**: Profile photo with glow border, student information from BulSu Main, and bio.
- [x] **Projects (`<section id="projects">`)**: 3 responsive project cards with preview images, category tags, titles, and descriptions:
  - *Lupon Cooperative Survey Management System*
  - *Cinephile - Cinema Booking System*
  - *Farewell, G2 Pubmat*
- [x] **Skills (`<section id="skills">`)**: Interactive glassmorphic badges showcasing key technical competencies.
- [x] **Contact (`<section id="contact">`)**: Interactive contact form with real-time field validation and email format checks.
- [x] **Footer (`<footer>`)**: Email (`mailto:ciandelacruz10@gmail.com`), GitHub link (`https://github.com/Siyan-coder`), and social handles.

---

## 💻 Technical Highlights

### 1. HTML5 Semantics & Accessibility
- Proper semantic tags throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`).
- `<meta name="viewport">` included for standard mobile rendering.
- Descriptive `alt` attributes on all images.
- ARIA attributes (`aria-expanded`, `aria-controls`, `aria-label`, `role="alert"`) for accessibility.

### 2. CSS3 Layout & Responsiveness
- **Layout**: Flexbox and CSS Grid used for navigation, hero section, project cards, and footer.
- **Theme**: Blue glassmorphism aesthetic with CSS custom properties (`:root`), translucent frosted cards (`backdrop-filter`), and luminous glow effects.
- **Zero Inline Styles**: All styling is exclusively contained within `style.css`.
- **Responsive**: `@media` queries optimized for desktop, tablet, and mobile screens.

### 3. JavaScript Interactivity (`script.js`)
- **Mobile Hamburger Menu**: Accessible toggle that shows/hides the drawer menu and auto-closes when links or outside areas are tapped.
- **Form Validation**: Real-time and on-submit validation for Name, valid Email syntax (via regex), and Message length with feedback banners.
- **ScrollSpy Navigation**: Automatically highlights active navigation tabs as the user scrolls down the page.
- **Code Quality**: 100% of functions and event handlers are comprehensively commented.

---

## 🚀 How to Deploy to GitHub Pages (Bonus +5 pts)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete Activity 4 web portfolio in HTML, CSS, JS"
   git remote add origin https://github.com/Siyan-coder/jeruz-cian-portfolio.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository: [https://github.com/Siyan-coder/jeruz-cian-portfolio](https://github.com/Siyan-coder/jeruz-cian-portfolio)
   - Click **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Branch**, select `main` and `/ (root)`.
   - Click **Save**.
   - After 1–2 minutes, your live portfolio will be available at:
     `https://siyan-coder.github.io/jeruz-cian-portfolio/`
