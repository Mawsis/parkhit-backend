import { transform } from "../utils/transform";
import { spotsTransform } from "./spotsTransformer";

export const parkingTransform = (parking: any) => ({
    id: parking.id,
    name: parking.name,
    address: parking.address,
    city: parking.city,
    country: parking.country,
    spots: transform(parking.spots, spotsTransform),
});