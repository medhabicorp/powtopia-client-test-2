import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import bannerImg1 from "../assets/1.png";
import bannerImg2 from "../assets/2.png";
import bannerImg3 from "../assets/3.png";
const Banner = () => {
  return (
    <div>
      <Carousel>
        <div>
          <img src={bannerImg2} />
        </div>
        <div>
          <img src={bannerImg1} />
        </div>
        <div>
          <img src={bannerImg3} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
