$(async function () {
    let response = await fetch("http://localhost:3000/courses")
    if (response.ok) {
        let data = await response.json();
        console.log(data);

        data.forEach(function (item) {
            $("#courses").append(`
                <article>
                    Name: ${item.name}<br>
                    Instructor: ${item.instructor}<br>
                    Duration: ${item.start_date} to ${item.end_date}<br>
                    Description: ${item.description}
                </article>
                <hr>
            `);
        })
    } else {
        let err = await response.json();
        console.log(err);
    }

    $("#myForm").on("submit", addCourse);
})

async function addCourse(e) {
    e.preventDefault();
    let data = new FormData(e.target);
    let entries = Object.fromEntries(data.entries());
    console.log(entries);

    let response = await fetch("http://localhost:3000/courses", {
        method: "post",
        body: JSON.stringify(entries),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        let data = await response.json();
        alert("Course is added");
        location.reload();
    } else {
        let err = await response.json();
        console.log(err.message);
    }
}