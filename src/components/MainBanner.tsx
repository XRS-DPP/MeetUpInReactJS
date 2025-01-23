const MainBanner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start w-full h-[30vh] space-y-4 md:space-y-0 md:mb-6">
      <p className="sm: px-3 w-full md:w-[50%] py-4 md:px-4 md:py-0 md:text-left leading-relaxed font-Poppins font-semibold text-primary">
        Our community is all about connection. Whether you’re new or have lived
        here for years, there's always a place for you. From casual meetups to
        volunteer events, we bring people together to share, learn, and grow.
        Let’s connect, share, and grow together!
      </p>
      <div className="hidden md:block md:w-[10%]" />
      <div className="sm: px-3 flex-shrink-0 w-full md:w-[45%] h-[30vh] flex justify-center pr-2">
        <img
          className="object-cover w-full h-full rounded-lg"
          src="https://slideswith.com/cdn-cgi/image/w=1000,h=500,fit=scale-down,f=auto/https://cdn.prod.website-files.com/62ba01ba5ddce9536b927dbb/65f1adf301b5de398d38bc2f_fffc549f-756d-4b18-ba4d-a69681ce856c.webp"
          alt="Community Events"
        />
      </div>
    </div>
  );
};

export default MainBanner;
