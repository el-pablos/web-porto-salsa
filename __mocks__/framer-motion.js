const React = require('react');

const motion = new Proxy(
  {},
  {
    get: (_target, prop) => {
      return React.forwardRef(function MotionComponent(props, ref) {
        const { initial, animate, exit, transition, whileHover, whileTap, variants, ...rest } = props;
        return React.createElement(String(prop), { ...rest, ref });
      });
    },
  }
);

const AnimatePresence = ({ children }) => React.createElement(React.Fragment, null, children);

module.exports = { motion, AnimatePresence };
