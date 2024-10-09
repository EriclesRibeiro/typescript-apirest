import { Product } from '../../../domain/products/entity/product.entity'
import { ProductGateway } from '../../../domain/products/gateway/product.gateway'
import { UseCase } from '../../usecase'

export type CreateProductInputDto = {
    name: string
    price: number
}
export type CreateProductOutputDto = {
    id: string
}

export class CreateProductUseCase
    implements UseCase<CreateProductInputDto, CreateProductOutputDto>
{
    private constructor(private readonly productGateway: ProductGateway) {}

    public static create(productGateway: ProductGateway) {
        return new CreateProductUseCase(productGateway)
    }

    public async execute({
        name,
        price
    }: CreateProductInputDto): Promise<CreateProductOutputDto> {
        const product = Product.create(name, price)
        await this.productGateway.save(product)

        return this.presentOutput(product)
    }

    private presentOutput(product: Product): CreateProductOutputDto {
        const output: CreateProductOutputDto = {
            id: product.id
        }

        return output
    }
}
