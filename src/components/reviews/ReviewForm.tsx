
import React, { useState } from "react";
import { ReviewFormData } from "../../types/movie";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";

interface ReviewFormProps {
  initialData?: ReviewFormData;
  onSubmit: (data: ReviewFormData) => void;
  onCancel: () => void;
}

const defaultFormData: ReviewFormData = {
  author: "",
  rating: 0,
  content: "",
};

const ReviewForm: React.FC<ReviewFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ReviewFormData>(initialData || defaultFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-card p-6 rounded-md border border-border shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="author" className="block text-sm font-medium">
            Your Name
          </label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="rating" className="block text-sm font-medium">
            Rating
          </label>
          <div className="flex gap-1 star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                className={`text-2xl ${formData.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                aria-label={`Rate ${star} out of 5 stars`}
              >
                <Star className={`w-6 h-6 ${formData.rating >= star ? "fill-yellow-400" : "fill-none"}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-medium">
            Review
          </label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your review..."
            rows={4}
            required
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            {initialData ? "Update Review" : "Submit Review"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
