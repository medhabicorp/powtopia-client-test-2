import blogImg1 from "../../assets/blog/blog1.png";
import blogImg2 from "../../assets/blog/blog5.jpg";
import blogImg3 from "../../assets/blog/blog3.png";
import blogImg4 from "../../assets/blog/blog4.jpg";
import blogImg5 from "../../assets/blog/blog6.jpg";
import blogImg6 from "../../assets/blog/blog7.jpg";
import blogImg7 from "../../assets/blog/blog8.jpg";
import blogImg8 from "../../assets/blog/blog1.png";
import blogCoverImg from "../../assets/blog/blog2.jpg";

const Blog = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div
        className="bg-cover bg-center h-64 flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${blogCoverImg})` }}
      >
        <h1 className="text-4xl font-bold bg-black py-2 px-4 rounded-xl bg-opacity-40">
          Blog Posts
        </h1>
      </div>
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Blog Post 1 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={blogImg1}
              alt="Blog 1"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">
                The Importance of Pet Adoption
              </h3>
              <p className="text-gray-600 mt-2">
                Discover why adopting a pet can change lives and provide loving
                homes for animals in need.
              </p>
              <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg">
                Read Full Story
              </button>
            </div>
          </div>

          {/* Blog Post 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={blogImg2}
              alt="Blog 2"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">
                How to Care for Your Newly Adopted Pet
              </h3>
              <p className="text-gray-600 mt-2">
                Tips and advice on how to provide the best care for your newly
                adopted furry friend.
              </p>
              <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg">
                Read Full Story
              </button>
            </div>
          </div>

          {/* Blog Post 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={blogImg3}
              alt="Blog 3"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">
                The Journey of a Rescue Animal
              </h3>
              <p className="text-gray-600 mt-2">
                Follow the inspiring stories of rescue animals finding new homes
                and love.
              </p>
              <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg">
                Read Full Story
              </button>
            </div>
          </div>

          {/* Blog Post 4 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={blogImg4}
              alt="Blog 4"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">
                Why Spaying and Neutering Matters
              </h3>
              <p className="text-gray-600 mt-2">
                Learn the benefits of spaying and neutering pets to control the
                population and improve animal welfare.
              </p>
              <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg">
                Read Full Story
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Blog Post 1 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={blogImg5}
              alt="Blog 1"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">
                The Importance of Pet Adoption
              </h3>
              <p className="text-gray-600 mt-2">
                Discover why adopting a pet can change lives and provide loving
                homes for animals in need.
              </p>
              <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg">
                Read Full Story
              </button>
            </div>
          </div>

          {/* Blog Post 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={blogImg6}
              alt="Blog 2"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">
                How to Care for Your Newly Adopted Pet
              </h3>
              <p className="text-gray-600 mt-2">
                Tips and advice on how to provide the best care for your newly
                adopted furry friend.
              </p>
              <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg">
                Read Full Story
              </button>
            </div>
          </div>

          {/* Blog Post 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={blogImg7}
              alt="Blog 3"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">
                The Journey of a Rescue Animal
              </h3>
              <p className="text-gray-600 mt-2">
                Follow the inspiring stories of rescue animals finding new homes
                and love.
              </p>
              <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg">
                Read Full Story
              </button>
            </div>
          </div>

          {/* Blog Post 4 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={blogImg8}
              alt="Blog 4"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">
                Why Spaying and Neutering Matters
              </h3>
              <p className="text-gray-600 mt-2">
                Learn the benefits of spaying and neutering pets to control the
                population and improve animal welfare.
              </p>
              <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg">
                Read Full Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
