import {Prisma, User as PrismaUser} from "@prisma/client"

export type User = PrismaUser & 
    Partial<Prisma.UserGetPayload<{ include: {client: {
        include: {clientInformation: true, proposal: true}
    }, designer: {
        include: {designerInformation: true}
    }, designer} }>>
