export async function loadConfig() {
  try {
    const response = await fetch("/config.json", { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`config.json HTTP ${response.status}`);
    }
    const allConfigs = await response.json();

    const hostname = window.location.hostname;
    let envKey = "local";

    if (hostname.startsWith("stage.")) envKey = "stage";
    else if (hostname.startsWith("dev.")) envKey = "dev";
    else if (hostname.endsWith("vercel.app")) envKey = "prod";

    const chosen = allConfigs[envKey] || allConfigs.local;

    if (!chosen || !chosen.API_BASE_URL) {
      console.error(
        "⚠️ Config loaded but API_BASE_URL missing. envKey =",
        envKey,
        "allConfigs =",
        allConfigs,
      );
      // Hard-coded fallback so the app still functions if config.json is malformed.
      window.RUNTIME_CONFIG = {
        API_BASE_URL: "https://careercompass-api-iiai.onrender.com",
        ENV: "fallback",
      };
      return;
    }

    window.RUNTIME_CONFIG = chosen;
    console.log("✅ RUNTIME_CONFIG loaded:", chosen);
  } catch (error) {
    console.error("❌ Failed to load config.json:", error);
    // Same hard-coded fallback. Means the app still works even if the JSON file vanishes.
    window.RUNTIME_CONFIG = {
      API_BASE_URL: "https://careercompass-api-iiai.onrender.com",
      ENV: "fallback",
    };
  }
}

export const configReady = loadConfig();
