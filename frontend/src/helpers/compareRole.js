export default function compareRole(stateField, mode) {
    if (stateField && stateField.role === mode) return true;
    return false;
}