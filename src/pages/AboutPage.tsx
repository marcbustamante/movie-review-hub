
import React from "react";
import Layout from "../components/layout/Layout";

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About MovieVerse</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg">
            MovieVerse is a community-driven platform where movie enthusiasts can share their thoughts, 
            rate their favorite films, and discover new movies to watch.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is to create a space where movie lovers can connect through shared experiences 
            and honest reviews. We believe in the power of storytelling through film and want to help 
            people find movies that speak to them.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Features</h2>
          <ul className="space-y-2 my-4 list-disc pl-5">
            <li>Browse a diverse collection of movies across all genres</li>
            <li>Read and write detailed reviews</li>
            <li>Rate movies on a 5-star scale</li>
            <li>Search and filter to find exactly what you're looking for</li>
            <li>Add new movies to our growing database</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Get Involved</h2>
          <p>
            MovieVerse is all about community. We encourage you to:
          </p>
          <ul className="space-y-2 my-4 list-disc pl-5">
            <li>Add movies you love that aren't in our database yet</li>
            <li>Write thoughtful reviews to help others discover great films</li>
            <li>Rate movies honestly to help maintain the integrity of our ratings</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Future Plans</h2>
          <p>
            We're constantly working to improve MovieVerse. Some features we're planning to add:
          </p>
          <ul className="space-y-2 my-4 list-disc pl-5">
            <li>User accounts and profiles</li>
            <li>Watchlists and favorites</li>
            <li>Social features to connect with fellow movie lovers</li>
            <li>More detailed movie information and external links</li>
            <li>Movie recommendations based on your preferences</li>
          </ul>
          
          <p className="mt-8">
            Thank you for being part of our community!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
