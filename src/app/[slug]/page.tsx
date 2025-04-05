import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductsImages from "@/components/ProductsImages";

const SinglePage = () => {
    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col lg:flex-row gap-16">
            {/* IMG */}
            <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
                <ProductsImages />
            </div>

            {/* TEXT */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <h1 className="text-4xl font-medium">Product Name</h1>
                <p className="text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias beatae sequi, nemo aperiam doloribus hic. Eaque, harum quam beatae provident ex, sapiente ipsum nisi repellendus porro facere voluptates autem nesciunt!
                </p>
                <div className="h-[2px] bg-gray-100" />
                <div className="flex items-center gap-4">
                    <h3 className="text-xl text-gray-500 line-through">$59</h3>
                    <h2 className="text-2xl font-medium">$49</h2>
                </div>
                <div className="h-[2px] bg-gray-100" />
                <CustomizeProducts />
                <Add />
                <div className="h-[2px] bg-gray-100" />
                <div className="text-sm">
                    <h4 className="font-medium mb-4">Title</h4>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam impedit natus tempore aperiam modi accusantium magnam iure dicta dolorum adipisci unde, illum repudiandae, nisi voluptatum, eligendi iste recusandae esse molestiae.
                    </p>
                </div>
                <div className="text-sm">
                    <h4 className="font-medium mb-4">Title</h4>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam impedit natus tempore aperiam modi accusantium magnam iure dicta dolorum adipisci unde, illum repudiandae, nisi voluptatum, eligendi iste recusandae esse molestiae.
                    </p>
                </div>
                <div className="text-sm">
                    <h4 className="font-medium mb-4">Title</h4>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam impedit natus tempore aperiam modi accusantium magnam iure dicta dolorum adipisci unde, illum repudiandae, nisi voluptatum, eligendi iste recusandae esse molestiae.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SinglePage;