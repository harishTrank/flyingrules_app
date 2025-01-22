import { currenKeys } from "../../../../../utils/UserUtils";

export function categorizeFlights(flightOffers: any) {
  if (!flightOffers || flightOffers.length === 0) {
    return [];
  }

  let cheapest: any = { price: { total: Infinity } };
  let best: any = { price: { total: -Infinity } };
  let quickest: any = { itineraries: [{ duration: "PT99999H" }] };

  for (const offer of flightOffers) {
    const offerPrice = parseFloat(offer.price.total);
    const offerDuration = calculateTotalDuration(offer.itineraries);

    if (offerPrice < parseFloat(cheapest.price.total)) {
      cheapest = offer;
    }

    if (offerPrice > parseFloat(best.price.total)) {
      best = offer;
    }

    if (offerDuration < calculateTotalDuration(quickest.itineraries)) {
      quickest = offer;
    }
  }

  const flightCategories = [
    {
      name: "Cheapest",
      price: formatPriceAndDuration(cheapest),
    },
    {
      name: "Best",
      price: formatPriceAndDuration(best),
    },
    {
      name: "Quickest",
      price: formatPriceAndDuration(quickest),
    },
  ];

  return flightCategories;
}

export function calculateTotalDuration(itineraries: any) {
  const itinerary = itineraries[0];
  if (!itinerary) return Infinity;
  if (itinerary.duration) {
    return parseDuration(itinerary.duration);
  } else {
    return Infinity;
  }
}

function parseDuration(durationString: any) {
  const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  const matches = durationString.match(regex);
  if (!matches) return Infinity;

  const hours = parseInt(matches[1] || 0, 10);
  const minutes = parseInt(matches[2] || 0, 10);
  const seconds = parseInt(matches[3] || 0, 10);
  return hours * 60 + minutes;
}

function formatPriceAndDuration(offer: any) {
  const price = currenKeys[offer.price.currency] + offer.price.total;
  const duration = formatDuration(calculateTotalDuration(offer.itineraries));
  return `${price} ⦿ ${duration}`;
}

function formatDuration(totalMinutes: any) {
  if (totalMinutes === Infinity) return "N/A";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}H ${minutes}M`;
}
