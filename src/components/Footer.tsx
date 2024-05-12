"use client";
import React, { useRef, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

type LogosProps = {
  scrollProgress: MotionValue<number>;
};

export default function Footer() {
  const container = useRef(null);
  const paths = useRef<SVGTextPathElement[]>([]);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    scrollYProgress.on("change", (e) => {
      paths.current.forEach((path, i) => {
        path.setAttribute("startOffset", -40 + i * 40 + e * 40 + "%");
      });
    });
  }, [scrollYProgress]);

  return (
    <div ref={container}>
      <svg className="w-full mb-40" viewBox="0 0 250 90">
        <path
          fill="none"
          stroke="n"
          id="curve"
          d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"
        />
        <text className="text-[6px] uppercase" style={{ fill: "red" }}>
          {[...Array(3)].map((_, i) => {
            return (
              <textPath
                key={i}
                ref={(ref) => (paths.current[i] = ref!)}
                startOffset={i * 40 + "%"}
                href="#curve"
              >
                Lorem ipsum dolor sit amet
              </textPath>
            );
          })}
        </text>
      </svg>
      <Logos scrollProgress={scrollYProgress} />
    </div>
  );
}

const Logos = ({ scrollProgress }: LogosProps) => {
  const y = useTransform(scrollProgress, [0, 1], [-225, 0]);
  return (
    <div className="h-[250px] bg-black overflow-hidden">
      <motion.div
        style={{ y }}
        className="h-full bg-black flex justify-center gap-10 items-center p-10"
      >
        {[...Array(5)].map((_, i) => {
          return (
            <img
              key={`img_${i}`}
              className="w-[80px] h-[80px]"
              src={`/medias/${i + 1}.jpg`}
            />
          );
        })}
      </motion.div>
    </div>
  );
};
