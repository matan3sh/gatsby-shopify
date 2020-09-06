import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from 'components';
import { Grid } from './styles';

export const query = graphql`
  query ProductQuery($shopifyId: String) {
    shopifyProduct(shopifyId: { eq: $shopifyId }) {
      title
      description
      images {
        localFile {
          childImageSharp {
            fluid(maxWidth: 300) {
              src
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
        <div>image</div>
      </Grid>
    </Layout>
  );
};

export default ProductTemplate;
