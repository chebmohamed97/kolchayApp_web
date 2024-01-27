import { Timestamp } from "firebase/firestore";

export default function getTimeSincePublishing(timeOfPublishingAdseconds) {
  const timestampNowSeconds = Timestamp.now().seconds;
  const seconds_since_publishing =
    timestampNowSeconds - timeOfPublishingAdseconds;
  if (seconds_since_publishing > 120) {
    const minutesSincePublishing = Math.floor(seconds_since_publishing / 60);
    if (minutesSincePublishing > 120) {
      const hoursSincePublishing = Math.floor(minutesSincePublishing / 60);
      if (hoursSincePublishing > 24) {
        const daysSincePublishing = Math.floor(hoursSincePublishing / 24);
        return <p> a publie il y'a {daysSincePublishing} jours </p>;
      }
      return <p> a publie il y'a {hoursSincePublishing} heures </p>;
    }
    return <p> a publie il y'a {minutesSincePublishing} minutes </p>;
  }
  return <p> a publie il y'a {seconds_since_publishing} secondes </p>;
}
