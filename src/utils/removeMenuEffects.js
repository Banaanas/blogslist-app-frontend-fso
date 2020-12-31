// Handle Close Side Menu - FUNCTION
// Remove Background Blur Effect and enable Scroll again
const removeMenuEffects = () => {
  // Remove Background Blur Effect
  const mainElement = document.querySelector("main");
  mainElement.style.filter = "blur(0)";

  // Enable Scroll again
  document.body.style.overflow = "visible";
};

export default removeMenuEffects;
