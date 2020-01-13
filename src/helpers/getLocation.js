const getGeoCoordinates = (defaultCoords) => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return resolve(defaultCoords);
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }),
      (error) => resolve(defaultCoords),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 30000
      }
    );
  });
};

module.exports = { getGeoCoordinates }