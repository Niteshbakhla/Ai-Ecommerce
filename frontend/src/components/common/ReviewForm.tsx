import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { type UseMutationResult } from "@tanstack/react-query";

type ReviewFormProps = {
            addReviewMutation: UseMutationResult<any, Error, any>;
};


export default function ReviewForm({ addReviewMutation }: ReviewFormProps) {
            const [rating, setRating] = useState(0);
            const [hoverRating, setHoverRating] = useState(0);
            const [comment, setComment] = useState('');

            const handleSubmit = (e: React.FormEvent) => {
                        e.preventDefault();
                        if (rating === 0) return;

                        const formData = {
                                    rating: rating,
                                    comment: comment,
                        };

                        addReviewMutation.mutate(formData);
                        setRating(0);
                        setComment('');
            };

            return (
                        <div className="max-w-2xl mx-auto p-8 bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h3>

                                    <div className="space-y-6">
                                                {/* Star Rating */}
                                                <div>
                                                            <label className="block text-sm font-semibold text-gray-900 mb-3">
                                                                        Your Rating
                                                            </label>
                                                            <div className="flex gap-2">
                                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                                                    <button
                                                                                                key={star}
                                                                                                type="button"
                                                                                                onClick={() => setRating(star)}
                                                                                                onMouseEnter={() => setHoverRating(star)}
                                                                                                onMouseLeave={() => setHoverRating(0)}
                                                                                                className="transition-transform hover:scale-110 focus:outline-none"
                                                                                    >
                                                                                                <Star
                                                                                                            className={`w-10 h-10 transition-colors ${star <= (hoverRating || rating)
                                                                                                                        ? 'fill-yellow-400 text-yellow-400'
                                                                                                                        : 'text-gray-300'
                                                                                                                        }`}
                                                                                                />
                                                                                    </button>
                                                                        ))}
                                                            </div>
                                                            {rating > 0 && (
                                                                        <p className="text-sm text-gray-600 mt-2">
                                                                                    You rated: <span className="font-semibold">{rating} star{rating > 1 ? 's' : ''}</span>
                                                                        </p>
                                                            )}
                                                </div>

                                                {/* Comment */}
                                                <div>
                                                            <label className="block text-sm font-semibold text-gray-900 mb-3">
                                                                        Your Review
                                                            </label>
                                                            <textarea
                                                                        value={comment}
                                                                        onChange={(e) => setComment(e.target.value)}
                                                                        placeholder="Share your experience with this product..."
                                                                        rows={5}
                                                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-white shadow-sm"
                                                                        required
                                                            />
                                                </div>

                                                {/* Submit Button */}
                                                <button
                                                            onClick={handleSubmit}
                                                            disabled={rating === 0 || !comment.trim()}
                                                            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-indigo-700"
                                                >
                                                            Submit Review
                                                </button>
                                    </div>
                        </div>
            );
}

// Alternative: Simpler inline version for your code
// Replace your form with this:

/*

*/