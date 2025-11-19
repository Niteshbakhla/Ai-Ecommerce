import mongoose, { Schema, Model, Document, mongo } from "mongoose";

interface IAiRecommendation extends Document {
            userId: mongoose.Types.ObjectId;
            productIds: mongoose.Types.ObjectId[];
            updatedAt: Date
}

const aiRecommendationSchema = new Schema<IAiRecommendation>(
            {
                        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
                        productIds: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            }, {
            timestamps: true
}
)


const aiRecommend: Model<IAiRecommendation> =
            mongoose.model<IAiRecommendation>("aiRecommend", aiRecommendationSchema);
            
export default aiRecommend;
