import prisma from "../config/prisma";

export class SpotsService {


    static getSpotsOfParking = async (parkingId: string) => {
        const spots = await prisma.parkingSpot.findMany({
            where: {
                parkingId,
            },
        });

        return spots;
    }
}