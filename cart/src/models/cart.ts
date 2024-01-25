import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { ProductDoc } from './product';

interface CartAttrs {
    userId: string;
    products: ProductDoc[];
}

interface CartDoc extends mongoose.Document {
    userId: string;
    products: ProductDoc[];
}

interface CartModel extends mongoose.Model<CartDoc> {
    build(attrs: CartAttrs): CartDoc;
}

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        products: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
            },
        ],
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

cartSchema.set('versionKey', 'version');
cartSchema.plugin(updateIfCurrentPlugin);

cartSchema.statics.build = (attrs: CartAttrs) => {
    return new Cart(attrs);
};

const Cart = mongoose.model<CartDoc, CartModel>('Cart', cartSchema);

export { Cart };
