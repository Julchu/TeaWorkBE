export const fetchGeo = async (ip?: string) => {
  if (!ip || !process.env.IPINFO_GEOLOCATION_API_KEY) return;

  try {
    const path = ip.length > 5 ? ip : "";
    const url = `https://ipinfo.io/${path}?token=${process.env.IPINFO_GEOLOCATION_API_KEY}`;
    const res = await fetch(new URL(url).href);
    const geolocation = (await res.json()) as { loc?: string };
    if (!geolocation.loc || geolocation.loc.length <= 1) return;

    const [lat, lng] = geolocation.loc.split(",");
    if (!lat || !lng) return;

    return { lat, lng };
  } catch (error) {
    console.error("Error fetching geolocation", error);
  }
};
