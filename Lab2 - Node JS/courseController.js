module.exports= {
    courses:[],
    addCourse(name,code) {
        this.courses.push({name: name, code: code});
    },
    getCourse(index) {
        return this.courses[index];
    },
    getNumberOfCourses() {
        return this.courses.length;
    }
}