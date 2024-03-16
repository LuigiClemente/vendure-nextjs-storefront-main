import React, { useEffect, useState } from 'react';

// import { ProductPhotosPreview } from '@/src/components/organisms/ProductPhotosPreview';
import { Layout } from '@/src/layouts';
import { InferGetStaticPropsType } from 'next';

import { getStaticProps } from '@/src/components/pages/products/props';
import { storefrontApiQuery } from '@/src/graphql/client';
import { ProductVariantTileType, productVariantTileSelector } from '@/src/graphql/selectors';
import { useChannels } from '@/src/state/channels';
import { useProduct } from '@/src/state/product';
import { Invite } from '../../invites/Invite';

export const ProductPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = props => {
  const ctx = useChannels();
  const { product } = useProduct();
  const capacity = props.product.slug == "family" ? Number(process.env.NEXT_PUBLIC_FAMILY_LIMIT) : 1;

  const [recentlyProducts, setRecentlyProducts] = useState<ProductVariantTileType[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fetchData = async () => {
      try {
        const cookie = window.document.cookie.split('; ').find(row => row.startsWith('recentlyViewed'));
        if (!cookie) return;
        const recentlyViewed = cookie.split('=')[1].split(',');
        const { collection } = await storefrontApiQuery(ctx)({
          collection: [
            { slug: 'all' },
            {
              productVariants: [
                { options: { filter: { id: { in: recentlyViewed } } } },
                { items: productVariantTileSelector },
              ],
            },
          ],
        });
        if (collection?.productVariants?.items.length) setRecentlyProducts(collection.productVariants.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [product?.id]);

  return (
    <Layout categories={props.collections} navigation={props.navigation}>
      <Invite capacity={capacity} />
    </Layout>

  );
};

