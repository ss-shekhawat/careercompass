// utils/razorpay.js

/**
 * Loads the Razorpay checkout script dynamically
 * FIXED: Now properly checks if Razorpay is actually available, not just if script tag exists
 * @returns {Promise<boolean>} Returns true if script loaded successfully and Razorpay is available
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    // ✅ FIX: Check if Razorpay is actually loaded and available on window object
    if (typeof window.Razorpay !== 'undefined') {
      resolve(true);
      return;
    }

    // Check if script tag already exists in the DOM
    const existingScript = document.getElementById('razorpay-script');

    if (existingScript) {

      // Script tag exists but Razorpay might not be loaded yet - wait for it
      const checkInterval = setInterval(() => {
        if (typeof window.Razorpay !== 'undefined') {
          clearInterval(checkInterval);
          resolve(true);
        }
      }, 100); // Check every 100ms

      // Timeout after 10 seconds to prevent infinite waiting
      setTimeout(() => {
        clearInterval(checkInterval);
        if (typeof window.Razorpay === 'undefined') {
          console.error("❌ Razorpay load timeout - script tag exists but Razorpay not available");
          resolve(false);
        }
      }, 10000);

      return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    script.onload = () => {
      // Double-check that Razorpay is actually available
      if (typeof window.Razorpay !== 'undefined') {
        resolve(true);
      } else {
        console.error("❌ Script loaded but Razorpay object not available on window");
        resolve(false);
      }
    };

    script.onerror = (error) => {
      console.error("❌ Failed to load Razorpay script:", error);
      resolve(false);
    };

    document.body.appendChild(script);
  });
};










