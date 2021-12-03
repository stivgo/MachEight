const axios = require('axios');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let values = []
let height

rl.question("What is the height ? ", async (answer) => {
    height = answer
    let response = await getValues()
    if (Array.isArray(response)) {
        response.forEach(v => console.log(v))
    } else {
        console.log(response)
    }
    rl.close();
})


async function init(answer) {
    height = answer
    let response = await getValues()
    return response
}



async function getValues() {
    try {
        const response = await axios.get('https://mach-eight.uc.r.appspot.com/');
        values = response.data.values;
        return filterValues()
    } catch (error) {
        console.error(error);
    }
}

function filterValues() {
    /*
    let filer = []
    values.forEach(value => {
        if (value.height === height) {
            filer.push(value)
        }
    })
    */

    let filter = values.filter(v => v.h_in === height)
    if (filter.length > 0) {
        let response = []
        filter.forEach(v => {
            let { first_name, last_name } = v
            response.push(`${first_name} ${last_name}`)
        })
        return response
    } else {
        //console.log("No matches found")
        return "No matches found"
    }
}


rl.on("close", () =>
    process.exit(0)
);

module.exports = init

