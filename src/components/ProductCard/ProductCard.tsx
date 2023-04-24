import { FC } from "react";
import classes from "./ProductCard.module.styl";

interface Product {
  partNumber: string;
  title: string;
  price: number;
  currency: string;
  image: string;
}

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  const { partNumber, title, price, currency, image } = product;

  return (
    <div className={classes.productCard}>
      <div className={classes.imageContainer}>
        <div className={classes.partNumber}>
          <p className={classes.partNumberText}>
            { partNumber }
          </p>
        </div>
        <img
          alt=""
          className={classes.image}
          src={ image }
        />
      </div>
      <p className={classes.title}>
        { title }
      </p>
      <div className={classes.priceContainer}>
        <p className={classes.price}>{ price.toLocaleString() }</p>
        <p className={classes.currency}>{ currency }</p>
      </div>
      { /* TODO: add rating component */ }
      <img
        alt=""
        className={classes.ratingContainer}
        src="https://static.overlay-tech.com/assets/e645a8db-504a-41c1-a1f7-5605a02c6605.svg"
      />
    </div>
  );
};

export default ProductCard;