import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { OrderStatus } from '@scmicroecom/common';
import { CartDoc } from './cart';

export { OrderStatus };

interface OrderAttrs {
    userId: string;
    status: OrderStatus;
    amount: number;
    products: { id: string; price: number; title: string }[];
}

interface OrderDoc extends mongoose.Document {
    userId: string;
    amount: number;
    status: OrderStatus;
    products: { id: string; price: number; title: string }[];
    version: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            required: true,
            enum: Object.values(OrderStatus),
            default: OrderStatus.Created,
        },

        products: [
            {
                id: { type: String },
                title: { type: String },
                price: { type: Number },
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

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    const products = attrs.products.map((item) => {
        return { title: item.title, price: item.price, _id: item.id };
    });

    return new Order({
        userId: attrs.userId,
        status: attrs.status,
        products: products,
        amount: attrs.amount,
    });
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
