import { wixClientServer } from "@/lib/wixClientServer";
import { formatPrice } from "@/utils";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 4;

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
    const productQuery = wixClient.products
        .queryProducts()
        .startsWith("name", searchParams?.name || "")
        .hasSome("productType", searchParams?.type ? [searchParams.type] : ["physical", "digital"])
        .gt("priceData.price", searchParams?.min || 0)
        .lt("priceData.price", searchParams?.max || 999999)
        .eq("collectionIds", categoryId)
        .limit(limit || PRODUCT_PER_PAGE)
        .skip(searchParams?.page ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE) : 0);
    //.find();

    if (searchParams?.sort) {
        const [sortType, sortBy] = searchParams.sort.split("");
        console.log(sortBy, sortType);

        if (sortType === "asc") {
            productQuery.ascending(sortBy);
        }
        if (sortType === 'desc') {
            productQuery.descending(sortBy);
        }
    }

    const res = await productQuery.find();

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
            <Pagination
                currentPage={res.currentPage || 0}
                hasPrevious={res.hasPrev()}
                hasNext={res.hasNext()}
            />
        </div>
    )
}

export default ProductList;