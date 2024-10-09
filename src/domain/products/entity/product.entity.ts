export type ProductProps = {
    id: string
    name: string
    price: number
    quantity: number
}

export class Product {
    private constructor(private props: ProductProps) {}

    public static create(name: string, price: number) {
        return new Product({
            id: crypto.randomUUID(),
            name,
            price,
            quantity: 0
        })
    }

    public static with(props: ProductProps) {
        return new Product(props)
    }

    public get id() {
        return this.props.id
    }

    public get name() {
        return this.props.name
    }

    public get price() {
        return this.props.price
    }

    public get quantity() {
        return this.props.quantity
    }

    public increaseQuantity(quantity: number) {
        if (quantity < 0) throw new Error('Invalid quantity to increase')
        this.props.quantity += quantity
    }

    public decreaseQuantity(quantity: number) {
        if (quantity < 0) throw new Error('Invalid quantity to decrease')
        this.props.quantity -= quantity
    }
}
