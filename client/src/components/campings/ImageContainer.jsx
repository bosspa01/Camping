const ImageContainer = ({ image, name }) => {
  return (
    <section className="h-75 md:h-125 mt-2">
      <img
        alt={name}
        className="w-full h-full object-cover rounded-md"
        src={image}
      />
    </section>
  );
};
export default ImageContainer;
