import { useState } from "react";

type TabsProps = {
    tab: string;
    description:string;
  };
  type Review = {
    id: number;
    name: string;
    date: string;
    rating: number;
    comment: string;
  };
  
  const rv: Review[] = [
    {
      id: 1,
      name: "John Doe",
      date: "2023-01-01",
      rating: 5,
      comment: "Excellent product!",
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "2023-01-02",
      rating: 4,
      comment: "Very good, but could be improved.",
    },
    {
      id: 3,
      name: "Alice Johnson",
      date: "2023-01-03",
      rating: 3,
      comment: "Average experience.",
    },
    {
      id: 4,
      name: "Bob Brown",
      date: "2023-01-04",
      rating: 2,
      comment: "Not what I expected.",
    },
  ];
  
const TabsContent: React.FC<TabsProps> = ({ tab,description }) => {
    const renderContent = () => {
      switch (tab) {
        case "DisCription":
          return <DisCription content={description}/>;
          case "Reviews":
            return <Reviews reviews={rv} productName={"NULL Product"}/>;
        case "Return Policy":
          return <RetunPolicy/>;
        case "Delivery Policy":
          return <DeliveryPolicy/>;
        default:
          return <DisCription content={description}/>;
      }
    };
  
    return (
      <div className="max-w-screen-lg mx-auto">
        {renderContent()}
      </div>
    );
  };
  
  export default TabsContent;

  type DisCriptionProps = {
    content: string;
  };
  
  const DisCription: React.FC<DisCriptionProps> = ({ content }) => {
    return (
      <div>
        <h2>Description</h2>
        <p>{content}</p>
      </div>
    );
  };

  
  
  type ReviewListingProps = {
    reviews: Review[];
    productName: string;
  };
  const Reviews: React.FC<ReviewListingProps> = ({reviews,productName}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      console.log({ rating, review, name, email });
    };
    return (
      <div className="flex flex-col md:flex-row lg:flex-row ">
        {reviews?.length>0&&<div className=" flex-1 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            {reviews?.length + 1} Reviews For {productName}
          </h2>
          <hr className="mb-4" />
          {reviews?.map((review) => (
            <div key={review.id} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">
                  {review.name} – {new Date(review.date).toLocaleDateString()}
                </h3>
                <div className="flex">
                  {[...Array(5)]?.map((_star, index) => (
                    <svg
                      key={index}
                      className={`h-5 w-5 ${
                        index < review.rating
                          ? "text-green-500"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927C9.37 2.043 10.63 2.043 10.951 2.927l1.166 3.597c.1.309.392.523.72.523h3.797c.969 0 1.371 1.24.588 1.81l-3.072 2.232c-.248.18-.36.503-.276.802l1.165 3.597c.319.984-.806 1.798-1.618 1.236L10 14.347l-3.072 2.232c-.812.562-1.937-.252-1.618-1.236l1.165-3.597c.083-.299-.028-.622-.276-.802L3.127 8.857c-.783-.57-.38-1.81.588-1.81h3.797c.328 0 .62-.214.72-.523l1.166-3.597z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <hr className="mt-4" />
            </div>
          ))}
        </div>}
        <div className=" flex-1 max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Add a review</h2>
          <p className="mb-2">
            Your email address will not be published. Required fields are marked
            *
          </p>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={`text-2xl ${
                    index <= (hover || rating)
                      ? "text-green-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  &#9733;
                </button>
              );
            })}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="review" className="block text-gray-700">
                Your review *
              </label>
              <textarea
                id="review"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name *
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email *
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  const RetunPolicy: React.FC = () => {
    return (
      <div>
        <h2>Return Policy</h2>
        <p>Details about the return policy...</p>
      </div>
    );
  };
  
  const DeliveryPolicy: React.FC = () => {
    return (
      <div>
        <h2>Delivery Policy</h2>
        <p>Details about the delivery policy...</p>
      </div>
    );
  };
  