# Angelicafe M. Dela Cruz — Personal Portfolio

A modern, responsive **white-pink portfolio** for Angelicafe M. Dela Cruz, an **Office Administration student**. She also shares her journey balancing work and studies. Built with **HTML, CSS, and vanilla JavaScript**; no installation or database required.

## Open with Visual Studio Code

1. Extract `Angelicafe_Pink_Portfolio.zip`.
2. Open **Visual Studio Code → File → Open Folder** and select `angelicafe-pink-portfolio`.
3. Install the **Live Server** extension (optional).
4. Right-click `index.html` and choose **Open with Live Server**, or open `index.html` in your browser directly.

## Add Angelicafe's picture

1. Get permission to use her photo.
2. Add the photo to the `assets` folder.
3. Name it **`angelicafe.jpg`** (lowercase, exact spelling).
4. Refresh the webpage. The pink `A.` placeholder automatically becomes the real picture.

If the image is PNG instead of JPG, edit `index.html` and change `src="assets/angelicafe.jpg"` to `src="assets/angelicafe.png"`. A generic placeholder (`profile-placeholder.svg`) is included; it is **not** a real photo of Angelicafe.

## Edit personal details

- `index.html`: name, course, short intro, About Me, skills, favorite activities, and footer.
- `style.css`: white-pink / blush-pink colors and animations. Search for `ANGELICAFE / WHITE + BLUSH PINK EDITION` near the bottom.
- `script.js`: favorite activity popup details and configured email recipient (`SETTINGS.contactEmail`).
- `assets/favorite-*.svg`: editable preview graphics for travel, movies, and cafés.

The **favorite activities and personal descriptions are suggested/sample text**, so please confirm that they match Angelicafe's actual hobbies and experience before publishing.

## Social media links

Both the **sidebar** (compact icons) and **Contact** page (four labeled cards) provide clickable links:

- Facebook: https://www.facebook.com/itsmecafffee
- Instagram: https://www.instagram.com/ur_caffee/
- TikTok: https://www.tiktok.com/@itsmecaffee?lang=en
- Gmail: https://mail.google.com/mail/?view=cm&fs=1&to=aisat.delacruz256666%40gmail.com

Facebook, Instagram, and TikTok open their profile pages in a new browser tab. Gmail opens a pre-addressed compose window (Google may ask visitors to sign in). These are public-facing links; make sure Angelicafe is comfortable sharing them before publishing.

The profile/sidebar subtitle now says **Office Administration** only. The Home and About sections still mention her working-student journey.

## Contact form (important)

- The form only **prepares an email draft** in the visitor's email app. It does not send messages by itself.
- **Prepare Email** now uses `aisat.delacruz256666@gmail.com` as the recipient. The visitor still needs to press Send in their mail app.
- The **Copy Message** button is also available.
- The unwanted `script.js` help text underneath **Prepare Email** has been removed from the visible website.

## Features

- Sticky desktop sidebar with responsive mobile navigation
- Optional photo with automatic fallback
- White-pink and blush-pink theme toggle (saves preference)
- Smooth scrolling, active section indicators, scroll progress, reveal and floating animations
- Three illustrated favorite-activity cards with clickable popups
- Responsive contact form, keyboard focus styles, and reduced-motion accessibility

## Folder layout

```text
angelicafe-pink-portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── favicon.svg
    ├── profile-placeholder.svg
    ├── favorite-travel.svg
    ├── favorite-movies.svg
    ├── favorite-cafes.svg
    └── angelicafe.jpg           (add her actual photo here)
```

The last item is not included because her photo hasn't been supplied yet.


## Photo Support

The portfolio already includes Angelicafe's profile and hero photos inside the `assets` folder, so no extra image setup is needed after extracting the ZIP.


## Latest Update

The hero section now uses a larger full photo of Angelicafe, and the sidebar profile photo has been centered for a cleaner look.


## Updated portrait alignment

The profile portrait is cropped with the face centered. The Home hero uses a larger circular photo while keeping the decorative elements and positioning the Small Steps Big Dreams card next to the photo.
