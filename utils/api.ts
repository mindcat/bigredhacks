import Location from "@/types/Location";

export const callApiUpsertLocation = async (
  location: Location,
  timestamp?: number
) => {
  // when timestamp is undefined, query will return none, so it'll be an insert
  try {
    const response = await fetch(`https://api.anhnlh.com/upsertLocation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timestamp, location }),
    });
    const data = await response.json();
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Error saving location:", error);
  }
};

export const callApiDeleteLocation = async ({ timestamp }: Location) => {
  try {
    const response = await fetch(`https://api.anhnlh.com/deleteLocation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timestamp }),
    });
    const data = await response.json();
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Error deleting location:", error);
  }
};

export const callApiGetAllLocations = async () => {
  try {
    const response = await fetch(`https://api.anhnlh.com/getAllLocations`, {
      method: "GET",
    });
    const data = await response.json();
    console.log("Success:", data);
    return data.map((location: any) => ({
      timestamp: location.timestamp,
      latitude: parseFloat(location.latitude),
      longitude: parseFloat(location.longitude),
      tags: location.tags,
      title: location.title,
      content: location.content,
    }));
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};
