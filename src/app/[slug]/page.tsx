import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductsImages from "@/components/ProductsImages";
import { wixClientServer } from "@/lib/wixClientServer";
import { formatPrice } from "@/utils";
import { notFound } from "next/navigation";

const SinglePage = async ({ params }: { params: { slug: string } }) => {

    const wixClient = await wixClientServer();
    const products = await wixClient.products
        .queryProducts()
        .eq("slug", params.slug)
        .find();

    if (!products.items[0]) {
        return notFound();
    }

    const product = products.items[0];

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col lg:flex-row gap-16">
            {/* IMG */}
            <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
                <ProductsImages items={product.media?.items} />
            </div>

            {/* TEXT */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <h1 className="text-4xl font-medium">
                    {product.name}
                </h1>
                <p className="text-gray-500">
                    {product.description}
                </p>
                <div className="h-[2px] bg-gray-100" />

                {product.price?.price === product.price?.discountedPrice ? (
                    <h2 className="text-2xl font-medium">
                        {formatPrice(product.price?.price)}
                    </h2>
                ) : (
                    <div className="flex items-center gap-4">
                        <h3 className="text-xl text-gray-500 line-through">
                            {formatPrice(product.price?.price)}
                        </h3>
                        <h2 className="text-2xl font-medium">
                            {formatPrice(product.price?.discountedPrice)}
                        </h2>
                    </div>
                )}

                <div className="h-[2px] bg-gray-100" />
                {
                    product.variants && product.productOptions && (
                        <CustomizeProducts productId={product._id} variants={product.variants} productOptions={product.productOptions} />
                    )
                }
                <div className="h-[2px] bg-gray-100" />
                {
                    product.additionalInfoSections?.map((section: any) => (
                        <div className="text-sm" key={section.title}>
                            <h4 className="font-medium mb-4 underline">{section.title}</h4>
                            <div dangerouslySetInnerHTML={{ __html: section.description }} />
                        </div>
                    ))
                }
            </div>
        </div >
    );
};

export default SinglePage;