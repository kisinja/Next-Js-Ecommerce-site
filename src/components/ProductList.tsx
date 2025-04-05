import { wixClientServer } from "@/lib/wixClientServer";
import { formatPrice } from "@/utils";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";

const PRODUCT_PER_PAGE = 20;

const ProductList = async ({
    categoryId,
    limit,
    searchParams
}: {
    categoryId: string;
    limit?: number;
    searchParams?: any;
}) => {

    const wixClient = await wixClientServer();
    const res = await wixClient.products
        .queryProducts()
        .eq("collectionIds", categoryId)
        .limit(limit || PRODUCT_PER_PAGE)
        .find();

    return (
        <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
            {
                res.items.map((p: products.Product) => (
                    <Link
                        href={`/${p.slug}`}
                        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
                        key={p._id}
                    >
                        <div className="relative w-full h-80">
                            <Image
                                src={p.media?.mainMedia?.image?.url || "/product.png"}
                                alt=""
                                fill
                                sizes="25vw"
                                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease-linear duration-500"
                            />
                            {p.media?.items && (
                                <Image
                                    src={p.media?.items[1]?.image?.url || "/product.png"}
                                    alt=""
                                    fill
                                    sizes="25vw"
                                    className="absolute object-cover rounded-md"
                                />
                            )}
                        </div>
                        <div className="flex justify-between gap-2">
                            <span className="font-semibold break-words whitespace-normal line-clamp-2">
                                {p.name}
                            </span>
                            <span className="font-normal flex-shrink-0">
                                {formatPrice(p.price?.price)}
                            </span>
                        </div>
                        <div
                            className="text-sm text-gray-500 break-words whitespace-normal line-clamp-2"
                            dangerouslySetInnerHTML={{
                                __html:
                                    (p.additionalInfoSections?.find(
                                        (section: any) => section.title === "shortDesc"
                                    )?.description || p.description) ?? "",
                            }}
                        />

                        <button className="rounded-2xl ring-1 ring-elvis text-elvis py-2 px-4 text-xs hover:bg-elvis hover:text-white w-max">
                            Add to cart
                        </button>
                    </Link>
                ))
            }
        </div>
    )
}

export default ProductList;