import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ProductAttrs {
    id: string;
    title: string;
    price: number;
    image: string;
    userId: string;
}

interface ProductDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
    image: string;
    version: number;
    orderId?: string;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
    build(attrs: ProductAttrs): ProductDoc;
    findByEvent(event: { id: string; version: number }): Promise<ProductDoc | null>;
}

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        orderId: {
            type: String,
        },
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

productSchema.set('versionKey', 'version');
productSchema.plugin(updateIfCurrentPlugin);

productSchema.statics.findByEvent = (event: { id: string; version: number }) => {
    return Product.findOne({
        _id: event.id,
        version: event.version - 1,
    });
};

productSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product({
        _id: attrs.id,
        title: attrs.title,
        price: attrs.price,
        image: attrs.image,
        userId: attrs.userId,
    });
};

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };
