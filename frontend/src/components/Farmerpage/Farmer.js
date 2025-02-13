import "../../styling/farmerHome.css";
import Uploadimage from "./Uploadimage";
import farmer from '../../images/farmer.png'
function Farmer() {
  return (
    <div className="cntr">
        <div className="imageandtext">
          <div className="image-container">
            <img
              src={farmer}
              alt="Farmer inspecting coffee plants"
              className="farmer-image"
            />
          </div>
          <div className="text-container">
            <h2>☕ For Coffee Farmers: AI-Powered Disease Detection!</h2>
            <p>
              Protect your coffee plants with our{" "}
              <strong>AI-driven disease detection system</strong>. Upload an
              image, get instant analysis, and receive expert treatment advice.
            </p>
          </div>
          <h3>How It Works:</h3>
          <ul>
            <li>
              ✅ <strong>Step 1:</strong> Upload a coffee leaf image.
            </li>
            <li>
              ✅ <strong>Step 2:</strong> Get instant analysis & treatment
              advice.
            </li>
          </ul>
        </div>
        <div className="imageform">
        <Uploadimage/>
        </div>
    </div>
  );
}

export default Farmer;
