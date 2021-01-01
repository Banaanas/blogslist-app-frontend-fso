// Handle Close Side Menu - FUNCTION
// Remove Background Blur Effect and enable Scroll again
const removeMenuEffects = () => {
  // Remove Background Blur Effect
  document.querySelector("main").style.filter = "blur(0)";
  document.querySelector("footer").style.filter = "blur(0)";

  // Enable Scroll again
  document.body.style.overflow = "visible";
};

export default removeMenuEffects;
