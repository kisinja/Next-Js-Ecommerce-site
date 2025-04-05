import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import { Suspense } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
    const slug = searchParams.cat;
    const wixClient = await wixClientServer();

    try {
        const cat = await wixClient.collections.getCollectionBySlug(
            slug || "all-products"
        );

        // Check if collection exists
        if (!cat.collection) {
            return (
                <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
                    <Alert variant="destructive" className="mt-8">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Error loading category</AlertTitle>
                        <AlertDescription>
                            We {"couldn't"} load the category. Please try again later.
                        </AlertDescription>
                    </Alert>
                </div>
            );
        }

        return (
            <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
                <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
                    <div className="w-2/3 flex flex-col items-center justify-center gap-8">
                        <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">Grab up to 50% off on <br /> Selected Products</h1>
                        <button className="rounded-3xl bg-elvis text-white w-max py-3 px-5 text-sm cursor-pointer">Buy Now</button>
                    </div>
                    <div className="relative w-1/3">
                        <Image src="/woman.png" alt="" fill sizes="" className="object-contain" />
                    </div>
                </div>
                <Filter />

                <h1 className="mt-12 font-semibold text-xl">
                    {cat.collection?.name + " For you!" || "Products For You!"}
                </h1>
                <Suspense fallback={<Skeleton />}>
                    <ProductList
                        categoryId={cat.collection?._id || "00000000-000000-000000-000000000001"}
                        searchParams={searchParams}
                    />
                </Suspense>
            </div>
        );

    } catch (error) {
        return (
            <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">

                <Alert className="mt-8 text-center space-y-2">
                    <div className="flex gap-2 items-center justify-center w-full">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Category not found</AlertTitle>
                    </div>
                    <AlertDescription>
                        The category &#39;{slug}&#39; {"doesn't"} exist. Browse our <a href="/" className="text-elvis underline">homepage</a> for available products.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }
}

export default ListPage;