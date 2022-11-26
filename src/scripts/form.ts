const inputs = Array.from(document.querySelectorAll("input"));
const textArea = document.querySelector(".contact #text-area") as HTMLInputElement
const form = document.querySelector(".contact form") as HTMLFormElement;

interface formRegxInterface {
    "f-name": RegExp;
    "l-name": RegExp;
    email: RegExp;
    "number-phone": RegExp;
    "text-area": RegExp;
}
type ObjectKey = keyof typeof formRegx;

const formRegx: formRegxInterface = {
    "f-name": /[\w]{3,30}/,
    "l-name": /[\w]{3,30}/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "number-phone":
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    "text-area": /[\w]{3,3000}/,
};

const validate = (el: HTMLInputElement | null, regx: RegExp) => {
    if (regx.test(el?.value as string)) {
        el?.classList.remove("error");
    } else {
        el?.classList.add("error");
    }
};

textArea.addEventListener("keyup", (e) => {
    validate(e.target as HTMLInputElement, formRegx['text-area']);
});
for (let input of inputs) {
    if ((input.type as string) === "radio") continue;
    input.addEventListener("keyup", (e) => {
        validate(e.target as HTMLInputElement, formRegx[input.id as ObjectKey]);
    });
}

const checkElements = () => {
    for (let input of inputs) {
        if ((input.type as string) === "radio") continue;
        validate(input as HTMLInputElement, formRegx[input.id as ObjectKey]);
    }
    validate(textArea, formRegx['text-area'])
    return true;
};

form.addEventListener("submit", (e: SubmitEvent) => {
    if (checkElements() && !document.querySelector(".error")) return;
    else e.preventDefault();
});
