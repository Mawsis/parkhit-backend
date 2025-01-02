export const parkingTransform = (parking: any) => ({
    id: parking.id,
    name: parking.name,
    address: parking.address,
    city: parking.city,
    country: parking.country,
    spots: parking.spots.map((spot: any) => ({
        id: spot.id,
        number: spot.number,
        isAvailable: spot.isAvailable,
        pricePerHour: spot.pricePerHour,
    })),
});