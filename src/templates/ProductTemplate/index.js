import React, { useContext, useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { Layout, ImageGallery, ProductQuantityAdder } from 'components';
import { Grid, SelectWrapper, Price } from './styles';
import CartContext from 'context/CartContext';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

export const query = graphql`
  query ProductQuery($shopifyId: String) {
    shopifyProduct(shopifyId: { eq: $shopifyId }) {
      shopifyId
      title
      description
      images {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

const ProductTemplate = ({ data: { shopifyProduct } }) => {
  const { getProductById } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { search, origin, pathname } = useLocation();
  const variantId = queryString.parse(search).variant;

  useEffect(() => {
    getProductById(shopifyProduct.shopifyId).then(res => {
      setProduct(res);
      setSelectedVariant(
        res.variants.find(({ id }) => id === variantId) || res.variants[0]
      );
    });
    /* eslint-disable jsx-a11y/no-onchange */
  }, [getProductById, setProduct, shopifyProduct.shopifyId, variantId]);

  const handleVariantChange = e => {
    const newVariant = product?.variants.find(
      currentVariant => currentVariant.id === e.target.value
    );
    setSelectedVariant(newVariant);
    navigate(
      `${origin}${pathname}?variant=${encodeURIComponent(newVariant.id)}`,
      {
        replace: true,
      }
    );
  };

  return (
    <Layout>
      <Grid>
        <div>
          <h1>{shopifyProduct.title}</h1>
          <p>{shopifyProduct.description}</p>
          {product?.availableForSale && (
            <>
              {product.variants.length > 1 && (
                <SelectWrapper>
                  <strong>Variant</strong>
                  <select
                    value={selectedVariant?.id}
                    onChange={handleVariantChange}
                  >
                    {product?.variants.map(variant => (
                      <option key={variant.id} value={variant.id}>
                        {variant.title}
                      </option>
                    ))}
                  </select>
                </SelectWrapper>
              )}
              {!!selectedVariant && (
                <>
                  <Price>${selectedVariant?.price}</Price>
                  <ProductQuantityAdder
                    available={selectedVariant.available}
                    variantId={selectedVariant.id}
                  />
                </>
              )}
            </>
          )}
        </div>
        <div>
          <ImageGallery
            selectedVariantImageId={selectedVariant?.image.id}
            images={shopifyProduct.images}
          />
        </div>
      </Grid>
    </Layout>
  );
};

export default ProductTemplate;
