const React = require('react');

const motion = new Proxy(
  {},
  {
    get: (_target, prop) => {
      return React.forwardRef(function MotionComponent(props, ref) {
        const { initial, animate, exit, transition, whileHover, whileTap, variants, style, ...rest } = props;
        return React.createElement(String(prop), { ...rest, style, ref });
      });
    },
  }
);

const AnimatePresence = ({ children }) => React.createElement(React.Fragment, null, children);

const mockMotionValue = (initial = 0) => ({
  get: () => initial,
  set: () => {},
  onChange: () => () => {},
  on: () => () => {},
});

const useScroll = () => ({
  scrollYProgress: mockMotionValue(0),
  scrollXProgress: mockMotionValue(0),
  scrollY: mockMotionValue(0),
  scrollX: mockMotionValue(0),
});

const useSpring = (value) => value;

const useInView = () => true;

const useMotionValue = mockMotionValue;

const useTransform = (value) => value;

module.exports = { motion, AnimatePresence, useScroll, useSpring, useInView, useMotionValue, useTransform };
