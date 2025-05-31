import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedStock from '../components/home/FeaturedStock';
import DripEducation from '../components/home/DripEducation';
import QuestradeCta from '../components/home/QuestradeCta';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <FeaturedStock featuredStock={undefined} />
      <DripEducation />
      <QuestradeCta />
    </main>
  );
};

export default Home;