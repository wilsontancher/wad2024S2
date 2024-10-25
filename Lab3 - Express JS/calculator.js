console.log("Starting calculator app");
// console.log(module);

module.exports = {
    description : "This is my calculator",
    add(a,b) {
        return a+b;
    },
    multiply(a,b) {
        return a*b;
    },
    subtract(a,b) {
        return a-b;
    },
    divide(a,b) {
        return a/b;
    }
};
