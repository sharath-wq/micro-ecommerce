import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface CartAttrs {
    userId: string;
    items: {
        product: string;
    }[];
}

interface CartDoc extends mongoose.Document {
    userId: string;
    items: {
        product: string;
    }[];
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
        items: [
            {
                product: String,
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
