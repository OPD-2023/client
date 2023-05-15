import { FC } from "react"

import Product from "@models/Product"
import Star24 from "@components/Star24"

import classes from "./ProductCard.module.styl"

interface ProductCardProps {
	product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const { article, title, price, currency, imageURL, rating } = product;

	const stars = Array.from({ length: 5 }, (_, idx) => (
		<Star24 key={ idx } filled={ idx < rating } />
	));

	return <div className={ classes.productCard }>
		<div className={ classes.imageContainer }>
			<div className={ classes.article }>
				<p className={ classes.articleText }>{ article }</p>
			</div>
			<img alt="Фото товара" className={ classes.image } src={ imageURL } />
		</div>
		<p className={ classes.title }>{ title }</p>
		<div className={ classes.priceContainer }>
			<p className={ classes.price }>{ price.toLocaleString() }</p>
			<p className={ classes.currency }>{ currency }</p>
		</div>
		<div>{ stars }</div>
	</div>
};

export default ProductCard;
