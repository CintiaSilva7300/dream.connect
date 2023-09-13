// geolocation.js
const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export async function getCountryFromGeolocation() {
    try {
      const { coords } = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
  
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${REACT_APP_GOOGLE_API_KEY}`
      );
  
      const data = await response.json();
      const countryComponent = data.results.find((component) =>
        component.types.includes("country")
      );
  
      if (countryComponent) {
        return countryComponent.formatted_address;
      } else {
        console.error("Informações de país não encontradas");
        return null;
      }
    } catch (error) {
      console.error("Erro ao obter informações de localização:", error);
      return null;
    }
  }
  