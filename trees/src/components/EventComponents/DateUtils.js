// src/components/EventComponents/DateUtils
export const isEventExpired = (eventDate) => {
  const currentDate = new Date();
  const eventEndDate = new Date(eventDate);
  eventEndDate.setHours(23, 59, 59, 999); // Set to end of the day
  return currentDate > eventEndDate;
};
