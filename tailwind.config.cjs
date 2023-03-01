/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#0788DE",
      },
    },
  },
  keyframes: {
    hide: {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },
    slideIn: {
      from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
      to: { transform: 'translateX(0))' },
    },
    swipeOut: {
      from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
      to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
    },
    overlayShow: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    contentShow: {
      from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
      to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
    },
  },
  animation: {
    hide: 'hide 100ms ease-in',
    slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    swipeOut: 'swipeOut 100ms ease-out',
    overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
  plugins: [],
};
