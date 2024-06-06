import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Button, IconButton, Grid, Box } from '@mui/material';
import './Card.css';
import StarRating from './StarRating';

const Card = ({ images, img, title, rating, prevPrice, price, addToCart, onClick }) => {

  return (
    <section className="card" onClick={onClick}>
      <div className="card-img-container">
        <img src={img} alt={title} className="card-img" loading="lazy" />
      </div>
      <div className="card-details">
        <h3 className="card-title">{title}</h3>
        <section className="card-reviews">
          {<StarRating rating={rating}/>} {/* Render stars dynamically */}
        </section>
        <section className="card-price">
          <div className="price">
            <del>{prevPrice}</del> ${price}
          </div>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AiOutlineShoppingCart />}
              onClick={() => onClick}
            >
              Buy
            </Button>
        </section>
      </div>
    </section>
  );
};

export default Card;
