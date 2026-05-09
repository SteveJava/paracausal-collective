import { NextRequest, NextResponse } from 'next/server';

const DOMAIN   = 'rf9fpy-48.myshopify.com';
const TOKEN    = 'af7f813a822316f04d7b068940181abc';
const ENDPOINT = `https://${DOMAIN}/api/2024-10/graphql.json`;

const GQL_HEADERS = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': TOKEN,
};

// ── GET /api/checkout?productId=xxx  →  { title, image, variants } ──────────

export async function GET(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get('productId') ?? '15105738408304';

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: GQL_HEADERS,
    body: JSON.stringify({
      query: `
        query getProduct($id: ID!) {
          product(id: $id) {
            title
            featuredImage { url altText }
            variants(first: 20) {
              edges {
                node {
                  id
                  title
                  price { amount currencyCode }
                  availableForSale
                }
              }
            }
          }
        }
      `,
      variables: { id: `gid://shopify/Product/${productId}` },
    }),
    next: { revalidate: 60 },
  });

  const data = await res.json();
  const product = data.data?.product;

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const variants = product.variants.edges.map((e: {
    node: { id: string; title: string; price: { amount: string; currencyCode: string }; availableForSale: boolean };
  }) => ({
    id:        e.node.id,
    title:     e.node.title,
    price:     e.node.price,
    available: e.node.availableForSale,
  }));

  return NextResponse.json({
    title:    product.title,
    image:    product.featuredImage ?? null,
    variants,
  });
}

// ── POST /api/checkout  { variantId, quantity }  →  { checkoutUrl } ─────────

export async function POST(req: NextRequest) {
  const { variantId, quantity = 1 } = await req.json();

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: GQL_HEADERS,
    body: JSON.stringify({
      query: `
        mutation cartCreate($lines: [CartLineInput!]) {
          cartCreate(input: { lines: $lines }) {
            cart { checkoutUrl }
            userErrors { field message }
          }
        }
      `,
      variables: {
        lines: [{ merchandiseId: variantId, quantity }],
      },
    }),
  });

  const data = await res.json();
  const errors      = data.data?.cartCreate?.userErrors ?? [];
  const checkoutUrl = data.data?.cartCreate?.cart?.checkoutUrl;

  if (errors.length) {
    return NextResponse.json({ error: errors[0].message }, { status: 400 });
  }

  if (!checkoutUrl) {
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 });
  }

  return NextResponse.json({ checkoutUrl });
}
