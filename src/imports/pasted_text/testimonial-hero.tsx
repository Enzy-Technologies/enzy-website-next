import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../utils/themeColors';

export function TestimonialHero() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 transition-colors duration-500" style={{ borderBottom: `1px solid ${theme === 'light' ? 'rgba(107, 118, 132, 0.2)' : 'rgba(255, 255, 255, 0.1)'}` }}>
      {/* Large Liquid Glass Pill Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-[1400px] w-full"
        style={{ aspectRatio: '16 / 7' }}
      >
        {/* Pill-shaped glass container */}
        <div
          className="relative overflow-hidden transition-all duration-500"
          style={{
            borderRadius: '392px',
            background: theme === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(11, 15, 20, 0.4)',
            backdropFilter: 'blur(40px)',
            border: `1px solid ${theme === 'light' ? 'rgba(25, 173, 125, 0.25)' : 'rgba(25, 173, 125, 0.15)'}`,
            boxShadow: theme === 'light' 
              ? '0 30px 80px rgba(25, 173, 125, 0.15), inset 0 1px 0 rgba(255, 255, 255, 1)'
              : '0 30px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Inner gradient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(25, 173, 125, 0.05), rgba(60, 217, 163, 0.03))',
              borderRadius: 'inherit',
            }}
          />

          {/* Right blur accent inside pill */}
          <div
            className="absolute rounded-full blur-[80px] opacity-40"
            style={{
              background: 'rgba(60, 217, 163, 0.15)',
              width: '360px',
              height: '360px',
              right: '10%',
              top: '-10%',
            }}
          />

          {/* Left blur accent inside pill */}
          <div
            className="absolute rounded-full blur-[80px] opacity-30"
            style={{
              background: 'rgba(25, 173, 125, 0.12)',
              width: '320px',
              height: '320px',
              left: '5%',
              bottom: '-15%',
            }}
          />

          {/* Left hand image inside pill */}
          <div className="absolute h-[70%] left-0 bottom-0 w-[32%] pointer-events-none z-10">
            <img 
              alt="" 
              className="absolute h-full w-auto object-contain object-bottom-left" 
              src="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Untitled-2%201.png"
              style={{
                filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
              }}
            />
          </div>

          {/* Right hand image inside pill */}
          <div className="absolute h-[70%] right-0 bottom-0 w-[32%] pointer-events-none z-10">
            <img 
              alt="" 
              className="absolute h-full w-auto object-contain object-bottom-right right-0" 
              src="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Untitled-2%201-1.png"
              style={{
                filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
              }}
            />
          </div>

          {/* Content container - centered */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full px-8 md:px-20 py-12 md:py-16">
            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center max-w-3xl"
            >
              <h2 
                className="text-3xl md:text-4xl lg:text-[56px] font-medium leading-tight md:leading-[70px] tracking-[-2px] mb-6 transition-colors duration-500"
                style={{ fontFamily: "'IvyOra_Text', serif", fontWeight: 500, letterSpacing: "-2px", color: colors.text.primary }}
              >
                "Makes other platforms<br />look elementary. It really stands out."
              </h2>
            </motion.div>

            {/* Attribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8"
            >
              <p className="text-base md:text-[18px] leading-[26px] transition-colors duration-500" style={{ color: colors.text.secondary }}>
                Code Mangeltron, CEO of All
              </p>
            </motion.div>

            {/* CTA Button with gradient border */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <button
                className="relative group inline-block"
                onClick={() => {
                  console.log('View More clicked');
                }}
              >
                {/* Outer glow effect on hover */}
                <div
                  className="absolute -inset-[2px] rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(189.625deg, rgba(25, 173, 125, 0.6), rgba(20, 144, 103, 0.6))',
                    filter: 'blur(12px)',
                  }}
                />

                {/* Gradient border container */}
                <div
                  className="relative rounded-[16px] p-[1.5px]"
                  style={{
                    background: 'linear-gradient(189.625deg, rgba(25, 173, 125, 0.8) 0%, rgba(60, 217, 163, 0.6) 50%, rgba(25, 173, 125, 0.8) 100%)',
                  }}
                >
                  {/* Button inner */}
                  <div
                    className="relative px-6 py-4 rounded-[15px] backdrop-blur-[2.4px] transition-all duration-300 group-hover:backdrop-blur-[4px]"
                    style={{
                      backgroundImage: 'linear-gradient(189.625deg, rgba(25, 173, 125, 0.39) 25.113%, rgba(20, 144, 103, 0.39) 64.165%)',
                      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25), inset 3px 3px 6px 0px rgba(255, 255, 255, 0.25)',
                    }}
                  >
                    <span className="text-[#f5f7fa] text-base font-medium whitespace-nowrap">
                      View More
                    </span>
                  </div>
                </div>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Outer glow effect around pill */}
        <div
          className="absolute -inset-[2px] rounded-[392px] opacity-30 pointer-events-none -z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(25, 173, 125, 0.2), rgba(60, 217, 163, 0.15))',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>
    </section>
  );
}