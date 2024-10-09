import dotenv from 'dotenv'
import { env } from 'process'
import { ApiExpress } from './infra/api/express/api.express'
import { CreateProductRoute } from './infra/api/express/routes/product/create.express.route'
import { ListProductRoute } from './infra/api/express/routes/product/list.express.route'
import { ProductRepositoryPrisma } from './infra/repositories/product/product.repository.prisma'
import { prisma } from './package/prisma/prisma'
import { CreateProductUseCase } from './usecases/product/create/create.usecase'
import { ListProductUseCase } from './usecases/product/list/list.usecase'

dotenv.config()

function main() {
    const repository = ProductRepositoryPrisma.create(prisma)

    // Controllers
    const createProductUseCase = CreateProductUseCase.create(repository)
    const listProductUseCase = ListProductUseCase.create(repository)

    // Routes
    const createRoute = CreateProductRoute.create(createProductUseCase)
    const listRoute = ListProductRoute.create(listProductUseCase)

    const port: number = parseInt(env.PORT || '3000', 10)
    const api = ApiExpress.create([createRoute, listRoute])
    api.start(port)
}

main()
