import FeatureItem from '../FeaturesItem/FeaturesItem';
import './Features.css';


function Features() {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      <FeatureItem icon="/img/icon-chat.png" title="You are our #1 priority">
        Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.
      </FeatureItem>
      <FeatureItem icon="/img/icon-money.png" title="More savings means higher rates">
        The more you save with us, the higher your interest rate will be!
      </FeatureItem>
      <FeatureItem icon="/img/icon-security.png" title="Security you can trust">
        We use top of the line encryption to make sure your data and money is always safe.
      </FeatureItem>
    </section>
  );
}

export default Features;