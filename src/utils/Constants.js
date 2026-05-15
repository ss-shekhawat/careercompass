export const getBaseurl = () => {
    const config =  window.RUNTIME_CONFIG;

    if (!config || !config.API_BASE_URL) {
        console.error("API_BASE_URL is not defined in config:", config);
    }

    const base =  config.API_BASE_URL;
    return base.endsWith("/api") ? base : `${base}/api`;
};