const states = [
  { name: "CA", lat: 36.1, lng: -119.6, count: 825 },
  { name: "UT", lat: 40.1, lng: -111.8, count: 492 },
  { name: "TX", lat: 31.0, lng: -97.5, count: 345 },
  { name: "OR", lat: 44.5, lng: -122.0, count: 332 },
  { name: "WA", lat: 47.4, lng: -121.4, count: 246 },
  { name: "FL", lat: 27.7, lng: -81.6, count: 246 },
  { name: "AZ", lat: 33.7, lng: -111.4, count: 234 },
  { name: "PA", lat: 40.5, lng: -77.2, count: 172 },
  { name: "IL", lat: 40.3, lng: -89.0, count: 172 },
  { name: "VA", lat: 37.7, lng: -78.1, count: 148 },
  { name: "CO", lat: 39.0, lng: -105.3, count: 148 },
  { name: "OH", lat: 40.3, lng: -82.7, count: 118 },
  { name: "MI", lat: 43.3, lng: -85.6, count: 103 },
  { name: "NV", lat: 38.3, lng: -117.0, count: 98 },
  { name: "NC", lat: 35.6, lng: -79.8, count: 93 },
  { name: "MO", lat: 38.4, lng: -92.2, count: 93 },
  { name: "TN", lat: 35.7, lng: -86.6, count: 92 },
  { name: "GA", lat: 33.0, lng: -83.6, count: 91 },
  { name: "IN", lat: 39.8, lng: -86.1, count: 80 },
  { name: "ID", lat: 44.2, lng: -114.4, count: 63 },
  { name: "DC", lat: 38.9, lng: -77.0, count: 54 },
  { name: "NY", lat: 42.1, lng: -74.9, count: 50 },
  { name: "MD", lat: 39.0, lng: -76.8, count: 49 },
  { name: "OK", lat: 35.5, lng: -96.9, count: 47 },
  { name: "NJ", lat: 40.2, lng: -74.8, count: 46 },
  { name: "MN", lat: 45.6, lng: -93.9, count: 37 },
  { name: "MT", lat: 46.9, lng: -110.3, count: 34 },
  { name: "NE", lat: 41.1, lng: -98.2, count: 31 },
  { name: "NM", lat: 34.8, lng: -106.2, count: 30 },
  { name: "MA", lat: 42.2, lng: -71.5, count: 30 },
  { name: "SC", lat: 33.8, lng: -80.9, count: 22 },
  { name: "KS", lat: 38.5, lng: -96.7, count: 22 },
  { name: "KY", lat: 37.6, lng: -84.6, count: 19 },
  { name: "IA", lat: 42.0, lng: -93.2, count: 17 },
  { name: "AL", lat: 32.8, lng: -86.8, count: 13 },
  { name: "AR", lat: 34.9, lng: -92.3, count: 11 },
  { name: "LA", lat: 31.1, lng: -91.8, count: 11 },
  { name: "WI", lat: 44.2, lng: -89.6, count: 10 },
  { name: "CT", lat: 41.5, lng: -72.7, count: 9 },
  { name: "DE", lat: 39.3, lng: -75.5, count: 8 },
  { name: "AK", lat: 61.3, lng: -152.4, count: 7 },
  { name: "WY", lat: 42.7, lng: -107.3, count: 7 },
  { name: "NH", lat: 43.4, lng: -71.5, count: 5 },
  { name: "HI", lat: 21.0, lng: -157.5, count: 4 },
  { name: "MS", lat: 32.7, lng: -89.6, count: 4 },
  { name: "ME", lat: 44.6, lng: -69.3, count: 4 },
  { name: "RI", lat: 41.6, lng: -71.4, count: 2 },
  { name: "SD", lat: 44.2, lng: -99.4, count: 2 },
  { name: "WV", lat: 38.4, lng: -80.9, count: 1 },
];

const countries = [
  { lat: 56.1, lng: -106.3, count: 40 }, // Canada
  { lat: 12.8, lng: 121.7, count: 5 }, // Philippines
  { lat: -0.7, lng: 113.9, count: 5 }, // Indonesia
  { lat: 1.3, lng: 103.8, count: 5 }, // Singapore
  { lat: 46.2, lng: 2.2, count: 20 }, // France
  { lat: 20.5, lng: 78.9, count: 10 }, // India
  { lat: 52.1, lng: 5.2, count: 15 }, // Netherlands
  { lat: 51.1, lng: 10.4, count: 20 }, // Germany
  { lat: 36.2, lng: 138.2, count: 15 }, // Japan
  { lat: 18.2, lng: -66.5, count: 5 }, // Puerto Rico
  { lat: 15.7, lng: -90.2, count: 3 }, // Guatemala
  { lat: -35.6, lng: -71.5, count: 5 }, // Chile
  { lat: 23.6, lng: -102.5, count: 10 }, // Mexico
  { lat: -40.9, lng: 174.8, count: 5 }, // New Zealand
  { lat: -14.2, lng: -51.9, count: 10 }, // Brazil
  { lat: 42.7, lng: 25.4, count: 2 }, // Bulgaria
  { lat: 40.4, lng: -3.7, count: 10 }, // Spain
  { lat: 60.1, lng: 18.6, count: 5 }, // Sweden
  { lat: 23.4, lng: 53.8, count: 5 }, // UAE
  { lat: 17.1, lng: -88.4, count: 2 }, // Belize
  { lat: 55.3, lng: -3.4, count: 30 }, // UK
];

let code = "const GENERATED_HOTSPOTS = [\n";

function addPoints(list) {
  list.forEach(item => {
    for (let i = 0; i < item.count; i++) {
      // Gaussian-ish distribution spread
      const u1 = Math.random();
      const u2 = Math.random();
      const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
      
      const spreadLat = 1.5; // Roughly degrees of spread
      const spreadLng = 2.0;
      
      const pLat = item.lat + z0 * spreadLat;
      const pLng = item.lng + z1 * spreadLng;
      const delay = (Math.random() * 2).toFixed(3);
      
      code += `  { lat: ${pLat.toFixed(3)}, lng: ${pLng.toFixed(3)}, delay: ${delay} },\n`;
    }
  });
}

addPoints(states);
addPoints(countries);

code += "];\n\nmodule.exports = { GENERATED_HOTSPOTS };\n";
const fs = require('fs');
fs.writeFileSync('generated_hotspots.js', code);
console.log("Done");
