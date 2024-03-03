import { Stack, Link, ProductImageGrid, TP } from '@/src/components/atoms/';
import { CollectionTileType, ProductSearchType } from '@/src/graphql/selectors';
import { priceFormatter } from '@/src/util/priceFormatter';
import styled from '@emotion/styled';
import React from 'react';
import { FullWidthSecondaryButton } from './Button';
import { useProduct } from '@/src/state/product';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/src/state/cart';
import { usePush } from '@/src/lib/redirect';
import Image from 'next/image';

export const ProductTile: React.FC<{
    product: ProductSearchType;
    collections: CollectionTileType[];
    lazy?: boolean;
}> = ({ product, collections, lazy }) => {
    const { t } = useTranslation('products');
    const { addToCart } = useCart();
    const push = usePush();

    const priceValue =
        'value' in product.priceWithTax
            ? priceFormatter(product.priceWithTax.value, product.currencyCode)
            : product.priceWithTax.min === product.priceWithTax.max
              ? priceFormatter(product.priceWithTax.min, product.currencyCode)
              : `${priceFormatter(product.priceWithTax.min, product.currencyCode)} - ${priceFormatter(
                    product.priceWithTax.max,
                    product.currencyCode,
                )}`;

    return (
        <section>
        <div>
            <input type="hidden" id="basicPrice" name="priceId" />
            <img
                loading={lazy ? 'lazy' : undefined}
                src={product.productAsset?.preview}
                width="120"
                height="120"
                alt="basic"
                />
            <div className="name">{product.productName}</div>
            <div className="price">{priceValue}</div>
            <div className="duration">per month</div>
            <Link href={`/products/${product.slug}/`}>
                {product.slug == "basic" ? <></> : <button>Select</button>}
            </Link>
        </div>
        </section>
    );
};
const Categories = styled(Stack)`
    position: absolute;
    top: 0;
    left: 0;
    flex-wrap: wrap;
`;

const ProductName = styled.div`
    font-weight: 400;
    color: ${p => p.theme.gray(900)};
    font-size: 1.5rem;
`;

const CategoryBlock = styled(Link)`
    padding: 1rem;

    background-color: ${({ theme }) => theme.tile.background};

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        :hover {
            background-color: ${({ theme }) => theme.gray(500)};
        }
    }
`;

const ProductPrice = styled(Stack)`
    font-size: 1.25rem;
`;
const ProductPriceValue = styled(Stack)`
    font-weight: 400;
`;
const Main = styled(Stack)`
    font-size: 1.5rem;
    position: relative;
    width: 100%;
    font-weight: 500;

    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
        max-width: 35.5rem;
    }
`;
