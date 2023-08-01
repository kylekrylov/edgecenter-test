const prefixNumber = ["7 (", "8 (", "7 (9"];
const applyPhoneNumberMask = (phoneNumber) => {
    const value = phoneNumber.replace(/\D+/g, "");
    const numberLength = 11;

    let result = phoneNumber.includes("+8") || phoneNumber[0] === "8" ? "" : "+";

    value.split("").forEach((digit, i) => {
        if (i >= numberLength) return
        if (i === 0) {
            result += prefixNumber[parseInt(digit)] || "7 (";
            return;
        }

        result += i === 4 ? ") " : i === 7 || i === 9 ? "-" : "";
        result += digit;
    });

    return result;
};

export default applyPhoneNumberMask;
