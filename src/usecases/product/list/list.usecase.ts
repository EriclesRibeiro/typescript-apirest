import { Product } from '../../../domain/products/entity/product.entity'
import { ProductGateway } from '../../../domain/products/gateway/product.gateway'
import { UseCase } from '../../usecase'

export type ListProductInputDto = void
export type ListProdutOutputDto = {
    products: {
        id: string
        name: string
        price: number
        quantity: number
    }[]
}

export class ListProductUseCase
    implements UseCase<ListProductInputDto, ListProdutOutputDto>
{
    private constructor(private readonly productGateway: ProductGateway) {}

    public static create(productGateway: ProductGateway) {
        return new ListProductUseCase(productGateway)
    }

    public async execute(): Promise<ListProdutOutputDto> {
        const products = await this.productGateway.list()

        return this.presentOutput(products)
    }

    private presentOutput(products: Product[]): ListProdutOutputDto {
        return {
            products: products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity
            }))
        }
    }
}
