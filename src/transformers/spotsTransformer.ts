export const spotsTransform = (spot: any) => ({
    id: spot.id,
    number: spot.number,
    isAvailable: spot.isAvailable,
    pricePerHour: spot.pricePerHour,
});
