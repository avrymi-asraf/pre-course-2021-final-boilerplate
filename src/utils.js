const API_KEY; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";
const urlLast = "https://api.jsonbin.io/v3/b/6012913588655a7f320e6d54/latest";
const url = "https://api.jsonbin.io/v3/b/6012913588655a7f320e6d54/latest";



async function getJsonBin() {
  let response = await fetch(urlLast, { method: "GET" });
  let commits = await response.json(); // read response body and parse as JSON
  let output = await commits.record;
  return await JSON.parse(output);
}

async function putJsonBin(data) {
  await fetch(url, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// Gets data from persistent storage by the given key and returns it
async function getPersistent(key) {
  console.log(getJsonBin());
  return [];
}


// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
async function setPersistent(key, data) {
  return true;
}
