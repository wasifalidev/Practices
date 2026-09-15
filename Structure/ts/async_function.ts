async function getdummydata() {

    try {
        console.log("Getting dummy data...");
        const data = await fetch("https://jsonplaceholder.typicode.com/posts/1")
        console.log("data aagai")

        const response = await data.json();
        console.log(response);

    } catch (error) {
        console.log("error ka")
    }finally {
        console.log("ma to chalo ga hi")
    }

}
getdummydata();
