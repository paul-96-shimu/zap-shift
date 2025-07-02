const ServiceCard = ({ icon, title, description }) => {
  return (
    <div      className="card bg-base-100 shadow-md hover:shadow-lg hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
      <div className="card-body items-start">
        <div className="mb-4">{icon}</div>
        <h3 className="card-title text-xl">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;