var postcss = require('postcss');

module.exports = postcss.plugin('postcss-prepend-selector', function (opts) {
    opts = opts || {};
    return function (css) {
        css.walkRules(function (rule) {
            rule.selectors = rule.selectors.map(function (selector) {
                if (/^([0-9]*[.])?[0-9]+\%$|^from$|^to$/.test(selector)) {
                    // This is part of a keyframe
                    return selector;
                }

                // Ignore classes starting with opts.selector
                if (selector.startsWith(opts.selector.trim())) {
                    return selector;
                }

                // If the selector already has a space
                if (!selector.startsWith('html') && /\s/g.test(selector)) {
                    return selector;
                }

                // Remove selector html
                if (selector.startsWith('html ')) {
                    // remove string 'html '
                    selector = selector.replace('html ', '');
                }

                return opts.selector + selector;
            });
        });
    };
});
