
import React, { useState } from "react";
import { Review } from "../../types/movie";
import { useMovieContext } from "../../contexts/MovieContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ReviewForm from "./ReviewForm";

interface ReviewListProps {
  reviews: Review[];
  movieId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, movieId }) => {
  const { addReview, updateReview, deleteReview } = useMovieContext();
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  const handleAddReviewClick = () => {
    setIsAddingReview(true);
  };

  const handleAddReviewSubmit = (data: any) => {
    addReview(movieId, data);
    setIsAddingReview(false);
  };

  const handleEditReviewClick = (reviewId: string) => {
    setEditingReviewId(reviewId);
  };

  const handleEditReviewSubmit = (data: any) => {
    if (editingReviewId) {
      updateReview(editingReviewId, data);
      setEditingReviewId(null);
    }
  };

  const handleDeleteReviewClick = (reviewId: string) => {
    setReviewToDelete(reviewId);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (reviewToDelete) {
      deleteReview(reviewToDelete);
      setReviewToDelete(null);
    }
    setDeleteConfirmOpen(false);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Reviews</h3>
        {!isAddingReview && (
          <Button onClick={handleAddReviewClick}>Add Review</Button>
        )}
      </div>

      {isAddingReview && (
        <div className="mb-8">
          <h4 className="font-semibold mb-2">Write a review</h4>
          <ReviewForm
            onSubmit={handleAddReviewSubmit}
            onCancel={() => setIsAddingReview(false)}
          />
        </div>
      )}

      {reviews.length === 0 && !isAddingReview ? (
        <div className="text-center py-12 border-2 border-dashed border-muted rounded-md">
          <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
          <Button className="mt-4" variant="outline" onClick={handleAddReviewClick}>
            Write a Review
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id}>
              {editingReviewId === review.id ? (
                <ReviewForm
                  initialData={{
                    author: review.author,
                    rating: review.rating,
                    content: review.content,
                  }}
                  onSubmit={handleEditReviewSubmit}
                  onCancel={() => setEditingReviewId(null)}
                />
              ) : (
                <Card className="animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{review.author}</h4>
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="mb-3">{renderStars(review.rating)}</div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditReviewClick(review.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteReviewClick(review.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-foreground whitespace-pre-line">{review.content}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReviewList;
