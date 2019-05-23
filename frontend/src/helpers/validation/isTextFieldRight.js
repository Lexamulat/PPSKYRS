export default function (name, minLength, maxLength) {
    if (!name.trim()) return false;
    if (name.trim().length < minLength || name.trim().length > maxLength) return false;
    return true
}


