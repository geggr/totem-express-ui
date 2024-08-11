export function zip(first, second) {
    const length = Math.min(first.length, second.length);

    const result = [];

    for (let index = 0; index < length; index++) {
        result.push(
            Array.of(first.at(index), second.at(index))
        )
    }

    return result;
}