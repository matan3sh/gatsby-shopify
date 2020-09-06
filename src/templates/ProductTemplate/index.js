import React from 'react';
import { graphql } from 'gatsby';
import { Layout, ImageGallery } from 'components';
import { Grid } from './styles';

export const query = graphql`
  query ProductQuery($shopifyId: String) {
    shopifyProduct(shopifyId: { eq: $shopifyId }) {
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
  return (
    <Layout>
      <Grid>
        <div>
          <h1>{shopifyProduct.title}</h1>
          <p>{shopifyProduct.description}</p>
        </div>
        <div>
          <ImageGallery images={shopifyProduct.images} />
        </div>
      </Grid>
    </Layout>
  );
};

export default ProductTemplate;
