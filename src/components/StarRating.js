const StarRating = ({rating}) => {

    // Function to format review count with commas
  const formatReviewCount = rating.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const stars = [];
    const fullStars = Math.floor(rating.rate); // Number of full stars
    const hasHalfStar = rating.rate % 1 !== 0; // Check if there's a half star

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star-icon filled-star">&#9733;</span>);
    }

    // Add half star if applicable
    if (hasHalfStar) {
      stars.push(<span key={fullStars} className="star-icon filled-star">&#9734;</span>);
    }

    // Add empty stars to complete 5-star rating
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={fullStars + i + 1} className="star-icon">&#9734;</span>);
    }

    return <>{stars}<span>{formatReviewCount} ratings</span></>;
  };

  
  export default StarRating;
  