import { Button } from "@/components/ui/button";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";


export default function ReviewCard({ review, onEdit, onDelete }: any) {
            const user = useSelector((state: RootState) => state.auth.user);

            return (
                        <div className="border rounded p-4 space-y-2 bg-white shadow-sm">
                                    <div className="flex items-center justify-between">
                                                <p className="font-semibold">{review.userId?.name}</p>
                                                <p className="text-yellow-600 font-medium">⭐ {review.rating}</p>
                                    </div>

                                    <p className="text-gray-700">{review.comment}</p>

                                    <p className="text-xs text-gray-400">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                    </p>

                                    {/* Buttons only for own review */}
                                    {user?._id === review.userId?._id && (
                                                <div className="flex gap-2">
                                                            <Button size="sm" variant="outline" onClick={onEdit}>Edit</Button>
                                                            <Button size="sm" variant="destructive" onClick={onDelete}>Delete</Button>
                                                </div>
                                    )}
                        </div>
            );
}
