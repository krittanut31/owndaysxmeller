# Email Template: Frontend Developer Test Assignment

---

## Subject Line

Frontend Developer Test — OWNDAYS x MELLER Product Page

---

## Email Body

Hi [Candidate Name],

Thank you for your interest in the Frontend Developer position. We'd like to move forward with a technical assessment to better understand your skills.

### Assignment

Build a responsive product listing page for the "OWNDAYS x MELLER" sunglasses collection based on the provided Figma design and API data.

Full assignment: https://github.com/frontend-otm/api/blob/main/meller/FRONTEND_TEST.md

### Resources

| Resource | Link |
|----------|------|
| Figma Design | https://www.figma.com/design/rB6UnnDhxpDhJevd8UHEVV/OWNDAYS-x-MELLER?m=dev |
| Products API | https://api-one-alpha-60.vercel.app/meller/products.json |
| API Documentation | https://github.com/frontend-otm/api/blob/main/meller/PRODUCTS_README.md |

**Image Base URL:** Prepend `https://storage.owndays.com/storage/` to all image `path` values from the API.

### Requirements Summary

- Responsive layout (Desktop: 3-column grid / Mobile: single column)
- Navigation bar with desktop text links and mobile hamburger menu
- Product cards displaying image, model name, color swatches, and price
- Product detail modal with image carousel, SKU switching, and product info
- "HOW TO STYLE THEM" horizontal scrollable section
- "ONLINE STORE" button with hover and out-of-stock states

### Tech Stack

You're free to choose your preferred stack. Suggested options:
- Framework: React / Next.js / Vue
- Styling: Tailwind CSS / CSS Modules / Styled Components

### Submission

- Provide a GitHub repository link (or zip file)
- Include a README with setup/run instructions
- Deployment to Vercel or Netlify is a bonus

### Timeline

Please submit your completed work within **7 days** from receiving this email. If you need additional time, let us know in advance.

### Evaluation Criteria

We will assess your submission based on:
1. **Pixel accuracy** — Fidelity to the Figma design
2. **Responsiveness** — Correct behavior across breakpoints
3. **Interactivity** — Smooth modal, carousel, and state management
4. **Code quality** — Clean architecture, TypeScript types, reusable components
5. **Performance** — Efficient rendering and image handling

### Notes

- No backend implementation is required — fetch directly from the provided API
- Focus on the product listing page; the "ABOUT" and "STORES" navigation links can be placeholder anchors
- If you have any questions about the design or requirements, feel free to reply to this email

Good luck! We look forward to reviewing your work.

Best regards,
[Your Name]
[Company Name]
