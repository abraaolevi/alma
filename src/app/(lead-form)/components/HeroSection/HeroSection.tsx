import {
  HeroContent,
  HeroLogo,
  HeroTitle,
  HeroSection as StyledHeroSection,
} from './HeroSection.styles';

export function HeroSection() {
  return (
    <StyledHeroSection>
      <HeroContent>
        <HeroLogo>alma</HeroLogo>
        <HeroTitle>
          Get An Assessment
          <br />
          Of Your Immigration Case
        </HeroTitle>
      </HeroContent>
    </StyledHeroSection>
  );
}
