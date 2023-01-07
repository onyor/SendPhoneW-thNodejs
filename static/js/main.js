const numberInput = document.getElementById("number");
const textInput = document.getElementById("msg");
const button = document.getElementById("button");
console.log("123sadas123");

const send = () => {
  const number = numberInput.value;
  const text = textInput.value;

  fetch("/", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ number: number, text: text }),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

button.addEventListener("click", send);


