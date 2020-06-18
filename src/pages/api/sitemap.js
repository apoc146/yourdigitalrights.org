import sm from "sitemap";
import fetch from "universal-fetch";

async function fetchData() {
  let data = await fetch(`https://api.opt-out.eu/companies`);
  data = await data.json();
  return data;
}

export default async (req, res) => {
  const sitemap = sm.createSitemap({
    hostname: "https://yourdigitalrights.org/",
    cacheTime: 1000 * 60 * 60, // 1 hour - cache purge period
  });

  const companies = await fetchData();
  companies.map((company) =>
    sitemap.add({
      url: `https://yourdigitalrights.org/?company=${company.url}`,
      changefreq: "weekly",
      priority: 0.5,
    })
  );

  sitemap.add({
    url: "/about",
    changefreq: "weekly",
    priority: 1,
  });

  sitemap.add({
    url: "/privacy",
    changefreq: "weekly",
    priority: 1,
  });

  sitemap.add({
    url: "/data-brokers",
    changefreq: "daily",
    priority: 1,
  });

  return new Promise((resolve) => {
    sitemap.toXML((err, xml) => {
      if (err) {
        res.status(500).end();
        resolve();
        return;
      }

      res.setHeader("Content-Type", "application/xml");
      res.send(xml);
      resolve();
    });
  });
};
