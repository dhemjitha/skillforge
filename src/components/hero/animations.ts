export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5 + i * 0.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

export const shapeAnimations = {
  initial: {
    opacity: 0,
    y: -150,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 2.4,
    ease: [0.23, 0.86, 0.39, 0.96],
    opacity: { duration: 1.2 },
  },
}

export const floatingAnimation = {
  animate: {
    y: [0, 15, 0],
  },
  transition: {
    duration: 12,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
} 